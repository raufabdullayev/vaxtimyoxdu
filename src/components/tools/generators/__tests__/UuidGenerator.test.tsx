import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UuidGenerator from '../UuidGenerator'

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const clipboardMock = { writeText: vi.fn().mockResolvedValue(undefined) }

describe('UuidGenerator', () => {
  beforeEach(() => {
    clipboardMock.writeText.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: clipboardMock,
      writable: true,
      configurable: true,
    })
  })

  it('generates a UUID on initial render', () => {
    render(<UuidGenerator />)

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    expect(uuidDisplay.textContent).toMatch(UUID_V4_REGEX)
  })

  it('generates UUID in correct v4 format (8-4-4-4-12)', () => {
    render(<UuidGenerator />)

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    const uuid = uuidDisplay.textContent!
    const parts = uuid.split('-')
    expect(parts).toHaveLength(5)
    expect(parts[0]).toHaveLength(8)
    expect(parts[1]).toHaveLength(4)
    expect(parts[2]).toHaveLength(4)
    expect(parts[3]).toHaveLength(4)
    expect(parts[4]).toHaveLength(12)
  })

  it('renders "Generated UUID v4" label', () => {
    render(<UuidGenerator />)

    expect(screen.getByText('Generated UUID v4')).toBeInTheDocument()
  })

  it('generates a new UUID when "Generate New" is clicked', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    const firstUuid = uuidDisplay.textContent

    await user.click(screen.getByLabelText('Generate new UUID'))

    // New UUID generated - still valid format
    expect(uuidDisplay.textContent).toMatch(UUID_V4_REGEX)
  })

  it('converts to uppercase when Uppercase checkbox is checked', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)

    await user.click(screen.getByLabelText('uppercaseUuid'))

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    const uuid = uuidDisplay.textContent!
    // All alpha characters should be uppercase
    expect(uuid).toBe(uuid.toUpperCase())
  })

  it('displays in lowercase by default', () => {
    render(<UuidGenerator />)

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    const uuid = uuidDisplay.textContent!
    expect(uuid).toBe(uuid.toLowerCase())
  })

  it('removes hyphens when Hyphens checkbox is unchecked', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)

    // The Hyphens checkbox has the label text "Hyphens"
    const hyphensCheckbox = screen.getByRole('checkbox', { name: /hyphens/i })
    await user.click(hyphensCheckbox)

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    const uuid = uuidDisplay.textContent!
    expect(uuid).not.toContain('-')
    expect(uuid).toHaveLength(32)
  })

  it('has hyphens enabled by default', () => {
    render(<UuidGenerator />)

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    const uuid = uuidDisplay.textContent!
    expect(uuid).toContain('-')
  })

  it('copies UUID to clipboard when Copy is clicked', async () => {
    render(<UuidGenerator />)

    const uuidDisplay = screen.getByLabelText('Generated UUID')
    const uuid = uuidDisplay.textContent!

    fireEvent.click(screen.getByLabelText('Copy UUID'))

    await waitFor(() => {
      expect(clipboardMock.writeText).toHaveBeenCalledWith(uuid)
    })
  })

  it('shows "Copied!" after copying main UUID', async () => {
    render(<UuidGenerator />)

    fireEvent.click(screen.getByLabelText('Copy UUID'))

    await waitFor(() => {
      expect(screen.getByText('copied')).toBeInTheDocument()
    })
  })

  it('renders bulk generation section', () => {
    render(<UuidGenerator />)

    expect(screen.getByText('Bulk Generate')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of UUIDs to generate')).toBeInTheDocument()
    expect(screen.getByText('Generate Bulk')).toBeInTheDocument()
  })

  it('has default bulk count of 5', () => {
    render(<UuidGenerator />)

    const countInput = screen.getByLabelText('Number of UUIDs to generate')
    expect(countInput).toHaveValue(5)
  })

  it('generates bulk UUIDs when Generate Bulk is clicked', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)

    await user.click(screen.getByText('Generate Bulk'))

    // Should show 5 UUIDs (default count)
    const copyButtons = screen.getAllByText('copy')
    // Main UUID copy + 5 bulk UUID copies = at least 5 individual Copy buttons
    expect(copyButtons.length).toBeGreaterThanOrEqual(5)
  })

  it('shows "Copy All" button after bulk generation', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)

    expect(screen.queryByLabelText('Copy all UUIDs')).not.toBeInTheDocument()

    await user.click(screen.getByText('Generate Bulk'))

    expect(screen.getByLabelText('Copy all UUIDs')).toBeInTheDocument()
  })

  it('copies all bulk UUIDs to clipboard', async () => {
    render(<UuidGenerator />)

    fireEvent.click(screen.getByText('Generate Bulk'))

    // Verify bulk UUIDs are rendered
    const codeElements = screen.getAllByRole('code', { hidden: false })
    expect(codeElements).toHaveLength(5)

    fireEvent.click(screen.getByLabelText('Copy all UUIDs'))

    expect(clipboardMock.writeText).toHaveBeenCalledTimes(1)
    // Verify the copied text contains newline-separated UUIDs
    const copiedText = clipboardMock.writeText.mock.calls[0][0]
    const lines = copiedText.split('\n')
    expect(lines).toHaveLength(5)
    lines.forEach((line: string) => {
      expect(line).toMatch(UUID_V4_REGEX)
    })
  })

  it('shows "Copied All!" after copying all UUIDs', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)

    await user.click(screen.getByText('Generate Bulk'))

    fireEvent.click(screen.getByLabelText('Copy all UUIDs'))

    await waitFor(() => {
      expect(screen.getByText('copied')).toBeInTheDocument()
    })
  })

  it('applies uppercase formatting to bulk UUIDs', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)

    await user.click(screen.getByLabelText('uppercaseUuid'))
    await user.click(screen.getByText('Generate Bulk'))

    // All bulk UUIDs should be uppercase
    const codeElements = screen.getAllByRole('code', { hidden: false })
    codeElements.forEach(el => {
      expect(el.textContent).toBe(el.textContent!.toUpperCase())
    })
  })
})
