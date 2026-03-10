'use client'

import { useState, useMemo } from 'react'

const FIELD_LABELS = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week'] as const
const FIELD_RANGES = [
  { min: 0, max: 59 },
  { min: 0, max: 23 },
  { min: 1, max: 31 },
  { min: 1, max: 12 },
  { min: 0, max: 6 },
] as const

const FIELD_COLORS = [
  'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
  'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800',
  'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800',
  'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
  'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
] as const

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every day at midnight', value: '0 0 * * *' },
  { label: 'Every Monday at 9 AM', value: '0 9 * * 1' },
  { label: 'Every month (1st at midnight)', value: '0 0 1 * *' },
  { label: 'Every weekday at 8 AM', value: '0 8 * * 1-5' },
  { label: 'Every 5 minutes', value: '*/5 * * * *' },
  { label: 'Every Sunday at 3 PM', value: '0 15 * * 0' },
]

function describeField(value: string, fieldIndex: number): string {
  if (value === '*') {
    return `every ${FIELD_LABELS[fieldIndex].toLowerCase()}`
  }

  if (value.startsWith('*/')) {
    const step = value.slice(2)
    return `every ${step} ${FIELD_LABELS[fieldIndex].toLowerCase()}${Number(step) > 1 ? 's' : ''}`
  }

  if (value.includes(',')) {
    const parts = value.split(',')
    if (fieldIndex === 4) return parts.map((p) => DAY_NAMES[Number(p)] || p).join(', ')
    if (fieldIndex === 3) return parts.map((p) => MONTH_NAMES[Number(p)] || p).join(', ')
    return parts.join(', ')
  }

  if (value.includes('-')) {
    const [start, end] = value.split('-')
    if (fieldIndex === 4) return `${DAY_NAMES[Number(start)] || start} through ${DAY_NAMES[Number(end)] || end}`
    if (fieldIndex === 3) return `${MONTH_NAMES[Number(start)] || start} through ${MONTH_NAMES[Number(end)] || end}`
    return `${start} through ${end}`
  }

  if (fieldIndex === 4) return DAY_NAMES[Number(value)] || value
  if (fieldIndex === 3) return MONTH_NAMES[Number(value)] || value
  return value
}

function describeCron(fields: string[]): string {
  const [min, hour, dom, month, dow] = fields

  const parts: string[] = []

  // Time description
  if (min === '*' && hour === '*') {
    parts.push('Every minute')
  } else if (min.startsWith('*/')) {
    parts.push(`Every ${min.slice(2)} minutes`)
  } else if (hour === '*') {
    parts.push(`At minute ${min} of every hour`)
  } else if (hour.startsWith('*/')) {
    parts.push(`At minute ${min}, every ${hour.slice(2)} hours`)
  } else {
    const h = Number(hour)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h
    parts.push(`At ${displayHour}:${min.padStart(2, '0')} ${ampm}`)
  }

  // Day of month
  if (dom !== '*') {
    if (dom.startsWith('*/')) {
      parts.push(`every ${dom.slice(2)} days`)
    } else {
      parts.push(`on day ${dom} of the month`)
    }
  }

  // Month
  if (month !== '*') {
    parts.push(`in ${describeField(month, 3)}`)
  }

  // Day of week
  if (dow !== '*') {
    parts.push(`on ${describeField(dow, 4)}`)
  }

  return parts.join(', ')
}

function getNextExecutions(fields: string[], count: number): Date[] {
  const results: Date[] = []
  const now = new Date()
  const candidate = new Date(now)
  candidate.setSeconds(0)
  candidate.setMilliseconds(0)
  candidate.setMinutes(candidate.getMinutes() + 1)

  const maxIterations = 525600 // 1 year of minutes
  let iterations = 0

  while (results.length < count && iterations < maxIterations) {
    if (matchesCron(candidate, fields)) {
      results.push(new Date(candidate))
    }
    candidate.setMinutes(candidate.getMinutes() + 1)
    iterations++
  }

  return results
}

function matchesField(value: number, field: string, range: { min: number; max: number }): boolean {
  if (field === '*') return true
  if (field.startsWith('*/')) {
    const step = Number(field.slice(2))
    return value % step === 0
  }
  if (field.includes(',')) {
    return field.split(',').map(Number).includes(value)
  }
  if (field.includes('-')) {
    const [start, end] = field.split('-').map(Number)
    return value >= start && value <= end
  }
  return value === Number(field)
}

