'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolAlert from '@/components/ui/ToolAlert'

type TabMode = 'difference' | 'add-subtract' | 'countdown' | 'timezone'

interface DateDiffResult {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalHours: number
  totalMinutes: number
}

interface AddSubtractResult {
  resultDate: Date
}

interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calcDateDiff(start: Date, end: Date): DateDiffResult {
  const swapped = start > end
  const a = swapped ? end : start
  const b = swapped ? start : end

  let years = b.getFullYear() - a.getFullYear()
  let months = b.getMonth() - a.getMonth()
  let days = b.getDate() - a.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(b.getFullYear(), b.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const diffMs = Math.abs(b.getTime() - a.getTime())
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
  const totalMinutes = Math.floor(diffMs / (1000 * 60))

  return { years, months, days, totalDays, totalWeeks, totalHours, totalMinutes }
}

function addToDate(base: Date, yrs: number, mos: number, dys: number, add: boolean): AddSubtractResult {
  const result = new Date(base)
  const sign = add ? 1 : -1
  result.setFullYear(result.getFullYear() + sign * yrs)
  result.setMonth(result.getMonth() + sign * mos)
  result.setDate(result.getDate() + sign * dys)
  return { resultDate: result }
}

function calcCountdown(target: Date): CountdownResult {
  const now = new Date()
  const diffMs = target.getTime() - now.getTime()
  const isPast = diffMs < 0
  const abs = Math.abs(diffMs)
  const days = Math.floor(abs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((abs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((abs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((abs % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds, isPast }
}

const COMMON_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Moscow',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Australia/Sydney',
  'Pacific/Auckland',
  'Asia/Baku',
  'Asia/Istanbul',
]

export default function TimeCalculator() {
  const t = useTranslations('toolUI.timeCalc')
  const today = new Date().toISOString().split('T')[0]

  // Tab state
  const [tab, setTab] = useState<TabMode>('difference')

  // Date difference
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate] = useState(today)

  // Add/subtract
  const [baseDate, setBaseDate] = useState(today)
  const [addYears, setAddYears] = useState(0)
  const [addMonths, setAddMonths] = useState(0)
  const [addDays, setAddDays] = useState(0)
  const [isAdd, setIsAdd] = useState(true)

  // Countdown
  const [countdownDate, setCountdownDate] = useState('')
  const [countdownTime, setCountdownTime] = useState('00:00')
  const [countdownResult, setCountdownResult] = useState<CountdownResult | null>(null)

  // Timezone
  const [tzFrom, setTzFrom] = useState('UTC')
  const [tzTo, setTzTo] = useState('America/New_York')
  const [tzDate, setTzDate] = useState(today)
  const [tzTime, setTzTime] = useState('12:00')

  // Compute date difference
  const diffResult = startDate && endDate
    ? calcDateDiff(new Date(startDate), new Date(endDate))
    : null

  // Compute add/subtract
  const addSubResult = baseDate
    ? addToDate(new Date(baseDate), addYears, addMonths, addDays, isAdd)
    : null

  // Compute countdown on button click
  const handleCountdown = () => {
    if (!countdownDate) return
    const target = new Date(`${countdownDate}T${countdownTime || '00:00'}:00`)
    setCountdownResult(calcCountdown(target))
  }

  // Compute timezone conversion
  const getConvertedTime = (): string | null => {
    if (!tzDate || !tzTime) return null
    try {
      // Build a date string interpreted as tzFrom
      const dateStr = `${tzDate}T${tzTime}:00`
      const sourceDate = new Date(dateStr)

      // Get the offset for the source timezone
      const sourceFormatted = sourceDate.toLocaleString('en-US', { timeZone: tzFrom })
      const sourceInLocal = new Date(sourceFormatted)

      // Get the offset for the target timezone
      const targetFormatted = sourceDate.toLocaleString('en-US', { timeZone: tzTo })
      const targetInLocal = new Date(targetFormatted)

      const diff = targetInLocal.getTime() - sourceInLocal.getTime()
      const result = new Date(sourceDate.getTime() + diff)

      return result.toLocaleString('en-US', {
        timeZone: tzTo,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    } catch {
      return null
    }
  }

  const tabs: { key: TabMode; label: string }[] = [
    { key: 'difference', label: t('dateDifference') },
    { key: 'add-subtract', label: t('addSubtract') },
    { key: 'countdown', label: t('countdown') },
    { key: 'timezone', label: t('timezoneConverter') },
  ]

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="space-y-4">
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-muted">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`flex-1 min-w-[120px] px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === tb.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {/* Date Difference Tab */}
      {tab === 'difference' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToolInput
              label={t('startDate')}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <ToolInput
              label={t('endDate')}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {diffResult && (
            <>
              <div className="rounded-lg border bg-primary/5 p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">{t('timeBetween')}</div>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div>
                    <span className="text-4xl font-bold text-primary">{diffResult.years}</span>
                    <span className="text-sm text-muted-foreground ml-1">{t('years')}</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold text-primary">{diffResult.months}</span>
                    <span className="text-sm text-muted-foreground ml-1">{t('months')}</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold text-primary">{diffResult.days}</span>
                    <span className="text-sm text-muted-foreground ml-1">{t('days')}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: t('totalDays'), value: diffResult.totalDays.toLocaleString() },
                  { label: t('totalWeeks'), value: diffResult.totalWeeks.toLocaleString() },
                  { label: t('totalHours'), value: diffResult.totalHours.toLocaleString() },
                  { label: t('totalMinutes'), value: diffResult.totalMinutes.toLocaleString() },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-lg font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Add/Subtract Tab */}
      {tab === 'add-subtract' && (
        <div className="space-y-4">
          <ToolInput
            label={t('baseDate')}
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={() => setIsAdd(true)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isAdd
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {t('add')}
            </button>
            <button
              onClick={() => setIsAdd(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isAdd
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {t('subtract')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ToolInput
              label={t('years')}
              type="number"
              min={0}
              value={addYears}
              onChange={(e) => setAddYears(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <ToolInput
              label={t('months')}
              type="number"
              min={0}
              value={addMonths}
              onChange={(e) => setAddMonths(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <ToolInput
              label={t('days')}
              type="number"
              min={0}
              value={addDays}
              onChange={(e) => setAddDays(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>

          {addSubResult && (
            <div className="rounded-lg border bg-primary/5 p-6 text-center">
              <div className="text-sm text-muted-foreground mb-2">{t('resultDate')}</div>
              <div className="text-2xl font-bold text-primary">
                {formatDate(addSubResult.resultDate)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Countdown Tab */}
      {tab === 'countdown' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToolInput
              label={t('targetDate')}
              type="date"
              value={countdownDate}
              onChange={(e) => setCountdownDate(e.target.value)}
            />
            <ToolInput
              label={t('targetTime')}
              type="time"
              value={countdownTime}
              onChange={(e) => setCountdownTime(e.target.value)}
            />
          </div>

          <button
            onClick={handleCountdown}
            disabled={!countdownDate}
            className="w-full px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {t('calculate')}
          </button>

          {countdownResult && (
            <>
              {countdownResult.isPast && (
                <ToolAlert variant="error">{t('dateInPast')}</ToolAlert>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: t('days'), value: countdownResult.days },
                  { label: t('hours'), value: countdownResult.hours },
                  { label: t('minutesUnit'), value: countdownResult.minutes },
                  { label: t('seconds'), value: countdownResult.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="rounded-lg border bg-primary/5 p-4 text-center">
                    <div className="text-3xl font-bold text-primary">{unit.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{unit.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Timezone Converter Tab */}
      {tab === 'timezone' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToolInput
              label={t('date')}
              type="date"
              value={tzDate}
              onChange={(e) => setTzDate(e.target.value)}
            />
            <ToolInput
              label={t('time')}
              type="time"
              value={tzTime}
              onChange={(e) => setTzTime(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('fromTimezone')}</label>
              <select
                value={tzFrom}
                onChange={(e) => setTzFrom(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('toTimezone')}</label>
              <select
                value={tzTo}
                onChange={(e) => setTzTo(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {COMMON_TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          {(() => {
            const converted = getConvertedTime()
            if (!converted) return null
            return (
              <div className="rounded-lg border bg-primary/5 p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">{t('convertedTime')}</div>
                <div className="text-xl font-bold text-primary">{converted}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {tzTo.replace(/_/g, ' ')}
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
