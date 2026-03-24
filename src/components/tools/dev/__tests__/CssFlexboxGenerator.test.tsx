import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import CssFlexboxGenerator from '../CssFlexboxGenerator'

describe('CssFlexboxGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders flexbox controls', () => {
    render(<CssFlexboxGenerator />)
    expect(screen.getByLabelText('flex-direction')).toBeInTheDocument()
    expect(screen.getByLabelText('justify-content')).toBeInTheDocument()
    expect(screen.getByLabelText('align-items')).toBeInTheDocument()
    expect(screen.getByLabelText('flex-wrap')).toBeInTheDocument()
    expect(screen.getByLabelText('gapPx')).toBeInTheDocument()
    expect(screen.getByLabelText('itemCount')).toBeInTheDocument()
  })

  it('shows preview with default 5 items', () => {
    render(<CssFlexboxGenerator />)
    expect(screen.getByText('preview')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('generates CSS output', () => {
    render(<CssFlexboxGenerator />)
    const pre = screen.getByText(/display: flex/)
    expect(pre).toBeInTheDocument()
    expect(pre.textContent).toContain('flex-direction: row')
    expect(pre.textContent).toContain('justify-content: flex-start')
    expect(pre.textContent).toContain('align-items: stretch')
  })

  it('changes flex-direction', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.change(screen.getByLabelText('flex-direction'), { target: { value: 'column' } })
    expect(screen.getByText(/flex-direction: column/).textContent).toContain('flex-direction: column')
  })

  it('changes justify-content', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.change(screen.getByLabelText('justify-content'), { target: { value: 'center' } })
    expect(screen.getByText(/justify-content: center/)).toBeInTheDocument()
  })

  it('changes align-items', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.change(screen.getByLabelText('align-items'), { target: { value: 'center' } })
    expect(screen.getByText(/align-items: center/)).toBeInTheDocument()
  })

  it('changes flex-wrap', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.change(screen.getByLabelText('flex-wrap'), { target: { value: 'wrap' } })
    expect(screen.getByText(/flex-wrap: wrap/)).toBeInTheDocument()
  })

  it('includes gap in CSS when greater than 0', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.change(screen.getByLabelText('gapPx'), { target: { value: '20' } })
    expect(screen.getByText(/gap: 20px/)).toBeInTheDocument()
  })

  it('excludes gap when 0', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.change(screen.getByLabelText('gapPx'), { target: { value: '0' } })
    const pre = screen.getByText(/display: flex/)
    expect(pre.textContent).not.toContain('gap:')
  })

  it('changes item count', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.change(screen.getByLabelText('itemCount'), { target: { value: '3' } })
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.queryByText('4')).not.toBeInTheDocument()
  })

  it('copies CSS to clipboard', () => {
    render(<CssFlexboxGenerator />)
    fireEvent.click(screen.getByText('copy'))
    expect(writeTextMock).toHaveBeenCalled()
    const copiedText = writeTextMock.mock.calls[0][0]
    expect(copiedText).toContain('display: flex')
  })

  it('shows copy button', () => {
    render(<CssFlexboxGenerator />)
    expect(screen.getByText('copy')).toBeInTheDocument()
  })

  it('shows cssOutput label', () => {
    render(<CssFlexboxGenerator />)
    expect(screen.getByText('cssOutput')).toBeInTheDocument()
  })
})
