import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MetaTagGenerator from '../MetaTagGenerator'

describe('MetaTagGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders all form fields', () => {
    render(<MetaTagGenerator />)
    expect(screen.getByLabelText('Page Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Keywords')).toBeInTheDocument()
    expect(screen.getByLabelText('Author')).toBeInTheDocument()
    expect(screen.getByLabelText('OG Image URL')).toBeInTheDocument()
    expect(screen.getByLabelText('Canonical URL')).toBeInTheDocument()
  })

  it('generates title meta tag', () => {
    render(<MetaTagGenerator />)
    const titleInput = screen.getByLabelText('Page Title')
    fireEvent.change(titleInput, { target: { value: 'My Test Page' } })
    const output = screen.getByText(/<title>My Test Page<\/title>/)
    expect(output).toBeInTheDocument()
  })

  it('generates description meta tag', () => {
    render(<MetaTagGenerator />)
    const descInput = screen.getByLabelText('Description')
    fireEvent.change(descInput, { target: { value: 'A test description' } })
    expect(screen.getByText(/name="description" content="A test description"/)).toBeInTheDocument()
  })

  it('shows character count for description', () => {
    render(<MetaTagGenerator />)
    const descInput = screen.getByLabelText('Description')
    fireEvent.change(descInput, { target: { value: 'Hello world' } })
    expect(screen.getByText('11/160')).toBeInTheDocument()
  })

  it('shows ideal label when description is 150-160 chars', () => {
    render(<MetaTagGenerator />)
    const descInput = screen.getByLabelText('Description')
    const text = 'x'.repeat(155)
    fireEvent.change(descInput, { target: { value: text } })
    expect(screen.getByText(/\(ideal\)/)).toBeInTheDocument()
  })

  it('generates OG tags', () => {
    render(<MetaTagGenerator />)
    const titleInput = screen.getByLabelText('Page Title')
    fireEvent.change(titleInput, { target: { value: 'OG Title' } })
    expect(screen.getByText(/og:title/)).toBeInTheDocument()
  })

  it('generates Twitter card tags', () => {
    render(<MetaTagGenerator />)
    expect(screen.getByText(/twitter:card/)).toBeInTheDocument()
  })

  it('generates robots meta tag', () => {
    render(<MetaTagGenerator />)
    expect(screen.getByText(/name="robots"/)).toBeInTheDocument()
  })

  it('shows Google search preview', () => {
    render(<MetaTagGenerator />)
    expect(screen.getByText('Google Search Preview')).toBeInTheDocument()
    // "Page Title" appears as both form label and preview text
    expect(screen.getAllByText('Page Title').length).toBeGreaterThanOrEqual(1)
  })

  it('updates preview with title', () => {
    render(<MetaTagGenerator />)
    const titleInput = screen.getByLabelText('Page Title')
    fireEvent.change(titleInput, { target: { value: 'My Site' } })
    // The preview shows the title
    expect(screen.getAllByText('My Site').length).toBeGreaterThanOrEqual(1)
  })

  it('copies HTML to clipboard', () => {
    render(<MetaTagGenerator />)
    const titleInput = screen.getByLabelText('Page Title')
    fireEvent.change(titleInput, { target: { value: 'Test' } })
    fireEvent.click(screen.getByLabelText('Copy HTML meta tags'))
    expect(writeTextMock).toHaveBeenCalled()
    const copiedText = writeTextMock.mock.calls[0][0]
    expect(copiedText).toContain('<title>Test</title>')
  })

  it('generates canonical link tag', () => {
    render(<MetaTagGenerator />)
    const canonicalInput = screen.getByLabelText('Canonical URL')
    fireEvent.change(canonicalInput, { target: { value: 'https://example.com/page' } })
    expect(screen.getByText(/rel="canonical"/)).toBeInTheDocument()
  })

  it('handles robots noindex toggle', () => {
    render(<MetaTagGenerator />)
    const noindexCheckbox = screen.getByLabelText('Noindex')
    fireEvent.click(noindexCheckbox)
    expect(screen.getByText(/noindex/)).toBeInTheDocument()
  })
})
