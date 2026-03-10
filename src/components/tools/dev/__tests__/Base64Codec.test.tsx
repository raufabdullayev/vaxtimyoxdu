import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Base64Codec from '../Base64Codec'

/**
 * The Base64Codec has two sets of buttons with the same text:
 *   - Mode toggle buttons (in .flex.items-center.gap-3): set encode/decode mode
 *   - Action button (in .flex.gap-3): triggers the encode/decode process
 *
 * The action button has class "px-6 py-2.5" while the mode toggles have "px-4 py-2".
 */
function getActionButton(): HTMLElement {
  const allButtons = screen.getAllByRole('button')
  const actionButton = allButtons.find(btn =>
    btn.className.includes('px-6') && btn.className.includes('py-2.5')
  )
  return actionButton!
}

function getModeToggleButton(text: string): HTMLElement {
  const allButtons = screen.getAllByRole('button')
  return allButtons.find(btn =>
    btn.textContent === text && btn.className.includes('px-4') && btn.className.includes('py-2 ')
  )!
}

describe('Base64Codec', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with Encode mode selected by default', () => {
    render(<Base64Codec />)

    expect(screen.getByText('Text to Encode')).toBeInTheDocument()
  })

  it('renders Encode and Decode mode toggle buttons', () => {
    render(<Base64Codec />)

    const encodeToggle = getModeToggleButton('Encode')
    expect(encodeToggle).toBeDefined()
    expect(encodeToggle.className).toContain('bg-primary')

    const decodeToggle = getModeToggleButton('Decode')
    expect(decodeToggle).toBeDefined()
  })

  it('encodes text to Base64', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    const input = screen.getByPlaceholderText('Enter text...')
    await user.type(input, 'Hello World')

    await user.click(getActionButton())

    expect(screen.getByText('Result')).toBeInTheDocument()
    expect(screen.getByDisplayValue('SGVsbG8gV29ybGQ=')).toBeInTheDocument()
  })

  it('decodes Base64 to text', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    await user.click(getModeToggleButton('Decode'))

    const input = screen.getByPlaceholderText('Enter Base64 string...')
    await user.type(input, 'SGVsbG8gV29ybGQ=')

    await user.click(getActionButton())

    expect(screen.getByDisplayValue('Hello World')).toBeInTheDocument()
  })

  it('handles UTF-8 characters in encoding', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    const input = screen.getByPlaceholderText('Enter text...')
    await user.type(input, 'test123')

    await user.click(getActionButton())

    // test123 -> dGVzdDEyMw==
    expect(screen.getByDisplayValue('dGVzdDEyMw==')).toBeInTheDocument()
  })

  it('shows error for invalid Base64 when decoding', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    await user.click(getModeToggleButton('Decode'))

    const input = screen.getByPlaceholderText('Enter Base64 string...')
    await user.type(input, '!!!invalid!!!')

    await user.click(getActionButton())

    expect(screen.getByText('Invalid Base64 string')).toBeInTheDocument()
  })

  it('shows error for empty input on encode', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    await user.click(getActionButton())

    expect(screen.getByText('Please enter text')).toBeInTheDocument()
  })

  it('shows error for empty input on decode', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    await user.click(getModeToggleButton('Decode'))
    await user.click(getActionButton())

    expect(screen.getByText('Please enter text')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<Base64Codec />)

    const input = screen.getByPlaceholderText('Enter text...')
    fireEvent.change(input, { target: { value: 'Hello' } })
    fireEvent.click(getActionButton())

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('SGVsbG8=')
    })
  })

  it('swaps output to input and changes mode', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    const input = screen.getByPlaceholderText('Enter text...')
    await user.type(input, 'Hello')

    await user.click(getActionButton())

    await user.click(screen.getByText('Swap'))

    // After swap, mode should change to decode and input should have encoded value
    expect(screen.getByText('Base64 to Decode')).toBeInTheDocument()
    expect(screen.getByDisplayValue('SGVsbG8=')).toBeInTheDocument()
  })

  it('changes label text when switching to decode mode', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    expect(screen.getByText('Text to Encode')).toBeInTheDocument()

    await user.click(getModeToggleButton('Decode'))

    expect(screen.getByText('Base64 to Decode')).toBeInTheDocument()
  })

  it('changes placeholder when switching to decode mode', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()

    await user.click(getModeToggleButton('Decode'))

    expect(screen.getByPlaceholderText('Enter Base64 string...')).toBeInTheDocument()
  })

  it('does not show result section when no output exists', () => {
    render(<Base64Codec />)

    expect(screen.queryByText('Result')).not.toBeInTheDocument()
  })

  it('does not show Swap button when no output exists', () => {
    render(<Base64Codec />)

    expect(screen.queryByText('Swap')).not.toBeInTheDocument()
  })

  it('clears error when switching modes', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    // Trigger error
    await user.click(getActionButton())
    expect(screen.getByText('Please enter text')).toBeInTheDocument()

    // Switch mode should clear error
    await user.click(getModeToggleButton('Decode'))

    expect(screen.queryByText('Please enter text')).not.toBeInTheDocument()
  })

  it('shows Swap button only when output exists', async () => {
    const user = userEvent.setup()
    render(<Base64Codec />)

    expect(screen.queryByText('Swap')).not.toBeInTheDocument()

    const input = screen.getByPlaceholderText('Enter text...')
    await user.type(input, 'test')
    await user.click(getActionButton())

    expect(screen.getByText('Swap')).toBeInTheDocument()
  })
})
