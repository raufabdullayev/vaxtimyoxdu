import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FaviconGenerator from '../FaviconGenerator'

describe('FaviconGenerator', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the upload area', () => {
    render(<FaviconGenerator />)

    expect(screen.getByText('Click or drop an image here')).toBeInTheDocument()
    expect(screen.getByText(/Supports PNG, JPG, SVG, WebP/)).toBeInTheDocument()
  })

  it('renders all default favicon size buttons', () => {
    render(<FaviconGenerator />)

    expect(screen.getByText('16x16')).toBeInTheDocument()
    expect(screen.getByText('32x32')).toBeInTheDocument()
    expect(screen.getByText('48x48')).toBeInTheDocument()
    expect(screen.getByText('64x64')).toBeInTheDocument()
    expect(screen.getByText('128x128')).toBeInTheDocument()
    expect(screen.getByText('192x192')).toBeInTheDocument()
    expect(screen.getByText('512x512')).toBeInTheDocument()
  })

  it('renders the Generate Favicons button in disabled state when no image', () => {
    render(<FaviconGenerator />)

    const button = screen.getByText('Generate Favicons')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('renders Favicon Sizes label with Select All and Deselect All', () => {
    render(<FaviconGenerator />)

    expect(screen.getByText('Favicon Sizes')).toBeInTheDocument()
    expect(screen.getByText('Select All')).toBeInTheDocument()
    expect(screen.getByText('Deselect All')).toBeInTheDocument()
  })

  it('all sizes are selected by default (aria-pressed=true)', () => {
    render(<FaviconGenerator />)

    const size16 = screen.getByText('16x16')
    const size512 = screen.getByText('512x512')

    expect(size16).toHaveAttribute('aria-pressed', 'true')
    expect(size512).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggles individual size selection', () => {
    render(<FaviconGenerator />)

    const size16 = screen.getByText('16x16')
    expect(size16).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(size16)
    expect(size16).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(size16)
    expect(size16).toHaveAttribute('aria-pressed', 'true')
  })

  it('deselects all sizes when Deselect All is clicked', () => {
    render(<FaviconGenerator />)

    fireEvent.click(screen.getByText('Deselect All'))

    const size16 = screen.getByText('16x16')
    const size32 = screen.getByText('32x32')
    const size512 = screen.getByText('512x512')

    expect(size16).toHaveAttribute('aria-pressed', 'false')
    expect(size32).toHaveAttribute('aria-pressed', 'false')
    expect(size512).toHaveAttribute('aria-pressed', 'false')
  })

  it('selects all sizes when Select All is clicked after deselecting', () => {
    render(<FaviconGenerator />)

    fireEvent.click(screen.getByText('Deselect All'))
    fireEvent.click(screen.getByText('Select All'))

    const size16 = screen.getByText('16x16')
    const size512 = screen.getByText('512x512')

    expect(size16).toHaveAttribute('aria-pressed', 'true')
    expect(size512).toHaveAttribute('aria-pressed', 'true')
  })

  it('has an accessible upload area with role button', () => {
    render(<FaviconGenerator />)

    const uploadArea = screen.getByRole('button', { name: 'Upload image' })
    expect(uploadArea).toBeInTheDocument()
    expect(uploadArea).toHaveAttribute('tabIndex', '0')
  })

  it('does not show generated favicons section initially', () => {
    render(<FaviconGenerator />)

    expect(screen.queryByText('Download All (ZIP)')).not.toBeInTheDocument()
    expect(screen.queryByText(/Generated Favicons/)).not.toBeInTheDocument()
  })
})
