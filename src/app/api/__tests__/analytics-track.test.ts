import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/analytics/track/route'

// Mock the analytics module
vi.mock('@/lib/supabase/analytics', () => ({
  trackEvent: vi.fn(),
}))

import { trackEvent } from '@/lib/supabase/analytics'

const mockTrackEvent = vi.mocked(trackEvent)

function createRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function createInvalidRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: 'not valid json',
  })
}

describe('POST /api/analytics/track', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('valid events', () => {
    it('should accept a page_view event and return 204', async () => {
      const req = createRequest({
        event_type: 'page_view',
        page_path: '/tools/json-formatter',
        locale: 'en',
        event_data: { referrer: 'https://google.com' },
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'page_view',
        { referrer: 'https://google.com' },
        '/tools/json-formatter',
        'en'
      )
    })

    it('should accept a tool_use event and return 204', async () => {
      const req = createRequest({
        event_type: 'tool_use',
        page_path: '/tools/base64-encode-decode',
        locale: 'az',
        event_data: { tool: 'base64-encode-decode' },
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'tool_use',
        { tool: 'base64-encode-decode' },
        '/tools/base64-encode-decode',
        'az'
      )
    })

    it('should accept a newsletter_subscribe event and return 204', async () => {
      const req = createRequest({
        event_type: 'newsletter_subscribe',
        locale: 'tr',
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'newsletter_subscribe',
        null,
        null,
        'tr'
      )
    })

    it('should handle minimal payload (event_type only)', async () => {
      const req = createRequest({
        event_type: 'page_view',
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'page_view',
        null,
        null,
        null
      )
    })
  })

  describe('invalid events', () => {
    it('should return 204 for unknown event_type (silent discard)', async () => {
      const req = createRequest({
        event_type: 'unknown_event',
        page_path: '/test',
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).not.toHaveBeenCalled()
    })

    it('should return 204 for missing event_type', async () => {
      const req = createRequest({
        page_path: '/test',
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).not.toHaveBeenCalled()
    })

    it('should return 204 for empty event_type', async () => {
      const req = createRequest({
        event_type: '',
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).not.toHaveBeenCalled()
    })

    it('should return 204 for non-string event_type', async () => {
      const req = createRequest({
        event_type: 123,
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).not.toHaveBeenCalled()
    })
  })

  describe('input sanitization', () => {
    it('should set page_path to null when not a string', async () => {
      const req = createRequest({
        event_type: 'page_view',
        page_path: 12345,
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'page_view',
        null,
        null,
        null
      )
    })

    it('should set locale to null when too long', async () => {
      const req = createRequest({
        event_type: 'page_view',
        locale: 'this-locale-is-way-too-long',
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'page_view',
        null,
        null,
        null
      )
    })

    it('should set event_data to null when it is an array', async () => {
      const req = createRequest({
        event_type: 'page_view',
        event_data: [1, 2, 3],
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'page_view',
        null,
        null,
        null
      )
    })

    it('should set event_data to null when it is a primitive', async () => {
      const req = createRequest({
        event_type: 'page_view',
        event_data: 'not-an-object',
      })

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).toHaveBeenCalledWith(
        'page_view',
        null,
        null,
        null
      )
    })
  })

  describe('error handling', () => {
    it('should return 204 for malformed JSON body', async () => {
      const req = createInvalidRequest()

      const response = await POST(req)

      expect(response.status).toBe(204)
      expect(mockTrackEvent).not.toHaveBeenCalled()
    })
  })
})
