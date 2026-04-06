import { describe, it, expect } from 'vitest'

describe('UI index re-exports', () => {
  it('exports all UI components', async () => {
    const mod = await import('../index')
    expect(mod.ToolTextarea).toBeDefined()
    expect(mod.ToolInput).toBeDefined()
    expect(mod.ToolSelect).toBeDefined()
    expect(mod.ToolRadioGroup).toBeDefined()
    expect(mod.ToolAlert).toBeDefined()
  })
})
