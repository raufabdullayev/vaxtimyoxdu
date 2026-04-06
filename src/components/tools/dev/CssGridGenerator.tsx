'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolSelect from '@/components/ui/ToolSelect'

const JUSTIFY_ITEMS = ['stretch', 'start', 'end', 'center']
const ALIGN_ITEMS = ['stretch', 'start', 'end', 'center']

export default function CssGridGenerator() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.devTools')
  const [columns, setColumns] = useState('3')
  const [rows, setRows] = useState('2')
  const [gap, setGap] = useState('10')
  const [columnSizing, setColumnSizing] = useState('1fr')
  const [rowSizing, setRowSizing] = useState('auto')
  const [justifyItems, setJustifyItems] = useState('stretch')
  const [alignItems, setAlignItems] = useState('stretch')
  const [copied, setCopied] = useState(false)

  const colCount = Math.max(1, Math.min(12, parseInt(columns) || 3))
  const rowCount = Math.max(1, Math.min(12, parseInt(rows) || 2))
  const cellCount = colCount * rowCount

  const cssCode = useMemo(() => {
    const g = parseInt(gap) || 0
    const colTemplate = Array(colCount).fill(columnSizing).join(' ')
    const rowTemplate = Array(rowCount).fill(rowSizing).join(' ')

    const lines = [
      'display: grid;',
      `grid-template-columns: ${colTemplate};`,
      `grid-template-rows: ${rowTemplate};`,
    ]
    if (g > 0) lines.push(`gap: ${g}px;`)
    if (justifyItems !== 'stretch') lines.push(`justify-items: ${justifyItems};`)
    if (alignItems !== 'stretch') lines.push(`align-items: ${alignItems};`)

    return lines.join('\n')
  }, [colCount, rowCount, gap, columnSizing, rowSizing, justifyItems, alignItems])

  const copy = async () => {
    await navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const SIZING_OPTIONS = [
    { value: '1fr', label: '1fr' },
    { value: 'auto', label: 'auto' },
    { value: '100px', label: '100px' },
    { value: '150px', label: '150px' },
    { value: '200px', label: '200px' },
    { value: 'minmax(100px, 1fr)', label: 'minmax(100px, 1fr)' },
  ]

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div>
        <label className="text-sm font-medium mb-2 block">{t('preview')}</label>
        <div
          className="rounded-lg border bg-muted/30 p-4 min-h-[200px]"
          style={{
            display: 'grid',
            gridTemplateColumns: Array(colCount).fill(columnSizing).join(' '),
            gridTemplateRows: Array(rowCount).fill(rowSizing).join(' '),
            gap: `${parseInt(gap) || 0}px`,
            justifyItems: justifyItems as React.CSSProperties['justifyItems'],
            alignItems: alignItems as React.CSSProperties['alignItems'],
          }}
        >
          {Array.from({ length: cellCount }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-sm font-bold min-h-[48px] p-2"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <ToolInput
          label={t('gridColumns')}
          type="number"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          min="1"
          max="12"
        />
        <ToolInput
          label={t('gridRows')}
          type="number"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          min="1"
          max="12"
        />
        <ToolInput
          label={t('gapPx')}
          type="number"
          value={gap}
          onChange={(e) => setGap(e.target.value)}
          min="0"
          max="100"
        />
        <ToolSelect
          label={t('columnSize')}
          value={columnSizing}
          onChange={(e) => setColumnSizing(e.target.value)}
          options={SIZING_OPTIONS}
        />
        <ToolSelect
          label={t('rowSize')}
          value={rowSizing}
          onChange={(e) => setRowSizing(e.target.value)}
          options={SIZING_OPTIONS}
        />
        <ToolSelect
          label="justify-items"
          value={justifyItems}
          onChange={(e) => setJustifyItems(e.target.value)}
          options={JUSTIFY_ITEMS.map((v) => ({ value: v, label: v }))}
        />
        <ToolSelect
          label="align-items"
          value={alignItems}
          onChange={(e) => setAlignItems(e.target.value)}
          options={ALIGN_ITEMS.map((v) => ({ value: v, label: v }))}
        />
      </div>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">{tc('cssOutput')}</label>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? tc('copied') : tc('copy')}
          </button>
        </div>
        <pre className="rounded-lg border bg-muted/50 px-4 py-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
          {cssCode}
        </pre>
      </div>
    </div>
  )
}
