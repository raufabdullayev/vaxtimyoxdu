import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next-intl/server
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
  setRequestLocale: vi.fn(),
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

// Mock seo utils
vi.mock('@/lib/utils/seo', () => ({
  generateHreflangAlternates: vi.fn(() => ({
    canonical: 'https://vaxtimyoxdu.com/about',
    languages: {},
  })),
  getOgLocale: vi.fn(() => 'en_US'),
  getOgImageUrl: vi.fn(() => 'https://vaxtimyoxdu.com/og.png'),
  SITE_NAME: 'Vaxtim Yoxdu',
  getLocalizedUrl: vi.fn(() => 'https://vaxtimyoxdu.com/'),
  generateBlogPostMetadata: vi.fn(() => ({ title: 'Test' })),
  generateBlogArticleJsonLd: vi.fn(() => ({})),
  generateArticleMetadata: vi.fn(() => ({ title: 'Test' })),
  generateNewsArticleJsonLd: vi.fn(() => ({})),
  generateToolsItemListJsonLd: vi.fn(() => ({})),
}))

// Mock i18n navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock layout components
vi.mock('@/components/layout/LazyAdBanner', () => ({
  default: () => <div data-testid="ad-banner" />,
}))
vi.mock('@/components/layout/NewsletterHomeSection', () => ({
  default: () => <div data-testid="newsletter-section" />,
}))
vi.mock('@/components/market/MarketTicker', () => ({
  default: () => <div data-testid="market-ticker" />,
}))
vi.mock('@/components/layout/Breadcrumb', () => ({
  default: ({
    items,
  }: {
    locale: string
    items: Array<{ label: string; href?: string }>
  }) => (
    <nav data-testid="breadcrumb">
      {items.map((item, i) => (
        <span key={i}>{item.label}</span>
      ))}
    </nav>
  ),
}))
vi.mock('@/components/tools/ToolCard', () => ({
  default: ({ tool }: { tool: { slug: string } }) => (
    <div data-testid={`tool-card-${tool.slug}`} />
  ),
}))

// Additional component mocks
vi.mock('@/components/layout/NewsletterInlineCTA', () => ({
  default: () => <div data-testid="newsletter-cta" />,
}))
vi.mock('@/components/common/ShareButtonsWrapper', () => ({
  default: () => <div data-testid="share-buttons" />,
}))
vi.mock('@/components/common/MarkdownRenderer', () => ({
  default: ({ content }: { content: string }) => (
    <div data-testid="markdown-renderer">{content.slice(0, 50)}</div>
  ),
}))
vi.mock('@/components/analytics/ScrollDepthTracker', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="scroll-depth-tracker">{children}</div>
  ),
}))
vi.mock('@/components/layout/RelatedArticles', () => ({
  default: () => <div data-testid="related-articles" />,
}))
vi.mock('@/components/layout/NewsRelatedTools', () => ({
  default: () => <div data-testid="news-related-tools" />,
}))
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NOT_FOUND')
  }),
  usePathname: () => '/test',
}))
vi.mock('lucide-react', () => ({
  Zap: () => <span data-testid="zap-icon" />,
  Newspaper: () => <span data-testid="newspaper-icon" />,
  Wrench: () => <span data-testid="wrench-icon" />,
  CheckCircle: () => <span data-testid="check-circle-icon" />,
  Shield: () => <span data-testid="shield-icon" />,
  Search: () => <span data-testid="search-icon" />,
  WifiOff: () => <span data-testid="wifi-off" />,
  RefreshCw: () => <span data-testid="refresh" />,
  Twitter: (props: Record<string, unknown>) => <svg {...props} />,
  MessageCircle: (props: Record<string, unknown>) => <svg {...props} />,
  Send: (props: Record<string, unknown>) => <svg {...props} />,
  Facebook: (props: Record<string, unknown>) => <svg {...props} />,
  Linkedin: (props: Record<string, unknown>) => <svg {...props} />,
  Link2: (props: Record<string, unknown>) => <svg {...props} />,
  Check: (props: Record<string, unknown>) => <svg {...props} />,
  Share2: (props: Record<string, unknown>) => <svg {...props} />,
}))

// Mock ToolOfTheDay and RecentlyUsedTools
vi.mock('@/components/tools/ToolOfTheDay', () => ({
  default: () => <div data-testid="tool-of-the-day" />,
}))
vi.mock('@/components/tools/RecentlyUsedTools', () => ({
  default: () => <div data-testid="recently-used-tools" />,
}))

