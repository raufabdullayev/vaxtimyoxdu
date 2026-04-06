import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

vi.mock('next/dynamic', () => ({
  default: (loader: () => Promise<unknown>) => {
    const DummyComponent = (props: Record<string, unknown>) => null
    return DummyComponent
  },
}))

describe('CurrentYear', () => {
  it('renders current year', async () => {
    const { default: CurrentYear } = await import('../CurrentYear')
    const { container } = render(<CurrentYear />)
    expect(container.textContent).toBe(String(new Date().getFullYear()))
  })
})

describe('PoweredByBrand', () => {
  it('renders powered by text', async () => {
    const { default: PoweredByBrand } = await import('../PoweredByBrand')
    render(<PoweredByBrand />)
    expect(screen.getByText('poweredBy')).toBeInTheDocument()
  })

  it('has aria-hidden attribute', async () => {
    const { default: PoweredByBrand } = await import('../PoweredByBrand')
    render(<PoweredByBrand />)
    const element = screen.getByText('poweredBy')
    expect(element).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('ShareButtonsWrapper', () => {
  it('renders with ShareButtons', async () => {
    vi.doMock('../ShareButtons', () => ({
      default: ({ url, title }: { url: string; title: string }) => (
        <div data-testid="share-buttons" data-url={url} data-title={title} />
      ),
    }))
    vi.resetModules()
    // Re-mock dependencies after resetModules
    vi.doMock('next-intl', () => ({
      useTranslations: () => (key: string) => key,
      useLocale: () => 'en',
    }))
    const { default: ShareButtonsWrapper } = await import('../ShareButtonsWrapper')
    render(
      <ShareButtonsWrapper
        path="/tools/json-formatter"
        title="JSON Formatter"
        description="Format JSON"
      />
    )
    const el = screen.getByTestId('share-buttons')
    expect(el).toBeInTheDocument()
    // en locale should get /en prefix
    expect(el.getAttribute('data-url')).toContain('/en/tools/json-formatter')
  })

  it('no locale prefix for default locale az', async () => {
    vi.doMock('../ShareButtons', () => ({
      default: ({ url }: { url: string }) => (
        <div data-testid="share-buttons" data-url={url} />
      ),
    }))
    vi.doMock('next-intl', () => ({
      useTranslations: () => (key: string) => key,
      useLocale: () => 'az',
    }))
    vi.resetModules()
    const { default: ShareButtonsWrapper } = await import('../ShareButtonsWrapper')
    render(<ShareButtonsWrapper path="/tools/test" title="Test" />)
    const el = screen.getByTestId('share-buttons')
    expect(el.getAttribute('data-url')).not.toContain('/az/')
  })
})
