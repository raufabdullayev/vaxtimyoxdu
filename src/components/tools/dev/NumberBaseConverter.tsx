'use client'

import { useState, useMemo } from 'react'

const bases = [
  { value: 2, label: 'Binary', prefix: '0b', placeholder: '10110101' },
  { value: 8, label: 'Octal', prefix: '0o', placeholder: '265' },
  { value: 10, label: 'Decimal', prefix: '', placeholder: '181' },
  { value: 16, label: 'Hexadecimal', prefix: '0x', placeholder: 'B5' },
] as const

const validChars: Record<number, RegExp> = {
  2: /^[01]+$/,
  8: /^[0-7]+$/,
  10: /^[0-9]+$/,
  16: /^[0-9a-fA-F]+$/,
}

export default function NumberBaseConverter() {
  const [input, setInput] = useState('')
  const [inputBase, setInputBase] = useState(10)
  const [copied, setCopied] = useState('')

  const validationError = useMemo(() => {
    if (!input.trim()) return ''
    const clean = input.trim()
    if (!validChars[inputBase].test(clean)) {
      const baseLabel = bases.find((b) => b.value === inputBase)?.label || ''
      return `Invalid character for ${baseLabel}. Allowed: ${
        inputBase === 2 ? '0-1' : inputBase === 8 ? '0-7' : inputBase === 10 ? '0-9' : '0-9, A-F'
      }`
    }
    return ''
  }, [input, inputBase])

  const conversions = useMemo(() => {
    if (!input.trim() || validationError) return null
    try {
      const decimal = parseInt(input.trim(), inputBase)
      if (isNaN(decimal) || decimal < 0) return null
      return {
        2: decimal.toString(2),
        8: decimal.toString(8),
        10: decimal.toString(10),
        16: decimal.toString(16).toUpperCase(),
      }
    } catch {
      return null
    }
  }, [input, inputBase, validationError])

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const currentPlaceholder = bases.find((b) => b.value === inputBase)?.placeholder || ''

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input Number</label>
          <input
            type="text"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={currentPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Number input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Input Base</label>
          <select
            value={inputBase}
            onChange={(e) => {
              setInputBase(Number(e.target.value))
              setInput('')
            }}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Select input base"
          >
            {bases.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label} (Base {b.value})
              </option>
            ))}
          </select>
        </div>
      </div>

      {validationError && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{validationError}</div>
      )}

      {conversions && (
        <div className="space-y-3">
          <label className="text-sm font-medium block">Conversions</label>
          {bases.map((base) => (
            <div key={base.value} className="rounded-lg border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  {base.label}{' '}
                  <span className="text-muted-foreground">(Base {base.value})</span>
                  {base.value === inputBase && (
                    <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Input</span>
                  )}
                </span>
                <button
                  onClick={() => copy(conversions[base.value as keyof typeof conversions], base.label)}
                  className="text-xs text-primary hover:underline"
                  aria-label={`Copy ${base.label} result`}
                >
                  {copied === base.label ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="font-mono text-sm bg-muted/50 rounded px-3 py-2 break-all">
                {base.prefix && <span className="text-muted-foreground">{base.prefix}</span>}
                {conversions[base.value as keyof typeof conversions]}
              </div>
            </div>
          ))}
        </div>
      )}

      {!input.trim() && (
        <div className="text-sm text-muted-foreground">
          Enter a number above to see real-time conversions across all bases.
        </div>
      )}
    </div>
  )
}
