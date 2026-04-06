import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

// Mock next/dynamic to just render the component directly
vi.mock('next/dynamic', () => ({
  default: (loader: () => Promise<{ default: React.ComponentType }>) => {
    const LazyComponent = (props: Record<string, unknown>) => {
      return null // dynamic components render null in test
    }
    return LazyComponent
  },
}))

// Mock i18n navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [k: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock hooks
vi.mock('@/hooks/useNewsletterSubscribe', () => ({
  useNewsletterSubscribe: () => ({
    email: '',
    setEmail: vi.fn(),
    error: '',
    status: 'idle',
    handleSubmit: vi.fn((e: { preventDefault: () => void }) => { e.preventDefault() }),
    isAlreadySubscribed: false,
  }),
  isSubscribed: () => false,
}))

// Mock useMarketPrices
vi.mock('@/hooks/useMarketPrices', () => ({
  useMarketPrices: () => ({
    prices: [
      { symbol: 'BTC', price: 50000, change24h: 2.5 },
      { symbol: 'ETH', price: 3000, change24h: -1.2 },
    ],
    isLoading: false,
    error: null,
  }),
}))

// Mock cross-links
vi.mock('@/lib/utils/cross-links', () => ({
  getToolsForNewsCategory: () => [
    { slug: 'json-formatter', name: 'JSON Formatter', icon: '{}', shortDescription: 'Format JSON' },
    { slug: 'base64-codec', name: 'Base64', icon: '64', shortDescription: 'Encode/decode' },
  ],
}))

describe('ClientShell', () => {
  it('renders without crashing', async () => {
    const { default: ClientShell } = await import('../../layout/ClientShell')
    const { container } = render(<ClientShell />)
    expect(container).toBeTruthy()
  })
})

describe('MarketTicker', () => {
  it('renders market prices', async () => {
    const { default: MarketTicker } = await import('../../market/MarketTicker')
    render(<MarketTicker />)
    expect(screen.getByText('BTC')).toBeInTheDocument()
    expect(screen.getByText('ETH')).toBeInTheDocument()
  })

  it('shows positive change with up arrow', async () => {
    const { default: MarketTicker } = await import('../../market/MarketTicker')
    render(<MarketTicker />)
    expect(screen.getByText(/\+2\.50%/)).toBeInTheDocument()
  })

  it('shows negative change with down arrow', async () => {
    const { default: MarketTicker } = await import('../../market/MarketTicker')
    render(<MarketTicker />)
    expect(screen.getByText(/-1\.20%/)).toBeInTheDocument()
  })

  it('renders View all link', async () => {
    const { default: MarketTicker } = await import('../../market/MarketTicker')
    render(<MarketTicker />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/tools/market-tracker')
  })
})

describe('MarketTicker - loading state', () => {
  it('shows skeleton when loading with no prices', async () => {
    vi.doMock('@/hooks/useMarketPrices', () => ({
      useMarketPrices: () => ({
        prices: [],
        isLoading: true,
        error: null,
      }),
    }))
    vi.resetModules()
    // Re-mock the other dependencies
    vi.doMock('next-intl', () => ({
      useTranslations: () => (key: string) => key,
      useLocale: () => 'en',
    }))
    vi.doMock('@/i18n/navigation', () => ({
      Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [k: string]: unknown }) => (
        <a href={href} {...props}>{children}</a>
      ),
    }))
    const { default: MarketTicker } = await import('../../market/MarketTicker')
    const { container } = render(<MarketTicker />)
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)
  })
})

describe('MarketTicker - error with no prices', () => {
  it('returns null when error and no prices', async () => {
    vi.doMock('@/hooks/useMarketPrices', () => ({
      useMarketPrices: () => ({
        prices: [],
        isLoading: false,
        error: new Error('API down'),
      }),
    }))
    vi.resetModules()
    vi.doMock('next-intl', () => ({
      useTranslations: () => (key: string) => key,
      useLocale: () => 'en',
    }))
    vi.doMock('@/i18n/navigation', () => ({
      Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [k: string]: unknown }) => (
        <a href={href} {...props}>{children}</a>
      ),
    }))
    const { default: MarketTicker } = await import('../../market/MarketTicker')
    const { container } = render(<MarketTicker />)
    expect(container.innerHTML).toBe('')
  })
})

