'use client'

import { useState } from 'react'

export default function Base64Codec() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  const process = () => {
    if (!input.trim()) {
      setError('Please enter text')
      setOutput('')
      return
    }
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
    } catch {
      setError(mode === 'encode' ? 'Failed to encode' : 'Invalid Base64 string')
      setOutput('')
    }
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setError('')
  }

  const copy = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setMode('encode'); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'encode' ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode('decode'); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'decode' ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
          }`}
        >
          Decode
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        </label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={mode === 'encode' ? 'Enter text...' : 'Enter Base64 string...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          onClick={process}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        {output && (
          <button
            onClick={swap}
            className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Swap
          </button>
        )}
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Result</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">Copy</button>
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[150px] focus:outline-none"
            value={output}
            readOnly
          />
        </div>
      )}
    </div>
  )
}
