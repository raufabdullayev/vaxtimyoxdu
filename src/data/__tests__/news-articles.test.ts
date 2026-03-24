import { describe, it, expect } from 'vitest'
import { newsArticles, newsSlugs, getArticlesByLocale, getSlugsByLocale } from '@/data/news-articles'
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

  it('should contain exactly 69 articles (27 AZ + 22 EN + 10 TR + 10 RU)', () => {
    expect(slugs.length).toBe(69)
  })

  it('should have 27 AZ articles', () => {
    const azArticles = Object.values(newsArticles).filter(
      (a) => (a.locale || 'az') === 'az'
    )
    expect(azArticles.length).toBe(27)
  })

  it('should have 22 EN articles', () => {
    const enArticles = Object.values(newsArticles).filter(
      (a) => a.locale === 'en'
    )
    expect(enArticles.length).toBe(22)
  })

  it('should have 10 TR articles', () => {
    const trArticles = Object.values(newsArticles).filter(
      (a) => a.locale === 'tr'
    )
    expect(trArticles.length).toBe(10)
  })

  it('should have 10 RU articles', () => {
    const ruArticles = Object.values(newsArticles).filter(
      (a) => a.locale === 'ru'
    )
    expect(ruArticles.length).toBe(10)
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
// getArticlesByLocale helper
// ---------------------------------------------------------------------------
describe('getArticlesByLocale', () => {
  it('should return all articles when no locale is provided', () => {
    const all = getArticlesByLocale()
    expect(Object.keys(all).length).toBe(69)
  })

  it('should return only AZ articles for locale "az"', () => {
    const az = getArticlesByLocale('az')
    expect(Object.keys(az).length).toBe(27)
    for (const article of Object.values(az)) {
      expect(article.locale || 'az').toBe('az')
    }
  })

  it('should return only EN articles for locale "en"', () => {
    const en = getArticlesByLocale('en')
    expect(Object.keys(en).length).toBe(22)
    for (const article of Object.values(en)) {
      expect(article.locale).toBe('en')
    }
  })

  it('should return only TR articles for locale "tr"', () => {
    const tr = getArticlesByLocale('tr')
    expect(Object.keys(tr).length).toBe(10)
    for (const article of Object.values(tr)) {
      expect(article.locale).toBe('tr')
    }
  })

  it('should return only RU articles for locale "ru"', () => {
    const ru = getArticlesByLocale('ru')
    expect(Object.keys(ru).length).toBe(10)
    for (const article of Object.values(ru)) {
      expect(article.locale).toBe('ru')
    }
  })

  it('should return empty object for unsupported locale', () => {
    const fr = getArticlesByLocale('fr')
    expect(Object.keys(fr).length).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// getSlugsByLocale helper
// ---------------------------------------------------------------------------
describe('getSlugsByLocale', () => {
  it('should return all slugs when no locale is provided', () => {
    const all = getSlugsByLocale()
    expect(all.length).toBe(69)
  })

  it('should return 27 slugs for AZ locale', () => {
    const azSlugs = getSlugsByLocale('az')
    expect(azSlugs.length).toBe(27)
  })

  it('should return 22 slugs for EN locale', () => {
    const enSlugs = getSlugsByLocale('en')
    expect(enSlugs.length).toBe(22)
    for (const slug of enSlugs) {
      expect(slug.startsWith('en-')).toBe(true)
    }
  })

  it('should return 10 slugs for TR locale', () => {
    const trSlugs = getSlugsByLocale('tr')
    expect(trSlugs.length).toBe(10)
    for (const slug of trSlugs) {
      expect(slug.startsWith('tr-')).toBe(true)
    }
  })

  it('should return 10 slugs for RU locale', () => {
    const ruSlugs = getSlugsByLocale('ru')
    expect(ruSlugs.length).toBe(10)
    for (const slug of ruSlugs) {
      expect(slug.startsWith('ru-')).toBe(true)
    }
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

  it('EN slugs should all start with "en-"', () => {
    const enSlugs = getSlugsByLocale('en')
    for (const slug of enSlugs) {
      expect(slug.startsWith('en-')).toBe(true)
    }
  })

  it('TR slugs should all start with "tr-"', () => {
    const trSlugs = getSlugsByLocale('tr')
    for (const slug of trSlugs) {
      expect(slug.startsWith('tr-')).toBe(true)
    }
  })

  it('RU slugs should all start with "ru-"', () => {
    const ruSlugs = getSlugsByLocale('ru')
    for (const slug of ruSlugs) {
      expect(slug.startsWith('ru-')).toBe(true)
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

  it('EN articles should share dates with their AZ counterparts', () => {
    const azDates = new Set(
      Object.values(getArticlesByLocale('az')).map((a) => a.date)
    )
    const enDates = Object.values(getArticlesByLocale('en')).map((a) => a.date)
    for (const date of enDates) {
      expect(azDates.has(date)).toBe(true)
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
  it('should all have a non-empty category string', () => {
    for (const article of articles) {
      expect(article.category.trim().length).toBeGreaterThan(0)
    }
  })

  it('should have categories that are recognizable topic names with at least 3 chars', () => {
    for (const article of articles) {
      expect(article.category.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('EN articles should have English category names', () => {
    const enCategories = Object.values(getArticlesByLocale('en')).map(
      (a) => a.category
    )
    const validEnCategories = [
      'Technology',
      'Economy',
      'Sports',
      'Education',
      'Health',
      'Science',
      'Culture',
      'Travel',
      'Business',
      'World',
    ]
    for (const cat of enCategories) {
      expect(validEnCategories).toContain(cat)
    }
  })
})

// ---------------------------------------------------------------------------
// Locale validation
// ---------------------------------------------------------------------------
describe('news article locale field', () => {
  it('every article should have a locale field', () => {
    for (const [slug, article] of entries) {
      expect(
        article.locale,
        `Article "${slug}" is missing locale field`
      ).toBeDefined()
    }
  })

  it('locale values should be "az", "en", "tr", or "ru"', () => {
    for (const article of articles) {
      expect(['az', 'en', 'tr', 'ru']).toContain(article.locale)
    }
  })
})

// ---------------------------------------------------------------------------
// Interface conformance
// ---------------------------------------------------------------------------
describe('NewsArticle interface conformance', () => {
  it('should have expected keys per article', () => {
    const expectedKeys = ['title', 'date', 'category', 'content', 'locale']
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
