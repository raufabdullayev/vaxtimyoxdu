'use client'

import { useState, useMemo } from 'react'

function caesarCipher(text: string, shift: number): string {
  const normalizedShift = ((shift % 26) + 26) % 26
  return text
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0)
      // Uppercase A-Z
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65)
      }
      // Lowercase a-z
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97)
      }
      return ch
    })
    .join('')
}

export default function Rot13Encoder() {
  const [input, setInput] = useState('')
  const [shift, setShift] = useState(13)
  const [copied, setCopied] = useState(false)

  const encoded = useMemo(() => {
    if (!input) return ''
    return caesarCipher(input, shift)
  }, [input, shift])

  const decoded = useMemo(() => {
    if (!input) return ''
    return caesarCipher(input, -shift)
  }, [input, shift])

  const copy = async (text: string) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const quickShifts = [1, 3, 5, 7, 10, 13, 19, 25]

  return (
    <div className="space-y-4">
      {/* Shift control */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Shift: {shift} {shift === 13 ? '(ROT13)' : ''}
        </label>
        <input
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full accent-primary"
          aria-label={`Caesar cipher shift: ${shift}`}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1</span>
          <span>25</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {quickShifts.map((s) => (
            <button
              key={s}
              onClick={() => setShift(s)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                shift === s
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {s === 13 ? 'ROT13' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium mb-1">Input Text</label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[140px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter text to encode or decode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Text input"
        />
      </div>

      {/* Encoded output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">
            Encoded (shift +{shift})
          </label>
          {encoded && (
            <button
              onClick={() => copy(encoded)}
              className="text-xs text-primary hover:underline"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <textarea
          className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm min-h-[100px] focus:outline-none"
          value={encoded}
          readOnly
          placeholder="Encoded result..."
          aria-label="Encoded output"
        />
      </div>

      {/* Decoded output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">
            Decoded (shift -{shift})
          </label>
          {decoded && (
            <button
              onClick={() => copy(decoded)}
              className="text-xs text-primary hover:underline"
            >
              Copy
            </button>
          )}
        </div>
        <textarea
          className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm min-h-[100px] focus:outline-none"
          value={decoded}
          readOnly
          placeholder="Decoded result..."
          aria-label="Decoded output"
        />
      </div>

      {/* Info */}
      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">About Caesar Cipher / ROT13</p>
        <p>
          ROT13 is a special case of the Caesar cipher with a shift of 13.
          Since the English alphabet has 26 letters, applying ROT13 twice
          returns the original text. Only letters are shifted; numbers,
          spaces, and symbols remain unchanged.
        </p>
      </div>

      {input.trim() && (
        <button
          onClick={() => setInput('')}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  )
}
