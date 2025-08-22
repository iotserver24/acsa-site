import { NextRequest, NextResponse } from "next/server"
import { eventDatabase } from "@/lib/file-database"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const eventId = parseInt(id)
  
  if (isNaN(eventId)) {
    return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 })
  }
  
  try {
    const event = await eventDatabase.getEventById(eventId)
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const eventId = parseInt(id)
  
  if (isNaN(eventId)) {
    return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 })
  }
  
  try {
    const body = await request.json()
    const updatedEvent = await eventDatabase.updateEvent(eventId, body)
    
    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const eventId = parseInt(id)
  
  if (isNaN(eventId)) {
    return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 })
  }
  
  try {
    const deleted = await eventDatabase.deleteEvent(eventId)
    
    if (!deleted) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}