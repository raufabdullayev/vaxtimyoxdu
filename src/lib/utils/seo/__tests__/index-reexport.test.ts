import { describe, it, expect } from 'vitest'

describe('seo/index re-exports', () => {
  it('exports SITE_URL and SITE_NAME', async () => {
    const mod = await import('../index')
    expect(mod.SITE_URL).toBeDefined()
    expect(typeof mod.SITE_URL).toBe('string')
    expect(mod.SITE_NAME).toBeDefined()
    expect(typeof mod.SITE_NAME).toBe('string')
  })

  it('exports URL utilities', async () => {
    const mod = await import('../index')
    expect(typeof mod.getLocalizedUrl).toBe('function')
    expect(typeof mod.generateHreflangAlternates).toBe('function')
  })

  it('exports OG utilities', async () => {
    const mod = await import('../index')
    expect(typeof mod.getOgLocale).toBe('function')
    expect(typeof mod.getOgImageUrl).toBe('function')
  })

  it('exports metadata generators', async () => {
    const mod = await import('../index')
    expect(typeof mod.generateBaseMetadata).toBe('function')
    expect(typeof mod.generateToolMetadata).toBe('function')
    expect(typeof mod.generateArticleMetadata).toBe('function')
    expect(typeof mod.generateBlogPostMetadata).toBe('function')
  })

  it('exports JSON-LD generators', async () => {
    const mod = await import('../index')
    expect(typeof mod.generateToolJsonLd).toBe('function')
    expect(typeof mod.generateToolHowToJsonLd).toBe('function')
    expect(typeof mod.generateToolFaqJsonLd).toBe('function')
    expect(typeof mod.generateNewsArticleJsonLd).toBe('function')
    expect(typeof mod.generateBlogArticleJsonLd).toBe('function')
  })
})
