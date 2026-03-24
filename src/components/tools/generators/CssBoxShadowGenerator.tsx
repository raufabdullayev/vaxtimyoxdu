'use client'

import { useState, useMemo } from 'react'
import ToolInput from '@/components/ui/ToolInput'

interface Shadow {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  opacity: number
  inset: boolean
}

const DEFAULT_SHADOW: Shadow = {
  offsetX: 5,
  offsetY: 5,
  blur: 15,
  spread: 0,
  color: '#000000',
  opacity: 25,
  inset: false,
}

function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
}

function shadowToCss(shadow: Shadow): string {
  const insetStr = shadow.inset ? 'inset ' : ''
  return `${insetStr}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${hexToRgba(shadow.color, shadow.opacity)}`
}

export default function CssBoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...DEFAULT_SHADOW }])
  const [boxColor, setBoxColor] = useState('#ffffff')
  const [bgColor, setBgColor] = useState('#f0f0f0')
  const [borderRadius, setBorderRadius] = useState(8)
  const [copied, setCopied] = useState(false)

  const cssValue = useMemo(() => {
    return shadows.map(shadowToCss).join(',\n    ')
  }, [shadows])

  const fullCss = useMemo(() => {
    return `box-shadow: ${cssValue};
-webkit-box-shadow: ${cssValue};
-moz-box-shadow: ${cssValue};`
  }, [cssValue])

  const updateShadow = (index: number, key: keyof Shadow, value: number | string | boolean) => {
    setShadows((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [key]: value }
      return next
    })
  }

  const addShadow = () => {
    setShadows((prev) => [...prev, { ...DEFAULT_SHADOW }])
  }

  const removeShadow = (index: number) => {
    if (shadows.length <= 1) return
    setShadows((prev) => prev.filter((_, i) => i !== index))
  }

  const copy = async () => {
    await navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sliders: { key: keyof Shadow; label: string; min: number; max: number }[] = [
    { key: 'offsetX', label: 'Offset X', min: -50, max: 50 },
    { key: 'offsetY', label: 'Offset Y', min: -50, max: 50 },
    { key: 'blur', label: 'Blur', min: 0, max: 100 },
    { key: 'spread', label: 'Spread', min: -50, max: 50 },
    { key: 'opacity', label: 'Opacity (%)', min: 0, max: 100 },
  ]

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div
        className="rounded-lg border p-12 flex justify-center items-center min-h-[200px]"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className="w-48 h-48 rounded-lg transition-shadow"
          style={{
            backgroundColor: boxColor,
            borderRadius: `${borderRadius}px`,
            boxShadow: shadows.map(shadowToCss).join(', '),
          }}
        />
      </div>

      {/* Box options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <ToolInput
          label="Box Color"
          type="color"
          value={boxColor}
          onChange={(e) => setBoxColor(e.target.value)}
        />
        <ToolInput
          label="Background Color"
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium mb-1">
            Border Radius: {borderRadius}px
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={borderRadius}
            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Shadow layers */}
      {shadows.map((shadow, index) => (
        <div key={index} className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Shadow {index + 1}</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={shadow.inset}
                  onChange={(e) => updateShadow(index, 'inset', e.target.checked)}
                  className="rounded accent-primary"
                />
                Inset
              </label>
              {shadows.length > 1 && (
                <button
                  onClick={() => removeShadow(index)}
                  className="text-sm text-destructive hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">Color</label>
            <input
              type="color"
              value={shadow.color}
              onChange={(e) => updateShadow(index, 'color', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sliders.map((s) => (
              <div key={s.key}>
                <label className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{s.label}</span>
                  <span className="font-mono">{shadow[s.key] as number}</span>
                </label>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={shadow[s.key] as number}
                  onChange={(e) => updateShadow(index, s.key, parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addShadow}
        className="w-full py-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors"
      >
        + Add Shadow Layer
      </button>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">CSS Output</label>
          <button
            onClick={copy}
            className="text-xs text-primary hover:underline"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="rounded-lg border bg-muted/50 px-4 py-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
          {fullCss}
        </pre>
      </div>
    </div>
  )
}
