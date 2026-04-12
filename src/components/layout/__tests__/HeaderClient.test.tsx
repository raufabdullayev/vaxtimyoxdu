import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

let mockPathname = '/'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => mockPathname,
}))

vi.mock('@/components/layout/LanguageSelector', () => ({
  default: () => <div data-testid="language-selector" />,
}))

vi.mock('@/components/common/ThemeToggle', () => ({
  default: () => <button data-testid="theme-toggle">Theme</button>,
}))

vi.mock('@/components/layout/MegaMenu', () => ({
  default: () => <div data-testid="mega-menu">MegaMenu</div>,
}))

vi.mock('@/components/layout/MobileToolsAccordion', () => ({
  default: ({ onNavigate }: { onNavigate?: () => void }) => (
    <div data-testid="mobile-tools-accordion" onClick={onNavigate}>MobileAccordion</div>
  ),
}))

import HeaderClient from '../HeaderClient'

describe('HeaderClient', () => {
  beforeEach(() => {
    mockPathname = '/'
  })

  it('renders children', () => {
    render(<HeaderClient><span data-testid="child">Logo</span></HeaderClient>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<HeaderClient />)

    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toBeInTheDocument()
    // Desktop nav has the 3 links (news, blog, about) + MegaMenu
    const desktopLinks = nav.querySelectorAll('a')
    expect(desktopLinks.length).toBeGreaterThanOrEqual(3)
    expect(screen.getAllByText('nav.news').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('nav.blog').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('nav.about').length).toBeGreaterThanOrEqual(1)
  })

  it('renders MegaMenu in desktop nav', () => {
    render(<HeaderClient />)
    expect(screen.getByTestId('mega-menu')).toBeInTheDocument()
  })

  it('renders LanguageSelector and ThemeToggle', () => {
    render(<HeaderClient />)
    expect(screen.getByTestId('language-selector')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders mobile menu toggle button', () => {
    render(<HeaderClient />)
    const button = screen.getByLabelText('menu')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles mobile menu on button click', () => {
    render(<HeaderClient />)
    const button = screen.getByLabelText('menu')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    const mobileMenu = document.getElementById('mobile-menu')
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false')
  })

  it('closes mobile menu on second click', () => {
    render(<HeaderClient />)
    const button = screen.getByLabelText('menu')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('highlights active nav link for /info', () => {
    mockPathname = '/info'
    render(<HeaderClient />)

    const nav = screen.getByLabelText('Main navigation')
    const infoLink = nav.querySelector('a[href="/info"]')
    expect(infoLink?.className).toContain('text-primary')
    expect(infoLink).toHaveAttribute('aria-current', 'page')
  })

  it('highlights active nav link for /blog', () => {
    mockPathname = '/blog'
    render(<HeaderClient />)

    const nav = screen.getByLabelText('Main navigation')
    const blogLink = nav.querySelector('a[href="/blog"]')
    expect(blogLink?.className).toContain('text-primary')
  })

  it('mobile menu has correct max-height classes', () => {
    render(<HeaderClient />)

    const mobileMenu = document.getElementById('mobile-menu')
    expect(mobileMenu?.className).toContain('max-h-0')

    fireEvent.click(screen.getByLabelText('menu'))
    expect(mobileMenu?.className).toContain('max-h-[32rem]')
  })

  it('mobile menu links close menu on click', () => {
    render(<HeaderClient />)
    const button = screen.getByLabelText('menu')

    fireEvent.click(button)

    const mobileNav = screen.getByLabelText('Mobile navigation')
    const links = mobileNav.querySelectorAll('a')
    if (links.length > 0) {
      fireEvent.click(links[0])
      expect(button).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('renders MobileToolsAccordion in mobile menu', () => {
    render(<HeaderClient />)
    expect(screen.getByTestId('mobile-tools-accordion')).toBeInTheDocument()
  })
})
