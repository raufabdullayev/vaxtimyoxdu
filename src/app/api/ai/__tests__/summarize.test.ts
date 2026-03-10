import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/ai/rate-limiter', () => ({
  checkRateLimit: vi.fn(),
}))

vi.mock('@/lib/ai/openai-client', () => ({
  callAI: vi.fn(),
}))

import { POST } from '@/app/api/ai/summarize/route'
import { checkRateLimit } from '@/lib/ai/rate-limiter'
import { callAI } from '@/lib/ai/openai-client'

const mockCheckRateLimit = vi.mocked(checkRateLimit)
const mockCallAI = vi.mocked(callAI)

function createRequest(body: unknown, ip = '127.0.0.1'): NextRequest {
  return new NextRequest('http://localhost:3000/api/ai/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  })
}

function createInvalidJsonRequest(ip = '127.0.0.1'): NextRequest {
  return new NextRequest('http://localhost:3000/api/ai/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: 'not valid json{{{',
  })
}

describe('POST /api/ai/summarize', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})

    mockCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 19 })
  })

  // ---- Input validation (400) ----

  describe('input validation', () => {
    it('returns 400 if no text is provided', async () => {
      const req = createRequest({})
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Text is required')
    })

    it('returns 400 if text is an empty string', async () => {
      const req = createRequest({ text: '' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Text is required')
    })

    it('returns 400 if text is null', async () => {
      const req = createRequest({ text: null })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Text is required')
    })

    it('returns 400 if text is not a string', async () => {
      const req = createRequest({ text: 42 })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Text is required')
    })

    it('returns 400 if text exceeds 10000 characters', async () => {
      const longText = 'a'.repeat(10001)
      const req = createRequest({ text: longText })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('too long')
    })

    it('accepts text that is exactly 10000 characters', async () => {
      mockCallAI.mockResolvedValue('Summary text')
      const exactText = 'a'.repeat(10000)
      const req = createRequest({ text: exactText })
      const response = await POST(req)

      expect(response.status).toBe(200)
    })

    it('returns 400 for invalid JSON in request body', async () => {
      const req = createInvalidJsonRequest()
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid JSON')
    })
  })

  // ---- Rate limiting (429) ----

  describe('rate limiting', () => {
    it('calls checkRateLimit with the client IP', async () => {
      mockCallAI.mockResolvedValue('Summary')

      const req = createRequest({ text: 'Some text to summarize' }, '10.20.30.40')
      await POST(req)

      expect(mockCheckRateLimit).toHaveBeenCalledWith('10.20.30.40')
    })

    it('returns 429 when rate limited', async () => {
      mockCheckRateLimit.mockResolvedValue({
        allowed: false,
        remaining: 0,
        retryAfter: 60,
      })

      const req = createRequest({ text: 'Some text' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.error).toContain('Rate limit exceeded')
    })

    it('includes Retry-After header when retryAfter is provided', async () => {
      mockCheckRateLimit.mockResolvedValue({
        allowed: false,
        remaining: 0,
        retryAfter: 120,
      })

      const req = createRequest({ text: 'Some text' })
      const response = await POST(req)

      expect(response.status).toBe(429)
      expect(response.headers.get('Retry-After')).toBe('120')
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
    })

    it('returns 429 without Retry-After when retryAfter is not provided', async () => {
      mockCheckRateLimit.mockResolvedValue({
        allowed: false,
        remaining: 0,
      })

      const req = createRequest({ text: 'Some text' })
      const response = await POST(req)

      expect(response.status).toBe(429)
      expect(response.headers.get('Retry-After')).toBeNull()
    })
  })

  // ---- Successful summarization (200) ----

  describe('successful summarization', () => {
    it('returns 200 with summarized text on success', async () => {
      mockCallAI.mockResolvedValue('This is a concise summary.')

      const req = createRequest({ text: 'A very long article about technology...' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.result).toBe('This is a concise summary.')
    })

    it('response includes X-RateLimit-Remaining header', async () => {
      mockCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 10 })
      mockCallAI.mockResolvedValue('Summary')

      const req = createRequest({ text: 'Some text' })
      const response = await POST(req)

      expect(response.headers.get('X-RateLimit-Remaining')).toBe('10')
    })

    it('passes length instruction when length is specified', async () => {
      mockCallAI.mockResolvedValue('Short summary.')

      const req = createRequest({ text: 'Long article text', length: 'short' })
      await POST(req)

      expect(mockCallAI).toHaveBeenCalledTimes(1)
      const systemMessage = mockCallAI.mock.calls[0][0][0]
      expect(systemMessage.role).toBe('system')
      expect(systemMessage.content).toContain('1-2 sentences')
    })

    it('uses medium length by default when no length is specified', async () => {
      mockCallAI.mockResolvedValue('Medium summary.')

      const req = createRequest({ text: 'Some text' })
      await POST(req)

      const systemMessage = mockCallAI.mock.calls[0][0][0]
      expect(systemMessage.content).toContain('3-5 sentences')
    })

    it('uses 1024 max_tokens for long summaries', async () => {
      mockCallAI.mockResolvedValue('Long summary.')

      const req = createRequest({ text: 'Some text', length: 'long' })
      await POST(req)

      // callAI second argument is maxTokens
      expect(mockCallAI).toHaveBeenCalledWith(expect.any(Array), 1024)
    })

    it('uses 512 max_tokens for short summaries', async () => {
      mockCallAI.mockResolvedValue('Short summary.')

      const req = createRequest({ text: 'Some text', length: 'short' })
      await POST(req)

      expect(mockCallAI).toHaveBeenCalledWith(expect.any(Array), 512)
    })

    it('passes the user text as the user message to callAI', async () => {
      mockCallAI.mockResolvedValue('Summary')

      const req = createRequest({ text: 'Specific input text' })
      await POST(req)

      const userMessage = mockCallAI.mock.calls[0][0][1]
      expect(userMessage.role).toBe('user')
      expect(userMessage.content).toBe('Specific input text')
    })
  })

  // ---- Error handling (500) ----

  describe('error handling', () => {
    it('returns 500 when callAI throws an error', async () => {
      mockCallAI.mockRejectedValue(new Error('Provider failure'))

      const req = createRequest({ text: 'Hello world' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('Service temporarily unavailable')
    })

    it('returns 500 when rate limiter throws an unexpected error', async () => {
      mockCheckRateLimit.mockRejectedValue(new Error('Connection lost'))

      const req = createRequest({ text: 'Hello world' })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('Service temporarily unavailable')
    })
  })
})
