'use client'

import { useState, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'

function formatTime(ms: number): { hours: string; minutes: string; seconds: string; milliseconds: string } {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')
  return { hours, minutes, seconds, milliseconds }
}

export default function Stopwatch() {
  const t = useTranslations('toolUI.textTools')
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)
  const elapsedRef = useRef(0)

  const start = useCallback(() => {
    if (running) return
    setRunning(true)
    startTimeRef.current = Date.now() - elapsedRef.current
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const newElapsed = now - startTimeRef.current
      elapsedRef.current = newElapsed
      setElapsed(newElapsed)
    }, 10)
  }, [running])

  const stop = useCallback(() => {
    if (!running) return
    setRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [running])

  const reset = useCallback(() => {
    stop()
    elapsedRef.current = 0
    setElapsed(0)
    setLaps([])
  }, [stop])

  const lap = useCallback(() => {
    if (running) {
      setLaps((prev) => [...prev, elapsed])
    }
  }, [running, elapsed])

  const time = formatTime(elapsed)

  const bestLap = laps.length > 1
    ? Math.min(...laps.map((l, i) => i === 0 ? l : l - laps[i - 1]))
    : null
  const worstLap = laps.length > 1
    ? Math.max(...laps.map((l, i) => i === 0 ? l : l - laps[i - 1]))
    : null

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-primary/5 p-8 text-center">
        <div className="font-mono text-6xl sm:text-7xl font-bold tracking-wider">
          <span>{time.hours}</span>
          <span className="text-muted-foreground">:</span>
          <span>{time.minutes}</span>
          <span className="text-muted-foreground">:</span>
          <span>{time.seconds}</span>
          <span className="text-muted-foreground">.</span>
          <span className="text-4xl sm:text-5xl text-primary">{time.milliseconds}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {!running ? (
          <button
            onClick={start}
            className="px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
          >
            {elapsed > 0 ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
          >
            Stop
          </button>
        )}
        <button
          onClick={lap}
          disabled={!running}
          className="px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm disabled:opacity-50"
        >
          Lap
        </button>
        <button
          onClick={reset}
          disabled={elapsed === 0}
          className="px-4 py-3 border rounded-lg font-medium hover:bg-accent transition-colors text-sm disabled:opacity-50"
        >
          {t('reset')}
        </button>
      </div>

      {laps.length > 0 && (
        <div className="rounded-lg border overflow-hidden">
          <div className="px-3 py-2 bg-muted/30 border-b text-sm font-medium">
            Laps ({laps.length})
          </div>
          <div className="max-h-64 overflow-y-auto">
            {[...laps].reverse().map((lapTime, revIdx) => {
              const idx = laps.length - 1 - revIdx
              const diff = idx === 0 ? lapTime : lapTime - laps[idx - 1]
              const lapFormatted = formatTime(diff)
              const totalFormatted = formatTime(lapTime)
              const isBest = bestLap !== null && diff === bestLap && laps.length > 1
              const isWorst = worstLap !== null && diff === worstLap && laps.length > 1

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-3 py-2 border-b text-sm ${
                    isBest ? 'bg-green-50 dark:bg-green-900/20' : isWorst ? 'bg-red-50 dark:bg-red-900/20' : ''
                  }`}
                >
                  <span className="text-muted-foreground w-16">Lap {idx + 1}</span>
                  <span className={`font-mono font-bold ${isBest ? 'text-green-600 dark:text-green-400' : isWorst ? 'text-red-600 dark:text-red-400' : ''}`}>
                    {lapFormatted.minutes}:{lapFormatted.seconds}.{lapFormatted.milliseconds}
                  </span>
                  <span className="font-mono text-muted-foreground text-xs">
                    {totalFormatted.hours}:{totalFormatted.minutes}:{totalFormatted.seconds}.{totalFormatted.milliseconds}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
