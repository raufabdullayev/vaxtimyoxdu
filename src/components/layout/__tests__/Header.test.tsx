import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock next-intl useTranslations
vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string) => {
    const translations: Record<string, string> = {
      'nav.news': 'Xəbərlər',
      'nav.tools': 'Alətlər',
      'nav.blog': 'Blog',
      'nav.about': 'Haqqımızda',
      'nav.viewAll': 'Hamısına bax',
      menu: 'Menyu',
      tools: 'Alətlər',
      viewAll: 'Hamısına bax',
      'categories.ai': 'AI',
      'categories.pdf': 'PDF',
      'categories.image': 'Şəkil',
      'categories.dev': 'Developer',
      'categories.generators': 'Generatorlar',
      'categories.text': 'Mətn',
      'tools.categories.ai': 'AI',
      'tools.categories.pdf': 'PDF',
      'tools.categories.image': 'Şəkil',
      'tools.categories.dev': 'Developer',
      'tools.categories.generators': 'Generatorlar',
      'tools.categories.text': 'Mətn',
      'common.nav.tools': 'Alətlər',
      'common.nav.viewAll': 'Hamısına bax',
    }
    const full = namespace ? `${namespace}.${key}` : key
    return translations[full] ?? translations[key] ?? key
  },
}))

// Mock next-intl/server getTranslations
vi.mock('next-intl/server', () => ({
  getTranslations: () => {
    const translations: Record<string, string> = {
      siteName: 'Vaxtim Yoxdu',
    }
    return Promise.resolve((key: string) => translations[key] ?? key)
  },
}))

// Mock i18n navigation Link + usePathname
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => '/',
}))

// Mock ThemeToggle
vi.mock('@/components/common/ThemeToggle', () => ({
  default: () => <button data-testid="theme-toggle" aria-label="Toggle theme">Theme</button>,
}))

// Mock LanguageSelector
vi.mock('../LanguageSelector', () => ({
  default: () => <div data-testid="language-selector">Lang</div>,
}))

import Header from '../Header'

// Helper to render async server component in tests
async function renderHeader() {
  const jsx = await Header()
  render(jsx)
}

describe('Header', () => {
  it('renders the logo with link to homepage', async () => {
    await renderHeader()
    const logoLink = screen.getByRole('link', { name: /vaxtim yoxdu/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders desktop navigation links', async () => {
    await renderHeader()
    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toBeInTheDocument()
    const links = nav.querySelectorAll('a')
    // MegaMenu trigger is now a Link to /tools with aria-haspopup; 4 direct links total
    expect(links).toHaveLength(4)
    const hrefs = Array.from(links).map(a => a.getAttribute('href'))
    expect(hrefs).toContain('/tools')
    expect(hrefs).toContain('/info')
    expect(hrefs).toContain('/blog')
    expect(hrefs).toContain('/about')
    // MegaMenu trigger is the Link with aria-haspopup="true"
    const megaMenuTrigger = nav.querySelector('a[aria-haspopup="true"]')
    expect(megaMenuTrigger).toBeInTheDocument()
    expect(megaMenuTrigger).toHaveAttribute('href', '/tools')
  })

  it('renders ThemeToggle component', async () => {
    await renderHeader()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders LanguageSelector component', async () => {
    await renderHeader()
    expect(screen.getByTestId('language-selector')).toBeInTheDocument()
  })

  it('does not have inline theme toggle logic', async () => {
    await renderHeader()
    // Header should delegate theme to ThemeToggle, not have its own toggle
    const themeToggle = screen.getByTestId('theme-toggle')
    expect(themeToggle).toBeInTheDocument()
    // Ensure there's no second theme button (the old inline one)
    const buttons = screen.getAllByRole('button')
    const themeButtons = buttons.filter(b => b.getAttribute('aria-label')?.match(/dark|light|theme/i))
    expect(themeButtons).toHaveLength(1)
  })

  it('renders mobile menu button', async () => {
    await renderHeader()
    const menuButton = screen.getByLabelText('Menyu')
    expect(menuButton).toBeInTheDocument()
  })

  it('mobile menu is hidden by default', async () => {
    await renderHeader()
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup()
    await renderHeader()
    const menuButton = screen.getByLabelText('Menyu')

    await user.click(menuButton)
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'false')
  })

  it('closes mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup()
    await renderHeader()

    // Open menu
    await user.click(screen.getByLabelText('Menyu'))

    // Click a mobile nav link
    const mobileLinks = screen.getByLabelText('Mobile navigation').querySelectorAll('a')
    await user.click(mobileLinks[0])

    // Menu should close
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('mobile top-level nav links have tabIndex -1 when menu is closed', async () => {
    await renderHeader()
    const mobileNav = screen.getByLabelText('Mobile navigation')
    const topLinks = Array.from(mobileNav.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || ''
      return ['/info', '/blog', '/about'].includes(href)
    })
    expect(topLinks.length).toBeGreaterThan(0)
    topLinks.forEach(link => {
      expect(link).toHaveAttribute('tabindex', '-1')
    })
  })

  it('mobile top-level nav links have tabIndex 0 when menu is open', async () => {
    const user = userEvent.setup()
    await renderHeader()

    await user.click(screen.getByLabelText('Menyu'))

    const mobileNav = screen.getByLabelText('Mobile navigation')
    const topLinks = Array.from(mobileNav.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || ''
      return ['/info', '/blog', '/about'].includes(href)
    })
    expect(topLinks.length).toBeGreaterThan(0)
    topLinks.forEach(link => {
      expect(link).toHaveAttribute('tabindex', '0')
    })
  })

  it('header is sticky with correct classes', async () => {
    await renderHeader()
    const header = screen.getByRole('banner')
    expect(header.className).toContain('sticky')
    expect(header.className).toContain('top-0')
  })

  it('menu button has aria-expanded attribute', async () => {
    const user = userEvent.setup()
    await renderHeader()
    const menuButton = screen.getByLabelText('Menyu')

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })
})
