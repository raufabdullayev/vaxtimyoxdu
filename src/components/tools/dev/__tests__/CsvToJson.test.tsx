import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CsvToJson from '../CsvToJson'

describe('CsvToJson', () => {
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
    render(<CsvToJson />)
    expect(screen.getByLabelText('CSV input')).toBeInTheDocument()
    expect(screen.getByLabelText('JSON output')).toBeInTheDocument()
    expect(screen.getByLabelText('Convert CSV to JSON')).toBeInTheDocument()
  })

  it('converts simple CSV with headers', () => {
    render(<CsvToJson />)
    const input = screen.getByLabelText('CSV input')
    fireEvent.change(input, { target: { value: 'name,age\nAlice,30\nBob,25' } })
    fireEvent.click(screen.getByLabelText('Convert CSV to JSON'))

    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ])
  })

  it('converts CSV without headers', () => {
    render(<CsvToJson />)
    fireEvent.click(screen.getByLabelText('First row as headers'))
    fireEvent.change(screen.getByLabelText('CSV input'), { target: { value: 'Alice,30\nBob,25' } })
    fireEvent.click(screen.getByLabelText('Convert CSV to JSON'))

    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed).toEqual([['Alice', '30'], ['Bob', '25']])
  })

  it('shows error for empty input', () => {
    render(<CsvToJson />)
    fireEvent.click(screen.getByLabelText('Convert CSV to JSON'))
    expect(screen.getByText('Please enter CSV data')).toBeInTheDocument()
  })

  it('loads sample data', () => {
    render(<CsvToJson />)
    fireEvent.click(screen.getByLabelText('Load sample CSV'))
    const input = screen.getByLabelText('CSV input') as HTMLTextAreaElement
    expect(input.value).toContain('Alice Johnson')
  })

  it('handles quoted CSV values', () => {
    render(<CsvToJson />)
    fireEvent.change(screen.getByLabelText('CSV input'), {
      target: { value: 'name,city\n"Dave","Los Angeles"' },
    })
    fireEvent.click(screen.getByLabelText('Convert CSV to JSON'))

    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed[0].city).toBe('Los Angeles')
  })

  it('handles semicolon delimiter', () => {
    render(<CsvToJson />)
    fireEvent.change(screen.getByLabelText('Select delimiter'), { target: { value: ';' } })
    fireEvent.change(screen.getByLabelText('CSV input'), { target: { value: 'name;age\nAlice;30' } })
    fireEvent.click(screen.getByLabelText('Convert CSV to JSON'))

    const output = screen.getByLabelText('JSON output') as HTMLTextAreaElement
    const parsed = JSON.parse(output.value)
    expect(parsed[0].name).toBe('Alice')
  })

  it('shows row count after conversion', () => {
    render(<CsvToJson />)
    fireEvent.change(screen.getByLabelText('CSV input'), { target: { value: 'name\nA\nB\nC' } })
    fireEvent.click(screen.getByLabelText('Convert CSV to JSON'))
    expect(screen.getByText('(3 rows)')).toBeInTheDocument()
  })

  it('copies output to clipboard', () => {
    render(<CsvToJson />)
    fireEvent.change(screen.getByLabelText('CSV input'), { target: { value: 'name\nAlice' } })
    fireEvent.click(screen.getByLabelText('Convert CSV to JSON'))
    fireEvent.click(screen.getByLabelText('Copy JSON output'))
    expect(writeTextMock).toHaveBeenCalled()
  })
})
