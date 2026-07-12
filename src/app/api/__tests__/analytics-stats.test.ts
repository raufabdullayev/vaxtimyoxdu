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
// Per-test data injection, keyed by `${event_type}:${selectArg}` for list
// queries and by event_type for counts. Reset in beforeEach.
let dataForQuery: Record<string, unknown[]> = {}
let countForType: Record<string, number> = {}

/**
 * Data-driven Supabase chain mock. Captures the `.select(field)` argument and
 * the `.eq('event_type', X)` value so the terminal can resolve the right rows
 * for each of the route's queries, letting a test inject (e.g.) tied tool_use
 * rows for just the popular_tools aggregation.
 */
function createChainMock() {
  let selectArg = ''
  let eventType = ''
  const resolveValue = () => ({
    count: countForType[eventType] ?? 0,
    data: dataForQuery[`${eventType}:${selectArg}`] ?? [],
    error: null,
  })
  const terminal: Record<string, unknown> = {
    limit: vi.fn(() => Promise.resolve(resolveValue())),
    order: vi.fn(() => ({
      limit: vi.fn(() => Promise.resolve(resolveValue())),
      then: (resolve: (v: unknown) => void) => resolve(resolveValue()),
    })),
    then: (resolve: (v: unknown) => void) => resolve(resolveValue()),
  }
  return {
    select: vi.fn((arg: string) => {
      selectArg = arg
      return {
        eq: vi.fn((_col: string, val: string) => {
          eventType = val
          return { gte: vi.fn(() => terminal) }
        }),
      }
    }),
  }
}

const mockFrom = vi.fn((_table: string) => createChainMock())

// When set, the mocked client exposes an `.rpc` resolving this value —
// exercising the Postgres fast path. Left null so the other tests keep hitting
// the JS fallback (a client without `.rpc`, matching production pre-migration).
let rpcResult: { data: unknown; error: unknown } | null = null

vi.mock('@/lib/supabase/client', () => ({
  isSupabaseConfigured: true,
  getSupabaseServer: vi.fn(() => {
    const client: Record<string, unknown> = { from: mockFrom }
    if (rpcResult) client.rpc = vi.fn().mockResolvedValue(rpcResult)
    return client
  }),
}))

// The route's rate limiter is module-level shared state; mock it to always
// allow so tests are order-independent (no cross-test bucket accumulation).
vi.mock('@/lib/rate-limiter', () => ({
  createRateLimiter: () => vi.fn(async () => ({ allowed: true })),
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
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    dataForQuery = {}
    countForType = {}
    rpcResult = null
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

    it('applies the count-desc, key-asc tie-break in the JS fallback', async () => {
      // banana and apple both occur twice → the alphabetical tie-break must put
      // apple first even though banana was seen first (Map insertion order).
      dataForQuery['tool_use:event_data'] = [
        { event_data: { tool: 'banana' } },
        { event_data: { tool: 'apple' } },
        { event_data: { tool: 'banana' } },
        { event_data: { tool: 'apple' } },
        { event_data: { tool: 'cherry' } },
      ]

      const req = createRequest('test-secret-key')
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.popular_tools).toEqual([
        { tool: 'apple', count: 2 },
        { tool: 'banana', count: 2 },
        { tool: 'cherry', count: 1 },
      ])
    })

    it('uses the Postgres fast path when the client exposes .rpc', async () => {
      const sampleAggregates = {
        popular_tools: [
          { tool: 'json-formatter', count: 10 },
          { tool: 'base64-encode', count: 5 },
        ],
        visitors_by_locale: [{ locale: 'az', count: 20 }],
        top_pages: [{ page_path: '/tools/json', count: 7 }],
        share_clicks: [{ platform: 'twitter', count: 3 }],
        tool_completions: [{ tool: 'json-formatter', completions: 8, uses: 10, rate: 80 }],
      }
      rpcResult = { data: sampleAggregates, error: null }

      const req = createRequest('test-secret-key')
      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      // Fast path returns the RPC aggregates verbatim (this branch was never
      // exercised in CI before — the mock had no `.rpc`).
      expect(data.popular_tools).toEqual(sampleAggregates.popular_tools)
      expect(data.visitors_by_locale).toEqual(sampleAggregates.visitors_by_locale)
      expect(data.top_pages).toEqual(sampleAggregates.top_pages)
      expect(data.share_clicks).toEqual(sampleAggregates.share_clicks)
      expect(data.tool_completions).toEqual(sampleAggregates.tool_completions)
    })
  })
})
