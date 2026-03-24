import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageToBase64 from '../ImageToBase64'

describe('ImageToBase64', () => {
  it('renders file input with aria label', () => {
    render(<ImageToBase64 />)
    expect(screen.getByLabelText('Upload image file')).toBeInTheDocument()
  })

  it('shows supported formats info', () => {
    render(<ImageToBase64 />)
    expect(screen.getByText(/Supports JPEG, PNG, GIF, WebP, SVG/)).toBeInTheDocument()
  })

  it('renders upload label', () => {
    render(<ImageToBase64 />)
    expect(screen.getByText('Upload Image')).toBeInTheDocument()
  })
})
