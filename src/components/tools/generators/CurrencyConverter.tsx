'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

// Offline approximate rates (USD base)
const RATES: Record<string, { rate: number; name: string; symbol: string }> = {
  USD: { rate: 1, name: 'US Dollar', symbol: '$' },
  EUR: { rate: 0.92, name: 'Euro', symbol: '\u20AC' },
  GBP: { rate: 0.79, name: 'British Pound', symbol: '\u00A3' },
  AZN: { rate: 1.70, name: 'Azerbaijan Manat', symbol: '\u20BC' },
  TRY: { rate: 38.5, name: 'Turkish Lira', symbol: '\u20BA' },
  RUB: { rate: 92.0, name: 'Russian Ruble', symbol: '\u20BD' },
  JPY: { rate: 150.0, name: 'Japanese Yen', symbol: '\u00A5' },
  CNY: { rate: 7.24, name: 'Chinese Yuan', symbol: '\u00A5' },
  KRW: { rate: 1380, name: 'South Korean Won', symbol: '\u20A9' },
  INR: { rate: 83.5, name: 'Indian Rupee', symbol: '\u20B9' },
  BRL: { rate: 5.0, name: 'Brazilian Real', symbol: 'R$' },
  CAD: { rate: 1.36, name: 'Canadian Dollar', symbol: 'C$' },
  AUD: { rate: 1.53, name: 'Australian Dollar', symbol: 'A$' },
  CHF: { rate: 0.88, name: 'Swiss Franc', symbol: 'Fr' },
  SAR: { rate: 3.75, name: 'Saudi Riyal', symbol: '\uFDFC' },
  AED: { rate: 3.67, name: 'UAE Dirham', symbol: 'AED' },
  GEL: { rate: 2.72, name: 'Georgian Lari', symbol: '\u20BE' },
  UAH: { rate: 41.5, name: 'Ukrainian Hryvnia', symbol: '\u20B4' },
  PLN: { rate: 3.97, name: 'Polish Zloty', symbol: 'z\u0142' },
  SEK: { rate: 10.5, name: 'Swedish Krona', symbol: 'kr' },
}

export default function CurrencyConverter() {
  const t = useTranslations('toolUI.common')
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')

  const converted = useMemo(() => {
    const val = parseFloat(amount)
    if (isNaN(val)) return null
    const inUsd = val / RATES[from].rate
    return inUsd * RATES[to].rate
  }, [amount, from, to])

  const rate = useMemo(() => {
    return RATES[to].rate / RATES[from].rate
  }, [from, to])

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const currencies = Object.entries(RATES).sort((a, b) => a[1].name.localeCompare(b[1].name))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            min="0"
            step="0.01"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {currencies.map(([code, info]) => (
              <option key={code} value={code}>{code} - {info.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {currencies.map(([code, info]) => (
              <option key={code} value={code}>{code} - {info.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={swap}
        className="w-full px-4 py-2 border rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors"
      >
        {t('swap')} ({from} \u2194 {to})
      </button>

      {converted !== null && (
        <div className="rounded-lg border bg-primary/5 p-6 text-center">
          <div className="text-sm text-muted-foreground mb-1">
            {RATES[from].symbol}{parseFloat(amount).toLocaleString()} {from}
          </div>
          <div className="text-3xl font-bold text-primary">
            {RATES[to].symbol}{converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {to}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            1 {from} = {rate.toFixed(4)} {to}
          </div>
        </div>
      )}

      <div className="rounded-lg border p-3">
        <div className="text-xs text-muted-foreground">
          Note: These are approximate offline rates for reference only. For real-time exchange rates, consult a financial service.
        </div>
      </div>

      {converted !== null && (
        <div className="space-y-1">
          <div className="text-sm font-medium mb-2">Quick Reference ({from})</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {currencies.filter(([code]) => code !== from).slice(0, 8).map(([code, info]) => {
              const val = parseFloat(amount)
              if (isNaN(val)) return null
              const result = (val / RATES[from].rate) * info.rate
              return (
                <div key={code} className="rounded-lg border p-2 text-center">
                  <div className="text-xs text-muted-foreground">{code}</div>
                  <div className="text-sm font-bold">{info.symbol}{result.toFixed(2)}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
