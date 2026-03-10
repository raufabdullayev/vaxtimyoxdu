import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextToBinary from '../TextToBinary'

describe('TextToBinary', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders format buttons (Binary, Hexadecimal, Octal)', () => {
    render(<TextToBinary />)

    expect(screen.getByText('Binary')).toBeInTheDocument()
    expect(screen.getByText('Hexadecimal')).toBeInTheDocument()
    expect(screen.getByText('Octal')).toBeInTheDocument()
  })

  it('renders direction buttons', () => {
    render(<TextToBinary />)

    expect(screen.getByText('Text to Binary')).toBeInTheDocument()
    expect(screen.getByText('Binary to Text')).toBeInTheDocument()
  })

  it('has Binary mode selected by default', () => {
    render(<TextToBinary />)

    const binaryBtn = screen.getByText('Binary')
    expect(binaryBtn.className).toContain('bg-primary')
  })

  it('has Encode direction selected by default', () => {
    render(<TextToBinary />)

    const encodeBtn = screen.getByText('Text to Binary')
    expect(encodeBtn.className).toContain('bg-primary')
  })

  it('renders input and output textareas', () => {
    render(<TextToBinary />)

    expect(screen.getByLabelText('Conversion input')).toBeInTheDocument()
    expect(screen.getByLabelText('Conversion output')).toBeInTheDocument()
  })

  it('converts text to binary', () => {
    render(<TextToBinary />)

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'Hi' } })

    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output')
    // H = 01001000, i = 01101001
    expect(output).toHaveValue('01001000 01101001')
  })

  it('converts binary to text', async () => {
    const user = userEvent.setup()
    render(<TextToBinary />)

    await user.click(screen.getByText('Binary to Text'))

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: '01001000 01101001' } })

    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output')
    expect(output).toHaveValue('Hi')
  })

  it('converts text to hexadecimal', async () => {
    const user = userEvent.setup()
    render(<TextToBinary />)

    await user.click(screen.getByText('Hexadecimal'))

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'Hi' } })

    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output')
    // H = 48, i = 69
    expect(output).toHaveValue('48 69')
  })

  it('converts hexadecimal to text', async () => {
    const user = userEvent.setup()
    render(<TextToBinary />)

    await user.click(screen.getByText('Hexadecimal'))
    await user.click(screen.getByText('Hexadecimal to Text'))

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: '48 69' } })

    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output')
    expect(output).toHaveValue('Hi')
  })

  it('converts text to octal', async () => {
    const user = userEvent.setup()
    render(<TextToBinary />)

    await user.click(screen.getByText('Octal'))

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'A' } })

    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output')
    // A = 101 in octal
    expect(output).toHaveValue('101')
  })

  it('converts octal to text', async () => {
    const user = userEvent.setup()
    render(<TextToBinary />)

    await user.click(screen.getByText('Octal'))
    await user.click(screen.getByText('Octal to Text'))

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: '101' } })

    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('Conversion output')
    expect(output).toHaveValue('A')
  })

  it('shows error when input is cleared after entering text', () => {
    render(<TextToBinary />)

    const input = screen.getByLabelText('Conversion input')
    // Enter text so button becomes enabled
    fireEvent.change(input, { target: { value: 'test' } })
    // Clear the input
    fireEvent.change(input, { target: { value: '  ' } })
    // Button should be disabled with whitespace-only input
    expect(screen.getByText('Convert')).toBeDisabled()
  })

  it('shows error for invalid binary input when decoding', async () => {
    const user = userEvent.setup()
    render(<TextToBinary />)

    await user.click(screen.getByText('Binary to Text'))

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'xyz' } })

    fireEvent.click(screen.getByText('Convert'))

    expect(screen.getByText(/Invalid binary/)).toBeInTheDocument()
  })

  it('shows Swap button only when output exists', () => {
    render(<TextToBinary />)

    expect(screen.queryByText('Swap')).not.toBeInTheDocument()

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(screen.getByText('Convert'))

    expect(screen.getByText('Swap')).toBeInTheDocument()
  })

  it('swaps output to input and reverses direction', () => {
    render(<TextToBinary />)

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'Hi' } })
    fireEvent.click(screen.getByText('Convert'))

    // Output should be binary
    const output = screen.getByLabelText('Conversion output')
    expect(output).toHaveValue('01001000 01101001')

    // Swap
    fireEvent.click(screen.getByText('Swap'))

    // Input should now have the binary, direction should be decode
    expect(screen.getByLabelText('Conversion input')).toHaveValue('01001000 01101001')
    expect(screen.getByText('Binary to Text').className).toContain('bg-primary')
  })

  it('clears all fields when Clear is clicked', () => {
    render(<TextToBinary />)

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(screen.getByText('Convert'))

    fireEvent.click(screen.getByText('Clear'))

    expect(screen.getByLabelText('Conversion input')).toHaveValue('')
    expect(screen.getByLabelText('Conversion output')).toHaveValue('')
  })

  it('shows Copy button when output exists', () => {
    render(<TextToBinary />)

    expect(screen.queryByText('Copy')).not.toBeInTheDocument()

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(screen.getByText('Convert'))

    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<TextToBinary />)

    const input = screen.getByLabelText('Conversion input')
    fireEvent.change(input, { target: { value: 'A' } })
    fireEvent.click(screen.getByText('Convert'))

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('01000001')
    })
  })

  it('updates direction labels when mode changes', async () => {
    const user = userEvent.setup()
    render(<TextToBinary />)

    expect(screen.getByText('Text to Binary')).toBeInTheDocument()

    await user.click(screen.getByText('Hexadecimal'))

    expect(screen.getByText('Text to Hexadecimal')).toBeInTheDocument()
    expect(screen.getByText('Hexadecimal to Text')).toBeInTheDocument()
  })

  it('disables Convert button when input is empty', () => {
    render(<TextToBinary />)

    expect(screen.getByText('Convert')).toBeDisabled()
  })
})
