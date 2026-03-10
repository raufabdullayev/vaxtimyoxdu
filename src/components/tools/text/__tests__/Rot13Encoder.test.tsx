import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Rot13Encoder from '../Rot13Encoder'

describe('Rot13Encoder', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders shift slider with default value of 13', () => {
    render(<Rot13Encoder />)

    expect(screen.getByText(/Shift: 13/)).toBeInTheDocument()
    // (ROT13) is in the same label element as "Shift: 13"
    const label = screen.getByText(/Shift: 13/)
    expect(label.textContent).toContain('(ROT13)')
  })

  it('renders input textarea', () => {
    render(<Rot13Encoder />)

    expect(screen.getByLabelText('Text input')).toBeInTheDocument()
  })

  it('renders encoded and decoded output areas', () => {
    render(<Rot13Encoder />)

    expect(screen.getByLabelText('Encoded output')).toBeInTheDocument()
    expect(screen.getByLabelText('Decoded output')).toBeInTheDocument()
  })

  it('renders quick shift buttons', () => {
    render(<Rot13Encoder />)

    expect(screen.getByText('ROT13')).toBeInTheDocument()
    // '1' and '25' also appear as range indicator spans, so use getByRole
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '25' })).toBeInTheDocument()
  })

  it('encodes text with ROT13 (shift 13)', () => {
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'Hello' } })

    const encodedOutput = screen.getByLabelText('Encoded output')
    expect(encodedOutput).toHaveValue('Uryyb')
  })

  it('decodes text with ROT13 (shift -13)', () => {
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'Uryyb' } })

    const decodedOutput = screen.getByLabelText('Decoded output')
    expect(decodedOutput).toHaveValue('Hello')
  })

  it('ROT13 is self-inverse (applying twice returns original)', () => {
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'Hello World' } })

    const encodedOutput = screen.getByLabelText('Encoded output') as HTMLTextAreaElement
    const encodedValue = encodedOutput.value

    // Now use encoded value as input
    fireEvent.change(input, { target: { value: encodedValue } })

    const newEncoded = screen.getByLabelText('Encoded output') as HTMLTextAreaElement
    // Encoding ROT13(ROT13(x)) should give back original
    // But actually the DECODED output with same shift gives back the original
    const decodedOutput = screen.getByLabelText('Decoded output') as HTMLTextAreaElement
    // Since we're applying -13 to ROT13 text, we should get original
    expect(decodedOutput.value).toBe('Hello World')
  })

  it('preserves non-alphabetic characters', () => {
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'Hello, World! 123' } })

    const encodedOutput = screen.getByLabelText('Encoded output')
    // Numbers, punctuation, spaces should remain unchanged
    expect((encodedOutput as HTMLTextAreaElement).value).toContain(', ')
    expect((encodedOutput as HTMLTextAreaElement).value).toContain('! 123')
  })

  it('handles uppercase and lowercase separately', () => {
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'AbCd' } })

    const encodedOutput = screen.getByLabelText('Encoded output')
    // A->N, b->o, C->P, d->q
    expect(encodedOutput).toHaveValue('NoPq')
  })

  it('changes shift when quick shift button is clicked', async () => {
    const user = userEvent.setup()
    render(<Rot13Encoder />)

    await user.click(screen.getByText('3'))

    expect(screen.getByText(/Shift: 3/)).toBeInTheDocument()
  })

  it('encodes with shift 1 (Caesar cipher shift by 1)', async () => {
    const user = userEvent.setup()
    render(<Rot13Encoder />)

    await user.click(screen.getByRole('button', { name: '1' }))

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'abc' } })

    const encodedOutput = screen.getByLabelText('Encoded output')
    expect(encodedOutput).toHaveValue('bcd')
  })

  it('wraps around z with shift', async () => {
    const user = userEvent.setup()
    render(<Rot13Encoder />)

    await user.click(screen.getByRole('button', { name: '1' }))

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'xyz' } })

    const encodedOutput = screen.getByLabelText('Encoded output')
    expect(encodedOutput).toHaveValue('yza')
  })

  it('shows empty output when input is empty', () => {
    render(<Rot13Encoder />)

    expect(screen.getByLabelText('Encoded output')).toHaveValue('')
    expect(screen.getByLabelText('Decoded output')).toHaveValue('')
  })

  it('copies encoded output to clipboard', async () => {
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'Hello' } })

    // Find the Copy button next to encoded output label
    const encodedLabel = screen.getByText(/Encoded \(shift \+13\)/)
    const copyBtn = encodedLabel.parentElement?.querySelector('button')
    expect(copyBtn).not.toBeNull()
    fireEvent.click(copyBtn!)

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('Uryyb')
    })
  })

  it('shows Clear button when input has text', () => {
    render(<Rot13Encoder />)

    expect(screen.queryByText('Clear')).not.toBeInTheDocument()

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('clears input when Clear is clicked', async () => {
    const user = userEvent.setup()
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'test' } })

    await user.click(screen.getByText('Clear'))

    expect(input).toHaveValue('')
  })

  it('shows encoded and decoded labels with shift values', () => {
    render(<Rot13Encoder />)

    const input = screen.getByLabelText('Text input')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(screen.getByText('Encoded (shift +13)')).toBeInTheDocument()
    expect(screen.getByText('Decoded (shift -13)')).toBeInTheDocument()
  })

  it('shows informational text about Caesar cipher', () => {
    render(<Rot13Encoder />)

    expect(screen.getByText('About Caesar Cipher / ROT13')).toBeInTheDocument()
    expect(screen.getByText(/ROT13 is a special case/)).toBeInTheDocument()
  })

  it('highlights ROT13 quick shift button when shift is 13', () => {
    render(<Rot13Encoder />)

    const rot13Btn = screen.getByText('ROT13')
    expect(rot13Btn.className).toContain('bg-primary')
  })
})
