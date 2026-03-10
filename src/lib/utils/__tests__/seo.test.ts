import { describe, it, expect } from 'vitest'
import {
  generateBaseMetadata,
  generateToolMetadata,
  generateToolJsonLd,
  generateToolFaqJsonLd,
  generateArticleMetadata,
  generateNewsArticleJsonLd,
  generateBlogPostMetadata,
  generateBlogArticleJsonLd,
} from '@/lib/utils/seo'
import type { Tool, ToolCategory } from '@/types/tool'

const SITE_URL = 'https://vaxtimyoxdu.com'
const SITE_NAME = 'Vaxtim Yoxdu'

/**
 * Factory to create a Tool object for testing with sensible defaults.
 */
function makeTool(overrides: Partial<Tool> = {}): Tool {
  return {
    slug: 'test-tool',
    name: 'Test Tool',
    description: 'A comprehensive test tool description that is long enough.',
    shortDescription: 'A short test description',
    category: 'dev',
    icon: 'T',
    isAI: false,
    isClientSide: true,
    keywords: ['test', 'tool', 'vitest'],
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// generateBaseMetadata
// ---------------------------------------------------------------------------
describe('generateBaseMetadata()', () => {
  const meta = generateBaseMetadata()

  it('should return a title containing the site name', () => {
    expect(meta.title).toContain(SITE_NAME)
  })

  it('should include a non-empty description', () => {
    expect(typeof meta.description).toBe('string')
    expect((meta.description as string).length).toBeGreaterThan(0)
  })

  it('should include keywords', () => {
    expect(typeof meta.keywords).toBe('string')
    expect((meta.keywords as string).length).toBeGreaterThan(0)
  })

  it('should set robots to allow indexing and following', () => {
    const robots = meta.robots as Record<string, unknown>
    expect(robots.index).toBe(true)
    expect(robots.follow).toBe(true)
  })

  it('should include google verification', () => {
    const verification = meta.verification as Record<string, string>
    expect(verification.google).toBeTruthy()
  })

  it('should set openGraph with correct site name and type', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.siteName).toBe(SITE_NAME)
    expect(og.type).toBe('website')
  })

  it('should set openGraph locale to az_AZ', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.locale).toBe('az_AZ')
  })

  it('should set openGraph url to the site root', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.url).toBe(SITE_URL)
  })

  it('should include openGraph images with correct dimensions', () => {
    const og = meta.openGraph as Record<string, unknown>
    const images = og.images as Array<Record<string, unknown>>
    expect(images).toHaveLength(1)
    expect(images[0].width).toBe(1200)
    expect(images[0].height).toBe(630)
  })

  it('should set openGraph image URL to dynamic OG endpoint', () => {
    const og = meta.openGraph as Record<string, unknown>
    const images = og.images as Array<Record<string, unknown>>
    expect(images[0].url).toContain(`${SITE_URL}/api/og`)
  })

  it('should set twitter card to summary_large_image', () => {
    const twitter = meta.twitter as Record<string, unknown>
    expect(twitter.card).toBe('summary_large_image')
  })

  it('should set twitter images to dynamic OG URL', () => {
    const twitter = meta.twitter as Record<string, unknown>
    const images = twitter.images as string[]
    expect(images[0]).toContain(`${SITE_URL}/api/og`)
  })

  it('should set canonical URL to site root', () => {
    const alternates = meta.alternates as Record<string, unknown>
    expect(alternates.canonical).toBe(SITE_URL)
  })
})

