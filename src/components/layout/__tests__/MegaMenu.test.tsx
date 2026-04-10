import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

describe('MegaMenu', () => {
  it('renders trigger button with Alətlər label', () => {
    render(<MegaMenu />)
    expect(screen.getByRole('button', { name: /alətlər/i })).toBeInTheDocument()
  })

  it('dropdown is closed by default', () => {
    render(<MegaMenu />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens dropdown on trigger click', async () => {
    const user = userEvent.setup()
    render(<MegaMenu />)
    await user.click(screen.getByRole('button', { name: /alətlər/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('trigger has aria-expanded matching open state', async () => {
    const user = userEvent.setup()
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /alətlər/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders all 6 categories when open', async () => {
    const user = userEvent.setup()
    render(<MegaMenu />)
    await user.click(screen.getByRole('button', { name: /alətlər/i }))
    expect(screen.getByRole('heading', { name: 'AI' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'PDF' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Şəkil' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Developer' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Generatorlar' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mətn' })).toBeInTheDocument()
  })

  it('renders 6 "view all" links (one per category)', async () => {
    const user = userEvent.setup()
    render(<MegaMenu />)
    await user.click(screen.getByRole('button', { name: /alətlər/i }))
    const viewAllLinks = screen.getAllByRole('link', { name: /hamısına bax/i })
    expect(viewAllLinks).toHaveLength(6)
  })

  it('renders 3 popular tools per category (18 total tool links)', async () => {
    const user = userEvent.setup()
    render(<MegaMenu />)
    await user.click(screen.getByRole('button', { name: /alətlər/i }))
    const panel = screen.getByRole('menu')
    const toolLinks = Array.from(panel.querySelectorAll('a')).filter(
      a => !/hamısına bax/i.test(a.textContent || '')
    )
    expect(toolLinks).toHaveLength(18)
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    render(<MegaMenu />)
    await user.click(screen.getByRole('button', { name: /alətlər/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes on click outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <MegaMenu />
        <button type="button">outside</button>
      </div>
    )
    await user.click(screen.getByRole('button', { name: /alətlər/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /outside/i }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
