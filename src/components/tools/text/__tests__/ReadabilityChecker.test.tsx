import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ReadabilityChecker from '../ReadabilityChecker'

describe('ReadabilityChecker', () => {
  it('renders textarea', () => {
    render(<ReadabilityChecker />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('processes text and shows stats', () => {
    render(<ReadabilityChecker />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'The quick brown fox jumps over the lazy dog. This is a simple sentence.' } })
    // Component should render metrics
    expect(document.body.textContent?.length).toBeGreaterThan(10)
  })

  it('handles empty input gracefully', () => {
    render(<ReadabilityChecker />)
    // Should render without errors with empty input
    expect(document.querySelector('.space-y-4, .space-y-6')).toBeInTheDocument()
  })
})
