'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

const MINUTE_OPTIONS = ['*', '0', '15', '30', '45']
const HOUR_OPTIONS = ['*', ...Array.from({ length: 24 }, (_, i) => String(i))]
const DOM_OPTIONS = ['*', ...Array.from({ length: 31 }, (_, i) => String(i + 1))]
const MONTH_OPTIONS = ['*', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const DOW_OPTIONS = ['*', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const PRESETS = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every day at noon', cron: '0 12 * * *' },
  { label: 'Every Monday', cron: '0 0 * * MON' },
  { label: 'Every weekday', cron: '0 9 * * MON-FRI' },
  { label: 'First of every month', cron: '0 0 1 * *' },
  { label: 'Every Sunday at 6 PM', cron: '0 18 * * SUN' },
  { label: 'Every year (Jan 1)', cron: '0 0 1 JAN *' },
]

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return 'Invalid cron expression'
  const [min, hour, dom, month, dow] = parts
  const segments: string[] = []

  if (min === '*' && hour === '*') segments.push('Every minute')
  else if (min.startsWith('*/')) segments.push(`Every ${min.slice(2)} minutes`)
  else if (hour === '*') segments.push(`At minute ${min}`)
  else segments.push(`At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`)

  if (dom !== '*') segments.push(`on day ${dom} of the month`)
  if (month !== '*') segments.push(`in ${month}`)
  if (dow !== '*') segments.push(`on ${dow}`)

  return segments.join(' ')
}

export default function CronBuilder() {
  const t = useTranslations('toolUI.common')
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [dom, setDom] = useState('*')
  const [month, setMonth] = useState('*')
  const [dow, setDow] = useState('*')
  const [customCron, setCustomCron] = useState('')
  const [copied, setCopied] = useState(false)

  const cronExpression = useMemo(() => {
    return `${minute} ${hour} ${dom} ${month} ${dow}`
  }, [minute, hour, dom, month, dow])

  const description = useMemo(() => {
    return describeCron(cronExpression.split(' '))
  }, [cronExpression])

  const applyPreset = (cron: string) => {
    const parts = cron.split(' ')
    if (parts.length === 5) {
      setMinute(parts[0])
      setHour(parts[1])
      setDom(parts[2])
      setMonth(parts[3])
      setDow(parts[4])
    }
  }

  const applyCustom = () => {
    const parts = customCron.trim().split(/\s+/)
    if (parts.length === 5) {
      setMinute(parts[0])
      setHour(parts[1])
      setDom(parts[2])
      setMonth(parts[3])
      setDow(parts[4])
      setCustomCron('')
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(cronExpression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fields = [
    { label: 'Minute', value: minute, setter: setMinute, options: MINUTE_OPTIONS },
    { label: 'Hour', value: hour, setter: setHour, options: HOUR_OPTIONS },
    { label: 'Day of Month', value: dom, setter: setDom, options: DOM_OPTIONS },
    { label: 'Month', value: month, setter: setMonth, options: MONTH_OPTIONS },
    { label: 'Day of Week', value: dow, setter: setDow, options: DOW_OPTIONS },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {fields.map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-medium mb-1 text-center">{f.label}</label>
            <select
              value={f.value}
              onChange={(e) => f.setter(e.target.value)}
              className="w-full rounded-lg border bg-background px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {f.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-primary/5 p-4 text-center">
        <div className="text-xs text-muted-foreground mb-1">Cron Expression</div>
        <div className="text-2xl font-mono font-bold text-primary mb-2">{cronExpression}</div>
        <div className="text-sm text-muted-foreground mb-3">{description}</div>
        <button
          onClick={copy}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {copied ? t('copied') : t('copy')}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Parse Expression</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="* * * * *"
            value={customCron}
            onChange={(e) => setCustomCron(e.target.value)}
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={applyCustom}
            disabled={customCron.trim().split(/\s+/).length !== 5}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Apply
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Presets</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.cron}
              onClick={() => applyPreset(p.cron)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                cronExpression === p.cron
                  ? 'bg-primary/10 ring-1 ring-primary'
                  : 'border hover:bg-accent'
              }`}
            >
              <span className="font-mono text-primary text-xs w-24 shrink-0">{p.cron}</span>
              <span className="text-muted-foreground">{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
