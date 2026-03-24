import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import CssGridGenerator from '../CssGridGenerator'

describe('CssGridGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders grid controls', () => {
    render(<CssGridGenerator />)
    expect(screen.getByLabelText('gridColumns')).toBeInTheDocument()
    expect(screen.getByLabelText('gridRows')).toBeInTheDocument()
    expect(screen.getByLabelText('gapPx')).toBeInTheDocument()
    expect(screen.getByLabelText('columnSize')).toBeInTheDocument()
    expect(screen.getByLabelText('rowSize')).toBeInTheDocument()
    expect(screen.getByLabelText('justify-items')).toBeInTheDocument()
    expect(screen.getByLabelText('align-items')).toBeInTheDocument()
  })

  it('shows preview with default 3x2 grid (6 items)', () => {
    render(<CssGridGenerator />)
    expect(screen.getByText('preview')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('generates CSS with display: grid', () => {
    render(<CssGridGenerator />)
    const pre = screen.getByText(/display: grid/)
    expect(pre.textContent).toContain('grid-template-columns: 1fr 1fr 1fr')
    expect(pre.textContent).toContain('grid-template-rows: auto auto')
  })

  it('changes column count', () => {
    render(<CssGridGenerator />)
    fireEvent.change(screen.getByLabelText('gridColumns'), { target: { value: '4' } })
    expect(screen.getByText(/grid-template-columns: 1fr 1fr 1fr 1fr/)).toBeInTheDocument()
  })

  it('changes row count', () => {
    render(<CssGridGenerator />)
    fireEvent.change(screen.getByLabelText('gridRows'), { target: { value: '3' } })
    expect(screen.getByText(/grid-template-rows: auto auto auto/)).toBeInTheDocument()
  })

  it('includes gap when greater than 0', () => {
    render(<CssGridGenerator />)
    fireEvent.change(screen.getByLabelText('gapPx'), { target: { value: '20' } })
    expect(screen.getByText(/gap: 20px/)).toBeInTheDocument()
  })

  it('excludes gap when 0', () => {
    render(<CssGridGenerator />)
    fireEvent.change(screen.getByLabelText('gapPx'), { target: { value: '0' } })
    const pre = screen.getByText(/display: grid/)
    expect(pre.textContent).not.toContain('gap:')
  })

  it('changes column sizing', () => {
    render(<CssGridGenerator />)
    fireEvent.change(screen.getByLabelText('columnSize'), { target: { value: '100px' } })
    expect(screen.getByText(/grid-template-columns: 100px 100px 100px/)).toBeInTheDocument()
  })

  it('changes row sizing', () => {
    render(<CssGridGenerator />)
    fireEvent.change(screen.getByLabelText('rowSize'), { target: { value: '1fr' } })
    expect(screen.getByText(/grid-template-rows: 1fr 1fr/)).toBeInTheDocument()
  })

  it('includes justify-items only when not stretch', () => {
    render(<CssGridGenerator />)
    // Default is stretch, should not be in CSS
    const pre = screen.getByText(/display: grid/)
    expect(pre.textContent).not.toContain('justify-items')

    fireEvent.change(screen.getByLabelText('justify-items'), { target: { value: 'center' } })
    expect(screen.getByText(/justify-items: center/)).toBeInTheDocument()
  })

  it('includes align-items only when not stretch', () => {
    render(<CssGridGenerator />)
    const pre = screen.getByText(/display: grid/)
    expect(pre.textContent).not.toContain('align-items')

    fireEvent.change(screen.getByLabelText('align-items'), { target: { value: 'end' } })
    expect(screen.getByText(/align-items: end/)).toBeInTheDocument()
  })

  it('copies CSS to clipboard', () => {
    render(<CssGridGenerator />)
    fireEvent.click(screen.getByText('copy'))
    expect(writeTextMock).toHaveBeenCalled()
    expect(writeTextMock.mock.calls[0][0]).toContain('display: grid')
  })

  it('updates preview cell count when grid dimensions change', () => {
    render(<CssGridGenerator />)
    fireEvent.change(screen.getByLabelText('gridColumns'), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText('gridRows'), { target: { value: '2' } })
    // 2x2 = 4 cells
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.queryByText('5')).not.toBeInTheDocument()
  })

  it('shows cssOutput label', () => {
    render(<CssGridGenerator />)
    expect(screen.getByText('cssOutput')).toBeInTheDocument()
  })
})
