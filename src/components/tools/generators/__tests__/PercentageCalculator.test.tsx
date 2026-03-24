import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import PercentageCalculator from '../PercentageCalculator'

describe('PercentageCalculator', () => {
  it('renders with default percentage-of mode', () => {
    render(<PercentageCalculator />)
    expect(screen.getByText('calculationMode')).toBeInTheDocument()
    expect(screen.getByLabelText('percentage')).toBeInTheDocument()
    expect(screen.getByLabelText('ofValue')).toBeInTheDocument()
  })

  it('shows no result initially', () => {
    render(<PercentageCalculator />)
    expect(screen.queryByText(/% of/)).not.toBeInTheDocument()
  })

  it('calculates percentage-of correctly', () => {
    render(<PercentageCalculator />)
    fireEvent.change(screen.getByLabelText('percentage'), { target: { value: '25' } })
    fireEvent.change(screen.getByLabelText('ofValue'), { target: { value: '200' } })

    expect(screen.getByText('25% of 200')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('switches to is-what-percent mode', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'isWhatPercent' }))

    expect(screen.getByLabelText('value')).toBeInTheDocument()
    expect(screen.getByLabelText('ofTotal')).toBeInTheDocument()
  })

  it('calculates is-what-percent correctly', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'isWhatPercent' }))
    fireEvent.change(screen.getByLabelText('value'), { target: { value: '50' } })
    fireEvent.change(screen.getByLabelText('ofTotal'), { target: { value: '200' } })

    expect(screen.getByText('50 is this % of 200')).toBeInTheDocument()
  })

  it('handles division by zero in is-what-percent mode', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'isWhatPercent' }))
    fireEvent.change(screen.getByLabelText('value'), { target: { value: '50' } })
    fireEvent.change(screen.getByLabelText('ofTotal'), { target: { value: '0' } })

    expect(screen.queryByText(/is this %/)).not.toBeInTheDocument()
  })

  it('switches to percent-change mode', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'percentChange' }))

    expect(screen.getByLabelText('fromValue')).toBeInTheDocument()
    expect(screen.getByLabelText('toValue')).toBeInTheDocument()
  })

  it('calculates percent-change correctly (increase)', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'percentChange' }))
    fireEvent.change(screen.getByLabelText('fromValue'), { target: { value: '100' } })
    fireEvent.change(screen.getByLabelText('toValue'), { target: { value: '150' } })

    expect(screen.getByText('increase')).toBeInTheDocument()
  })

  it('calculates percent-change correctly (decrease)', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'percentChange' }))
    fireEvent.change(screen.getByLabelText('fromValue'), { target: { value: '200' } })
    fireEvent.change(screen.getByLabelText('toValue'), { target: { value: '100' } })

    expect(screen.getByText('decrease')).toBeInTheDocument()
  })

  it('shows no change when values are equal', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'percentChange' }))
    fireEvent.change(screen.getByLabelText('fromValue'), { target: { value: '100' } })
    fireEvent.change(screen.getByLabelText('toValue'), { target: { value: '100' } })

    expect(screen.getByText('noChange')).toBeInTheDocument()
  })

  it('handles division by zero in percent-change mode', () => {
    render(<PercentageCalculator />)
    fireEvent.click(screen.getByRole('radio', { name: 'percentChange' }))
    fireEvent.change(screen.getByLabelText('fromValue'), { target: { value: '0' } })
    fireEvent.change(screen.getByLabelText('toValue'), { target: { value: '100' } })

    expect(screen.queryByText(/Change from/)).not.toBeInTheDocument()
  })

  it('clears values when switching modes', () => {
    render(<PercentageCalculator />)
    fireEvent.change(screen.getByLabelText('percentage'), { target: { value: '25' } })
    fireEvent.change(screen.getByLabelText('ofValue'), { target: { value: '200' } })
    expect(screen.getByText('50')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('radio', { name: 'isWhatPercent' }))
    expect(screen.queryByText('50')).not.toBeInTheDocument()
  })
})
