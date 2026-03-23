import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mockCheckRateLimit = vi.fn()
const mockCallAI = vi.fn()
const mockSanitizeInput = vi.fn((text: string) => text)

vi.mock('@/lib/ai/rate-limiter', () => ({
  checkRateLimit: (...args: unknown[]) => mockCheckRateLimit(...args),
}))

vi.mock('@/lib/ai/openai-client', () => ({
  callAI: (...args: unknown[]) => mockCallAI(...args),
}))

vi.mock('@/lib/ai/sanitize', () => ({
  sanitizeInput: (text: string) => mockSanitizeInput(text),
}))

import { withAIRoute } from '../with-ai-route'

function createRequest(body: unknown, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest('http://localhost:3000/api/ai/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  })
}

function createInvalidJsonRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/ai/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: 'not valid json',
  })
}

const defaultConfig = {
  systemPrompt: 'You are a test helper.',
  temperature: 0.7,
  maxChars: 1000,
  maxTokens: 100,
  taskDescription: 'Test',
}

describe('withAIRoute', () => {
  let handler: ReturnType<typeof withAIRoute>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 9 })
    mockCallAI.mockResolvedValue('AI generated text')
    handler = withAIRoute(defaultConfig)
  })

  describe('successful requests', () => {
    it('returns AI result for valid input', async () => {
      const req = createRequest({ text: 'Hello world' })
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.result).toBe('AI generated text')
    })

    it('includes X-RateLimit-Remaining header', async () => {
      const req = createRequest({ text: 'Hello' })
      const response = await handler(req)

      expect(response.headers.get('X-RateLimit-Remaining')).toBe('9')
    })

    it('passes sanitized text to callAI', async () => {
      mockSanitizeInput.mockReturnValue('sanitized text')
      const req = createRequest({ text: 'raw text' })
      await handler(req)

      expect(mockSanitizeInput).toHaveBeenCalledWith('raw text')
      expect(mockCallAI).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ role: 'user', content: 'sanitized text' }),
        ]),
        100,
        0.7
      )
    })

    it('passes system prompt to callAI', async () => {
      const req = createRequest({ text: 'Hello' })
      await handler(req)

      expect(mockCallAI).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ role: 'system', content: 'You are a test helper.' }),
        ]),
        expect.any(Number),
        expect.any(Number)
      )
    })
  })

  describe('dynamic config', () => {
    it('supports function-based systemPrompt', async () => {
      const dynamicHandler = withAIRoute({
        ...defaultConfig,
        systemPrompt: (body) => `Tone: ${body.tone}`,
      })
      const req = createRequest({ text: 'Hello', tone: 'formal' })
      await dynamicHandler(req)

      expect(mockCallAI).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ role: 'system', content: 'Tone: formal' }),
        ]),
        expect.any(Number),
        expect.any(Number)
      )
    })

    it('supports function-based maxTokens', async () => {
      const dynamicHandler = withAIRoute({
        ...defaultConfig,
        maxTokens: () => 256,
      })
      const req = createRequest({ text: 'Hello' })
      await dynamicHandler(req)

      expect(mockCallAI).toHaveBeenCalledWith(
        expect.any(Array),
        256,
        expect.any(Number)
      )
    })
  })

  describe('validation errors', () => {
    it('returns 400 for missing text field', async () => {
      const req = createRequest({})
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Text is required')
    })

    it('returns 400 for non-string text', async () => {
      const req = createRequest({ text: 123 })
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Text is required')
    })

    it('returns 400 for text exceeding maxChars', async () => {
      const longText = 'a'.repeat(1001)
      const req = createRequest({ text: longText })
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Text too long')
    })

    it('returns 400 for invalid JSON body', async () => {
      const req = createInvalidJsonRequest()
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid JSON in request body')
    })
  })

  describe('rate limiting', () => {
    it('returns 429 when rate limited', async () => {
      mockCheckRateLimit.mockResolvedValue({
        allowed: false,
        remaining: 0,
        retryAfter: 120,
      })

      const req = createRequest({ text: 'Hello' })
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.error).toContain('Rate limit exceeded')
      expect(response.headers.get('Retry-After')).toBe('120')
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
    })
  })

  describe('error handling', () => {
    it('returns 503 for timeout errors', async () => {
      mockCallAI.mockRejectedValue(new Error('Request timeout'))

      const req = createRequest({ text: 'Hello' })
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error).toContain('AI service is responding slowly')
    })

    it('returns 503 for unavailable errors', async () => {
      mockCallAI.mockRejectedValue(new Error('Service unavailable'))

      const req = createRequest({ text: 'Hello' })
      const response = await handler(req)

      expect(response.status).toBe(503)
    })

    it('returns 500 for generic errors', async () => {
      mockCallAI.mockRejectedValue(new Error('Something unexpected'))

      const req = createRequest({ text: 'Hello' })
      const response = await handler(req)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('Service temporarily unavailable')
    })
  })
})
