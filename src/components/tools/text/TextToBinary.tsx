'use client'

import { useState } from 'react'

type ConvertMode = 'binary' | 'hex' | 'octal'

function textToBinary(text: string): string {
  return Array.from(text)
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ')
}

function binaryToText(binary: string): string {
  return binary
    .trim()
    .split(/\s+/)
    .map((b) => {
      const num = parseInt(b, 2)
      if (isNaN(num)) throw new Error(`Invalid binary: ${b}`)
      return String.fromCharCode(num)
    })
    .join('')
}

function textToHex(text: string): string {
  return Array.from(text)
    .map((ch) => ch.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ')
}

function hexToText(hex: string): string {
  return hex
    .trim()
    .split(/\s+/)
    .map((h) => {
      const num = parseInt(h, 16)
      if (isNaN(num)) throw new Error(`Invalid hex: ${h}`)
      return String.fromCharCode(num)
    })
    .join('')
}

function textToOctal(text: string): string {
  return Array.from(text)
    .map((ch) => ch.charCodeAt(0).toString(8).padStart(3, '0'))
    .join(' ')
}

function octalToText(octal: string): string {
  return octal
    .trim()
    .split(/\s+/)
    .map((o) => {
      const num = parseInt(o, 8)
      if (isNaN(num)) throw new Error(`Invalid octal: ${o}`)
      return String.fromCharCode(num)
    })
    .join('')
}

export default function TextToBinary() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<ConvertMode>('binary')
  const [direction, setDirection] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) {
      setError('Please enter text to convert')
      setOutput('')
      return
    }
    setError('')
    try {
      let result = ''
      if (direction === 'encode') {
        switch (mode) {
          case 'binary':
            result = textToBinary(input)
            break
          case 'hex':
            result = textToHex(input)
            break
          case 'octal':
            result = textToOctal(input)
            break
        }
      } else {
        switch (mode) {
          case 'binary':
            result = binaryToText(input)
            break
          case 'hex':
            result = hexToText(input)
            break
          case 'octal':
            result = octalToText(input)
            break
        }
      }
      setOutput(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed')
      setOutput('')
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setError('')
    setDirection((d) => (d === 'encode' ? 'decode' : 'encode'))
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const modeLabels: Record<ConvertMode, string> = {
    binary: 'Binary',
    hex: 'Hexadecimal',
    octal: 'Octal',
  }

  return (
    <div className="space-y-4">
      {/* Mode & Direction */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Format</label>
          <div className="flex gap-2">
            {(['binary', 'hex', 'octal'] as ConvertMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                  mode === m
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent'
                }`}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Direction</label>
          <div className="flex gap-2">
            <button
              onClick={() => setDirection('encode')}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                direction === 'encode'
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              Text to {modeLabels[mode]}
            </button>
            <button
              onClick={() => setDirection('decode')}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                direction === 'decode'
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {modeLabels[mode]} to Text
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {direction === 'encode' ? 'Text Input' : `${modeLabels[mode]} Input`}
          </label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[180px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={
              direction === 'encode'
                ? 'Enter text to convert...'
                : `Enter ${mode} values separated by spaces...`
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Conversion input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Output</label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[180px] focus:outline-none"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            aria-label="Conversion output"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convert}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Convert
        </button>
        {output && (
          <button
            onClick={swap}
            className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Swap
          </button>
        )}
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
