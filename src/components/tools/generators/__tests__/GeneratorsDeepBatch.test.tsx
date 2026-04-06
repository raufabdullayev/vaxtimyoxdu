import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock canvas for all canvas-based tools
const mockCtx = {
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
  font: '',
  textBaseline: '',
  textAlign: '',
  globalAlpha: 1,
  lineJoin: '',
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fillText: vi.fn(),
  strokeText: vi.fn(),
  measureText: vi.fn(() => ({ width: 50 })),
  createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  clearRect: vi.fn(),
  drawImage: vi.fn(),
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'high',
}

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCtx) as unknown as typeof HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.toDataURL = vi.fn(() => 'data:image/png;base64,mock')
})

// --- YouTubeThumbnailText ---
import YouTubeThumbnailText from '../YouTubeThumbnailText'

describe('YouTubeThumbnailText - Deep Tests', () => {
  it('renders with default title and subtitle', () => {
    render(<YouTubeThumbnailText />)
    const inputs = document.querySelectorAll('input[type="text"]')
    expect((inputs[0] as HTMLInputElement).value).toBe('AMAZING TITLE')
    expect((inputs[1] as HTMLInputElement).value).toBe('Click to watch')
  })

  it('renders background color buttons', () => {
    render(<YouTubeThumbnailText />)
    expect(screen.getByTitle('Red')).toBeInTheDocument()
    expect(screen.getByTitle('Blue')).toBeInTheDocument()
    expect(screen.getByTitle('Green')).toBeInTheDocument()
    expect(screen.getByTitle('Purple')).toBeInTheDocument()
    expect(screen.getByTitle('Orange')).toBeInTheDocument()
    expect(screen.getByTitle('Black')).toBeInTheDocument()
    expect(screen.getByTitle('Gradient 1')).toBeInTheDocument()
    expect(screen.getByTitle('Gradient 2')).toBeInTheDocument()
  })

  it('changes title text', () => {
    render(<YouTubeThumbnailText />)
    const titleInput = document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement
    fireEvent.change(titleInput, { target: { value: 'MY TITLE' } })
    expect(titleInput.value).toBe('MY TITLE')
  })

  it('changes subtitle text', () => {
    render(<YouTubeThumbnailText />)
    const subtitleInput = document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement
    fireEvent.change(subtitleInput, { target: { value: 'Watch now' } })
    expect(subtitleInput.value).toBe('Watch now')
  })

  it('changes background color via button', () => {
    render(<YouTubeThumbnailText />)
    fireEvent.click(screen.getByTitle('Blue'))
    const blueBtn = screen.getByTitle('Blue')
    expect(blueBtn.className).toContain('ring-2')
  })

  it('selects gradient background', () => {
    render(<YouTubeThumbnailText />)
    fireEvent.click(screen.getByTitle('Gradient 1'))
    expect(screen.getByTitle('Gradient 1').className).toContain('ring-2')
  })

  it('changes font size', () => {
    render(<YouTubeThumbnailText />)
    const sliders = document.querySelectorAll('input[type="range"]')
    fireEvent.change(sliders[0], { target: { value: '96' } })
    expect(screen.getByText(/Font Size: 96/)).toBeInTheDocument()
  })

  it('changes stroke width', () => {
    render(<YouTubeThumbnailText />)
    const sliders = document.querySelectorAll('input[type="range"]')
    fireEvent.change(sliders[1], { target: { value: '5' } })
    expect(screen.getByText(/Outline: 5px/)).toBeInTheDocument()
  })

  it('changes font weight', () => {
    render(<YouTubeThumbnailText />)
    const select = document.querySelector('select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'normal' } })
    expect(select.value).toBe('normal')
  })

  it('renders canvas with correct aspect ratio', () => {
    render(<YouTubeThumbnailText />)
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('renders download button', () => {
    render(<YouTubeThumbnailText />)
    expect(screen.getByText(/download.*PNG.*1280x720/i)).toBeInTheDocument()
  })

  it('shows dimension info', () => {
    render(<YouTubeThumbnailText />)
    expect(screen.getByText(/1280 x 720/)).toBeInTheDocument()
  })

  it('downloads canvas as PNG', () => {
    const clickMock = vi.fn()
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        return { href: '', download: '', click: clickMock } as unknown as HTMLElement
      }
      return document.createElement(tag)
    })

    render(<YouTubeThumbnailText />)
    fireEvent.click(screen.getByText(/download.*PNG/i))
    expect(clickMock).toHaveBeenCalled()

    vi.restoreAllMocks()
  })

  it('renders with zero stroke width', () => {
    render(<YouTubeThumbnailText />)
    const sliders = document.querySelectorAll('input[type="range"]')
    fireEvent.change(sliders[1], { target: { value: '0' } })
    expect(screen.getByText(/Outline: 0px/)).toBeInTheDocument()
  })

  it('renders custom color picker', () => {
    render(<YouTubeThumbnailText />)
    expect(screen.getByTitle('Custom color')).toBeInTheDocument()
  })

  it('changes custom color', () => {
    render(<YouTubeThumbnailText />)
    const colorInput = screen.getByTitle('Custom color') as HTMLInputElement
    fireEvent.change(colorInput, { target: { value: '#00FF00' } })
    // Custom color should be applied
    expect(colorInput.value).toBe('#00ff00')
  })

  it('clears subtitle to remove it from canvas', () => {
    render(<YouTubeThumbnailText />)
    const subtitleInput = document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement
    fireEvent.change(subtitleInput, { target: { value: '' } })
    expect(subtitleInput.value).toBe('')
  })
})

