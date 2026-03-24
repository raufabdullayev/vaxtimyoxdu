import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import YamlToJson from '../YamlToJson'

describe('YamlToJson', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders input and output areas', () => {
    render(<YamlToJson />)
    expect(screen.getByLabelText('YAML input')).toBeInTheDocument()
    expect(screen.getByLabelText('JSON output')).toBeInTheDocument()
  })

  it('converts simple YAML key-value pairs', () => {
    render(<YamlToJson />)
    fireEvent.change(screen.getByLabelText('YAML input'), {
      target: { value: 'name: Alice\nage: 30' },
    })
    fireEvent.click(screen.getByText('Convert to JSON'))

    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed.name).toBe('Alice')
    expect(parsed.age).toBe(30)
  })

  it('shows error for empty input', () => {
    render(<YamlToJson />)
    fireEvent.click(screen.getByText('Convert to JSON'))
    expect(screen.getByText(/Please enter YAML content to convert/)).toBeInTheDocument()
  })

  it('loads sample data', () => {
    render(<YamlToJson />)
    fireEvent.click(screen.getByText('Load Sample'))
    const input = screen.getByLabelText('YAML input') as HTMLTextAreaElement
    expect(input.value).toContain('server')
  })

  it('clears inputs', () => {
    render(<YamlToJson />)
    fireEvent.change(screen.getByLabelText('YAML input'), { target: { value: 'test: value' } })
    fireEvent.click(screen.getByText('Clear'))
    expect((screen.getByLabelText('YAML input') as HTMLTextAreaElement).value).toBe('')
  })

  it('copies output to clipboard', () => {
    render(<YamlToJson />)
    fireEvent.change(screen.getByLabelText('YAML input'), { target: { value: 'key: value' } })
    fireEvent.click(screen.getByText('Convert to JSON'))
    fireEvent.click(screen.getByLabelText('Copy JSON output'))
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('handles boolean values', () => {
    render(<YamlToJson />)
    fireEvent.change(screen.getByLabelText('YAML input'), {
      target: { value: 'enabled: true\ndisabled: false' },
    })
    fireEvent.click(screen.getByText('Convert to JSON'))
    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed.enabled).toBe(true)
    expect(parsed.disabled).toBe(false)
  })

  it('handles null values', () => {
    render(<YamlToJson />)
    fireEvent.change(screen.getByLabelText('YAML input'), {
      target: { value: 'empty: null' },
    })
    fireEvent.click(screen.getByText('Convert to JSON'))
    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed.empty).toBeNull()
  })

  it('changes JSON indentation', () => {
    render(<YamlToJson />)
    fireEvent.change(screen.getByLabelText('JSON indentation'), { target: { value: '4' } })
    fireEvent.change(screen.getByLabelText('YAML input'), { target: { value: 'key: val' } })
    fireEvent.click(screen.getByText('Convert to JSON'))
    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    expect(output.value).toContain('    ') // 4 spaces
  })

  it('handles YAML list', () => {
    render(<YamlToJson />)
    fireEvent.change(screen.getByLabelText('YAML input'), {
      target: { value: 'items:\n  - one\n  - two\n  - three' },
    })
    fireEvent.click(screen.getByText('Convert to JSON'))
    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed.items).toEqual(['one', 'two', 'three'])
  })
})
