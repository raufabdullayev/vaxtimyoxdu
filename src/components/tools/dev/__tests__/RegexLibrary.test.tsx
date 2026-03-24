import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RegexLibrary from '../RegexLibrary'

describe('RegexLibrary', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders search input and category filter', () => {
    render(<RegexLibrary />)
    expect(screen.getByLabelText('Search regex patterns')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('shows all patterns by default', () => {
    render(<RegexLibrary />)
    expect(screen.getByText(/\d+ Patterns/)).toBeInTheDocument()
  })

  it('displays category filter buttons', () => {
    render(<RegexLibrary />)
    // Category names appear as both filter buttons and pattern badges, so use getAllByText
    expect(screen.getAllByText('Validation').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Strings').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Numbers').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Date & Time').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Security').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Code').length).toBeGreaterThanOrEqual(1)
  })

  it('filters patterns by category', () => {
    render(<RegexLibrary />)
    const securityBtns = screen.getAllByText('Security')
    // Click the filter button (first one)
    fireEvent.click(securityBtns[0])
    expect(screen.getByText('Credit Card (Visa)')).toBeInTheDocument()
    expect(screen.getByText('Strong Password')).toBeInTheDocument()
  })

  it('filters patterns by search text', () => {
    render(<RegexLibrary />)
    const searchInput = screen.getByLabelText('Search regex patterns')
    fireEvent.change(searchInput, { target: { value: 'email' } })
    expect(screen.getByText('Email Address')).toBeInTheDocument()
  })

  it('selects a pattern and shows test panel', () => {
    render(<RegexLibrary />)
    fireEvent.click(screen.getByText('Email Address'))
    expect(screen.getByText('Test: Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Test string input')).toBeInTheDocument()
  })

  it('tests pattern against input', () => {
    render(<RegexLibrary />)
    fireEvent.click(screen.getByText('Email Address'))
    const testInput = screen.getByLabelText('Test string input')
    fireEvent.change(testInput, { target: { value: 'user@example.com' } })
    expect(screen.getByText('Match')).toBeInTheDocument()
  })

  it('shows no match for invalid input', () => {
    render(<RegexLibrary />)
    fireEvent.click(screen.getByText('Email Address'))
    const testInput = screen.getByLabelText('Test string input')
    fireEvent.change(testInput, { target: { value: 'not-an-email' } })
    expect(screen.getByText('No match')).toBeInTheDocument()
  })

  it('loads example text when pattern selected', () => {
    render(<RegexLibrary />)
    fireEvent.click(screen.getByText('Email Address'))
    const testInput = screen.getByLabelText('Test string input') as HTMLInputElement
    expect(testInput.value).toBe('user@example.com')
  })

  it('copies pattern to clipboard', () => {
    render(<RegexLibrary />)
    const copyBtns = screen.getAllByText('Copy')
    fireEvent.click(copyBtns[0])
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('returns to all patterns when All filter clicked', () => {
    render(<RegexLibrary />)
    const securityBtns = screen.getAllByText('Security')
    fireEvent.click(securityBtns[0])
    fireEvent.click(screen.getByText('All'))
    // Should show all patterns again
    const patternCount = screen.getByText(/\d+ Patterns/)
    expect(patternCount).toBeInTheDocument()
  })
})
