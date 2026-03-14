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
})
