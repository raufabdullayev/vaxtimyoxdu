'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolRadioGroup from '@/components/ui/ToolRadioGroup'

type Mode = 'percentage-of' | 'is-what-percent' | 'percent-change'

export default function PercentageCalculator() {
  const t = useTranslations('toolUI.genTools')
  const [mode, setMode] = useState<Mode>('percentage-of')
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  const modeOptions = [
    { value: 'percentage-of', label: t('percentageOf') },
    { value: 'is-what-percent', label: t('isWhatPercent') },
    { value: 'percent-change', label: t('percentChange') },
  ]

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
        return { labelA: t('percentage'), labelB: t('ofValue'), placeholderA: 'e.g., 25', placeholderB: 'e.g., 200' }
      case 'is-what-percent':
        return { labelA: t('value'), labelB: t('ofTotal'), placeholderA: 'e.g., 50', placeholderB: 'e.g., 200' }
      case 'percent-change':
        return { labelA: t('fromValue'), labelB: t('toValue'), placeholderA: 'e.g., 100', placeholderB: 'e.g., 150' }
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
        <label className="text-sm font-medium mb-2 block">{t('calculationMode')}</label>
        <ToolRadioGroup
          label={t('calculationMode')}
          options={modeOptions}
          value={mode}
          onChange={(val) => {
            setMode(val as Mode)
            setValueA('')
            setValueB('')
          }}
        />
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
            <div className={`text-sm font-medium mt-2 ${result.value > 0 ? 'text-green-500 dark:text-green-400' : result.value < 0 ? 'text-red-500 dark:text-red-400' : 'text-muted-foreground'}`}>
              {result.value > 0 ? t('increase') : result.value < 0 ? t('decrease') : t('noChange')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
