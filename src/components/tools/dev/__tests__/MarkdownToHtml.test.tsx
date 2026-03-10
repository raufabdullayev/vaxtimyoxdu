import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MarkdownToHtml from '../MarkdownToHtml'

describe('MarkdownToHtml', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with all required UI elements', () => {
    render(<MarkdownToHtml />)

    expect(screen.getByText('Markdown Input')).toBeInTheDocument()
    expect(screen.getByText('Live Preview')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
    expect(screen.getByText('HTML Source')).toBeInTheDocument()
    expect(screen.getByText('Load Sample')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('renders textarea with correct placeholder', () => {
    render(<MarkdownToHtml />)

    expect(screen.getByPlaceholderText('Type your Markdown here...')).toBeInTheDocument()
  })

  it('converts h1 heading correctly', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '# Hello World' } })

    // Switch to HTML Source to see raw HTML
    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<h1>Hello World</h1>')
  })

  it('converts h2 through h6 headings correctly', () => {
    render(<MarkdownToHtml />)

    const md = '## Second\n### Third\n#### Fourth\n##### Fifth\n###### Sixth'
    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: md } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<h2>Second</h2>')
    expect(output.value).toContain('<h3>Third</h3>')
    expect(output.value).toContain('<h4>Fourth</h4>')
    expect(output.value).toContain('<h5>Fifth</h5>')
    expect(output.value).toContain('<h6>Sixth</h6>')
  })

  it('converts bold text with double asterisks', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: 'This is **bold** text' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<strong>bold</strong>')
  })

  it('converts italic text with single asterisks', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: 'This is *italic* text' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<em>italic</em>')
  })

  it('converts bold and italic combined', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '***bold and italic***' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<strong><em>bold and italic</em></strong>')
  })

  it('converts links correctly', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '[Click here](https://example.com)' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<a href="https://example.com">Click here</a>')
  })

  it('converts inline code correctly', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: 'Use `console.log()` for debugging' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<code>console.log()</code>')
  })

  it('converts fenced code blocks correctly', () => {
    render(<MarkdownToHtml />)

    const md = '```javascript\nconst x = 1;\n```'
    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: md } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<pre><code class="language-javascript">')
    expect(output.value).toContain('const x = 1;')
  })

  it('converts unordered lists correctly', () => {
    render(<MarkdownToHtml />)

    const md = '- Item one\n- Item two\n- Item three'
    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: md } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<ul>')
    expect(output.value).toContain('<li>Item one</li>')
    expect(output.value).toContain('<li>Item two</li>')
    expect(output.value).toContain('<li>Item three</li>')
    expect(output.value).toContain('</ul>')
  })

  it('converts ordered lists correctly', () => {
    render(<MarkdownToHtml />)

    const md = '1. First\n2. Second\n3. Third'
    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: md } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<ol>')
    expect(output.value).toContain('<li>First</li>')
    expect(output.value).toContain('<li>Second</li>')
    expect(output.value).toContain('<li>Third</li>')
    expect(output.value).toContain('</ol>')
  })

  it('converts strikethrough text', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '~~deleted~~ text' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<del>deleted</del>')
  })

  it('converts horizontal rules', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: 'Above\n\n---\n\nBelow' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<hr>')
  })

  it('converts blockquotes', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '> This is a quote' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<blockquote>')
    expect(output.value).toContain('This is a quote')
    expect(output.value).toContain('</blockquote>')
  })

  it('handles empty input producing no HTML output', () => {
    render(<MarkdownToHtml />)

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toBe('')
  })

  it('toggles between Preview and HTML Source modes', () => {
    render(<MarkdownToHtml />)

    // Preview is default
    expect(screen.getByText('Live Preview')).toBeInTheDocument()

    fireEvent.click(screen.getByText('HTML Source'))
    expect(screen.getByText('HTML Output')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Preview'))
    expect(screen.getByText('Live Preview')).toBeInTheDocument()
  })

  it('copies HTML output to clipboard', async () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '# Test' } })

    fireEvent.click(screen.getByText('Copy HTML'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled()
    })
  })

  it('does not show Copy HTML button when input is empty', () => {
    render(<MarkdownToHtml />)

    expect(screen.queryByText('Copy HTML')).not.toBeInTheDocument()
  })

  it('clears input when Clear button is clicked', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '# Some content' } })

    fireEvent.click(screen.getByText('Clear'))

    expect(input).toHaveValue('')
  })

  it('loads sample markdown content', () => {
    render(<MarkdownToHtml />)

    fireEvent.click(screen.getByText('Load Sample'))

    const input = screen.getByPlaceholderText('Type your Markdown here...') as HTMLTextAreaElement
    expect(input.value).toContain('# Markdown to HTML Converter')
    expect(input.value).toContain('**Bold text**')
  })

  it('shows character counts when input is provided', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '# Hello' } })

    expect(screen.getByText(/Markdown: 7 chars/)).toBeInTheDocument()
    expect(screen.getByText(/HTML:/)).toBeInTheDocument()
  })

  it('does not show character counts for empty input', () => {
    render(<MarkdownToHtml />)

    expect(screen.queryByText(/Markdown:.*chars/)).not.toBeInTheDocument()
  })

  it('sets aria-pressed correctly on view mode buttons', () => {
    render(<MarkdownToHtml />)

    const previewBtn = screen.getByText('Preview')
    const htmlBtn = screen.getByText('HTML Source')

    expect(previewBtn).toHaveAttribute('aria-pressed', 'true')
    expect(htmlBtn).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(htmlBtn)

    expect(previewBtn).toHaveAttribute('aria-pressed', 'false')
    expect(htmlBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('converts images correctly', () => {
    render(<MarkdownToHtml />)

    const input = screen.getByPlaceholderText('Type your Markdown here...')
    fireEvent.change(input, { target: { value: '![Alt text](image.png)' } })

    fireEvent.click(screen.getByText('HTML Source'))

    const output = screen.getByLabelText('HTML output') as HTMLTextAreaElement
    expect(output.value).toContain('<img src="image.png" alt="Alt text">')
  })
})
