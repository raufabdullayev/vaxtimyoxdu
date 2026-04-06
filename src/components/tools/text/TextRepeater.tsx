'use client'

import { useState, useMemo } from 'react'

export default function TextRepeater() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(5)
  const [separator, setSeparator] = useState('newline')
  const [customSeparator, setCustomSeparator] = useState(', ')
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const [addNumbering, setAddNumbering] = useState(false)
  const [numberPosition, setNumberPosition] = useState<'before' | 'after'>('before')
  const [numberFormat, setNumberFormat] = useState<'dot' | 'paren' | 'bracket' | 'plain'>('dot')
  const [startNumber, setStartNumber] = useState(1)
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => {
    if (!text) return ''
    const safeCount = Math.max(1, Math.min(10000, count))
    const separatorMap: Record<string, string> = {
      newline: '\n',
      space: ' ',
      comma: ', ',
      semicolon: '; ',
      tab: '\t',
      pipe: ' | ',
      custom: customSeparator,
    }
    const sep = separatorMap[separator] ?? '\n'

    const lines: string[] = []
    for (let i = 0; i < safeCount; i++) {
      let line = text

      if (addNumbering) {
        const num = startNumber + i
        let numStr = ''
        switch (numberFormat) {
          case 'dot':
            numStr = `${num}. `
            break
          case 'paren':
            numStr = `${num}) `
            break
          case 'bracket':
            numStr = `[${num}] `
            break
          case 'plain':
            numStr = `${num} `
            break
        }
        if (numberPosition === 'before') {
          line = numStr + line
        } else {
          line = line + ' ' + numStr.trim()
        }
      }

      if (prefix) line = prefix + line
      if (suffix) line = line + suffix

      lines.push(line)
    }

    return lines.join(sep)
  }, [text, count, separator, customSeparator, prefix, suffix, addNumbering, numberPosition, numberFormat, startNumber])

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setText('')
    setCount(5)
    setPrefix('')
    setSuffix('')
    setAddNumbering(false)
  }

  const separatorOptions = [
    { value: 'newline', label: 'New Line' },
    { value: 'space', label: 'Space' },
    { value: 'comma', label: 'Comma' },
    { value: 'semicolon', label: 'Semicolon' },
    { value: 'tab', label: 'Tab' },
    { value: 'pipe', label: 'Pipe (|)' },
    { value: 'custom', label: 'Custom' },
  ]

  const inputClass =
    'w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'

  return (
    <div className="space-y-4">
      {/* Text input */}
      <div>
        <label className="block text-sm font-medium mb-1">Text to Repeat</label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter text to repeat..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text to repeat"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Repeat count */}
        <div>
          <label className="block text-sm font-medium mb-1">Repeat Count</label>
          <input
            type="number"
            min={1}
            max={10000}
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, Math.min(10000, Number(e.target.value))))
            }
            className={inputClass}
            aria-label="Repeat count"
          />
        </div>

        {/* Separator */}
        <div>
          <label className="block text-sm font-medium mb-1">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className={inputClass}
            aria-label="Separator type"
          >
            {separatorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom separator */}
        {separator === 'custom' && (
          <div>
            <label className="block text-sm font-medium mb-1">Custom Separator</label>
            <input
              type="text"
              value={customSeparator}
              onChange={(e) => setCustomSeparator(e.target.value)}
              placeholder="Enter separator..."
              className={inputClass}
              aria-label="Custom separator"
            />
          </div>
        )}

        {/* Prefix */}
        <div>
          <label className="block text-sm font-medium mb-1">Prefix (optional)</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder='e.g., " or < or -'
            className={inputClass}
            aria-label="Prefix"
          />
        </div>

        {/* Suffix */}
        <div>
          <label className="block text-sm font-medium mb-1">Suffix (optional)</label>
          <input
            type="text"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            placeholder='e.g., " or > or ;'
            className={inputClass}
            aria-label="Suffix"
          />
        </div>
      </div>

      {/* Numbering */}
      <div className="rounded-lg border p-4 space-y-3">
        <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={addNumbering}
            onChange={(e) => setAddNumbering(e.target.checked)}
            className="rounded accent-primary"
          />
          Add Numbering
        </label>

        {addNumbering && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Position</label>
              <select
                value={numberPosition}
                onChange={(e) =>
                  setNumberPosition(e.target.value as 'before' | 'after')
                }
                className={inputClass}
                aria-label="Number position"
              >
                <option value="before">Before text</option>
                <option value="after">After text</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Format</label>
              <select
                value={numberFormat}
                onChange={(e) =>
                  setNumberFormat(
                    e.target.value as 'dot' | 'paren' | 'bracket' | 'plain'
                  )
                }
                className={inputClass}
                aria-label="Number format"
              >
                <option value="dot">1. (dot)</option>
                <option value="paren">1) (paren)</option>
                <option value="bracket">[1] (bracket)</option>
                <option value="plain">1 (plain)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Start At</label>
              <input
                type="number"
                value={startNumber}
                onChange={(e) => setStartNumber(Number(e.target.value))}
                className={inputClass}
                aria-label="Start number"
              />
            </div>
          </div>
        )}
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">
            Output
            {output && (
              <span className="text-xs text-muted-foreground ml-2">
                ({output.length} characters)
              </span>
            )}
          </label>
          {output && (
            <button
              onClick={copy}
              className="text-xs text-primary hover:underline"
              aria-label="Copy output"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <textarea
          className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[200px] focus:outline-none"
          value={output}
          readOnly
          placeholder="Output will appear here as you type..."
          aria-label="Repeated text output"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={copy}
          disabled={!output}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
