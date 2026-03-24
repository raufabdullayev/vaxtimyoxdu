import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import BmiCalculator from '../BmiCalculator'

describe('BmiCalculator', () => {
  it('renders unit system selector and inputs', () => {
    render(<BmiCalculator />)
    expect(screen.getByLabelText('unitSystem')).toBeInTheDocument()
    expect(screen.getByLabelText('weightKg')).toBeInTheDocument()
    expect(screen.getByLabelText('heightCm')).toBeInTheDocument()
  })

  it('shows no result initially', () => {
    render(<BmiCalculator />)
    expect(screen.queryByText('yourBmi')).not.toBeInTheDocument()
  })

  it('calculates BMI for metric values (normal weight)', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '70' } })
    fireEvent.change(screen.getByLabelText('heightCm'), { target: { value: '175' } })

    expect(screen.getByText('yourBmi')).toBeInTheDocument()
    expect(screen.getByText('22.9')).toBeInTheDocument()
    expect(screen.getByText('normalWeight')).toBeInTheDocument()
  })

  it('shows underweight category', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '45' } })
    fireEvent.change(screen.getByLabelText('heightCm'), { target: { value: '175' } })

    expect(screen.getByText('underweight')).toBeInTheDocument()
  })

  it('shows overweight category', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '85' } })
    fireEvent.change(screen.getByLabelText('heightCm'), { target: { value: '170' } })

    expect(screen.getByText('overweight')).toBeInTheDocument()
  })

  it('shows obese category', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '110' } })
    fireEvent.change(screen.getByLabelText('heightCm'), { target: { value: '170' } })

    expect(screen.getByText('obese')).toBeInTheDocument()
  })

  it('switches to imperial units', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('unitSystem'), { target: { value: 'imperial' } })

    expect(screen.getByLabelText('weightLbs')).toBeInTheDocument()
    expect(screen.getByLabelText('heightInches')).toBeInTheDocument()
  })

  it('calculates BMI for imperial values', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('unitSystem'), { target: { value: 'imperial' } })
    fireEvent.change(screen.getByLabelText('weightLbs'), { target: { value: '154' } })
    fireEvent.change(screen.getByLabelText('heightInches'), { target: { value: '69' } })

    expect(screen.getByText('yourBmi')).toBeInTheDocument()
  })

  it('clears values when switching unit system', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '70' } })
    fireEvent.change(screen.getByLabelText('unitSystem'), { target: { value: 'imperial' } })

    expect(screen.queryByText('yourBmi')).not.toBeInTheDocument()
  })

  it('shows healthy weight range', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '70' } })
    fireEvent.change(screen.getByLabelText('heightCm'), { target: { value: '175' } })

    expect(screen.getByText('healthyWeightRange')).toBeInTheDocument()
  })

  it('shows BMI scale with categories', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '70' } })
    fireEvent.change(screen.getByLabelText('heightCm'), { target: { value: '175' } })

    expect(screen.getByText('bmiScale')).toBeInTheDocument()
  })

  it('does not calculate with zero values', () => {
    render(<BmiCalculator />)
    fireEvent.change(screen.getByLabelText('weightKg'), { target: { value: '0' } })
    fireEvent.change(screen.getByLabelText('heightCm'), { target: { value: '175' } })

    expect(screen.queryByText('yourBmi')).not.toBeInTheDocument()
  })
})
