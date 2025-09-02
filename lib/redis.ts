import { createClient } from 'redis'

function sanitizeRedisUrl(input: string | undefined): string {
  if (!input || input.trim().length === 0) {
    return 'redis://localhost:6379'
  }

  const trimmed = input.trim()

  // If the value looks like an Upstash copy-paste (e.g., "redis-cli --tls -u redis://..."), extract the URL portion
  const urlMatch = trimmed.match(/(rediss?:\/\/[^\s'\"]+)/)
  const hasTlsFlag = /(^|\s)--tls(\s|$)/.test(trimmed)
  let url = urlMatch ? urlMatch[1] : trimmed

  // If we detected a tls flag but scheme is redis://, upgrade to rediss://
  if (hasTlsFlag && url.startsWith('redis://')) {
    url = url.replace(/^redis:\/\//, 'rediss://')
  }

  // Basic validation: ensure it starts with redis:// or rediss://
  if (!/^rediss?:\/\//.test(url)) {
    return 'redis://localhost:6379'
  }

  return url
}

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createClient> | undefined
}

let redis: ReturnType<typeof createClient>

try {
  redis = globalForRedis.redis ?? createClient({
    url: sanitizeRedisUrl(process.env.REDIS_URL),
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
  // Do not crash the build/runtime if Redis init fails; log and create a no-op client
  console.error('Failed to initialize Redis client:', error)
  const disabledClient = createClient({ url: 'redis://localhost:6379' })
  // Override methods to throw lazily when actually used
  const handler: ProxyHandler<typeof disabledClient> = {
    get(target, prop, receiver) {
      // Provide isOpen=false and a connect that rejects to signal unavailability
      if (prop === 'isOpen') return false
      if (prop === 'connect') return async () => { throw new Error('Redis unavailable: initialization failed') }
      if (prop === 'on') return () => receiver
      const value = (target as any)[prop]
      if (typeof value === 'function') {
        return async () => { throw new Error('Redis unavailable: initialization failed') }
      }
      return value
    }
  }
  // @ts-ignore - proxying to mimic client surface
  redis = new Proxy(disabledClient, handler)
}

export { redis }