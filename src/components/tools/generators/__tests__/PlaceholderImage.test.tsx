import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PlaceholderImage from '../PlaceholderImage'

const mockContext = {
  fillStyle: '',
  fillRect: vi.fn(),
  font: '',
  textAlign: '',
  textBaseline: '',
  fillText: vi.fn(),
  measureText: vi.fn().mockReturnValue({ width: 50 }),
}

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as unknown as CanvasRenderingContext2D)
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')
})

describe('PlaceholderImage', () => {
  it('renders with default dimensions', () => {
    render(<PlaceholderImage />)
    expect(screen.getByDisplayValue('800')).toBeInTheDocument()
    expect(screen.getByDisplayValue('600')).toBeInTheDocument()
  })

  it('renders canvas for preview', () => {
    render(<PlaceholderImage />)
    expect(mockContext.fillRect).toHaveBeenCalled()
  })

  it('updates width', () => {
    render(<PlaceholderImage />)
    const widthInput = screen.getByDisplayValue('800')
    fireEvent.change(widthInput, { target: { value: '1024' } })
    expect(screen.getByDisplayValue('1024')).toBeInTheDocument()
  })

  it('updates height', () => {
    render(<PlaceholderImage />)
    const heightInput = screen.getByDisplayValue('600')
    fireEvent.change(heightInput, { target: { value: '768' } })
    expect(screen.getByDisplayValue('768')).toBeInTheDocument()
  })

  it('allows custom text', () => {
    render(<PlaceholderImage />)
    const textInput = screen.getByPlaceholderText(/800 x 600/i)
    fireEvent.change(textInput, { target: { value: 'Custom Text' } })
    expect(screen.getByDisplayValue('Custom Text')).toBeInTheDocument()
  })

  it('shows download button', () => {
    render(<PlaceholderImage />)
    expect(screen.getByText(/download/i)).toBeInTheDocument()
  })

  it('allows changing background color', () => {
    render(<PlaceholderImage />)
    const bgInputs = screen.getAllByDisplayValue('#cccccc')
    fireEvent.change(bgInputs[0], { target: { value: '#ff0000' } })
    expect(screen.getAllByDisplayValue('#ff0000').length).toBeGreaterThanOrEqual(1)
  })

  it('allows changing text color', () => {
    render(<PlaceholderImage />)
    const textInputs = screen.getAllByDisplayValue('#666666')
    fireEvent.change(textInputs[0], { target: { value: '#000000' } })
    expect(screen.getAllByDisplayValue('#000000').length).toBeGreaterThanOrEqual(1)
  })
})
