import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MorseCode from '../MorseCode'

describe('MorseCode', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders direction toggle buttons', () => {
    render(<MorseCode />)

    expect(screen.getByText('Text to Morse')).toBeInTheDocument()
    expect(screen.getByText('Morse to Text')).toBeInTheDocument()
  })

  it('renders input and output textareas', () => {
    render(<MorseCode />)

    expect(screen.getByLabelText('Text input')).toBeInTheDocument()
    expect(screen.getByLabelText('Conversion output')).toBeInTheDocument()
  })

  it('converts text to morse code', () => {
    render(<MorseCode />)

    fireEvent.change(screen.getByLabelText('Text input'), { target: { value: 'SOS' } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output') as HTMLTextAreaElement
    expect(output.value).toBe('... --- ...')
  })

  it('converts text with spaces to morse with word separators', () => {
    render(<MorseCode />)

    fireEvent.change(screen.getByLabelText('Text input'), { target: { value: 'HI MOM' } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output') as HTMLTextAreaElement
    expect(output.value).toBe('.... .. / -- --- --')
  })

  it('converts morse code to text', () => {
    render(<MorseCode />)

    fireEvent.click(screen.getByText('Morse to Text'))
    fireEvent.change(screen.getByLabelText('Morse code input'), {
      target: { value: '... --- ...' },
    })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output') as HTMLTextAreaElement
    expect(output.value).toBe('SOS')
  })

  it('disables Convert button for empty input', () => {
    render(<MorseCode />)

    const convertBtn = screen.getByText('Convert')
    expect(convertBtn).toBeDisabled()
  })

  it('clears all fields', () => {
    render(<MorseCode />)

    fireEvent.change(screen.getByLabelText('Text input'), { target: { value: 'test' } })
    fireEvent.click(screen.getByText('Convert'))
    fireEvent.click(screen.getByText('Clear'))

    expect((screen.getByLabelText('Text input') as HTMLTextAreaElement).value).toBe('')
    expect((screen.getByLabelText('Conversion output') as HTMLTextAreaElement).value).toBe('')
  })

  it('swaps input and output', () => {
    render(<MorseCode />)

    fireEvent.change(screen.getByLabelText('Text input'), { target: { value: 'AB' } })
    fireEvent.click(screen.getByText('Convert'))

    const morseOutput = (screen.getByLabelText('Conversion output') as HTMLTextAreaElement).value
    expect(morseOutput).toBe('.- -...')

    fireEvent.click(screen.getByText('Swap'))

    // After swap, direction changes and input contains the previous output
    expect(screen.getByLabelText('Morse code input')).toBeInTheDocument()
  })

  it('shows morse code reference chart', () => {
    render(<MorseCode />)

    expect(screen.getByText('Morse Code Reference')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('.-')).toBeInTheDocument()
  })

  it('handles conversion of digits', () => {
    render(<MorseCode />)

    fireEvent.change(screen.getByLabelText('Text input'), { target: { value: '12' } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output') as HTMLTextAreaElement
    expect(output.value).toBe('.---- ..---')
  })

  it('copies output to clipboard', async () => {
    render(<MorseCode />)

    fireEvent.change(screen.getByLabelText('Text input'), { target: { value: 'A' } })
    fireEvent.click(screen.getByText('Convert'))
    fireEvent.click(screen.getByLabelText('Copy output'))

    expect(writeTextMock).toHaveBeenCalledWith('.-')
  })
})
