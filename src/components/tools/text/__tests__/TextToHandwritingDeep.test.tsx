import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TextToHandwriting from '../TextToHandwriting'

// Mock canvas context
const mockGetContext = vi.fn(() => ({
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
  font: '',
  textBaseline: '',
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn(() => ({ width: 50 })),
}))

const mockToDataURL = vi.fn(() => 'data:image/png;base64,mock')

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = mockGetContext as unknown as typeof HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.toDataURL = mockToDataURL
})

describe('TextToHandwriting - Deep Tests', () => {
  it('renders with default text', () => {
    render(<TextToHandwriting />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    expect(textarea.value).toContain('quick brown fox')
  })

  it('renders font selector', () => {
    render(<TextToHandwriting />)
    const select = document.querySelector('select') as HTMLSelectElement
    expect(select).toBeInTheDocument()
    expect(screen.getByText('Cursive')).toBeInTheDocument()
    expect(screen.getByText('Serif')).toBeInTheDocument()
    expect(screen.getByText('Fantasy')).toBeInTheDocument()
    expect(screen.getByText('Monospace')).toBeInTheDocument()
  })

  it('renders font size slider', () => {
    render(<TextToHandwriting />)
    expect(screen.getByText(/Size: 24px/)).toBeInTheDocument()
  })

  it('renders line spacing slider', () => {
    render(<TextToHandwriting />)
    expect(screen.getByText(/Line Spacing: 40px/)).toBeInTheDocument()
  })

  it('renders paper color buttons', () => {
    render(<TextToHandwriting />)
    expect(screen.getByTitle('White')).toBeInTheDocument()
    expect(screen.getByTitle('Cream')).toBeInTheDocument()
    expect(screen.getByTitle('Lined Blue')).toBeInTheDocument()
    expect(screen.getByTitle('Yellow')).toBeInTheDocument()
    expect(screen.getByTitle('Pink')).toBeInTheDocument()
  })

  it('renders ink color buttons', () => {
    render(<TextToHandwriting />)
    expect(screen.getByTitle('Blue')).toBeInTheDocument()
    expect(screen.getByTitle('Black')).toBeInTheDocument()
    expect(screen.getByTitle('Red')).toBeInTheDocument()
    expect(screen.getByTitle('Green')).toBeInTheDocument()
    expect(screen.getByTitle('Purple')).toBeInTheDocument()
  })

  it('renders canvas', () => {
    render(<TextToHandwriting />)
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('renders download button', () => {
    render(<TextToHandwriting />)
    expect(screen.getByText(/download.*PNG/i)).toBeInTheDocument()
  })

  it('changes text input', () => {
    render(<TextToHandwriting />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Hello World!' } })
    expect(textarea.value).toBe('Hello World!')
  })

  it('changes font selection', () => {
    render(<TextToHandwriting />)
    const select = document.querySelector('select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '2' } })
    expect(select.value).toBe('2')
  })

  it('changes font size', () => {
    render(<TextToHandwriting />)
    const sliders = document.querySelectorAll('input[type="range"]')
    const fontSizeSlider = sliders[0] as HTMLInputElement
    fireEvent.change(fontSizeSlider, { target: { value: '32' } })
    expect(screen.getByText(/Size: 32px/)).toBeInTheDocument()
  })

  it('changes line spacing', () => {
    render(<TextToHandwriting />)
    const sliders = document.querySelectorAll('input[type="range"]')
    const spacingSlider = sliders[1] as HTMLInputElement
    fireEvent.change(spacingSlider, { target: { value: '50' } })
    expect(screen.getByText(/Line Spacing: 50px/)).toBeInTheDocument()
  })

  it('changes paper color', () => {
    render(<TextToHandwriting />)
    fireEvent.click(screen.getByTitle('Cream'))
    // Active state should change (ring-2 class applied)
    const creamBtn = screen.getByTitle('Cream')
    expect(creamBtn.className).toContain('ring-2')
  })

  it('changes ink color', () => {
    render(<TextToHandwriting />)
    fireEvent.click(screen.getByTitle('Red'))
    const redBtn = screen.getByTitle('Red')
    expect(redBtn.className).toContain('ring-2')
  })

  it('downloads canvas as PNG', () => {
    const clickMock = vi.fn()
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        const a = { href: '', download: '', click: clickMock } as unknown as HTMLElement
        return a
      }
      return document.createElement(tag)
    })

    render(<TextToHandwriting />)
    fireEvent.click(screen.getByText(/download.*PNG/i))
    expect(clickMock).toHaveBeenCalled()

    vi.restoreAllMocks()
  })

  it('renders canvas with initial draw', () => {
    render(<TextToHandwriting />)
    expect(mockGetContext).toHaveBeenCalled()
  })
})
