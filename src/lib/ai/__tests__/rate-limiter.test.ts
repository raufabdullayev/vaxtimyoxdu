import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock @upstash/redis and @upstash/ratelimit before any imports
vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(),
}))
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: vi.fn(),
}))

describe('checkRateLimit – in-memory fallback (development)', () => {
  beforeEach(() => {
    vi.resetModules()
    // Ensure Upstash env vars are NOT set so the in-memory path is used
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    // Ensure we're in development mode for in-memory fallback
    process.env.NODE_ENV = 'test'
  })

  async function getCheckRateLimit() {
    const mod = await import('@/lib/ai/rate-limiter')
    return mod.checkRateLimit
  }

  // ---- Shape / contract tests ----

  it('returns an object with { allowed, remaining } when request is allowed', async () => {
    const checkRateLimit = await getCheckRateLimit()
    const result = await checkRateLimit('10.0.0.1')

    expect(result).toHaveProperty('allowed')
    expect(result).toHaveProperty('remaining')
    expect(typeof result.allowed).toBe('boolean')
    expect(typeof result.remaining).toBe('number')
  })

  it('is an async function that returns a Promise', async () => {
    const checkRateLimit = await getCheckRateLimit()
    const returnValue = checkRateLimit('10.0.0.1')

    expect(returnValue).toBeInstanceOf(Promise)
    await returnValue // settle the promise
  })

  // ---- In-memory fallback detection ----

  it('falls back to in-memory limiter when UPSTASH env vars are NOT set', async () => {
    const checkRateLimit = await getCheckRateLimit()
    const result = await checkRateLimit('10.0.0.1')

    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(19) // DAILY_LIMIT (20) - 1
  })

  // ---- Daily limit tests ----

  it('allows requests under the daily limit (20/day)', async () => {
    const checkRateLimit = await getCheckRateLimit()

    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit('10.0.0.2')
      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(20 - (i + 1))
    }
  })

  it('blocks when daily limit is exceeded and returns allowed: false', async () => {
    const checkRateLimit = await getCheckRateLimit()

    // Exhaust 20 requests (burst limit is 5/min so we need to stagger)
    const realDateNow = Date.now
    let fakeNow = realDateNow.call(Date)

    vi.spyOn(Date, 'now').mockImplementation(() => fakeNow)

    for (let i = 0; i < 20; i++) {
      // Advance time by 61 seconds every 5 requests to avoid burst limit
      if (i > 0 && i % 5 === 0) {
        fakeNow += 61000
      }
      const result = await checkRateLimit('10.0.0.3')
      expect(result.allowed).toBe(true)
    }

    // The 21st request should be blocked
    fakeNow += 61000
    const blocked = await checkRateLimit('10.0.0.3')
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)

    vi.spyOn(Date, 'now').mockRestore()
  })

  // ---- Burst limit tests ----

  it('allows requests under the burst limit (5/min)', async () => {
    const checkRateLimit = await getCheckRateLimit()

    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit('10.0.0.4')
      expect(result.allowed).toBe(true)
    }
  })

  it('blocks when burst limit is exceeded and returns retryAfter', async () => {
    const checkRateLimit = await getCheckRateLimit()

    // Make 5 requests (the burst limit)
    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit('10.0.0.5')
      expect(result.allowed).toBe(true)
    }

    // The 6th request within the same minute window should be blocked
    const blocked = await checkRateLimit('10.0.0.5')
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
    expect(blocked.retryAfter).toBeDefined()
    expect(typeof blocked.retryAfter).toBe('number')
    expect(blocked.retryAfter!).toBeGreaterThan(0)
  })

  // ---- Remaining count ----

  it('returns correct remaining count that decrements with each request', async () => {
    const checkRateLimit = await getCheckRateLimit()

    const r1 = await checkRateLimit('10.0.0.6')
    expect(r1.remaining).toBe(19)

    const r2 = await checkRateLimit('10.0.0.6')
    expect(r2.remaining).toBe(18)

    const r3 = await checkRateLimit('10.0.0.6')
    expect(r3.remaining).toBe(17)
  })

  // ---- IP isolation ----

  it('tracks separate limits for different IPs', async () => {
    const checkRateLimit = await getCheckRateLimit()

    const ipA = '192.168.1.1'
    const ipB = '192.168.1.2'

    // Use 3 requests from IP A
    for (let i = 0; i < 3; i++) {
      await checkRateLimit(ipA)
    }

    // IP B should still have a full quota
    const resultB = await checkRateLimit(ipB)
    expect(resultB.allowed).toBe(true)
    expect(resultB.remaining).toBe(19)

    // IP A should show 17 remaining
    const resultA = await checkRateLimit(ipA)
    expect(resultA.allowed).toBe(true)
    expect(resultA.remaining).toBe(16) // 20 - 4 (3 previous + this one)
  })

  // ---- retryAfter only present when blocked ----

  it('does not include retryAfter when request is allowed', async () => {
    const checkRateLimit = await getCheckRateLimit()
    const result = await checkRateLimit('10.0.0.7')

    expect(result.allowed).toBe(true)
    expect(result.retryAfter).toBeUndefined()
  })
})

describe('checkRateLimit – fail-closed in production', () => {
  beforeEach(() => {
    vi.resetModules()
    // No Redis configured
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('rejects all requests when Redis is unavailable in production', async () => {
    process.env.NODE_ENV = 'production'
    const mod = await import('@/lib/ai/rate-limiter')
    const result = await mod.checkRateLimit('10.0.0.1')

    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })
})
