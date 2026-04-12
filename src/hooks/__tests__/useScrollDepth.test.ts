import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollDepth } from '../useScrollDepth'

describe('useScrollDepth', () => {
  let mockObserve: ReturnType<typeof vi.fn>
  let mockDisconnect: ReturnType<typeof vi.fn>
  let observerCallback: IntersectionObserverCallback
  const originalFetch = global.fetch
  const originalIO = global.IntersectionObserver

  beforeEach(() => {
    mockObserve = vi.fn()
    mockDisconnect = vi.fn()

    const MockIO = class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback
      }
      observe = mockObserve
      disconnect = mockDisconnect
      unobserve = vi.fn()
      root = null
      rootMargin = ''
      thresholds = [] as number[]
      takeRecords = vi.fn()
    }
    global.IntersectionObserver = MockIO as unknown as typeof IntersectionObserver

    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch
  })

  afterEach(() => {
    global.IntersectionObserver = originalIO
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('creates IntersectionObserver when container exists', () => {
    const container = document.createElement('div')
    container.style.height = '1000px'
    document.body.appendChild(container)

    const ref = { current: container }
    renderHook(() => useScrollDepth('test-slug', ref))

    // Observer should have called observe for 4 sentinels
    expect(mockObserve).toHaveBeenCalledTimes(4)

    document.body.removeChild(container)
  })

  it('creates sentinel elements at 25%, 50%, 75%, 100%', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const ref = { current: container }
    renderHook(() => useScrollDepth('test-slug', ref))

    const sentinels = container.querySelectorAll('[data-scroll-depth]')
    expect(sentinels.length).toBe(4)
    expect(sentinels[0].getAttribute('data-scroll-depth')).toBe('0.25')
    expect(sentinels[1].getAttribute('data-scroll-depth')).toBe('0.5')
    expect(sentinels[2].getAttribute('data-scroll-depth')).toBe('0.75')
    expect(sentinels[3].getAttribute('data-scroll-depth')).toBe('1')

    document.body.removeChild(container)
  })

  it('sets container to position relative if static', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const ref = { current: container }
    renderHook(() => useScrollDepth('test-slug', ref))

    expect(container.style.position).toBe('relative')

    document.body.removeChild(container)
  })

  it('does not override existing position', () => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    document.body.appendChild(container)

    const ref = { current: container }
    renderHook(() => useScrollDepth('test-slug', ref))

    expect(container.style.position).toBe('absolute')

    document.body.removeChild(container)
  })

  it('fires analytics event when intersection occurs', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const ref = { current: container }
    renderHook(() => useScrollDepth('test-slug', ref))

    // Simulate intersection at 25%
    const sentinel = container.querySelector('[data-scroll-depth="0.25"]') as HTMLElement
    observerCallback(
      [{ isIntersecting: true, target: sentinel } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver
    )

    expect(global.fetch).toHaveBeenCalledWith('/api/analytics/track', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }))

    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
    expect(body.event_type).toBe('scroll_depth')
    expect(body.event_data.slug).toBe('test-slug')
    expect(body.event_data.depth).toBe(25)

    document.body.removeChild(container)
  })

  it('does not fire duplicate events for same threshold', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const ref = { current: container }
    renderHook(() => useScrollDepth('test-slug', ref))

    const sentinel = container.querySelector('[data-scroll-depth="0.5"]') as HTMLElement

    // Fire twice for same threshold
    observerCallback(
      [{ isIntersecting: true, target: sentinel } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
    observerCallback(
      [{ isIntersecting: true, target: sentinel } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver
    )

    expect(global.fetch).toHaveBeenCalledTimes(1)

    document.body.removeChild(container)
  })

  it('ignores non-intersecting entries', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const ref = { current: container }
    renderHook(() => useScrollDepth('test-slug', ref))

    const sentinel = container.querySelector('[data-scroll-depth="0.25"]') as HTMLElement
    observerCallback(
      [{ isIntersecting: false, target: sentinel } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver
    )

    expect(global.fetch).not.toHaveBeenCalled()

    document.body.removeChild(container)
  })

  it('does nothing when container ref is null', () => {
    const ref = { current: null }
    renderHook(() => useScrollDepth('test-slug', ref))

    // Observer should NOT have called observe since container is null
    expect(mockObserve).not.toHaveBeenCalled()
  })

  it('cleans up sentinels and observer on unmount', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const ref = { current: container }
    const { unmount } = renderHook(() => useScrollDepth('test-slug', ref))

    expect(container.querySelectorAll('[data-scroll-depth]').length).toBe(4)

    unmount()

    expect(mockDisconnect).toHaveBeenCalled()
    expect(container.querySelectorAll('[data-scroll-depth]').length).toBe(0)

    document.body.removeChild(container)
  })
})
