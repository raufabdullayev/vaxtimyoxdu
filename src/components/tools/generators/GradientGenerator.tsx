'use client'

import { useState, useMemo } from 'react'

interface ColorStop {
  color: string
  position: number
}

export default function GradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear')
  const [angle, setAngle] = useState(135)
  const [stops, setStops] = useState<ColorStop[]>([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 },
  ])
  const [copied, setCopied] = useState(false)

  const cssValue = useMemo(() => {
    const stopsStr = stops
      .map((s) => `${s.color} ${s.position}%`)
      .join(', ')
    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${stopsStr})`
    }
    return `radial-gradient(circle, ${stopsStr})`
  }, [type, angle, stops])

  const cssCode = `background: ${cssValue};`

  const updateStop = (index: number, field: keyof ColorStop, value: string | number) => {
    setStops((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    )
  }

  const addStop = () => {
    if (stops.length >= 6) return
    const lastPos = stops[stops.length - 1]?.position || 0
    const newPos = Math.min(100, lastPos + Math.round((100 - lastPos) / 2))
    setStops((prev) => [...prev, { color: '#00d2ff', position: newPos }])
  }

  const removeStop = (index: number) => {
    if (stops.length <= 2) return
    setStops((prev) => prev.filter((_, i) => i !== index))
  }

  const copy = async () => {
    await navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { name: 'Sunset', stops: [{ color: '#f12711', position: 0 }, { color: '#f5af19', position: 100 }], angle: 135 },
    { name: 'Ocean', stops: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }], angle: 135 },
    { name: 'Purple', stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }], angle: 135 },
    { name: 'Forest', stops: [{ color: '#11998e', position: 0 }, { color: '#38ef7d', position: 100 }], angle: 135 },
    { name: 'Night', stops: [{ color: '#0f0c29', position: 0 }, { color: '#302b63', position: 50 }, { color: '#24243e', position: 100 }], angle: 135 },
    { name: 'Rainbow', stops: [{ color: '#ff0000', position: 0 }, { color: '#ffff00', position: 25 }, { color: '#00ff00', position: 50 }, { color: '#0000ff', position: 75 }, { color: '#ff00ff', position: 100 }], angle: 90 },
  ]

  const applyPreset = (preset: typeof presets[0]) => {
    setStops(preset.stops)
    setAngle(preset.angle)
  }

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div
        className="w-full h-48 rounded-lg border"
        style={{ background: cssValue }}
        aria-label="Gradient preview"
      />

      {/* Presets */}
      <div>
        <label className="block text-sm font-medium mb-2">Presets</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 text-sm rounded-lg border hover:bg-accent transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Type & Angle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setType('linear')}
              className={`flex-1 px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                type === 'linear'
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => setType('radial')}
              className={`flex-1 px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                type === 'radial'
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              Radial
            </button>
          </div>
        </div>
        {type === 'linear' && (
          <div>
            <label className="block text-sm font-medium mb-1">Angle: {angle}deg</label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>360</span>
            </div>
          </div>
        )}
      </div>

      {/* Color stops */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Color Stops</label>
          {stops.length < 6 && (
            <button
              onClick={addStop}
              className="text-xs text-primary hover:underline"
            >
              + Add Stop
            </button>
          )}
        </div>
        <div className="space-y-2">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg border">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(i, 'color', e.target.value)}
                className="w-10 h-8 rounded cursor-pointer border-0"
                aria-label={`Color stop ${i + 1} color`}
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(i, 'color', e.target.value)}
                className="w-24 rounded-lg border bg-background px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Color stop ${i + 1} hex value`}
              />
              <div className="flex items-center gap-1 flex-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(e) => updateStop(i, 'position', Number(e.target.value))}
                  className="flex-1 accent-primary"
                  aria-label={`Color stop ${i + 1} position`}
                />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {stop.position}%
                </span>
              </div>
              {stops.length > 2 && (
                <button
                  onClick={() => removeStop(i)}
                  className="p-1 hover:bg-destructive/10 text-destructive rounded"
                  title="Remove stop"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">CSS Code</label>
          <button
            onClick={copy}
            className="text-xs text-primary hover:underline"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono break-all">
          {cssCode}
        </div>
      </div>
    </div>
  )
}