// ---------------------------------------------------------------------------
// generateToolMetadata
// ---------------------------------------------------------------------------
describe('generateToolMetadata()', () => {
  const tool = makeTool()
  const meta = generateToolMetadata(tool)

  it('should include tool name and site name in the title', () => {
    expect(meta.title).toContain(tool.name)
    expect(meta.title).toContain(SITE_NAME)
  })

  it('should use tool description as metadata description', () => {
    expect(meta.description).toBe(tool.description)
  })

  it('should join tool keywords with commas', () => {
    expect(meta.keywords).toBe(tool.keywords.join(', '))
  })

  it('should set openGraph url to the tool page', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.url).toBe(`${SITE_URL}/tools/${tool.slug}`)
  })

  it('should set openGraph locale to en_US for tools', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.locale).toBe('en_US')
  })

  it('should include dynamic OG image for the tool', () => {
    const og = meta.openGraph as Record<string, unknown>
    const images = og.images as Array<Record<string, unknown>>
    expect(images[0].url).toContain(`${SITE_URL}/api/og`)
    expect(images[0].url).toContain('type=tool')
  })

  it('should set canonical URL to the tool page', () => {
    const alternates = meta.alternates as Record<string, unknown>
    expect(alternates.canonical).toBe(`${SITE_URL}/tools/${tool.slug}`)
  })

  it('should set twitter card to summary_large_image', () => {
    const twitter = meta.twitter as Record<string, unknown>
    expect(twitter.card).toBe('summary_large_image')
  })

  it('should work correctly for an AI tool', () => {
    const aiTool = makeTool({ slug: 'ai-writer', name: 'AI Writer', category: 'ai', isAI: true, isClientSide: false })
    const aiMeta = generateToolMetadata(aiTool)
    expect(aiMeta.title).toContain('AI Writer')
    const og = aiMeta.openGraph as Record<string, unknown>
    expect(og.url).toBe(`${SITE_URL}/tools/ai-writer`)
  })
})

// ---------------------------------------------------------------------------
// generateToolJsonLd
// ---------------------------------------------------------------------------
describe('generateToolJsonLd()', () => {
  const tool = makeTool()
  const jsonLd = generateToolJsonLd(tool)

  it('should have @context set to schema.org', () => {
    expect(jsonLd['@context']).toBe('https://schema.org')
  })

  it('should have @type set to SoftwareApplication', () => {
    expect(jsonLd['@type']).toBe('SoftwareApplication')
  })

  it('should use the tool name', () => {
    expect(jsonLd.name).toBe(tool.name)
  })

  it('should use the tool description', () => {
    expect(jsonLd.description).toBe(tool.description)
  })

  it('should set the correct URL', () => {
    expect(jsonLd.url).toBe(`${SITE_URL}/tools/${tool.slug}`)
  })

  it('should set applicationCategory to UtilitiesApplication', () => {
    expect(jsonLd.applicationCategory).toBe('UtilitiesApplication')
  })

  it('should set operatingSystem to All', () => {
    expect(jsonLd.operatingSystem).toBe('All')
  })

  it('should include a free offer', () => {
    expect(jsonLd.offers['@type']).toBe('Offer')
    expect(jsonLd.offers.price).toBe('0')
    expect(jsonLd.offers.priceCurrency).toBe('USD')
  })

  it('should include creator with site name and URL', () => {
    expect(jsonLd.creator['@type']).toBe('Organization')
    expect(jsonLd.creator.name).toBe(SITE_NAME)
    expect(jsonLd.creator.url).toBe(SITE_URL)
  })
})

// ---------------------------------------------------------------------------
// generateToolFaqJsonLd
// ---------------------------------------------------------------------------
describe('generateToolFaqJsonLd()', () => {
  it('should produce FAQPage JSON-LD', () => {
    const tool = makeTool()
    const faqLd = generateToolFaqJsonLd(tool)
    expect(faqLd['@context']).toBe('https://schema.org')
    expect(faqLd['@type']).toBe('FAQPage')
  })

  it('should always produce exactly 3 FAQ entries', () => {
    const categories: ToolCategory[] = ['ai', 'pdf', 'image', 'dev', 'generators', 'text']
    for (const category of categories) {
      const tool = makeTool({
        category,
        isAI: category === 'ai',
        isClientSide: category !== 'ai',
      })
      const faqLd = generateToolFaqJsonLd(tool)
      expect(faqLd.mainEntity).toHaveLength(3)
    }
  })

  it('should have Question type for every mainEntity entry', () => {
    const tool = makeTool()
    const faqLd = generateToolFaqJsonLd(tool)
    for (const entry of faqLd.mainEntity) {
      expect(entry['@type']).toBe('Question')
      expect(typeof entry.name).toBe('string')
      expect(entry.name.length).toBeGreaterThan(0)
    }
  })

  it('should have Answer type for every acceptedAnswer', () => {
    const tool = makeTool()
    const faqLd = generateToolFaqJsonLd(tool)
    for (const entry of faqLd.mainEntity) {
      expect(entry.acceptedAnswer['@type']).toBe('Answer')
      expect(typeof entry.acceptedAnswer.text).toBe('string')
      expect(entry.acceptedAnswer.text.length).toBeGreaterThan(0)
    }
  })

  it('should include tool name in the first FAQ question', () => {
    const tool = makeTool({ name: 'SuperTool' })
    const faqLd = generateToolFaqJsonLd(tool)
    expect(faqLd.mainEntity[0].name).toContain('SuperTool')
  })

  it('should mention client-side safety for client-side tools', () => {
    const tool = makeTool({ isClientSide: true, isAI: false })
    const faqLd = generateToolFaqJsonLd(tool)
    const secondAnswer = faqLd.mainEntity[1].acceptedAnswer.text
    expect(secondAnswer).toContain('browser')
  })

  it('should mention AI for AI tools in the second FAQ', () => {
    const tool = makeTool({ isAI: true, isClientSide: false, category: 'ai' })
    const faqLd = generateToolFaqJsonLd(tool)
    const secondAnswer = faqLd.mainEntity[1].acceptedAnswer.text
    expect(secondAnswer.toLowerCase()).toContain('ai')
  })

  it('should mention free for non-AI non-client-side tools', () => {
    const tool = makeTool({ isAI: false, isClientSide: false, category: 'dev' })
    const faqLd = generateToolFaqJsonLd(tool)
    const secondAnswer = faqLd.mainEntity[1].acceptedAnswer.text
    expect(secondAnswer.toLowerCase()).toContain('free')
  })

  it('should produce category-specific third FAQ for pdf category', () => {
    const tool = makeTool({ category: 'pdf', isClientSide: true })
    const faqLd = generateToolFaqJsonLd(tool)
    expect(faqLd.mainEntity[2].name.toLowerCase()).toContain('format')
  })

  it('should produce category-specific third FAQ for image category', () => {
    const tool = makeTool({ category: 'image', isClientSide: true })
    const faqLd = generateToolFaqJsonLd(tool)
    expect(faqLd.mainEntity[2].name.toLowerCase()).toContain('image format')
  })
})

