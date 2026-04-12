import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AdBanner from '../AdBanner'

// Mock next-intl (from vitest.setup.ts covers useTranslations, but AdBanner doesn't use it)

describe('AdBanner', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'test')
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', '')
  })

  it('renders placeholder in non-production environment', () => {
    render(<AdBanner slot="test-slot" />)

    expect(screen.getByText(/Ad Placeholder/)).toBeInTheDocument()
    expect(screen.getByText(/banner/)).toBeInTheDocument()
  })

  it('renders placeholder when no adsense ID is set', () => {
    render(<AdBanner slot="test-slot" />)

    const placeholder = screen.getByText(/Ad Placeholder/)
    expect(placeholder).toBeInTheDocument()
  })

  it('renders with banner format by default', () => {
    const { container } = render(<AdBanner slot="test-slot" />)

    const div = container.firstElementChild as HTMLElement
    expect(div).toHaveAttribute('data-ad-format', 'banner')
  })

  it('renders with sidebar format when specified', () => {
    const { container } = render(<AdBanner slot="test-slot" format="sidebar" />)

    const div = container.firstElementChild as HTMLElement
    expect(div).toHaveAttribute('data-ad-format', 'sidebar')
    expect(div.className).toContain('min-h-[250px]')
  })

  it('renders with in-article format when specified', () => {
    const { container } = render(<AdBanner slot="test-slot" format="in-article" />)

    const div = container.firstElementChild as HTMLElement
    expect(div).toHaveAttribute('data-ad-format', 'in-article')
    expect(div.className).toContain('min-h-[120px]')
  })

  it('applies custom className', () => {
    const { container } = render(<AdBanner slot="test-slot" className="my-custom-class" />)

    const div = container.firstElementChild as HTMLElement
    expect(div.className).toContain('my-custom-class')
  })

  it('renders with correct data-ad-slot attribute', () => {
    const { container } = render(<AdBanner slot="my-slot-123" />)

    const div = container.firstElementChild as HTMLElement
    expect(div).toHaveAttribute('data-ad-slot', 'my-slot-123')
  })

  it('placeholder has role="presentation" and aria-hidden', () => {
    render(<AdBanner slot="test-slot" />)

    const div = screen.getByRole('presentation', { hidden: true })
    expect(div).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders ad container in production with adsense ID', () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-1234567890')

    const { container } = render(<AdBanner slot="test-slot" />)

    const ins = container.querySelector('ins.adsbygoogle')
    expect(ins).toBeTruthy()
    expect(ins).toHaveAttribute('data-ad-client', 'ca-pub-1234567890')
    expect(ins).toHaveAttribute('data-ad-slot', 'test-slot')
  })

  it('renders ad container with correct format config in production', () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_ID', 'ca-pub-1234567890')

    const { container } = render(<AdBanner slot="test-slot" format="in-article" />)

    const ins = container.querySelector('ins.adsbygoogle')
    expect(ins).toBeTruthy()
    expect(ins).toHaveAttribute('data-ad-format', 'fluid')
    expect(ins).toHaveAttribute('data-ad-layout', 'in-article')
  })

  it('banner min-height class is applied in placeholder', () => {
    const { container } = render(<AdBanner slot="test-slot" format="banner" />)

    const div = container.firstElementChild as HTMLElement
    expect(div.className).toContain('min-h-[90px]')
  })
})
