import { describe, it, expect } from 'vitest'
import robots from '@/app/robots'

const result = robots()

// ---------------------------------------------------------------------------
// General structure
// ---------------------------------------------------------------------------
describe('robots() general structure', () => {
  it('should return an object', () => {
    expect(typeof result).toBe('object')
    expect(result).not.toBeNull()
  })

  it('should have a rules property', () => {
    expect(result).toHaveProperty('rules')
  })

  it('should have a sitemap property', () => {
    expect(result).toHaveProperty('sitemap')
  })

  it('should have a host property', () => {
    expect(result).toHaveProperty('host')
  })
})

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------
describe('robots() rules', () => {
  it('should have rules as an array', () => {
    expect(Array.isArray(result.rules)).toBe(true)
  })

  it('should have at least 2 rule sets', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    expect(rules.length).toBeGreaterThanOrEqual(2)
  })

  it('should have a wildcard userAgent rule', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const wildcard = rules.find((r) => r.userAgent === '*')
    expect(wildcard).toBeDefined()
  })

  it('should have a Googlebot-specific rule', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const googlebot = rules.find((r) => r.userAgent === 'Googlebot')
    expect(googlebot).toBeDefined()
  })

  it('should allow / for the wildcard userAgent', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const wildcard = rules.find((r) => r.userAgent === '*')
    expect(wildcard!.allow).toContain('/')
  })

  it('should allow /api/og for the wildcard userAgent', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const wildcard = rules.find((r) => r.userAgent === '*')
    expect(wildcard!.allow).toContain('/api/og')
  })

  it('should disallow /api/ for the wildcard userAgent', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const wildcard = rules.find((r) => r.userAgent === '*')
    expect(wildcard!.disallow).toContain('/api/')
  })

  it('should allow / for Googlebot', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const googlebot = rules.find((r) => r.userAgent === 'Googlebot')
    expect(googlebot!.allow).toContain('/')
  })

  it('should allow /api/og for Googlebot', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const googlebot = rules.find((r) => r.userAgent === 'Googlebot')
    expect(googlebot!.allow).toContain('/api/og')
  })

  it('should disallow /api/ for Googlebot', () => {
    const rules = result.rules as Array<Record<string, unknown>>
    const googlebot = rules.find((r) => r.userAgent === 'Googlebot')
    expect(googlebot!.disallow).toContain('/api/')
  })
})

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------
describe('robots() sitemap', () => {
  it('should point to the correct sitemap URL', () => {
    expect(result.sitemap).toBe('https://vaxtimyoxdu.com/sitemap.xml')
  })

  it('should use HTTPS', () => {
    expect(result.sitemap).toMatch(/^https:\/\//)
  })
})

// ---------------------------------------------------------------------------
// Host
// ---------------------------------------------------------------------------
describe('robots() host', () => {
  it('should point to the correct host', () => {
    expect(result.host).toBe('https://vaxtimyoxdu.com')
  })

  it('should use HTTPS', () => {
    expect(result.host).toMatch(/^https:\/\//)
  })

  it('should not include www', () => {
    expect(result.host).not.toContain('www.')
  })

  it('should not have a trailing slash', () => {
    expect(result.host).not.toMatch(/\/$/)
  })
})
