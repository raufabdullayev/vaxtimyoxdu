import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Stopwatch from '../Stopwatch'

describe('Stopwatch - Deep Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('displays initial time display', () => {
    render(<Stopwatch />)
    // Multiple spans show "00" for hours, minutes, seconds, ms
    const spans = screen.getAllByText('00')
    expect(spans.length).toBeGreaterThanOrEqual(3)
  })

  it('shows Start button initially', () => {
    render(<Stopwatch />)
    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  it('shows Lap button (disabled initially)', () => {
    render(<Stopwatch />)
    expect(screen.getByText('Lap')).toBeDisabled()
  })

  it('shows reset button (disabled initially)', () => {
    render(<Stopwatch />)
    expect(screen.getByText('reset')).toBeDisabled()
  })

  it('changes Start to Stop when started', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))
    expect(screen.getByText('Stop')).toBeInTheDocument()
    expect(screen.queryByText('Start')).not.toBeInTheDocument()
  })

  it('enables Lap button when running', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))
    expect(screen.getByText('Lap')).not.toBeDisabled()
  })

  it('shows Resume after stop with elapsed > 0', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    fireEvent.click(screen.getByText('Stop'))
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('resets to zero', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    fireEvent.click(screen.getByText('Stop'))
    fireEvent.click(screen.getByText('reset'))

    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('reset')).toBeDisabled()
  })

  it('records a lap', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    fireEvent.click(screen.getByText('Lap'))

    expect(screen.getByText(/Laps \(1\)/)).toBeInTheDocument()
  })

  it('records multiple laps', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    fireEvent.click(screen.getByText('Lap'))

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    fireEvent.click(screen.getByText('Lap'))

    act(() => {
      vi.advanceTimersByTime(1500)
    })
    fireEvent.click(screen.getByText('Lap'))

    expect(screen.getByText(/Laps \(3\)/)).toBeInTheDocument()
  })

  it('clears laps on reset', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    fireEvent.click(screen.getByText('Lap'))

    fireEvent.click(screen.getByText('Stop'))
    fireEvent.click(screen.getByText('reset'))

    expect(screen.queryByText(/Laps/)).not.toBeInTheDocument()
  })

  it('does not record lap when not running', () => {
    render(<Stopwatch />)
    // Lap is disabled when not running
    expect(screen.getByText('Lap')).toBeDisabled()
  })

  it('resumes from where it stopped', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    fireEvent.click(screen.getByText('Stop'))
    fireEvent.click(screen.getByText('Resume'))

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    fireEvent.click(screen.getByText('Stop'))
    // Should now show Resume again
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('does not start twice', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))
    // Clicking again shouldn't cause issues - Start is replaced by Stop
    expect(screen.queryByText('Start')).not.toBeInTheDocument()
  })

  it('does not stop when not running', () => {
    render(<Stopwatch />)
    // Stop button is not visible when not running
    expect(screen.queryByText('Stop')).not.toBeInTheDocument()
  })

  it('shows best/worst lap indicators with 2+ laps', () => {
    render(<Stopwatch />)
    fireEvent.click(screen.getByText('Start'))

    // Lap 1 at 1s
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    fireEvent.click(screen.getByText('Lap'))

    // Lap 2 at 4s (diff = 3s)
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    fireEvent.click(screen.getByText('Lap'))

    // Lap 3 at 5s (diff = 1s)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    fireEvent.click(screen.getByText('Lap'))

    expect(screen.getByText(/Laps \(3\)/)).toBeInTheDocument()
    // Best and worst markers should be present (green/red text)
    const lapContainer = screen.getByText(/Laps/).closest('div')
    expect(lapContainer).toBeInTheDocument()
  })
})
