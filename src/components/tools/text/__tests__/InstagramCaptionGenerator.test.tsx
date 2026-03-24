import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InstagramCaptionGenerator from '../InstagramCaptionGenerator'

describe('InstagramCaptionGenerator', () => {
  it('renders input fields', () => {
    render(<InstagramCaptionGenerator />)
    const inputs = document.querySelectorAll('input, textarea')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders tone/style options', () => {
    render(<InstagramCaptionGenerator />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders hashtag section', () => {
    render(<InstagramCaptionGenerator />)
    expect(screen.getByText(/hashtag/i)).toBeInTheDocument()
  })
})
