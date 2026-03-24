import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('dompurify', () => ({
  default: {
    sanitize: (html: string) => html,
  },
}))

import MarkdownPreview from '../MarkdownPreview'

describe('MarkdownPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders editor and preview areas', () => {
    render(<MarkdownPreview />)
    expect(screen.getByLabelText('Markdown input')).toBeInTheDocument()
    expect(screen.getByLabelText('Markdown preview')).toBeInTheDocument()
  })

  it('renders load sample button', () => {
    render(<MarkdownPreview />)
    expect(screen.getByLabelText('Load sample markdown')).toBeInTheDocument()
  })

  it('loads sample markdown when button clicked', () => {
    render(<MarkdownPreview />)
    fireEvent.click(screen.getByLabelText('Load sample markdown'))
    const textarea = screen.getByLabelText('Markdown input') as HTMLTextAreaElement
    expect(textarea.value).toContain('Markdown Preview')
    expect(textarea.value).toContain('Features')
  })

  it('parses headings in markdown', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '# Hello World' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<h1')
    expect(preview.innerHTML).toContain('Hello World')
  })

  it('parses bold text', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '**bold text**' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<strong>')
    expect(preview.innerHTML).toContain('bold text')
  })

  it('parses italic text', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '*italic text*' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<em>')
  })

  it('parses inline code', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: 'use `const` here' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<code')
  })

  it('parses code blocks', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '```js\nconst x = 1\n```' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<pre')
    expect(preview.innerHTML).toContain('const x = 1')
  })

  it('parses unordered lists', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '- item 1\n- item 2' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<ul')
    expect(preview.innerHTML).toContain('<li')
  })

  it('parses ordered lists', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '1. first\n2. second' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<ol')
  })

  it('parses blockquotes', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '> this is a quote' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<blockquote')
  })

  it('parses links safely', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '[Example](https://example.com)' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('href="https://example.com"')
    expect(preview.innerHTML).toContain('Example')
  })

  it('sanitizes javascript: URLs', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '[XSS](javascript:alert(1))' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('href="#"')
    expect(preview.innerHTML).not.toContain('javascript:')
  })

  it('parses horizontal rules', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: 'above\n---\nbelow' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<hr')
  })

  it('parses bold italic text', () => {
    render(<MarkdownPreview />)
    const textarea = screen.getByLabelText('Markdown input')
    fireEvent.change(textarea, { target: { value: '***bold italic***' } })
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('<strong><em>')
  })

  it('shows placeholder when no input', () => {
    render(<MarkdownPreview />)
    const preview = screen.getByLabelText('Markdown preview')
    expect(preview.innerHTML).toContain('Preview will appear here')
  })

  it('has mobile view toggle buttons', () => {
    render(<MarkdownPreview />)
    expect(screen.getByText('input')).toBeInTheDocument()
    expect(screen.getAllByText('preview').length).toBeGreaterThan(0)
  })
})
