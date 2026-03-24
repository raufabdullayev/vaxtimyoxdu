import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ColorPaletteGenerator from '../ColorPaletteGenerator'

describe('ColorPaletteGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders color picker and hex input', () => {
    render(<ColorPaletteGenerator />)
    expect(screen.getByLabelText('Pick base color')).toBeInTheDocument()
    expect(screen.getByLabelText('Base color hex value')).toBeInTheDocument()
  })

  it('renders harmony type buttons', () => {
    render(<ColorPaletteGenerator />)
    expect(screen.getByText('Complementary')).toBeInTheDocument()
    expect(screen.getByText('Analogous')).toBeInTheDocument()
    expect(screen.getByText('Triadic')).toBeInTheDocument()
    expect(screen.getByText('Tetradic')).toBeInTheDocument()
  })

  it('generates palette colors on render', () => {
    render(<ColorPaletteGenerator />)
    // Default is analogous which produces 4 colors
    const hexValues = screen.getAllByText(/^#[0-9a-fA-F]{6}$/)
    expect(hexValues.length).toBeGreaterThanOrEqual(2)
  })

  it('changes harmony type', () => {
    render(<ColorPaletteGenerator />)
    fireEvent.click(screen.getByText('Triadic'))
    const hexValues = screen.getAllByText(/^#[0-9a-fA-F]{6}$/)
    expect(hexValues.length).toBeGreaterThanOrEqual(3)
  })

  it('has randomize button', () => {
    render(<ColorPaletteGenerator />)
    expect(screen.getByText('Random')).toBeInTheDocument()
  })

  it('copies color to clipboard', () => {
    render(<ColorPaletteGenerator />)
    const copyBtns = screen.getAllByText('Copy')
    fireEvent.click(copyBtns[0])
    expect(writeTextMock).toHaveBeenCalled()
  })
})
