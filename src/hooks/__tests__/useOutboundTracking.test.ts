import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useOutboundTracking } from '../useOutboundTracking'

describe('useOutboundTracking', () => {
  const originalFetch = global.fetch
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch
    addEventListenerSpy = vi.spyOn(document.body, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(document.body, 'removeEventListener')
  })

  afterEach(() => {
    global.fetch = originalFetch
    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
    vi.restoreAllMocks()
  })

  it('registers click event listener on body', () => {
    renderHook(() => useOutboundTracking())

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
  })

  it('removes click event listener on unmount', () => {
    const { unmount } = renderHook(() => useOutboundTracking())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
  })

  it('tracks clicks on external links', () => {
    renderHook(() => useOutboundTracking())

    // Create an external link
    const link = document.createElement('a')
    link.href = 'https://example.com/page'
    document.body.appendChild(link)

    // Simulate click
    link.click()

    expect(global.fetch).toHaveBeenCalledWith('/api/analytics/track', expect.objectContaining({
      method: 'POST',
      keepalive: true,
    }))

    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
    expect(body.event_type).toBe('outbound_click')
    expect(body.event_data.destination_url).toBe('https://example.com/page')

    document.body.removeChild(link)
  })

  it('does not track clicks on internal links', () => {
    renderHook(() => useOutboundTracking())

    const link = document.createElement('a')
    link.href = `${window.location.origin}/tools`
    document.body.appendChild(link)

    link.click()

    expect(global.fetch).not.toHaveBeenCalled()

    document.body.removeChild(link)
  })

  it('does not track clicks on non-anchor elements', () => {
    renderHook(() => useOutboundTracking())

    const button = document.createElement('button')
    document.body.appendChild(button)

    button.click()

    expect(global.fetch).not.toHaveBeenCalled()

    document.body.removeChild(button)
  })

  it('tracks click on child element inside external link', () => {
    renderHook(() => useOutboundTracking())

    const link = document.createElement('a')
    link.href = 'https://example.com'
    const span = document.createElement('span')
    span.textContent = 'Click me'
    link.appendChild(span)
    document.body.appendChild(link)

    span.click()

    expect(global.fetch).toHaveBeenCalled()

    document.body.removeChild(link)
  })

  it('handles fetch errors gracefully', () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'))

    renderHook(() => useOutboundTracking())

    const link = document.createElement('a')
    link.href = 'https://example.com'
    document.body.appendChild(link)

    // Should not throw
    expect(() => link.click()).not.toThrow()

    document.body.removeChild(link)
  })

  it('does not track links without href', () => {
    renderHook(() => useOutboundTracking())

    const link = document.createElement('a')
    document.body.appendChild(link)

    link.click()

    expect(global.fetch).not.toHaveBeenCalled()

    document.body.removeChild(link)
  })

  it('includes page_path in event payload', () => {
    renderHook(() => useOutboundTracking())

    const link = document.createElement('a')
    link.href = 'https://example.com'
    document.body.appendChild(link)

    link.click()

    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
    expect(body.page_path).toBe(window.location.pathname)

    document.body.removeChild(link)
  })
})
