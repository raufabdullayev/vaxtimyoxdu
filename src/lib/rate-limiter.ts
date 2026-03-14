import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

type WindowUnit = 's' | 'm' | 'h' | 'd'

interface RateLimiterConfig {
  /** Maximum number of requests allowed in the window */
  limit: number
  /** Window duration string, e.g. '1 h', '10 m' */
  window: `${number} ${WindowUnit}`
  /** Prefix for Redis keys / in-memory isolation */
  prefix: string
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfter?: number
}

const WINDOW_MS: Record<WindowUnit, number> = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
}

function parseWindowMs(window: `${number} ${WindowUnit}`): number {
  const [numStr, unit] = window.split(' ') as [string, WindowUnit]
  return parseInt(numStr, 10) * WINDOW_MS[unit]
}

// Shared Redis instance (same pattern as ai/rate-limiter.ts)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim()
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()

const redis =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null

// Cache Upstash limiters and in-memory stores by prefix
const upstashLimiters = new Map<string, Ratelimit>()
const memoryStores = new Map<string, Map<string, { count: number; resetAt: number }>>()

function getUpstashLimiter(config: RateLimiterConfig): Ratelimit | null {
  if (!redis) return null

  let limiter = upstashLimiters.get(config.prefix)
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.limit, config.window),
      prefix: config.prefix,
    })
    upstashLimiters.set(config.prefix, limiter)
  }
  return limiter
}

function getMemoryStore(prefix: string): Map<string, { count: number; resetAt: number }> {
  let store = memoryStores.get(prefix)
  if (!store) {
    store = new Map()
    memoryStores.set(prefix, store)
  }
  return store
}

export function createRateLimiter(config: RateLimiterConfig) {
  const windowMs = parseWindowMs(config.window)

  return async function checkLimit(key: string): Promise<RateLimitResult> {
    // Upstash path
    const limiter = getUpstashLimiter(config)
    if (limiter) {
      const result = await limiter.limit(key)
      if (!result.success) {
        const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)
        return { allowed: false, remaining: 0, retryAfter: Math.max(retryAfter, 1) }
      }
      return { allowed: true, remaining: result.remaining }
    }

    // In-memory fallback
    const store = getMemoryStore(config.prefix)
    const now = Date.now()

    // Periodic cleanup
    if (store.size > 10000) {
      store.forEach((val, k) => {
        if (val.resetAt < now) store.delete(k)
      })
    }

    const entry = store.get(key)

    if (!entry || entry.resetAt < now) {
      store.set(key, { count: 1, resetAt: now + windowMs })
      return { allowed: true, remaining: config.limit - 1 }
    }

    if (entry.count >= config.limit) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      return { allowed: false, remaining: 0, retryAfter: Math.max(retryAfter, 1) }
    }

    entry.count++
    return { allowed: true, remaining: config.limit - entry.count }
  }
}
