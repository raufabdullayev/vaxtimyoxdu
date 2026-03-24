'use client'

import { useState, useMemo } from 'react'
import ToolInput from '@/components/ui/ToolInput'
import ToolSelect from '@/components/ui/ToolSelect'

interface BmiResult {
  bmi: number
  category: string
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

  let category: string
  let color: string

  if (bmi < 18.5) {
    category = 'Underweight'
    color = 'text-blue-500'
  } else if (bmi < 25) {
    category = 'Normal weight'
    color = 'text-green-500'
  } else if (bmi < 30) {
    category = 'Overweight'
    color = 'text-orange-500'
  } else {
    category = 'Obese'
    color = 'text-red-500'
  }

  const healthyMin = 18.5 * heightInM * heightInM
  const healthyMax = 24.9 * heightInM * heightInM

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    color,
    healthyWeightRange: {
      min: Math.round(healthyMin * 10) / 10,
      max: Math.round(healthyMax * 10) / 10,
    },
  }
}

const BMI_RANGES = [
  { label: 'Underweight', range: '< 18.5', color: 'bg-blue-500' },
  { label: 'Normal', range: '18.5 - 24.9', color: 'bg-green-500' },
  { label: 'Overweight', range: '25 - 29.9', color: 'bg-orange-500' },
  { label: 'Obese', range: '30+', color: 'bg-red-500' },
]

export default function BmiCalculator() {
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

  return (
    <div className="space-y-4">
      <ToolSelect
        label="Unit System"
        value={unit}
        onChange={(e) => {
          setUnit(e.target.value)
          setWeight('')
          setHeight('')
        }}
        options={[
          { value: 'metric', label: 'Metric (kg, cm)' },
          { value: 'imperial', label: 'Imperial (lbs, inches)' },
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolInput
          label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
          type="number"
          placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min="1"
          step="0.1"
        />
        <ToolInput
          label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
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
            <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
            <div className="text-5xl font-bold text-primary mb-2">{result.bmi}</div>
            <div className={`text-lg font-semibold ${result.color}`}>{result.category}</div>
          </div>

          {/* BMI Scale Bar */}
          <div>
            <label className="text-sm font-medium mb-2 block">BMI Scale</label>
            <div className="relative h-4 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-blue-500" />
              <div className="flex-1 bg-green-500" />
              <div className="flex-1 bg-orange-500" />
              <div className="flex-1 bg-red-500" />
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
              <div key={r.label} className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${r.color}`} />
                <span className="text-muted-foreground">{r.label}: {r.range}</span>
              </div>
            ))}
          </div>

          {/* Healthy weight range */}
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground mb-1">Healthy Weight Range</div>
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
