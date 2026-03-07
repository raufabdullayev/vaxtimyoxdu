'use client'

import { useState } from 'react'

async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

const algorithms = [
  { value: 'SHA-1', label: 'SHA-1' },
  { value: 'SHA-256', label: 'SHA-256' },
  { value: 'SHA-384', label: 'SHA-384' },
  { value: 'SHA-512', label: 'SHA-512' },
]

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!input) return
    setLoading(true)
    const hashes: Record<string, string> = {}
    for (const algo of algorithms) {
      hashes[algo.value] = await hashText(input, algo.value)
    }
    setResults(hashes)
    setLoading(false)
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Input Text</label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <button
        onClick={generate}
        disabled={!input || loading}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Hashes'}
      </button>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          {algorithms.map((algo) => (
            <div key={algo.value}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">{algo.label}</label>
                <button
                  onClick={() => copy(results[algo.value])}
                  className="text-xs text-primary hover:underline"
                >
                  Copy
                </button>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3 text-sm font-mono break-all">
                {results[algo.value]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
