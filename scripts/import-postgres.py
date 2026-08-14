#!/usr/bin/env python3
"""Import data-export/*.json into Neon Postgres. Reads DATABASE_URL from env or .env."""

from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPORT = ROOT / "data-export"
SCHEMA = ROOT / "scripts" / "schema.sql"


def load_dotenv() -> None:
    env_path = ROOT / ".env"
    if not env_path.exists():
        return
    for raw in env_path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def sql_str(value: object) -> str:
    if value is None:
        return "NULL"
    text = str(value)
    return "'" + text.replace("'", "''") + "'"


def sql_bool(value: object) -> str:
    return "TRUE" if bool(value) else "FALSE"


def sql_int(value: object) -> str:
    if value is None or value == "":
        return "NULL"
    return str(int(value))


def psql(sql: str) -> str:
    url = os.environ.get("DATABASE_URL")
    if not url:
        sys.exit("DATABASE_URL is not set")
    result = subprocess.run(
        ["psql", url, "-v", "ON_ERROR_STOP=1", "-q", "-t", "-A", "-c", sql],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        sys.stderr.write(result.stderr)
        sys.exit(result.returncode)
    return result.stdout.strip()


def psql_file(path: Path) -> None:
    url = os.environ.get("DATABASE_URL")
    if not url:
        sys.exit("DATABASE_URL is not set")
    result = subprocess.run(
        ["psql", url, "-v", "ON_ERROR_STOP=1", "-q", "-f", str(path)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        sys.stderr.write(result.stderr)
        sys.exit(result.returncode)


def main() -> None:
    load_dotenv()
    events = json.loads((EXPORT / "events.json").read_text())
    regs = json.loads((EXPORT / "registrations.json").read_text())
    summary = json.loads((EXPORT / "summary.json").read_text())
    event_counter = int(summary["counters"]["event_id_counter"])
    reg_counter = int(summary["counters"]["registration_id_counter"])

    print("applying schema")
    psql_file(SCHEMA)

    print("clearing tables")
    psql("TRUNCATE registrations, events RESTART IDENTITY CASCADE;")

    print(f"inserting {len(events)} events")
    event_sql = ["BEGIN;"]
    for event in events:
        event_sql.append(
            "INSERT INTO events ("
            "id, title, date, time, location, description, attendees, max_attendees, "
            "category, featured, image, registration_limit, is_active, club_year, created_at, updated_at"
            ") VALUES ("
            f"{sql_int(event['id'])}, {sql_str(event['title'])}, {sql_str(event['date'])}, "
            f"{sql_str(event.get('time') or '')}, {sql_str(event.get('location') or '')}, "
            f"{sql_str(event.get('description') or '')}, {sql_int(event.get('attendees') or 0)}, "
            f"{sql_int(event.get('maxAttendees') or 0)}, {sql_str(event.get('category') or '')}, "
            f"{sql_bool(event.get('featured'))}, {sql_str(event.get('image') or '')}, "
            f"{sql_int(event.get('registrationLimit'))}, {sql_bool(event.get('isActive'))}, "
            f"{sql_str(event.get('clubYear') or '2025-26')}, "
            f"{sql_str(event['createdAt'])}::timestamptz, {sql_str(event['updatedAt'])}::timestamptz"
            ");"
        )
    event_sql.append("COMMIT;")
    psql("\n".join(event_sql))

    print(f"inserting {len(regs)} registrations")
    # batch to keep the command size reasonable
    batch_size = 50
    for start in range(0, len(regs), batch_size):
        batch = regs[start : start + batch_size]
        statements = ["BEGIN;"]
        for reg in batch:
            statements.append(
                "INSERT INTO registrations ("
                "id, event_id, name, usn, email, phone, branch_name, academic_year, registered_at"
                ") VALUES ("
                f"{sql_int(reg['id'])}, {sql_int(reg['eventId'])}, {sql_str(reg['name'])}, "
                f"{sql_str(reg.get('usn') or '')}, {sql_str(reg['email'])}, "
                f"{sql_str(reg.get('phone') or '')}, {sql_str(reg.get('branchName') or '')}, "
                f"{sql_str(reg.get('academicYear') or '')}, {sql_str(reg['registeredAt'])}::timestamptz"
                ");"
            )
        statements.append("COMMIT;")
        psql("\n".join(statements))
        print(f"  {min(start + batch_size, len(regs))}/{len(regs)}")

    print("syncing attendee counts from registrations")
    psql(
        "UPDATE events e SET attendees = COALESCE(r.cnt, 0), updated_at = e.updated_at "
        "FROM (SELECT event_id, COUNT(*)::int AS cnt FROM registrations GROUP BY event_id) r "
        "WHERE e.id = r.event_id;"
    )

    print("setting id sequences from redis counters")
    psql(
        "SELECT setval(pg_get_serial_sequence('events', 'id'), "
        f"GREATEST((SELECT COALESCE(MAX(id), 1) FROM events), {event_counter}));"
    )
    psql(
        "SELECT setval(pg_get_serial_sequence('registrations', 'id'), "
        f"GREATEST((SELECT COALESCE(MAX(id), 1) FROM registrations), {reg_counter}));"
    )

    counts = psql(
        "SELECT json_build_object("
        "'events', (SELECT COUNT(*)::int FROM events),"
        "'registrations', (SELECT COUNT(*)::int FROM registrations),"
        "'max_event_id', (SELECT COALESCE(MAX(id),0) FROM events),"
        "'max_reg_id', (SELECT COALESCE(MAX(id),0) FROM registrations),"
        "'regs_by_event', (SELECT COALESCE(json_object_agg(event_id, cnt), '{}'::json) FROM ("
        "SELECT event_id, COUNT(*)::int AS cnt FROM registrations GROUP BY event_id) s),"
        "'events_summary', (SELECT COALESCE(json_agg(json_build_object("
        "'id', id, 'title', title, 'date', date, 'attendees', attendees, 'is_active', is_active"
        ") ORDER BY id), '[]'::json) FROM events)"
        ");"
    )
    print(counts)


if __name__ == "__main__":
    main()
