import { describe, it, expect } from 'vitest'
import { tools, categories } from '@/config/tools'
import type { ToolCategory } from '@/types/tool'

const VALID_CATEGORIES: ToolCategory[] = [
  'ai',
  'pdf',
  'image',
  'dev',
  'generators',
  'text',
]

describe('tools configuration', () => {
  it('should not be empty', () => {
    expect(tools.length).toBeGreaterThan(0)
  })

  it('should contain exactly 77 tools', () => {
    expect(tools.length).toBe(77)
  })

  describe('required fields', () => {
    it.each(tools.map((t) => [t.slug, t]))(
      'tool "%s" should have all required fields',
      (_slug, tool) => {
        expect(tool.slug).toBeTruthy()
        expect(typeof tool.slug).toBe('string')

        expect(tool.name).toBeTruthy()
        expect(typeof tool.name).toBe('string')

        expect(tool.description).toBeTruthy()
        expect(typeof tool.description).toBe('string')

        expect(tool.shortDescription).toBeTruthy()
        expect(typeof tool.shortDescription).toBe('string')

        expect(tool.category).toBeTruthy()
        expect(typeof tool.category).toBe('string')

        expect(tool.icon).toBeTruthy()
        expect(typeof tool.icon).toBe('string')

        expect(typeof tool.isAI).toBe('boolean')
        expect(typeof tool.isClientSide).toBe('boolean')

        expect(Array.isArray(tool.keywords)).toBe(true)
        expect(tool.keywords.length).toBeGreaterThan(0)
      }
    )
  })

  describe('slug uniqueness', () => {
    it('should have all unique slugs', () => {
      const slugs = tools.map((t) => t.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })

    it('should not have slugs with spaces', () => {
      for (const tool of tools) {
        expect(tool.slug).not.toMatch(/\s/)
      }
    })

    it('should have slugs in kebab-case format', () => {
      for (const tool of tools) {
        expect(tool.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      }
    })
  })

  describe('category validation', () => {
    it('should have a valid category for each tool', () => {
      for (const tool of tools) {
        expect(VALID_CATEGORIES).toContain(tool.category)
      }
    })

    it('should have at least one tool per category', () => {
      for (const category of VALID_CATEGORIES) {
        const count = tools.filter((t) => t.category === category).length
        expect(count).toBeGreaterThan(0)
      }
    })
  })

  describe('AI tool consistency', () => {
    it('AI tools should have isAI set to true', () => {
      const aiTools = tools.filter((t) => t.category === 'ai')
      for (const tool of aiTools) {
        expect(tool.isAI).toBe(true)
      }
    })

    it('non-AI tools should have isAI set to false', () => {
      const nonAiTools = tools.filter((t) => t.category !== 'ai')
      for (const tool of nonAiTools) {
        expect(tool.isAI).toBe(false)
      }
    })

    it('AI tools should have isClientSide set to false', () => {
      const aiTools = tools.filter((t) => t.isAI)
      for (const tool of aiTools) {
        expect(tool.isClientSide).toBe(false)
      }
    })
  })

  describe('keyword validation', () => {
    it('should have non-empty keyword arrays for all tools', () => {
      for (const tool of tools) {
        expect(tool.keywords.length).toBeGreaterThan(0)
        for (const keyword of tool.keywords) {
          expect(keyword.trim().length).toBeGreaterThan(0)
        }
      }
    })
  })

  describe('description validation', () => {
    it('should have descriptions longer than 20 characters', () => {
      for (const tool of tools) {
        expect(tool.description.length).toBeGreaterThan(20)
      }
    })

    it('should have short descriptions shorter than descriptions', () => {
      for (const tool of tools) {
        expect(tool.shortDescription.length).toBeLessThan(
          tool.description.length
        )
      }
    })
  })
})

describe('categories configuration', () => {
  it('should have entries for all valid categories', () => {
    for (const category of VALID_CATEGORIES) {
      expect(categories[category]).toBeDefined()
      expect(categories[category].name).toBeTruthy()
      expect(categories[category].description).toBeTruthy()
    }
  })

  it('should have a name and description for each category', () => {
    for (const key of Object.keys(categories)) {
      expect(categories[key].name).toBeTruthy()
      expect(typeof categories[key].name).toBe('string')
      expect(categories[key].description).toBeTruthy()
      expect(typeof categories[key].description).toBe('string')
    }
  })
})
