'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function WhitespaceRemover() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [options, setOptions] = useState({
    trimLines: true,
    removeBlankLines: true,
    collapseSpaces: true,
    removeLeadingSpaces: false,
    removeTrailingSpaces: true,
    removeAllSpaces: false,
    removeTabs: false,
    removeNewlines: false,
  })
  const [copied, setCopied] = useState(false)

  const processText = (text: string): string => {
    let result = text
    if (options.removeAllSpaces) {
      result = result.replace(/\s/g, '')
    } else {
      if (options.collapseSpaces) result = result.replace(/ {2,}/g, ' ')
      if (options.trimLines) result = result.split('\n').map((l) => l.trim()).join('\n')
      if (options.removeLeadingSpaces) result = result.split('\n').map((l) => l.replace(/^\s+/, '')).join('\n')
      if (options.removeTrailingSpaces) result = result.split('\n').map((l) => l.replace(/\s+$/, '')).join('\n')
      if (options.removeBlankLines) result = result.split('\n').filter((l) => l.trim()).join('\n')
      if (options.removeTabs) result = result.replace(/\t/g, ' ')
      if (options.removeNewlines) result = result.replace(/\n+/g, ' ')
    }
    return result
  }

  const output = processText(input)
  const saved = input.length - output.length

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const optionList = [
    { key: 'trimLines', label: 'Trim each line' },
    { key: 'removeBlankLines', label: 'Remove blank lines' },
    { key: 'collapseSpaces', label: 'Collapse multiple spaces' },
    { key: 'removeLeadingSpaces', label: 'Remove leading spaces' },
    { key: 'removeTrailingSpaces', label: 'Remove trailing spaces' },
    { key: 'removeTabs', label: 'Replace tabs with spaces' },
    { key: 'removeNewlines', label: 'Remove line breaks' },
    { key: 'removeAllSpaces', label: 'Remove ALL whitespace' },
  ] as const

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('input')}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text with extra whitespace..."
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[160px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Options</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {optionList.map((opt) => (
            <label key={opt.key} className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={options[opt.key]}
                onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
                className="rounded"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {input && (
        <div className="flex gap-3 text-sm">
          <span className="text-muted-foreground">Input: {input.length} chars</span>
          <span className="text-muted-foreground">Output: {output.length} chars</span>
          {saved > 0 && <span className="text-green-600 dark:text-green-400">Saved: {saved} chars</span>}
        </div>
      )}

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">{t('output')}</span>
          <button onClick={copy} className="text-xs text-primary hover:underline" disabled={!output}>
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="p-3 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-auto">{output || 'Output will appear here...'}</pre>
      </div>
    </div>
  )
}
