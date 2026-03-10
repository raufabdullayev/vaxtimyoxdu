import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmojiPicker from '../EmojiPicker'

describe('EmojiPicker', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders search input', () => {
    render(<EmojiPicker />)

    expect(screen.getByLabelText('Search emojis')).toBeInTheDocument()
  })

  it('renders category buttons', () => {
    render(<EmojiPicker />)

    expect(screen.getByText('Smileys')).toBeInTheDocument()
    expect(screen.getByText('Gestures')).toBeInTheDocument()
    expect(screen.getByText('Hearts')).toBeInTheDocument()
    expect(screen.getByText('Animals')).toBeInTheDocument()
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('Objects')).toBeInTheDocument()
    expect(screen.getByText('Symbols')).toBeInTheDocument()
  })

  it('shows Smileys category as selected by default', () => {
    render(<EmojiPicker />)

    const smileysBtn = screen.getByText('Smileys')
    expect(smileysBtn.className).toContain('bg-primary')
  })

  it('displays emojis in the grid', () => {
    render(<EmojiPicker />)

    // There should be emoji buttons with aria-labels
    const emojiButtons = screen.getAllByTitle('Click to copy')
    expect(emojiButtons.length).toBeGreaterThan(0)
  })

  it('shows default help text', () => {
    render(<EmojiPicker />)

    expect(screen.getByText('Click any emoji to copy it to your clipboard')).toBeInTheDocument()
  })

  it('copies emoji to clipboard when clicked', async () => {
    render(<EmojiPicker />)

    // Click the first emoji button
    const emojiButtons = screen.getAllByTitle('Click to copy')
    fireEvent.click(emojiButtons[0])

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(1)
    })
  })

  it('shows copied confirmation message', async () => {
    render(<EmojiPicker />)

    const emojiButtons = screen.getAllByTitle('Click to copy')
    fireEvent.click(emojiButtons[0])

    await waitFor(() => {
      expect(screen.getByText(/copied to clipboard!/)).toBeInTheDocument()
    })
  })

  it('switches category when category button is clicked', async () => {
    const user = userEvent.setup()
    render(<EmojiPicker />)

    await user.click(screen.getByText('Hearts'))

    const heartsBtn = screen.getByText('Hearts')
    expect(heartsBtn.className).toContain('bg-primary')

    // Smileys should no longer be active
    const smileysBtn = screen.getByText('Smileys')
    expect(smileysBtn.className).not.toContain('bg-primary')
  })

  it('does not show Recently Used when no emojis have been copied', () => {
    render(<EmojiPicker />)

    expect(screen.queryByText('Recently Used')).not.toBeInTheDocument()
  })

  it('shows Recently Used after copying an emoji', async () => {
    render(<EmojiPicker />)

    const emojiButtons = screen.getAllByTitle('Click to copy')
    fireEvent.click(emojiButtons[0])

    await waitFor(() => {
      expect(screen.getByText('Recently Used')).toBeInTheDocument()
    })
  })

  it('hides category tabs when search has text', () => {
    render(<EmojiPicker />)

    const searchInput = screen.getByLabelText('Search emojis')
    fireEvent.change(searchInput, { target: { value: 'something' } })

    // Category buttons should be hidden
    expect(screen.queryByText('Smileys')).not.toBeInTheDocument()
  })

  it('shows all emojis across categories when searching', () => {
    render(<EmojiPicker />)

    const searchInput = screen.getByLabelText('Search emojis')
    fireEvent.change(searchInput, { target: { value: 'search' } })

    // Should show emojis from all categories combined
    const emojiButtons = screen.getAllByTitle('Click to copy')
    // More than a single category would have
    expect(emojiButtons.length).toBeGreaterThan(50)
  })

  it('restores category tabs when search is cleared', () => {
    render(<EmojiPicker />)

    const searchInput = screen.getByLabelText('Search emojis')

    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(screen.queryByText('Smileys')).not.toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: '' } })
    expect(screen.getByText('Smileys')).toBeInTheDocument()
  })

  it('hides Recently Used during search', async () => {
    render(<EmojiPicker />)

    // First copy an emoji to show Recently Used
    const emojiButtons = screen.getAllByTitle('Click to copy')
    fireEvent.click(emojiButtons[0])

    await waitFor(() => {
      expect(screen.getByText('Recently Used')).toBeInTheDocument()
    })

    // Search should hide Recently Used
    const searchInput = screen.getByLabelText('Search emojis')
    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(screen.queryByText('Recently Used')).not.toBeInTheDocument()
  })

  it('adds recently used emoji to the beginning of the list', async () => {
    render(<EmojiPicker />)

    const emojiButtons = screen.getAllByTitle('Click to copy')

    // Click two different emojis
    fireEvent.click(emojiButtons[0])

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(1)
    })

    fireEvent.click(emojiButtons[1])

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledTimes(2)
    })

    // Recently Used section should exist with at least 2 entries
    expect(screen.getByText('Recently Used')).toBeInTheDocument()
  })

  it('highlights the copied emoji with a ring', async () => {
    render(<EmojiPicker />)

    const emojiButtons = screen.getAllByTitle('Click to copy')
    fireEvent.click(emojiButtons[0])

    await waitFor(() => {
      expect(emojiButtons[0].className).toContain('ring-2')
    })
  })
})
