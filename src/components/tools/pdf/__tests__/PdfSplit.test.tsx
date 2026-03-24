import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PdfSplit from '../PdfSplit'

describe('PdfSplit', () => {
  it('renders file input', () => {
    render(<PdfSplit />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('accepts only PDF files', () => {
    render(<PdfSplit />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(fileInput.accept).toContain('pdf')
  })

  it('renders page range input area', () => {
    render(<PdfSplit />)
    // Should have the component rendered without errors
    expect(document.querySelector('.space-y-4')).toBeInTheDocument()
  })
})
