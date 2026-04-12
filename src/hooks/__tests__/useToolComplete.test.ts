import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToolComplete } from '../useToolComplete'

describe('useToolComplete', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('returns a trackComplete function', () => {
    const { result } = renderHook(() => useToolComplete('json-formatter'))
    expect(typeof result.current).toBe('function')
  })

  it('fires analytics event with correct payload', () => {
    const { result } = renderHook(() => useToolComplete('json-formatter'))

    act(() => {
      result.current('format')
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/analytics/track', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }))

    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
    expect(body.event_type).toBe('tool_complete')
    expect(body.event_data.toolSlug).toBe('json-formatter')
    expect(body.event_data.action).toBe('format')
  })

  it('fires event without action parameter', () => {
    const { result } = renderHook(() => useToolComplete('base64'))

    act(() => {
      result.current()
    })

    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
    expect(body.event_data.toolSlug).toBe('base64')
    expect(body.event_data.action).toBeUndefined()
  })

  it('debounces rapid-fire calls (1s window)', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useToolComplete('json-formatter'))

    act(() => {
      result.current('format')
    })
    expect(global.fetch).toHaveBeenCalledTimes(1)

    // Call again immediately -- should be debounced
    act(() => {
      result.current('format')
    })
    expect(global.fetch).toHaveBeenCalledTimes(1)

    // Advance past the 1s window
    act(() => {
      vi.advanceTimersByTime(1100)
    })

    act(() => {
      result.current('format')
    })
    expect(global.fetch).toHaveBeenCalledTimes(2)

    vi.useRealTimers()
  })

  it('handles fetch error gracefully', () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useToolComplete('json-formatter'))

    // Should not throw
    expect(() => {
      act(() => {
        result.current('format')
      })
    }).not.toThrow()
  })

  it('uses slug from hook parameter', () => {
    const { result } = renderHook(() => useToolComplete('password-generator'))

    act(() => {
      result.current('generate')
    })

    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body)
    expect(body.event_data.toolSlug).toBe('password-generator')
  })
})
