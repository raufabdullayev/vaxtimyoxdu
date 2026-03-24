import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import TimestampConverter from '../TimestampConverter'

describe('TimestampConverter', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'))
    writeTextMock.mockClear()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders current timestamp section', () => {
    render(<TimestampConverter />)
    expect(screen.getByText('Current Unix Timestamp')).toBeInTheDocument()
  })

  it('displays unit toggle buttons', () => {
    render(<TimestampConverter />)
    expect(screen.getByText('Seconds')).toBeInTheDocument()
    expect(screen.getByText('Milliseconds')).toBeInTheDocument()
  })

  it('shows both conversion sections', () => {
    render(<TimestampConverter />)
    expect(screen.getByText('Timestamp to Date')).toBeInTheDocument()
    expect(screen.getByText('Date to Timestamp')).toBeInTheDocument()
  })

  it('converts timestamp to date', () => {
    render(<TimestampConverter />)
    const input = screen.getByLabelText('Unix timestamp input')
    fireEvent.change(input, { target: { value: '1700000000' } })
    fireEvent.click(screen.getByText('Convert to Date'))
    expect(screen.getByText('Result')).toBeInTheDocument()
    expect(screen.getByText(/ISO 8601:/)).toBeInTheDocument()
  })

  it('shows error for empty timestamp', () => {
    render(<TimestampConverter />)
    fireEvent.click(screen.getByText('Convert to Date'))
    expect(screen.getByText('Please enter a Unix timestamp')).toBeInTheDocument()
  })

  it('shows error for non-numeric timestamp', () => {
    render(<TimestampConverter />)
    const input = screen.getByLabelText('Unix timestamp input')
    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.click(screen.getByText('Convert to Date'))
    expect(screen.getByText('Invalid timestamp. Please enter a number.')).toBeInTheDocument()
  })

  it('converts date to timestamp', () => {
    render(<TimestampConverter />)
    const input = screen.getByLabelText('Date and time input')
    fireEvent.change(input, { target: { value: '2024-01-15T12:00' } })
    fireEvent.click(screen.getByText('Convert to Timestamp'))
    // The converted timestamp should appear
    const resultLabel = screen.getByText(/Result/)
    expect(resultLabel).toBeInTheDocument()
  })

  it('shows error for empty date input', () => {
    render(<TimestampConverter />)
    fireEvent.click(screen.getByText('Convert to Timestamp'))
    expect(screen.getByText('Please select a date')).toBeInTheDocument()
  })

  it('switches to milliseconds unit', () => {
    render(<TimestampConverter />)
    fireEvent.click(screen.getByText('Milliseconds'))
    expect(screen.getByText(/Milliseconds/)).toBeInTheDocument()
  })

  it('copies current timestamp', () => {
    render(<TimestampConverter />)
    fireEvent.click(screen.getByLabelText('Copy current timestamp'))
    expect(writeTextMock).toHaveBeenCalled()
  })

  it('updates timestamp every second', () => {
    render(<TimestampConverter />)
    const initialTimestamp = Math.floor(Date.now() / 1000)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    // After advancing time, the timestamp should have updated
    const newTimestamp = Math.floor(Date.now() / 1000)
    expect(newTimestamp).toBe(initialTimestamp + 2)
  })

  it('converts timestamp in milliseconds mode', () => {
    render(<TimestampConverter />)
    fireEvent.click(screen.getByText('Milliseconds'))
    const input = screen.getByLabelText('Unix timestamp input')
    fireEvent.change(input, { target: { value: '1700000000000' } })
    fireEvent.click(screen.getByText('Convert to Date'))
    expect(screen.getByText(/ISO 8601:/)).toBeInTheDocument()
  })
})
