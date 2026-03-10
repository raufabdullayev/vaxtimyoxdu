import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PomodoroTimer from '../PomodoroTimer'

describe('PomodoroTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Mock AudioContext
    const mockOscillator = {
      connect: vi.fn(),
      frequency: { value: 0 },
      type: '',
      start: vi.fn(),
      stop: vi.fn(),
    }
    const mockGainNode = {
      connect: vi.fn(),
      gain: { value: 0 },
    }
    const mockAudioContext = {
      createOscillator: vi.fn(() => mockOscillator),
      createGain: vi.fn(() => mockGainNode),
      destination: {},
      currentTime: 0,
    }
    vi.stubGlobal('AudioContext', vi.fn(() => mockAudioContext))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('renders mode tabs (Work, Short Break, Long Break)', () => {
    render(<PomodoroTimer />)

    expect(screen.getByRole('button', { name: 'Work' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Short Break' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Long Break' })).toBeInTheDocument()
  })

  it('shows Work mode as active by default', () => {
    render(<PomodoroTimer />)

    const workBtn = screen.getByRole('button', { name: 'Work' })
    expect(workBtn.className).toContain('bg-primary')
  })

  it('displays 25:00 by default (work mode)', () => {
    render(<PomodoroTimer />)

    expect(screen.getByText('25:00')).toBeInTheDocument()
  })

  it('renders Start button', () => {
    render(<PomodoroTimer />)

    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  it('renders Reset button', () => {
    render(<PomodoroTimer />)

    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('shows Customize Durations link', () => {
    render(<PomodoroTimer />)

    expect(screen.getByText('Customize Durations')).toBeInTheDocument()
  })

  it('shows completed sessions count starting at 0', () => {
    render(<PomodoroTimer />)

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText(/Completed sessions/)).toBeInTheDocument()
  })

  it('switches to Short Break mode', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByRole('button', { name: 'Short Break' }))

    expect(screen.getByText('05:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Short Break' }).className).toContain('bg-primary')
  })

  it('switches to Long Break mode', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByRole('button', { name: 'Long Break' }))

    expect(screen.getByText('15:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Long Break' }).className).toContain('bg-primary')
  })

  it('changes button text to Pause when running', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Start'))

    expect(screen.getByText('Pause')).toBeInTheDocument()
  })

  it('pauses the timer', () => {
    render(<PomodoroTimer />)

    // Start
    fireEvent.click(screen.getByText('Start'))
    expect(screen.getByText('Pause')).toBeInTheDocument()

    // Advance time so timeLeft differs from full duration
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    // Pause
    fireEvent.click(screen.getByText('Pause'))
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('counts down when running', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('24:59')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('24:58')).toBeInTheDocument()
  })

  it('resets timer to full duration', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    fireEvent.click(screen.getByText('Reset'))

    expect(screen.getByText('25:00')).toBeInTheDocument()
    expect(screen.getByText('Start')).toBeInTheDocument()
  })

  it('stops running when switching modes', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Start'))
    expect(screen.getByText('Pause')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Short Break' }))

    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('05:00')).toBeInTheDocument()
  })

  it('shows settings when Customize Durations is clicked', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Customize Durations'))

    expect(screen.getByText('Hide Settings')).toBeInTheDocument()
    // Should show input fields for all three modes
    const inputs = screen.getAllByRole('spinbutton')
    expect(inputs).toHaveLength(3)
  })

  it('hides settings when Hide Settings is clicked', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Customize Durations'))
    fireEvent.click(screen.getByText('Hide Settings'))

    expect(screen.getByText('Customize Durations')).toBeInTheDocument()
  })

  it('updates work duration from settings', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Customize Durations'))

    const inputs = screen.getAllByRole('spinbutton')
    // First input is Work duration
    fireEvent.change(inputs[0], { target: { value: '30' } })

    // Timer should update to 30:00
    expect(screen.getByText('30:00')).toBeInTheDocument()
  })

  it('clamps duration to min 1 minute', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Customize Durations'))

    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '0' } })

    // Should clamp to 1 minute
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })

  it('clamps duration to max 120 minutes', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Customize Durations'))

    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '200' } })

    // Should clamp to 120 minutes
    expect(screen.getByText('120:00')).toBeInTheDocument()
  })

  it('shows completion message when timer reaches zero', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Customize Durations'))
    const inputs = screen.getAllByRole('spinbutton')
    // Set work to 1 minute for faster test
    fireEvent.change(inputs[0], { target: { value: '1' } })

    fireEvent.click(screen.getByText('Start'))

    // Advance 60 seconds
    act(() => {
      vi.advanceTimersByTime(60000)
    })

    expect(screen.getByText('Work session complete! Time for a break.')).toBeInTheDocument()
  })

  it('increments session count when work timer completes', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Customize Durations'))
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[0], { target: { value: '1' } })

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(60000)
    })

    // Session count should be 1
    const sessionText = screen.getByText(/Completed sessions/)
    const sessionCount = sessionText.querySelector('.font-bold')
    expect(sessionCount).toHaveTextContent('1')
  })

  it('does not increment sessions for break timers', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByRole('button', { name: 'Short Break' }))
    fireEvent.click(screen.getByText('Customize Durations'))
    const inputs = screen.getAllByRole('spinbutton')
    // Set break to 1 minute
    fireEvent.change(inputs[1], { target: { value: '1' } })

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(60000)
    })

    const sessionText = screen.getByText(/Completed sessions/)
    const sessionCount = sessionText.querySelector('.font-bold')
    expect(sessionCount).toHaveTextContent('0')
  })

  it('shows break completion message for break timer', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByRole('button', { name: 'Short Break' }))
    fireEvent.click(screen.getByText('Customize Durations'))
    const inputs = screen.getAllByRole('spinbutton')
    fireEvent.change(inputs[1], { target: { value: '1' } })

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(60000)
    })

    expect(screen.getByText('Break is over! Ready to work?')).toBeInTheDocument()
  })

  it('updates document title when running', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(document.title).toContain('24:59')
    expect(document.title).toContain('Work')
  })

  it('resets document title when stopped', () => {
    render(<PomodoroTimer />)

    fireEvent.click(screen.getByText('Start'))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    fireEvent.click(screen.getByText('Pause'))

    expect(document.title).toBe('Pomodoro Timer | Vaxtim Yoxdu')
  })
})
