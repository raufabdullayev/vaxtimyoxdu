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
  Link: ({ href, children, onClick, ...props }: { href: string; children: React.ReactNode; onClick?: () => void; [key: string]: unknown }) => (
    <a href={href} onClick={onClick} {...props}>{children}</a>
  ),
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

import MobileToolsAccordion from '../MobileToolsAccordion'

describe('MobileToolsAccordion', () => {
  it('renders 6 category toggle buttons', () => {
    render(<MobileToolsAccordion />)
    expect(screen.getByRole('button', { name: /AI/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /PDF/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Şəkil/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Developer/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Generatorlar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Mətn/i })).toBeInTheDocument()
  })

  it('categories collapsed by default (aria-expanded=false)', () => {
    render(<MobileToolsAccordion />)
    const aiBtn = screen.getByRole('button', { name: /AI/i })
    expect(aiBtn).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands a category on click', async () => {
    const user = userEvent.setup()
    render(<MobileToolsAccordion />)
    const aiBtn = screen.getByRole('button', { name: /AI/i })
    await user.click(aiBtn)
    expect(aiBtn).toHaveAttribute('aria-expanded', 'true')
    // Tool links visible after expand
    expect(screen.getByRole('link', { name: /AI Rewriter/i })).toBeInTheDocument()
  })

  it('collapses previously open category when another is clicked', async () => {
    const user = userEvent.setup()
    render(<MobileToolsAccordion />)
    const aiBtn = screen.getByRole('button', { name: /AI/i })
    const pdfBtn = screen.getByRole('button', { name: /PDF/i })
    await user.click(aiBtn)
    await user.click(pdfBtn)
    expect(aiBtn).toHaveAttribute('aria-expanded', 'false')
    expect(pdfBtn).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onNavigate callback when a tool link is clicked', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<MobileToolsAccordion onNavigate={onNavigate} />)
    await user.click(screen.getByRole('button', { name: /AI/i }))
    await user.click(screen.getByRole('link', { name: /AI Rewriter/i }))
    expect(onNavigate).toHaveBeenCalled()
  })
})
