import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'

// ── Mocks ──────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  usePathname: () => '/tools/json-formatter',
}))

vi.mock('next-intl', () => ({
  useLocale: () => 'az',
}))

const mockFetch = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
vi.stubGlobal('fetch', mockFetch)

import ToolUseTracker from '../ToolUseTracker'

describe('ToolUseTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('should render nothing (returns null)', () => {
    const { container } = render(<ToolUseTracker slug="json-formatter" />)
    expect(container.innerHTML).toBe('')
  })

  it('should fire a tool_use event on mount', () => {
    render(<ToolUseTracker slug="json-formatter" />)

    expect(mockFetch).toHaveBeenCalledTimes(1)

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.event_type).toBe('tool_use')
    expect(body.page_path).toBe('/tools/json-formatter')
    expect(body.locale).toBe('az')
    expect(body.event_data.tool).toBe('json-formatter')
  })

  it('should not fire duplicate events for the same slug', () => {
    const { rerender } = render(<ToolUseTracker slug="json-formatter" />)
    expect(mockFetch).toHaveBeenCalledTimes(1)

    rerender(<ToolUseTracker slug="json-formatter" />)
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })
})
