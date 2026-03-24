import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import JsonToCsv from '../JsonToCsv'

describe('JsonToCsv', () => {
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
    render(<JsonToCsv />)
    expect(screen.getByLabelText('JSON input')).toBeInTheDocument()
    expect(screen.getByLabelText('CSV output')).toBeInTheDocument()
  })

  it('converts JSON array to CSV', () => {
    render(<JsonToCsv />)
    const json = JSON.stringify([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }])
    fireEvent.change(screen.getByLabelText('JSON input'), { target: { value: json } })
    fireEvent.click(screen.getByText('Convert'))

    const output = screen.getByLabelText('CSV output') as HTMLTextAreaElement
    expect(output.value).toContain('name')
    expect(output.value).toContain('Alice')
    expect(output.value).toContain('Bob')
  })

  it('disables convert button when input is empty', () => {
    render(<JsonToCsv />)
    expect(screen.getByText('Convert')).toBeDisabled()
  })

  it('shows error for non-array JSON', () => {
    render(<JsonToCsv />)
    fireEvent.change(screen.getByLabelText('JSON input'), { target: { value: '{"key": "value"}' } })
    fireEvent.click(screen.getByText('Convert'))
    expect(screen.getByText('Input must be a JSON array of objects')).toBeInTheDocument()
  })

  it('shows error for empty array', () => {
    render(<JsonToCsv />)
    fireEvent.change(screen.getByLabelText('JSON input'), { target: { value: '[]' } })
    fireEvent.click(screen.getByText('Convert'))
    expect(screen.getByText('Array is empty')).toBeInTheDocument()
  })

  it('loads example data', () => {
    render(<JsonToCsv />)
    fireEvent.click(screen.getByText('Load Example'))
    const input = screen.getByLabelText('JSON input') as HTMLTextAreaElement
    expect(input.value).toContain('Alice')
  })

  it('clears inputs', () => {
    render(<JsonToCsv />)
    fireEvent.change(screen.getByLabelText('JSON input'), { target: { value: 'test' } })
    fireEvent.click(screen.getByText('Clear'))
    expect((screen.getByLabelText('JSON input') as HTMLTextAreaElement).value).toBe('')
  })

  it('copies output to clipboard', () => {
    render(<JsonToCsv />)
    const json = JSON.stringify([{ name: 'Test' }])
    fireEvent.change(screen.getByLabelText('JSON input'), { target: { value: json } })
    fireEvent.click(screen.getByText('Convert'))
    fireEvent.click(screen.getByText('Copy'))
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('shows error for invalid JSON', () => {
    render(<JsonToCsv />)
    fireEvent.change(screen.getByLabelText('JSON input'), { target: { value: 'not json' } })
    fireEvent.click(screen.getByText('Convert'))
    expect(screen.getByText(/Unexpected token/i)).toBeTruthy()
  })
})
