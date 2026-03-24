'use client'

import { useState, useMemo } from 'react'
import ToolInput from '@/components/ui/ToolInput'

type Mode = 'percentage-of' | 'is-what-percent' | 'percent-change'

interface ModeConfig {
  key: Mode
  label: string
  description: string
}

const MODES: ModeConfig[] = [
  { key: 'percentage-of', label: 'X% of Y', description: 'What is X% of Y?' },
  { key: 'is-what-percent', label: 'X is what % of Y', description: 'X is what percent of Y?' },
  { key: 'percent-change', label: 'Change from X to Y', description: 'Percentage change from X to Y' },
]

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('percentage-of')
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  const result = useMemo(() => {
    const a = parseFloat(valueA)
    const b = parseFloat(valueB)
    if (isNaN(a) || isNaN(b)) return null

    switch (mode) {
      case 'percentage-of':
        return { value: (a / 100) * b, label: `${a}% of ${b}`, unit: '' }
      case 'is-what-percent':
        if (b === 0) return null
        return { value: (a / b) * 100, label: `${a} is this % of ${b}`, unit: '%' }
      case 'percent-change':
        if (a === 0) return null
        return {
          value: ((b - a) / Math.abs(a)) * 100,
          label: `Change from ${a} to ${b}`,
          unit: '%',
        }
      default:
        return null
    }
  }, [mode, valueA, valueB])

  const getLabels = (): { labelA: string; labelB: string; placeholderA: string; placeholderB: string } => {
    switch (mode) {
      case 'percentage-of':
        return { labelA: 'Percentage (%)', labelB: 'Of Value', placeholderA: 'e.g., 25', placeholderB: 'e.g., 200' }
      case 'is-what-percent':
        return { labelA: 'Value', labelB: 'Of Total', placeholderA: 'e.g., 50', placeholderB: 'e.g., 200' }
      case 'percent-change':
        return { labelA: 'From Value', labelB: 'To Value', placeholderA: 'e.g., 100', placeholderB: 'e.g., 150' }
    }
  }

  const labels = getLabels()

  const formatResult = (val: number): string => {
    return Math.round(val * 1000000) / 1000000 === Math.round(val)
      ? val.toLocaleString()
      : (Math.round(val * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="space-y-4">
      {/* Mode selector */}
      <div>
        <label className="text-sm font-medium mb-2 block">Calculation Mode</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setMode(m.key)
                setValueA('')
                setValueB('')
              }}
              className={`px-4 py-3 rounded-lg text-left text-sm transition-colors ${
                mode === m.key
                  ? 'bg-primary/10 ring-1 ring-primary'
                  : 'border hover:bg-accent'
              }`}
            >
              <div className="font-medium">{m.label}</div>
              <div className="text-xs text-muted-foreground">{m.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolInput
          label={labels.labelA}
          type="number"
          placeholder={labels.placeholderA}
          value={valueA}
          onChange={(e) => setValueA(e.target.value)}
          step="any"
        />
        <ToolInput
          label={labels.labelB}
          type="number"
          placeholder={labels.placeholderB}
          value={valueB}
          onChange={(e) => setValueB(e.target.value)}
          step="any"
        />
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-lg border bg-primary/5 p-6 text-center">
          <div className="text-sm text-muted-foreground mb-2">{result.label}</div>
          <div className="text-4xl font-bold text-primary">
            {mode === 'percent-change' && result.value > 0 && '+'}
            {formatResult(result.value)}{result.unit}
          </div>
          {mode === 'percent-change' && (
            <div className={`text-sm font-medium mt-2 ${result.value > 0 ? 'text-green-500' : result.value < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {result.value > 0 ? 'Increase' : result.value < 0 ? 'Decrease' : 'No change'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
