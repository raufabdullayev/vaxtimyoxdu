import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UrlCodec from '../UrlCodec'

describe('UrlCodec', () => {
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
    return screen.getByPlaceholderText('Enter text to encode or decode...') as HTMLTextAreaElement
  }

  function getOutputTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Result will appear here...') as HTMLTextAreaElement
  }

  it('renders input and output textareas', () => {
    render(<UrlCodec />)

    expect(getInputTextarea()).toBeInTheDocument()
    expect(getOutputTextarea()).toBeInTheDocument()
  })

  it('renders Encode and Decode buttons', () => {
    render(<UrlCodec />)

    expect(screen.getByLabelText('URL encode')).toBeInTheDocument()
    expect(screen.getByLabelText('URL decode')).toBeInTheDocument()
  })

  it('encodes a URL with special characters', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, 'hello world')
    await user.click(screen.getByLabelText('URL encode'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('hello%20world')
  })

  it('encodes special characters like &, =, ?', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, 'key=value&foo=bar')
    await user.click(screen.getByLabelText('URL encode'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('key%3Dvalue%26foo%3Dbar')
  })

  it('decodes a URL-encoded string', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, 'hello%20world')
    await user.click(screen.getByLabelText('URL decode'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('hello world')
  })

  it('decodes complex encoded URLs', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, 'key%3Dvalue%26foo%3Dbar')
    await user.click(screen.getByLabelText('URL decode'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('key=value&foo=bar')
  })

  it('handles already encoded URLs idempotently when decoded twice', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, 'hello%20world')
    await user.click(screen.getByLabelText('URL decode'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('hello world')
  })

  it('shows error when encoding empty input', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    await user.click(screen.getByLabelText('URL encode'))

    expect(screen.getByText('Please enter text to encode')).toBeInTheDocument()
  })

  it('shows error when decoding empty input', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    await user.click(screen.getByLabelText('URL decode'))

    expect(screen.getByText('Please enter text to decode')).toBeInTheDocument()
  })

  it('shows error for invalid percent-encoded input', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, '%ZZ%invalid')
    await user.click(screen.getByLabelText('URL decode'))

    expect(screen.getByText('Invalid URL-encoded string. Check for malformed percent-encoding sequences.')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<UrlCodec />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'hello world' } })
    fireEvent.click(screen.getByLabelText('URL encode'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('hello%20world')
    })
  })

  it('shows "copied" after copying', async () => {
    render(<UrlCodec />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'hello world' } })
    fireEvent.click(screen.getByLabelText('URL encode'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(screen.getByText('copied')).toBeInTheDocument()
    })
  })

  it('clears all fields when Clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, 'hello world')
    await user.click(screen.getByLabelText('URL encode'))

    await user.click(screen.getByLabelText('Clear all fields'))

    expect(input).toHaveValue('')
    expect(getOutputTextarea()).toHaveValue('')
  })

  it('swaps output to input', async () => {
    const user = userEvent.setup()
    render(<UrlCodec />)

    const input = getInputTextarea()
    await user.type(input, 'hello world')
    await user.click(screen.getByLabelText('URL encode'))

    await user.click(screen.getByLabelText('Swap output to input'))

    expect(input).toHaveValue('hello%20world')
    expect(getOutputTextarea()).toHaveValue('')
  })

  it('does not show Copy button when output is empty', () => {
    render(<UrlCodec />)

    expect(screen.queryByLabelText('Copy output to clipboard')).not.toBeInTheDocument()
  })

  it('does not show Swap button when output is empty', () => {
    render(<UrlCodec />)

    expect(screen.queryByLabelText('Swap output to input')).not.toBeInTheDocument()
  })
})
