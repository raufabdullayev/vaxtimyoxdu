import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/ai/rate-limiter', () => ({
  checkRateLimit: vi.fn(),
}))

vi.mock('@/lib/ai/openai-client', () => ({
  callAI: vi.fn().mockResolvedValue('mocked result'),
}))

vi.mock('@/lib/ai/sanitize', () => ({
  sanitizeInput: vi.fn((text: string) => text),
}))

import { withAIRoute } from '../with-ai-route'
import { checkRateLimit } from '@/lib/ai/rate-limiter'

const mockCheckRateLimit = vi.mocked(checkRateLimit)

const handler = withAIRoute({
  systemPrompt: 'test',
  temperature: 0.7,
  maxChars: 1000,
  maxTokens: 100,
  taskDescription: 'test',
})

function createRequest(
  headers: Record<string, string> = {}
): NextRequest {
  return new NextRequest('http://localhost:3000/api/ai/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ text: 'hello' }),
  })
}

describe('withAIRoute IP extraction for rate limiting', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    mockCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 9 })
  })

  it('uses x-real-ip header when present', async () => {
    const req = createRequest({ 'x-real-ip': '203.0.113.5' })
    await handler(req)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('203.0.113.5')
  })

  it('falls back to x-forwarded-for when x-real-ip is missing', async () => {
    const req = createRequest({ 'x-forwarded-for': '198.51.100.10' })
    await handler(req)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('198.51.100.10')
  })

  it('takes first IP from x-forwarded-for chain', async () => {
    const req = createRequest({
      'x-forwarded-for': '198.51.100.10, 10.0.0.1, 172.16.0.1',
    })
    await handler(req)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('198.51.100.10')
  })

  it('trims whitespace from x-forwarded-for IP', async () => {
    const req = createRequest({
      'x-forwarded-for': '  198.51.100.10  , 10.0.0.1',
    })
    await handler(req)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('198.51.100.10')
  })

  it('prefers x-real-ip over x-forwarded-for', async () => {
    const req = createRequest({
      'x-real-ip': '203.0.113.5',
      'x-forwarded-for': '198.51.100.10',
    })
    await handler(req)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('203.0.113.5')
  })

  it('falls back to "anonymous" when no IP headers present', async () => {
    const req = createRequest({})
    await handler(req)

    expect(mockCheckRateLimit).toHaveBeenCalledWith('anonymous')
  })

  it('returns 429 when rate limited regardless of IP source', async () => {
    mockCheckRateLimit.mockResolvedValue({
      allowed: false,
      remaining: 0,
      retryAfter: 60,
    })

    const req = createRequest({ 'x-forwarded-for': '10.0.0.1' })
    const response = await handler(req)

    expect(response.status).toBe(429)
    expect(response.headers.get('Retry-After')).toBe('60')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
  })
})
