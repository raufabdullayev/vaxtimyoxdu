'use client'

import { useState, useMemo, useId } from 'react'
import { useTranslations } from 'next-intl'
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
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.genTools')
  const colorId = useId()
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

  const sliderKeys: { key: keyof Shadow; tKey: string; min: number; max: number }[] = [
    { key: 'offsetX', tKey: 'offsetX', min: -50, max: 50 },
    { key: 'offsetY', tKey: 'offsetY', min: -50, max: 50 },
    { key: 'blur', tKey: 'blur', min: 0, max: 100 },
    { key: 'spread', tKey: 'spread', min: -50, max: 50 },
    { key: 'opacity', tKey: 'opacityPercent', min: 0, max: 100 },
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
          label={t('boxColor')}
          type="color"
          value={boxColor}
          onChange={(e) => setBoxColor(e.target.value)}
        />
        <ToolInput
          label={t('backgroundColor')}
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('borderRadiusPx', { value: borderRadius })}
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={borderRadius}
            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
            className="w-full accent-primary"
            aria-label={t('borderRadiusPx', { value: borderRadius })}
          />
        </div>
      </div>

      {/* Shadow layers */}
      {shadows.map((shadow, index) => (
        <div key={index} className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('shadow', { index: index + 1 })}</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={shadow.inset}
                  onChange={(e) => updateShadow(index, 'inset', e.target.checked)}
                  className="rounded accent-primary"
                  aria-label={t('toggleInset', { index: index + 1 })}
                />
                {t('inset')}
              </label>
              {shadows.length > 1 && (
                <button
                  onClick={() => removeShadow(index)}
                  className="text-sm text-destructive hover:underline"
                  aria-label={t('removeShadow', { index: index + 1 })}
                >
                  {t('remove')}
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor={`${colorId}-${index}`} className="text-sm text-muted-foreground">
              {t('shadowColor')}
            </label>
            <input
              id={`${colorId}-${index}`}
              type="color"
              value={shadow.color}
              onChange={(e) => updateShadow(index, 'color', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sliderKeys.map((s) => (
              <div key={s.key}>
                <label className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{t(s.tKey as Parameters<typeof t>[0])}</span>
                  <span className="font-mono">{shadow[s.key] as number}</span>
                </label>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={shadow[s.key] as number}
                  onChange={(e) => updateShadow(index, s.key, parseInt(e.target.value))}
                  className="w-full accent-primary"
                  aria-label={`${t(s.tKey as Parameters<typeof t>[0])}: ${shadow[s.key]}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addShadow}
        className="w-full py-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors"
        aria-label={t('addNewShadow')}
      >
        {t('addShadowLayer')}
      </button>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">{tc('cssOutput')}</label>
          <button
            onClick={copy}
            className="text-xs text-primary hover:underline"
          >
            {copied ? tc('copied') : tc('copy')}
          </button>
        </div>
        <pre className="rounded-lg border bg-muted/50 px-4 py-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
          {fullCss}
        </pre>
      </div>
    </div>
  )
}
