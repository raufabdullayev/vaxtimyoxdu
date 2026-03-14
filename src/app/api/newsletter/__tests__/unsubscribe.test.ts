import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock rate limiter
const { mockCheckLimit } = vi.hoisted(() => ({
  mockCheckLimit: vi.fn(),
}))
vi.mock('@/lib/rate-limiter', () => ({
  createRateLimiter: () => mockCheckLimit,
}))

// Mock token verification
const { mockVerify } = vi.hoisted(() => ({
  mockVerify: vi.fn(),
}))
vi.mock('@/lib/newsletter/token', () => ({
  verifyUnsubscribeToken: mockVerify,
}))

// Mock supabase
const mockDelete = vi.fn()
const mockEq = vi.fn()
const { mockGetSupabaseServer } = vi.hoisted(() => ({
  mockGetSupabaseServer: vi.fn(),
}))
vi.mock('@/lib/supabase/client', () => ({
  getSupabaseServer: mockGetSupabaseServer,
}))

import { GET } from '@/app/api/newsletter/unsubscribe/route'

function createRequest(params: Record<string, string> = {}, headers: Record<string, string> = {}): NextRequest {
  const url = new URL('http://localhost:3000/api/newsletter/unsubscribe')
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return new NextRequest(url.toString(), {
    method: 'GET',
    headers: {
      'x-real-ip': '127.0.0.1',
      ...headers,
    },
  })
}

describe('GET /api/newsletter/unsubscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockCheckLimit.mockResolvedValue({ allowed: true, remaining: 9 })
  })

  describe('rate limiting', () => {
    it('returns 429 when rate limited', async () => {
      mockCheckLimit.mockResolvedValue({ allowed: false, remaining: 0 })
      const res = await GET(createRequest({ token: 'valid.token' }))
      expect(res.status).toBe(429)
      const text = await res.text()
      expect(text).toContain('Too many requests')
    })

    it('extracts IP from x-real-ip header', async () => {
      mockCheckLimit.mockResolvedValue({ allowed: false, remaining: 0 })
      await GET(createRequest({}, { 'x-real-ip': '1.2.3.4' }))
      expect(mockCheckLimit).toHaveBeenCalledWith('1.2.3.4')
    })

    it('falls back to x-forwarded-for when x-real-ip is missing', async () => {
      mockCheckLimit.mockResolvedValue({ allowed: false, remaining: 0 })
      const req = new NextRequest('http://localhost:3000/api/newsletter/unsubscribe', {
        method: 'GET',
        headers: {
          'x-forwarded-for': '5.6.7.8, 10.0.0.1',
        },
      })
      await GET(req)
      expect(mockCheckLimit).toHaveBeenCalledWith('5.6.7.8')
    })

    it('uses "anonymous" when no IP headers are present', async () => {
      mockCheckLimit.mockResolvedValue({ allowed: false, remaining: 0 })
      const req = new NextRequest('http://localhost:3000/api/newsletter/unsubscribe', {
        method: 'GET',
      })
      await GET(req)
      expect(mockCheckLimit).toHaveBeenCalledWith('anonymous')
    })
  })

  describe('token validation', () => {
    it('returns 400 when token is missing', async () => {
      const res = await GET(createRequest())
      expect(res.status).toBe(400)
      const text = await res.text()
      expect(text).toContain('Invalid unsubscribe link')
    })

    it('returns 400 when token is invalid or expired', async () => {
      mockVerify.mockReturnValue(null)
      const res = await GET(createRequest({ token: 'invalid.token' }))
      expect(res.status).toBe(400)
      const text = await res.text()
      expect(text).toContain('Invalid or expired unsubscribe link')
    })

    it('calls verifyUnsubscribeToken with the token param', async () => {
      mockVerify.mockReturnValue(null)
      await GET(createRequest({ token: 'my.test.token' }))
      expect(mockVerify).toHaveBeenCalledWith('my.test.token')
    })
  })

  describe('successful unsubscribe', () => {
    beforeEach(() => {
      mockVerify.mockReturnValue('user@example.com')
      mockEq.mockResolvedValue({ error: null })
      mockDelete.mockReturnValue({ eq: mockEq })
      mockGetSupabaseServer.mockReturnValue({
        from: () => ({ delete: mockDelete }),
      })
    })

    it('returns 200 on successful unsubscribe', async () => {
      const res = await GET(createRequest({ token: 'valid.token' }))
      expect(res.status).toBe(200)
      const text = await res.text()
      expect(text).toContain('successfully unsubscribed')
    })

    it('deletes the subscriber from the database', async () => {
      await GET(createRequest({ token: 'valid.token' }))
      expect(mockDelete).toHaveBeenCalled()
      expect(mockEq).toHaveBeenCalledWith('email', 'user@example.com')
    })

    it('returns HTML with Content-Type header', async () => {
      const res = await GET(createRequest({ token: 'valid.token' }))
      expect(res.headers.get('Content-Type')).toBe('text/html; charset=utf-8')
    })
  })

  describe('database errors', () => {
    it('returns 500 when supabase delete fails', async () => {
      mockVerify.mockReturnValue('user@example.com')
      mockEq.mockResolvedValue({ error: { message: 'DB error' } })
      mockDelete.mockReturnValue({ eq: mockEq })
      mockGetSupabaseServer.mockReturnValue({
        from: () => ({ delete: mockDelete }),
      })

      const res = await GET(createRequest({ token: 'valid.token' }))
      expect(res.status).toBe(500)
      const text = await res.text()
      expect(text).toContain('Something went wrong')
    })

    it('succeeds when supabase is not configured', async () => {
      mockVerify.mockReturnValue('user@example.com')
      mockGetSupabaseServer.mockReturnValue(null)

      const res = await GET(createRequest({ token: 'valid.token' }))
      expect(res.status).toBe(200)
    })
  })

  describe('HTML output', () => {
    it('escapes HTML in error messages to prevent XSS', async () => {
      const res = await GET(createRequest())
      const text = await res.text()
      // Error response should be valid HTML
      expect(text).toContain('<!DOCTYPE html>')
      expect(text).toContain('</html>')
    })

    it('renders success page with green color', async () => {
      mockVerify.mockReturnValue('user@example.com')
      mockGetSupabaseServer.mockReturnValue(null)
      const res = await GET(createRequest({ token: 'valid.token' }))
      const text = await res.text()
      expect(text).toContain('#22c55e')
      expect(text).toContain('Unsubscribed')
    })

    it('renders error page with red color', async () => {
      const res = await GET(createRequest())
      const text = await res.text()
      expect(text).toContain('#ef4444')
      expect(text).toContain('Error')
    })
  })
})
