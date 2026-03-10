import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import JsMinifier from '../JsMinifier'

describe('JsMinifier', () => {
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
    render(<JsMinifier />)

    expect(screen.getByLabelText('JavaScript input')).toBeInTheDocument()
    expect(screen.getByLabelText('JavaScript output')).toBeInTheDocument()
  })

  it('renders Minify, Beautify, and Clear buttons', () => {
    render(<JsMinifier />)

    expect(screen.getByText('Minify')).toBeInTheDocument()
    expect(screen.getByText('Beautify')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('disables Minify and Beautify when input is empty', () => {
    render(<JsMinifier />)

    expect(screen.getByText('Minify')).toBeDisabled()
    expect(screen.getByText('Beautify')).toBeDisabled()
  })

  it('enables buttons when input has content', () => {
    render(<JsMinifier />)

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: 'var x = 1;' } })

    expect(screen.getByText('Minify')).not.toBeDisabled()
    expect(screen.getByText('Beautify')).not.toBeDisabled()
  })

  it('minifies JavaScript by removing comments and whitespace', () => {
    render(<JsMinifier />)

    const code = `// comment
function hello() {
  console.log("hello");
}`
    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: code } })

    fireEvent.click(screen.getByText('Minify'))

    const output = screen.getByLabelText('JavaScript output')
    const outputValue = (output as HTMLTextAreaElement).value
    // Comments should be removed
    expect(outputValue).not.toContain('// comment')
    // Whitespace should be collapsed
    expect(outputValue.length).toBeLessThan(code.length)
  })

  it('removes multi-line comments during minification', () => {
    render(<JsMinifier />)

    const code = '/* multi\nline\ncomment */var x = 1;'
    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: code } })

    fireEvent.click(screen.getByText('Minify'))

    const output = screen.getByLabelText('JavaScript output')
    const outputValue = (output as HTMLTextAreaElement).value
    expect(outputValue).not.toContain('multi')
    expect(outputValue).toContain('var')
  })

  it('beautifies JavaScript with proper formatting', () => {
    render(<JsMinifier />)

    const code = 'function test(){var x=1;if(x){console.log(x)}}'
    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: code } })

    fireEvent.click(screen.getByText('Beautify'))

    const output = screen.getByLabelText('JavaScript output')
    const outputValue = (output as HTMLTextAreaElement).value
    expect(outputValue).toContain('\n')
    expect(outputValue).toContain('{')
  })

  it('shows statistics after minification', () => {
    render(<JsMinifier />)

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: 'var   x   =   1;' } })

    fireEvent.click(screen.getByText('Minify'))

    expect(screen.getByText(/Original:/)).toBeInTheDocument()
    expect(screen.getByText(/Result:/)).toBeInTheDocument()
    expect(screen.getByText(/Change:/)).toBeInTheDocument()
  })

  it('shows statistics after beautification', () => {
    render(<JsMinifier />)

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: 'var x=1;' } })

    fireEvent.click(screen.getByText('Beautify'))

    expect(screen.getByText(/Original:/)).toBeInTheDocument()
  })

  it('clears everything when Clear is clicked', () => {
    render(<JsMinifier />)

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: 'var x = 1;' } })
    fireEvent.click(screen.getByText('Minify'))

    fireEvent.click(screen.getByText('Clear'))

    expect(input).toHaveValue('')
    expect(screen.getByLabelText('JavaScript output')).toHaveValue('')
    expect(screen.queryByText(/Original:/)).not.toBeInTheDocument()
  })

  it('shows Copy button only when output exists', () => {
    render(<JsMinifier />)

    expect(screen.queryByLabelText('Copy output to clipboard')).not.toBeInTheDocument()

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: 'var x = 1;' } })
    fireEvent.click(screen.getByText('Minify'))

    expect(screen.getByLabelText('Copy output to clipboard')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<JsMinifier />)

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: 'var x = 1;' } })
    fireEvent.click(screen.getByText('Minify'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(1)
    })
  })

  it('shows "Copied!" after copying', async () => {
    render(<JsMinifier />)

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: 'var x = 1;' } })
    fireEvent.click(screen.getByText('Minify'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('does not process whitespace-only input', () => {
    render(<JsMinifier />)

    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: '   ' } })

    expect(screen.getByText('Minify')).toBeDisabled()
  })

  it('displays percentage savings for minification', () => {
    render(<JsMinifier />)

    const longCode = 'function   test()   {\n  var   x   =   1;\n  return   x;\n}'
    const input = screen.getByLabelText('JavaScript input')
    fireEvent.change(input, { target: { value: longCode } })

    fireEvent.click(screen.getByText('Minify'))

    // Stats should show char counts
    expect(screen.getByText(`${longCode.length} chars`)).toBeInTheDocument()
  })
})
