'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolSelect from '@/components/ui/ToolSelect'

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

function calculateLoan(amount: number, rate: number, termMonths: number) {
  const monthlyRate = rate / 100 / 12
  if (monthlyRate === 0) {
    const monthlyPayment = amount / termMonths
    return {
      monthlyPayment,
      totalPayment: amount,
      totalInterest: 0,
      schedule: Array.from({ length: termMonths }, (_, i) => ({
        month: i + 1,
        payment: monthlyPayment,
        principal: monthlyPayment,
        interest: 0,
        balance: Math.max(0, amount - monthlyPayment * (i + 1)),
      })),
    }
  }

  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)

  const totalPayment = monthlyPayment * termMonths
  const totalInterest = totalPayment - amount

  const schedule: AmortizationRow[] = []
  let balance = amount
  for (let i = 1; i <= termMonths; i++) {
    const interestPart = balance * monthlyRate
    const principalPart = monthlyPayment - interestPart
    balance -= principalPart
    schedule.push({
      month: i,
      payment: monthlyPayment,
      principal: principalPart,
      interest: interestPart,
      balance: Math.max(0, balance),
    })
  }

  return { monthlyPayment, totalPayment, totalInterest, schedule }
}

function fmt(n: number): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function LoanCalculator() {
  const t = useTranslations('toolUI.genTools')
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('')
  const [termUnit, setTermUnit] = useState('months')
  const [showSchedule, setShowSchedule] = useState(false)

  const result = useMemo(() => {
    const a = parseFloat(amount)
    const r = parseFloat(rate)
    const tr = parseFloat(term)
    if (isNaN(a) || isNaN(r) || isNaN(tr) || a <= 0 || r < 0 || tr <= 0) return null
    const months = termUnit === 'years' ? Math.round(tr * 12) : Math.round(tr)
    if (months <= 0 || months > 600) return null
    return calculateLoan(a, r, months)
  }, [amount, rate, term, termUnit])

  const termMonths = useMemo(() => {
    const tr = parseFloat(term)
    if (isNaN(tr) || tr <= 0) return 0
    return termUnit === 'years' ? Math.round(tr * 12) : Math.round(tr)
  }, [term, termUnit])

  return (
    <div className="space-y-4">
      <ToolInput
        label={t('loanAmount')}
        type="number"
        placeholder="e.g., 100000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        step="1"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolInput
          label={t('interestRate')}
          type="number"
          placeholder="e.g., 5.5"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="0"
          step="0.1"
        />
        <div className="grid grid-cols-2 gap-2">
          <ToolInput
            label={t('loanTerm')}
            type="number"
            placeholder={termUnit === 'years' ? 'e.g., 15' : 'e.g., 180'}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            min="1"
            step="1"
          />
          <ToolSelect
            label={t('termUnit')}
            value={termUnit}
            onChange={(e) => setTermUnit(e.target.value)}
            options={[
              { value: 'months', label: t('months') },
              { value: 'years', label: t('years') },
            ]}
          />
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-primary/5 p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">{t('monthlyPayment')}</div>
              <div className="text-2xl font-bold text-primary">{fmt(result.monthlyPayment)}</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">{t('totalPayment')}</div>
              <div className="text-2xl font-bold">{fmt(result.totalPayment)}</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">{t('totalInterest')}</div>
              <div className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                {fmt(result.totalInterest)}
              </div>
            </div>
          </div>

          {/* Principal vs Interest bar */}
          <div>
            <label className="text-sm font-medium mb-2 block">{t('principalVsInterest')}</label>
            <div className="h-4 rounded-full overflow-hidden flex">
              <div
                className="bg-primary transition-all"
                style={{
                  width: `${(parseFloat(amount) / result.totalPayment) * 100}%`,
                }}
              />
              <div className="bg-orange-500 dark:bg-orange-400 flex-1" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>
                {t('principal')}: {fmt(parseFloat(amount))} (
                {((parseFloat(amount) / result.totalPayment) * 100).toFixed(1)}%)
              </span>
              <span>
                {t('interest')}: {fmt(result.totalInterest)} (
                {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* Amortization Schedule */}
          <div>
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="text-sm text-primary hover:underline"
            >
              {showSchedule ? t('hideSchedule') : t('showSchedule')} ({termMonths} {t('months')})
            </button>

            {showSchedule && (
              <div className="mt-2 rounded-lg border overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left">#</th>
                      <th className="px-3 py-2 text-right">{t('payment')}</th>
                      <th className="px-3 py-2 text-right">{t('principal')}</th>
                      <th className="px-3 py-2 text-right">{t('interest')}</th>
                      <th className="px-3 py-2 text-right">{t('balance')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="border-t">
                        <td className="px-3 py-1.5">{row.month}</td>
                        <td className="px-3 py-1.5 text-right font-mono">{fmt(row.payment)}</td>
                        <td className="px-3 py-1.5 text-right font-mono">{fmt(row.principal)}</td>
                        <td className="px-3 py-1.5 text-right font-mono">{fmt(row.interest)}</td>
                        <td className="px-3 py-1.5 text-right font-mono">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
