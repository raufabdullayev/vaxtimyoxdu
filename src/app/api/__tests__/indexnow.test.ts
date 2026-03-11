import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { POST } from '@/app/api/indexnow/route'
import { NextRequest } from 'next/server'

const TEST_KEY = 'test-indexnow-key-for-api'

function createRequest(
  body: unknown,
  authKey?: string
): NextRequest {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (authKey) {
    headers['x-api-key'] = authKey
  }
  return new NextRequest('http://localhost:3000/api/indexnow', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}

function createRequestWithBearer(
  body: unknown,
  token: string
): NextRequest {
  return new NextRequest('http://localhost:3000/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
}

function createInvalidJsonRequest(authKey: string): NextRequest {
  return new NextRequest('http://localhost:3000/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': authKey,
    },
    body: 'this is not json',
  })
}

describe('POST /api/indexnow', () => {
  beforeEach(() => {
    vi.stubEnv('INDEXNOW_API_KEY', TEST_KEY)
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mock global fetch for IndexNow submissions
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
      })
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  describe('authentication', () => {
    it('should reject requests without authentication', async () => {
      const req = createRequest({ paths: ['/tools/test'] })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should reject requests with wrong API key', async () => {
      const req = createRequest({ paths: ['/tools/test'] }, 'wrong-key')
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should accept requests with correct x-api-key', async () => {
      const req = createRequest({ paths: ['/tools/test'] }, TEST_KEY)
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should accept requests with correct Bearer token', async () => {
      const req = createRequestWithBearer(
        { paths: ['/tools/test'] },
        TEST_KEY
      )
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('missing configuration', () => {
    it('should return 503 when INDEXNOW_API_KEY is not set', async () => {
      vi.stubEnv('INDEXNOW_API_KEY', '')
      const req = createRequest({ paths: ['/tools/test'] })
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error).toContain('not configured')
    })
  })

  describe('input validation', () => {
    it('should reject invalid JSON body', async () => {
      const req = createInvalidJsonRequest(TEST_KEY)
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid JSON body')
    })

    it('should reject body without paths or urls', async () => {
      const req = createRequest({}, TEST_KEY)
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('"paths" or "urls"')
    })

    it('should reject non-array paths', async () => {
      const req = createRequest({ paths: 'not-an-array' }, TEST_KEY)
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('"paths" must be an array')
    })

    it('should reject non-array urls', async () => {
      const req = createRequest({ urls: 123 }, TEST_KEY)
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('"urls" must be an array')
    })
  })

  describe('successful submissions', () => {
    it('should submit paths expanded to all locales', async () => {
      const req = createRequest(
        { paths: ['/tools/json-formatter'] },
        TEST_KEY
      )
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.total).toBe(4) // 1 path x 4 locales
      expect(data.submitted).toBe(4)
    })

    it('should submit absolute URLs directly', async () => {
      const req = createRequest(
        { urls: ['https://vaxtimyoxdu.com/custom-page'] },
        TEST_KEY
      )
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.total).toBe(1)
    })

    it('should combine paths and urls', async () => {
      const req = createRequest(
        {
          paths: ['/tools/test'],
          urls: ['https://vaxtimyoxdu.com/extra'],
        },
        TEST_KEY
      )
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.total).toBe(5) // 4 locale variants + 1 direct URL
    })

    it('should deduplicate URLs', async () => {
      const req = createRequest(
        {
          paths: ['/tools/test'],
          urls: ['https://vaxtimyoxdu.com/tools/test'],
        },
        TEST_KEY
      )
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      // The az variant from paths is the same as the direct URL
      expect(data.total).toBe(4) // deduplicated
    })

    it('should filter out non-string items from paths', async () => {
      const req = createRequest(
        { paths: ['/tools/test', 123, null, '/blog/post'] },
        TEST_KEY
      )
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.total).toBe(8) // 2 valid paths x 4 locales
    })
  })

  describe('error handling', () => {
    it('should handle IndexNow API errors gracefully', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        })
      )

      const req = createRequest({ paths: ['/tools/test'] }, TEST_KEY)
      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(200) // Our API still responds OK
      expect(data.success).toBe(false)
      expect(data.errors).toHaveLength(1)
    })
  })
})
