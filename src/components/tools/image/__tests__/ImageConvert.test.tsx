import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageConvert from '../ImageConvert'

describe('ImageConvert', () => {
  it('renders file input', () => {
    render(<ImageConvert />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('renders output format options', () => {
    render(<ImageConvert />)
    expect(screen.getByText('JPEG')).toBeInTheDocument()
    expect(screen.getByText('PNG')).toBeInTheDocument()
    expect(screen.getByText('WebP')).toBeInTheDocument()
  })
})
