import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock next-intl middleware
vi.mock('next-intl/middleware', () => ({
  default: () => {
    const { NextResponse } = require('next/server')
    return () => NextResponse.next()
  },
}))

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['az', 'en', 'tr', 'ru'],
    defaultLocale: 'az',
    localePrefix: 'as-needed',
    localeDetection: false,
  },
}))

import { middleware } from '@/middleware'

function createRequest(path: string, host = 'vaxtimyoxdu.com'): NextRequest {
  return new NextRequest(`https://${host}${path}`, {
    headers: { host },
  })
}

describe('middleware /news -> /info redirect', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects /news to /info with 301', () => {
    const req = createRequest('/news')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('/info')
    expect(response.headers.get('location')).not.toContain('/news')
  })

  it('redirects /en/news to /en/info', () => {
    const req = createRequest('/en/news')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('/en/info')
  })

  it('redirects /tr/news to /tr/info', () => {
    const req = createRequest('/tr/news')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('/tr/info')
  })

  it('redirects /ru/news to /ru/info', () => {
    const req = createRequest('/ru/news')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('/ru/info')
  })

  it('redirects /news/some-article to /info/some-article', () => {
    const req = createRequest('/news/some-article')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('/info/some-article')
  })

  it('redirects /en/news/article to /en/info/article', () => {
    const req = createRequest('/en/news/article')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('/en/info/article')
  })

  it('preserves query string on redirect', () => {
    const req = createRequest('/news?page=2')
    const response = middleware(req)

    expect(response.status).toBe(301)
    const location = response.headers.get('location') || ''
    expect(location).toContain('/info')
    expect(location).toContain('page=2')
  })

  it('does not redirect /newsletter', () => {
    const req = createRequest('/newsletter')
    const response = middleware(req)

    // Should not be a redirect (intl middleware returns next())
    expect(response.status).not.toBe(301)
  })

  it('does not redirect /info', () => {
    const req = createRequest('/info')
    const response = middleware(req)

    expect(response.status).not.toBe(301)
  })
})

describe('middleware domain redirect', () => {
  it('redirects vaxtimyoxdur.com to vaxtimyoxdu.com with 301', () => {
    const req = createRequest('/some-page', 'vaxtimyoxdur.com')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('vaxtimyoxdu.com')
    expect(response.headers.get('location')).toContain('/some-page')
  })

  it('redirects www.vaxtimyoxdur.com to vaxtimyoxdu.com', () => {
    const req = createRequest('/', 'www.vaxtimyoxdur.com')
    const response = middleware(req)

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toContain('vaxtimyoxdu.com')
  })
})
