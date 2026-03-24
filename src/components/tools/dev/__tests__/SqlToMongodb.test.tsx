import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SqlToMongodb from '../SqlToMongodb'

describe('SqlToMongodb', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders SQL input textarea', () => {
    render(<SqlToMongodb />)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('renders convert button', () => {
    render(<SqlToMongodb />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('converts simple SELECT query', () => {
    render(<SqlToMongodb />)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'SELECT * FROM users' } })
    // Should show MongoDB equivalent
    const convertBtn = screen.getAllByRole('button')[0]
    fireEvent.click(convertBtn)
    expect(screen.getByText(/find|collection/i)).toBeTruthy()
  })
})