function matchesCron(date: Date, fields: string[]): boolean {
  const [min, hour, dom, month, dow] = fields
  return (
    matchesField(date.getMinutes(), min, FIELD_RANGES[0]) &&
    matchesField(date.getHours(), hour, FIELD_RANGES[1]) &&
    matchesField(date.getDate(), dom, FIELD_RANGES[2]) &&
    matchesField(date.getMonth() + 1, month, FIELD_RANGES[3]) &&
    matchesField(date.getDay(), dow, FIELD_RANGES[4])
  )
}

function validateField(value: string, range: { min: number; max: number }): boolean {
  if (value === '*') return true
  if (value.startsWith('*/')) {
    const step = Number(value.slice(2))
    return !isNaN(step) && step > 0 && step <= (range.max - range.min + 1)
  }
  if (value.includes(',')) {
    return value.split(',').every((v) => {
      const n = Number(v.trim())
      return !isNaN(n) && n >= range.min && n <= range.max
    })
  }
  if (value.includes('-')) {
    const parts = value.split('-')
    if (parts.length !== 2) return false
    const [start, end] = parts.map(Number)
    return !isNaN(start) && !isNaN(end) && start >= range.min && end <= range.max && start <= end
  }
  const n = Number(value)
  return !isNaN(n) && n >= range.min && n <= range.max
}

export default function CronParser() {
  const [expression, setExpression] = useState('0 0 * * *')
  const [copied, setCopied] = useState(false)

  const parsed = useMemo(() => {
    const trimmed = expression.trim()
    if (!trimmed) return null

    const fields = trimmed.split(/\s+/)
    if (fields.length !== 5) {
      return { error: 'Cron expression must have exactly 5 fields: minute hour day-of-month month day-of-week', fields: null, description: '', nextRuns: [] }
    }

    const invalidFields: string[] = []
    fields.forEach((field, i) => {
      if (!validateField(field, FIELD_RANGES[i])) {
        invalidFields.push(`${FIELD_LABELS[i]} ("${field}")`)
      }
    })

    if (invalidFields.length > 0) {
      return { error: `Invalid field(s): ${invalidFields.join(', ')}`, fields: null, description: '', nextRuns: [] }
    }

    const description = describeCron(fields)
    const nextRuns = getNextExecutions(fields, 5)

    return { error: '', fields, description, nextRuns }
  }, [expression])

  const copy = async () => {
    await navigator.clipboard.writeText(expression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Cron Expression</label>
          <button
            onClick={copy}
            className="text-xs text-primary hover:underline"
            aria-label="Copy cron expression"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <input
          type="text"
          className="w-full rounded-lg border bg-background px-3 py-2 text-lg font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="* * * * *"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          aria-label="Cron expression input"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Format: minute (0-59) hour (0-23) day (1-31) month (1-12) weekday (0-6, 0=Sun)
        </p>
      </div>

      {/* Presets */}
      <div>
        <label className="text-sm font-medium mb-2 block">Quick Presets</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setExpression(preset.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                expression.trim() === preset.value
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
              aria-label={`Set cron to: ${preset.label}`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {parsed?.error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{parsed.error}</div>
      )}

      {/* Color-coded fields */}
      {parsed?.fields && (
        <>
          <div>
            <label className="text-sm font-medium mb-2 block">Fields</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {parsed.fields.map((field, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-3 text-center ${FIELD_COLORS[i]}`}
                >
                  <div className="text-lg font-mono font-bold">{field}</div>
                  <div className="text-xs mt-1 font-medium">{FIELD_LABELS[i]}</div>
                  <div className="text-xs mt-0.5 opacity-80">
                    {FIELD_RANGES[i].min}-{FIELD_RANGES[i].max}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Human-readable description */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <label className="text-sm font-medium block mb-1">Description</label>
            <p className="text-base">{parsed.description}</p>
          </div>

          {/* Next executions */}
          {parsed.nextRuns.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Next {parsed.nextRuns.length} Execution{parsed.nextRuns.length !== 1 ? 's' : ''}
              </label>
              <div className="rounded-lg border divide-y">
                {parsed.nextRuns.map((date, i) => (
                  <div key={i} className="px-4 py-2.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-mono text-xs mr-3">#{i + 1}</span>
                    <span className="flex-1">
                      {date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
