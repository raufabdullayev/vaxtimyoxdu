import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CompoundInterestCalculator from '../CompoundInterestCalculator'

describe('CompoundInterestCalculator', () => {
  it('renders input fields', () => {
    render(<CompoundInterestCalculator />)
    const inputs = document.querySelectorAll('input[type="number"]')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  it('renders buttons', () => {
    render(<CompoundInterestCalculator />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('handles input changes', () => {
    render(<CompoundInterestCalculator />)
    const inputs = document.querySelectorAll('input[type="number"]')
    fireEvent.change(inputs[0], { target: { value: '10000' } })
    expect((inputs[0] as HTMLInputElement).value).toBe('10000')
  })
})
