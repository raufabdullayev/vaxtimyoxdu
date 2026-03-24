'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolSelect from '@/components/ui/ToolSelect'
import ToolAlert from '@/components/ui/ToolAlert'

// CODE128 encoding tables
const CODE128_START_B = 104
const CODE128_STOP = 106

const CODE128_PATTERNS: number[][] = [
  [2,1,2,2,2,2],[2,2,2,1,2,2],[2,2,2,2,2,1],[1,2,1,2,2,3],[1,2,1,3,2,2],
  [1,3,1,2,2,2],[1,2,2,2,1,3],[1,2,2,3,1,2],[1,3,2,2,1,2],[2,2,1,2,1,3],
  [2,2,1,3,1,2],[2,3,1,2,1,2],[1,1,2,2,3,2],[1,2,2,1,3,2],[1,2,2,2,3,1],
  [1,1,3,2,2,2],[1,2,3,1,2,2],[1,2,3,2,2,1],[2,2,3,2,1,1],[2,2,1,1,3,2],
  [2,2,1,2,3,1],[2,1,3,2,1,2],[2,2,3,1,1,2],[3,1,2,1,3,1],[3,1,1,2,2,2],
  [3,2,1,1,2,2],[3,2,1,2,2,1],[3,1,2,2,1,2],[3,2,2,1,1,2],[3,2,2,2,1,1],
  [2,1,2,1,2,3],[2,1,2,3,2,1],[2,3,2,1,2,1],[1,1,1,3,2,3],[1,3,1,1,2,3],
  [1,3,1,3,2,1],[1,1,2,3,1,3],[1,3,2,1,1,3],[1,3,2,3,1,1],[2,1,1,3,1,3],
  [2,3,1,1,1,3],[2,3,1,3,1,1],[1,1,2,1,3,3],[1,1,2,3,3,1],[1,3,2,1,3,1],
  [1,1,3,1,2,3],[1,1,3,3,2,1],[1,3,3,1,2,1],[3,1,3,1,2,1],[2,1,1,3,3,1],
  [2,3,1,1,3,1],[2,1,3,1,1,3],[2,1,3,3,1,1],[2,1,3,1,3,1],[3,1,1,1,2,3],
  [3,1,1,3,2,1],[3,3,1,1,2,1],[3,1,2,1,1,3],[3,1,2,3,1,1],[3,3,2,1,1,1],
  [3,1,4,1,1,1],[2,2,1,4,1,1],[4,3,1,1,1,1],[1,1,1,2,2,4],[1,1,1,4,2,2],
  [1,2,1,1,2,4],[1,2,1,4,2,1],[1,4,1,1,2,2],[1,4,1,2,2,1],[1,1,2,2,1,4],
  [1,1,2,4,1,2],[1,2,2,1,1,4],[1,2,2,4,1,1],[1,4,2,1,1,2],[1,4,2,2,1,1],
  [2,4,1,2,1,1],[2,2,1,1,1,4],[4,1,3,1,1,1],[2,4,1,1,1,2],[1,3,4,1,1,1],
  [1,1,1,2,4,2],[1,2,1,1,4,2],[1,2,1,2,4,1],[1,1,4,2,1,2],[1,2,4,1,1,2],
  [1,2,4,2,1,1],[4,1,1,2,1,2],[4,2,1,1,1,2],[4,2,1,2,1,1],[2,1,2,1,4,1],
  [2,1,4,1,2,1],[4,1,2,1,2,1],[1,1,1,1,4,3],[1,1,1,3,4,1],[1,3,1,1,4,1],
  [1,1,4,1,1,3],[1,1,4,3,1,1],[4,1,1,1,1,3],[4,1,1,3,1,1],[1,1,3,1,4,1],
  [1,1,4,1,3,1],[3,1,1,1,4,1],[4,1,1,1,3,1],[2,1,1,4,1,2],[2,1,1,2,1,4],
  [2,1,1,2,3,2],[2,3,3,1,1,1,2],
]

type BarcodeFormat = 'CODE128' | 'CODE39'

const CODE39_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*'
const CODE39_PATTERNS: string[] = [
  'nnnwwnwnn','wnnnnnnwn','nnwnnnnwn','wnwnnnnnn','nnnwnnnwn','wnnwnnnnn',
  'nnwwnnnnn','nnnnnwnwn','wnnnnwnnn','nnwnnwnnn','wnnnnnnwn','nnwnnnnwn',
  'wnwnnnnnn','nnnwnnnwn','wnnwnnnnn','nnwwnnnnn','nnnnnwnwn','wnnnnwnnn',
  'nnwnnwnnn','nnnwnwnnn','wnnnnnnwn','nnwnnnnwn','wnwnnnnnn','nnnwnnnwn',
  'wnnwnnnnn','nnwwnnnnn','nnnnnwnwn','wnnnnwnnn','nnwnnwnnn','nnnwnwnnn',
  'wnnnnnnwn','nnwnnnnwn','wnwnnnnnn','nnnwnnnwn','wnnwnnnnn','nnwwnnnnn',
  'nnnnnwnwn','wnnnnwnnn','nnwnnwnnn','nnnwnnwnn','nwnwnnnnn','nwnnnwnnn',
  'nnnwnwnn','nwnwnnwnn',
]

