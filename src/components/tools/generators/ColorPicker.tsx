'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function generatePalette(hex: string): string[] {
  const rgb = hexToRgb(hex)
  if (!rgb) return []
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const palette: string[] = []
  for (let i = 0; i < 5; i++) {
    const newH = (hsl.h + i * 72) % 360
    palette.push(`hsl(${newH}, ${hsl.s}%, ${hsl.l}%)`)
  }
  return palette
}

export default function ColorPicker() {
  const t = useTranslations('toolUI')
  const [color, setColor] = useState('#3b82f6')
  const [copied, setCopied] = useState('')

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const palette = generatePalette(color)

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(''), 1500)
  }, [])

  const formats = rgb && hsl ? [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ] : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-32 h-32 rounded-lg border cursor-pointer"
        />
        <div className="flex-1 space-y-3 w-full">
          <div>
            <label className="block text-sm font-medium mb-1">HEX Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => {
                const v = e.target.value
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColor(v)
              }}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {formats.map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              <span className="text-sm font-medium w-10">{f.label}</span>
              <code className="flex-1 text-sm bg-muted/50 px-3 py-1.5 rounded font-mono">
                {f.value}
              </code>
              <button
                onClick={() => copy(f.value)}
                className="text-xs text-primary hover:underline"
              >
                {copied === f.value ? t('copied') : t('copy')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {palette.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">{t('generatePalette')}</h3>
          <div className="flex gap-2">
            {palette.map((c, i) => (
              <button
                key={i}
                onClick={() => copy(c)}
                className="flex-1 h-16 rounded-lg border hover:scale-105 transition-transform"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            {palette.map((c, i) => (
              <div key={i} className="flex-1 text-center text-[10px] text-muted-foreground truncate">
                {c}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="w-full h-24 rounded-lg border"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}
