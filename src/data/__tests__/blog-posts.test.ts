import { describe, it, expect } from 'vitest'
import { blogPosts, blogSlugs, blogPostsByLocale, getBlogPostsByLocale, getBlogPostBySlug } from '@/data/blog-posts'
import { blogPostsAz } from '@/data/blog-posts-az'
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

  it('should contain exactly 19 blog posts', () => {
    expect(slugs.length).toBe(19)
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

// ---------------------------------------------------------------------------
// Azerbaijani (AZ) blog posts
// ---------------------------------------------------------------------------
const azSlugs = Object.keys(blogPostsAz)
const azPosts = Object.values(blogPostsAz)
const azEntries = Object.entries(blogPostsAz)

describe('blogPostsAz collection', () => {
  it('should not be empty', () => {
    expect(azSlugs.length).toBeGreaterThan(0)
  })

  it('should contain exactly 19 AZ blog posts', () => {
    expect(azSlugs.length).toBe(19)
  })

  it('should have the same slugs as the EN blog posts', () => {
    expect(azSlugs.sort()).toEqual(slugs.sort())
  })
})

describe('AZ blog post required fields', () => {
  it.each(azEntries)(
    'AZ post "%s" should have a non-empty title',
    (_slug, post) => {
      expect(typeof post.title).toBe('string')
      expect(post.title.length).toBeGreaterThan(0)
    }
  )

  it.each(azEntries)(
    'AZ post "%s" should have a non-empty date',
    (_slug, post) => {
      expect(typeof post.date).toBe('string')
      expect(post.date.length).toBeGreaterThan(0)
    }
  )

  it.each(azEntries)(
    'AZ post "%s" should have non-empty content',
    (_slug, post) => {
      expect(typeof post.content).toBe('string')
      expect(post.content.length).toBeGreaterThan(0)
    }
  )

  it.each(azEntries)(
    'AZ post "%s" should have a relatedTools array',
    (_slug, post) => {
      expect(Array.isArray(post.relatedTools)).toBe(true)
    }
  )
})

describe('AZ blog post dates', () => {
  it('should all be in YYYY-MM-DD format', () => {
    for (const post of azPosts) {
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('should match corresponding EN post dates', () => {
    for (const [slug, azPost] of azEntries) {
      const enPost = blogPosts[slug]
      expect(azPost.date).toBe(enPost.date)
    }
  })
})

describe('AZ blog post content', () => {
  it('should have content longer than 200 characters for each post', () => {
    for (const [slug, post] of azEntries) {
      expect(
        post.content.length,
        `AZ blog post "${slug}" content is too short (${post.content.length} chars)`
      ).toBeGreaterThan(200)
    }
  })

  it('should have content substantially longer than 1000 characters', () => {
    for (const post of azPosts) {
      expect(post.content.length).toBeGreaterThan(1000)
    }
  })
})

describe('AZ blog post relatedTools', () => {
  it('should have at least one related tool per post', () => {
    for (const [slug, post] of azEntries) {
      expect(
        post.relatedTools.length,
        `AZ blog post "${slug}" has no related tools`
      ).toBeGreaterThan(0)
    }
  })

  it('should only reference tool slugs that exist in the tools config', () => {
    for (const [slug, post] of azEntries) {
      for (const toolSlug of post.relatedTools) {
        expect(
          allToolSlugs.has(toolSlug),
          `AZ blog post "${slug}" references non-existent tool "${toolSlug}"`
        ).toBe(true)
      }
    }
  })

  it('should match the relatedTools of the corresponding EN post', () => {
    for (const [slug, azPost] of azEntries) {
      const enPost = blogPosts[slug]
      expect(azPost.relatedTools).toEqual(enPost.relatedTools)
    }
  })
})

// ---------------------------------------------------------------------------
// blogPostsByLocale and helper functions
// ---------------------------------------------------------------------------
describe('blogPostsByLocale', () => {
  it('should contain en and az locales', () => {
    expect(blogPostsByLocale).toHaveProperty('en')
    expect(blogPostsByLocale).toHaveProperty('az')
  })

  it('en locale should reference the original blogPosts', () => {
    expect(blogPostsByLocale.en).toBe(blogPosts)
  })

  it('az locale should reference blogPostsAz', () => {
    expect(blogPostsByLocale.az).toBe(blogPostsAz)
  })
})

describe('getBlogPostsByLocale', () => {
  it('should return EN posts for locale "en"', () => {
    expect(getBlogPostsByLocale('en')).toBe(blogPosts)
  })

  it('should return AZ posts for locale "az"', () => {
    expect(getBlogPostsByLocale('az')).toBe(blogPostsAz)
  })

  it('should fall back to EN posts for locale "tr" (no translations yet)', () => {
    expect(getBlogPostsByLocale('tr')).toBe(blogPosts)
  })

  it('should fall back to EN posts for locale "ru" (no translations yet)', () => {
    expect(getBlogPostsByLocale('ru')).toBe(blogPosts)
  })
})

describe('getBlogPostBySlug', () => {
  it('should return an EN post by slug', () => {
    const post = getBlogPostBySlug('best-free-online-tools-2026', 'en')
    expect(post).toBeDefined()
    expect(post!.title).toBe('Best Free Online Tools in 2026')
  })

  it('should return an AZ post by slug', () => {
    const post = getBlogPostBySlug('best-free-online-tools-2026', 'az')
    expect(post).toBeDefined()
    expect(post!.title).not.toBe('Best Free Online Tools in 2026')
    expect(post!.title.length).toBeGreaterThan(0)
  })

  it('should return undefined for a non-existent slug', () => {
    const post = getBlogPostBySlug('non-existent-slug', 'en')
    expect(post).toBeUndefined()
  })
})
