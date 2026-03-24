import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/lib/utils/seo', () => ({
  getLocalizedUrl: (url: string, locale: string) => locale === 'az' ? url : `/${locale}${url}`,
}))

vi.mock('@/i18n/config', () => ({
  defaultLocale: 'az',
}))

import Breadcrumb from '../Breadcrumb'

describe('Breadcrumb', () => {
  it('renders breadcrumb items', () => {
    render(
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'JSON Formatter' },
      ]} />
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    render(
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Current Page' },
      ]} />
    )

    const link = screen.getByText('Home')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders last item as plain text (no link)', () => {
    render(
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Current Page' },
      ]} />
    )

    const lastItem = screen.getByText('Current Page')
    expect(lastItem.tagName).toBe('SPAN')
  })

  it('renders separators between items', () => {
    render(
      <Breadcrumb items={[
        { label: 'A', href: '/' },
        { label: 'B', href: '/b' },
        { label: 'C' },
      ]} />
    )

    const separators = screen.getAllByText('/')
    expect(separators.length).toBe(2)
  })

  it('includes JSON-LD breadcrumb schema', () => {
    const { container } = render(
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Tools' },
      ]} />
    )

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeTruthy()
    const jsonLd = JSON.parse(script!.textContent!)
    expect(jsonLd['@type']).toBe('BreadcrumbList')
    expect(jsonLd.itemListElement).toHaveLength(2)
    expect(jsonLd.itemListElement[0].position).toBe(1)
  })

  it('renders nav element with aria-label', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} />)
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
  })
})
