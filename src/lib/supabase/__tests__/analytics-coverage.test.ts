import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the supabase client module
const mockInsert = vi.fn()
const mockFrom = vi.fn(() => ({ insert: mockInsert }))
const mockSupabase = { from: mockFrom }

vi.mock('../client', () => ({
  isSupabaseConfigured: true,
  getSupabaseServer: () => mockSupabase,
}))

describe('Analytics - trackEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockInsert.mockResolvedValue({ error: null })
  })

  it('tracks an event with all parameters', async () => {
    const { trackEvent } = await import('../analytics')
    trackEvent('page_view', { path: '/tools' }, '/tools', 'en')
    // Wait for async IIFE
    await new Promise((r) => setTimeout(r, 10))
    expect(mockFrom).toHaveBeenCalledWith('analytics_events')
    expect(mockInsert).toHaveBeenCalledWith({
      event_type: 'page_view',
      event_data: { path: '/tools' },
      page_path: '/tools',
      locale: 'en',
    })
  })

  it('tracks an event with null optional params', async () => {
    const { trackEvent } = await import('../analytics')
    trackEvent('test_event', null, null, null)
    await new Promise((r) => setTimeout(r, 10))
    expect(mockInsert).toHaveBeenCalledWith({
      event_type: 'test_event',
      event_data: null,
      page_path: null,
      locale: null,
    })
  })

  it('handles insert errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockInsert.mockResolvedValue({ error: { message: 'DB error' } })
    const { trackEvent } = await import('../analytics')
    trackEvent('fail_event', null, null, null)
    await new Promise((r) => setTimeout(r, 10))
    expect(consoleSpy).toHaveBeenCalledWith(
      '[Analytics] Failed to track event:',
      'DB error'
    )
    consoleSpy.mockRestore()
  })

  it('handles unexpected errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockFrom.mockImplementationOnce(() => {
      throw new Error('Network failure')
    })
    const { trackEvent } = await import('../analytics')
    trackEvent('crash_event', null, null, null)
    await new Promise((r) => setTimeout(r, 10))
    expect(consoleSpy).toHaveBeenCalledWith(
      '[Analytics] Unexpected error:',
      expect.any(Error)
    )
    consoleSpy.mockRestore()
  })
})

describe('Analytics - trackNewsletterSubscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockInsert.mockResolvedValue({ error: null })
  })

  it('tracks newsletter subscription with correct shape', async () => {
    const { trackNewsletterSubscribe } = await import('../analytics')
    trackNewsletterSubscribe('john@example.com', 'az', 'footer')
    await new Promise((r) => setTimeout(r, 10))
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        event_type: 'newsletter_subscribe',
        event_data: expect.objectContaining({
          email_prefix: 'joh',
          email_domain: 'example.com',
          source: 'footer',
        }),
        locale: 'az',
      })
    )
  })

  it('handles missing source gracefully', async () => {
    const { trackNewsletterSubscribe } = await import('../analytics')
    trackNewsletterSubscribe('test@example.com')
    await new Promise((r) => setTimeout(r, 10))
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        event_data: expect.objectContaining({
          source: 'unknown',
        }),
      })
    )
  })
})

describe('Analytics - trackToolUse', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockInsert.mockResolvedValue({ error: null })
  })

  it('tracks tool usage correctly', async () => {
    const { trackToolUse } = await import('../analytics')
    trackToolUse('json-formatter', '/tools/json-formatter', 'en')
    await new Promise((r) => setTimeout(r, 10))
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        event_type: 'tool_use',
        event_data: { tool: 'json-formatter' },
        page_path: '/tools/json-formatter',
        locale: 'en',
      })
    )
  })
})
