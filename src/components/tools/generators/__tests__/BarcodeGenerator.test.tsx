import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, string>) => {
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

// Mock canvas context
const mockContext = {
  fillStyle: '',
  fillRect: vi.fn(),
  font: '',
  textAlign: '',
  fillText: vi.fn(),
}

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as unknown as CanvasRenderingContext2D)
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')
})

import BarcodeGenerator from '../BarcodeGenerator'

describe('BarcodeGenerator', () => {
  it('renders with default values', () => {
    render(<BarcodeGenerator />)
    expect(screen.getByLabelText('barcodeContent')).toBeInTheDocument()
    expect(screen.getByLabelText('format')).toBeInTheDocument()
    expect(screen.getByLabelText('barWidth')).toBeInTheDocument()
    expect(screen.getByLabelText('size')).toBeInTheDocument()
  })

  it('has default text "Hello World"', () => {
    render(<BarcodeGenerator />)
    const input = screen.getByLabelText('barcodeContent') as HTMLInputElement
    expect(input.value).toBe('Hello World')
  })

  it('renders canvas for barcode preview', () => {
    render(<BarcodeGenerator />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('shows download button', () => {
    render(<BarcodeGenerator />)
    expect(screen.getByText('downloadPng')).toBeInTheDocument()
  })

  it('shows show-text checkbox', () => {
    render(<BarcodeGenerator />)
    expect(screen.getByText('showTextBelowBarcode')).toBeInTheDocument()
  })

  it('updates text when input changes', () => {
    render(<BarcodeGenerator />)
    const input = screen.getByLabelText('barcodeContent')
    fireEvent.change(input, { target: { value: 'Test123' } })
    expect((input as HTMLInputElement).value).toBe('Test123')
  })

  it('changes format to CODE39', () => {
    render(<BarcodeGenerator />)
    const select = screen.getByLabelText('format')
    fireEvent.change(select, { target: { value: 'CODE39' } })
    expect((select as HTMLSelectElement).value).toBe('CODE39')
  })

  it('shows placeholder when text is empty', () => {
    render(<BarcodeGenerator />)
    fireEvent.change(screen.getByLabelText('barcodeContent'), { target: { value: '' } })
    expect(screen.getByText('enterContentToGenerate')).toBeInTheDocument()
  })

  it('toggles show text checkbox', () => {
    render(<BarcodeGenerator />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('changes bar width', () => {
    render(<BarcodeGenerator />)
    const input = screen.getByLabelText('barWidth')
    fireEvent.change(input, { target: { value: '3' } })
    expect((input as HTMLInputElement).value).toBe('3')
  })

  it('changes bar height', () => {
    render(<BarcodeGenerator />)
    const input = screen.getByLabelText('size')
    fireEvent.change(input, { target: { value: '150' } })
    expect((input as HTMLInputElement).value).toBe('150')
  })

  it('disables download when text is empty', () => {
    render(<BarcodeGenerator />)
    fireEvent.change(screen.getByLabelText('barcodeContent'), { target: { value: '' } })
    const button = screen.getByText('downloadPng')
    expect(button).toBeDisabled()
  })
})
