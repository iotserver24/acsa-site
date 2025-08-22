import { createClient } from 'redis'

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createClient> | undefined
}

let redis: ReturnType<typeof createClient>

try {
  redis = globalForRedis.redis ?? createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
      connectTimeout: 10000, // 10 second timeout
      commandTimeout: 10000, // 10 second timeout
      reconnectStrategy: (retries) => {
        if (retries > 10) {
          console.error('Redis connection failed after 10 retries')
          return new Error('Redis connection failed')
        }
        return Math.min(retries * 100, 3000)
      }
    }
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForRedis.redis = redis
  }

  // Connect to Redis if not already connected
  if (!redis.isOpen) {
    redis.connect().catch(console.error)
  }

  // Handle connection events
  redis.on('error', (err) => {
    console.error('Redis connection error:', err)
  })

  redis.on('connect', () => {
    console.log('Redis connected successfully')
  })

  redis.on('ready', () => {
    console.log('Redis is ready')
  })
} catch (error) {
  console.error('Failed to initialize Redis client:', error)
  throw new Error('Redis initialization failed')
}

export { redis }