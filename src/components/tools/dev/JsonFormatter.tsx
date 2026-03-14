'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function JsonFormatter() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    if (!input.trim()) {
      setError(t('pleaseEnterJson'))
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : t('invalidJson'))
      setOutput('')
    }
  }

  const minify = () => {
    if (!input.trim()) {
      setError(t('pleaseEnterJson'))
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : t('invalidJson'))
      setOutput('')
    }
  }

  const copy = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  const sample = () => {
    const sampleJson = {
      name: 'ToolBox AI',
      version: '1.0.0',
      tools: ['QR Generator', 'JSON Formatter', 'Word Counter'],
      settings: { theme: 'dark', language: 'en' },
    }
    setInput(JSON.stringify(sampleJson))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <label className="text-sm font-medium mr-2">{t('indent')}:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-lg border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={2}>{t('spaces', { count: 2 })}</option>
            <option value={4}>{t('spaces', { count: 4 })}</option>
            <option value={1}>{t('tab')}</option>
          </select>
        </div>
        <button
          onClick={sample}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-accent transition-colors"
        >
          {t('loadSample')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('input')}</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('pasteJsonHere')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">{t('output')}</label>
            {output && (
              <button onClick={copy} className="text-xs text-primary hover:underline">
                {t('copy')}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none"
            value={output}
            readOnly
            placeholder={t('formattedJsonHere')}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {t('error')}: {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={format}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {t('formatBeautify')}
        </button>
        <button
          onClick={minify}
          className="px-6 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          {t('minify')}
        </button>
      </div>
    </div>
  )
}
