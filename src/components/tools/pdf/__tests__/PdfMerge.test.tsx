import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PdfMerge from '../PdfMerge'

describe('PdfMerge', () => {
  it('renders file input', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('accepts only PDF files', () => {
    render(<PdfMerge />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(fileInput.accept).toContain('pdf')
  })

  it('renders merge button', () => {
    render(<PdfMerge />)
    expect(screen.getByText(/merge/i)).toBeInTheDocument()
  })
})
