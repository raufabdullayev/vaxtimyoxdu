import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ImageCrop from '../ImageCrop'

describe('ImageCrop', () => {
  it('renders file input', () => {
    render(<ImageCrop />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('accepts image file types', () => {
    render(<ImageCrop />)
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(fileInput.accept).toContain('image')
  })
})
