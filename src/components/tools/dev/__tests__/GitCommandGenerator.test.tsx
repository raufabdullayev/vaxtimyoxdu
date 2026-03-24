import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GitCommandGenerator from '../GitCommandGenerator'

describe('GitCommandGenerator', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders categories or command list', () => {
    render(<GitCommandGenerator />)
    // Should show git commands or categories
    expect(screen.getByText(/git/i)).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<GitCommandGenerator />)
    const inputs = document.querySelectorAll('input[type="text"]')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })

  it('has copy buttons', () => {
    render(<GitCommandGenerator />)
    const copyBtns = screen.getAllByText(/copy/i)
    expect(copyBtns.length).toBeGreaterThanOrEqual(1)
  })
})
