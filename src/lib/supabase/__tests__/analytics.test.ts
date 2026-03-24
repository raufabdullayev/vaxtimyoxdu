import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../client', () => ({
  isSupabaseConfigured: false,
  getSupabaseServer: vi.fn(() => null),
}))

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('trackEvent does not throw when supabase is not configured', async () => {
    const { trackEvent } = await import('../analytics')
    // Should not throw
    expect(() => trackEvent('page_view', { page: '/' })).not.toThrow()
  })

  it('trackNewsletterSubscribe does not throw', async () => {
    const { trackNewsletterSubscribe } = await import('../analytics')
    expect(() => trackNewsletterSubscribe('test@example.com', 'en', 'footer')).not.toThrow()
  })

  it('trackToolUse does not throw', async () => {
    const { trackToolUse } = await import('../analytics')
    expect(() => trackToolUse('json-formatter', '/tools/json-formatter', 'en')).not.toThrow()
  })

  it('trackNewsletterSubscribe handles email without @', async () => {
    const { trackNewsletterSubscribe } = await import('../analytics')
    expect(() => trackNewsletterSubscribe('noemail', 'en')).not.toThrow()
  })

  it('trackEvent handles null eventData', async () => {
    const { trackEvent } = await import('../analytics')
    expect(() => trackEvent('test', null)).not.toThrow()
  })

  it('trackEvent handles null pagePath and locale', async () => {
    const { trackEvent } = await import('../analytics')
    expect(() => trackEvent('test', null, null, null)).not.toThrow()
  })
})
