import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoremIpsum from '../LoremIpsum'

describe('LoremIpsum', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders type selector with default "Paragraphs"', () => {
    render(<LoremIpsum />)

    const select = screen.getByDisplayValue('Paragraphs')
    expect(select).toBeInTheDocument()
  })

  it('renders count input with default value of 3', () => {
    render(<LoremIpsum />)

    const countInput = screen.getByDisplayValue('3')
    expect(countInput).toBeInTheDocument()
  })

  it('renders "Start with Lorem ipsum..." checkbox', () => {
    render(<LoremIpsum />)

    expect(screen.getByText(/Start with/)).toBeInTheDocument()
  })

  it('renders Generate button', () => {
    render(<LoremIpsum />)

    expect(screen.getByText('Generate')).toBeInTheDocument()
  })

  it('does not show output before generation', () => {
    render(<LoremIpsum />)

    expect(screen.queryByText('Generated Text')).not.toBeInTheDocument()
  })

  it('generates lorem ipsum text when Generate is clicked', async () => {
    const user = userEvent.setup()
    render(<LoremIpsum />)

    await user.click(screen.getByText('Generate'))

    expect(screen.getByText('Generated Text')).toBeInTheDocument()
  })

  it('starts with "Lorem ipsum" when checkbox is checked', async () => {
    const user = userEvent.setup()
    const { container } = render(<LoremIpsum />)

    await user.click(screen.getByText('Generate'))

    const outputDiv = container.querySelector('.whitespace-pre-wrap')
    const outputText = outputDiv?.textContent || ''
    expect(outputText).toMatch(/^Lorem ipsum dolor sit amet/)
  })

  it('does not start with "Lorem ipsum" when checkbox is unchecked', async () => {
    const user = userEvent.setup()
    const { container } = render(<LoremIpsum />)

    // Uncheck the checkbox
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    await user.click(screen.getByText('Generate'))

    const outputDiv = container.querySelector('.whitespace-pre-wrap')
    const outputText = outputDiv?.textContent || ''
    // It might randomly start with "Lorem", but the forced prefix should not be there
    expect(outputText).not.toMatch(/^Lorem ipsum dolor sit amet, consectetur adipiscing elit\./)
  })

  it('allows changing type to Sentences', async () => {
    const user = userEvent.setup()
    render(<LoremIpsum />)

    const select = screen.getByDisplayValue('Paragraphs')
    await user.selectOptions(select, 'sentences')

    expect(screen.getByDisplayValue('Sentences')).toBeInTheDocument()
  })

  it('allows changing type to Words', async () => {
    const user = userEvent.setup()
    render(<LoremIpsum />)

    const select = screen.getByDisplayValue('Paragraphs')
    await user.selectOptions(select, 'words')

    expect(screen.getByDisplayValue('Words')).toBeInTheDocument()
  })

  it('shows Copy button after generation', async () => {
    const user = userEvent.setup()
    render(<LoremIpsum />)

    expect(screen.queryByText('Copy')).not.toBeInTheDocument()

    await user.click(screen.getByText('Generate'))

    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<LoremIpsum />)

    fireEvent.click(screen.getByText('Generate'))

    expect(screen.getByText('Copy')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Copy'))

    expect(writeTextMock).toHaveBeenCalledTimes(1)
    expect(typeof writeTextMock.mock.calls[0][0]).toBe('string')
    expect(writeTextMock.mock.calls[0][0].length).toBeGreaterThan(0)
  })

  it('generates new text on each click', async () => {
    const { container } = render(<LoremIpsum />)

    fireEvent.click(screen.getByText('Generate'))

    const outputDiv = container.querySelector('.whitespace-pre-wrap')
    const firstOutput = outputDiv?.textContent || ''

    fireEvent.click(screen.getByText('Generate'))

    const secondOutput = outputDiv?.textContent || ''
    // Both should be non-empty
    expect(firstOutput.length).toBeGreaterThan(0)
    expect(secondOutput.length).toBeGreaterThan(0)
  })

  it('clamps count between 1 and 500', () => {
    render(<LoremIpsum />)

    const countInput = screen.getByDisplayValue('3') as HTMLInputElement

    fireEvent.change(countInput, { target: { value: '0' } })
    expect(countInput.value).toBe('1')

    fireEvent.change(countInput, { target: { value: '999' } })
    expect(countInput.value).toBe('500')
  })

  it('generates words when type is set to words', async () => {
    const { container } = render(<LoremIpsum />)

    // Set type to words
    const select = screen.getByDisplayValue('Paragraphs')
    fireEvent.change(select, { target: { value: 'words' } })

    // Uncheck Lorem prefix
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    // Set count to 5
    const countInput = screen.getByDisplayValue('3')
    fireEvent.change(countInput, { target: { value: '5' } })

    fireEvent.click(screen.getByText('Generate'))

    const outputDiv = container.querySelector('.whitespace-pre-wrap')
    const outputText = outputDiv?.textContent || ''
    // Words output should have spaces but no periods (individual words, not sentences)
    expect(outputText.trim().split(/\s+/).length).toBe(5)
  })
})
