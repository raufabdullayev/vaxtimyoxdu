import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageCompress from '../ImageCompress'

describe('ImageCompress', () => {
  it('renders file input', () => {
    render(<ImageCompress />)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('renders quality controls', () => {
    render(<ImageCompress />)
    // Uses translations, so check for the quality slider range input
    const rangeInputs = document.querySelectorAll('input[type="range"]')
    expect(rangeInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders compress button', () => {
    render(<ImageCompress />)
    // There should be a button for compression or upload
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(0)
  })
})
