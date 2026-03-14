import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CssMinifier from '../CssMinifier'

describe('CssMinifier', () => {
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
    render(<CssMinifier />)

    expect(screen.getByLabelText('CSS input')).toBeInTheDocument()
    expect(screen.getByLabelText('CSS output')).toBeInTheDocument()
  })

  it('renders Minify and Beautify buttons', () => {
    render(<CssMinifier />)

    expect(screen.getByLabelText('Minify CSS')).toBeInTheDocument()
    expect(screen.getByLabelText('Beautify CSS')).toBeInTheDocument()
  })

  it('renders Load Sample and Clear buttons', () => {
    render(<CssMinifier />)

    expect(screen.getByLabelText('Load sample CSS')).toBeInTheDocument()
    expect(screen.getByLabelText('Clear all')).toBeInTheDocument()
  })

  it('shows error for empty input on minify', () => {
    render(<CssMinifier />)

    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(screen.getByText('Please enter CSS to minify')).toBeInTheDocument()
  })

  it('shows error for empty input on beautify', () => {
    render(<CssMinifier />)

    fireEvent.click(screen.getByLabelText('Beautify CSS'))

    expect(screen.getByText('Please enter CSS to beautify')).toBeInTheDocument()
  })

  it('minifies CSS by removing comments and whitespace', () => {
    render(<CssMinifier />)

    const css = `/* comment */
.container {
  max-width: 1200px;
  margin: 0 auto;
}`
    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Minify CSS'))

    const output = screen.getByLabelText('CSS output')
    const outputValue = (output as HTMLTextAreaElement).value
    // Comments removed
    expect(outputValue).not.toContain('comment')
    // Whitespace collapsed
    expect(outputValue).not.toContain('\n')
    // Properties present
    expect(outputValue).toContain('max-width')
  })

  it('removes trailing semicolons before closing brace', () => {
    render(<CssMinifier />)

    const css = '.test { color: red; }'
    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Minify CSS'))

    const output = screen.getByLabelText('CSS output')
    const outputValue = (output as HTMLTextAreaElement).value
    expect(outputValue).not.toContain(';}')
  })

  it('beautifies minified CSS', () => {
    render(<CssMinifier />)

    const css = '.test{color:red;font-size:14px}'
    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Beautify CSS'))

    const output = screen.getByLabelText('CSS output')
    const outputValue = (output as HTMLTextAreaElement).value
    expect(outputValue).toContain('\n')
    expect(outputValue).toContain('{')
  })

  it('shows byte statistics after minification', () => {
    render(<CssMinifier />)

    const css = '.test {\n  color: red;\n  font-size: 14px;\n}'
    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(screen.getByText(/Before:/)).toBeInTheDocument()
    expect(screen.getByText(/After:/)).toBeInTheDocument()
    expect(screen.getByText(/Saved/)).toBeInTheDocument()
  })

  it('shows byte statistics after beautification', () => {
    render(<CssMinifier />)

    const css = '.test{color:red}'
    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Beautify CSS'))

    expect(screen.getByText(/Before:/)).toBeInTheDocument()
    expect(screen.getByText(/After:/)).toBeInTheDocument()
  })

  it('loads sample CSS', () => {
    render(<CssMinifier />)

    fireEvent.click(screen.getByLabelText('Load sample CSS'))

    const input = screen.getByLabelText('CSS input')
    const value = (input as HTMLTextAreaElement).value
    expect(value).toContain('.container')
    expect(value).toContain('max-width')
    expect(value).toContain('.btn')
  })

  it('clears all fields when Clear is clicked', () => {
    render(<CssMinifier />)

    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    fireEvent.click(screen.getByLabelText('Clear all'))

    expect(input).toHaveValue('')
    expect(screen.getByLabelText('CSS output')).toHaveValue('')
    expect(screen.queryByText(/Before:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Please enter CSS/)).not.toBeInTheDocument()
  })

  it('clears error when clear is clicked', () => {
    render(<CssMinifier />)

    // Trigger error
    fireEvent.click(screen.getByLabelText('Minify CSS'))
    expect(screen.getByText('Please enter CSS to minify')).toBeInTheDocument()

    // Clear should remove error
    fireEvent.click(screen.getByLabelText('Clear all'))
    expect(screen.queryByText('Please enter CSS to minify')).not.toBeInTheDocument()
  })

  it('shows Copy button only when output exists', () => {
    render(<CssMinifier />)

    expect(screen.queryByLabelText('Copy output')).not.toBeInTheDocument()

    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(screen.getByLabelText('Copy output')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<CssMinifier />)

    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    fireEvent.click(screen.getByLabelText('Copy output'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(1)
    })
  })

  it('shows "Copied!" after copying', async () => {
    render(<CssMinifier />)

    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    fireEvent.click(screen.getByLabelText('Copy output'))

    await waitFor(() => {
      expect(screen.getByText('copied')).toBeInTheDocument()
    })
  })

  it('clears error on successful operation after error', () => {
    render(<CssMinifier />)

    // Trigger error
    fireEvent.click(screen.getByLabelText('Minify CSS'))
    expect(screen.getByText('Please enter CSS to minify')).toBeInTheDocument()

    // Provide valid input and minify
    const input = screen.getByLabelText('CSS input')
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(screen.queryByText('Please enter CSS to minify')).not.toBeInTheDocument()
  })
})
