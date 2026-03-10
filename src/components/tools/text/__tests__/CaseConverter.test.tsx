import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CaseConverter from '../CaseConverter'

describe('CaseConverter', () => {
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
    render(<CaseConverter />)

    expect(screen.getByLabelText('Text input for case conversion')).toBeInTheDocument()
    expect(screen.getByLabelText('Case conversion output')).toBeInTheDocument()
  })

  it('renders all case conversion buttons', () => {
    render(<CaseConverter />)

    expect(screen.getByText('UPPERCASE')).toBeInTheDocument()
    expect(screen.getByText('lowercase')).toBeInTheDocument()
    expect(screen.getByText('Title Case')).toBeInTheDocument()
    expect(screen.getByText('Sentence case')).toBeInTheDocument()
    expect(screen.getByText('camelCase')).toBeInTheDocument()
    expect(screen.getByText('PascalCase')).toBeInTheDocument()
    expect(screen.getByText('snake_case')).toBeInTheDocument()
    expect(screen.getByText('kebab-case')).toBeInTheDocument()
    expect(screen.getByText('CONSTANT_CASE')).toBeInTheDocument()
    expect(screen.getByText('dot.case')).toBeInTheDocument()
  })

  it('converts to UPPERCASE', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'hello world')

    // UPPERCASE is the default selection
    const output = screen.getByLabelText('Case conversion output')
    expect(output).toHaveValue('HELLO WORLD')
  })

  it('converts to lowercase', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'HELLO WORLD')

    await user.click(screen.getByLabelText('Convert to lowercase'))

    const output = screen.getByLabelText('Case conversion output')
    expect(output).toHaveValue('hello world')
  })

  it('converts to Title Case', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'hello world foo bar')

    await user.click(screen.getByLabelText('Convert to Title Case'))

    const output = screen.getByLabelText('Case conversion output')
    expect(output).toHaveValue('Hello World Foo Bar')
  })

  it('converts to camelCase', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'hello world foo')

    await user.click(screen.getByLabelText('Convert to camelCase'))

    const output = screen.getByLabelText('Case conversion output')
    expect(output).toHaveValue('helloWorldFoo')
  })

  it('converts to snake_case', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'hello world foo')

    await user.click(screen.getByLabelText('Convert to snake_case'))

    const output = screen.getByLabelText('Case conversion output')
    expect(output).toHaveValue('hello_world_foo')
  })

  it('converts to kebab-case', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'hello world foo')

    await user.click(screen.getByLabelText('Convert to kebab-case'))

    const output = screen.getByLabelText('Case conversion output')
    expect(output).toHaveValue('hello-world-foo')
  })

  it('handles empty input', () => {
    render(<CaseConverter />)

    const output = screen.getByLabelText('Case conversion output')
    expect(output).toHaveValue('')
  })

  it('copies output to clipboard', async () => {
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    fireEvent.change(input, { target: { value: 'hello' } })

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('HELLO')
    })
  })

  it('shows "Copied!" after copying', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'hello')

    await user.click(screen.getByLabelText('Copy output to clipboard'))

    expect(screen.getByText('Copied!')).toBeInTheDocument()
  })

  it('does not show Copy button when output is empty', () => {
    render(<CaseConverter />)

    expect(screen.queryByLabelText('Copy output to clipboard')).not.toBeInTheDocument()
  })

  it('shows character and word count stats', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'hello world')

    // Stats are inside: <div> <div class="text-2xl ...">{value}</div> <div class="text-xs ...">{label}</div> </div>
    const charsLabel = screen.getByText('Characters')
    const charsValue = charsLabel.parentElement!.querySelector('[class*="font-bold"]')
    expect(charsValue).toHaveTextContent('11')

    const wordsLabel = screen.getByText('Words')
    const wordsValue = wordsLabel.parentElement!.querySelector('[class*="font-bold"]')
    expect(wordsValue).toHaveTextContent('2')
  })

  it('shows Clear button when input has text', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    expect(screen.queryByLabelText('Clear all fields')).not.toBeInTheDocument()

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'some text')

    expect(screen.getByLabelText('Clear all fields')).toBeInTheDocument()
  })

  it('clears input when Clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = screen.getByLabelText('Text input for case conversion')
    await user.type(input, 'some text')

    await user.click(screen.getByLabelText('Clear all fields'))

    expect(input).toHaveValue('')
  })

  it('highlights the selected case button with aria-pressed', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const uppercaseBtn = screen.getByLabelText('Convert to UPPERCASE')
    expect(uppercaseBtn).toHaveAttribute('aria-pressed', 'true')

    const lowercaseBtn = screen.getByLabelText('Convert to lowercase')
    expect(lowercaseBtn).toHaveAttribute('aria-pressed', 'false')

    await user.click(lowercaseBtn)
    expect(lowercaseBtn).toHaveAttribute('aria-pressed', 'true')
    expect(uppercaseBtn).toHaveAttribute('aria-pressed', 'false')
  })
})
