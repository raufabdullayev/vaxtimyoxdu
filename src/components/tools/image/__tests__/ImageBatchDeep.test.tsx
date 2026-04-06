import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ImageCrop from '../ImageCrop'
import ImageResize from '../ImageResize'
import ImageConvert from '../ImageConvert'
import ImageCompress from '../ImageCompress'
import ImageToBase64 from '../ImageToBase64'
import Base64ToImage from '../Base64ToImage'

// Mock URL.createObjectURL
const mockCreateObjectURL = vi.fn(() => 'blob:mock-url')
const mockRevokeObjectURL = vi.fn()
Object.defineProperty(URL, 'createObjectURL', { value: mockCreateObjectURL })
Object.defineProperty(URL, 'revokeObjectURL', { value: mockRevokeObjectURL })

const createMockFile = (name: string, size: number, type: string) => {
  const content = new ArrayBuffer(Math.min(size, 1024))
  const file = new File([content], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('ImageCrop - file validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders upload area', () => {
    render(<ImageCrop />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('rejects non-image files', () => {
    render(<ImageCrop />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const textFile = createMockFile('doc.txt', 100, 'text/plain')
    fireEvent.change(fileInput, { target: { files: [textFile] } })

    expect(screen.getByText(/Please select an image file/)).toBeInTheDocument()
  })

  it('rejects files over 20MB', () => {
    render(<ImageCrop />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const bigFile = createMockFile(
      'big.png',
      21 * 1024 * 1024,
      'image/png'
    )
    fireEvent.change(fileInput, { target: { files: [bigFile] } })

    expect(screen.getByText(/File too large/)).toBeInTheDocument()
  })

  it('accepts valid image files', () => {
    render(<ImageCrop />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const imgFile = createMockFile('photo.jpg', 1024, 'image/jpeg')
    fireEvent.change(fileInput, { target: { files: [imgFile] } })

    expect(mockCreateObjectURL).toHaveBeenCalled()
  })
})

describe('ImageResize - file validation and UI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders upload area with format info', () => {
    render(<ImageResize />)
    expect(screen.getByText(/JPEG, PNG, WebP/)).toBeInTheDocument()
  })

  it('rejects non-image files', () => {
    render(<ImageResize />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const textFile = createMockFile('doc.pdf', 100, 'application/pdf')
    fireEvent.change(fileInput, { target: { files: [textFile] } })

    expect(screen.getByText(/Please select an image file/)).toBeInTheDocument()
  })

  it('rejects files over 20MB', () => {
    render(<ImageResize />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const bigFile = createMockFile(
      'big.png',
      21 * 1024 * 1024,
      'image/png'
    )
    fireEvent.change(fileInput, { target: { files: [bigFile] } })

    expect(screen.getByText(/File too large/)).toBeInTheDocument()
  })

  it('accepts valid image files', () => {
    render(<ImageResize />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const imgFile = createMockFile('photo.jpg', 1024, 'image/jpeg')
    fireEvent.change(fileInput, { target: { files: [imgFile] } })

    expect(mockCreateObjectURL).toHaveBeenCalled()
  })

  it('does nothing if no file is selected', () => {
    render(<ImageResize />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    fireEvent.change(fileInput, { target: { files: [] } })
    expect(mockCreateObjectURL).not.toHaveBeenCalled()
  })
})

describe('ImageConvert - file validation and format selection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders file input and format selector', () => {
    render(<ImageConvert />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('rejects non-image files', () => {
    render(<ImageConvert />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const textFile = createMockFile('doc.txt', 100, 'text/plain')
    fireEvent.change(fileInput, { target: { files: [textFile] } })

    expect(screen.getByText(/Please select an image file/)).toBeInTheDocument()
  })

  it('rejects files over 20MB', () => {
    render(<ImageConvert />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const bigFile = createMockFile(
      'big.png',
      21 * 1024 * 1024,
      'image/png'
    )
    fireEvent.change(fileInput, { target: { files: [bigFile] } })

    expect(screen.getByText(/File too large/)).toBeInTheDocument()
  })

  it('accepts valid image files and shows preview', () => {
    render(<ImageConvert />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const imgFile = createMockFile('photo.jpg', 1024, 'image/jpeg')
    fireEvent.change(fileInput, { target: { files: [imgFile] } })

    expect(mockCreateObjectURL).toHaveBeenCalled()
  })
})

describe('ImageCompress - file validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders file input and quality controls', () => {
    render(<ImageCompress />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
    const rangeInputs = document.querySelectorAll('input[type="range"]')
    expect(rangeInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('accepts valid image files', () => {
    render(<ImageCompress />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const imgFile = createMockFile('photo.jpg', 1024, 'image/jpeg')
    fireEvent.change(fileInput, { target: { files: [imgFile] } })

    expect(mockCreateObjectURL).toHaveBeenCalled()
  })
})

describe('ImageToBase64 - file validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders file input', () => {
    render(<ImageToBase64 />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })
})

describe('Base64ToImage - input and rendering', () => {
  it('renders textarea for base64 input', () => {
    render(<Base64ToImage />)
    const textarea = document.querySelector('textarea')
    expect(textarea).toBeInTheDocument()
  })

  it('renders convert button', () => {
    render(<Base64ToImage />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
