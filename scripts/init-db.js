const { initializeDatabase } = require('../lib/file-database.ts')

async function main() {
  try {
    console.log('Initializing database...')
    await initializeDatabase()
    console.log('Database initialized successfully!')
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }
}

main()
