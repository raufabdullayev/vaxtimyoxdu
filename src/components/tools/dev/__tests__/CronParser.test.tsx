import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CronParser from '../CronParser'

describe('CronParser', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  it('renders with default expression', () => {
    render(<CronParser />)
    const input = screen.getByLabelText('Cron expression input') as HTMLInputElement
    expect(input.value).toBe('0 0 * * *')
  })

  it('shows human-readable description', () => {
    render(<CronParser />)
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getAllByText(/midnight/i).length).toBeGreaterThanOrEqual(1)
  })

  it('shows field breakdown', () => {
    render(<CronParser />)
    expect(screen.getByText('Fields')).toBeInTheDocument()
    expect(screen.getByText('Minute')).toBeInTheDocument()
    expect(screen.getByText('Hour')).toBeInTheDocument()
    expect(screen.getByText('Day of Month')).toBeInTheDocument()
    expect(screen.getByText('Month')).toBeInTheDocument()
    expect(screen.getByText('Day of Week')).toBeInTheDocument()
  })

  it('shows next executions', () => {
    render(<CronParser />)
    expect(screen.getByText(/Next 5 Executions/)).toBeInTheDocument()
  })

  it('shows presets', () => {
    render(<CronParser />)
    expect(screen.getByText('Quick Presets')).toBeInTheDocument()
    expect(screen.getByLabelText(/Set cron to: Every minute/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Set cron to: Every hour/)).toBeInTheDocument()
  })

  it('applies preset when clicked', () => {
    render(<CronParser />)
    fireEvent.click(screen.getByLabelText(/Set cron to: Every 5 minutes/))
    const input = screen.getByLabelText('Cron expression input') as HTMLInputElement
    expect(input.value).toBe('*/5 * * * *')
  })

  it('shows error for invalid expression', () => {
    render(<CronParser />)
    const input = screen.getByLabelText('Cron expression input')
    fireEvent.change(input, { target: { value: '* * *' } })

    expect(screen.getByText(/must have exactly 5 fields/)).toBeInTheDocument()
  })

  it('shows error for invalid field values', () => {
    render(<CronParser />)
    const input = screen.getByLabelText('Cron expression input')
    fireEvent.change(input, { target: { value: '99 * * * *' } })

    expect(screen.getByText(/Invalid field/)).toBeInTheDocument()
  })

  it('updates description when expression changes', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '0 9 * * 1' },
    })

    expect(screen.getAllByText(/9:00 AM/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Monday/).length).toBeGreaterThanOrEqual(1)
  })

  it('handles step expressions', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '*/5 * * * *' },
    })
    expect(screen.getAllByText(/5 minutes/).length).toBeGreaterThanOrEqual(1)
  })

  it('handles range expressions', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '0 8 * * 1-5' },
    })
    expect(screen.getByText(/Monday through Friday/)).toBeInTheDocument()
  })

  it('handles comma-separated values', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '0 0 * * 0,6' },
    })
    expect(screen.getByText(/Sunday, Saturday/)).toBeInTheDocument()
  })

  it('copies expression to clipboard', () => {
    render(<CronParser />)
    fireEvent.click(screen.getByLabelText('Copy cron expression'))
    expect(writeTextMock).toHaveBeenCalledWith('0 0 * * *')
  })

  it('handles specific day of month', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '0 0 15 * *' },
    })
    expect(screen.getByText(/day 15/)).toBeInTheDocument()
  })

  it('handles specific month', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '0 0 1 6 *' },
    })
    expect(screen.getByText(/June/)).toBeInTheDocument()
  })

  it('handles step hour expression', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '30 */2 * * *' },
    })
    expect(screen.getByText(/every 2 hours/)).toBeInTheDocument()
  })

  it('handles PM hours', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '0 15 * * *' },
    })
    expect(screen.getAllByText(/3:00 PM/).length).toBeGreaterThanOrEqual(1)
  })

  it('handles step day of month', () => {
    render(<CronParser />)
    fireEvent.change(screen.getByLabelText('Cron expression input'), {
      target: { value: '0 0 */3 * *' },
    })
    expect(screen.getByText(/every 3 days/)).toBeInTheDocument()
  })
})
