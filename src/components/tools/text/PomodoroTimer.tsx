'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type TimerMode = 'work' | 'break' | 'longBreak'

const DEFAULT_DURATIONS: Record<TimerMode, number> = {
  work: 25,
  break: 5,
  longBreak: 15,
}

const MODE_LABELS: Record<TimerMode, string> = {
  work: 'Work',
  break: 'Short Break',
  longBreak: 'Long Break',
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work')
  const [durations, setDurations] = useState(DEFAULT_DURATIONS)
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS.work * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<AudioContext | null>(null)

  const totalSeconds = durations[mode] * 60
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0

  const playSound = useCallback(() => {
    try {
      const ctx = new AudioContext()
      audioRef.current = ctx

      // Play three beeps
      const playBeep = (startTime: number) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        oscillator.frequency.value = 800
        oscillator.type = 'sine'
        gainNode.gain.value = 0.3
        oscillator.start(startTime)
        oscillator.stop(startTime + 0.2)
      }

      playBeep(ctx.currentTime)
      playBeep(ctx.currentTime + 0.3)
      playBeep(ctx.currentTime + 0.6)
    } catch {
      // Audio not supported
    }
  }, [])

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode)
      setTimeLeft(durations[newMode] * 60)
      setIsRunning(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    },
    [durations]
  )

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            if (intervalRef.current) clearInterval(intervalRef.current)
            playSound()

            if (mode === 'work') {
              setSessions((s) => s + 1)
            }

            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, mode, playSound])

  // Update document title
  useEffect(() => {
    if (isRunning) {
      document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - ${MODE_LABELS[mode]}`
    } else {
      document.title = 'Pomodoro Timer | Vaxtim Yoxdu'
    }
    return () => {
      document.title = 'Pomodoro Timer | Vaxtim Yoxdu'
    }
  }, [minutes, seconds, isRunning, mode])

  const toggleTimer = () => {
    setIsRunning((prev) => !prev)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(durations[mode] * 60)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const updateDuration = (m: TimerMode, value: number) => {
    const clamped = Math.max(1, Math.min(120, value))
    setDurations((prev) => ({ ...prev, [m]: clamped }))
    if (m === mode && !isRunning) {
      setTimeLeft(clamped * 60)
    }
  }

  const modeColors: Record<TimerMode, string> = {
    work: 'text-red-500',
    break: 'text-green-500',
    longBreak: 'text-blue-500',
  }

  const modeRingColors: Record<TimerMode, string> = {
    work: 'stroke-red-500',
    break: 'stroke-green-500',
    longBreak: 'stroke-blue-500',
  }

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="flex justify-center gap-2">
        {(['work', 'break', 'longBreak'] as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              mode === m
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Timer display */}
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64">
          {/* SVG ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted/30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className={`${modeRingColors[mode]} transition-all duration-1000`}
            />
          </svg>
          {/* Time text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold font-mono ${modeColors[mode]}`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-sm text-muted-foreground mt-1">
              {MODE_LABELS[mode]}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={toggleTimer}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-lg"
        >
          {isRunning ? 'Pause' : timeLeft === 0 ? 'Start' : timeLeft === durations[mode] * 60 ? 'Start' : 'Resume'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Session counter */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Completed sessions: <span className="font-bold text-foreground">{sessions}</span>
        </p>
        {sessions > 0 && sessions % 4 === 0 && mode === 'work' && timeLeft === 0 && (
          <p className="text-sm text-primary mt-1">
            Great job! Take a long break.
          </p>
        )}
      </div>

      {/* Completed message */}
      {timeLeft === 0 && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm text-center">
          {mode === 'work'
            ? 'Work session complete! Time for a break.'
            : 'Break is over! Ready to work?'}
        </div>
      )}

      {/* Settings toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm text-primary hover:underline"
        >
          {showSettings ? 'Hide Settings' : 'Customize Durations'}
        </button>
      </div>

      {showSettings && (
        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg border">
          {(['work', 'break', 'longBreak'] as TimerMode[]).map((m) => (
            <div key={m}>
              <label className="block text-sm font-medium mb-1">{MODE_LABELS[m]}</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={durations[m]}
                  onChange={(e) => updateDuration(m, Number(e.target.value))}
                  className="w-full rounded-lg border bg-background px-2 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-xs text-muted-foreground">min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
