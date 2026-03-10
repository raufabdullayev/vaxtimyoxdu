import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'

// ── Mocks ──────────────────────────────────────────────────────────────

let mockPathname = '/tools/json-formatter'
let mockLocale = 'en'

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}))

vi.mock('next-intl', () => ({
  useLocale: () => mockLocale,
}))

const mockFetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
vi.stubGlobal('fetch', mockFetch)

import PageViewTracker from '../PageViewTracker'

describe('PageViewTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPathname = '/tools/json-formatter'
    mockLocale = 'en'
  })

  afterEach(() => {
    cleanup()
  })

  it('should render nothing (returns null)', () => {
    const { container } = render(<PageViewTracker />)
    expect(container.innerHTML).toBe('')
  })

  it('should fire a page_view event on mount', () => {
    render(<PageViewTracker />)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/analytics/track',
      expect.objectContaining({
        method: 'POST',
        keepalive: true,
        body: expect.any(String),
      })
    )

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.event_type).toBe('page_view')
    expect(body.page_path).toBe('/tools/json-formatter')
    expect(body.locale).toBe('en')
    expect(body.event_data).toBeDefined()
    expect(body.event_data.client_ts).toBeDefined()
  })

  it('should not fire duplicate events for the same page', () => {
    const { rerender } = render(<PageViewTracker />)
    expect(mockFetch).toHaveBeenCalledTimes(1)

    // Re-render with same path -- should not fire again
    rerender(<PageViewTracker />)
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('should swallow fetch errors silently', () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    // Should not throw
    expect(() => render(<PageViewTracker />)).not.toThrow()
  })
})
