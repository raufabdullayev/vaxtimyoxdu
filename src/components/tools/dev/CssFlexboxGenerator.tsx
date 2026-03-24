'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import ToolSelect from '@/components/ui/ToolSelect'
import ToolInput from '@/components/ui/ToolInput'

const FLEX_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse']
const JUSTIFY_OPTIONS = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
const ALIGN_OPTIONS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline']
const WRAP_OPTIONS = ['nowrap', 'wrap', 'wrap-reverse']

export default function CssFlexboxGenerator() {
  const t = useTranslations('toolUI')
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('stretch')
  const [wrap, setWrap] = useState('nowrap')
  const [gap, setGap] = useState('10')
  const [itemCount, setItemCount] = useState('5')
  const [copied, setCopied] = useState(false)

  const cssCode = useMemo(() => {
    const lines = [
      'display: flex;',
      `flex-direction: ${direction};`,
      `justify-content: ${justify};`,
      `align-items: ${align};`,
      `flex-wrap: ${wrap};`,
    ]
    const g = parseInt(gap)
    if (!isNaN(g) && g > 0) {
      lines.push(`gap: ${g}px;`)
    }
    return lines.join('\n')
  }, [direction, justify, align, wrap, gap])

  const copy = async () => {
    await navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const count = Math.max(1, Math.min(12, parseInt(itemCount) || 5))

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div>
        <label className="text-sm font-medium mb-2 block">{t('preview')}</label>
        <div
          className="rounded-lg border bg-muted/30 p-4 min-h-[200px]"
          style={{
            display: 'flex',
            flexDirection: direction as React.CSSProperties['flexDirection'],
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap as React.CSSProperties['flexWrap'],
            gap: `${parseInt(gap) || 0}px`,
          }}
        >
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-sm font-bold"
              style={{
                minWidth: '48px',
                minHeight: '48px',
                padding: '8px 16px',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolSelect
          label="flex-direction"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          options={FLEX_DIRECTIONS.map((v) => ({ value: v, label: v }))}
        />
        <ToolSelect
          label="justify-content"
          value={justify}
          onChange={(e) => setJustify(e.target.value)}
          options={JUSTIFY_OPTIONS.map((v) => ({ value: v, label: v }))}
        />
        <ToolSelect
          label="align-items"
          value={align}
          onChange={(e) => setAlign(e.target.value)}
          options={ALIGN_OPTIONS.map((v) => ({ value: v, label: v }))}
        />
        <ToolSelect
          label="flex-wrap"
          value={wrap}
          onChange={(e) => setWrap(e.target.value)}
          options={WRAP_OPTIONS.map((v) => ({ value: v, label: v }))}
        />
        <ToolInput
          label={t('gapPx')}
          type="number"
          value={gap}
          onChange={(e) => setGap(e.target.value)}
          min="0"
          max="100"
        />
        <ToolInput
          label={t('itemCount')}
          type="number"
          value={itemCount}
          onChange={(e) => setItemCount(e.target.value)}
          min="1"
          max="12"
        />
      </div>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">{t('cssOutput')}</label>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="rounded-lg border bg-muted/50 px-4 py-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
          {cssCode}
        </pre>
      </div>
    </div>
  )
}
