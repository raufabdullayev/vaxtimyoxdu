import { describe, it, expect } from 'vitest'
import { blogPosts, blogSlugs } from '@/data/blog-posts'
import { tools } from '@/config/tools'

const slugs = Object.keys(blogPosts)
const posts = Object.values(blogPosts)
const entries = Object.entries(blogPosts)
const allToolSlugs = new Set(tools.map((t) => t.slug))

// ---------------------------------------------------------------------------
// Collection-level checks
// ---------------------------------------------------------------------------
describe('blogPosts collection', () => {
  it('should not be empty', () => {
    expect(slugs.length).toBeGreaterThan(0)
  })

  it('should contain exactly 13 blog posts', () => {
    expect(slugs.length).toBe(13)
  })
})

// ---------------------------------------------------------------------------
// blogSlugs export
// ---------------------------------------------------------------------------
describe('blogSlugs export', () => {
  it('should be an array', () => {
    expect(Array.isArray(blogSlugs)).toBe(true)
  })

  it('should match Object.keys(blogPosts)', () => {
    expect(blogSlugs).toEqual(Object.keys(blogPosts))
  })

  it('should have the same length as the number of posts', () => {
    expect(blogSlugs.length).toBe(slugs.length)
  })
})

// ---------------------------------------------------------------------------
// Slug uniqueness and format
// ---------------------------------------------------------------------------
describe('blog post slugs', () => {
  it('should all be unique', () => {
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('should be non-empty strings', () => {
    for (const slug of slugs) {
      expect(typeof slug).toBe('string')
      expect(slug.length).toBeGreaterThan(0)
    }
  })

  it('should be in kebab-case format', () => {
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('should not contain spaces', () => {
    for (const slug of slugs) {
      expect(slug).not.toMatch(/\s/)
    }
  })
})

// ---------------------------------------------------------------------------
// Required fields
// ---------------------------------------------------------------------------
describe('blog post required fields', () => {
  it.each(entries)(
    'post "%s" should have a non-empty title',
    (_slug, post) => {
      expect(typeof post.title).toBe('string')
      expect(post.title.length).toBeGreaterThan(0)
    }
  )

  it.each(entries)(
    'post "%s" should have a non-empty date',
    (_slug, post) => {
      expect(typeof post.date).toBe('string')
      expect(post.date.length).toBeGreaterThan(0)
    }
  )

  it.each(entries)(
    'post "%s" should have non-empty content',
    (_slug, post) => {
      expect(typeof post.content).toBe('string')
      expect(post.content.length).toBeGreaterThan(0)
    }
  )

  it.each(entries)(
    'post "%s" should have a relatedTools array',
    (_slug, post) => {
      expect(Array.isArray(post.relatedTools)).toBe(true)
    }
  )
})

// ---------------------------------------------------------------------------
// Date validation
// ---------------------------------------------------------------------------
describe('blog post dates', () => {
  it('should all be in YYYY-MM-DD format', () => {
    for (const post of posts) {
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('should all be parseable as valid dates', () => {
    for (const post of posts) {
      const parsed = new Date(post.date)
      expect(parsed.toString()).not.toBe('Invalid Date')
    }
  })

  it('should have dates in a reasonable range (2020-2030)', () => {
    for (const post of posts) {
      const year = parseInt(post.date.split('-')[0], 10)
      expect(year).toBeGreaterThanOrEqual(2020)
      expect(year).toBeLessThanOrEqual(2030)
    }
  })
})

// ---------------------------------------------------------------------------
// Content validation
// ---------------------------------------------------------------------------
describe('blog post content', () => {
  it('should have content longer than 200 characters for each post', () => {
    for (const [slug, post] of entries) {
      expect(
        post.content.length,
        `Blog post "${slug}" content is too short (${post.content.length} chars)`
      ).toBeGreaterThan(200)
    }
  })

  it('should have content substantially longer than 1000 characters', () => {
    for (const post of posts) {
      expect(post.content.length).toBeGreaterThan(1000)
    }
  })
})

// ---------------------------------------------------------------------------
// relatedTools validation
// ---------------------------------------------------------------------------
describe('blog post relatedTools', () => {
  it('should have at least one related tool per post', () => {
    for (const [slug, post] of entries) {
      expect(
        post.relatedTools.length,
        `Blog post "${slug}" has no related tools`
      ).toBeGreaterThan(0)
    }
  })

  it('should only reference tool slugs that exist in the tools config', () => {
    for (const [slug, post] of entries) {
      for (const toolSlug of post.relatedTools) {
        expect(
          allToolSlugs.has(toolSlug),
          `Blog post "${slug}" references non-existent tool "${toolSlug}"`
        ).toBe(true)
      }
    }
  })

  it('should not have duplicate tool slugs within a single post', () => {
    for (const [slug, post] of entries) {
      const unique = new Set(post.relatedTools)
      expect(
        unique.size,
        `Blog post "${slug}" has duplicate relatedTools entries`
      ).toBe(post.relatedTools.length)
    }
  })

  it('should have relatedTools entries that are non-empty strings', () => {
    for (const post of posts) {
      for (const toolSlug of post.relatedTools) {
        expect(typeof toolSlug).toBe('string')
        expect(toolSlug.length).toBeGreaterThan(0)
      }
    }
  })
})

// ---------------------------------------------------------------------------
// Interface conformance
// ---------------------------------------------------------------------------
describe('BlogPost interface conformance', () => {
  it('should have exactly 4 expected keys per post', () => {
    const expectedKeys = ['title', 'date', 'content', 'relatedTools']
    for (const post of posts) {
      for (const key of expectedKeys) {
        expect(post).toHaveProperty(key)
      }
    }
  })

  it('should have string values for title, date, and content', () => {
    for (const post of posts) {
      expect(typeof post.title).toBe('string')
      expect(typeof post.date).toBe('string')
      expect(typeof post.content).toBe('string')
    }
  })

  it('should have array values for relatedTools', () => {
    for (const post of posts) {
      expect(Array.isArray(post.relatedTools)).toBe(true)
    }
  })
})
