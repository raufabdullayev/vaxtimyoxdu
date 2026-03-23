import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('GET /BingSiteAuth.xml', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
  })

  it('returns XML with placeholder when BING_SITE_AUTH is not set', async () => {
    vi.stubEnv('BING_SITE_AUTH', '')
    const { GET } = await import('@/app/BingSiteAuth.xml/route')
    const response = await GET()
    const text = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('application/xml')
    expect(text).toContain('<?xml version="1.0"?>')
    expect(text).toContain('<users>')
    expect(text).toContain('PLACEHOLDER_VERIFICATION_CODE')
  })

  it('returns XML with actual verification code when env var is set', async () => {
    vi.stubEnv('BING_SITE_AUTH', 'ABC123DEF456')
    const { GET } = await import('@/app/BingSiteAuth.xml/route')
    const response = await GET()
    const text = await response.text()

    expect(text).toContain('ABC123DEF456')
    expect(text).not.toContain('PLACEHOLDER_VERIFICATION_CODE')
  })

  it('has Cache-Control header set to 1 day', async () => {
    const { GET } = await import('@/app/BingSiteAuth.xml/route')
    const response = await GET()

    expect(response.headers.get('Cache-Control')).toBe('public, max-age=86400')
  })
})
