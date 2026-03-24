import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PdfCompress from '../PdfCompress'

describe('PdfCompress', () => {
  it('renders file input', () => {
    render(<PdfCompress />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('accepts only PDF files', () => {
    render(<PdfCompress />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(fileInput.accept).toContain('pdf')
  })

  it('renders compress button', () => {
    render(<PdfCompress />)
    expect(screen.getByText(/Compress/i)).toBeInTheDocument()
  })
})
