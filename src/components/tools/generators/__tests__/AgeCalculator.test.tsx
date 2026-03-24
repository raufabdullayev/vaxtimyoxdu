import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import AgeCalculator from '../AgeCalculator'

describe('AgeCalculator', () => {
  it('renders date inputs', () => {
    render(<AgeCalculator />)
    expect(screen.getByLabelText('dateOfBirth')).toBeInTheDocument()
    expect(screen.getByLabelText('calculateAgeAsOf')).toBeInTheDocument()
  })

  it('shows no result when birth date is empty', () => {
    render(<AgeCalculator />)
    expect(screen.queryByText('yourAge')).not.toBeInTheDocument()
  })

  it('calculates age correctly when birth date is set', () => {
    render(<AgeCalculator />)
    const birthInput = screen.getByLabelText('dateOfBirth')
    const targetInput = screen.getByLabelText('calculateAgeAsOf')

    fireEvent.change(birthInput, { target: { value: '2000-01-15' } })
    fireEvent.change(targetInput, { target: { value: '2025-06-20' } })

    expect(screen.getByText('yourAge')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('years')).toBeInTheDocument()
    expect(screen.getByText('months')).toBeInTheDocument()
    expect(screen.getByText('days')).toBeInTheDocument()
  })

  it('shows stats when age is calculated', () => {
    render(<AgeCalculator />)
    fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '2000-01-01' } })
    fireEvent.change(screen.getByLabelText('calculateAgeAsOf'), { target: { value: '2025-01-01' } })

    expect(screen.getByText('totalMonths')).toBeInTheDocument()
    expect(screen.getByText('totalWeeks')).toBeInTheDocument()
    expect(screen.getByText('totalDays')).toBeInTheDocument()
    expect(screen.getByText('nextBirthday')).toBeInTheDocument()
  })

  it('shows error when birth date is after target date', () => {
    render(<AgeCalculator />)
    fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '2030-01-01' } })
    fireEvent.change(screen.getByLabelText('calculateAgeAsOf'), { target: { value: '2025-01-01' } })

    expect(screen.getByText('birthDateError')).toBeInTheDocument()
    expect(screen.queryByText('yourAge')).not.toBeInTheDocument()
  })

  it('handles same day birth and target date', () => {
    render(<AgeCalculator />)
    fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '2025-03-15' } })
    fireEvent.change(screen.getByLabelText('calculateAgeAsOf'), { target: { value: '2025-03-15' } })

    expect(screen.getByText('yourAge')).toBeInTheDocument()
    // All values should be 0 for same day
    const boldValues = screen.getAllByText('0')
    expect(boldValues.length).toBeGreaterThanOrEqual(1)
  })

  it('handles day adjustment when target day < birth day', () => {
    render(<AgeCalculator />)
    fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '2000-01-31' } })
    fireEvent.change(screen.getByLabelText('calculateAgeAsOf'), { target: { value: '2025-02-15' } })

    expect(screen.getByText('yourAge')).toBeInTheDocument()
  })

  it('handles month adjustment when target month < birth month', () => {
    render(<AgeCalculator />)
    fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '2000-11-15' } })
    fireEvent.change(screen.getByLabelText('calculateAgeAsOf'), { target: { value: '2025-03-20' } })

    expect(screen.getByText('24')).toBeInTheDocument()
  })
})
