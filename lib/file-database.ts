import { promises as fs } from 'fs'
import path from 'path'
import type { Event, Registration } from './database'

// File paths for data storage
const DATA_DIR = path.join(process.cwd(), 'data')
const EVENTS_FILE = path.join(DATA_DIR, 'events.json')
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json')
const COUNTERS_FILE = path.join(DATA_DIR, 'counters.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Initialize files if they don't exist
async function initializeFiles() {
  await ensureDataDir()
  
  try {
    await fs.access(EVENTS_FILE)
  } catch {
    await fs.writeFile(EVENTS_FILE, '[]')
  }
  
  try {
    await fs.access(REGISTRATIONS_FILE)
  } catch {
    await fs.writeFile(REGISTRATIONS_FILE, '[]')
  }
  
  try {
    await fs.access(COUNTERS_FILE)
  } catch {
    await fs.writeFile(COUNTERS_FILE, JSON.stringify({ eventId: 0, registrationId: 0 }))
  }
}

// Read data from file
async function readFile<T>(filePath: string): Promise<T> {
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

// Write data to file
async function writeFile<T>(filePath: string, data: T): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

// Get next ID
async function getNextId(type: 'eventId' | 'registrationId'): Promise<number> {
  const counters = await readFile<{ eventId: number; registrationId: number }>(COUNTERS_FILE)
  counters[type]++
  await writeFile(COUNTERS_FILE, counters)
  return counters[type]
}

// Event CRUD operations
export const eventDatabase = {
  // Get all events
  getAllEvents: async (): Promise<Event[]> => {
    await initializeFiles()
    const events = await readFile<Event[]>(EVENTS_FILE)
    return events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  // Get event by ID
  getEventById: async (id: number): Promise<Event | null> => {
    await initializeFiles()
    const events = await readFile<Event[]>(EVENTS_FILE)
    return events.find(event => event.id === id) || null
  },

  // Create new event
  createEvent: async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    await initializeFiles()
    const id = await getNextId('eventId')
    const now = new Date().toISOString()
    
    const newEvent: Event = {
      ...eventData,
      id,
      createdAt: now,
      updatedAt: now,
    }
    
    const events = await readFile<Event[]>(EVENTS_FILE)
    events.push(newEvent)
    await writeFile(EVENTS_FILE, events)
    
    return newEvent
  },

  // Update event
  updateEvent: async (id: number, eventData: Partial<Event>): Promise<Event | null> => {
    await initializeFiles()
    const events = await readFile<Event[]>(EVENTS_FILE)
    const eventIndex = events.findIndex(e => e.id === id)
    
    if (eventIndex === -1) return null
    
    const updatedEvent: Event = {
      ...events[eventIndex],
      ...eventData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }
    
    events[eventIndex] = updatedEvent
    await writeFile(EVENTS_FILE, events)
    
    return updatedEvent
  },

  // Delete event
  deleteEvent: async (id: number): Promise<boolean> => {
    await initializeFiles()
    const events = await readFile<Event[]>(EVENTS_FILE)
    const eventIndex = events.findIndex(e => e.id === id)
    
    if (eventIndex === -1) return false
    
    events.splice(eventIndex, 1)
    await writeFile(EVENTS_FILE, events)
    
    // Also delete registrations for this event
    const registrations = await readFile<Registration[]>(REGISTRATIONS_FILE)
    const filteredRegistrations = registrations.filter(reg => reg.eventId !== id)
    await writeFile(REGISTRATIONS_FILE, filteredRegistrations)
    
    return true
  },

  // Get upcoming events (active events)
  getUpcomingEvents: async (): Promise<Event[]> => {
    await initializeFiles()
    const allEvents = await eventDatabase.getAllEvents()
    
    return allEvents
      .filter(event => event.isActive !== false) // Show active events
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date ascending
  },

  // Get past events (inactive events)
  getPastEvents: async (): Promise<Event[]> => {
    await initializeFiles()
    const allEvents = await eventDatabase.getAllEvents()
    
    return allEvents
      .filter(event => event.isActive === false) // Show inactive events
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending (most recent first)
  },
}

// Registration CRUD operations
export const registrationDatabase = {
  // Get all registrations
  getAllRegistrations: async (): Promise<Registration[]> => {
    await initializeFiles()
    const registrations = await readFile<Registration[]>(REGISTRATIONS_FILE)
    return registrations.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
  },

  // Get registrations by event ID
  getRegistrationsByEvent: async (eventId: number): Promise<Registration[]> => {
    await initializeFiles()
    const allRegistrations = await registrationDatabase.getAllRegistrations()
    return allRegistrations.filter(reg => reg.eventId === eventId)
  },

  // Create new registration
  createRegistration: async (regData: Omit<Registration, 'id' | 'registeredAt'>): Promise<Registration> => {
    await initializeFiles()
    const id = await getNextId('registrationId')
    const now = new Date().toISOString()
    
    const newRegistration: Registration = {
      ...regData,
      id,
      registeredAt: now,
    }
    
    // Save registration
    const registrations = await readFile<Registration[]>(REGISTRATIONS_FILE)
    registrations.push(newRegistration)
    await writeFile(REGISTRATIONS_FILE, registrations)
    
    // Update event attendee count
    const events = await readFile<Event[]>(EVENTS_FILE)
    const eventIndex = events.findIndex(e => e.id === regData.eventId)
    if (eventIndex !== -1) {
      events[eventIndex].attendees += 1
      events[eventIndex].updatedAt = now
      await writeFile(EVENTS_FILE, events)
    }
    
    return newRegistration
  },

  // Delete registration
  deleteRegistration: async (id: number): Promise<boolean> => {
    await initializeFiles()
    const registrations = await readFile<Registration[]>(REGISTRATIONS_FILE)
    const registrationIndex = registrations.findIndex(r => r.id === id)
    
    if (registrationIndex === -1) return false
    
    const registration = registrations[registrationIndex]
    registrations.splice(registrationIndex, 1)
    await writeFile(REGISTRATIONS_FILE, registrations)
    
    // Update event attendee count
    const events = await readFile<Event[]>(EVENTS_FILE)
    const eventIndex = events.findIndex(e => e.id === registration.eventId)
    if (eventIndex !== -1 && events[eventIndex].attendees > 0) {
      events[eventIndex].attendees -= 1
      events[eventIndex].updatedAt = new Date().toISOString()
      await writeFile(EVENTS_FILE, events)
    }
    
    return true
  },
}

// Initialize database files (no sample data)
export const initializeDatabase = async () => {
  await initializeFiles()
  console.log('Database files initialized successfully!')
}
