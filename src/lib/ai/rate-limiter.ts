import { createRateLimiter } from '@/lib/rate-limiter'

const DAILY_LIMIT = 20
const BURST_LIMIT = 5

const checkBurst = createRateLimiter({
  limit: BURST_LIMIT,
  window: '1 m',
  prefix: 'rl:burst',
})

const checkDaily = createRateLimiter({
  limit: DAILY_LIMIT,
  window: '1 d',
  prefix: 'rl:daily',
})

export async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; remaining: number; retryAfter?: number }> {
  // Check burst first
  const burst = await checkBurst(ip)
  if (!burst.allowed) {
    return { allowed: false, remaining: 0, retryAfter: burst.retryAfter }
  }

  // Check daily
  const daily = await checkDaily(ip)
  if (!daily.allowed) {
    return { allowed: false, remaining: 0 }
  }

  return { allowed: true, remaining: daily.remaining }
}
