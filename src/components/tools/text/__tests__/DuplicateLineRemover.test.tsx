import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DuplicateLineRemover from '../DuplicateLineRemover'

describe('DuplicateLineRemover', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders textarea', () => {
    render(<DuplicateLineRemover />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('removes duplicate lines', () => {
    render(<DuplicateLineRemover />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'apple\nbanana\napple\ncherry' } })
    // Should show statistics
    expect(screen.getByText(/4/)).toBeInTheDocument() // total lines
    expect(screen.getByText(/3/)).toBeInTheDocument() // unique
  })

  it('has case sensitivity toggle', () => {
    render(<DuplicateLineRemover />)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBeGreaterThanOrEqual(1)
  })

  it('has sort output toggle', () => {
    render(<DuplicateLineRemover />)
    // Should have sort checkbox
    expect(screen.getByText(/sort/i)).toBeInTheDocument()
  })
})
