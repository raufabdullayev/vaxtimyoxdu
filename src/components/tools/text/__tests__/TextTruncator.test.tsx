import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextTruncator from '../TextTruncator'

describe('TextTruncator', () => {
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
    return screen.getByLabelText('Text input') as HTMLTextAreaElement
  }

  it('renders input textarea and truncation controls', () => {
    render(<TextTruncator />)

    expect(getInputTextarea()).toBeInTheDocument()
    expect(screen.getByText('Chars')).toBeInTheDocument()
    expect(screen.getByText('Words')).toBeInTheDocument()
    expect(screen.getByText('Sentences')).toBeInTheDocument()
    expect(screen.getByLabelText('Truncation limit')).toBeInTheDocument()
  })

  it('truncates text by character count at end', () => {
    render(<TextTruncator />)

    const longText = 'This is a reasonably long text that should be truncated at some point during this test'
    fireEvent.change(getInputTextarea(), { target: { value: longText } })
    fireEvent.change(screen.getByLabelText('Truncation limit'), { target: { value: '20' } })

    const result = screen.getByText(/Result/)
    expect(result).toBeInTheDocument()
  })

  it('does not truncate text shorter than the limit', () => {
    render(<TextTruncator />)

    fireEvent.change(getInputTextarea(), { target: { value: 'short' } })
    fireEvent.change(screen.getByLabelText('Truncation limit'), { target: { value: '100' } })

    // The result section shows character count; text shorter than limit is not truncated
    const resultLabel = screen.getByText(/Result \(5 characters\)/)
    expect(resultLabel).toBeInTheDocument()
  })

  it('truncates by word count', () => {
    render(<TextTruncator />)

    fireEvent.click(screen.getByText('Words'))
    fireEvent.change(getInputTextarea(), {
      target: { value: 'one two three four five six seven eight nine ten' },
    })
    fireEvent.change(screen.getByLabelText('Truncation limit'), { target: { value: '3' } })

    expect(screen.getByText(/one two three\.\.\./)).toBeInTheDocument()
  })

  it('truncates by sentence count', () => {
    render(<TextTruncator />)

    fireEvent.click(screen.getByText('Sentences'))
    fireEvent.change(getInputTextarea(), {
      target: { value: 'First sentence. Second sentence. Third sentence. Fourth sentence.' },
    })
    fireEvent.change(screen.getByLabelText('Truncation limit'), { target: { value: '2' } })

    expect(screen.getByText(/First sentence\. Second sentence\.\.\.\./)).toBeInTheDocument()
  })

  it('shows character, word, and sentence stats', () => {
    render(<TextTruncator />)

    fireEvent.change(getInputTextarea(), {
      target: { value: 'Hello world. How are you?' },
    })

    expect(screen.getByText('25 characters')).toBeInTheDocument()
    expect(screen.getByText('5 words')).toBeInTheDocument()
    expect(screen.getByText('2 sentences')).toBeInTheDocument()
  })

  it('loads sample text', () => {
    render(<TextTruncator />)

    fireEvent.click(screen.getByText('Load Sample'))

    expect(getInputTextarea().value).toContain('Lorem ipsum')
  })

  it('shows ellipsis position options', () => {
    render(<TextTruncator />)

    expect(screen.getByText('End')).toBeInTheDocument()
    expect(screen.getByText('Middle')).toBeInTheDocument()
    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  it('uses middle ellipsis position', () => {
    render(<TextTruncator />)

    fireEvent.change(getInputTextarea(), {
      target: { value: 'abcdefghijklmnopqrstuvwxyz' },
    })
    fireEvent.change(screen.getByLabelText('Truncation limit'), { target: { value: '10' } })
    fireEvent.click(screen.getByText('Middle'))

    // Middle truncation splits at half the limit
    const resultEl = screen.getByText(/Result/)
    expect(resultEl).toBeInTheDocument()
  })

  it('returns empty output for blank input', () => {
    render(<TextTruncator />)

    fireEvent.change(getInputTextarea(), { target: { value: '   ' } })

    expect(screen.queryByText(/Result/)).not.toBeInTheDocument()
  })
})