function encodeCode128(text: string): number[] | null {
  if (!text) return null
  const codes: number[] = [CODE128_START_B]
  let checksum = CODE128_START_B

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32
    if (code < 0 || code > 95) return null
    codes.push(code)
    checksum += code * (i + 1)
  }

  codes.push(checksum % 103)
  codes.push(CODE128_STOP)
  return codes
}

function drawBarcode(
  canvas: HTMLCanvasElement,
  text: string,
  format: BarcodeFormat,
  barWidth: number,
  barHeight: number,
  showText: boolean
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return false

  if (format === 'CODE128') {
    const codes = encodeCode128(text)
    if (!codes) return false

    let totalBars = 0
    for (const code of codes) {
      const pattern = CODE128_PATTERNS[code]
      if (!pattern) return false
      for (const bar of pattern) totalBars += bar
    }

    const margin = 20
    const textHeight = showText ? 24 : 0
    canvas.width = totalBars * barWidth + margin * 2
    canvas.height = barHeight + margin * 2 + textHeight

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let x = margin
    for (const code of codes) {
      const pattern = CODE128_PATTERNS[code]
      for (let j = 0; j < pattern.length; j++) {
        const w = pattern[j] * barWidth
        if (j % 2 === 0) {
          ctx.fillStyle = '#000000'
          ctx.fillRect(x, margin, w, barHeight)
        }
        x += w
      }
    }

    if (showText) {
      ctx.fillStyle = '#000000'
      ctx.font = '14px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(text, canvas.width / 2, barHeight + margin + 18)
    }
    return true
  }

  if (format === 'CODE39') {
    const upper = `*${text.toUpperCase()}*`
    for (const ch of upper) {
      if (!CODE39_CHARS.includes(ch)) return false
    }

    const margin = 20
    const textHeight = showText ? 24 : 0
    const charWidth = (3 * barWidth * 3 + 6 * barWidth + barWidth)
    canvas.width = upper.length * charWidth + margin * 2
    canvas.height = barHeight + margin * 2 + textHeight

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let x = margin
    for (const ch of upper) {
      const idx = CODE39_CHARS.indexOf(ch)
      if (idx < 0) return false
      const pattern = CODE39_PATTERNS[idx]
      for (let j = 0; j < 9; j++) {
        const wide = pattern[j] === 'w'
        const w = wide ? barWidth * 3 : barWidth
        if (j % 2 === 0) {
          ctx.fillStyle = '#000000'
          ctx.fillRect(x, margin, w, barHeight)
        }
        x += w
      }
      x += barWidth
    }

    if (showText) {
      ctx.fillStyle = '#000000'
      ctx.font = '14px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(text.toUpperCase(), canvas.width / 2, barHeight + margin + 18)
    }
    return true
  }

  return false
}

const FORMATS = [
  { value: 'CODE128', label: 'CODE128 (any ASCII text)' },
  { value: 'CODE39', label: 'CODE39 (alphanumeric + -. $/+%)' },
]

export default function BarcodeGenerator() {
  const t = useTranslations('toolUI')
  const [text, setText] = useState('Hello World')
  const [format, setFormat] = useState<BarcodeFormat>('CODE128')
  const [barWidth, setBarWidth] = useState('2')
  const [barHeight, setBarHeight] = useState('100')
  const [showText, setShowText] = useState(true)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const render = useCallback(() => {
    if (!canvasRef.current || !text.trim()) {
      setError('')
      return
    }
    const ok = drawBarcode(
      canvasRef.current,
      text,
      format,
      parseInt(barWidth) || 2,
      parseInt(barHeight) || 100,
      showText
    )
    setError(ok ? '' : t('invalidInputForFormat', { format }))
  }, [text, format, barWidth, barHeight, showText, t])

  useEffect(() => {
    render()
  }, [render])

  const download = () => {
    if (!canvasRef.current || error) return
    const a = document.createElement('a')
    a.href = canvasRef.current.toDataURL('image/png')
    a.download = `barcode-${text.slice(0, 20)}.png`
    a.click()
  }

  return (
    <div className="space-y-4">
      <ToolInput
        label={t('barcodeContent')}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('enterTextOrNumber')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ToolSelect
          label={t('format')}
          value={format}
          onChange={(e) => setFormat(e.target.value as BarcodeFormat)}
          options={FORMATS}
        />
        <ToolInput
          label={t('barWidth')}
          type="number"
          value={barWidth}
          onChange={(e) => setBarWidth(e.target.value)}
          min="1"
          max="5"
        />
        <ToolInput
          label={t('size')}
          type="number"
          value={barHeight}
          onChange={(e) => setBarHeight(e.target.value)}
          min="30"
          max="300"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
        <input
          type="checkbox"
          checked={showText}
          onChange={(e) => setShowText(e.target.checked)}
          className="rounded accent-primary"
        />
        {t('showTextBelowBarcode')}
      </label>

      {/* Preview */}
      <div className="rounded-lg border p-6 bg-background flex justify-center min-h-[160px] items-center">
        {error ? (
          <ToolAlert variant="error">{error}</ToolAlert>
        ) : !text.trim() ? (
          <div className="text-sm text-muted-foreground">{t('enterContentToGenerate')}</div>
        ) : (
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={t('barcodePreview', { text })}
          />
        )}
      </div>

      {/* Download */}
      <div className="flex gap-3">
        <button
          onClick={download}
          disabled={!!error || !text.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {t('downloadPng')}
        </button>
      </div>
    </div>
  )
}
