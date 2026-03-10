import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HtmlMinifier from '../HtmlMinifier'

describe('HtmlMinifier', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders input and output textareas', () => {
    render(<HtmlMinifier />)

    expect(screen.getByLabelText('HTML input')).toBeInTheDocument()
    expect(screen.getByLabelText('HTML output')).toBeInTheDocument()
  })

  it('renders Minify, Beautify, and Clear buttons', () => {
    render(<HtmlMinifier />)

    expect(screen.getByText('Minify')).toBeInTheDocument()
    expect(screen.getByText('Beautify')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('disables Minify button when input is empty', () => {
    render(<HtmlMinifier />)

    expect(screen.getByText('Minify')).toBeDisabled()
  })

  it('disables Beautify button when input is empty', () => {
    render(<HtmlMinifier />)

    expect(screen.getByText('Beautify')).toBeDisabled()
  })

  it('enables buttons when input has content', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div>hello</div>' } })

    expect(screen.getByText('Minify')).not.toBeDisabled()
    expect(screen.getByText('Beautify')).not.toBeDisabled()
  })

  it('minifies HTML by removing whitespace and comments', () => {
    render(<HtmlMinifier />)

    const htmlInput = '<div>\n  <!-- comment -->\n  <p>Hello   World</p>\n</div>'
    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: htmlInput } })

    fireEvent.click(screen.getByText('Minify'))

    const output = screen.getByLabelText('HTML output')
    const outputValue = (output as HTMLTextAreaElement).value
    // Comments should be removed
    expect(outputValue).not.toContain('comment')
    // Excessive whitespace should be collapsed
    expect(outputValue).not.toContain('  ')
  })

  it('removes HTML comments during minification', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<!-- remove me --><div>content</div>' } })

    fireEvent.click(screen.getByText('Minify'))

    const output = screen.getByLabelText('HTML output')
    expect((output as HTMLTextAreaElement).value).not.toContain('remove me')
    expect((output as HTMLTextAreaElement).value).toContain('content')
  })

  it('beautifies HTML with proper indentation', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div><p>hello</p></div>' } })

    fireEvent.click(screen.getByText('Beautify'))

    const output = screen.getByLabelText('HTML output')
    const outputValue = (output as HTMLTextAreaElement).value
    expect(outputValue).toContain('\n')
    expect(outputValue).toContain('  ') // indentation
  })

  it('shows statistics after minification', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div>   <p>   hello   </p>   </div>' } })

    fireEvent.click(screen.getByText('Minify'))

    expect(screen.getByText(/Original:/)).toBeInTheDocument()
    expect(screen.getByText(/Result:/)).toBeInTheDocument()
    expect(screen.getByText(/Change:/)).toBeInTheDocument()
  })

  it('shows statistics after beautification', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div><p>hello</p></div>' } })

    fireEvent.click(screen.getByText('Beautify'))

    expect(screen.getByText(/Original:/)).toBeInTheDocument()
    expect(screen.getByText(/Result:/)).toBeInTheDocument()
  })

  it('clears input, output, and stats when Clear is clicked', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div>test</div>' } })
    fireEvent.click(screen.getByText('Minify'))

    // Verify output exists
    expect(screen.getByText(/Original:/)).toBeInTheDocument()

    fireEvent.click(screen.getByText('Clear'))

    expect(input).toHaveValue('')
    expect(screen.getByLabelText('HTML output')).toHaveValue('')
    expect(screen.queryByText(/Original:/)).not.toBeInTheDocument()
  })

  it('shows Copy button only when output exists', () => {
    render(<HtmlMinifier />)

    expect(screen.queryByLabelText('Copy output to clipboard')).not.toBeInTheDocument()

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div>test</div>' } })
    fireEvent.click(screen.getByText('Minify'))

    expect(screen.getByLabelText('Copy output to clipboard')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div>test</div>' } })
    fireEvent.click(screen.getByText('Minify'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(1)
    })
  })

  it('shows "Copied!" after copying', async () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div>test</div>' } })
    fireEvent.click(screen.getByText('Minify'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('handles self-closing tags in beautification', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '<div><br /><img src="test.png" /><p>text</p></div>' } })

    fireEvent.click(screen.getByText('Beautify'))

    const output = screen.getByLabelText('HTML output')
    const outputValue = (output as HTMLTextAreaElement).value
    expect(outputValue).toContain('<br />')
    expect(outputValue).toContain('<img')
  })

  it('does not process whitespace-only input', () => {
    render(<HtmlMinifier />)

    const input = screen.getByLabelText('HTML input')
    fireEvent.change(input, { target: { value: '   ' } })

    // Buttons should be disabled for whitespace-only
    expect(screen.getByText('Minify')).toBeDisabled()
  })
})
