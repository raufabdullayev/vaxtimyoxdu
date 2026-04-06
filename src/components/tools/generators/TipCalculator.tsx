'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

export default function TipCalculator() {
  const t = useTranslations('toolUI.genTools')
  const [billAmount, setBillAmount] = useState('50')
  const [tipPercent, setTipPercent] = useState(15)
  const [splitCount, setSplitCount] = useState(1)
  const [customTip, setCustomTip] = useState('')

  const activeTip = customTip ? parseFloat(customTip) : tipPercent

  const result = useMemo(() => {
    const bill = parseFloat(billAmount)
    if (isNaN(bill) || isNaN(activeTip)) return null
    const tip = bill * (activeTip / 100)
    const total = bill + tip
    const perPerson = total / Math.max(splitCount, 1)
    const tipPerPerson = tip / Math.max(splitCount, 1)
    return { tip, total, perPerson, tipPerPerson }
  }, [billAmount, activeTip, splitCount])

  const tipPresets = [10, 12, 15, 18, 20, 25]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Bill Amount</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="50.00"
          min="0"
          step="0.01"
          className="w-full rounded-lg border bg-background px-3 py-3 text-lg text-center font-mono focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tip Percentage</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {tipPresets.map((pct) => (
            <button
              key={pct}
              onClick={() => { setTipPercent(pct); setCustomTip('') }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                !customTip && tipPercent === pct
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>
        <div className="mt-2">
          <input
            type="number"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            placeholder="Custom %"
            min="0"
            max="100"
            step="0.5"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Split Between</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
            className="w-10 h-10 rounded-lg border text-lg font-bold hover:bg-accent transition-colors"
          >
            -
          </button>
          <span className="text-2xl font-bold w-12 text-center">{splitCount}</span>
          <button
            onClick={() => setSplitCount(splitCount + 1)}
            className="w-10 h-10 rounded-lg border text-lg font-bold hover:bg-accent transition-colors"
          >
            +
          </button>
          <span className="text-sm text-muted-foreground">{splitCount === 1 ? 'person' : 'people'}</span>
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Tip Amount</div>
              <div className="text-2xl font-bold text-primary">${result.tip.toFixed(2)}</div>
            </div>
            <div className="rounded-lg border bg-primary/5 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">Total</div>
              <div className="text-2xl font-bold">${result.total.toFixed(2)}</div>
            </div>
          </div>

          {splitCount > 1 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Tip per Person</div>
                <div className="text-xl font-bold text-primary">${result.tipPerPerson.toFixed(2)}</div>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total per Person</div>
                <div className="text-xl font-bold">${result.perPerson.toFixed(2)}</div>
              </div>
            </div>
          )}

          <div className="rounded-lg border p-3">
            <div className="text-xs font-medium mb-2">Tip Comparison</div>
            <div className="space-y-1">
              {tipPresets.map((pct) => {
                const bill = parseFloat(billAmount) || 0
                const tip = bill * (pct / 100)
                return (
                  <div key={pct} className={`flex items-center justify-between text-sm px-2 py-1 rounded ${pct === activeTip ? 'bg-primary/10' : ''}`}>
                    <span>{pct}%</span>
                    <span className="font-mono">${tip.toFixed(2)}</span>
                    <span className="font-mono text-muted-foreground">${(bill + tip).toFixed(2)} total</span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
