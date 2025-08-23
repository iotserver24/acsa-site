import { initializeDatabase } from './database'

// Initialize database on app startup
export async function initializeApp() {
  try {
    console.log('Initializing ACSA application...')
    await initializeDatabase()
    console.log('ACSA application initialized successfully!')
  } catch (error) {
    console.error('Failed to initialize ACSA application:', error)
  }
}

// Call initialization
initializeApp().catch(console.error)
