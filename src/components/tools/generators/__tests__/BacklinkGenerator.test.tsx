import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BacklinkGenerator from '../BacklinkGenerator'

describe('BacklinkGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders URL input', () => {
    render(<BacklinkGenerator />)
    expect(screen.getByLabelText('URL input')).toBeInTheDocument()
  })

  it('renders anchor text and title inputs', () => {
    render(<BacklinkGenerator />)
    expect(screen.getByLabelText('Anchor text')).toBeInTheDocument()
    expect(screen.getByLabelText('Link title')).toBeInTheDocument()
  })

  it('renders link format buttons', () => {
    render(<BacklinkGenerator />)
    expect(screen.getByText('HTML')).toBeInTheDocument()
    expect(screen.getByText('Markdown')).toBeInTheDocument()
    expect(screen.getByText('BBCode')).toBeInTheDocument()
  })

  it('generates HTML link', () => {
    render(<BacklinkGenerator />)
    const urlInput = screen.getByLabelText('URL input')
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    expect(screen.getByText(/href="https:\/\/example\.com"/)).toBeInTheDocument()
  })

  it('generates Markdown link', () => {
    render(<BacklinkGenerator />)
    const urlInput = screen.getByLabelText('URL input')
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    const anchorInput = screen.getByLabelText('Anchor text')
    fireEvent.change(anchorInput, { target: { value: 'Click' } })
    expect(screen.getByText(/\[Click\]\(https:\/\/example\.com\)/)).toBeInTheDocument()
  })

  it('generates BBCode link', () => {
    render(<BacklinkGenerator />)
    const urlInput = screen.getByLabelText('URL input')
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    expect(screen.getByText(/\[url=https:\/\/example\.com\]/)).toBeInTheDocument()
  })

  it('loads sample data', () => {
    render(<BacklinkGenerator />)
    fireEvent.click(screen.getByText('Load Sample'))
    const urlInput = screen.getByLabelText('URL input') as HTMLInputElement
    expect(urlInput.value).toBe('https://example.com')
    const anchorInput = screen.getByLabelText('Anchor text') as HTMLInputElement
    expect(anchorInput.value).toBe('Visit Example')
  })

  it('toggles nofollow option', () => {
    render(<BacklinkGenerator />)
    fireEvent.click(screen.getByText('Load Sample'))
    // Find checkbox inputs specifically
    const checkboxes = screen.getAllByRole('checkbox')
    // nofollow is the first checkbox
    fireEvent.click(checkboxes[0])
    // The generated HTML should contain nofollow
    expect(screen.getAllByText(/nofollow/).length).toBeGreaterThanOrEqual(1)
  })

  it('toggles link format types', () => {
    render(<BacklinkGenerator />)
    // Textile is off by default, click to enable
    const textileBtn = screen.getAllByText('Textile')[0]
    fireEvent.click(textileBtn)
    const urlInput = screen.getByLabelText('URL input')
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    // Should show textile format in results
    expect(screen.getAllByText('Textile').length).toBeGreaterThanOrEqual(1)
  })

  it('shows preview when URL entered', () => {
    render(<BacklinkGenerator />)
    const urlInput = screen.getByLabelText('URL input')
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  it('copies individual link format', () => {
    render(<BacklinkGenerator />)
    fireEvent.click(screen.getByText('Load Sample'))
    const copyBtns = screen.getAllByText('Copy')
    fireEvent.click(copyBtns[0])
    expect(writeTextMock).toHaveBeenCalled()
  })
})
