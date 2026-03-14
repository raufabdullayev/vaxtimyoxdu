import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const toolUITranslations: Record<string, string> = {
  copy: 'Copy',
  format: 'Format',
  formatBeautify: 'Format / Beautify',
  minify: 'Minify',
  input: 'Input',
  output: 'Output',
  error: 'Error',
  indent: 'Indent',
  tab: 'Tab',
  loadSample: 'Load Sample',
  pasteJsonHere: 'Paste your JSON here...',
  formattedJsonHere: 'Formatted JSON will appear here...',
  pleaseEnterJson: 'Please enter JSON',
  invalidJson: 'Invalid JSON',
}

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === 'spaces' && params?.count) return `${params.count} spaces`
    return toolUITranslations[key] ?? key
  },
}))

import JsonFormatter from '../JsonFormatter'

describe('JsonFormatter', () => {
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
    render(<JsonFormatter />)

    expect(screen.getByPlaceholderText('Paste your JSON here...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Formatted JSON will appear here...')).toBeInTheDocument()
  })

  it('renders Format and Minify buttons', () => {
    render(<JsonFormatter />)

    expect(screen.getByText('Format / Beautify')).toBeInTheDocument()
    expect(screen.getByText('Minify')).toBeInTheDocument()
  })

  it('renders indent selector with default value of 2', () => {
    render(<JsonFormatter />)

    expect(screen.getByText('Indent:')).toBeInTheDocument()
    const select = screen.getByDisplayValue('2 spaces')
    expect(select).toBeInTheDocument()
  })

  it('formats valid JSON with 2-space indent', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"a":1,"b":2}' } })

    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByPlaceholderText('Formatted JSON will appear here...')
    const expected = JSON.stringify({ a: 1, b: 2 }, null, 2)
    expect(output).toHaveValue(expected)
  })

  it('formats valid JSON with 4-space indent', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"x":"y"}' } })

    // Change indent to 4
    const select = screen.getByDisplayValue('2 spaces')
    fireEvent.change(select, { target: { value: '4' } })

    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByPlaceholderText('Formatted JSON will appear here...')
    const expected = JSON.stringify({ x: 'y' }, null, 4)
    expect(output).toHaveValue(expected)
  })

  it('minifies valid JSON', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{\n  "a": 1,\n  "b": 2\n}' } })

    fireEvent.click(screen.getByText('Minify'))

    const output = screen.getByPlaceholderText('Formatted JSON will appear here...')
    expect(output).toHaveValue('{"a":1,"b":2}')
  })

  it('shows error for empty input when formatting', async () => {
    const user = userEvent.setup()
    render(<JsonFormatter />)

    await user.click(screen.getByText('Format / Beautify'))

    expect(screen.getByText('Error: Please enter JSON')).toBeInTheDocument()
  })

  it('shows error for empty input when minifying', async () => {
    const user = userEvent.setup()
    render(<JsonFormatter />)

    await user.click(screen.getByText('Minify'))

    expect(screen.getByText('Error: Please enter JSON')).toBeInTheDocument()
  })

  it('shows error for invalid JSON when formatting', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{invalid json}' } })

    fireEvent.click(screen.getByText('Format / Beautify'))

    const errorElement = screen.getByText(/Error:/)
    expect(errorElement).toBeInTheDocument()
  })

  it('shows error for invalid JSON when minifying', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: 'not json' } })

    fireEvent.click(screen.getByText('Minify'))

    const errorElement = screen.getByText(/Error:/)
    expect(errorElement).toBeInTheDocument()
  })

  it('clears error on successful format after error', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')

    // First produce an error
    fireEvent.change(input, { target: { value: 'bad' } })
    fireEvent.click(screen.getByText('Format / Beautify'))
    expect(screen.getByText(/Error:/)).toBeInTheDocument()

    // Then fix input
    fireEvent.change(input, { target: { value: '{"a":1}' } })
    fireEvent.click(screen.getByText('Format / Beautify'))
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument()
  })

  it('loads sample JSON when Load Sample is clicked', async () => {
    const user = userEvent.setup()
    render(<JsonFormatter />)

    await user.click(screen.getByText('Load Sample'))

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    expect((input as HTMLTextAreaElement).value).toContain('ToolBox AI')
  })

  it('shows Copy button only when output exists', () => {
    render(<JsonFormatter />)

    expect(screen.queryByText('Copy')).not.toBeInTheDocument()

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"a":1}' } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"a":1}' } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(JSON.stringify({ a: 1 }, null, 2))
    })
  })

  it('handles nested JSON objects', () => {
    render(<JsonFormatter />)

    const nested = '{"a":{"b":{"c":1}}}'
    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: nested } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByPlaceholderText('Formatted JSON will appear here...')
    expect(output).toHaveValue(JSON.stringify(JSON.parse(nested), null, 2))
  })

  it('handles JSON arrays', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '[1,2,3]' } })
    fireEvent.click(screen.getByText('Format / Beautify'))

    const output = screen.getByPlaceholderText('Formatted JSON will appear here...')
    expect(output).toHaveValue(JSON.stringify([1, 2, 3], null, 2))
  })

  it('clears output when error occurs', () => {
    render(<JsonFormatter />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')

    // First produce valid output
    fireEvent.change(input, { target: { value: '{"a":1}' } })
    fireEvent.click(screen.getByText('Format / Beautify'))
    expect(screen.getByPlaceholderText('Formatted JSON will appear here...')).not.toHaveValue('')

    // Then produce error
    fireEvent.change(input, { target: { value: 'bad json' } })
    fireEvent.click(screen.getByText('Format / Beautify'))
    expect(screen.getByPlaceholderText('Formatted JSON will appear here...')).toHaveValue('')
  })
})