// Mock data
vi.mock('@/data/blog-posts', () => ({
  getBlogPostsByLocale: vi.fn(() => ({
    'test-post': {
      title: 'Test Blog Post',
      date: '2025-01-01',
      content:
        'This is a test blog post content. It has enough characters to produce an excerpt.',
      category: 'Technology',
    },
  })),
  blogPosts: {
    'test-post': {
      title: 'Test Blog Post',
      date: '2025-01-01',
      content: 'Blog post content here for testing.',
      category: 'Technology',
    },
  },
  getBlogPostBySlug: vi.fn(
    () => ({
      title: 'Test Blog Post',
      date: '2025-01-01',
      content: 'Blog post content here for testing.',
      category: 'Technology',
    })
  ),
}))

vi.mock('@/data/news-articles', () => ({
  newsArticles: {
    'test-article': {
      title: 'Test News Article',
      date: '2025-01-15',
      content:
        'This is a test news article content. It has enough characters.',
      category: 'Technology',
      locale: 'en',
    },
  },
  getArticlesByLocale: vi.fn(() => ({
    'test-article': {
      title: 'Test News Article',
      date: '2025-01-15',
      content:
        'This is a test news article content. It has enough characters.',
      category: 'Technology',
      locale: 'en',
    },
  })),
}))

vi.mock('@/config/tools', () => ({
  tools: [
    {
      slug: 'json-formatter',
      category: 'dev',
      name: 'JSON Formatter',
      description: 'Format JSON',
    },
    {
      slug: 'word-counter',
      category: 'text',
      name: 'Word Counter',
      description: 'Count words',
    },
  ],
}))

vi.mock('@/types/tool', () => ({
  ToolCategory: {},
}))

const makeParams = (locale = 'en') =>
  Promise.resolve({ locale }) as Promise<{ locale: string }>

describe('AboutPage', () => {
  it('renders about page content', async () => {
    const { default: AboutPage } = await import(
      '@/app/[locale]/about/page'
    )
    const element = await AboutPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText(/motto/)).toBeInTheDocument()
  })

  it('renders contact email link', async () => {
    const { default: AboutPage } = await import(
      '@/app/[locale]/about/page'
    )
    const element = await AboutPage({ params: makeParams() })
    render(element)
    const link = screen.getByText('hello@vaxtimyoxdu.com')
    expect(link).toHaveAttribute('href', 'mailto:hello@vaxtimyoxdu.com')
  })
})

describe('PrivacyPage', () => {
  it('renders privacy page content', async () => {
    const { default: PrivacyPage } = await import(
      '@/app/[locale]/privacy/page'
    )
    const element = await PrivacyPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('lastUpdated')).toBeInTheDocument()
  })

  it('renders privacy contact email', async () => {
    const { default: PrivacyPage } = await import(
      '@/app/[locale]/privacy/page'
    )
    const element = await PrivacyPage({ params: makeParams() })
    render(element)
    const link = screen.getByText('privacy@vaxtimyoxdu.com')
    expect(link).toHaveAttribute(
      'href',
      'mailto:privacy@vaxtimyoxdu.com'
    )
  })
})

describe('TermsPage', () => {
  it('renders terms page content', async () => {
    const { default: TermsPage } = await import(
      '@/app/[locale]/terms/page'
    )
    const element = await TermsPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('lastUpdated')).toBeInTheDocument()
  })

  it('renders terms sections', async () => {
    const { default: TermsPage } = await import(
      '@/app/[locale]/terms/page'
    )
    const element = await TermsPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('acceptTitle')).toBeInTheDocument()
    expect(screen.getByText('disclaimerTitle')).toBeInTheDocument()
  })
})

describe('HomePage', () => {
  it('renders home page with hero section', async () => {
    const { default: HomePage } = await import(
      '@/app/[locale]/page'
    )
    const element = await HomePage({ params: makeParams() })
    render(element)
    expect(screen.getByText('heroTitle')).toBeInTheDocument()
    expect(screen.getByText('heroTitleHighlight')).toBeInTheDocument()
  })

  it('renders market ticker', async () => {
    const { default: HomePage } = await import(
      '@/app/[locale]/page'
    )
    const element = await HomePage({ params: makeParams() })
    render(element)
    expect(screen.getByTestId('market-ticker')).toBeInTheDocument()
  })

  it('renders newsletter section', async () => {
    const { default: HomePage } = await import(
      '@/app/[locale]/page'
    )
    const element = await HomePage({ params: makeParams() })
    render(element)
    expect(screen.getByTestId('newsletter-section')).toBeInTheDocument()
  })

  it('renders stats section', async () => {
    const { default: HomePage } = await import(
      '@/app/[locale]/page'
    )
    const element = await HomePage({ params: makeParams() })
    render(element)
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
  })

  it('renders info and tools links', async () => {
    const { default: HomePage } = await import(
      '@/app/[locale]/page'
    )
    const element = await HomePage({ params: makeParams() })
    render(element)
    expect(screen.getByText('newsTitle')).toBeInTheDocument()
    expect(screen.getByText('toolsTitle')).toBeInTheDocument()
  })
})