// ---------------------------------------------------------------------------
// generateArticleMetadata
// ---------------------------------------------------------------------------
describe('generateArticleMetadata()', () => {
  const articleParams = {
    title: 'Test Article Title',
    description: 'A short description for the test article used in metadata generation and testing.',
    slug: 'test-article-slug',
    date: '2026-03-01',
    category: 'Texnologiya',
  }
  const meta = generateArticleMetadata(articleParams)

  it('should include the article title and site name in metadata title', () => {
    expect(meta.title).toContain(articleParams.title)
    expect(meta.title).toContain(SITE_NAME)
  })

  it('should use the provided description', () => {
    expect(meta.description).toBe(articleParams.description)
  })

  it('should include category in keywords', () => {
    expect(meta.keywords).toContain(articleParams.category)
  })

  it('should set openGraph type to article', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.type).toBe('article')
  })

  it('should set openGraph locale to az_AZ for news articles', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.locale).toBe('az_AZ')
  })

  it('should set openGraph publishedTime to the article date', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.publishedTime).toBe(articleParams.date)
  })

  it('should set openGraph section to the category', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.section).toBe(articleParams.category)
  })

  it('should build the canonical URL under /info/', () => {
    const alternates = meta.alternates as Record<string, unknown>
    expect(alternates.canonical).toBe(`${SITE_URL}/info/${articleParams.slug}`)
  })

  it('should include dynamic OG image with type=news', () => {
    const og = meta.openGraph as Record<string, unknown>
    const images = og.images as Array<Record<string, unknown>>
    expect(images[0].url).toContain('type=news')
  })
})

// ---------------------------------------------------------------------------
// generateNewsArticleJsonLd
// ---------------------------------------------------------------------------
describe('generateNewsArticleJsonLd()', () => {
  const params = {
    title: 'News Headline',
    description: 'A news description for JSON-LD structured data generation in tests.',
    slug: 'news-slug',
    date: '2026-03-05',
    category: 'Elm',
  }
  const jsonLd = generateNewsArticleJsonLd(params)

  it('should have @context set to schema.org', () => {
    expect(jsonLd['@context']).toBe('https://schema.org')
  })

  it('should have @type set to NewsArticle', () => {
    expect(jsonLd['@type']).toBe('NewsArticle')
  })

  it('should use the headline from the title', () => {
    expect(jsonLd.headline).toBe(params.title)
  })

  it('should set the correct URL under /info/', () => {
    expect(jsonLd.url).toBe(`${SITE_URL}/info/${params.slug}`)
  })

  it('should set datePublished and dateModified to the article date', () => {
    expect(jsonLd.datePublished).toBe(params.date)
    expect(jsonLd.dateModified).toBe(params.date)
  })

  it('should set articleSection to the category', () => {
    expect(jsonLd.articleSection).toBe(params.category)
  })

  it('should set inLanguage to az', () => {
    expect(jsonLd.inLanguage).toBe('az')
  })

  it('should include publisher with logo', () => {
    expect(jsonLd.publisher['@type']).toBe('Organization')
    expect(jsonLd.publisher.name).toBe(SITE_NAME)
    expect(jsonLd.publisher.logo['@type']).toBe('ImageObject')
    expect(jsonLd.publisher.logo.url).toBe(`${SITE_URL}/logo.png`)
  })

  it('should include mainEntityOfPage matching the URL', () => {
    expect(jsonLd.mainEntityOfPage['@type']).toBe('WebPage')
    expect(jsonLd.mainEntityOfPage['@id']).toBe(`${SITE_URL}/info/${params.slug}`)
  })

  it('should include a dynamic OG image', () => {
    expect(jsonLd.image).toContain(`${SITE_URL}/api/og`)
  })
})

