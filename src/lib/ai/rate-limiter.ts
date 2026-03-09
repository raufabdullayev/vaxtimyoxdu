const DAILY_LIMIT = 20 // requests per IP per day
const BURST_LIMIT = 5 // requests per IP per minute
const BURST_WINDOW_MS = 60000 // 1 minute

// In-memory store (resets on server restart, sufficient for MVP)
const store = new Map<string, { count: number; resetAt: number }>()
const burstStore = new Map<string, number[]>()

export function checkRateLimit(
  ip: string
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now()

  // Clean expired entries periodically
  if (store.size > 10000) {
    store.forEach((val, key) => {
      if (val.resetAt < now) store.delete(key)
    })
  }

  if (burstStore.size > 10000) {
    burstStore.forEach((timestamps, key) => {
      const valid = timestamps.filter((t) => t > now - BURST_WINDOW_MS)
      if (valid.length === 0) {
        burstStore.delete(key)
      } else {
        burstStore.set(key, valid)
      }
    })
  }

  // Check burst limit first
  const burstTimestamps = burstStore.get(ip) || []
  const recentTimestamps = burstTimestamps.filter((t) => t > now - BURST_WINDOW_MS)

  if (recentTimestamps.length >= BURST_LIMIT) {
    const oldestInWindow = recentTimestamps[0]
    const retryAfter = Math.ceil((oldestInWindow + BURST_WINDOW_MS - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter }
  }

  // Check daily limit
  const entry = store.get(ip)

  if (!entry || entry.resetAt < now) {
    // New window: midnight UTC
    const tomorrow = new Date()
    tomorrow.setUTCHours(24, 0, 0, 0)
    store.set(ip, { count: 1, resetAt: tomorrow.getTime() })
    burstStore.set(ip, [...recentTimestamps, now])
    return { allowed: true, remaining: DAILY_LIMIT - 1 }
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  burstStore.set(ip, [...recentTimestamps, now])
  return { allowed: true, remaining: DAILY_LIMIT - entry.count }
}
