import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string) => {
    const dict: Record<string, string> = {
      'common.nav.tools': 'Alətlər',
      'common.nav.viewAll': 'Hamısına bax',
      'tools.categories.ai': 'AI',
      'tools.categories.pdf': 'PDF',
      'tools.categories.image': 'Şəkil',
      'tools.categories.dev': 'Developer',
      'tools.categories.generators': 'Generatorlar',
      'tools.categories.text': 'Mətn',
    }
    const full = namespace ? `${namespace}.${key}` : key
    return dict[full] ?? key
  },
}))

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => '/',
}))

vi.mock('@/config/tools', () => ({
  tools: [
    { slug: 'ai-text-rewriter', name: 'AI Rewriter', category: 'ai' },
    { slug: 'ai-text-summarizer', name: 'AI Summarizer', category: 'ai' },
    { slug: 'ai-grammar-checker', name: 'Grammar Checker', category: 'ai' },
    { slug: 'pdf-merge', name: 'PDF Merge', category: 'pdf' },
    { slug: 'pdf-split', name: 'PDF Split', category: 'pdf' },
    { slug: 'pdf-compress', name: 'PDF Compress', category: 'pdf' },
    { slug: 'image-compress', name: 'Image Compress', category: 'image' },
    { slug: 'image-convert', name: 'Image Convert', category: 'image' },
    { slug: 'image-resize', name: 'Image Resize', category: 'image' },
    { slug: 'json-formatter', name: 'JSON Formatter', category: 'dev' },
    { slug: 'base64-encode-decode', name: 'Base64', category: 'dev' },
    { slug: 'regex-tester', name: 'Regex Tester', category: 'dev' },
    { slug: 'password-generator', name: 'Password Gen', category: 'generators' },
    { slug: 'qr-code-generator', name: 'QR Gen', category: 'generators' },
    { slug: 'color-picker', name: 'Color Picker', category: 'generators' },
    { slug: 'word-counter', name: 'Word Counter', category: 'text' },
    { slug: 'case-converter', name: 'Case Converter', category: 'text' },
    { slug: 'text-diff', name: 'Text Diff', category: 'text' },
  ],
}))

import MegaMenu from '../MegaMenu'

function getTrigger() {
  return screen.getAllByRole('link', { name: /alətlər/i })[0]
}

describe('MegaMenu', () => {
  it('renders trigger as a Link with href="/tools"', () => {
    render(<MegaMenu />)
    const trigger = getTrigger()
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('href', '/tools')
  })

  it('trigger preserves aria attributes', () => {
    render(<MegaMenu />)
    const trigger = getTrigger()
    expect(trigger).toHaveAttribute('aria-haspopup', 'true')
    expect(trigger).toHaveAttribute('aria-controls', 'mega-menu-panel')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('dropdown is closed by default', () => {
    render(<MegaMenu />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens dropdown on hover (mouseEnter)', () => {
    const { container } = render(<MegaMenu />)
    const wrapper = container.firstChild as HTMLElement
    fireEvent.mouseEnter(wrapper)
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('trigger aria-expanded reflects open state after hover', () => {
    const { container } = render(<MegaMenu />)
    const wrapper = container.firstChild as HTMLElement
    const trigger = getTrigger()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.mouseEnter(wrapper)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes dropdown 150ms after mouseLeave', async () => {
    vi.useFakeTimers()
    try {
      const { container } = render(<MegaMenu />)
      const wrapper = container.firstChild as HTMLElement
      fireEvent.mouseEnter(wrapper)
      expect(screen.getByRole('menu')).toBeInTheDocument()
      fireEvent.mouseLeave(wrapper)
      expect(screen.getByRole('menu')).toBeInTheDocument()
      act(() => {
        vi.advanceTimersByTime(150)
      })
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('renders all 6 categories when open', () => {
    const { container } = render(<MegaMenu />)
    fireEvent.mouseEnter(container.firstChild as HTMLElement)
    expect(screen.getByRole('heading', { name: 'AI' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'PDF' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Şəkil' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Developer' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Generatorlar' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mətn' })).toBeInTheDocument()
  })

  it('renders 6 "view all" links (one per category)', () => {
    const { container } = render(<MegaMenu />)
    fireEvent.mouseEnter(container.firstChild as HTMLElement)
    const viewAllLinks = screen.getAllByRole('link', { name: /hamısına bax/i })
    expect(viewAllLinks).toHaveLength(6)
  })

  it('renders 3 popular tools per category (18 total tool links inside panel)', () => {
    const { container } = render(<MegaMenu />)
    fireEvent.mouseEnter(container.firstChild as HTMLElement)
    const panel = screen.getByRole('menu')
    const toolLinks = Array.from(panel.querySelectorAll('a')).filter(
      a => !/hamısına bax/i.test(a.textContent || '')
    )
    expect(toolLinks).toHaveLength(18)
  })

  it('closes on Escape key', () => {
    const { container } = render(<MegaMenu />)
    fireEvent.mouseEnter(container.firstChild as HTMLElement)
    expect(screen.getByRole('menu')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes on click outside', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <div>
        <MegaMenu />
        <button type="button">outside</button>
      </div>
    )
    const wrapper = container.querySelector('.relative') as HTMLElement
    fireEvent.mouseEnter(wrapper)
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /outside/i }))
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })
})
