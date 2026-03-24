import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import JsonPathFinder from '../JsonPathFinder'

describe('JsonPathFinder', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders JSON input textarea', () => {
    render(<JsonPathFinder />)
    expect(screen.getByLabelText('JSON input')).toBeInTheDocument()
  })

  it('loads sample JSON', () => {
    render(<JsonPathFinder />)
    fireEvent.click(screen.getByText('Load Sample'))
    const textarea = screen.getByLabelText('JSON input') as HTMLTextAreaElement
    expect(textarea.value).toContain('John Doe')
    expect(textarea.value).toContain('hobbies')
  })

  it('displays tree view after valid JSON input', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"name":"test","age":25}' } })
    expect(screen.getByText('JSON Tree (click to select path)')).toBeInTheDocument()
    expect(screen.getByText('name')).toBeInTheDocument()
    expect(screen.getByText('age')).toBeInTheDocument()
  })

  it('shows error for invalid JSON', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{invalid json' } })
    expect(screen.getByText(/Invalid JSON:/)).toBeInTheDocument()
  })

  it('shows path input when JSON is valid', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"key":"value"}' } })
    expect(screen.getByLabelText('JSON path expression')).toBeInTheDocument()
  })

  it('shows value at queried path', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"name":"John","age":30}' } })
    const pathInput = screen.getByLabelText('JSON path expression')
    fireEvent.change(pathInput, { target: { value: '$.name' } })
    expect(screen.getByText('Value at Path')).toBeInTheDocument()
    // Value appears in tree and in result panel
    expect(screen.getAllByText('"John"').length).toBeGreaterThanOrEqual(1)
  })

  it('handles nested object paths', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"a":{"b":{"c":42}}}' } })
    const pathInput = screen.getByLabelText('JSON path expression')
    fireEvent.change(pathInput, { target: { value: '$.a.b.c' } })
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('handles array index paths', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"items":["a","b","c"]}' } })
    const pathInput = screen.getByLabelText('JSON path expression')
    fireEvent.change(pathInput, { target: { value: '$.items[1]' } })
    expect(screen.getByText('Value at Path')).toBeInTheDocument()
    expect(screen.getAllByText('"b"').length).toBeGreaterThanOrEqual(1)
  })

  it('displays correct type for null values', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"val":null}' } })
    expect(screen.getByText('null')).toBeInTheDocument()
  })

  it('displays correct type for boolean values', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"active":true}' } })
    expect(screen.getByText('true')).toBeInTheDocument()
  })

  it('displays array type with count', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"items":[1,2,3]}' } })
    expect(screen.getByText('[3]')).toBeInTheDocument()
  })

  it('displays object type with count', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"nested":{"a":1,"b":2}}' } })
    expect(screen.getByText('{2}')).toBeInTheDocument()
  })

  it('copies path to clipboard', () => {
    render(<JsonPathFinder />)
    const textarea = screen.getByLabelText('JSON input')
    fireEvent.change(textarea, { target: { value: '{"key":"val"}' } })
    const pathInput = screen.getByLabelText('JSON path expression')
    fireEvent.change(pathInput, { target: { value: '$.key' } })
    fireEvent.click(screen.getByText('Copy Path'))
    expect(writeTextMock).toHaveBeenCalledWith('$.key')
  })
})
