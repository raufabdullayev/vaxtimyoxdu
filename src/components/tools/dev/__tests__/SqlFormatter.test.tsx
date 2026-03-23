import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SqlFormatter from '../SqlFormatter'

describe('SqlFormatter', () => {
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
    return screen.getByPlaceholderText('Paste your SQL query here...') as HTMLTextAreaElement
  }

  function getOutputTextarea(): HTMLTextAreaElement {
    return screen.getByPlaceholderText('Formatted SQL will appear here...') as HTMLTextAreaElement
  }

  it('renders input and output textareas', () => {
    render(<SqlFormatter />)

    expect(getInputTextarea()).toBeInTheDocument()
    expect(getOutputTextarea()).toBeInTheDocument()
  })

  it('renders Format, Compact, and Clear buttons', () => {
    render(<SqlFormatter />)

    expect(screen.getByText('Format')).toBeInTheDocument()
    expect(screen.getByText('Compact')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('renders Load Example button', () => {
    render(<SqlFormatter />)

    expect(screen.getByText('Load Example')).toBeInTheDocument()
  })

  it('disables Format and Compact when input is empty', () => {
    render(<SqlFormatter />)

    expect(screen.getByText('Format')).toBeDisabled()
    expect(screen.getByText('Compact')).toBeDisabled()
  })

  it('enables buttons when input has content', () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT * FROM users' } })

    expect(screen.getByText('Format')).not.toBeDisabled()
    expect(screen.getByText('Compact')).not.toBeDisabled()
  })

  it('formats a simple SELECT statement', () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT id, name FROM users WHERE id = 1' } })

    fireEvent.click(screen.getByText('Format'))

    const outputValue = getOutputTextarea().value
    expect(outputValue).toContain('SELECT')
    expect(outputValue).toContain('FROM')
    expect(outputValue).toContain('WHERE')
    // Keywords should be on separate lines
    expect(outputValue).toContain('\n')
  })

  it('compacts SQL by collapsing whitespace', () => {
    render(<SqlFormatter />)

    const sql = 'SELECT\n  id,\n  name\nFROM\n  users\nWHERE\n  id = 1'
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: sql } })

    fireEvent.click(screen.getByText('Compact'))

    const outputValue = getOutputTextarea().value
    // Should be on a single line (no newlines within the query)
    expect(outputValue).not.toContain('\n')
    expect(outputValue).toContain('SELECT')
    expect(outputValue).toContain('FROM')
  })

  it('loads example SQL when Load Example is clicked', () => {
    render(<SqlFormatter />)

    fireEvent.click(screen.getByText('Load Example'))

    const value = getInputTextarea().value
    expect(value).toContain('SELECT')
    expect(value).toContain('users')
    expect(value).toContain('LEFT JOIN')
  })

  it('clears input and output when Clear is clicked', () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT * FROM test' } })
    fireEvent.click(screen.getByText('Format'))

    fireEvent.click(screen.getByText('Clear'))

    expect(input).toHaveValue('')
    expect(getOutputTextarea()).toHaveValue('')
  })

  it('shows Copy button only when output exists', () => {
    render(<SqlFormatter />)

    expect(screen.queryByLabelText('Copy output to clipboard')).not.toBeInTheDocument()

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT 1' } })
    fireEvent.click(screen.getByText('Format'))

    expect(screen.getByLabelText('Copy output to clipboard')).toBeInTheDocument()
  })

  it('copies output to clipboard', async () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT 1' } })
    fireEvent.click(screen.getByText('Format'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(1)
    })
  })

  it('shows "Copied!" after copying', async () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT 1' } })
    fireEvent.click(screen.getByText('Format'))

    fireEvent.click(screen.getByLabelText('Copy output to clipboard'))

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  it('formats SQL keywords to uppercase', () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'select id from users where active = true' } })

    fireEvent.click(screen.getByText('Format'))

    const outputValue = getOutputTextarea().value
    expect(outputValue).toContain('SELECT')
    expect(outputValue).toContain('FROM')
    expect(outputValue).toContain('WHERE')
  })

  it('handles semicolons in SQL', () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT 1; SELECT 2;' } })

    fireEvent.click(screen.getByText('Format'))

    const outputValue = getOutputTextarea().value
    expect(outputValue).toContain(';')
  })

  it('clears output when loading example', () => {
    render(<SqlFormatter />)

    // First produce some output
    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: 'SELECT 1' } })
    fireEvent.click(screen.getByText('Format'))

    // Load example should clear output
    fireEvent.click(screen.getByText('Load Example'))
    expect(getOutputTextarea()).toHaveValue('')
  })

  it('does not process whitespace-only input', () => {
    render(<SqlFormatter />)

    const input = getInputTextarea()
    fireEvent.change(input, { target: { value: '   ' } })

    expect(screen.getByText('Format')).toBeDisabled()
  })
})
