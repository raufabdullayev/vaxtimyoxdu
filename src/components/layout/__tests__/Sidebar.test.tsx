import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/config/tools', () => ({
  tools: [
    { slug: 'json-formatter', name: 'JSON Formatter', icon: '{}' },
    { slug: 'base64', name: 'Base64 Codec', icon: 'B' },
    { slug: 'html-minifier', name: 'HTML Minifier', icon: '<>' },
    { slug: 'password-gen', name: 'Password Generator', icon: 'K' },
    { slug: 'qr-code', name: 'QR Code', icon: 'Q' },
    { slug: 'uuid-gen', name: 'UUID Generator', icon: 'U' },
    { slug: 'extra-tool', name: 'Extra Tool', icon: '+' },
  ],
}))

vi.mock('../LazyAdBanner', () => ({
  default: ({ slot }: { slot: string }) => <div data-testid={`ad-${slot}`} />,
}))

import Sidebar from '../Sidebar'

describe('Sidebar', () => {
  it('renders popular tools heading', () => {
    render(<Sidebar />)
    expect(screen.getByText('Popular Tools')).toBeInTheDocument()
  })

  it('renders first 6 tools as links', () => {
    render(<Sidebar />)
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
    expect(screen.getByText('Base64 Codec')).toBeInTheDocument()
    expect(screen.getByText('HTML Minifier')).toBeInTheDocument()
    expect(screen.getByText('Password Generator')).toBeInTheDocument()
    expect(screen.getByText('QR Code')).toBeInTheDocument()
    expect(screen.getByText('UUID Generator')).toBeInTheDocument()
    // 7th tool should not appear (only first 6)
    expect(screen.queryByText('Extra Tool')).not.toBeInTheDocument()
  })

  it('renders tool links with correct hrefs', () => {
    render(<Sidebar />)
    const link = screen.getByText('JSON Formatter').closest('a')
    expect(link).toHaveAttribute('href', '/tools/json-formatter')
  })

  it('renders ad banners', () => {
    render(<Sidebar />)
    expect(screen.getByTestId('ad-sidebar-top')).toBeInTheDocument()
    expect(screen.getByTestId('ad-sidebar-bottom')).toBeInTheDocument()
  })

  it('renders as aside element', () => {
    const { container } = render(<Sidebar />)
    expect(container.querySelector('aside')).toBeTruthy()
  })

  it('shows tool icons', () => {
    render(<Sidebar />)
    expect(screen.getByText('{}')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
