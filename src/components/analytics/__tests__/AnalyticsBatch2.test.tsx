import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('next/dynamic', () => ({
  default: (loader: () => Promise<unknown>, opts?: { ssr?: boolean }) => {
    const DummyComponent = (props: Record<string, unknown>) => (
      <div data-testid="dynamic-component" data-props={JSON.stringify(props)} />
    )
    return DummyComponent
  },
}))

describe('ToolUseTrackerWrapper', () => {
  it('renders ToolUseTracker with slug prop', async () => {
    const { default: ToolUseTrackerWrapper } = await import('../ToolUseTrackerWrapper')
    const { container } = render(<ToolUseTrackerWrapper slug="json-formatter" />)
    const el = container.querySelector('[data-testid="dynamic-component"]')
    expect(el).toBeInTheDocument()
    const props = JSON.parse(el!.getAttribute('data-props') || '{}')
    expect(props.slug).toBe('json-formatter')
  })
})

describe('Analytics index exports', () => {
  it('exports all analytics components', async () => {
    vi.doMock('../PageViewTracker', () => ({ default: () => null }))
    vi.doMock('../ToolUseTracker', () => ({ default: () => null }))
    vi.doMock('../ToolUseTrackerWrapper', () => ({ default: () => null }))
    vi.doMock('../useTrackToolUse', () => ({ useTrackToolUse: () => ({}) }))
    vi.resetModules()
    const mod = await import('../index')
    expect(mod.PageViewTracker).toBeDefined()
    expect(mod.ToolUseTracker).toBeDefined()
    expect(mod.ToolUseTrackerWrapper).toBeDefined()
    expect(mod.useTrackToolUse).toBeDefined()
  })
})
