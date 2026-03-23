import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HtmlEntityCodec from '../HtmlEntityCodec'

describe('HtmlEntityCodec', () => {
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
    return screen.getByPlaceholderText('Enter text with special characters or HTML entities...') as HTMLTextAreaElement
  }

  function getOutputTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Result will appear here...') as HTMLTextAreaElement
  }

  it('renders input and output textareas', () => {
    render(<HtmlEntityCodec />)

    expect(getInputTextarea()).toBeInTheDocument()
    expect(getOutputTextarea()).toBeInTheDocument()
  })

  it('renders Encode and Decode buttons', () => {
    render(<HtmlEntityCodec />)

    expect(screen.getByLabelText('Encode to HTML entities')).toBeInTheDocument()
    expect(screen.getByLabelText('Decode HTML entities')).toBeInTheDocument()
  })

  it('encodes < to &lt;', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, '<div>')
    await user.click(screen.getByLabelText('Encode to HTML entities'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('&lt;div&gt;')
  })

  it('encodes > to &gt;', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, 'a > b')
    await user.click(screen.getByLabelText('Encode to HTML entities'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('a &gt; b')
  })

  it('encodes & to &amp;', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, 'foo & bar')
    await user.click(screen.getByLabelText('Encode to HTML entities'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('foo &amp; bar')
  })

  it('encodes double quotes to &quot;', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, 'say "hello"')
    await user.click(screen.getByLabelText('Encode to HTML entities'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('say &quot;hello&quot;')
  })

  it('decodes &lt; to <', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, '&lt;div&gt;')
    await user.click(screen.getByLabelText('Decode HTML entities'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('<div>')
  })

  it('decodes &amp; to &', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, 'foo &amp; bar')
    await user.click(screen.getByLabelText('Decode HTML entities'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('foo & bar')
  })

  it('round-trip encode then decode produces original text', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, '<p>Hello & "world"</p>')
    await user.click(screen.getByLabelText('Encode to HTML entities'))

    const output = getOutputTextarea()
    const encoded = output.value

    // Now swap and decode
    await user.click(screen.getByLabelText('Swap output to input'))

    // After swap, input should have the encoded value
    expect(input).toHaveValue(encoded)

    await user.click(screen.getByLabelText('Decode HTML entities'))

    expect(output).toHaveValue('<p>Hello & "world"</p>')
  })

  it('shows error when encoding empty input', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    await user.click(screen.getByLabelText('Encode to HTML entities'))

    expect(screen.getByText('Please enter text to encode')).toBeInTheDocument()
  })

  it('shows error when decoding empty input', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    await user.click(screen.getByLabelText('Decode HTML entities'))

    expect(screen.getByText('Please enter text to decode')).toBeInTheDocument()
  })

  it('handles already encoded text by decoding it', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, '&lt;&gt;&amp;&quot;')
    await user.click(screen.getByLabelText('Decode HTML entities'))

    const output = getOutputTextarea()
    expect(output).toHaveValue('<>&"')
  })

  it('copies output to clipboard', async () => {
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: '<div>' } })
    fireEvent.click(screen.getByLabelText('Encode to HTML entities'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('&lt;div&gt;')
    })
  })

  it('clears all fields when Clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    const input = getInputTextarea()
    await user.type(input, '<div>')
    await user.click(screen.getByLabelText('Encode to HTML entities'))

    await user.click(screen.getByLabelText('Clear all fields'))

    expect(input).toHaveValue('')
    expect(getOutputTextarea()).toHaveValue('')
  })

  it('renders the HTML entities reference table', () => {
    render(<HtmlEntityCodec />)

    expect(screen.getByText('Common HTML Entities Reference')).toBeInTheDocument()
    expect(screen.getByText('Ampersand')).toBeInTheDocument()
    expect(screen.getByText('Less than')).toBeInTheDocument()
    expect(screen.getByText('Greater than')).toBeInTheDocument()
    expect(screen.getByText('Copyright')).toBeInTheDocument()
  })

  it('shows Swap button only when output exists', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityCodec />)

    expect(screen.queryByLabelText('Swap output to input')).not.toBeInTheDocument()

    const input = getInputTextarea()
    await user.type(input, 'test')
    await user.click(screen.getByLabelText('Encode to HTML entities'))

    expect(screen.getByLabelText('Swap output to input')).toBeInTheDocument()
  })
})
