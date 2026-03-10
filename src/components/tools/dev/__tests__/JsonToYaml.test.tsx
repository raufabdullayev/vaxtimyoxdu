import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import JsonToYaml from '../JsonToYaml'

describe('JsonToYaml', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with JSON to YAML mode selected by default', () => {
    render(<JsonToYaml />)

    expect(screen.getByText('JSON to YAML')).toBeInTheDocument()
    expect(screen.getByText('YAML to JSON')).toBeInTheDocument()
    expect(screen.getByText('JSON Input')).toBeInTheDocument()
    expect(screen.getByText('YAML Output')).toBeInTheDocument()
  })

  it('renders the Convert and Clear buttons', () => {
    render(<JsonToYaml />)

    expect(screen.getByText('Convert')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('Load Sample')).toBeInTheDocument()
  })

  it('renders textareas with correct placeholders', () => {
    render(<JsonToYaml />)

    expect(screen.getByPlaceholderText('Paste your JSON here...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('YAML output will appear here...')).toBeInTheDocument()
  })

  it('converts valid JSON object to YAML', () => {
    render(<JsonToYaml />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"name": "Alice", "age": 30}' } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('YAML output') as HTMLTextAreaElement
    expect(output.value).toContain('name: Alice')
    expect(output.value).toContain('age: 30')
  })

  it('converts JSON with nested objects to YAML', () => {
    render(<JsonToYaml />)

    const json = JSON.stringify({ server: { host: 'localhost', port: 8080 } })
    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: json } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('YAML output') as HTMLTextAreaElement
    expect(output.value).toContain('server:')
    expect(output.value).toContain('host: localhost')
    expect(output.value).toContain('port: 8080')
  })

  it('converts JSON arrays to YAML', () => {
    render(<JsonToYaml />)

    const json = JSON.stringify({ items: ['apple', 'banana', 'cherry'] })
    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: json } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('YAML output') as HTMLTextAreaElement
    expect(output.value).toContain('items:')
    expect(output.value).toContain('- apple')
    expect(output.value).toContain('- banana')
    expect(output.value).toContain('- cherry')
  })

  it('converts JSON with boolean and null values to YAML', () => {
    render(<JsonToYaml />)

    const json = JSON.stringify({ enabled: true, disabled: false, value: null })
    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: json } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('YAML output') as HTMLTextAreaElement
    expect(output.value).toContain('enabled: true')
    expect(output.value).toContain('disabled: false')
    expect(output.value).toContain('value: null')
  })

  it('shows error for invalid JSON input', () => {
    render(<JsonToYaml />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{invalid json}' } })
    fireEvent.click(screen.getByText('Convert'))

    expect(screen.getByText(/Error:/)).toBeInTheDocument()
  })

  it('shows error for empty input', () => {
    render(<JsonToYaml />)

    fireEvent.click(screen.getByText('Convert'))

    expect(screen.getByText(/Error: Please enter some content to convert/)).toBeInTheDocument()
  })

  it('switches to YAML to JSON mode', () => {
    render(<JsonToYaml />)

    fireEvent.click(screen.getByText('YAML to JSON'))

    expect(screen.getByText('YAML Input')).toBeInTheDocument()
    expect(screen.getByText('JSON Output')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Paste your YAML here...')).toBeInTheDocument()
  })

  it('converts YAML back to JSON', () => {
    render(<JsonToYaml />)

    fireEvent.click(screen.getByText('YAML to JSON'))

    const input = screen.getByPlaceholderText('Paste your YAML here...')
    fireEvent.change(input, { target: { value: 'name: Alice\nage: 30' } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed.name).toBe('Alice')
    expect(parsed.age).toBe(30)
  })

  it('converts YAML with arrays back to JSON', () => {
    render(<JsonToYaml />)

    fireEvent.click(screen.getByText('YAML to JSON'))

    const yaml = 'fruits:\n  - apple\n  - banana\n  - cherry'
    const input = screen.getByPlaceholderText('Paste your YAML here...')
    fireEvent.change(input, { target: { value: yaml } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed.fruits).toEqual(['apple', 'banana', 'cherry'])
  })

  it('clears input and output when Clear button is clicked', () => {
    render(<JsonToYaml />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"key": "value"}' } })
    fireEvent.click(screen.getByText('Convert'))

    fireEvent.click(screen.getByText('Clear'))

    expect(input).toHaveValue('')
    const output = screen.getByLabelText('YAML output') as HTMLTextAreaElement
    expect(output.value).toBe('')
  })

  it('loads sample JSON data when Load Sample is clicked', () => {
    render(<JsonToYaml />)

    fireEvent.click(screen.getByText('Load Sample'))

    const input = screen.getByPlaceholderText('Paste your JSON here...')as HTMLTextAreaElement
    expect(input.value).toContain('server')
    expect(input.value).toContain('localhost')
    expect(input.value).toContain('8080')
  })

  it('loads sample YAML data in YAML to JSON mode', () => {
    render(<JsonToYaml />)

    fireEvent.click(screen.getByText('YAML to JSON'))
    fireEvent.click(screen.getByText('Load Sample'))

    const input = screen.getByPlaceholderText('Paste your YAML here...') as HTMLTextAreaElement
    expect(input.value).toContain('server:')
    expect(input.value).toContain('host: localhost')
  })

  it('copies output to clipboard when Copy button is clicked', async () => {
    render(<JsonToYaml />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"name": "test"}' } })
    fireEvent.click(screen.getByText('Convert'))

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled()
    })
  })

  it('shows Copied text after copying', async () => {
    render(<JsonToYaml />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"name": "test"}' } })
    fireEvent.click(screen.getByText('Convert'))

    fireEvent.click(screen.getByText('Copy'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('does not show Copy button when no output exists', () => {
    render(<JsonToYaml />)

    expect(screen.queryByText('Copy')).not.toBeInTheDocument()
  })

  it('clears input and output when switching direction', () => {
    render(<JsonToYaml />)

    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: '{"key": "value"}' } })
    fireEvent.click(screen.getByText('Convert'))

    fireEvent.click(screen.getByText('YAML to JSON'))

    const yamlInput = screen.getByPlaceholderText('Paste your YAML here...') as HTMLTextAreaElement
    expect(yamlInput.value).toBe('')
  })

  it('sets aria-pressed correctly on direction toggle buttons', () => {
    render(<JsonToYaml />)

    const jsonBtn = screen.getByText('JSON to YAML')
    const yamlBtn = screen.getByText('YAML to JSON')

    expect(jsonBtn).toHaveAttribute('aria-pressed', 'true')
    expect(yamlBtn).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(yamlBtn)

    expect(jsonBtn).toHaveAttribute('aria-pressed', 'false')
    expect(yamlBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('handles JSON with empty object and empty array', () => {
    render(<JsonToYaml />)

    const json = JSON.stringify({ emptyObj: {}, emptyArr: [] })
    const input = screen.getByPlaceholderText('Paste your JSON here...')
    fireEvent.change(input, { target: { value: json } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('YAML output') as HTMLTextAreaElement
    // The converter places empty values on the next line
    expect(output.value).toContain('emptyObj:')
    expect(output.value).toContain('{}')
    expect(output.value).toContain('emptyArr:')
    expect(output.value).toContain('[]')
  })
})
