import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock next-intl useTranslations
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'nav.news': 'Xəbərlər',
      'nav.tools': 'Alətlər',
      'nav.blog': 'Blog',
      'nav.about': 'Haqqımızda',
      menu: 'Menyu',
    }
    return translations[key] ?? key
  },
}))

// Mock i18n navigation Link
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
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

describe('Header', () => {
  it('renders the logo with link to homepage', () => {
    render(<Header />)
    const logoLink = screen.getByRole('link', { name: /vaxtim yoxdu/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders desktop navigation links', () => {
    render(<Header />)
    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toBeInTheDocument()
    const links = nav.querySelectorAll('a')
    expect(links).toHaveLength(4)
    expect(links[0]).toHaveAttribute('href', '/info')
    expect(links[1]).toHaveAttribute('href', '/tools')
    expect(links[2]).toHaveAttribute('href', '/blog')
    expect(links[3]).toHaveAttribute('href', '/about')
  })

  it('renders ThemeToggle component', () => {
    render(<Header />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders LanguageSelector component', () => {
    render(<Header />)
    expect(screen.getByTestId('language-selector')).toBeInTheDocument()
  })

  it('does not have inline theme toggle logic', () => {
    render(<Header />)
    // Header should delegate theme to ThemeToggle, not have its own toggle
    const themeToggle = screen.getByTestId('theme-toggle')
    expect(themeToggle).toBeInTheDocument()
    // Ensure there's no second theme button (the old inline one)
    const buttons = screen.getAllByRole('button')
    const themeButtons = buttons.filter(b => b.getAttribute('aria-label')?.match(/dark|light|theme/i))
    expect(themeButtons).toHaveLength(1)
  })

  it('renders mobile menu button', () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Menyu')
    expect(menuButton).toBeInTheDocument()
  })

  it('mobile menu is hidden by default', () => {
    render(<Header />)
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const menuButton = screen.getByLabelText('Menyu')

    await user.click(menuButton)
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'false')
  })

  it('closes mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    // Open menu
    await user.click(screen.getByLabelText('Menyu'))

    // Click a mobile nav link
    const mobileLinks = screen.getByLabelText('Mobile navigation').querySelectorAll('a')
    await user.click(mobileLinks[0])

    // Menu should close
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav.closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('mobile nav links have tabIndex -1 when menu is closed', () => {
    render(<Header />)
    const mobileLinks = screen.getByLabelText('Mobile navigation').querySelectorAll('a')
    mobileLinks.forEach(link => {
      expect(link).toHaveAttribute('tabindex', '-1')
    })
  })

  it('mobile nav links have tabIndex 0 when menu is open', async () => {
    const user = userEvent.setup()
    render(<Header />)

    await user.click(screen.getByLabelText('Menyu'))

    const mobileLinks = screen.getByLabelText('Mobile navigation').querySelectorAll('a')
    mobileLinks.forEach(link => {
      expect(link).toHaveAttribute('tabindex', '0')
    })
  })

  it('header is sticky with correct classes', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header.className).toContain('sticky')
    expect(header.className).toContain('top-0')
  })

  it('menu button has aria-expanded attribute', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const menuButton = screen.getByLabelText('Menyu')

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })
})
