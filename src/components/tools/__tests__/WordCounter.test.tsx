import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WordCounter from '../WordCounter'

/**
 * Helper to get the stat value by its label text.
 * The DOM structure is:
 *   <div class="rounded-lg bg-muted/50 p-3 text-center">
 *     <div class="text-2xl ...">{value}</div>   -- or text-lg for the bottom row
 *     <div class="text-xs ...">{label}</div>
 *   </div>
 */
function getStatValue(label: string): string {
  const labelEl = screen.getByText(label)
  const container = labelEl.parentElement!
  const valueEl = container.querySelector('[class*="font-bold"]') as HTMLElement
  return valueEl?.textContent ?? ''
}

describe('WordCounter', () => {
  it('renders with all zero stats on initial load', () => {
    render(<WordCounter />)

    expect(getStatValue('Words')).toBe('0')
    expect(getStatValue('Characters')).toBe('0')
    expect(getStatValue('Characters (no spaces)')).toBe('0')
    expect(getStatValue('Sentences')).toBe('0')
    expect(getStatValue('Paragraphs')).toBe('0')
    expect(getStatValue('Reading Time')).toBe('0 sec')
    expect(getStatValue('Speaking Time')).toBe('0 sec')
  })

  it('renders the textarea with correct placeholder', () => {
    render(<WordCounter />)

    expect(screen.getByPlaceholderText('Start typing or paste your text here...')).toBeInTheDocument()
  })

  it('counts words accurately', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    await user.type(textarea, 'Hello world foo bar')

    expect(getStatValue('Words')).toBe('4')
  })

  it('counts characters including spaces', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    await user.type(textarea, 'Hi there')

    expect(getStatValue('Characters')).toBe('8')
  })

  it('counts characters without spaces', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    await user.type(textarea, 'Hi there')

    expect(getStatValue('Characters (no spaces)')).toBe('7')
  })

  it('counts sentences correctly', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    await user.type(textarea, 'Hello world. How are you? I am fine!')

    expect(getStatValue('Sentences')).toBe('3')
  })

  it('counts paragraphs correctly using fireEvent for newlines', () => {
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    fireEvent.change(textarea, { target: { value: 'First paragraph\n\nSecond paragraph\n\nThird paragraph' } })

    expect(getStatValue('Paragraphs')).toBe('3')
  })

  it('estimates reading time for short text as seconds', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    await user.type(textarea, 'Short text here')

    // 3 words / 200 wpm = 0.015 min -> ceil(0.9) = 1 sec
    expect(getStatValue('Reading Time')).toBe('1 sec')
  })

  it('estimates reading time in minutes for longer text', () => {
    render(<WordCounter />)

    // Create ~200 words so reading time = ~1 min
    const words = Array.from({ length: 200 }, (_, i) => `word${i}`).join(' ')
    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    fireEvent.change(textarea, { target: { value: words } })

    expect(getStatValue('Reading Time')).toBe('1 min')
  })

  it('handles empty text with all zero stats', () => {
    render(<WordCounter />)

    expect(getStatValue('Words')).toBe('0')
    expect(getStatValue('Characters')).toBe('0')
    expect(getStatValue('Sentences')).toBe('0')
  })

  it('handles whitespace-only text as empty', () => {
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    fireEvent.change(textarea, { target: { value: '   ' } })

    expect(getStatValue('Words')).toBe('0')
    expect(getStatValue('Sentences')).toBe('0')
  })

  it('shows the Clear Text button when text is entered', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    expect(screen.queryByText('Clear Text')).not.toBeInTheDocument()

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    await user.type(textarea, 'Some text')

    expect(screen.getByText('Clear Text')).toBeInTheDocument()
  })

  it('clears text when Clear Text button is clicked', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')
    await user.type(textarea, 'Some text')
    expect(textarea).toHaveValue('Some text')

    await user.click(screen.getByText('Clear Text'))
    expect(textarea).toHaveValue('')
  })

  it('displays all stat labels', () => {
    render(<WordCounter />)

    expect(screen.getByText('Words')).toBeInTheDocument()
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('Characters (no spaces)')).toBeInTheDocument()
    expect(screen.getByText('Sentences')).toBeInTheDocument()
    expect(screen.getByText('Paragraphs')).toBeInTheDocument()
    expect(screen.getByText('Reading Time')).toBeInTheDocument()
    expect(screen.getByText('Speaking Time')).toBeInTheDocument()
  })

  it('updates counts live as user types', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)

    const textarea = screen.getByPlaceholderText('Start typing or paste your text here...')

    await user.type(textarea, 'one')
    expect(getStatValue('Words')).toBe('1')

    await user.type(textarea, ' two')
    expect(getStatValue('Words')).toBe('2')

    await user.type(textarea, ' three')
    expect(getStatValue('Words')).toBe('3')
  })

  it('does not show Clear Text button for empty input', () => {
    render(<WordCounter />)

    expect(screen.queryByText('Clear Text')).not.toBeInTheDocument()
  })

  it('renders the textarea label', () => {
    render(<WordCounter />)

    expect(screen.getByText('Enter your text')).toBeInTheDocument()
  })
})
