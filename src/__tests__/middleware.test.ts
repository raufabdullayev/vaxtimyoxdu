import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware, config } from '@/middleware'

/**
 * Helper to create a NextRequest for testing the middleware.
 */
function createRequest(
  path: string,
  options: {
    method?: string
    origin?: string | null
    referer?: string | null
  } = {}
): NextRequest {
  const { method = 'GET', origin = null, referer = null } = options
  const headers = new Headers()
  if (origin) headers.set('origin', origin)
  if (referer) headers.set('referer', referer)

  return new NextRequest(`http://localhost:3000${path}`, {
    method,
    headers,
  })
}

// ---------------------------------------------------------------------------
// matcher config
// ---------------------------------------------------------------------------
describe('middleware config', () => {
  it('should export a matcher for /api/:path*', () => {
    expect(config.matcher).toBe('/api/:path*')
  })
})

// ---------------------------------------------------------------------------
// Non-API routes (should pass through)
// ---------------------------------------------------------------------------
describe('middleware - non-API routes', () => {
  it('should pass through for the root path', () => {
    const req = createRequest('/')
    const res = middleware(req)
    // NextResponse.next() does not set a custom status or body
    expect(res.status).toBe(200)
  })

  it('should pass through for /tools path', () => {
    const req = createRequest('/tools/json-formatter')
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should pass through for /blog path', () => {
    const req = createRequest('/blog/some-post')
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should pass through for /info path', () => {
    const req = createRequest('/info/some-article')
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should not set CORS headers for non-API routes', () => {
    const req = createRequest('/', { origin: 'https://vaxtimyoxdu.com' })
    const res = middleware(req)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// API routes - CORS headers for allowed origins
// ---------------------------------------------------------------------------
describe('middleware - CORS headers for allowed origins', () => {
  const allowedOrigins = [
    'https://vaxtimyoxdu.com',
    'https://www.vaxtimyoxdu.com',
    'https://vaxtimyoxdur.com',
    'https://www.vaxtimyoxdur.com',
  ]

  it.each(allowedOrigins)(
    'should set Access-Control-Allow-Origin for "%s"',
    (origin) => {
      const req = createRequest('/api/newsletter', { origin })
      const res = middleware(req)
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe(origin)
    }
  )

  it('should set Access-Control-Allow-Methods', () => {
    const req = createRequest('/api/newsletter', { origin: 'https://vaxtimyoxdu.com' })
    const res = middleware(req)
    expect(res.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, OPTIONS')
  })

  it('should set Access-Control-Allow-Headers', () => {
    const req = createRequest('/api/newsletter', { origin: 'https://vaxtimyoxdu.com' })
    const res = middleware(req)
    expect(res.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type')
  })

  it('should set Access-Control-Max-Age to 86400', () => {
    const req = createRequest('/api/newsletter', { origin: 'https://vaxtimyoxdu.com' })
    const res = middleware(req)
    expect(res.headers.get('Access-Control-Max-Age')).toBe('86400')
  })
})

// ---------------------------------------------------------------------------
// API routes - disallowed origins
// ---------------------------------------------------------------------------
describe('middleware - disallowed origins', () => {
  it('should not set CORS headers for an unknown origin', () => {
    const req = createRequest('/api/newsletter', { origin: 'https://evil.com' })
    const res = middleware(req)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull()
  })

  it('should not set CORS headers when no origin header is present', () => {
    const req = createRequest('/api/newsletter')
    const res = middleware(req)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// CSRF validation for non-GET requests in production
// ---------------------------------------------------------------------------
describe('middleware - CSRF protection (production)', () => {
  const originalEnv = process.env.NODE_ENV

  beforeEach(() => {
    // @ts-expect-error NODE_ENV assignment for testing
    process.env.NODE_ENV = 'production'
  })

  afterEach(() => {
    // @ts-expect-error NODE_ENV assignment for testing
    process.env.NODE_ENV = originalEnv
  })

  it('should return 403 for POST request with no origin or referer', () => {
    const req = createRequest('/api/newsletter', { method: 'POST' })
    const res = middleware(req)
    expect(res.status).toBe(403)
  })

  it('should return 403 for POST request from an invalid origin', () => {
    const req = createRequest('/api/newsletter', { method: 'POST', origin: 'https://malicious.com' })
    const res = middleware(req)
    expect(res.status).toBe(403)
  })

  it('should return a JSON error body for 403 responses', async () => {
    const req = createRequest('/api/newsletter', { method: 'POST', origin: 'https://evil.com' })
    const res = middleware(req)
    const body = await res.json()
    expect(body.error).toBe('Forbidden: Invalid origin')
  })

  it('should allow POST request from a valid origin in production', () => {
    const req = createRequest('/api/newsletter', { method: 'POST', origin: 'https://vaxtimyoxdu.com' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should allow POST request from a valid referer in production', () => {
    const req = createRequest('/api/newsletter', { method: 'POST', referer: 'https://vaxtimyoxdu.com/tools/some-tool' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should allow POST from www subdomain', () => {
    const req = createRequest('/api/newsletter', { method: 'POST', origin: 'https://www.vaxtimyoxdu.com' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should allow POST from vaxtimyoxdur.com in production', () => {
    const req = createRequest('/api/newsletter', { method: 'POST', origin: 'https://vaxtimyoxdur.com' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })
})

// ---------------------------------------------------------------------------
// CSRF validation for non-GET requests in development
// ---------------------------------------------------------------------------
describe('middleware - CSRF in development (non-production)', () => {
  it('should allow POST request from unknown origin in non-production', () => {
    // process.env.NODE_ENV is "test" by default in vitest
    const req = createRequest('/api/newsletter', { method: 'POST', origin: 'http://localhost:3000' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should allow POST request with no origin in non-production', () => {
    const req = createRequest('/api/newsletter', { method: 'POST' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })
})

// ---------------------------------------------------------------------------
// GET requests (should not be blocked)
// ---------------------------------------------------------------------------
describe('middleware - GET requests', () => {
  it('should allow GET request to API routes without any origin', () => {
    const req = createRequest('/api/newsletter', { method: 'GET' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('should allow GET request to API routes from any origin', () => {
    const req = createRequest('/api/newsletter', { method: 'GET', origin: 'https://random.com' })
    const res = middleware(req)
    expect(res.status).toBe(200)
  })
})
