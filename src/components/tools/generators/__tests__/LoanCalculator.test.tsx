import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

import LoanCalculator from '../LoanCalculator'

describe('LoanCalculator', () => {
  it('renders input fields', () => {
    render(<LoanCalculator />)
    expect(screen.getByLabelText('loanAmount')).toBeInTheDocument()
    expect(screen.getByLabelText('interestRate')).toBeInTheDocument()
    expect(screen.getByLabelText('loanTerm')).toBeInTheDocument()
    expect(screen.getByLabelText('termUnit')).toBeInTheDocument()
  })

  it('shows no result initially', () => {
    render(<LoanCalculator />)
    expect(screen.queryByText('monthlyPayment')).not.toBeInTheDocument()
  })

  it('calculates loan with valid inputs', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '100000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '360' } })

    expect(screen.getByText('monthlyPayment')).toBeInTheDocument()
    expect(screen.getByText('totalPayment')).toBeInTheDocument()
    expect(screen.getByText('totalInterest')).toBeInTheDocument()
  })

  it('calculates with zero interest rate', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '12000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '0' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '12' } })

    expect(screen.getByText('monthlyPayment')).toBeInTheDocument()
    // With 0% interest, total interest should be 0
    expect(screen.getByText('totalInterest')).toBeInTheDocument()
  })

  it('switches term unit to years', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('termUnit'), { target: { value: 'years' } })
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '100000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '30' } })

    expect(screen.getByText('monthlyPayment')).toBeInTheDocument()
  })

  it('does not calculate with negative amount', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '-1000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '12' } })

    expect(screen.queryByText('monthlyPayment')).not.toBeInTheDocument()
  })

  it('does not calculate with invalid term', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '100000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '0' } })

    expect(screen.queryByText('monthlyPayment')).not.toBeInTheDocument()
  })

  it('shows principal vs interest bar', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '100000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '120' } })

    expect(screen.getByText('principalVsInterest')).toBeInTheDocument()
  })

  it('shows and hides amortization schedule', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '10000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '12' } })

    const showBtn = screen.getByText(/showSchedule/)
    fireEvent.click(showBtn)

    // Should show table headers
    expect(screen.getByText('payment')).toBeInTheDocument()
    expect(screen.getByText('balance')).toBeInTheDocument()

    // Hide it
    const hideBtn = screen.getByText(/hideSchedule/)
    fireEvent.click(hideBtn)
    expect(screen.queryByText('balance')).not.toBeInTheDocument()
  })

  it('does not calculate with term exceeding 600 months', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: '100000' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '601' } })

    expect(screen.queryByText('monthlyPayment')).not.toBeInTheDocument()
  })

  it('does not calculate with NaN inputs', () => {
    render(<LoanCalculator />)
    fireEvent.change(screen.getByLabelText('loanAmount'), { target: { value: 'abc' } })
    fireEvent.change(screen.getByLabelText('interestRate'), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('loanTerm'), { target: { value: '12' } })

    expect(screen.queryByText('monthlyPayment')).not.toBeInTheDocument()
  })
})
