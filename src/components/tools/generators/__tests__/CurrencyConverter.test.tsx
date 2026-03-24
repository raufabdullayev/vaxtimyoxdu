import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CurrencyConverter from '../CurrencyConverter'

describe('CurrencyConverter', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rates: { EUR: 0.85, GBP: 0.73 } }),
    } as Response)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders amount input', () => {
    render(<CurrencyConverter />)
    const inputs = document.querySelectorAll('input[type="number"]')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders currency selectors', () => {
    render(<CurrencyConverter />)
    const selects = document.querySelectorAll('select')
    expect(selects.length).toBeGreaterThanOrEqual(1)
  })

  it('has swap button', () => {
    render(<CurrencyConverter />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
