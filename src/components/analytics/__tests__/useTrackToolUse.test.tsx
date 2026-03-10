import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

// ── Mocks ──────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  usePathname: () => '/tools/base64-encode-decode',
}))

vi.mock('next-intl', () => ({
  useLocale: () => 'tr',
}))

const mockFetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
vi.stubGlobal('fetch', mockFetch)

import { useTrackToolUse } from '../useTrackToolUse'

describe('useTrackToolUse', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return a function', () => {
    const { result } = renderHook(() => useTrackToolUse())
    expect(typeof result.current).toBe('function')
  })

  it('should send a tool_use event when called', () => {
    const { result } = renderHook(() => useTrackToolUse())

    act(() => {
      result.current('base64-encode-decode')
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.event_type).toBe('tool_use')
    expect(body.page_path).toBe('/tools/base64-encode-decode')
    expect(body.locale).toBe('tr')
    expect(body.event_data.tool).toBe('base64-encode-decode')
  })

  it('should deduplicate calls with the same slug', () => {
    const { result } = renderHook(() => useTrackToolUse())

    act(() => {
      result.current('base64-encode-decode')
      result.current('base64-encode-decode')
      result.current('base64-encode-decode')
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('should track different slugs separately', () => {
    const { result } = renderHook(() => useTrackToolUse())

    act(() => {
      result.current('json-formatter')
      result.current('csv-to-json')
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  it('should not throw when fetch fails', () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    const { result } = renderHook(() => useTrackToolUse())

    expect(() => {
      act(() => {
        result.current('json-formatter')
      })
    }).not.toThrow()
  })
})
