import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const DAILY_LIMIT = 20 // requests per IP per day
const BURST_LIMIT = 5 // requests per IP per minute
const BURST_WINDOW_MS = 60000 // 1 minute

// Use Upstash Redis in production, in-memory fallback for dev
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// Upstash rate limiters
const dailyLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 d'),
      prefix: 'rl:daily',
    })
  : null

const burstLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      prefix: 'rl:burst',
    })
  : null

// In-memory fallback stores (for local dev or when Redis is not configured)
const memoryDailyStore = new Map<string, { count: number; resetAt: number }>()
const memoryBurstStore = new Map<string, number[]>()

export async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; remaining: number; retryAfter?: number }> {
  // Use Upstash if available
  if (dailyLimiter && burstLimiter) {
    // Check burst first
    const burst = await burstLimiter.limit(ip)
    if (!burst.success) {
      const retryAfter = Math.ceil((burst.reset - Date.now()) / 1000)
      return { allowed: false, remaining: 0, retryAfter: Math.max(retryAfter, 1) }
    }
    // Check daily
    const daily = await dailyLimiter.limit(ip)
    if (!daily.success) {
      return { allowed: false, remaining: 0 }
    }
    return { allowed: true, remaining: daily.remaining }
  }

  // Fallback: in-memory (same logic as before, for local dev)
  const now = Date.now()

  // Clean expired entries periodically
  if (memoryDailyStore.size > 10000) {
    memoryDailyStore.forEach((val, key) => {
      if (val.resetAt < now) memoryDailyStore.delete(key)
    })
  }

  if (memoryBurstStore.size > 10000) {
    memoryBurstStore.forEach((timestamps, key) => {
      const valid = timestamps.filter((t) => t > now - BURST_WINDOW_MS)
      if (valid.length === 0) {
        memoryBurstStore.delete(key)
      } else {
        memoryBurstStore.set(key, valid)
      }
    })
  }

  // Check burst limit first
  const burstTimestamps = memoryBurstStore.get(ip) || []
  const recentTimestamps = burstTimestamps.filter((t) => t > now - BURST_WINDOW_MS)

  if (recentTimestamps.length >= BURST_LIMIT) {
    const oldestInWindow = recentTimestamps[0]
    const retryAfter = Math.ceil((oldestInWindow + BURST_WINDOW_MS - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter }
  }

  // Check daily limit
  const entry = memoryDailyStore.get(ip)

  if (!entry || entry.resetAt < now) {
    // New window: midnight UTC
    const tomorrow = new Date()
    tomorrow.setUTCHours(24, 0, 0, 0)
    memoryDailyStore.set(ip, { count: 1, resetAt: tomorrow.getTime() })
    memoryBurstStore.set(ip, [...recentTimestamps, now])
    return { allowed: true, remaining: DAILY_LIMIT - 1 }
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  memoryBurstStore.set(ip, [...recentTimestamps, now])
  return { allowed: true, remaining: DAILY_LIMIT - entry.count }
}
