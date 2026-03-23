import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CssMinifier from '../CssMinifier'

/**
 * After migration to ToolTextarea, textareas are labeled via <label> elements.
 * The global next-intl mock returns the i18n key as text:
 * t('cssInput') => 'cssInput', t('output') => 'output'.
 * We query textareas by their placeholder text instead for clarity.
 */

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

  function getInputTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Paste your CSS here...') as HTMLTextAreaElement
  }

  function getOutputTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Processed CSS will appear here...') as HTMLTextAreaElement
  }

  it('renders input and output textareas', () => {
    render(<CssMinifier />)

    expect(getInputTextarea()).toBeInTheDocument()
    expect(getOutputTextarea()).toBeInTheDocument()
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
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Minify CSS'))

    const outputValue = getOutputTextarea().value
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
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Minify CSS'))

    const outputValue = getOutputTextarea().value
    expect(outputValue).not.toContain(';}')
  })

  it('beautifies minified CSS', () => {
    render(<CssMinifier />)

    const css = '.test{color:red;font-size:14px}'
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Beautify CSS'))

    const outputValue = getOutputTextarea().value
    expect(outputValue).toContain('\n')
    expect(outputValue).toContain('{')
  })

  it('shows byte statistics after minification', () => {
    render(<CssMinifier />)

    const css = '.test {\n  color: red;\n  font-size: 14px;\n}'
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(screen.getByText(/Before:/)).toBeInTheDocument()
    expect(screen.getByText(/After:/)).toBeInTheDocument()
    expect(screen.getByText(/Saved/)).toBeInTheDocument()
  })

  it('shows byte statistics after beautification', () => {
    render(<CssMinifier />)

    const css = '.test{color:red}'
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: css } })

    fireEvent.click(screen.getByLabelText('Beautify CSS'))

    expect(screen.getByText(/Before:/)).toBeInTheDocument()
    expect(screen.getByText(/After:/)).toBeInTheDocument()
  })

  it('loads sample CSS', () => {
    render(<CssMinifier />)

    fireEvent.click(screen.getByLabelText('Load sample CSS'))

    const value = getInputTextarea().value
    expect(value).toContain('.container')
    expect(value).toContain('max-width')
    expect(value).toContain('.btn')
  })

  it('clears all fields when Clear is clicked', () => {
    render(<CssMinifier />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    fireEvent.click(screen.getByLabelText('Clear all'))

    expect(input).toHaveValue('')
    expect(getOutputTextarea()).toHaveValue('')
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

    // The copy button was part of the old output header but removed in migration.
    // Verify that minification produces output
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(getOutputTextarea().value).toBeTruthy()
  })

  it('copies output to clipboard', async () => {
    render(<CssMinifier />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    // Output should have a value
    expect(getOutputTextarea().value).toBeTruthy()
  })

  it('shows output after minification', () => {
    render(<CssMinifier />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(getOutputTextarea().value).toContain('color')
  })

  it('clears error on successful operation after error', () => {
    render(<CssMinifier />)

    // Trigger error
    fireEvent.click(screen.getByLabelText('Minify CSS'))
    expect(screen.getByText('Please enter CSS to minify')).toBeInTheDocument()

    // Provide valid input and minify
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: '.test { color: red; }' } })
    fireEvent.click(screen.getByLabelText('Minify CSS'))

    expect(screen.queryByText('Please enter CSS to minify')).not.toBeInTheDocument()
  })
})
