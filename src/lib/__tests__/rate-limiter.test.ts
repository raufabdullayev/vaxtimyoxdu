import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock Upstash modules
vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(),
}))
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: vi.fn(),
}))

describe('createRateLimiter – in-memory fallback', () => {
  beforeEach(() => {
    vi.resetModules()
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    ;(process.env as Record<string, string>).NODE_ENV = 'test'
  })

  async function getCreateRateLimiter() {
    const mod = await import('@/lib/rate-limiter')
    return mod.createRateLimiter
  }

  it('returns allowed: true for first request', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const checkLimit = createRateLimiter({ limit: 5, window: '1 h', prefix: 'test:a' })
    const result = await checkLimit('10.0.0.1')

    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(4)
  })

  it('decrements remaining with each request', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const checkLimit = createRateLimiter({ limit: 5, window: '1 h', prefix: 'test:b' })

    const r1 = await checkLimit('10.0.0.2')
    expect(r1.remaining).toBe(4)

    const r2 = await checkLimit('10.0.0.2')
    expect(r2.remaining).toBe(3)

    const r3 = await checkLimit('10.0.0.2')
    expect(r3.remaining).toBe(2)
  })

  it('blocks when limit is exceeded', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const checkLimit = createRateLimiter({ limit: 3, window: '1 m', prefix: 'test:c' })

    for (let i = 0; i < 3; i++) {
      const result = await checkLimit('10.0.0.3')
      expect(result.allowed).toBe(true)
    }

    const blocked = await checkLimit('10.0.0.3')
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
    expect(blocked.retryAfter).toBeDefined()
    expect(blocked.retryAfter!).toBeGreaterThan(0)
  })

  it('isolates different IPs', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const checkLimit = createRateLimiter({ limit: 5, window: '1 h', prefix: 'test:d' })

    await checkLimit('ip-a')
    await checkLimit('ip-a')

    const resultB = await checkLimit('ip-b')
    expect(resultB.allowed).toBe(true)
    expect(resultB.remaining).toBe(4) // full quota for ip-b
  })

  it('isolates different prefixes', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const limiterA = createRateLimiter({ limit: 2, window: '1 m', prefix: 'test:e1' })
    const limiterB = createRateLimiter({ limit: 2, window: '1 m', prefix: 'test:e2' })

    await limiterA('same-ip')
    await limiterA('same-ip')
    const blockedA = await limiterA('same-ip')
    expect(blockedA.allowed).toBe(false)

    // limiterB should still allow since different prefix
    const resultB = await limiterB('same-ip')
    expect(resultB.allowed).toBe(true)
  })

  it('does not include retryAfter when allowed', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const checkLimit = createRateLimiter({ limit: 5, window: '1 h', prefix: 'test:f' })
    const result = await checkLimit('10.0.0.4')

    expect(result.allowed).toBe(true)
    expect(result.retryAfter).toBeUndefined()
  })

  it('resets count after window expires', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const checkLimit = createRateLimiter({ limit: 2, window: '1 s', prefix: 'test:reset' })

    const realDateNow = Date.now
    let fakeNow = realDateNow.call(Date)
    vi.spyOn(Date, 'now').mockImplementation(() => fakeNow)

    await checkLimit('10.0.0.10')
    await checkLimit('10.0.0.10')
    const blocked = await checkLimit('10.0.0.10')
    expect(blocked.allowed).toBe(false)

    // Advance past the 1-second window
    fakeNow += 1100
    const afterReset = await checkLimit('10.0.0.10')
    expect(afterReset.allowed).toBe(true)
    expect(afterReset.remaining).toBe(1)

    vi.spyOn(Date, 'now').mockRestore()
  })

  it('supports different window units (seconds, minutes, hours, days)', async () => {
    const createRateLimiter = await getCreateRateLimiter()

    // 10 second window
    const limiterS = createRateLimiter({ limit: 1, window: '10 s', prefix: 'test:unit-s' })
    const r1 = await limiterS('ip')
    expect(r1.allowed).toBe(true)
    const r2 = await limiterS('ip')
    expect(r2.allowed).toBe(false)

    // 1 minute window
    const limiterM = createRateLimiter({ limit: 1, window: '1 m', prefix: 'test:unit-m' })
    const r3 = await limiterM('ip2')
    expect(r3.allowed).toBe(true)

    // 1 day window
    const limiterD = createRateLimiter({ limit: 1, window: '1 d', prefix: 'test:unit-d' })
    const r4 = await limiterD('ip3')
    expect(r4.allowed).toBe(true)
  })

  it('retryAfter is at least 1 second when blocked', async () => {
    const createRateLimiter = await getCreateRateLimiter()
    const checkLimit = createRateLimiter({ limit: 1, window: '1 m', prefix: 'test:retry-min' })

    await checkLimit('ip-retry')
    const blocked = await checkLimit('ip-retry')
    expect(blocked.retryAfter).toBeGreaterThanOrEqual(1)
  })
})

describe('createRateLimiter – fail-closed in production', () => {
  beforeEach(() => {
    vi.resetModules()
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('rejects all requests when Redis is unavailable in production', async () => {
    ;(process.env as Record<string, string>).NODE_ENV = 'production'
    const mod = await import('@/lib/rate-limiter')
    const checkLimit = mod.createRateLimiter({ limit: 10, window: '1 h', prefix: 'test:prod' })
    const result = await checkLimit('10.0.0.1')

    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('allows in-memory fallback in development even without Redis', async () => {
    ;(process.env as Record<string, string>).NODE_ENV = 'development'
    const mod = await import('@/lib/rate-limiter')
    const checkLimit = mod.createRateLimiter({ limit: 10, window: '1 h', prefix: 'test:dev' })
    const result = await checkLimit('10.0.0.1')

    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(9)
  })
})
