import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock Supabase client
const { mockIsConfigured, mockGetServer, mockGetSession } = vi.hoisted(() => ({
  mockIsConfigured: { value: false },
  mockGetServer: vi.fn(),
  mockGetSession: vi.fn(),
}))
vi.mock('@/lib/supabase/client', () => ({
  get isSupabaseConfigured() {
    return mockIsConfigured.value
  },
  getSupabaseServer: mockGetServer,
}))

// Mock Redis
const { mockPing } = vi.hoisted(() => ({
  mockPing: vi.fn(),
}))
vi.mock('@upstash/redis', () => ({
  Redis: class MockRedis {
    ping = mockPing
  },
}))

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Defaults: both services missing
    mockIsConfigured.value = false
    mockGetServer.mockReturnValue(null)

    // Provide Redis env so the mock Redis client gets created
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://fake.upstash.io')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'fake-token')
  })

  async function callGET() {
    const mod = await import('@/app/api/health/route')
    return mod.GET()
  }

  it('returns unhealthy when supabase missing and redis errors', async () => {
    mockPing.mockRejectedValue(new Error('no redis'))
    mockIsConfigured.value = false

    const response = await callGET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('unhealthy')
    expect(data.checks.supabase.status).toBe('missing')
    expect(data.checks.redis.status).toBe('error')
  })

  it('returns healthy when both services respond ok', async () => {
    mockIsConfigured.value = true
    mockGetServer.mockReturnValue({
      auth: { getSession: () => Promise.resolve({ error: null }) },
    })
    mockPing.mockResolvedValue('PONG')

    const response = await callGET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data.checks.supabase.status).toBe('ok')
    expect(data.checks.redis.status).toBe('ok')
    expect(data.version).toBeDefined()
    expect(data.timestamp).toBeDefined()
  })

  it('returns unhealthy (503) when supabase errors', async () => {
    mockIsConfigured.value = true
    mockGetServer.mockReturnValue({
      auth: {
        getSession: () => Promise.resolve({ error: { message: 'fail' } }),
      },
    })
    mockPing.mockResolvedValue('PONG')

    const response = await callGET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('unhealthy')
    expect(data.checks.supabase.status).toBe('error')
    expect(data.checks.supabase.responseTime).toBeTypeOf('number')
  })

  it('returns unhealthy when redis ping fails', async () => {
    mockIsConfigured.value = false
    mockPing.mockRejectedValue(new Error('connection refused'))

    const response = await callGET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('unhealthy')
    expect(data.checks.redis.status).toBe('error')
  })

  it('includes Cache-Control header', async () => {
    mockPing.mockRejectedValue(new Error('no redis'))

    const response = await callGET()

    expect(response.headers.get('Cache-Control')).toBe(
      'public, max-age=30, s-maxage=30'
    )
  })

  it('includes response times for services that respond', async () => {
    mockIsConfigured.value = true
    mockGetServer.mockReturnValue({
      auth: { getSession: () => Promise.resolve({ error: null }) },
    })
    mockPing.mockResolvedValue('PONG')

    const response = await callGET()
    const data = await response.json()

    expect(data.checks.supabase.responseTime).toBeTypeOf('number')
    expect(data.checks.redis.responseTime).toBeTypeOf('number')
  })

  it('returns unhealthy when redis returns non-PONG', async () => {
    mockIsConfigured.value = false
    mockPing.mockResolvedValue('UNEXPECTED')

    const response = await callGET()
    const data = await response.json()

    expect(data.checks.redis.status).toBe('error')
  })

  it('returns missing for supabase when getSupabaseServer returns null', async () => {
    mockIsConfigured.value = true
    mockGetServer.mockReturnValue(null)
    mockPing.mockResolvedValue('PONG')

    const response = await callGET()
    const data = await response.json()

    expect(data.checks.supabase.status).toBe('missing')
    expect(data.status).toBe('degraded')
  })

  it('handles supabase auth.getSession throwing', async () => {
    mockIsConfigured.value = true
    mockGetServer.mockReturnValue({
      auth: {
        getSession: () => Promise.reject(new Error('network error')),
      },
    })
    mockPing.mockResolvedValue('PONG')

    const response = await callGET()
    const data = await response.json()

    expect(data.checks.supabase.status).toBe('error')
    expect(data.status).toBe('unhealthy')
  })
})
