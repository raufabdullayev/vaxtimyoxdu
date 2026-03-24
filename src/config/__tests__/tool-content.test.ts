import { describe, it, expect } from 'vitest'
import { toolsWithRichContent, getToolContentConfig, hasRichContent } from '../tool-content'

describe('tool-content', () => {
  it('exports toolsWithRichContent array', () => {
    expect(Array.isArray(toolsWithRichContent)).toBe(true)
    expect(toolsWithRichContent.length).toBe(20)
  })

  it('each tool has required fields', () => {
    for (const tool of toolsWithRichContent) {
      expect(tool.slug).toBeTruthy()
      expect(typeof tool.faqCount).toBe('number')
      expect(tool.faqCount).toBeGreaterThanOrEqual(1)
      expect(tool.hasRichContent).toBe(true)
    }
  })

  it('getToolContentConfig returns config for known tool', () => {
    const config = getToolContentConfig('json-formatter')
    expect(config).toBeDefined()
    expect(config?.slug).toBe('json-formatter')
    expect(config?.faqCount).toBe(7)
  })

  it('getToolContentConfig returns undefined for unknown tool', () => {
    const config = getToolContentConfig('nonexistent-tool')
    expect(config).toBeUndefined()
  })

  it('hasRichContent returns true for known tool', () => {
    expect(hasRichContent('json-formatter')).toBe(true)
    expect(hasRichContent('password-generator')).toBe(true)
  })

  it('hasRichContent returns false for unknown tool', () => {
    expect(hasRichContent('nonexistent-tool')).toBe(false)
  })

  it('includes specific tools', () => {
    const slugs = toolsWithRichContent.map(t => t.slug)
    expect(slugs).toContain('json-formatter')
    expect(slugs).toContain('image-compress')
    expect(slugs).toContain('pdf-merge')
    expect(slugs).toContain('qr-code-generator')
    expect(slugs).toContain('password-generator')
  })
})
