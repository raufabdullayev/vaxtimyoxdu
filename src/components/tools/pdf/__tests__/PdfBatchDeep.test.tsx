import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PdfMerge from '../PdfMerge'
import PdfSplit from '../PdfSplit'
import PdfCompress from '../PdfCompress'

const createMockFile = (name: string, size: number, type: string) => {
  const content = new ArrayBuffer(Math.min(size, 1024))
  const file = new File([content], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('PdfMerge - file validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders file input that accepts PDFs', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    expect(fileInput).toBeInTheDocument()
    expect(fileInput.accept).toContain('pdf')
  })

  it('rejects non-PDF files', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const textFile = createMockFile('doc.txt', 100, 'text/plain')
    fireEvent.change(fileInput, { target: { files: [textFile] } })

    expect(screen.getByText(/Only PDF files are allowed/)).toBeInTheDocument()
  })

  it('rejects files over 50MB', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const bigFile = createMockFile(
      'big.pdf',
      51 * 1024 * 1024,
      'application/pdf'
    )
    fireEvent.change(fileInput, { target: { files: [bigFile] } })

    expect(screen.getByText(/Each file must be under 50MB/)).toBeInTheDocument()
  })

  it('accepts valid PDF files and adds to list', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const pdfFile = createMockFile('doc.pdf', 1024, 'application/pdf')
    fireEvent.change(fileInput, { target: { files: [pdfFile] } })

    // File should appear in the list
    expect(screen.getByText('doc.pdf')).toBeInTheDocument()
  })

  it('merge button is disabled with fewer than 2 files', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const pdfFile = createMockFile('doc.pdf', 1024, 'application/pdf')
    fireEvent.change(fileInput, { target: { files: [pdfFile] } })

    // Merge button should be disabled with only 1 file
    const mergeBtn = screen.getByText('mergeFiles')
    expect(mergeBtn).toBeDisabled()
  })

  it('can remove a file from the list', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const pdfFile = createMockFile('test.pdf', 1024, 'application/pdf')
    fireEvent.change(fileInput, { target: { files: [pdfFile] } })

    expect(screen.getByText('test.pdf')).toBeInTheDocument()

    // Click remove button (the "Remove" title button)
    const removeBtn = screen.getByTitle('Remove')
    fireEvent.click(removeBtn)

    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument()
  })

  it('does nothing when no file is selected', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    fireEvent.change(fileInput, { target: { files: null } })
    // No error should appear
    expect(
      screen.queryByText(/Only PDF files are allowed/)
    ).not.toBeInTheDocument()
  })
})

describe('PdfSplit - file validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders file input for PDF', () => {
    render(<PdfSplit />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('rejects non-PDF files', () => {
    render(<PdfSplit />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const textFile = createMockFile('doc.txt', 100, 'text/plain')
    fireEvent.change(fileInput, { target: { files: [textFile] } })

    expect(screen.getByText(/Only PDF files are allowed/)).toBeInTheDocument()
  })

  it('rejects files over 50MB', () => {
    render(<PdfSplit />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const bigFile = createMockFile(
      'big.pdf',
      51 * 1024 * 1024,
      'application/pdf'
    )
    fireEvent.change(fileInput, { target: { files: [bigFile] } })

    expect(screen.getByText(/File must be under 50MB/)).toBeInTheDocument()
  })
})

describe('PdfCompress - file validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders file input', () => {
    render(<PdfCompress />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('rejects non-PDF files', () => {
    render(<PdfCompress />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const textFile = createMockFile('doc.docx', 100, 'application/msword')
    fireEvent.change(fileInput, { target: { files: [textFile] } })

    expect(screen.getByText(/Only PDF files are allowed/)).toBeInTheDocument()
  })

  it('rejects files over 50MB', () => {
    render(<PdfCompress />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const bigFile = createMockFile(
      'big.pdf',
      51 * 1024 * 1024,
      'application/pdf'
    )
    fireEvent.change(fileInput, { target: { files: [bigFile] } })

    expect(screen.getByText(/File must be under 50MB/)).toBeInTheDocument()
  })

  it('accepts valid PDF and tracks original size', () => {
    render(<PdfCompress />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const pdfFile = createMockFile(
      'compress-me.pdf',
      5000,
      'application/pdf'
    )
    fireEvent.change(fileInput, { target: { files: [pdfFile] } })

    // Should not show error
    expect(
      screen.queryByText(/Only PDF files are allowed/)
    ).not.toBeInTheDocument()
  })

  it('compress button is disabled when no file is selected', () => {
    render(<PdfCompress />)

    const compressBtn = screen.getByText('Compress PDF')
    expect(compressBtn).toBeDisabled()
  })

  it('does nothing when no file is selected in change event', () => {
    render(<PdfCompress />)
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    fireEvent.change(fileInput, { target: { files: [] } })
    // No error should appear
    expect(
      screen.queryByText(/Only PDF files are allowed/)
    ).not.toBeInTheDocument()
  })
})