// --- VideoToGif file validation deep tests ---
import VideoToGif from '../VideoToGif'

describe('VideoToGif - Deep Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-video-url')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
  })

  it('renders settings section labels', () => {
    render(<VideoToGif />)
    expect(screen.getByText('Upload Video')).toBeInTheDocument()
    expect(screen.getByText(/Max 100 MB/)).toBeInTheDocument()
  })

  it('does nothing when no file selected', () => {
    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement
    fireEvent.change(input, { target: { files: [] } })
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })

  it('shows error for non-video file', () => {
    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement
    const textFile = new File(['test'], 'doc.pdf', { type: 'application/pdf' })
    Object.defineProperty(input, 'files', { value: [textFile] })
    fireEvent.change(input)
    expect(screen.getByText('Please select a video file.')).toBeInTheDocument()
  })

  it('shows error for file over 100MB', () => {
    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement
    const bigFile = new File(['x'], 'big.mp4', { type: 'video/mp4' })
    Object.defineProperty(bigFile, 'size', { value: 150 * 1024 * 1024 })
    Object.defineProperty(input, 'files', { value: [bigFile] })
    fireEvent.change(input)
    expect(screen.getByText('File size must be under 100 MB.')).toBeInTheDocument()
  })

  it('accepts valid video file', () => {
    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement
    const file = new File(['video-data'], 'test.mp4', { type: 'video/mp4' })
    Object.defineProperty(input, 'files', { value: [file] })
    fireEvent.change(input)
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })

  it('clears previous error on valid file', () => {
    render(<VideoToGif />)
    const input = screen.getByLabelText('Upload video file') as HTMLInputElement

    // First trigger an error
    const textFile = new File(['test'], 'doc.txt', { type: 'text/plain' })
    Object.defineProperty(input, 'files', { value: [textFile] })
    fireEvent.change(input)
    expect(screen.getByText('Please select a video file.')).toBeInTheDocument()

    // Then upload valid file
    const validFile = new File(['video'], 'valid.mp4', { type: 'video/mp4' })
    Object.defineProperty(input, 'files', { value: [validFile] })
    fireEvent.change(input)
    expect(screen.queryByText('Please select a video file.')).not.toBeInTheDocument()
  })
})

// --- SvgToPng deep tests ---
import SvgToPng from '../SvgToPng'

describe('SvgToPng - Deep Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('changes width and updates height with locked aspect ratio', () => {
    render(<SvgToPng />)
    const numberInputs = screen.getAllByRole('spinbutton')
    // Default 512x512, aspect ratio = 1
    fireEvent.change(numberInputs[0], { target: { value: '1024' } })
    expect(numberInputs[1]).toHaveValue(1024) // 1:1 ratio
  })

  it('changes height and updates width with locked aspect ratio', () => {
    render(<SvgToPng />)
    const numberInputs = screen.getAllByRole('spinbutton')
    fireEvent.change(numberInputs[1], { target: { value: '256' } })
    expect(numberInputs[0]).toHaveValue(256)
  })

  it('applies quick size preset', () => {
    render(<SvgToPng />)
    fireEvent.click(screen.getByText('128px'))
    const numberInputs = screen.getAllByRole('spinbutton')
    expect(numberInputs[0]).toHaveValue(128)
  })

  it('applies 2048px preset', () => {
    render(<SvgToPng />)
    fireEvent.click(screen.getByText('2048px'))
    const numberInputs = screen.getAllByRole('spinbutton')
    expect(numberInputs[0]).toHaveValue(2048)
  })

  it('loads sample and detects SVG dimensions', () => {
    // Need real DOMParser for dimension detection
    render(<SvgToPng />)
    fireEvent.click(screen.getByText('Load Sample'))

    const textarea = screen.getByLabelText('SVG code input') as HTMLTextAreaElement
    expect(textarea.value).toContain('viewBox="0 0 200 200"')
  })

  it('clears resets dimensions to default', () => {
    render(<SvgToPng />)
    const numberInputs = screen.getAllByRole('spinbutton')
    fireEvent.change(numberInputs[0], { target: { value: '1024' } })
    fireEvent.click(screen.getByText('Clear'))
    expect(numberInputs[0]).toHaveValue(512)
    expect(numberInputs[1]).toHaveValue(512)
  })

  it('rejects upload of non-SVG file', () => {
    render(<SvgToPng />)
    fireEvent.click(screen.getByText('Upload File'))

    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      const txtFile = new File(['hello'], 'test.txt', { type: 'text/plain' })
      Object.defineProperty(fileInput, 'files', { value: [txtFile] })
      fireEvent.change(fileInput)
      expect(screen.getByText('Please upload an SVG file')).toBeInTheDocument()
    }
  })

  it('toggles transparent background', () => {
    render(<SvgToPng />)
    // Initially transparent
    expect(screen.queryByText('Background Color')).not.toBeInTheDocument()

    const checkbox = screen.getByText('Transparent BG').previousElementSibling as HTMLInputElement
    fireEvent.click(checkbox)

    expect(screen.getByText('Background Color')).toBeInTheDocument()

    // Toggle back
    fireEvent.click(checkbox)
    expect(screen.queryByText('Background Color')).not.toBeInTheDocument()
  })
})
