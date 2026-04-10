import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

// ── Mocks ──────────────────────────────────────────────────────────────

/**
 * Build a fluent Supabase mock chain.
 *
 * The stats route uses two chaining patterns:
 *   countEvents: .from().select('*', {count:'exact',head:true}).eq().gte()
 *   list queries: .from().select('event_data').eq().gte().limit()
 *
 * We make every method return an object with the next method AND also
 * make the whole thing thenable so both patterns work.
 */
function createChainMock(resolvedValue: Record<string, unknown> = { count: 0, data: [], error: null }) {
  // Terminal mock -- satisfies both awaiting directly and calling .limit() / .order()
  const terminal: Record<string, unknown> = {
    limit: vi.fn().mockResolvedValue(resolvedValue),
    order: vi.fn().mockReturnValue({
      limit: vi.fn().mockResolvedValue(resolvedValue),
      then: (resolve: (v: unknown) => void) => resolve(resolvedValue),
    }),
    // Make the object itself thenable
    then: (resolve: (v: unknown) => void) => resolve(resolvedValue),
  }

  const chain = {
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        gte: vi.fn().mockReturnValue(terminal),
      }),
    }),
  }

  return chain
}

const mockFrom = vi.fn((_table: string) => createChainMock())

vi.mock('@/lib/supabase/client', () => ({
  isSupabaseConfigured: true,
  getSupabaseServer: vi.fn(() => ({ from: mockFrom })),
}))

import { GET } from '@/app/api/analytics/stats/route'

// ── Helpers ────────────────────────────────────────────────────────────

function createRequest(apiKey?: string): NextRequest {
  const url = 'http://localhost:3000/api/analytics/stats'

  const headers: HeadersInit = {}
  if (apiKey) {
    headers['x-api-key'] = apiKey
  }

  return new NextRequest(url, { method: 'GET', headers })
}

describe('GET /api/analytics/stats', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    process.env = { ...ORIGINAL_ENV, ANALYTICS_API_KEY: 'test-secret-key' }
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
  })

  describe('authentication', () => {
    it('should return 401 when no API key is provided', async () => {
      const req = createRequest()
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should return 401 when wrong API key is provided via header', async () => {
      const req = createRequest('wrong-key')
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })


    it('should return 401 when ANALYTICS_API_KEY env var is not set', async () => {
      delete process.env.ANALYTICS_API_KEY

      const req = createRequest('test-secret-key')
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('authorized requests', () => {
    it('should accept valid API key via header and return 200', async () => {
      const req = createRequest('test-secret-key')
      const response = await GET(req)

      expect(response.status).toBe(200)
    })


    it('should return the expected response shape', async () => {
      const req = createRequest('test-secret-key')
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('generated_at')
      expect(data).toHaveProperty('page_views')
      expect(data.page_views).toHaveProperty('last_24h')
      expect(data.page_views).toHaveProperty('last_7d')
      expect(data.page_views).toHaveProperty('last_30d')
      expect(data).toHaveProperty('tool_uses')
      expect(data.tool_uses).toHaveProperty('last_24h')
      expect(data.tool_uses).toHaveProperty('last_7d')
      expect(data.tool_uses).toHaveProperty('last_30d')
      expect(data).toHaveProperty('popular_tools')
      expect(data).toHaveProperty('visitors_by_locale')
      expect(data).toHaveProperty('top_pages')
      expect(data).toHaveProperty('share_clicks')
      expect(data).toHaveProperty('tool_completions')
      expect(data).toHaveProperty('errors_404')
      expect(data).toHaveProperty('range')
      expect(Array.isArray(data.popular_tools)).toBe(true)
      expect(Array.isArray(data.visitors_by_locale)).toBe(true)
      expect(Array.isArray(data.top_pages)).toBe(true)
      expect(Array.isArray(data.share_clicks)).toBe(true)
      expect(Array.isArray(data.tool_completions)).toBe(true)
      expect(Array.isArray(data.errors_404)).toBe(true)
    })

    it('should return zero counts when no data exists', async () => {
      const req = createRequest('test-secret-key')
      const response = await GET(req)
      const data = await response.json()

      expect(data.page_views.last_24h).toBe(0)
      expect(data.page_views.last_7d).toBe(0)
      expect(data.page_views.last_30d).toBe(0)
      expect(data.tool_uses.last_24h).toBe(0)
      expect(data.tool_uses.last_7d).toBe(0)
      expect(data.tool_uses.last_30d).toBe(0)
      expect(data.popular_tools).toEqual([])
      expect(data.visitors_by_locale).toEqual([])
      expect(data.top_pages).toEqual([])
      expect(data.share_clicks).toEqual([])
      expect(data.tool_completions).toEqual([])
      expect(data.errors_404).toEqual([])
    })

    it('should call supabase.from with analytics_events', async () => {
      const req = createRequest('test-secret-key')
      await GET(req)

      // The route calls .from('analytics_events') multiple times (counts + aggregations)
      expect(mockFrom).toHaveBeenCalled()
      for (const call of mockFrom.mock.calls) {
        expect(call[0]).toBe('analytics_events')
      }
    })
  })
})
