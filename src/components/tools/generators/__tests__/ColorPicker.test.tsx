import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import ColorPicker from '../ColorPicker'

describe('ColorPicker', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders color picker input', () => {
    render(<ColorPicker />)
    const colorInputs = screen.getAllByDisplayValue('#3b82f6')
    expect(colorInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('shows color values (HEX, RGB, HSL)', () => {
    render(<ColorPicker />)
    expect(screen.getByText('HEX')).toBeInTheDocument()
    expect(screen.getByText('RGB')).toBeInTheDocument()
    expect(screen.getByText('HSL')).toBeInTheDocument()
  })

  it('generates color palette', () => {
    render(<ColorPicker />)
    expect(screen.getByText('generatePalette')).toBeInTheDocument()
  })

  it('updates color when input changes', () => {
    render(<ColorPicker />)
    // Get the text input (not the color picker)
    const hexInputs = screen.getAllByDisplayValue('#3b82f6')
    const textInput = hexInputs.find((el) => el.getAttribute('type') === 'text')!
    fireEvent.change(textInput, { target: { value: '#ff0000' } })
    expect(screen.getAllByDisplayValue('#ff0000').length).toBeGreaterThanOrEqual(1)
  })

  it('copies color value to clipboard', () => {
    render(<ColorPicker />)
    const copyButtons = screen.getAllByText('copy')
    fireEvent.click(copyButtons[0])
    expect(writeTextMock).toHaveBeenCalled()
  })
})
