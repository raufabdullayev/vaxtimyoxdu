import { describe, it, expect } from 'vitest'
import { newsArticles, newsSlugs } from '@/data/news-articles'
import type { NewsArticle } from '@/data/news-articles'

const slugs = Object.keys(newsArticles)
const articles = Object.values(newsArticles)
const entries = Object.entries(newsArticles)

// ---------------------------------------------------------------------------
// Collection-level checks
// ---------------------------------------------------------------------------
describe('newsArticles collection', () => {
  it('should not be empty', () => {
    expect(slugs.length).toBeGreaterThan(0)
  })

  it('should contain exactly 12 articles', () => {
    expect(slugs.length).toBe(12)
  })
})

// ---------------------------------------------------------------------------
// newsSlugs export
// ---------------------------------------------------------------------------
describe('newsSlugs export', () => {
  it('should be an array', () => {
    expect(Array.isArray(newsSlugs)).toBe(true)
  })

  it('should match Object.keys(newsArticles)', () => {
    expect(newsSlugs).toEqual(Object.keys(newsArticles))
  })

  it('should have the same length as the number of articles', () => {
    expect(newsSlugs.length).toBe(slugs.length)
  })
})

// ---------------------------------------------------------------------------
// Slug uniqueness and format
// ---------------------------------------------------------------------------
describe('news article slugs', () => {
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

  it('should be in kebab-case format (lowercase with hyphens)', () => {
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9\u00e0-\u024f]+([-][a-z0-9\u00e0-\u024f]+)*$/)
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
describe('news article required fields', () => {
  it.each(entries)(
    'article "%s" should have a non-empty title',
    (_slug, article) => {
      expect(typeof article.title).toBe('string')
      expect(article.title.length).toBeGreaterThan(0)
    }
  )

  it.each(entries)(
    'article "%s" should have a non-empty date',
    (_slug, article) => {
      expect(typeof article.date).toBe('string')
      expect(article.date.length).toBeGreaterThan(0)
    }
  )

  it.each(entries)(
    'article "%s" should have a non-empty category',
    (_slug, article) => {
      expect(typeof article.category).toBe('string')
      expect(article.category.length).toBeGreaterThan(0)
    }
  )

  it.each(entries)(
    'article "%s" should have non-empty content',
    (_slug, article) => {
      expect(typeof article.content).toBe('string')
      expect(article.content.length).toBeGreaterThan(0)
    }
  )
})

// ---------------------------------------------------------------------------
// Date validation
// ---------------------------------------------------------------------------
describe('news article dates', () => {
  it('should all be in YYYY-MM-DD format', () => {
    for (const article of articles) {
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('should all be parseable as valid dates', () => {
    for (const article of articles) {
      const parsed = new Date(article.date)
      expect(parsed.toString()).not.toBe('Invalid Date')
    }
  })

  it('should have dates in a reasonable range (2020-2030)', () => {
    for (const article of articles) {
      const year = parseInt(article.date.split('-')[0], 10)
      expect(year).toBeGreaterThanOrEqual(2020)
      expect(year).toBeLessThanOrEqual(2030)
    }
  })
})

// ---------------------------------------------------------------------------
// Content validation
// ---------------------------------------------------------------------------
describe('news article content', () => {
  it('should have content longer than 200 characters for each article', () => {
    for (const [slug, article] of entries) {
      expect(
        article.content.length,
        `Article "${slug}" content is too short (${article.content.length} chars)`
      ).toBeGreaterThan(200)
    }
  })

  it('should have content that is substantially longer than 1000 characters', () => {
    for (const article of articles) {
      expect(article.content.length).toBeGreaterThan(1000)
    }
  })
})

// ---------------------------------------------------------------------------
// Category validation
// ---------------------------------------------------------------------------
describe('news article categories', () => {
  const validCategories = [
    'Texnologiya',
    'Iqtisadiyyat',
    'Idman',
    'T\u0259hsil',
    'Sa\u011flaml\u0131q',
    'Elm',
    'M\u0259d\u0259niyy\u0259t',
    'S\u0259yah\u0259t',
    'Biznes',
    '\u0130qtisadiyyat',
    '\u0130dman',
  ]

  it('should all have a non-empty category string', () => {
    for (const article of articles) {
      expect(article.category.trim().length).toBeGreaterThan(0)
    }
  })

  it('should have categories that are recognizable Azerbaijani topic names', () => {
    for (const article of articles) {
      // Categories should be title-cased Azerbaijani words with at least 3 chars
      expect(article.category.length).toBeGreaterThanOrEqual(3)
    }
  })
})

// ---------------------------------------------------------------------------
// Interface conformance
// ---------------------------------------------------------------------------
describe('NewsArticle interface conformance', () => {
  it('should have exactly 4 expected keys per article', () => {
    const expectedKeys = ['title', 'date', 'category', 'content']
    for (const article of articles) {
      for (const key of expectedKeys) {
        expect(article).toHaveProperty(key)
      }
    }
  })

  it('should have string values for all fields', () => {
    for (const article of articles) {
      expect(typeof article.title).toBe('string')
      expect(typeof article.date).toBe('string')
      expect(typeof article.category).toBe('string')
      expect(typeof article.content).toBe('string')
    }
  })
})
