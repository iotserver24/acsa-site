import { NextRequest, NextResponse } from "next/server"
import { registrationDatabase } from "@/lib/file-database"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('eventId')
  
  try {
    let registrations
    
    if (eventId && !isNaN(parseInt(eventId))) {
      registrations = await registrationDatabase.getRegistrationsByEvent(parseInt(eventId))
    } else {
      registrations = await registrationDatabase.getAllRegistrations()
    }
    
    return NextResponse.json(registrations)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Check for existing registrations with same email or phone for this event
    const existingRegistrations = await registrationDatabase.getRegistrationsByEvent(body.eventId)
    
    // Check if email already exists for this event
    const emailExists = existingRegistrations.some(reg => reg.email.toLowerCase() === body.email.toLowerCase())
    if (emailExists) {
      return NextResponse.json({ 
        error: 'Registration failed: This email address has already been registered for this event.' 
      }, { status: 400 })
    }
    
    // Check if phone number already exists for this event
    const phoneExists = existingRegistrations.some(reg => reg.phone === body.phone)
    if (phoneExists) {
      return NextResponse.json({ 
        error: 'Registration failed: This phone number has already been registered for this event.' 
      }, { status: 400 })
    }
    
    const newRegistration = await registrationDatabase.createRegistration(body)
    return NextResponse.json(newRegistration, { status: 201 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 })
  }
}