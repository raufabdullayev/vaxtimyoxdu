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

  function getInputTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Enter or paste your text here...') as HTMLTextAreaElement
  }

  function getOutputTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Converted text will appear here...') as HTMLTextAreaElement
  }

  function getCaseRadio(name: string): HTMLElement {
    return screen.getByRole('radio', { name })
  }

  it('renders input and output textareas', () => {
    render(<CaseConverter />)

    expect(getInputTextarea()).toBeInTheDocument()
    expect(getOutputTextarea()).toBeInTheDocument()
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

    const input = getInputTextarea()
    await user.type(input, 'hello world')

    // UPPERCASE is the default selection
    const output = getOutputTextarea()
    expect(output).toHaveValue('HELLO WORLD')
  })

  it('converts to lowercase', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = getInputTextarea()
    await user.type(input, 'HELLO WORLD')

    await user.click(getCaseRadio('lowercase'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('hello world')
  })

  it('converts to Title Case', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = getInputTextarea()
    await user.type(input, 'hello world foo bar')

    await user.click(getCaseRadio('Title Case'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('Hello World Foo Bar')
  })

  it('converts to camelCase', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = getInputTextarea()
    await user.type(input, 'hello world foo')

    await user.click(getCaseRadio('camelCase'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('helloWorldFoo')
  })

  it('converts to snake_case', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = getInputTextarea()
    await user.type(input, 'hello world foo')

    await user.click(getCaseRadio('snake_case'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('hello_world_foo')
  })

  it('converts to kebab-case', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = getInputTextarea()
    await user.type(input, 'hello world foo')

    await user.click(getCaseRadio('kebab-case'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('hello-world-foo')
  })

  it('handles empty input', () => {
    render(<CaseConverter />)

    const output = getOutputTextarea()
    expect(output).toHaveValue('')
  })

  it('copies output to clipboard', async () => {
    render(<CaseConverter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'hello' } })

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('HELLO')
    })
  })

  it('shows "Copied!" after copying', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = getInputTextarea()
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

    const input = getInputTextarea()
    await user.type(input, 'hello world')

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

    const input = getInputTextarea()
    await user.type(input, 'some text')

    expect(screen.getByLabelText('Clear all fields')).toBeInTheDocument()
  })

  it('clears input when Clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const input = getInputTextarea()
    await user.type(input, 'some text')

    await user.click(screen.getByLabelText('Clear all fields'))

    expect(input).toHaveValue('')
  })

  it('highlights the selected case radio with aria-checked', async () => {
    const user = userEvent.setup()
    render(<CaseConverter />)

    const uppercaseRadio = getCaseRadio('UPPERCASE')
    expect(uppercaseRadio).toHaveAttribute('aria-checked', 'true')

    const lowercaseRadio = getCaseRadio('lowercase')
    expect(lowercaseRadio).toHaveAttribute('aria-checked', 'false')

    await user.click(lowercaseRadio)
    expect(lowercaseRadio).toHaveAttribute('aria-checked', 'true')
    expect(uppercaseRadio).toHaveAttribute('aria-checked', 'false')
  })
})
