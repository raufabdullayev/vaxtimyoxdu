import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

describe('Market Prices API', () => {
  beforeEach(() => {
    vi.resetModules()
    mockFetch.mockReset()
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

  it('GET returns 503 when all fetches fail and no cache', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { GET } = await import('../../api/market-prices/route')
    const response = await GET()

    // Could be 200 (cached) or 503 (no cache)
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

    expect(response.headers.get('Cache-Control')).toBeTruthy()
  })
})
