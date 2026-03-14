import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next-intl/server (async server component)
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      footer: {
        description: 'Save your time with quick news summaries and free online tools.',
        followUs: 'Follow Us',
        popularToolsSection: 'Popular Tools',
        categoriesSection: 'Categories',
        sectionsTitle: 'Sections',
        legalTitle: 'Legal',
        copyright: 'All rights reserved.',
      },
      'common.nav': {
        news: 'News',
        tools: 'Tools',
        blog: 'Blog',
        about: 'About',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      tools: {},
    }
    const ns = translations[namespace] ?? {}
    return Promise.resolve((key: string) => ns[key] ?? key)
  }),
}))

// Mock next-intl (for Newsletter child component)
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'az',
}))

// Mock @/i18n/navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock @/lib/utils/cross-links
vi.mock('@/lib/utils/cross-links', () => ({
  popularToolSlugs: [
    'ai-text-rewriter',
    'json-formatter',
    'image-compress',
    'pdf-merge',
    'qr-code-generator',
    'password-generator',
    'color-picker',
    'word-counter',
  ],
}))

// Mock @/config/tools
vi.mock('@/config/tools', () => ({
  categories: {
    ai: { name: 'AI Tools', description: 'AI-powered tools' },
    pdf: { name: 'PDF Tools', description: 'PDF tools' },
    image: { name: 'Image Tools', description: 'Image tools' },
    dev: { name: 'Developer Tools', description: 'Dev tools' },
    generators: { name: 'Generators', description: 'Generator tools' },
    text: { name: 'Text Tools', description: 'Text tools' },
  },
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Github: (props: Record<string, unknown>) => <svg data-testid="icon-github" {...props} />,
  Twitter: (props: Record<string, unknown>) => <svg data-testid="icon-twitter" {...props} />,
  Instagram: (props: Record<string, unknown>) => <svg data-testid="icon-instagram" {...props} />,
  Linkedin: (props: Record<string, unknown>) => <svg data-testid="icon-linkedin" {...props} />,
  Mail: (props: Record<string, unknown>) => <svg data-testid="icon-mail" {...props} />,
  Loader2: (props: Record<string, unknown>) => <svg data-testid="icon-loader" {...props} />,
}))

// Mock Newsletter component to avoid deep dependency
vi.mock('../Newsletter', () => ({
  default: () => <div data-testid="newsletter-component">Newsletter</div>,
}))

import Footer from '../Footer'

describe('Footer', () => {
  async function renderFooter() {
    const Component = await Footer()
    return render(Component)
  }

  it('renders the brand name', async () => {
    await renderFooter()
    expect(screen.getByText('Vaxtim Yoxdu')).toBeInTheDocument()
  })

  it('renders the footer description', async () => {
    await renderFooter()
    expect(screen.getByText('Save your time with quick news summaries and free online tools.')).toBeInTheDocument()
  })

  it('renders social media links', async () => {
    await renderFooter()

    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/vaxtimyoxdu')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
  })

  it('renders all four social media icons', async () => {
    await renderFooter()
    expect(screen.getByTestId('icon-github')).toBeInTheDocument()
    expect(screen.getByTestId('icon-twitter')).toBeInTheDocument()
    expect(screen.getByTestId('icon-instagram')).toBeInTheDocument()
    expect(screen.getByTestId('icon-linkedin')).toBeInTheDocument()
  })

  it('renders "Follow Us" text', async () => {
    await renderFooter()
    expect(screen.getByText('Follow Us')).toBeInTheDocument()
  })

  it('renders Popular Tools section', async () => {
    await renderFooter()
    expect(screen.getByText('Popular Tools')).toBeInTheDocument()
  })

  it('renders popular tool links', async () => {
    await renderFooter()
    // Tools should render with slug-based English fallback names
    const toolLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href')?.startsWith('/tools/')
    )
    expect(toolLinks.length).toBe(8) // footerPopularToolSlugs.slice(0, 8)
  })

  it('renders Categories section', async () => {
    await renderFooter()
    expect(screen.getByText('Categories')).toBeInTheDocument()
  })

  it('renders all six category names', async () => {
    await renderFooter()
    // Category names from mock (fallback English names)
    expect(screen.getByText('AI Tools')).toBeInTheDocument()
    expect(screen.getByText('PDF Tools')).toBeInTheDocument()
    expect(screen.getByText('Image Tools')).toBeInTheDocument()
    expect(screen.getByText('Developer Tools')).toBeInTheDocument()
    expect(screen.getByText('Generators')).toBeInTheDocument()
    expect(screen.getByText('Text Tools')).toBeInTheDocument()
  })

  it('renders Sections column with navigation links', async () => {
    await renderFooter()
    expect(screen.getByText('Sections')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
    // 'Tools' appears multiple times (section header + nav link + popular tools section), find at least one
    const toolsLinks = screen.getAllByText('Tools')
    expect(toolsLinks.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders Legal column', async () => {
    await renderFooter()
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByText('Privacy')).toBeInTheDocument()
    expect(screen.getByText('Terms')).toBeInTheDocument()
  })

  it('renders Newsletter component', async () => {
    await renderFooter()
    expect(screen.getByTestId('newsletter-component')).toBeInTheDocument()
  })

  it('renders copyright with current year', async () => {
    await renderFooter()
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(`${year}.*Vaxtim Yoxdu`))).toBeInTheDocument()
  })

  it('renders copyright notice', async () => {
    await renderFooter()
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument()
  })

  it('has proper footer landmark element', async () => {
    await renderFooter()
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders section navigation links with correct hrefs', async () => {
    await renderFooter()
    const newsLink = screen.getByText('News').closest('a')
    expect(newsLink).toHaveAttribute('href', '/info')

    const blogLink = screen.getByText('Blog').closest('a')
    expect(blogLink).toHaveAttribute('href', '/blog')

    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('renders privacy and terms links with correct hrefs', async () => {
    await renderFooter()
    const privacyLink = screen.getByText('Privacy').closest('a')
    expect(privacyLink).toHaveAttribute('href', '/privacy')

    const termsLink = screen.getByText('Terms').closest('a')
    expect(termsLink).toHaveAttribute('href', '/terms')
  })
})
