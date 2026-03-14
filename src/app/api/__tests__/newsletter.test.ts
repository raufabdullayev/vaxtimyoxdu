import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock rate limiter before importing route
const { mockCheckLimit } = vi.hoisted(() => ({
  mockCheckLimit: vi.fn(),
}))
vi.mock('@/lib/rate-limiter', () => ({
  createRateLimiter: () => mockCheckLimit,
}))

import { POST } from '@/app/api/newsletter/route'

/**
 * Helper to create a NextRequest with a JSON body.
 */
function createRequest(body: unknown, ip = '127.0.0.1'): NextRequest {
  return new NextRequest('http://localhost:3000/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  })
}

/**
 * Helper to create a NextRequest with an invalid (non-JSON) body.
 */
function createInvalidRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: 'this is not json',
  })
}

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Suppress console.log and console.error during tests
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})

    // Default: rate limiter allows requests
    mockCheckLimit.mockResolvedValue({ allowed: true, remaining: 4 })
  })

  describe('valid email submissions', () => {
    it('should accept a valid email and return success', async () => {
      const req = createRequest({ email: 'unique-test-1@example.com' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Successfully subscribed')
    })

    it('should trim and lowercase the email', async () => {
      const req = createRequest({ email: '  Unique-Test-2@Example.COM  ' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('invalid email submissions', () => {
    it('should reject an invalid email format', async () => {
      const req = createRequest({ email: 'not-an-email' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    it('should reject an email without @ sign', async () => {
      const req = createRequest({ email: 'testexample.com' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    it('should reject an email without domain', async () => {
      const req = createRequest({ email: 'test@' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    it('should reject an email with spaces', async () => {
      const req = createRequest({ email: 'test @example.com' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })
  })

  describe('missing email', () => {
    it('should reject a request with missing email field', async () => {
      const req = createRequest({})
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Email is required')
    })

    it('should reject a request with null email', async () => {
      const req = createRequest({ email: null })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Email is required')
    })

    it('should reject a request with empty string email', async () => {
      const req = createRequest({ email: '' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Email is required')
    })

    it('should reject a request with non-string email', async () => {
      const req = createRequest({ email: 12345 })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Email is required')
    })
  })

  describe('duplicate detection', () => {
    it('should detect duplicate subscriptions', async () => {
      const email = 'duplicate-test@example.com'

      // First subscription should succeed
      const req1 = createRequest({ email })
      const response1 = await POST(req1)
      const data1 = await response1.json()
      expect(response1.status).toBe(200)
      expect(data1.success).toBe(true)

      // Second subscription with the same email should be rejected
      const req2 = createRequest({ email })
      const response2 = await POST(req2)
      const data2 = await response2.json()
      expect(response2.status).toBe(409)
      expect(data2.error).toBe('Already subscribed')
    })

    it('should detect duplicates regardless of case and whitespace', async () => {
      const email1 = 'case-dup-test@example.com'
      const email2 = '  Case-Dup-Test@Example.COM  '

      const req1 = createRequest({ email: email1 })
      const response1 = await POST(req1)
      expect(response1.status).toBe(200)

      const req2 = createRequest({ email: email2 })
      const response2 = await POST(req2)
      const data2 = await response2.json()
      expect(response2.status).toBe(409)
      expect(data2.error).toBe('Already subscribed')
    })
  })

  describe('invalid request body', () => {
    it('should reject a request with invalid JSON', async () => {
      const req = createInvalidRequest()
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid request')
    })
  })

  describe('rate limiting', () => {
    it('returns 429 when rate limited', async () => {
      mockCheckLimit.mockResolvedValue({
        allowed: false,
        remaining: 0,
        retryAfter: 3600,
      })

      const req = createRequest({ email: 'ratelimit@example.com' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.error).toContain('Too many requests')
    })

    it('includes Retry-After header when retryAfter is provided', async () => {
      mockCheckLimit.mockResolvedValue({
        allowed: false,
        remaining: 0,
        retryAfter: 1800,
      })

      const req = createRequest({ email: 'ratelimit2@example.com' })
      const response = await POST(req)

      expect(response.status).toBe(429)
      expect(response.headers.get('Retry-After')).toBe('1800')
    })

    it('calls rate limiter with client IP from x-forwarded-for', async () => {
      const req = createRequest({ email: 'ip-test@example.com' }, '203.0.113.5')
      await POST(req)

      expect(mockCheckLimit).toHaveBeenCalledWith('203.0.113.5')
    })
  })
})
