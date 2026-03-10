import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import XmlFormatter from '../XmlFormatter'

describe('XmlFormatter', () => {
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
    render(<XmlFormatter />)

    expect(screen.getByText('XML Input')).toBeInTheDocument()
    expect(screen.getByText('Output')).toBeInTheDocument()
    expect(screen.getByText('Format / Beautify')).toBeInTheDocument()
    expect(screen.getByText('Minify')).toBeInTheDocument()
    expect(screen.getByText('Validate')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('Load Sample')).toBeInTheDocument()
  })

  it('renders textareas with correct placeholders', () => {
    render(<XmlFormatter />)

    expect(screen.getByPlaceholderText('Paste your XML here...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Formatted XML will appear here...')).toBeInTheDocument()
  })

  it('renders indent selector with 2 and 4 spaces options', () => {
    render(<XmlFormatter />)

    expect(screen.getByText('Indent:')).toBeInTheDocument()
    expect(screen.getByText('2 spaces')).toBeInTheDocument()
    expect(screen.getByText('4 spaces')).toBeInTheDocument()
  })

  it('formats valid XML with proper indentation', () => {
    render(<XmlFormatter />)

    const xml = '<root><child>text</child></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).toContain('<root>')
    expect(output.value).toContain('  <child>text</child>')
    expect(output.value).toContain('</root>')
  })

  it('formats XML with nested elements correctly', () => {
    render(<XmlFormatter />)

    const xml = '<a><b><c>hello</c></b></a>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    const lines = output.value.split('\n')
    expect(lines[0]).toBe('<a>')
    expect(lines[1]).toBe('  <b>')
    expect(lines[2]).toBe('    <c>hello</c>')
    expect(lines[3]).toBe('  </b>')
    expect(lines[4]).toBe('</a>')
  })

  it('handles self-closing tags', () => {
    render(<XmlFormatter />)

    const xml = '<root><img src="test.png" /><br/></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).toContain('<img src="test.png" />')
    expect(output.value).toContain('<br/>')
  })

  it('formats XML with 4-space indentation', () => {
    render(<XmlFormatter />)

    const select = screen.getByDisplayValue('2 spaces')
    fireEvent.change(select, { target: { value: '4' } })

    const xml = '<root><child>text</child></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).toContain('    <child>text</child>')
  })

  it('minifies XML by removing whitespace', () => {
    render(<XmlFormatter />)

    const xml = `<root>
  <child>text</child>
  <other>data</other>
</root>`
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Minify'))

    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).not.toContain('\n')
    expect(output.value).toContain('<root><child>text</child><other>data</other></root>')
  })

  it('validates valid XML and shows success message', () => {
    render(<XmlFormatter />)

    const xml = '<root><child>text</child></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Validate'))

    expect(screen.getByText('Valid XML - No errors found')).toBeInTheDocument()
  })

  it('detects invalid XML with mismatched tags', () => {
    render(<XmlFormatter />)

    const xml = '<root><child>text</wrong></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Validate'))

    expect(screen.getByText(/Validation failed/)).toBeInTheDocument()
    expect(screen.getByText(/Mismatched tag/)).toBeInTheDocument()
  })

  it('detects unclosed tags', () => {
    render(<XmlFormatter />)

    const xml = '<root><child>text</root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Validate'))

    expect(screen.getByText(/Validation failed/)).toBeInTheDocument()
  })

  it('shows error for empty input on Format', () => {
    render(<XmlFormatter />)

    fireEvent.click(screen.getByText('Format / Beautify'))

    expect(screen.getByText(/Error: Please enter some XML/)).toBeInTheDocument()
  })

  it('shows error for empty input on Validate', () => {
    render(<XmlFormatter />)

    fireEvent.click(screen.getByText('Validate'))

    expect(screen.getByText(/Error: Please enter some XML/)).toBeInTheDocument()
  })

  it('does not format invalid XML and shows validation errors', () => {
    render(<XmlFormatter />)

    const xml = '<root><unclosed>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    expect(screen.getByText(/Validation failed/)).toBeInTheDocument()
    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).toBe('')
  })

  it('clears input, output, and errors when Clear is clicked', () => {
    render(<XmlFormatter />)

    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: '<root></root>' } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    fireEvent.click(screen.getByText('Clear'))

    expect(input).toHaveValue('')
    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).toBe('')
  })

  it('loads sample XML when Load Sample is clicked', () => {
    render(<XmlFormatter />)

    fireEvent.click(screen.getByText('Load Sample'))

    const input = screen.getByPlaceholderText('Paste your XML here...') as HTMLTextAreaElement
    expect(input.value).toContain('catalog')
    expect(input.value).toContain('book')
    expect(input.value).toContain('Gambardella')
  })

  it('copies output to clipboard', async () => {
    render(<XmlFormatter />)

    const xml = '<root><child>text</child></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled()
    })
  })

  it('does not show Copy button when output is empty', () => {
    render(<XmlFormatter />)

    expect(screen.queryByText('Copy')).not.toBeInTheDocument()
  })

  it('handles XML declaration in formatting', () => {
    render(<XmlFormatter />)

    const xml = '<?xml version="1.0"?><root><child>text</child></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).toContain('<?xml version="1.0"?>')
  })

  it('minifies XML by removing comments', () => {
    render(<XmlFormatter />)

    const xml = '<root><!-- comment --><child>text</child></root>'
    const input = screen.getByPlaceholderText('Paste your XML here...')
    fireEvent.change(input, { target: { value: xml } })
    fireEvent.click(screen.getByText('Minify'))

    const output = screen.getByLabelText('XML output') as HTMLTextAreaElement
    expect(output.value).not.toContain('<!-- comment -->')
  })
})
