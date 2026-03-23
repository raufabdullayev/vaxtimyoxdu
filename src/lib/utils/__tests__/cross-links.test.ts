import { describe, it, expect } from 'vitest'
import {
  popularToolSlugs,
  getPopularTools,
  getToolCategories,
  getToolsForNewsCategory,
  getBlogPostsForTool,
  getBlogPostsForCategory,
} from '../cross-links'

describe('cross-links utilities', () => {
  describe('popularToolSlugs', () => {
    it('is a non-empty array of strings', () => {
      expect(Array.isArray(popularToolSlugs)).toBe(true)
      expect(popularToolSlugs.length).toBeGreaterThan(0)
      popularToolSlugs.forEach((slug) => {
        expect(typeof slug).toBe('string')
      })
    })
  })

  describe('getPopularTools', () => {
    it('returns the requested number of tools', () => {
      const tools = getPopularTools(5)
      expect(tools.length).toBeLessThanOrEqual(5)
      expect(tools.length).toBeGreaterThan(0)
    })

    it('returns tools with slug and name properties', () => {
      const tools = getPopularTools(3)
      tools.forEach((tool) => {
        expect(tool).toHaveProperty('slug')
        expect(tool).toHaveProperty('name')
        expect(typeof tool.slug).toBe('string')
      })
    })

    it('defaults to 10 tools', () => {
      const tools = getPopularTools()
      expect(tools.length).toBeLessThanOrEqual(10)
    })
  })

  describe('getToolCategories', () => {
    it('returns an array of categories', () => {
      const categories = getToolCategories()
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('each category has key, name, and description', () => {
      const categories = getToolCategories()
      categories.forEach((cat) => {
        expect(cat).toHaveProperty('key')
        expect(cat).toHaveProperty('name')
        expect(cat).toHaveProperty('description')
        expect(typeof cat.key).toBe('string')
        expect(typeof cat.name).toBe('string')
      })
    })
  })

  describe('getToolsForNewsCategory', () => {
    it('returns tools for a known news category', () => {
      const tools = getToolsForNewsCategory('Texnologiya', 4)
      expect(tools.length).toBeGreaterThan(0)
      expect(tools.length).toBeLessThanOrEqual(4)
    })

    it('returns popular tools for unknown category', () => {
      const tools = getToolsForNewsCategory('UnknownCategory', 3)
      expect(tools.length).toBeGreaterThan(0)
      expect(tools.length).toBeLessThanOrEqual(3)
    })

    it('respects count parameter', () => {
      const tools2 = getToolsForNewsCategory('Technology', 2)
      expect(tools2.length).toBeLessThanOrEqual(2)
    })

    it('returns tools with valid slug property', () => {
      const tools = getToolsForNewsCategory('Biznes')
      tools.forEach((tool) => {
        expect(typeof tool.slug).toBe('string')
        expect(tool.slug.length).toBeGreaterThan(0)
      })
    })
  })

  describe('getBlogPostsForTool', () => {
    it('returns an array (may be empty for unknown tools)', () => {
      const posts = getBlogPostsForTool('nonexistent-tool')
      expect(Array.isArray(posts)).toBe(true)
    })

    it('respects count parameter', () => {
      const posts = getBlogPostsForTool('json-formatter', 1)
      expect(posts.length).toBeLessThanOrEqual(1)
    })

    it('returns posts with slug, title, and date', () => {
      const posts = getBlogPostsForTool('json-formatter', 5)
      posts.forEach((post) => {
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('date')
      })
    })
  })

  describe('getBlogPostsForCategory', () => {
    it('returns an array for a valid category', () => {
      const posts = getBlogPostsForCategory('dev', 3)
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBeLessThanOrEqual(3)
    })

    it('returns posts with slug, title, and date properties', () => {
      const posts = getBlogPostsForCategory('ai', 5)
      posts.forEach((post) => {
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('date')
      })
    })
  })
})
