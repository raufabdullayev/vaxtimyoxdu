'use client'

import { useState, useEffect } from 'react'

export default function TimestampConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000))
  const [unixInput, setUnixInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds')
  const [convertedDate, setConvertedDate] = useState('')
  const [convertedTimestamp, setConvertedTimestamp] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const convertToDate = () => {
    if (!unixInput.trim()) {
      setError('Please enter a Unix timestamp')
      setConvertedDate('')
      return
    }
    const num = Number(unixInput.trim())
    if (isNaN(num)) {
      setError('Invalid timestamp. Please enter a number.')
      setConvertedDate('')
      return
    }
    setError('')
    const ms = unit === 'seconds' ? num * 1000 : num
    const date = new Date(ms)
    if (isNaN(date.getTime())) {
      setError('Timestamp results in an invalid date.')
      setConvertedDate('')
      return
    }
    const lines = [
      `ISO 8601: ${date.toISOString()}`,
      `UTC: ${date.toUTCString()}`,
      `Local: ${date.toLocaleString()}`,
      `Date: ${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
      `Time: ${date.toLocaleTimeString()}`,
    ]
    setConvertedDate(lines.join('\n'))
  }

  const convertToTimestamp = () => {
    if (!dateInput.trim()) {
      setError('Please select a date')
      setConvertedTimestamp('')
      return
    }
    setError('')
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) {
      setError('Invalid date input.')
      setConvertedTimestamp('')
      return
    }
    const ts = unit === 'seconds' ? Math.floor(date.getTime() / 1000) : date.getTime()
    setConvertedTimestamp(String(ts))
  }

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const nowDate = new Date(currentTimestamp * 1000)

  return (
    <div className="space-y-6">
      {/* Current timestamp */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Current Unix Timestamp</label>
          <button
            onClick={() => copy(String(currentTimestamp), 'current')}
            className="text-xs text-primary hover:underline"
            aria-label="Copy current timestamp"
          >
            {copied === 'current' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="text-3xl font-mono font-bold text-primary">{currentTimestamp}</div>
        <div className="text-sm text-muted-foreground mt-1">{nowDate.toISOString()}</div>
      </div>

      {/* Unit toggle */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Unit:</label>
        <button
          onClick={() => setUnit('seconds')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            unit === 'seconds' ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
          }`}
        >
          Seconds
        </button>
        <button
          onClick={() => setUnit('milliseconds')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            unit === 'milliseconds' ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
          }`}
        >
          Milliseconds
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp to Date */}
        <div className="space-y-3 rounded-lg border p-4">
          <h3 className="text-sm font-semibold">Timestamp to Date</h3>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">
              Unix Timestamp ({unit})
            </label>
            <input
              type="text"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={unit === 'seconds' ? '1700000000' : '1700000000000'}
              value={unixInput}
              onChange={(e) => setUnixInput(e.target.value)}
              aria-label="Unix timestamp input"
            />
          </div>
          <button
            onClick={convertToDate}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Convert to Date
          </button>
          {convertedDate && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Result</label>
                <button
                  onClick={() => copy(convertedDate, 'date')}
                  className="text-xs text-primary hover:underline"
                  aria-label="Copy date result"
                >
                  {copied === 'date' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="rounded-lg border bg-muted/50 p-3 text-sm font-mono whitespace-pre-wrap">
                {convertedDate}
              </pre>
            </div>
          )}
        </div>

        {/* Date to Timestamp */}
        <div className="space-y-3 rounded-lg border p-4">
          <h3 className="text-sm font-semibold">Date to Timestamp</h3>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Date &amp; Time</label>
            <input
              type="datetime-local"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              aria-label="Date and time input"
            />
          </div>
          <button
            onClick={convertToTimestamp}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Convert to Timestamp
          </button>
          {convertedTimestamp && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Result ({unit})</label>
                <button
                  onClick={() => copy(convertedTimestamp, 'timestamp')}
                  className="text-xs text-primary hover:underline"
                  aria-label="Copy timestamp result"
                >
                  {copied === 'timestamp' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3 text-sm font-mono">
                {convertedTimestamp}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
