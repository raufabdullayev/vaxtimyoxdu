import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TipCalculator from '../TipCalculator'

describe('TipCalculator', () => {
  it('renders without crashing', () => {
    render(<TipCalculator />)
    expect(document.querySelector('.space-y-4, .space-y-5, .space-y-6')).toBeInTheDocument()
  })

  it('renders bill amount input', () => {
    render(<TipCalculator />)
    const inputs = document.querySelectorAll('input[type="number"]')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })

  it('handles input changes', () => {
    render(<TipCalculator />)
    const inputs = document.querySelectorAll('input[type="number"]')
    fireEvent.change(inputs[0], { target: { value: '50' } })
    expect((inputs[0] as HTMLInputElement).value).toBe('50')
  })

  it('renders buttons', () => {
    render(<TipCalculator />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })
})
