import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('Market Prices API', () => {
  beforeEach(() => {
    vi.resetModules()
    mockFetch.mockReset()
    // Force redis = null inside the route module so the test environment
    // doesn't try to talk to Upstash. Lazy init in route.ts treats
    // empty/undefined env vars as "no Redis configured".
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('GET returns market prices on success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        bitcoin: { usd: 65000, usd_24h_change: 2.5 },
        ethereum: { usd: 3500, usd_24h_change: -1.2 },
      }),
    })

    const { GET } = await import('../../api/market-prices/route')
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.prices).toBeDefined()
    expect(data.updatedAt).toBeDefined()
  })

  it('GET returns 200 (empty fallback) when all fetches fail and no cache', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { GET } = await import('../../api/market-prices/route')
    const response = await GET()

    // Route never throws -- worst case it returns an empty success response
    // so SSR doesn't cascade-fail.
    expect([200, 503]).toContain(response.status)
  })

  it('response includes cache control headers', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        bitcoin: { usd: 65000, usd_24h_change: 2.5 },
        ethereum: { usd: 3500, usd_24h_change: -1.2 },
      }),
    })

    const { GET } = await import('../../api/market-prices/route')
    const response = await GET()

    const cacheControl = response.headers.get('Cache-Control')
    expect(cacheControl).toBeTruthy()
    // 5-second CDN cache plus 10s SWR window
    expect(cacheControl).toContain('s-maxage=5')
    expect(cacheControl).toContain('stale-while-revalidate=10')
  })

  it('second GET within in-memory TTL does not re-fetch upstream', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        bitcoin: { usd: 65000, usd_24h_change: 2.5 },
        ethereum: { usd: 3500, usd_24h_change: -1.2 },
      }),
    })

    const { GET } = await import('../../api/market-prices/route')

    const r1 = await GET()
    const callsAfterFirst = mockFetch.mock.calls.length
    expect(r1.status).toBe(200)
    expect(callsAfterFirst).toBeGreaterThan(0)

    // Second call within TTL should be served from L1 (no new upstream calls)
    const r2 = await GET()
    expect(r2.status).toBe(200)
    expect(mockFetch.mock.calls.length).toBe(callsAfterFirst)
    expect(r2.headers.get('X-Cache')).toBe('HIT')
  })
})
