export const CURRENT_CLUB_YEAR = "2026-27"
export const PREVIOUS_CLUB_YEAR = "2025-26"

export const CLUB_YEARS = [CURRENT_CLUB_YEAR, PREVIOUS_CLUB_YEAR] as const

export type ClubYear = (typeof CLUB_YEARS)[number]
