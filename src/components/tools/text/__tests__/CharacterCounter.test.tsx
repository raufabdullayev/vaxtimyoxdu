import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CharacterCounter from '../CharacterCounter'

/**
 * Helper to get the stat value by its label text.
 * The DOM structure is:
 *   <div class="rounded-lg bg-muted/50 p-3 text-center">
 *     <div class="text-2xl font-bold ...">{value}</div>
 *     <div class="text-xs text-muted-foreground ...">{label}</div>
 *   </div>
 */
function getStatValue(label: string, index = 0): string {
  const labelEls = screen.getAllByText(label)
  const labelEl = labelEls[index]
  const container = labelEl.parentElement!
  const valueEl = container.querySelector('[class*="font-bold"]') as HTMLElement
  return valueEl?.textContent ?? ''
}

describe('CharacterCounter', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with all zero stats on initial load', () => {
    render(<CharacterCounter />)

    expect(getStatValue('characters', 0)).toBe('0')
    expect(getStatValue('characters', 1)).toBe('0')
    expect(getStatValue('words')).toBe('0')
    expect(getStatValue('sentences')).toBe('0')
  })

  it('renders secondary stats with zeros', () => {
    render(<CharacterCounter />)

    expect(getStatValue('paragraphs')).toBe('0')
    expect(getStatValue('Lines')).toBe('0')
    expect(getStatValue('readingTime')).toBe('0s')
    expect(getStatValue('speakingTime')).toBe('0s')
  })

  it('renders the textarea with correct placeholder', () => {
    render(<CharacterCounter />)

    expect(
      screen.getByPlaceholderText('Start typing or paste your text here to see detailed character statistics...')
    ).toBeInTheDocument()
  })

  it('renders label and Load Sample button', () => {
    render(<CharacterCounter />)

    expect(screen.getByText('Your Text')).toBeInTheDocument()
    expect(screen.getByText('loadSample')).toBeInTheDocument()
  })

  it('counts characters correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Hello World' } })

    expect(getStatValue('characters', 0)).toBe('11')
  })

  it('counts characters without spaces correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Hello World' } })

    expect(getStatValue('characters', 1)).toBe('10')
  })

  it('counts words correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'The quick brown fox jumps' } })

    expect(getStatValue('words')).toBe('5')
  })

  it('counts sentences correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Hello world. How are you? I am fine!' } })

    expect(getStatValue('sentences')).toBe('3')
  })

  it('counts a single sentence without ending punctuation', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Hello world' } })

    expect(getStatValue('sentences')).toBe('1')
  })

  it('counts paragraphs correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, {
      target: { value: 'First paragraph\n\nSecond paragraph\n\nThird paragraph' },
    })

    expect(getStatValue('paragraphs')).toBe('3')
  })

  it('counts lines correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Line 1\nLine 2\nLine 3\nLine 4' } })

    expect(getStatValue('Lines')).toBe('4')
  })

  it('calculates reading time for short text', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Short text here' } })

    // 3 words / 225 wpm = 0.0133 min = ~1 second
    expect(getStatValue('readingTime')).toBe('1s')
  })

  it('calculates reading time for longer text', () => {
    render(<CharacterCounter />)

    // Create ~225 words so reading time = ~1 min
    const words = Array.from({ length: 225 }, (_, i) => `word${i}`).join(' ')
    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: words } })

    expect(getStatValue('readingTime')).toBe('1m')
  })

  it('calculates speaking time for short text', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'A few words here' } })

    // 4 words / 130 wpm = 0.0308 min = ~2 seconds
    expect(getStatValue('speakingTime')).toBe('2s')
  })

  it('handles empty input with all zero stats', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: '' } })

    expect(getStatValue('characters', 0)).toBe('0')
    expect(getStatValue('characters', 1)).toBe('0')
    expect(getStatValue('words')).toBe('0')
    expect(getStatValue('sentences')).toBe('0')
  })

  it('handles whitespace-only input', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: '   \n  \t  ' } })

    expect(getStatValue('words')).toBe('0')
    expect(getStatValue('sentences')).toBe('0')
  })

  it('handles special characters in character count', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: '@#$%^&*()' } })

    expect(getStatValue('characters', 0)).toBe('9')
    expect(getStatValue('characters', 1)).toBe('9')
  })

  it('handles multi-line text correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, {
      target: { value: 'Line one.\n\nLine two.\n\nLine three.' },
    })

    expect(getStatValue('Lines')).toBe('5')
    expect(getStatValue('paragraphs')).toBe('3')
    expect(getStatValue('sentences')).toBe('3')
  })

  it('shows additional stats (avg word length, unique words, longest word) when text is entered', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'The quick brown fox' } })

    expect(screen.getByText('Avg Word Length')).toBeInTheDocument()
    expect(screen.getByText('Unique Words')).toBeInTheDocument()
    expect(screen.getByText('Longest Word')).toBeInTheDocument()
  })

  it('does not show additional stats when text is empty', () => {
    render(<CharacterCounter />)

    expect(screen.queryByText('Avg Word Length')).not.toBeInTheDocument()
    expect(screen.queryByText('Unique Words')).not.toBeInTheDocument()
    expect(screen.queryByText('Longest Word')).not.toBeInTheDocument()
  })

  it('counts unique words correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'hello hello world world world' } })

    expect(getStatValue('Unique Words')).toBe('2')
  })

  it('identifies the longest word correctly', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Hi there supercalifragilistic' } })

    expect(getStatValue('Longest Word')).toBe('supercalifragilistic')
  })

  it('shows character frequency table when text is entered', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'aaa bbb ccc' } })

    expect(screen.getByText('Top Character Frequency')).toBeInTheDocument()
  })

  it('does not show character frequency table when text is empty', () => {
    render(<CharacterCounter />)

    expect(screen.queryByText('Top Character Frequency')).not.toBeInTheDocument()
  })

  it('copies stats report to clipboard', async () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Some text here' } })

    fireEvent.click(screen.getByText('copy'))

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled()
      const calledWith = writeTextMock.mock.calls[0][0]
      expect(calledWith).toContain('Characters:')
      expect(calledWith).toContain('Words:')
    })
  })

  it('shows Clear button only when text is entered', () => {
    render(<CharacterCounter />)

    expect(screen.queryByLabelText('Clear text')).not.toBeInTheDocument()

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Some text' } })

    expect(screen.getByLabelText('Clear text')).toBeInTheDocument()
  })

  it('clears text when Clear button is clicked', () => {
    render(<CharacterCounter />)

    const textarea = screen.getByLabelText('Text input for character counting')
    fireEvent.change(textarea, { target: { value: 'Some text' } })

    fireEvent.click(screen.getByLabelText('Clear text'))

    expect(textarea).toHaveValue('')
    expect(getStatValue('characters', 0)).toBe('0')
  })

  it('loads sample text when Load Sample is clicked', () => {
    render(<CharacterCounter />)

    fireEvent.click(screen.getByText('loadSample'))

    const textarea = screen.getByLabelText('Text input for character counting') as HTMLTextAreaElement
    expect(textarea.value).toContain('quick brown fox')
    expect(textarea.value).toContain('pangram')
  })
})
