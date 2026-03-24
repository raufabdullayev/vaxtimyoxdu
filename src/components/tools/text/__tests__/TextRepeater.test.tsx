import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextRepeater from '../TextRepeater'

describe('TextRepeater', () => {
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
    return screen.getByLabelText('Text to repeat') as HTMLTextAreaElement
  }

  function getOutputTextarea(): HTMLTextAreaElement {
    return screen.getByLabelText('Repeated text output') as HTMLTextAreaElement
  }

  it('renders input textarea, count, and output', () => {
    render(<TextRepeater />)

    expect(getInputTextarea()).toBeInTheDocument()
    expect(screen.getByLabelText('Repeat count')).toBeInTheDocument()
    expect(getOutputTextarea()).toBeInTheDocument()
  })

  it('repeats text with default count of 5 using newline separator', () => {
    render(<TextRepeater />)

    fireEvent.change(getInputTextarea(), { target: { value: 'hello' } })

    const output = getOutputTextarea()
    const lines = output.value.split('\n')
    expect(lines).toHaveLength(5)
    expect(lines.every((l: string) => l === 'hello')).toBe(true)
  })

  it('uses comma separator', () => {
    render(<TextRepeater />)

    fireEvent.change(getInputTextarea(), { target: { value: 'hi' } })
    fireEvent.change(screen.getByLabelText('Separator type'), { target: { value: 'comma' } })

    expect(getOutputTextarea().value).toBe('hi, hi, hi, hi, hi')
  })

  it('uses space separator', () => {
    render(<TextRepeater />)

    fireEvent.change(getInputTextarea(), { target: { value: 'x' } })
    fireEvent.change(screen.getByLabelText('Repeat count'), { target: { value: '3' } })
    fireEvent.change(screen.getByLabelText('Separator type'), { target: { value: 'space' } })

    expect(getOutputTextarea().value).toBe('x x x')
  })

  it('applies prefix and suffix', () => {
    render(<TextRepeater />)

    fireEvent.change(getInputTextarea(), { target: { value: 'word' } })
    fireEvent.change(screen.getByLabelText('Repeat count'), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText('Prefix'), { target: { value: '<' } })
    fireEvent.change(screen.getByLabelText('Suffix'), { target: { value: '>' } })

    const lines = getOutputTextarea().value.split('\n')
    expect(lines[0]).toBe('<word>')
    expect(lines[1]).toBe('<word>')
  })

  it('adds dot numbering before text', async () => {
    const user = userEvent.setup()
    render(<TextRepeater />)

    fireEvent.change(getInputTextarea(), { target: { value: 'item' } })
    fireEvent.change(screen.getByLabelText('Repeat count'), { target: { value: '3' } })

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    const lines = getOutputTextarea().value.split('\n')
    expect(lines[0]).toBe('1. item')
    expect(lines[1]).toBe('2. item')
    expect(lines[2]).toBe('3. item')
  })

  it('returns empty output for empty input', () => {
    render(<TextRepeater />)

    expect(getOutputTextarea().value).toBe('')
  })

  it('copies output to clipboard', async () => {
    render(<TextRepeater />)

    fireEvent.change(getInputTextarea(), { target: { value: 'test' } })

    // Use fireEvent instead of userEvent for clipboard interaction
    fireEvent.click(screen.getByText('Copy to Clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled()
    })
  })

  it('clears all fields when Clear is clicked', async () => {
    const user = userEvent.setup()
    render(<TextRepeater />)

    fireEvent.change(getInputTextarea(), { target: { value: 'something' } })

    await user.click(screen.getByText('Clear'))

    expect(getInputTextarea().value).toBe('')
  })
})
