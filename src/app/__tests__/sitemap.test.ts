import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import { tools } from '@/config/tools'
import { newsArticles } from '@/data/news-articles'
import { blogPosts } from '@/data/blog-posts'

const BASE_URL = 'https://vaxtimyoxdu.com'
const LOCALES = ['az', 'en', 'tr', 'ru']
const LOCALE_COUNT = LOCALES.length
const entries = sitemap()

// Calculate expected counts accounting for locale-gated news articles
const newsWithLocale = Object.values(newsArticles).filter(a => a.locale).length
const newsWithoutLocale = Object.keys(newsArticles).length - newsWithLocale
const expectedNewsEntries = newsWithLocale + newsWithoutLocale * LOCALE_COUNT

// ---------------------------------------------------------------------------
// General structure
// ---------------------------------------------------------------------------
describe('sitemap() general structure', () => {
  it('should return a non-empty array', () => {
    expect(Array.isArray(entries)).toBe(true)
    expect(entries.length).toBeGreaterThan(0)
  })

  it('should include locale variants for all tools, news, blog, and static pages', () => {
    const staticPages = 7 // /, /info, /tools, /blog, /about, /privacy, /terms
    // News articles with a locale field get 1 entry each (not 4)
    const expectedCount =
      (staticPages + tools.length + Object.keys(blogPosts).length) * LOCALE_COUNT +
      expectedNewsEntries
    expect(entries.length).toBe(expectedCount)
  })

  it('should have a url property on every entry', () => {
    for (const entry of entries) {
      expect(typeof entry.url).toBe('string')
      expect(entry.url.length).toBeGreaterThan(0)
    }
  })

  it('should have all URLs starting with the base domain', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(new RegExp(`^${BASE_URL}`))
    }
  })

  it('should have a lastModified date on every entry', () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeDefined()
      expect(entry.lastModified instanceof Date).toBe(true)
    }
  })

  it('should have a changeFrequency on every entry', () => {
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    for (const entry of entries) {
      expect(validFrequencies).toContain(entry.changeFrequency)
    }
  })

  it('should have a priority between 0 and 1 on every entry', () => {
    for (const entry of entries) {
      expect(entry.priority).toBeGreaterThanOrEqual(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
    }
  })

  it('should have alternates with hreflang on every entry', () => {
    for (const entry of entries) {
      const alt = entry as { alternates?: { languages?: Record<string, string> } }
      expect(alt.alternates).toBeDefined()
      expect(alt.alternates!.languages).toBeDefined()
      // At minimum, x-default should always be present
      expect(alt.alternates!.languages!['x-default']).toBeDefined()
    }
  })
})

// ---------------------------------------------------------------------------
// Static pages (default locale = az, no prefix)
// ---------------------------------------------------------------------------
describe('sitemap() static pages', () => {
  it('should include the root page for default locale with priority 1', () => {
    const root = entries.find((e) => e.url === BASE_URL + '/')
    expect(root).toBeDefined()
    expect(root!.priority).toBe(1)
  })

  it('should include root page for all locales', () => {
    // az: vaxtimyoxdu.com/, en: vaxtimyoxdu.com/en/, etc.
    const azRoot = entries.find((e) => e.url === `${BASE_URL}/`)
    const enRoot = entries.find((e) => e.url === `${BASE_URL}/en/`)
    expect(azRoot).toBeDefined()
    expect(enRoot).toBeDefined()
  })

  it('should include the /info page', () => {
    const info = entries.find((e) => e.url === `${BASE_URL}/info`)
    expect(info).toBeDefined()
    expect(info!.priority).toBe(0.9)
  })

  it('should include the /tools page', () => {
    const toolsPage = entries.find((e) => e.url === `${BASE_URL}/tools`)
    expect(toolsPage).toBeDefined()
    expect(toolsPage!.priority).toBe(0.9)
  })

  it('should include the /blog page', () => {
    const blog = entries.find((e) => e.url === `${BASE_URL}/blog`)
    expect(blog).toBeDefined()
    expect(blog!.priority).toBe(0.7)
  })

  it('should include the /about page', () => {
    const about = entries.find((e) => e.url === `${BASE_URL}/about`)
    expect(about).toBeDefined()
    expect(about!.priority).toBe(0.3)
  })

  it('should include the /privacy page', () => {
    const privacy = entries.find((e) => e.url === `${BASE_URL}/privacy`)
    expect(privacy).toBeDefined()
    expect(privacy!.priority).toBe(0.2)
  })

  it('should include the /terms page', () => {
    const terms = entries.find((e) => e.url === `${BASE_URL}/terms`)
    expect(terms).toBeDefined()
    expect(terms!.priority).toBe(0.2)
  })
})