// ---------------------------------------------------------------------------
// generateBlogPostMetadata
// ---------------------------------------------------------------------------
describe('generateBlogPostMetadata()', () => {
  const blogParams = {
    title: 'Test Blog Post',
    description: 'A blog post description for testing the metadata generation utility function.',
    slug: 'test-blog-slug',
    date: '2026-03-02',
  }
  const meta = generateBlogPostMetadata(blogParams)

  it('should include the blog title and Blog suffix in metadata title', () => {
    expect(meta.title).toContain(blogParams.title)
    expect(meta.title).toContain('Blog')
  })

  it('should use the provided description', () => {
    expect(meta.description).toBe(blogParams.description)
  })

  it('should set openGraph type to article', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.type).toBe('article')
  })

  it('should set openGraph locale to en_US for blog posts', () => {
    const og = meta.openGraph as Record<string, unknown>
    expect(og.locale).toBe('en_US')
  })

  it('should set canonical URL under /blog/', () => {
    const alternates = meta.alternates as Record<string, unknown>
    expect(alternates.canonical).toBe(`${SITE_URL}/blog/${blogParams.slug}`)
  })

  it('should include dynamic OG image with type=blog', () => {
    const og = meta.openGraph as Record<string, unknown>
    const images = og.images as Array<Record<string, unknown>>
    expect(images[0].url).toContain('type=blog')
  })

  it('should include keywords derived from title words', () => {
    expect(meta.keywords).toContain('online tools')
  })
})

// ---------------------------------------------------------------------------
// generateBlogArticleJsonLd
// ---------------------------------------------------------------------------
describe('generateBlogArticleJsonLd()', () => {
  const params = {
    title: 'Blog JSON-LD Title',
    description: 'Blog description for JSON-LD generation testing purposes only for validation.',
    slug: 'blog-jsonld-slug',
    date: '2026-02-28',
  }
  const jsonLd = generateBlogArticleJsonLd(params)

  it('should have @context set to schema.org', () => {
    expect(jsonLd['@context']).toBe('https://schema.org')
  })

  it('should have @type set to Article', () => {
    expect(jsonLd['@type']).toBe('Article')
  })

  it('should use the headline from the title', () => {
    expect(jsonLd.headline).toBe(params.title)
  })

  it('should set the correct URL under /blog/', () => {
    expect(jsonLd.url).toBe(`${SITE_URL}/blog/${params.slug}`)
  })

  it('should set datePublished and dateModified', () => {
    expect(jsonLd.datePublished).toBe(params.date)
    expect(jsonLd.dateModified).toBe(params.date)
  })

  it('should set inLanguage to en', () => {
    expect(jsonLd.inLanguage).toBe('en')
  })

  it('should include publisher with logo', () => {
    expect(jsonLd.publisher['@type']).toBe('Organization')
    expect(jsonLd.publisher.name).toBe(SITE_NAME)
    expect(jsonLd.publisher.logo.url).toBe(`${SITE_URL}/logo.png`)
  })

  it('should include mainEntityOfPage matching the blog URL', () => {
    expect(jsonLd.mainEntityOfPage['@id']).toBe(`${SITE_URL}/blog/${params.slug}`)
  })

  it('should include a dynamic OG image', () => {
    expect(jsonLd.image).toContain(`${SITE_URL}/api/og`)
    expect(jsonLd.image).toContain('type=blog')
  })
})
