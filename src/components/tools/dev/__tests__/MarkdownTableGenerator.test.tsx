import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MarkdownTableGenerator from '../MarkdownTableGenerator'

describe('MarkdownTableGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with default 3x3 table', () => {
    render(<MarkdownTableGenerator />)
    // 3 rows + 1 header = 4 rows, 3 cols each = 12 inputs
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(12)
  })

  it('shows row and column controls', () => {
    render(<MarkdownTableGenerator />)
    expect(screen.getByText('Rows:')).toBeInTheDocument()
    expect(screen.getByText('Cols:')).toBeInTheDocument()
  })

  it('adds a row when + clicked', () => {
    render(<MarkdownTableGenerator />)
    const addRowBtn = screen.getAllByText('+')[0]
    fireEvent.click(addRowBtn)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(15) // 5 rows x 3 cols
  })

  it('removes a row when - clicked', () => {
    render(<MarkdownTableGenerator />)
    const removeRowBtn = screen.getAllByText('-')[0]
    fireEvent.click(removeRowBtn)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(9) // 3 rows x 3 cols
  })

  it('adds a column when + clicked', () => {
    render(<MarkdownTableGenerator />)
    const addColBtn = screen.getAllByText('+')[1]
    fireEvent.click(addColBtn)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(16) // 4 rows x 4 cols
  })

  it('removes a column when - clicked', () => {
    render(<MarkdownTableGenerator />)
    const removeColBtn = screen.getAllByText('-')[1]
    fireEvent.click(removeColBtn)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBe(8) // 4 rows x 2 cols
  })

  it('loads sample data', () => {
    render(<MarkdownTableGenerator />)
    fireEvent.click(screen.getByText('Load Sample'))
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Developer')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Bob')).toBeInTheDocument()
  })

  it('clears all data', () => {
    render(<MarkdownTableGenerator />)
    fireEvent.click(screen.getByText('Load Sample'))
    fireEvent.click(screen.getByText('Clear All'))
    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
    const nonEmpty = inputs.filter(i => i.value !== '')
    expect(nonEmpty.length).toBe(0)
  })

  it('generates markdown output', () => {
    render(<MarkdownTableGenerator />)
    fireEvent.click(screen.getByText('Load Sample'))
    const output = screen.getByText(/\|.*Name.*\|/)
    expect(output).toBeInTheDocument()
  })

  it('copies markdown to clipboard', () => {
    render(<MarkdownTableGenerator />)
    fireEvent.click(screen.getByText('Load Sample'))
    fireEvent.click(screen.getByText('Copy'))
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('updates cell value', () => {
    render(<MarkdownTableGenerator />)
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'Name' } })
    expect((inputs[0] as HTMLInputElement).value).toBe('Name')
  })

  it('toggles include header checkbox', () => {
    render(<MarkdownTableGenerator />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('does not exceed 20 rows max', () => {
    render(<MarkdownTableGenerator />)
    // Add rows to get near the limit
    const addRowBtn = screen.getAllByText('+')[0]
    for (let i = 0; i < 20; i++) {
      fireEvent.click(addRowBtn)
    }
    // Row count should be capped at 20
    const removeBtn = screen.getAllByText('-')[0]
    expect(removeBtn).not.toBeDisabled()
  })

  it('shows column alignment controls', () => {
    render(<MarkdownTableGenerator />)
    expect(screen.getByText('Column Alignment')).toBeInTheDocument()
    expect(screen.getAllByText('Left').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Center').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Right').length).toBeGreaterThan(0)
  })
})
