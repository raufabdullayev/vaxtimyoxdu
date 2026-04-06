'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolSelect from '@/components/ui/ToolSelect'

interface BmiResult {
  bmi: number
  categoryKey: string
  color: string
  healthyWeightRange: { min: number; max: number }
}

function calculateBmi(weight: number, height: number, unit: string): BmiResult | null {
  if (weight <= 0 || height <= 0) return null

  let bmi: number
  let heightInM: number

  if (unit === 'metric') {
    heightInM = height / 100
    bmi = weight / (heightInM * heightInM)
  } else {
    bmi = (weight / (height * height)) * 703
    heightInM = height * 0.0254
  }

  let categoryKey: string
  let color: string

  if (bmi < 18.5) {
    categoryKey = 'underweight'
    color = 'text-blue-500 dark:text-blue-400'
  } else if (bmi < 25) {
    categoryKey = 'normalWeight'
    color = 'text-green-500 dark:text-green-400'
  } else if (bmi < 30) {
    categoryKey = 'overweight'
    color = 'text-orange-500 dark:text-orange-400'
  } else {
    categoryKey = 'obese'
    color = 'text-red-500 dark:text-red-400'
  }

  const healthyMin = 18.5 * heightInM * heightInM
  const healthyMax = 24.9 * heightInM * heightInM

  return {
    bmi: Math.round(bmi * 10) / 10,
    categoryKey,
    color,
    healthyWeightRange: {
      min: Math.round(healthyMin * 10) / 10,
      max: Math.round(healthyMax * 10) / 10,
    },
  }
}

export default function BmiCalculator() {
  const t = useTranslations('toolUI.genTools')
  const [unit, setUnit] = useState('metric')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')

  const result = useMemo(() => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    if (isNaN(w) || isNaN(h)) return null
    return calculateBmi(w, h, unit)
  }, [weight, height, unit])

  const bmiPosition = result ? Math.min(Math.max(((result.bmi - 10) / 35) * 100, 0), 100) : 0

  const BMI_RANGES = [
    { labelKey: 'underweight', range: '< 18.5', color: 'bg-blue-500 dark:bg-blue-600' },
    { labelKey: 'normal', range: '18.5 - 24.9', color: 'bg-green-500 dark:bg-green-600' },
    { labelKey: 'overweight', range: '25 - 29.9', color: 'bg-orange-500 dark:bg-orange-600' },
    { labelKey: 'obese', range: '30+', color: 'bg-red-500 dark:bg-red-600' },
  ]

  return (
    <div className="space-y-4">
      <ToolSelect
        label={t('unitSystem')}
        value={unit}
        onChange={(e) => {
          setUnit(e.target.value)
          setWeight('')
          setHeight('')
        }}
        options={[
          { value: 'metric', label: t('metricKgCm') },
          { value: 'imperial', label: t('imperialLbsIn') },
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolInput
          label={unit === 'metric' ? t('weightKg') : t('weightLbs')}
          type="number"
          placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min="1"
          step="0.1"
        />
        <ToolInput
          label={unit === 'metric' ? t('heightCm') : t('heightInches')}
          type="number"
          placeholder={unit === 'metric' ? 'e.g., 175' : 'e.g., 69'}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          min="1"
          step="0.1"
        />
      </div>

      {result && (
        <>
          <div className="rounded-lg border bg-primary/5 p-6 text-center">
            <div className="text-sm text-muted-foreground mb-2">{t('yourBmi')}</div>
            <div className="text-5xl font-bold text-primary mb-2">{result.bmi}</div>
            <div className={`text-lg font-semibold ${result.color}`}>
              {t(result.categoryKey as Parameters<typeof t>[0])}
            </div>
          </div>

          {/* BMI Scale Bar */}
          <div>
            <label className="text-sm font-medium mb-2 block">{t('bmiScale')}</label>
            <div className="relative h-4 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-blue-500 dark:bg-blue-600" />
              <div className="flex-1 bg-green-500 dark:bg-green-600" />
              <div className="flex-1 bg-orange-500 dark:bg-orange-600" />
              <div className="flex-1 bg-red-500 dark:bg-red-600" />
            </div>
            <div className="relative h-6">
              <div
                className="absolute -translate-x-1/2 top-1"
                style={{ left: `${bmiPosition}%` }}
              >
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-foreground" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BMI_RANGES.map((r) => (
              <div key={r.labelKey} className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${r.color}`} />
                <span className="text-muted-foreground">
                  {t(r.labelKey as Parameters<typeof t>[0])}: {r.range}
                </span>
              </div>
            ))}
          </div>

          {/* Healthy weight range */}
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground mb-1">{t('healthyWeightRange')}</div>
            <div className="text-lg font-bold">
              {result.healthyWeightRange.min} - {result.healthyWeightRange.max}{' '}
              <span className="text-sm font-normal text-muted-foreground">
                {unit === 'metric' ? 'kg' : 'lbs'}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
