import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, string | number>) => {
    if (params) {
      let result = key
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, String(v))
      }
      return result
    }
    return key
  },
}))

import CssBoxShadowGenerator from '../CssBoxShadowGenerator'

describe('CssBoxShadowGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders preview box', () => {
    render(<CssBoxShadowGenerator />)
    expect(screen.getByLabelText('boxColor')).toBeInTheDocument()
    expect(screen.getByLabelText('backgroundColor')).toBeInTheDocument()
  })

  it('renders shadow controls', () => {
    render(<CssBoxShadowGenerator />)
    expect(screen.getByText('shadow')).toBeInTheDocument()
    expect(screen.getByText('offsetX')).toBeInTheDocument()
    expect(screen.getByText('offsetY')).toBeInTheDocument()
    expect(screen.getByText('blur')).toBeInTheDocument()
    expect(screen.getByText('spread')).toBeInTheDocument()
    expect(screen.getByText('opacityPercent')).toBeInTheDocument()
  })

  it('generates CSS output', () => {
    render(<CssBoxShadowGenerator />)
    expect(screen.getByText('cssOutput')).toBeInTheDocument()
    const pre = screen.getByText(/box-shadow:/)
    expect(pre).toBeInTheDocument()
  })

  it('shows copy button', () => {
    render(<CssBoxShadowGenerator />)
    expect(screen.getByText('copy')).toBeInTheDocument()
  })

  it('copies CSS to clipboard', async () => {
    render(<CssBoxShadowGenerator />)
    fireEvent.click(screen.getByText('copy'))
    expect(writeTextMock).toHaveBeenCalled()
    const copiedText = writeTextMock.mock.calls[0][0]
    expect(copiedText).toContain('box-shadow:')
    expect(copiedText).toContain('-webkit-box-shadow:')
    expect(copiedText).toContain('-moz-box-shadow:')
  })

  it('adds a new shadow layer', () => {
    render(<CssBoxShadowGenerator />)
    const addBtn = screen.getByLabelText('addNewShadow')
    fireEvent.click(addBtn)
    const shadows = screen.getAllByText(/^shadow$/)
    expect(shadows.length).toBe(2)
  })

  it('removes a shadow layer', () => {
    render(<CssBoxShadowGenerator />)
    // Add a second shadow
    fireEvent.click(screen.getByLabelText('addNewShadow'))
    expect(screen.getAllByText(/^shadow$/).length).toBe(2)

    // Remove the first one
    const removeButtons = screen.getAllByText('remove')
    fireEvent.click(removeButtons[0])
    expect(screen.getAllByText(/^shadow$/).length).toBe(1)
  })

  it('does not remove last shadow', () => {
    render(<CssBoxShadowGenerator />)
    // Only 1 shadow, no remove button should be visible
    expect(screen.queryByText('remove')).not.toBeInTheDocument()
  })

  it('toggles inset', () => {
    render(<CssBoxShadowGenerator />)
    const insetCheckbox = screen.getByLabelText(/toggleInset/)
    expect(insetCheckbox).not.toBeChecked()
    fireEvent.click(insetCheckbox)
    expect(insetCheckbox).toBeChecked()

    const pre = screen.getByText(/box-shadow:/)
    expect(pre.textContent).toContain('inset')
  })

  it('updates box color', () => {
    render(<CssBoxShadowGenerator />)
    const colorInput = screen.getByLabelText('boxColor')
    fireEvent.change(colorInput, { target: { value: '#ff0000' } })
    expect((colorInput as HTMLInputElement).value).toBe('#ff0000')
  })

  it('updates background color', () => {
    render(<CssBoxShadowGenerator />)
    const bgInput = screen.getByLabelText('backgroundColor')
    fireEvent.change(bgInput, { target: { value: '#333333' } })
    expect((bgInput as HTMLInputElement).value).toBe('#333333')
  })

  it('updates border radius slider', () => {
    render(<CssBoxShadowGenerator />)
    const slider = screen.getByLabelText(/borderRadiusPx/)
    fireEvent.change(slider, { target: { value: '20' } })
    expect((slider as HTMLInputElement).value).toBe('20')
  })
})
