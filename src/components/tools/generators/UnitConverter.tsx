'use client'

import { useState, useMemo } from 'react'

type UnitCategory = 'length' | 'weight' | 'temperature' | 'speed' | 'data' | 'time' | 'area'

interface UnitDef {
  name: string
  label: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

const unitDefinitions: Record<UnitCategory, { label: string; units: UnitDef[] }> = {
  length: {
    label: 'Length',
    units: [
      { name: 'mm', label: 'Millimeter (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: 'cm', label: 'Centimeter (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { name: 'm', label: 'Meter (m)', toBase: (v) => v, fromBase: (v) => v },
      { name: 'km', label: 'Kilometer (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { name: 'in', label: 'Inch (in)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { name: 'ft', label: 'Foot (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { name: 'yd', label: 'Yard (yd)', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { name: 'mi', label: 'Mile (mi)', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    ],
  },
  weight: {
    label: 'Weight',
    units: [
      { name: 'mg', label: 'Milligram (mg)', toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
      { name: 'g', label: 'Gram (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: 'kg', label: 'Kilogram (kg)', toBase: (v) => v, fromBase: (v) => v },
      { name: 'lb', label: 'Pound (lb)', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { name: 'oz', label: 'Ounce (oz)', toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
    ],
  },
  temperature: {
    label: 'Temperature',
    units: [
      { name: 'C', label: 'Celsius (C)', toBase: (v) => v, fromBase: (v) => v },
      { name: 'F', label: 'Fahrenheit (F)', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      { name: 'K', label: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  speed: {
    label: 'Speed',
    units: [
      { name: 'm/s', label: 'Meters/sec (m/s)', toBase: (v) => v, fromBase: (v) => v },
      { name: 'km/h', label: 'Kilometers/hr (km/h)', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { name: 'mph', label: 'Miles/hr (mph)', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { name: 'knots', label: 'Knots (kn)', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
  data: {
    label: 'Digital Storage',
    units: [
      { name: 'B', label: 'Bytes (B)', toBase: (v) => v, fromBase: (v) => v },
      { name: 'KB', label: 'Kilobytes (KB)', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { name: 'MB', label: 'Megabytes (MB)', toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
      { name: 'GB', label: 'Gigabytes (GB)', toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
      { name: 'TB', label: 'Terabytes (TB)', toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
    ],
  },
  time: {
    label: 'Time',
    units: [
      { name: 'ms', label: 'Milliseconds (ms)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { name: 's', label: 'Seconds (s)', toBase: (v) => v, fromBase: (v) => v },
      { name: 'min', label: 'Minutes (min)', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { name: 'h', label: 'Hours (h)', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { name: 'day', label: 'Days (day)', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    ],
  },
  area: {
    label: 'Area',
    units: [
      { name: 'mm2', label: 'Square mm (mm\u00B2)', toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
      { name: 'cm2', label: 'Square cm (cm\u00B2)', toBase: (v) => v / 10_000, fromBase: (v) => v * 10_000 },
      { name: 'm2', label: 'Square m (m\u00B2)', toBase: (v) => v, fromBase: (v) => v },
      { name: 'km2', label: 'Square km (km\u00B2)', toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
      { name: 'in2', label: 'Square in (in\u00B2)', toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
      { name: 'ft2', label: 'Square ft (ft\u00B2)', toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
      { name: 'acre', label: 'Acre', toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
      { name: 'hectare', label: 'Hectare (ha)', toBase: (v) => v * 10_000, fromBase: (v) => v / 10_000 },
    ],
  },
}

const categoryOrder: UnitCategory[] = ['length', 'weight', 'temperature', 'speed', 'data', 'time', 'area']

function formatNumber(n: number): string {
  if (n === 0) return '0'
  if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-10 && Math.abs(n) > 0)) {
    return n.toExponential(6)
  }
  // Use up to 10 decimal places, trim trailing zeros
  const fixed = n.toFixed(10)
  return parseFloat(fixed).toString()
}

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [inputValue, setInputValue] = useState('1')
  const [copied, setCopied] = useState(false)

  const categoryDef = unitDefinitions[category]

  const result = useMemo(() => {
    const num = parseFloat(inputValue)
    if (isNaN(num)) return ''

    const from = categoryDef.units.find((u) => u.name === fromUnit)
    const to = categoryDef.units.find((u) => u.name === toUnit)
    if (!from || !to) return ''

    const baseValue = from.toBase(num)
    const converted = to.fromBase(baseValue)
    return formatNumber(converted)
  }, [inputValue, fromUnit, toUnit, categoryDef])

  const allConversions = useMemo(() => {
    const num = parseFloat(inputValue)
    if (isNaN(num)) return []

    const from = categoryDef.units.find((u) => u.name === fromUnit)
    if (!from) return []

    const baseValue = from.toBase(num)
    return categoryDef.units
      .filter((u) => u.name !== fromUnit)
      .map((u) => ({
        name: u.name,
        label: u.label,
        value: formatNumber(u.fromBase(baseValue)),
      }))
  }, [inputValue, fromUnit, categoryDef])

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat)
    const units = unitDefinitions[newCat].units
    setFromUnit(units[0]?.name || '')
    setToUnit(units[1]?.name || units[0]?.name || '')
    setInputValue('1')
  }

  const swap = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  const copy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Category selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
              aria-pressed={category === cat}
            >
              {unitDefinitions[cat].label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            aria-label="From unit"
          >
            {categoryDef.units.map((u) => (
              <option key={u.name} value={u.name}>
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Value to convert"
          />
        </div>

        <div className="flex justify-center py-2">
          <button
            onClick={swap}
            className="px-3 py-2 border rounded-lg hover:bg-accent transition-colors text-sm"
            aria-label="Swap units"
            title="Swap units"
          >
            &#8644;
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            aria-label="To unit"
          >
            {categoryDef.units.map((u) => (
              <option key={u.name} value={u.name}>
                {u.label}
              </option>
            ))}
          </select>
          <div className="relative">
            <input
              type="text"
              value={result}
              readOnly
              placeholder="Result"
              className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono focus:outline-none"
              aria-label="Conversion result"
            />
            {result && (
              <button
                onClick={copy}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary hover:underline"
                aria-label="Copy result"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Formula display */}
      {result && inputValue && (
        <div className="p-3 rounded-lg bg-muted/50 text-sm text-center font-mono">
          {inputValue} {fromUnit} = {result} {toUnit}
        </div>
      )}

      {/* All conversions */}
      {allConversions.length > 0 && inputValue && !isNaN(parseFloat(inputValue)) && (
        <div>
          <h3 className="text-sm font-medium mb-2">All {categoryDef.label} Conversions</h3>
          <div className="rounded-lg border divide-y">
            {allConversions.map((conv) => (
              <div
                key={conv.name}
                className="flex items-center justify-between px-3 py-2 text-sm"
              >
                <span className="text-muted-foreground">{conv.label}</span>
                <span className="font-mono font-medium">{conv.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
