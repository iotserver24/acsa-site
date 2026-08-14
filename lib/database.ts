import { CURRENT_CLUB_YEAR, PREVIOUS_CLUB_YEAR } from "./academic-year"
import { getSql } from "./db"

export interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  maxAttendees: number
  category: string
  featured?: boolean
  image: string
  registrationLimit?: number
  isActive?: boolean
  clubYear: string
  createdAt: string
  updatedAt: string
}

export interface Registration {
  id: number
  eventId: number
  name: string
  usn: string
  email: string
  phone: string
  branchName: string
  academicYear: string
  registeredAt: string
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  const text = String(value ?? "")
  return text.slice(0, 10)
}

function toIso(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString()
  }
  const date = new Date(String(value ?? ""))
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

function mapEvent(row: Record<string, unknown>): Event {
  return {
    id: Number(row.id),
    title: String(row.title ?? ""),
    date: toIsoDate(row.date),
    time: String(row.time ?? ""),
    location: String(row.location ?? ""),
    description: String(row.description ?? ""),
    attendees: Number(row.attendees ?? 0),
    maxAttendees: Number(row.max_attendees ?? 0),
    category: String(row.category ?? ""),
    featured: Boolean(row.featured),
    image: String(row.image ?? ""),
    registrationLimit: row.registration_limit == null ? undefined : Number(row.registration_limit),
    isActive: Boolean(row.is_active),
    clubYear: String(row.club_year ?? PREVIOUS_CLUB_YEAR),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  }
}

function mapRegistration(row: Record<string, unknown>): Registration {
  return {
    id: Number(row.id),
    eventId: Number(row.event_id),
    name: String(row.name ?? ""),
    usn: String(row.usn ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    branchName: String(row.branch_name ?? ""),
    academicYear: String(row.academic_year ?? ""),
    registeredAt: toIso(row.registered_at),
  }
}

export const eventDatabase = {
  getAllEvents: async (): Promise<Event[]> => {
    const sql = getSql()
    const rows = await sql`SELECT * FROM events ORDER BY created_at DESC`
    return (rows as Record<string, unknown>[]).map(mapEvent)
  },

  getEventById: async (id: number): Promise<Event | null> => {
    const sql = getSql()
    const rows = await sql`SELECT * FROM events WHERE id = ${id} LIMIT 1`
    return rows[0] ? mapEvent(rows[0] as Record<string, unknown>) : null
  },

  createEvent: async (eventData: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<Event> => {
    const sql = getSql()
    const rows = await sql`
      INSERT INTO events (
        title, date, time, location, description, attendees, max_attendees,
        category, featured, image, registration_limit, is_active, club_year
      ) VALUES (
        ${eventData.title},
        ${eventData.date},
        ${eventData.time},
        ${eventData.location},
        ${eventData.description},
        ${eventData.attendees ?? 0},
        ${eventData.maxAttendees},
        ${eventData.category},
        ${eventData.featured ?? false},
        ${eventData.image},
        ${eventData.registrationLimit ?? null},
        ${eventData.isActive ?? true},
        ${eventData.clubYear || CURRENT_CLUB_YEAR}
      )
      RETURNING *
    `
    return mapEvent(rows[0] as Record<string, unknown>)
  },

  updateEvent: async (id: number, eventData: Partial<Event>): Promise<Event | null> => {
    const sql = getSql()
    const existing = await eventDatabase.getEventById(id)
    if (!existing) return null

    const next = {
      ...existing,
      ...eventData,
      id,
    }

    const rows = await sql`
      UPDATE events SET
        title = ${next.title},
        date = ${next.date},
        time = ${next.time},
        location = ${next.location},
        description = ${next.description},
        attendees = ${next.attendees},
        max_attendees = ${next.maxAttendees},
        category = ${next.category},
        featured = ${next.featured ?? false},
        image = ${next.image},
        registration_limit = ${next.registrationLimit ?? null},
        is_active = ${next.isActive ?? true},
        club_year = ${next.clubYear || CURRENT_CLUB_YEAR},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return rows[0] ? mapEvent(rows[0] as Record<string, unknown>) : null
  },

  deleteEvent: async (id: number): Promise<boolean> => {
    const sql = getSql()
    const rows = await sql`DELETE FROM events WHERE id = ${id} RETURNING id`
    return rows.length > 0
  },

  getUpcomingEvents: async (): Promise<Event[]> => {
    const sql = getSql()
    const rows = await sql`
      SELECT * FROM events
      WHERE club_year = ${CURRENT_CLUB_YEAR}
      ORDER BY date ASC
    `
    return (rows as Record<string, unknown>[]).map(mapEvent)
  },

  getPastEvents: async (): Promise<Event[]> => {
    const sql = getSql()
    const rows = await sql`
      SELECT * FROM events
      WHERE club_year <> ${CURRENT_CLUB_YEAR}
      ORDER BY date DESC
    `
    return (rows as Record<string, unknown>[]).map(mapEvent)
  },
}

export const registrationDatabase = {
  getAllRegistrations: async (): Promise<Registration[]> => {
    const sql = getSql()
    const rows = await sql`SELECT * FROM registrations ORDER BY registered_at DESC`
    return (rows as Record<string, unknown>[]).map(mapRegistration)
  },

  getRegistrationsByEvent: async (eventId: number): Promise<Registration[]> => {
    const sql = getSql()
    const rows = await sql`
      SELECT * FROM registrations
      WHERE event_id = ${eventId}
      ORDER BY registered_at DESC
    `
    return (rows as Record<string, unknown>[]).map(mapRegistration)
  },

  createRegistration: async (
    regData: Omit<Registration, "id" | "registeredAt">
  ): Promise<Registration> => {
    const sql = getSql()
    const rows = await sql`
      WITH new_reg AS (
        INSERT INTO registrations (
          event_id, name, usn, email, phone, branch_name, academic_year
        ) VALUES (
          ${regData.eventId},
          ${regData.name},
          ${regData.usn},
          ${regData.email},
          ${regData.phone},
          ${regData.branchName},
          ${regData.academicYear}
        )
        RETURNING *
      ),
      updated AS (
        UPDATE events
        SET attendees = attendees + 1, updated_at = NOW()
        WHERE id = ${regData.eventId}
        RETURNING id
      )
      SELECT new_reg.* FROM new_reg
    `
    return mapRegistration(rows[0] as Record<string, unknown>)
  },

  deleteRegistration: async (id: number): Promise<boolean> => {
    const sql = getSql()
    const rows = await sql`
      WITH deleted AS (
        DELETE FROM registrations WHERE id = ${id} RETURNING id, event_id
      ),
      updated AS (
        UPDATE events e
        SET attendees = GREATEST(e.attendees - 1, 0), updated_at = NOW()
        FROM deleted
        WHERE e.id = deleted.event_id
        RETURNING e.id
      )
      SELECT id FROM deleted
    `
    return rows.length > 0
  },
}

export const initializeDatabase = async () => {
  // Schema is applied by scripts/schema.sql + scripts/import-postgres.py
}
