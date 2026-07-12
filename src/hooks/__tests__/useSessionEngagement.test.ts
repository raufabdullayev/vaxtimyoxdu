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

  // ── Regression coverage for the once-only guard + bfcache reset ──

  const getHandler = (
    spy: ReturnType<typeof vi.spyOn>,
    type: string
  ): EventListener =>
    (spy.mock.calls.find((call: unknown[]) => call[0] === type)![1] as EventListener)

  it('sends the beacon at most once across visibilitychange:hidden and beforeunload', () => {
    renderHook(() => useSessionEngagement())

    const beforeUnload = getHandler(addEventListenerSpy, 'beforeunload')
    const visibility = getHandler(docAddEventListenerSpy, 'visibilitychange')

    // A normal tab close fires BOTH events — the guard must collapse them to one.
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true })
    visibility(new Event('visibilitychange'))
    beforeUnload(new Event('beforeunload'))

    expect(mockSendBeacon).toHaveBeenCalledTimes(1)
  })

  it('re-arms the beacon after a bfcache restore (pageshow persisted)', () => {
    renderHook(() => useSessionEngagement())

    const visibility = getHandler(docAddEventListenerSpy, 'visibilitychange')
    const pageshow = getHandler(addEventListenerSpy, 'pageshow')

    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true })
    visibility(new Event('visibilitychange'))
    expect(mockSendBeacon).toHaveBeenCalledTimes(1)

    // bfcache restore resets the guard...
    const persisted = new Event('pageshow') as PageTransitionEvent
    Object.defineProperty(persisted, 'persisted', { value: true })
    pageshow(persisted)

    // ...so hiding again emits a fresh beacon.
    visibility(new Event('visibilitychange'))
    expect(mockSendBeacon).toHaveBeenCalledTimes(2)
  })

  it('does NOT re-arm on a normal (non-persisted) pageshow', () => {
    renderHook(() => useSessionEngagement())

    const visibility = getHandler(docAddEventListenerSpy, 'visibilitychange')
    const pageshow = getHandler(addEventListenerSpy, 'pageshow')

    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true })
    visibility(new Event('visibilitychange'))
    expect(mockSendBeacon).toHaveBeenCalledTimes(1)

    const normal = new Event('pageshow') as PageTransitionEvent
    Object.defineProperty(normal, 'persisted', { value: false })
    pageshow(normal)

    visibility(new Event('visibilitychange'))
    expect(mockSendBeacon).toHaveBeenCalledTimes(1)
  })
})