// ---------------------------------------------------------------------------
// Tool pages
// ---------------------------------------------------------------------------
describe('sitemap() tool pages', () => {
  it('should include an entry for every tool in default locale', () => {
    for (const tool of tools) {
      const entry = entries.find((e) => e.url === `${BASE_URL}/tools/${tool.slug}`)
      expect(entry, `Missing sitemap entry for tool "${tool.slug}"`).toBeDefined()
    }
  })

  it('should include locale variants for every tool', () => {
    for (const tool of tools) {
      const toolEntries = entries.filter((e) => e.url.endsWith(`/tools/${tool.slug}`))
      expect(toolEntries.length).toBe(LOCALE_COUNT)
    }
  })

  it('should set tool page priority to 0.8', () => {
    for (const tool of tools) {
      const entry = entries.find((e) => e.url === `${BASE_URL}/tools/${tool.slug}`)
      expect(entry!.priority).toBe(0.8)
    }
  })

  it('should set tool pages to weekly change frequency', () => {
    for (const tool of tools) {
      const entry = entries.find((e) => e.url === `${BASE_URL}/tools/${tool.slug}`)
      expect(entry!.changeFrequency).toBe('weekly')
    }
  })
})

// ---------------------------------------------------------------------------
// News article pages
// ---------------------------------------------------------------------------
describe('sitemap() news article pages', () => {
  // Helper: locale-gated articles use their locale prefix (az = no prefix, en = /en/)
  function newsUrl(slug: string, locale?: string): string {
    if (!locale || locale === 'az') return `${BASE_URL}/info/${slug}`
    return `${BASE_URL}/${locale}/info/${slug}`
  }

  it('should include an entry for every news article in its locale', () => {
    for (const [slug, article] of Object.entries(newsArticles)) {
      const url = newsUrl(slug, article.locale)
      const entry = entries.find((e) => e.url === url)
      expect(entry, `Missing sitemap entry for news article "${slug}" at ${url}`).toBeDefined()
    }
  })

  it('should set news article priority to 0.7', () => {
    for (const [slug, article] of Object.entries(newsArticles)) {
      const url = newsUrl(slug, article.locale)
      const entry = entries.find((e) => e.url === url)
      expect(entry!.priority).toBe(0.7)
    }
  })

  it('should set news articles to daily change frequency', () => {
    for (const [slug, article] of Object.entries(newsArticles)) {
      const url = newsUrl(slug, article.locale)
      const entry = entries.find((e) => e.url === url)
      expect(entry!.changeFrequency).toBe('daily')
    }
  })

  it('should set lastModified from the article date', () => {
    for (const [slug, article] of Object.entries(newsArticles)) {
      const url = newsUrl(slug, article.locale)
      const entry = entries.find((e) => e.url === url)
      const expected = new Date(article.date).toISOString()
      expect((entry!.lastModified as Date).toISOString()).toBe(expected)
    }
  })
})

// ---------------------------------------------------------------------------
// Blog post pages
// ---------------------------------------------------------------------------
describe('sitemap() blog post pages', () => {
  const blogSlugsList = Object.keys(blogPosts)

  it('should include an entry for every blog post in default locale', () => {
    for (const slug of blogSlugsList) {
      const entry = entries.find((e) => e.url === `${BASE_URL}/blog/${slug}`)
      expect(entry, `Missing sitemap entry for blog post "${slug}"`).toBeDefined()
    }
  })

  it('should set blog post priority to 0.6', () => {
    for (const slug of blogSlugsList) {
      const entry = entries.find((e) => e.url === `${BASE_URL}/blog/${slug}`)
      expect(entry!.priority).toBe(0.6)
    }
  })

  it('should set blog posts to weekly change frequency', () => {
    for (const slug of blogSlugsList) {
      const entry = entries.find((e) => e.url === `${BASE_URL}/blog/${slug}`)
      expect(entry!.changeFrequency).toBe('weekly')
    }
  })

  it('should set lastModified from the post date', () => {
    for (const [slug, post] of Object.entries(blogPosts)) {
      const entry = entries.find((e) => e.url === `${BASE_URL}/blog/${slug}`)
      const expected = new Date(post.date).toISOString()
      expect((entry!.lastModified as Date).toISOString()).toBe(expected)
    }
  })
})

// ---------------------------------------------------------------------------
// No duplicate URLs
// ---------------------------------------------------------------------------
describe('sitemap() URL uniqueness', () => {
  it('should have no duplicate URLs', () => {
    const urls = entries.map((e) => e.url)
    const unique = new Set(urls)
    expect(unique.size).toBe(urls.length)
  })
})
