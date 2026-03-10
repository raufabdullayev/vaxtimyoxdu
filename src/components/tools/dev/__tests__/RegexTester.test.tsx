import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegexTester from '../RegexTester'

describe('RegexTester', () => {
  it('renders pattern input and test string textarea', () => {
    render(<RegexTester />)

    expect(screen.getByPlaceholderText('Enter regex pattern...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text to test against...')).toBeInTheDocument()
  })

  it('renders all flag toggle buttons', () => {
    render(<RegexTester />)

    expect(screen.getByText('Global (g)')).toBeInTheDocument()
    expect(screen.getByText('Case Insensitive (i)')).toBeInTheDocument()
    expect(screen.getByText('Multiline (m)')).toBeInTheDocument()
    expect(screen.getByText('Dot All (s)')).toBeInTheDocument()
  })

  it('has Global flag enabled by default', () => {
    render(<RegexTester />)

    const globalBtn = screen.getByText('Global (g)')
    expect(globalBtn.className).toContain('bg-primary')
  })

  it('shows the current flags in the display', () => {
    render(<RegexTester />)

    expect(screen.getByText('/g')).toBeInTheDocument()
  })

  it('finds global matches in test string', () => {
    render(<RegexTester />)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')

    fireEvent.change(patternInput, { target: { value: '\\d+' } })
    fireEvent.change(testInput, { target: { value: 'abc 123 def 456' } })

    expect(screen.getByText('Matches (2)')).toBeInTheDocument()
    expect(screen.getByText('at index 4')).toBeInTheDocument()
    expect(screen.getByText('at index 12')).toBeInTheDocument()
  })

  it('shows match positions', () => {
    render(<RegexTester />)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')

    fireEvent.change(patternInput, { target: { value: 'hello' } })
    fireEvent.change(testInput, { target: { value: 'hello world' } })

    expect(screen.getByText('at index 0')).toBeInTheDocument()
  })

  it('shows "No matches found" when pattern does not match', () => {
    render(<RegexTester />)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')

    fireEvent.change(patternInput, { target: { value: 'xyz' } })
    fireEvent.change(testInput, { target: { value: 'hello world' } })

    expect(screen.getByText('No matches found')).toBeInTheDocument()
  })

  it('does not show results section when pattern or test string is empty', () => {
    render(<RegexTester />)

    expect(screen.queryByText(/Matches/)).not.toBeInTheDocument()

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    fireEvent.change(patternInput, { target: { value: 'test' } })

    // Only pattern set, no test string
    expect(screen.queryByText(/Matches/)).not.toBeInTheDocument()
  })

  it('toggles flags on and off', async () => {
    const user = userEvent.setup()
    render(<RegexTester />)

    const caseBtn = screen.getByText('Case Insensitive (i)')

    // Enable case insensitive
    await user.click(caseBtn)
    expect(caseBtn.className).toContain('bg-primary')

    // Disable case insensitive
    await user.click(caseBtn)
    expect(caseBtn.className).not.toContain('bg-primary')
  })

  it('case insensitive flag works correctly', () => {
    render(<RegexTester />)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')
    const caseBtn = screen.getByText('Case Insensitive (i)')

    fireEvent.change(patternInput, { target: { value: 'hello' } })
    fireEvent.change(testInput, { target: { value: 'HELLO world' } })

    // Without case insensitive flag - no match
    expect(screen.getByText('No matches found')).toBeInTheDocument()

    // Enable case insensitive
    fireEvent.click(caseBtn)

    expect(screen.getByText('Matches (1)')).toBeInTheDocument()
    expect(screen.getByText('at index 0')).toBeInTheDocument()
  })

  it('shows highlighted matches section', () => {
    render(<RegexTester />)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')

    fireEvent.change(patternInput, { target: { value: 'world' } })
    fireEvent.change(testInput, { target: { value: 'hello world' } })

    expect(screen.getByText('Highlighted Matches')).toBeInTheDocument()
  })

  it('shows error for invalid regex pattern', () => {
    render(<RegexTester />)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')

    fireEvent.change(patternInput, { target: { value: '[invalid' } })
    fireEvent.change(testInput, { target: { value: 'test text' } })

    // Should display an error message about invalid regex
    const errorContainer = document.querySelector('.text-destructive')
    expect(errorContainer).not.toBeNull()
  })

  it('works with non-global flag (single match)', async () => {
    const user = userEvent.setup()
    render(<RegexTester />)

    // Disable global flag
    const globalBtn = screen.getByText('Global (g)')
    await user.click(globalBtn)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')

    fireEvent.change(patternInput, { target: { value: '\\d+' } })
    fireEvent.change(testInput, { target: { value: 'abc 123 def 456' } })

    expect(screen.getByText('Matches (1)')).toBeInTheDocument()
    expect(screen.getByText('at index 4')).toBeInTheDocument()
  })

  it('handles multiple matches in global mode', () => {
    render(<RegexTester />)

    const patternInput = screen.getByPlaceholderText('Enter regex pattern...')
    const testInput = screen.getByPlaceholderText('Enter text to test against...')

    fireEvent.change(patternInput, { target: { value: '[aeiou]' } })
    fireEvent.change(testInput, { target: { value: 'hello' } })

    // e, o = 2 matches
    expect(screen.getByText('Matches (2)')).toBeInTheDocument()
  })
})
