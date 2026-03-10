import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SvgToPng from '../SvgToPng'

// Use a real class so `new DOMParser()` works in jsdom
class MockDOMParser {
  parseFromString() {
    return {
      querySelector: () => null,
    }
  }
}

vi.stubGlobal('DOMParser', MockDOMParser)

describe('SvgToPng', () => {
  beforeEach(() => {
    vi.stubGlobal('DOMParser', MockDOMParser)
  })

  it('renders with Paste SVG mode selected by default', () => {
    render(<SvgToPng />)

    expect(screen.getByText('Paste SVG')).toBeInTheDocument()
    expect(screen.getByText('Upload File')).toBeInTheDocument()
    expect(screen.getByText('SVG Code')).toBeInTheDocument()
  })

  it('renders input textarea with correct placeholder', () => {
    render(<SvgToPng />)

    expect(screen.getByPlaceholderText('Paste your SVG code here...')).toBeInTheDocument()
  })

  it('renders dimension inputs with default values', () => {
    render(<SvgToPng />)

    expect(screen.getByText('Width (px)')).toBeInTheDocument()
    expect(screen.getByText('Height (px)')).toBeInTheDocument()

    // The labels are not associated via htmlFor, so query by role
    const numberInputs = screen.getAllByRole('spinbutton')
    expect(numberInputs.length).toBeGreaterThanOrEqual(2)
    // Default dimensions are 512x512
    expect(numberInputs[0]).toHaveValue(512)
    expect(numberInputs[1]).toHaveValue(512)
  })

  it('renders Lock ratio and Transparent BG checkboxes', () => {
    render(<SvgToPng />)

    expect(screen.getByText('Lock ratio')).toBeInTheDocument()
    expect(screen.getByText('Transparent BG')).toBeInTheDocument()
  })

  it('renders Convert to PNG and Clear buttons', () => {
    render(<SvgToPng />)

    expect(screen.getByText('Convert to PNG')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
    expect(screen.getByText('Load Sample')).toBeInTheDocument()
  })

  it('renders quick size preset buttons', () => {
    render(<SvgToPng />)

    expect(screen.getByText('Quick Sizes')).toBeInTheDocument()
    expect(screen.getByText('64px')).toBeInTheDocument()
    expect(screen.getByText('128px')).toBeInTheDocument()
    expect(screen.getByText('256px')).toBeInTheDocument()
    expect(screen.getByText('512px')).toBeInTheDocument()
    expect(screen.getByText('1024px')).toBeInTheDocument()
    expect(screen.getByText('2048px')).toBeInTheDocument()
  })

  it('switches to Upload File mode when button is clicked', () => {
    render(<SvgToPng />)

    fireEvent.click(screen.getByText('Upload File'))

    expect(screen.getByText('Click to upload SVG file')).toBeInTheDocument()
    expect(screen.getByText('Only .svg files accepted')).toBeInTheDocument()
  })

  it('switches back to Paste SVG mode', () => {
    render(<SvgToPng />)

    fireEvent.click(screen.getByText('Upload File'))
    fireEvent.click(screen.getByText('Paste SVG'))

    expect(screen.getByPlaceholderText('Paste your SVG code here...')).toBeInTheDocument()
  })

  it('sets aria-pressed correctly on input mode buttons', () => {
    render(<SvgToPng />)

    const pasteBtn = screen.getByText('Paste SVG')
    const uploadBtn = screen.getByText('Upload File')

    expect(pasteBtn).toHaveAttribute('aria-pressed', 'true')
    expect(uploadBtn).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(uploadBtn)

    expect(pasteBtn).toHaveAttribute('aria-pressed', 'false')
    expect(uploadBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('loads sample SVG when Load Sample is clicked', () => {
    render(<SvgToPng />)

    fireEvent.click(screen.getByText('Load Sample'))

    const textarea = screen.getByLabelText('SVG code input') as HTMLTextAreaElement
    expect(textarea.value).toContain('<svg')
    expect(textarea.value).toContain('viewBox')
  })

  it('clears all fields when Clear is clicked', () => {
    render(<SvgToPng />)

    const textarea = screen.getByLabelText('SVG code input')
    fireEvent.change(textarea, { target: { value: '<svg></svg>' } })

    fireEvent.click(screen.getByText('Clear'))

    expect(textarea).toHaveValue('')
  })

  it('shows error when converting empty SVG', () => {
    render(<SvgToPng />)

    fireEvent.click(screen.getByText('Convert to PNG'))

    expect(screen.getByText('Please provide an SVG to convert')).toBeInTheDocument()
  })

  it('shows error when input is not valid SVG', () => {
    render(<SvgToPng />)

    const textarea = screen.getByLabelText('SVG code input')
    fireEvent.change(textarea, { target: { value: 'not svg content' } })
    fireEvent.click(screen.getByText('Convert to PNG'))

    expect(screen.getByText('Input does not appear to be valid SVG')).toBeInTheDocument()
  })

  it('does not show result section initially', () => {
    render(<SvgToPng />)

    expect(screen.queryByText('Download PNG')).not.toBeInTheDocument()
    expect(screen.queryByText('Copy Image')).not.toBeInTheDocument()
  })

  it('shows background color picker when Transparent BG is unchecked', () => {
    render(<SvgToPng />)

    // Transparent BG is checked by default, so no color picker
    expect(screen.queryByText('Background Color')).not.toBeInTheDocument()

    // Uncheck Transparent BG
    const checkbox = screen.getByText('Transparent BG').previousElementSibling as HTMLInputElement
    fireEvent.click(checkbox)

    expect(screen.getByText('Background Color')).toBeInTheDocument()
  })
})
