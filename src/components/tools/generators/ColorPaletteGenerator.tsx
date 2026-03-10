'use client'

import { useState, useMemo, useCallback } from 'react'

interface HSL {
  h: number
  s: number
  l: number
}

function hexToHSL(hex: string): HSL {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100
  const ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hslToRgb(h: number, s: number, l: number): string {
  const hex = hslToHex(h, s, l)
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'split-complementary' | 'monochromatic'

function generatePalette(baseHex: string, harmony: HarmonyType): string[] {
  const { h, s, l } = hexToHSL(baseHex)

  switch (harmony) {
    case 'complementary':
      return [
        hslToHex(h, s, l),
        hslToHex((h + 180) % 360, s, l),
      ]
    case 'analogous':
      return [
        hslToHex((h - 30 + 360) % 360, s, l),
        hslToHex(h, s, l),
        hslToHex((h + 30) % 360, s, l),
        hslToHex((h + 60) % 360, s, l),
      ]
    case 'triadic':
      return [
        hslToHex(h, s, l),
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
      ]
    case 'tetradic':
      return [
        hslToHex(h, s, l),
        hslToHex((h + 90) % 360, s, l),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 270) % 360, s, l),
      ]
    case 'split-complementary':
      return [
        hslToHex(h, s, l),
        hslToHex((h + 150) % 360, s, l),
        hslToHex((h + 210) % 360, s, l),
      ]
    case 'monochromatic':
      return [
        hslToHex(h, s, Math.max(10, l - 30)),
        hslToHex(h, s, Math.max(10, l - 15)),
        hslToHex(h, s, l),
        hslToHex(h, s, Math.min(90, l + 15)),
        hslToHex(h, s, Math.min(95, l + 30)),
      ]
    default:
      return [hslToHex(h, s, l)]
  }
}

const HARMONIES: { value: HarmonyType; label: string; description: string }[] = [
  { value: 'complementary', label: 'Complementary', description: '2 opposite colors' },
  { value: 'analogous', label: 'Analogous', description: '4 adjacent colors' },
  { value: 'triadic', label: 'Triadic', description: '3 evenly spaced colors' },
  { value: 'tetradic', label: 'Tetradic', description: '4 evenly spaced colors' },
  { value: 'split-complementary', label: 'Split Comp.', description: '1 base + 2 adjacent to complement' },
  { value: 'monochromatic', label: 'Monochromatic', description: '5 shades of one hue' },
]

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3b82f6')
  const [harmony, setHarmony] = useState<HarmonyType>('analogous')
  const [copied, setCopied] = useState('')

  const palette = useMemo(() => generatePalette(baseColor, harmony), [baseColor, harmony])

  const randomize = useCallback(() => {
    const h = Math.floor(Math.random() * 360)
    const s = 50 + Math.floor(Math.random() * 40)
    const l = 40 + Math.floor(Math.random() * 30)
    setBaseColor(hslToHex(h, s, l))
  }, [])

  const copyColor = async (hex: string) => {
    await navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(''), 2000)
  }

  const copyAllColors = async () => {
    const text = palette.join(', ')
    await navigator.clipboard.writeText(text)
    setCopied('all')
    setTimeout(() => setCopied(''), 2000)
  }

  const exportCSS = async () => {
    const vars = palette.map((hex, i) => `  --color-${i + 1}: ${hex};`).join('\n')
    const css = `:root {\n${vars}\n}`
    await navigator.clipboard.writeText(css)
    setCopied('css')
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Base color picker */}
      <div className="flex items-end gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Base Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border-0"
              aria-label="Pick base color"
            />
            <input
              type="text"
              value={baseColor}
              onChange={(e) => {
                const v = e.target.value
                if (/^#[0-9a-fA-F]{6}$/.test(v)) setBaseColor(v)
              }}
              className="w-28 rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="#3b82f6"
              aria-label="Base color hex value"
            />
          </div>
        </div>
        <button
          onClick={randomize}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors text-sm"
        >
          Random
        </button>
      </div>

      {/* Harmony type */}
      <div>
        <label className="block text-sm font-medium mb-2">Harmony Type</label>
        <div className="flex flex-wrap gap-2">
          {HARMONIES.map((h) => (
            <button
              key={h.value}
              onClick={() => setHarmony(h.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                harmony === h.value
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
              title={h.description}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Palette preview */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Generated Palette ({palette.length} colors)</label>
          <div className="flex gap-3">
            <button
              onClick={copyAllColors}
              className="text-xs text-primary hover:underline"
            >
              {copied === 'all' ? 'Copied!' : 'Copy All'}
            </button>
            <button
              onClick={exportCSS}
              className="text-xs text-primary hover:underline"
            >
              {copied === 'css' ? 'Copied!' : 'Export CSS'}
            </button>
          </div>
        </div>
        <div className="flex rounded-lg overflow-hidden border h-32">
          {palette.map((hex, i) => (
            <button
              key={i}
              onClick={() => copyColor(hex)}
              className="flex-1 flex items-end justify-center pb-2 transition-transform hover:scale-105 hover:z-10 relative group"
              style={{ backgroundColor: hex }}
              title={`Click to copy ${hex}`}
              aria-label={`Copy color ${hex}`}
            >
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {copied === hex ? 'Copied!' : hex}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color details */}
      <div>
        <label className="text-sm font-medium mb-2 block">Color Details</label>
        <div className="rounded-lg border divide-y">
          {palette.map((hex, i) => {
            const hsl = hexToHSL(hex)
            return (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                <div
                  className="w-8 h-8 rounded-lg border shrink-0"
                  style={{ backgroundColor: hex }}
                />
                <div className="flex-1 grid grid-cols-3 gap-2 text-sm font-mono">
                  <span>{hex}</span>
                  <span>{hslToRgb(hsl.h, hsl.s, hsl.l)}</span>
                  <span>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
                </div>
                <button
                  onClick={() => copyColor(hex)}
                  className="text-xs text-primary hover:underline shrink-0"
                >
                  {copied === hex ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