describe('RelatedArticles', () => {
  it('renders related article links', async () => {
    const { default: RelatedArticles } = await import('../../layout/RelatedArticles')
    render(
      <RelatedArticles
        items={[
          { slug: 'test-article', title: 'Test Article', category: 'Tech', date: '2024-01-01' },
          { slug: 'second', title: 'Second', category: 'News', date: '2024-01-02' },
        ]}
      />
    )
    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Tech')).toBeInTheDocument()
  })

  it('renders with custom title', async () => {
    const { default: RelatedArticles } = await import('../../layout/RelatedArticles')
    render(
      <RelatedArticles
        items={[{ slug: 'a', title: 'A', category: 'B', date: '2024-01-01' }]}
        title="Related News"
      />
    )
    expect(screen.getByText('Related News')).toBeInTheDocument()
  })

  it('returns null for empty items', async () => {
    const { default: RelatedArticles } = await import('../../layout/RelatedArticles')
    const { container } = render(<RelatedArticles items={[]} />)
    expect(container.innerHTML).toBe('')
  })
})

describe('NewsRelatedTools', () => {
  it('renders related tools for a category', async () => {
    const { default: NewsRelatedTools } = await import('../../layout/NewsRelatedTools')
    render(<NewsRelatedTools category="technology" />)
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
    expect(screen.getByText('Base64')).toBeInTheDocument()
  })

  it('renders with custom title', async () => {
    const { default: NewsRelatedTools } = await import('../../layout/NewsRelatedTools')
    render(<NewsRelatedTools category="technology" title="Helpful Tools" />)
    expect(screen.getByText('Helpful Tools')).toBeInTheDocument()
  })
})

describe('NewsletterHomeSection', () => {
  it('renders newsletter form', async () => {
    const { default: NewsletterHomeSection } = await import('../../layout/NewsletterHomeSection')
    render(<NewsletterHomeSection />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('subscribe')).toBeInTheDocument()
  })

  it('shows bullet points', async () => {
    const { default: NewsletterHomeSection } = await import('../../layout/NewsletterHomeSection')
    render(<NewsletterHomeSection />)
    expect(screen.getByText('bullet1')).toBeInTheDocument()
    expect(screen.getByText('bullet2')).toBeInTheDocument()
    expect(screen.getByText('bullet3')).toBeInTheDocument()
  })
})

describe('NewsletterInlineCTA', () => {
  it('renders blog variant', async () => {
    const { default: NewsletterInlineCTA } = await import('../../layout/NewsletterInlineCTA')
    render(<NewsletterInlineCTA variant="blog" />)
    expect(screen.getByText('blogTitle')).toBeInTheDocument()
    expect(screen.getByText('blogDescription')).toBeInTheDocument()
  })

  it('renders news variant', async () => {
    const { default: NewsletterInlineCTA } = await import('../../layout/NewsletterInlineCTA')
    render(<NewsletterInlineCTA variant="news" />)
    expect(screen.getByText('newsTitle')).toBeInTheDocument()
  })
})

describe('AdBanner', () => {
  it('renders placeholder in non-production', async () => {
    const { default: AdBanner } = await import('../../layout/AdBanner')
    render(<AdBanner slot="1234567890" />)
    expect(screen.getByText(/Ad Placeholder/)).toBeInTheDocument()
  })

  it('renders different format placeholders', async () => {
    const { default: AdBanner } = await import('../../layout/AdBanner')
    const { container } = render(<AdBanner slot="123" format="sidebar" />)
    expect(screen.getByText('Ad Placeholder (sidebar)')).toBeInTheDocument()
  })

  it('renders in-article format', async () => {
    const { default: AdBanner } = await import('../../layout/AdBanner')
    render(<AdBanner slot="123" format="in-article" />)
    expect(screen.getByText('Ad Placeholder (in-article)')).toBeInTheDocument()
  })

  it('has correct data attributes', async () => {
    const { default: AdBanner } = await import('../../layout/AdBanner')
    const { container } = render(<AdBanner slot="test-slot" format="banner" />)
    const el = container.querySelector('[data-ad-slot="test-slot"]')
    expect(el).toBeInTheDocument()
  })
})

describe('ServiceWorkerRegistrar', () => {
  it('renders nothing visible', async () => {
    const { default: ServiceWorkerRegistrar } = await import('../../layout/ServiceWorkerRegistrar')
    const { container } = render(<ServiceWorkerRegistrar />)
    expect(container.innerHTML).toBe('')
  })
})
