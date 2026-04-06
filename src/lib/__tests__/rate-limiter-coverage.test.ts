import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Upstash - no Redis configured by default
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: vi.fn().mockImplementation(() => ({
    limit: vi.fn().mockResolvedValue({ success: true, remaining: 5, reset: Date.now() + 60000 }),
  })),
}))

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(() => ({})),
}))

beforeEach(() => {
  vi.resetModules()
  vi.unstubAllEnvs()
})

describe('createRateLimiter - in-memory fallback (dev)', () => {
  it('allows requests within limit', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('NODE_ENV', 'development')
    const { createRateLimiter } = await import('../rate-limiter')
    const check = createRateLimiter({ limit: 3, window: '1 m', prefix: 'test1' })
    const r1 = await check('user1')
    expect(r1.allowed).toBe(true)
    expect(r1.remaining).toBe(2)
  })

  it('decrements remaining on subsequent requests', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('NODE_ENV', 'development')
    const { createRateLimiter } = await import('../rate-limiter')
    const check = createRateLimiter({ limit: 3, window: '1 m', prefix: 'test2' })
    await check('user2')
    const r2 = await check('user2')
    expect(r2.allowed).toBe(true)
    expect(r2.remaining).toBe(1)
  })

  it('blocks after limit exceeded', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('NODE_ENV', 'development')
    const { createRateLimiter } = await import('../rate-limiter')
    const check = createRateLimiter({ limit: 2, window: '1 m', prefix: 'test3' })
    await check('user3')
    await check('user3')
    const r3 = await check('user3')
    expect(r3.allowed).toBe(false)
    expect(r3.remaining).toBe(0)
    expect(r3.retryAfter).toBeGreaterThan(0)
  })

  it('isolates different keys', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('NODE_ENV', 'development')
    const { createRateLimiter } = await import('../rate-limiter')
    const check = createRateLimiter({ limit: 1, window: '1 m', prefix: 'test4' })
    await check('userA')
    const rB = await check('userB')
    expect(rB.allowed).toBe(true)
  })

  it('supports different window units (seconds, hours, days)', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('NODE_ENV', 'development')
    const { createRateLimiter } = await import('../rate-limiter')
    // Test seconds window
    const checkS = createRateLimiter({ limit: 5, window: '10 s', prefix: 'test-s' })
    const rs = await checkS('key')
    expect(rs.allowed).toBe(true)
    // Test hours window
    const checkH = createRateLimiter({ limit: 100, window: '1 h', prefix: 'test-h' })
    const rh = await checkH('key')
    expect(rh.allowed).toBe(true)
    // Test days window
    const checkD = createRateLimiter({ limit: 1000, window: '1 d', prefix: 'test-d' })
    const rd = await checkD('key')
    expect(rd.allowed).toBe(true)
  })
})

describe('createRateLimiter - production without Redis', () => {
  it('fails closed (rejects all) in production without Redis', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    vi.stubEnv('NODE_ENV', 'production')
    const { createRateLimiter } = await import('../rate-limiter')
    const check = createRateLimiter({ limit: 10, window: '1 m', prefix: 'prod-test' })
    const result = await check('any-user')
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })
})