describe('BlogPage', () => {
  it('renders blog page with posts', async () => {
    const { default: BlogPage } = await import(
      '@/app/[locale]/blog/page'
    )
    const element = await BlogPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('renders breadcrumb', async () => {
    const { default: BlogPage } = await import(
      '@/app/[locale]/blog/page'
    )
    const element = await BlogPage({ params: makeParams() })
    render(element)
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
  })
})

describe('ToolsPage', () => {
  it('renders tools page with tool cards', async () => {
    const { default: ToolsPage } = await import(
      '@/app/[locale]/tools/page'
    )
    const element = await ToolsPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('pageTitle')).toBeInTheDocument()
    expect(
      screen.getByTestId('tool-card-json-formatter')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('tool-card-word-counter')
    ).toBeInTheDocument()
  })

  it('renders breadcrumb on tools page', async () => {
    const { default: ToolsPage } = await import(
      '@/app/[locale]/tools/page'
    )
    const element = await ToolsPage({ params: makeParams() })
    render(element)
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
  })
})

describe('InfoPage', () => {
  it('renders info page with articles', async () => {
    const { default: InfoPage } = await import(
      '@/app/[locale]/info/page'
    )
    const element = await InfoPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('Test News Article')).toBeInTheDocument()
  })

  it('renders breadcrumb on info page', async () => {
    const { default: InfoPage } = await import(
      '@/app/[locale]/info/page'
    )
    const element = await InfoPage({ params: makeParams() })
    render(element)
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
  })

  it('renders category badge', async () => {
    const { default: InfoPage } = await import(
      '@/app/[locale]/info/page'
    )
    const element = await InfoPage({ params: makeParams() })
    render(element)
    expect(screen.getByText('Technology')).toBeInTheDocument()
  })
})

describe('InfoSlugPage', () => {
  it('renders article detail page', async () => {
    const { default: ArticlePage } = await import(
      '@/app/[locale]/info/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'test-article', locale: 'en' })
    const element = await ArticlePage({ params })
    render(element)
    // Title appears in breadcrumb and h1
    expect(screen.getAllByText('Test News Article').length).toBeGreaterThanOrEqual(1)
  })

  it('renders markdown content', async () => {
    const { default: ArticlePage } = await import(
      '@/app/[locale]/info/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'test-article', locale: 'en' })
    const element = await ArticlePage({ params })
    render(element)
    expect(screen.getByTestId('markdown-renderer')).toBeInTheDocument()
  })

  it('renders share buttons', async () => {
    const { default: ArticlePage } = await import(
      '@/app/[locale]/info/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'test-article', locale: 'en' })
    const element = await ArticlePage({ params })
    render(element)
    expect(screen.getByTestId('share-buttons')).toBeInTheDocument()
  })

  it('calls notFound for non-existent article', async () => {
    const { default: ArticlePage } = await import(
      '@/app/[locale]/info/[slug]/page'
    )
    const params = Promise.resolve({
      slug: 'does-not-exist',
      locale: 'en',
    })
    await expect(ArticlePage({ params })).rejects.toThrow('NOT_FOUND')
  })
})

describe('BlogSlugPage', () => {
  it('renders blog post detail page', async () => {
    const { default: BlogPost } = await import(
      '@/app/[locale]/blog/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'test-post', locale: 'en' })
    const element = await BlogPost({ params })
    render(element)
    // Title appears in breadcrumb and h1
    expect(screen.getAllByText('Test Blog Post').length).toBeGreaterThanOrEqual(1)
  })

  it('renders markdown content for blog post', async () => {
    const { default: BlogPost } = await import(
      '@/app/[locale]/blog/[slug]/page'
    )
    const params = Promise.resolve({ slug: 'test-post', locale: 'en' })
    const element = await BlogPost({ params })
    render(element)
    expect(screen.getByTestId('markdown-renderer')).toBeInTheDocument()
  })
})

describe('OfflinePage', () => {
  it('renders offline page', async () => {
    const { default: OfflinePage } = await import(
      '@/app/[locale]/offline/page'
    )
    render(<OfflinePage />)
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
  })

  it('renders retry button', async () => {
    const { default: OfflinePage } = await import(
      '@/app/[locale]/offline/page'
    )
    render(<OfflinePage />)
    expect(screen.getByText('retry')).toBeInTheDocument()
  })
})
