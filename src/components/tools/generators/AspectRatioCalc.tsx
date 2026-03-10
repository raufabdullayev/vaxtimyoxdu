'use client'

import { useState, useCallback } from 'react'

interface Preset {
  label: string
  w: number
  h: number
}

const PRESETS: Preset[] = [
  { label: '16:9', w: 16, h: 9 },
  { label: '4:3', w: 4, h: 3 },
  { label: '1:1', w: 1, h: 1 },
  { label: '21:9', w: 21, h: 9 },
  { label: '9:16', w: 9, h: 16 },
  { label: '3:2', w: 3, h: 2 },
  { label: '5:4', w: 5, h: 4 },
]

const COMMON_RESOLUTIONS: Record<string, string[]> = {
  '16:9': ['1920x1080', '1280x720', '2560x1440', '3840x2160', '1366x768', '7680x4320'],
  '4:3': ['1024x768', '1280x960', '1600x1200', '2048x1536', '800x600', '640x480'],
  '1:1': ['1080x1080', '720x720', '512x512', '256x256', '1024x1024', '2048x2048'],
  '21:9': ['2560x1080', '3440x1440', '5120x2160'],
  '9:16': ['1080x1920', '720x1280', '1440x2560'],
  '3:2': ['1080x720', '1440x960', '2160x1440', '6000x4000'],
  '5:4': ['1280x1024', '2560x2048'],
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a))
  b = Math.abs(Math.round(b))
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

function simplifyRatio(w: number, h: number): { rw: number; rh: number } {
  if (w <= 0 || h <= 0) return { rw: 0, rh: 0 }
  const d = gcd(w, h)
  return { rw: w / d, rh: h / d }
}

export default function AspectRatioCalc() {
  const [width, setWidth] = useState(1920)
  const [height, setHeight] = useState(1080)
  const [lockRatio, setLockRatio] = useState(false)
  const [lockedRatio, setLockedRatio] = useState<{ rw: number; rh: number } | null>(null)

  const { rw, rh } = simplifyRatio(width, height)
  const ratioStr = rw && rh ? `${rw}:${rh}` : '--'

  const handleLockToggle = useCallback(() => {
    if (!lockRatio) {
      // Locking: store current ratio
      const ratio = simplifyRatio(width, height)
      if (ratio.rw > 0 && ratio.rh > 0) {
        setLockedRatio(ratio)
      }
    } else {
      setLockedRatio(null)
    }
    setLockRatio((prev) => !prev)
  }, [lockRatio, width, height])

  const handleWidthChange = useCallback((val: number) => {
    setWidth(val)
    if (lockRatio && lockedRatio && lockedRatio.rw > 0) {
      setHeight(Math.round((val * lockedRatio.rh) / lockedRatio.rw))
    }
  }, [lockRatio, lockedRatio])

  const handleHeightChange = useCallback((val: number) => {
    setHeight(val)
    if (lockRatio && lockedRatio && lockedRatio.rh > 0) {
      setWidth(Math.round((val * lockedRatio.rw) / lockedRatio.rh))
    }
  }, [lockRatio, lockedRatio])

  const applyPreset = useCallback((preset: Preset) => {
    const newW = preset.w * 120
    const newH = preset.h * 120
    setWidth(newW)
    setHeight(newH)
    setLockedRatio({ rw: preset.w, rh: preset.h })
    setLockRatio(true)
  }, [])

  const resolutions = COMMON_RESOLUTIONS[ratioStr] || []

  // Calculate preview rectangle dimensions (max 280px on either side)
  const maxPreview = 280
  const previewScale = width >= height
    ? maxPreview / Math.max(width, 1)
    : maxPreview / Math.max(height, 1)
  const previewW = Math.max(20, Math.round(width * previewScale))
  const previewH = Math.max(20, Math.round(height * previewScale))

  return (
    <div className="space-y-6">
      {/* Input fields */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="ar-width" className="block text-sm font-medium mb-1">Width</label>
          <input
            id="ar-width"
            type="number"
            min={1}
            value={width}
            onChange={(e) => handleWidthChange(Math.max(1, Number(e.target.value)))}
            className="w-32 rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Width in pixels"
          />
        </div>
        <span className="text-lg font-bold text-muted-foreground pb-2">x</span>
        <div>
          <label htmlFor="ar-height" className="block text-sm font-medium mb-1">Height</label>
          <input
            id="ar-height"
            type="number"
            min={1}
            value={height}
            onChange={(e) => handleHeightChange(Math.max(1, Number(e.target.value)))}
            className="w-32 rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Height in pixels"
          />
        </div>
        <button
          onClick={handleLockToggle}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            lockRatio
              ? 'bg-primary text-primary-foreground border-primary'
              : 'hover:bg-accent'
          }`}
          aria-label={lockRatio ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
          aria-pressed={lockRatio}
        >
          {lockRatio ? 'Locked' : 'Lock Ratio'}
        </button>
      </div>

      {/* Aspect ratio result */}
      <div className="rounded-lg border bg-muted/50 p-4 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Aspect Ratio:</span>
        <span className="text-2xl font-bold font-mono">{ratioStr}</span>
        <span className="text-sm text-muted-foreground ml-auto">
          {width} x {height} px
        </span>
      </div>

      {/* Presets */}
      <div>
        <h3 className="text-sm font-medium mb-2">Common Presets</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                ratioStr === preset.label
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'hover:bg-accent'
              }`}
              aria-label={`Set aspect ratio to ${preset.label}`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual preview */}
      <div>
        <h3 className="text-sm font-medium mb-2">Visual Preview</h3>
        <div className="rounded-lg border bg-muted/50 p-6 flex items-center justify-center min-h-[200px]">
          <div
            className="rounded border-2 border-primary bg-primary/10 flex items-center justify-center transition-all duration-200"
            style={{ width: previewW, height: previewH }}
            aria-label={`Preview rectangle showing ${ratioStr} aspect ratio`}
          >
            <span className="text-xs text-primary font-medium">
              {ratioStr}
            </span>
          </div>
        </div>
      </div>

      {/* Common resolutions */}
      {resolutions.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Common Resolutions ({ratioStr})</h3>
          <div className="flex flex-wrap gap-2">
            {resolutions.map((res) => {
              const [rw, rh] = res.split('x').map(Number)
              const isActive = rw === width && rh === height
              return (
                <button
                  key={res}
                  onClick={() => {
                    setWidth(rw)
                    setHeight(rh)
                  }}
                  className={`px-3 py-1.5 rounded-md text-sm font-mono border transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-accent'
                  }`}
                  aria-label={`Set resolution to ${res}`}
                >
                  {res}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
