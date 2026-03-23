'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ToolTextarea, ToolSelect, ToolAlert } from '@/components/ui'

export default function JsonFormatter() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState('2')

  const format = () => {
    if (!input.trim()) {
      setError(t('pleaseEnterJson'))
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, Number(indent)))
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
        <ToolSelect
          label={`${t('indent')}:`}
          value={indent}
          onChange={(e) => setIndent(e.target.value)}
          options={[
            { value: '2', label: t('spaces', { count: 2 }) },
            { value: '4', label: t('spaces', { count: 4 }) },
            { value: '1', label: t('tab') },
          ]}
        />
        <button
          onClick={sample}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-accent transition-colors"
        >
          {t('loadSample')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ToolTextarea
          label={t('input')}
          className="font-mono min-h-[300px]"
          placeholder={t('pasteJsonHere')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ToolTextarea
          label={t('output')}
          className="font-mono min-h-[300px] bg-muted/50"
          value={output}
          readOnly
          placeholder={t('formattedJsonHere')}
        />
      </div>

      {error && (
        <ToolAlert variant="error">
          {t('error')}: {error}
        </ToolAlert>
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
