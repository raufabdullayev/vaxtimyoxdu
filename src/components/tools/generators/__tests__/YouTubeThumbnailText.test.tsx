import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import YouTubeThumbnailText from '../YouTubeThumbnailText'

describe('YouTubeThumbnailText', () => {
  it('renders text input', () => {
    render(<YouTubeThumbnailText />)
    const inputs = document.querySelectorAll('input[type="text"], textarea')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders canvas or preview area', () => {
    render(<YouTubeThumbnailText />)
    // Should have a canvas element or preview div
    expect(document.querySelector('canvas, .preview, [data-testid]')).toBeTruthy()
  })

  it('renders style options', () => {
    render(<YouTubeThumbnailText />)
    const inputs = document.querySelectorAll('input, select')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })
})
