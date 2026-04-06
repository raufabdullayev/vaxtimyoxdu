'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

export default function TaxCalculator() {
  const t = useTranslations('toolUI.genTools')
  const [amount, setAmount] = useState('1000')
  const [taxRate, setTaxRate] = useState('18')
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')

  const result = useMemo(() => {
    const amt = parseFloat(amount)
    const rate = parseFloat(taxRate)
    if (isNaN(amt) || isNaN(rate)) return null

    if (mode === 'exclusive') {
      const tax = amt * (rate / 100)
      return { pretax: amt, tax, total: amt + tax }
    } else {
      const pretax = amt / (1 + rate / 100)
      const tax = amt - pretax
      return { pretax, tax, total: amt }
    }
  }, [amount, taxRate, mode])

  const commonRates = [5, 7, 8, 10, 13, 15, 18, 20, 21, 23, 25]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
            min="0"
            step="0.01"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="18"
            min="0"
            max="100"
            step="0.1"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-2">
        {['exclusive', 'inclusive'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as 'exclusive' | 'inclusive')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            Tax {m === 'exclusive' ? 'Exclusive' : 'Inclusive'}
          </button>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        {mode === 'exclusive'
          ? 'Amount does NOT include tax. Tax will be added.'
          : 'Amount already INCLUDES tax. Tax will be extracted.'}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground self-center">Quick rates:</span>
        {commonRates.map((rate) => (
          <button
            key={rate}
            onClick={() => setTaxRate(String(rate))}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              taxRate === String(rate)
                ? 'bg-primary/10 text-primary ring-1 ring-primary'
                : 'bg-muted/50 text-muted-foreground hover:bg-accent'
            }`}
          >
            {rate}%
          </button>
        ))}
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Pre-tax Amount</div>
            <div className="text-xl font-bold">{result.pretax.toFixed(2)}</div>
          </div>
          <div className="rounded-lg border bg-primary/5 p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Tax ({taxRate}%)</div>
            <div className="text-xl font-bold text-primary">{result.tax.toFixed(2)}</div>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Total</div>
            <div className="text-xl font-bold">{result.total.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  )
}
