const DAILY_LIMIT = 20 // requests per IP per day

// In-memory store (resets on server restart, sufficient for MVP)
const store = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(ip)

  // Clean expired entries periodically
  if (store.size > 10000) {
    store.forEach((val, key) => {
      if (val.resetAt < now) store.delete(key)
    })
  }

  if (!entry || entry.resetAt < now) {
    // New window: midnight UTC
    const tomorrow = new Date()
    tomorrow.setUTCHours(24, 0, 0, 0)
    store.set(ip, { count: 1, resetAt: tomorrow.getTime() })
    return { allowed: true, remaining: DAILY_LIMIT - 1 }
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: DAILY_LIMIT - entry.count }
}
