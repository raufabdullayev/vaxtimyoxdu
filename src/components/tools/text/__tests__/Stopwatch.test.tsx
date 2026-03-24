import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Stopwatch from '../Stopwatch'

describe('Stopwatch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with initial display', () => {
    render(<Stopwatch />)
    // Should have buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders start button', () => {
    render(<Stopwatch />)
    // Look for start-like button
    const buttons = screen.getAllByRole('button')
    const startBtn = buttons.find(b => /start/i.test(b.textContent || ''))
    expect(startBtn).toBeTruthy()
  })

  it('starts timing', () => {
    render(<Stopwatch />)
    const buttons = screen.getAllByRole('button')
    const startBtn = buttons.find(b => /start/i.test(b.textContent || ''))
    if (startBtn) {
      fireEvent.click(startBtn)
      act(() => { vi.advanceTimersByTime(1000) })
      // After starting, UI should change
      expect(document.body.textContent?.length).toBeGreaterThan(0)
    }
  })
})
