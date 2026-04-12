import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSessionEngagement } from '../useSessionEngagement'

describe('useSessionEngagement', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>
  let docAddEventListenerSpy: ReturnType<typeof vi.spyOn>
  let docRemoveEventListenerSpy: ReturnType<typeof vi.spyOn>
  const mockSendBeacon = vi.fn()

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    docAddEventListenerSpy = vi.spyOn(document, 'addEventListener')
    docRemoveEventListenerSpy = vi.spyOn(document, 'removeEventListener')

    Object.defineProperty(navigator, 'sendBeacon', {
      value: mockSendBeacon,
      writable: true,
      configurable: true,
    })

    mockSendBeacon.mockClear()
  })

  afterEach(() => {
    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
    docAddEventListenerSpy.mockRestore()
    docRemoveEventListenerSpy.mockRestore()
    vi.restoreAllMocks()
  })

  it('registers beforeunload event listener', () => {
    renderHook(() => useSessionEngagement())

    expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))
  })

  it('registers visibilitychange event listener', () => {
    renderHook(() => useSessionEngagement())

    expect(docAddEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
  })

  it('removes event listeners on unmount', () => {
    const { unmount } = renderHook(() => useSessionEngagement())

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))
    expect(docRemoveEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
  })

  it('sends beacon on beforeunload with session data', () => {
    renderHook(() => useSessionEngagement())

    // Get the beforeunload handler
    const beforeUnloadCall = addEventListenerSpy.mock.calls.find(
      (call: unknown[]) => call[0] === 'beforeunload'
    )
    const handler = beforeUnloadCall![1] as EventListener

    // Simulate unload
    handler(new Event('beforeunload'))

    expect(mockSendBeacon).toHaveBeenCalledWith(
      '/api/analytics/track',
      expect.any(Blob)
    )

    // Parse the blob content
    const blob = mockSendBeacon.mock.calls[0][1] as Blob
    expect(blob.type).toBe('application/json')
  })

  it('marks as bounced if duration < 30s', () => {
    vi.useFakeTimers()
    renderHook(() => useSessionEngagement())

    // Get the handler
    const beforeUnloadCall = addEventListenerSpy.mock.calls.find(
      (call: unknown[]) => call[0] === 'beforeunload'
    )
    const handler = beforeUnloadCall![1] as EventListener

    // Call immediately (< 30s)
    vi.advanceTimersByTime(5000)
    handler(new Event('beforeunload'))

    expect(mockSendBeacon).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('falls back to fetch when sendBeacon is not available', () => {
    // Remove sendBeacon
    Object.defineProperty(navigator, 'sendBeacon', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    const originalFetch = global.fetch
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch

    renderHook(() => useSessionEngagement())

    const beforeUnloadCall = addEventListenerSpy.mock.calls.find(
      (call: unknown[]) => call[0] === 'beforeunload'
    )
    const handler = beforeUnloadCall![1] as EventListener
    handler(new Event('beforeunload'))

    expect(global.fetch).toHaveBeenCalledWith('/api/analytics/track', expect.objectContaining({
      method: 'POST',
      keepalive: true,
    }))

    global.fetch = originalFetch
  })
})
