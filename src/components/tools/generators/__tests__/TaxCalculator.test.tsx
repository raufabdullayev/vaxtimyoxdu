import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaxCalculator from '../TaxCalculator'

describe('TaxCalculator', () => {
  it('renders without crashing', () => {
    render(<TaxCalculator />)
    expect(document.querySelector('.space-y-4, .space-y-5, .space-y-6')).toBeInTheDocument()
  })

  it('renders input fields', () => {
    render(<TaxCalculator />)
    const inputs = document.querySelectorAll('input[type="number"]')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })

  it('handles input changes', () => {
    render(<TaxCalculator />)
    const inputs = document.querySelectorAll('input[type="number"]')
    fireEvent.change(inputs[0], { target: { value: '100' } })
    expect((inputs[0] as HTMLInputElement).value).toBe('100')
  })
})
