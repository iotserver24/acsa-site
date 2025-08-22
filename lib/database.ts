// Redis database operations for ACSA events and registrations

import { redis } from './redis'

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

// Redis keys
const EVENTS_KEY = 'acsa:events'
const REGISTRATIONS_KEY = 'acsa:registrations'
const EVENT_ID_COUNTER = 'acsa:event_id_counter'
const REGISTRATION_ID_COUNTER = 'acsa:registration_id_counter'

// Helper function to add timeout to Redis operations
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
    )
  ])
}

// Helper functions
const getNextEventId = async (): Promise<number> => {
  const id = await withTimeout(redis.incr(EVENT_ID_COUNTER))
  return id
}

const getNextRegistrationId = async (): Promise<number> => {
  const id = await withTimeout(redis.incr(REGISTRATION_ID_COUNTER))
  return id
}

// In-memory fallback for development
let inMemoryEvents: Event[] = []
let inMemoryRegistrations: Registration[] = []
let eventIdCounter = 0
let registrationIdCounter = 0

// Event CRUD operations
export const eventDatabase = {
  // Get all events
  getAllEvents: async (): Promise<Event[]> => {
    const eventsData = await withTimeout(redis.hGetAll(EVENTS_KEY))
    const events = Object.values(eventsData).map(eventJson => JSON.parse(eventJson) as Event)
    return events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  // Get event by ID
  getEventById: async (id: number): Promise<Event | null> => {
    try {
      const eventData = await redis.hGet(EVENTS_KEY, id.toString())
      return eventData ? JSON.parse(eventData) : null
    } catch (error) {
      console.error('Redis error in getEventById, using in-memory fallback:', error)
      return inMemoryEvents.find(event => event.id === id) || null
    }
  },

  // Create new event
  createEvent: async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    const id = await getNextEventId()
    const now = new Date().toISOString()
    
    const newEvent: Event = {
      ...eventData,
      id,
      createdAt: now,
      updatedAt: now,
    }
    
    await withTimeout(redis.hSet(EVENTS_KEY, id.toString(), JSON.stringify(newEvent)))
    return newEvent
  },

  // Update event
  updateEvent: async (id: number, eventData: Partial<Event>): Promise<Event | null> => {
    const existingEventData = await withTimeout(redis.hGet(EVENTS_KEY, id.toString()))
    if (!existingEventData) return null
    
    const existingEvent = JSON.parse(existingEventData) as Event
    const updatedEvent: Event = {
      ...existingEvent,
      ...eventData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }
    
    await withTimeout(redis.hSet(EVENTS_KEY, id.toString(), JSON.stringify(updatedEvent)))
    return updatedEvent
  },

  // Delete event
  deleteEvent: async (id: number): Promise<boolean> => {
    const result = await withTimeout(redis.hDel(EVENTS_KEY, id.toString()))
    
    // Also delete all registrations for this event
    const registrations = await withTimeout(redis.hGetAll(REGISTRATIONS_KEY))
    const registrationsToDelete = Object.entries(registrations)
      .filter(([_, regData]) => {
        const reg = JSON.parse(regData) as Registration
        return reg.eventId === id
      })
      .map(([regId]) => regId)
    
    if (registrationsToDelete.length > 0) {
      await withTimeout(redis.hDel(REGISTRATIONS_KEY, registrationsToDelete))
    }
    
    return result > 0
  },

  // Get upcoming events
  getUpcomingEvents: async (): Promise<Event[]> => {
    try {
      const allEvents = await eventDatabase.getAllEvents()
      const today = new Date().toISOString().split('T')[0]
      
      return allEvents
        .filter(event => event.date >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } catch (error) {
      console.error('Redis error in getUpcomingEvents:', error)
      return []
    }
  },

  // Get past events
  getPastEvents: async (): Promise<Event[]> => {
    try {
      const allEvents = await eventDatabase.getAllEvents()
      const today = new Date().toISOString().split('T')[0]
      
      return allEvents
        .filter(event => event.date < today)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
      console.error('Redis error in getPastEvents:', error)
      return []
    }
  },
}

// Registration CRUD operations
export const registrationDatabase = {
  // Get all registrations
  getAllRegistrations: async (): Promise<Registration[]> => {
    const registrationsData = await withTimeout(redis.hGetAll(REGISTRATIONS_KEY))
    const registrations = Object.values(registrationsData).map(regJson => JSON.parse(regJson) as Registration)
    return registrations.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
  },

  // Get registrations by event ID
  getRegistrationsByEvent: async (eventId: number): Promise<Registration[]> => {
    try {
      const allRegistrations = await registrationDatabase.getAllRegistrations()
      return allRegistrations.filter(reg => reg.eventId === eventId)
    } catch (error) {
      console.error('Redis error in getRegistrationsByEvent:', error)
      return []
    }
  },

  // Create new registration
  createRegistration: async (regData: Omit<Registration, 'id' | 'registeredAt'>): Promise<Registration> => {
    const id = await getNextRegistrationId()
    const now = new Date().toISOString()
    
    const newRegistration: Registration = {
      ...regData,
      id,
      registeredAt: now,
    }
    
    // Save registration
    await withTimeout(redis.hSet(REGISTRATIONS_KEY, id.toString(), JSON.stringify(newRegistration)))
    
    // Update event attendee count
    const eventData = await withTimeout(redis.hGet(EVENTS_KEY, regData.eventId.toString()))
    if (eventData) {
      const event = JSON.parse(eventData) as Event
      event.attendees += 1
      event.updatedAt = now
      await withTimeout(redis.hSet(EVENTS_KEY, regData.eventId.toString(), JSON.stringify(event)))
    }
    
    return newRegistration
  },

  // Delete registration
  deleteRegistration: async (id: number): Promise<boolean> => {
    try {
      // Get registration to find event ID
      const registrationData = await redis.hGet(REGISTRATIONS_KEY, id.toString())
      if (!registrationData) return false
      
      const registration = JSON.parse(registrationData) as Registration
      
      // Delete registration
      const result = await redis.hDel(REGISTRATIONS_KEY, id.toString())
      
      // Update event attendee count
      const eventData = await redis.hGet(EVENTS_KEY, registration.eventId.toString())
      if (eventData) {
        const event = JSON.parse(eventData) as Event
        if (event.attendees > 0) {
          event.attendees -= 1
          event.updatedAt = new Date().toISOString()
          await redis.hSet(EVENTS_KEY, registration.eventId.toString(), JSON.stringify(event))
        }
      }
      
      return result > 0
    } catch (error) {
      console.error('Redis error in deleteRegistration:', error)
      return false
    }
  },
}

// Initialize with sample data if empty
export const initializeDatabase = async () => {
  try {
    const eventCount = await redis.hLen(EVENTS_KEY)
    
    if (eventCount === 0) {
      console.log('Initializing database with sample data...')
      
      const sampleEvents = [
        {
          title: "5G Technology Workshop",
          date: "2024-03-15",
          time: "2:00 PM - 5:00 PM",
          location: "Engineering Building, Room 301",
          description: "Hands-on workshop exploring the latest 5G communication technologies and their real-world applications.",
          attendees: 0,
          maxAttendees: 60,
          category: "Workshop",
          featured: true,
          image: "/5g-workshop-banner.png",
        },
        {
          title: "AI in Communications Seminar",
          date: "2024-03-22",
          time: "1:00 PM - 3:00 PM",
          location: "Virtual Event",
          description: "Expert panel discussion on how artificial intelligence is revolutionizing communication systems.",
          attendees: 0,
          maxAttendees: 100,
          category: "Seminar",
          featured: false,
          image: "/ai-communication-seminar.png",
        },
        {
          title: "Network Security Bootcamp",
          date: "2024-04-05",
          time: "9:00 AM - 4:00 PM",
          location: "Computer Lab, Building C",
          description: "Intensive bootcamp covering advanced network security protocols and cybersecurity best practices.",
          attendees: 0,
          maxAttendees: 40,
          category: "Bootcamp",
          featured: false,
          image: "/network-security-bootcamp.png",
        },
        {
          title: "IoT Innovation Challenge",
          date: "2024-04-18",
          time: "10:00 AM - 6:00 PM",
          location: "Innovation Hub",
          description: "24-hour hackathon focused on developing innovative IoT solutions for smart cities.",
          attendees: 0,
          maxAttendees: 80,
          category: "Competition",
          featured: false,
          image: "/iot-hackathon-smart-cities.png",
        },
      ]
      
      for (const eventData of sampleEvents) {
        await eventDatabase.createEvent(eventData)
      }
      
      console.log('Sample data initialized successfully!')
    }
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}