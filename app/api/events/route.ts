import { NextRequest, NextResponse } from "next/server"
import { eventDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const limit = searchParams.get('limit')
  
  try {
    let events
    
    switch (type) {
      case 'upcoming':
        events = await eventDatabase.getUpcomingEvents()
        break
      case 'past':
        events = await eventDatabase.getPastEvents()
        break
      default:
        events = await eventDatabase.getAllEvents()
    }
    
    // Apply limit if specified
    if (limit && !isNaN(parseInt(limit))) {
      events = events.slice(0, parseInt(limit))
    }
    
    return NextResponse.json(events)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newEvent = await eventDatabase.createEvent(body)
    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}