'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolAlert from '@/components/ui/ToolAlert'

interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  totalWeeks: number
  totalMonths: number
  nextBirthday: number
}

function calculateAge(birthDate: Date, targetDate: Date): AgeResult | null {
  if (birthDate > targetDate) return null

  let years = targetDate.getFullYear() - birthDate.getFullYear()
  let months = targetDate.getMonth() - birthDate.getMonth()
  let days = targetDate.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const diffMs = targetDate.getTime() - birthDate.getTime()
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months

  const nextBday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  if (nextBday <= targetDate) {
    nextBday.setFullYear(nextBday.getFullYear() + 1)
  }
  const nextBirthday = Math.ceil((nextBday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))

  return { years, months, days, totalDays, totalWeeks, totalMonths, nextBirthday }
}

export default function AgeCalculator() {
  const t = useTranslations('toolUI.genTools')
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0])

  const result = birthDate && targetDate
    ? calculateAge(new Date(birthDate), new Date(targetDate))
    : null

  const stats = result
    ? [
        { label: t('totalMonths'), value: result.totalMonths.toLocaleString() },
        { label: t('totalWeeks'), value: result.totalWeeks.toLocaleString() },
        { label: t('totalDays'), value: result.totalDays.toLocaleString() },
        { label: t('nextBirthday'), value: `${result.nextBirthday} ${t('daysUnit')}` },
      ]
    : []

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolInput
          label={t('dateOfBirth')}
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={targetDate}
        />
        <ToolInput
          label={t('calculateAgeAsOf')}
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
      </div>

      {result && (
        <>
          <div className="rounded-lg border bg-primary/5 p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2">{t('yourAge')}</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div>
                <span className="text-4xl font-bold text-primary">{result.years}</span>
                <span className="text-sm text-muted-foreground ml-1">{t('years')}</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-primary">{result.months}</span>
                <span className="text-sm text-muted-foreground ml-1">{t('months')}</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-primary">{result.days}</span>
                <span className="text-sm text-muted-foreground ml-1">{t('days')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-lg font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {birthDate && targetDate && !result && (
        <ToolAlert variant="error">{t('birthDateError')}</ToolAlert>
      )}
    </div>
  )
}
