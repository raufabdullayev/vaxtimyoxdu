import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageResize from '../ImageResize'

describe('ImageResize', () => {
  it('renders upload area', () => {
    render(<ImageResize />)
    expect(screen.getByText('Click to select an image')).toBeInTheDocument()
  })

  it('shows accepted formats info', () => {
    render(<ImageResize />)
    expect(screen.getByText(/JPEG, PNG, WebP/)).toBeInTheDocument()
  })

  it('renders hidden file input', () => {
    render(<ImageResize />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })
})
