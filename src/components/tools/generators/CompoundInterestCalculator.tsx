'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

export default function CompoundInterestCalculator() {
  const t = useTranslations('toolUI')
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('10')
  const [frequency, setFrequency] = useState('12')
  const [monthlyAdd, setMonthlyAdd] = useState('100')

  const result = useMemo(() => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(years)
    const n = parseFloat(frequency)
    const monthly = parseFloat(monthlyAdd) || 0

    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) return null

    // Compound interest with periodic contributions
    const compoundBase = P * Math.pow(1 + r / n, n * t)
    const periodicRate = r / n
    const totalPeriods = n * t
    const futureValueContributions = monthly > 0
      ? monthly * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate)
      : 0

    const totalValue = compoundBase + futureValueContributions
    const totalContributed = P + monthly * n * t
    const totalInterest = totalValue - totalContributed

    // Year-by-year breakdown
    const breakdown: { year: number; balance: number; interest: number; contributed: number }[] = []
    let balance = P
    let totalInterestAccum = 0

    for (let y = 1; y <= Math.min(t, 50); y++) {
      const yearContribution = monthly * n
      for (let p = 0; p < n; p++) {
        balance = balance * (1 + r / n) + monthly
      }
      const yearInterest = balance - (P + monthly * n * y)
      totalInterestAccum = yearInterest
      breakdown.push({
        year: y,
        balance,
        interest: totalInterestAccum,
        contributed: P + monthly * n * y,
      })
    }

    return {
      totalValue,
      totalContributed,
      totalInterest,
      breakdown,
    }
  }, [principal, rate, years, frequency, monthlyAdd])

  const frequencies = [
    { value: '1', label: 'Annually' },
    { value: '2', label: 'Semi-annually' },
    { value: '4', label: 'Quarterly' },
    { value: '12', label: 'Monthly' },
    { value: '365', label: 'Daily' },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Initial Principal</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" min="0" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="7" min="0" max="100" step="0.1" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Time Period (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="10" min="1" max="50" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Monthly Contribution</label>
          <input type="number" value={monthlyAdd} onChange={(e) => setMonthlyAdd(e.target.value)} placeholder="100" min="0" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Compound Frequency</label>
        <div className="flex flex-wrap gap-2">
          {frequencies.map((f) => (
            <button
              key={f.value}
              onClick={() => setFrequency(f.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                frequency === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-accent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border bg-primary/5 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Final Balance</div>
              <div className="text-xl font-bold text-primary">${result.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Total Contributed</div>
              <div className="text-xl font-bold">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Total Interest</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
          </div>

          {result.totalContributed > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Interest vs Principal</div>
              <div className="h-4 rounded-full overflow-hidden flex">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(result.totalContributed / result.totalValue) * 100}%` }}
                />
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${(result.totalInterest / result.totalValue) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Principal: {((result.totalContributed / result.totalValue) * 100).toFixed(1)}%</span>
                <span>Interest: {((result.totalInterest / result.totalValue) * 100).toFixed(1)}%</span>
              </div>
            </div>
          )}

          <div className="rounded-lg border overflow-hidden max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium">Year</th>
                  <th className="px-3 py-2 text-right text-xs font-medium">Balance</th>
                  <th className="px-3 py-2 text-right text-xs font-medium">Interest</th>
                  <th className="px-3 py-2 text-right text-xs font-medium">Contributed</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((row) => (
                  <tr key={row.year} className="border-t">
                    <td className="px-3 py-1.5">{row.year}</td>
                    <td className="px-3 py-1.5 text-right font-mono">${row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-green-600 dark:text-green-400">${row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="px-3 py-1.5 text-right font-mono">${row.contributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
