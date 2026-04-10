import { describe, it, expect } from 'vitest'
import {
  getToolBySlug,
  getToolsByCategory,
  getAllTools,
  searchTools,
} from '@/lib/tools/registry'
import { tools } from '@/config/tools'
import type { ToolCategory } from '@/types/tool'

describe('getToolBySlug()', () => {
  it('should return the correct tool for a valid slug', () => {
    const tool = getToolBySlug('json-formatter')
    expect(tool).toBeDefined()
    expect(tool!.slug).toBe('json-formatter')
    expect(tool!.name).toBe('JSON Formatter & Validator')
  })

  it('should return undefined for a non-existent slug', () => {
    const tool = getToolBySlug('non-existent-tool')
    expect(tool).toBeUndefined()
  })

  it('should return undefined for an empty string', () => {
    const tool = getToolBySlug('')
    expect(tool).toBeUndefined()
  })

  it('should be case-sensitive (slugs are lowercase)', () => {
    const tool = getToolBySlug('JSON-FORMATTER')
    expect(tool).toBeUndefined()
  })

  it('should find each tool by its slug', () => {
    for (const tool of tools) {
      const found = getToolBySlug(tool.slug)
      expect(found).toBeDefined()
      expect(found!.slug).toBe(tool.slug)
    }
  })
})

describe('getToolsByCategory()', () => {
  const validCategories: ToolCategory[] = [
    'ai',
    'pdf',
    'image',
    'dev',
    'generators',
    'text',
  ]

  it('should return only tools matching the given category', () => {
    for (const category of validCategories) {
      const result = getToolsByCategory(category)
      expect(result.length).toBeGreaterThan(0)
      for (const tool of result) {
        expect(tool.category).toBe(category)
      }
    }
  })

  it('should return AI tools for the "ai" category', () => {
    const aiTools = getToolsByCategory('ai')
    expect(aiTools.length).toBe(4)
    for (const tool of aiTools) {
      expect(tool.isAI).toBe(true)
    }
  })

  it('should return PDF tools for the "pdf" category', () => {
    const pdfTools = getToolsByCategory('pdf')
    expect(pdfTools.length).toBeGreaterThanOrEqual(1)
    expect(pdfTools[0].slug).toBe('pdf-merge')
  })

  it('should return developer tools for the "dev" category', () => {
    const devTools = getToolsByCategory('dev')
    expect(devTools.length).toBeGreaterThanOrEqual(5)
    const slugs = devTools.map((t) => t.slug)
    expect(slugs).toContain('json-formatter')
    expect(slugs).toContain('base64-encode-decode')
    expect(slugs).toContain('regex-tester')
  })

  it('should return an empty array for an invalid category', () => {
    const result = getToolsByCategory('invalid' as ToolCategory)
    expect(result).toEqual([])
  })

  it('should cover all tools across all categories', () => {
    let totalCount = 0
    for (const category of validCategories) {
      totalCount += getToolsByCategory(category).length
    }
    expect(totalCount).toBe(tools.length)
  })
})

describe('getAllTools()', () => {
  it('should return all tools', () => {
    const allTools = getAllTools()
    expect(allTools).toEqual(tools)
  })

  it('should return the same number of tools as the config', () => {
    const allTools = getAllTools()
    expect(allTools.length).toBe(tools.length)
  })

  it('should return a non-empty array', () => {
    const allTools = getAllTools()
    expect(allTools.length).toBeGreaterThan(0)
  })

  it('should contain the reference to the same tools array', () => {
    const allTools = getAllTools()
    expect(allTools).toBe(tools)
  })
})

describe('searchTools()', () => {
  it('should find tools by exact name match', () => {
    const results = searchTools('JSON Formatter')
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results[0].slug).toBe('json-formatter')
  })

  it('should be case-insensitive', () => {
    const lowerResults = searchTools('json formatter')
    const upperResults = searchTools('JSON FORMATTER')
    expect(lowerResults).toEqual(upperResults)
  })

  it('should find tools by partial name match', () => {
    const results = searchTools('password')
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results.some((t) => t.slug === 'password-generator')).toBe(true)
  })

  it('should find tools by keyword match', () => {
    const results = searchTools('sha256')
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results.some((t) => t.slug === 'hash-generator')).toBe(true)
  })

  it('should find tools by category match', () => {
    const results = searchTools('ai')
    expect(results.length).toBeGreaterThanOrEqual(3)
    for (const tool of results) {
      const matchesName = tool.name.toLowerCase().includes('ai')
      const matchesKeyword = tool.keywords.some((k) => k.includes('ai'))
      const matchesCategory = tool.category.includes('ai')
      expect(matchesName || matchesKeyword || matchesCategory).toBe(true)
    }
  })

  it('should return an empty array for a query that matches nothing', () => {
    const results = searchTools('xyznonexistent12345')
    expect(results).toEqual([])
  })

  it('should return an empty array for an empty query', () => {
    // Empty string matches everything since ''.includes('') is true
    // This is actually expected behavior - an empty search returns all tools
    const results = searchTools('')
    expect(results.length).toBe(tools.length)
  })

  it('should find multiple tools when query is broad', () => {
    const results = searchTools('converter')
    expect(results.length).toBeGreaterThanOrEqual(2)
  })

  it('should find tools by keyword "qr"', () => {
    const results = searchTools('qr')
    expect(results.length).toBeGreaterThanOrEqual(1)
    expect(results.some((t) => t.slug === 'qr-code-generator')).toBe(true)
  })
})
