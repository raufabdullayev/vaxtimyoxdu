'use client'

import { useState } from 'react'
import { ToolTextarea, ToolAlert } from '@/components/ui'

const NAMED_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '\u00A0': '&nbsp;',
  '\u00A9': '&copy;',
  '\u00AE': '&reg;',
  '\u2122': '&trade;',
  '\u20AC': '&euro;',
  '\u00A3': '&pound;',
  '\u00A5': '&yen;',
  '\u00A2': '&cent;',
  '\u2013': '&ndash;',
  '\u2014': '&mdash;',
  '\u2018': '&lsquo;',
  '\u2019': '&rsquo;',
  '\u201C': '&ldquo;',
  '\u201D': '&rdquo;',
  '\u2026': '&hellip;',
  '\u00B7': '&middot;',
  '\u2022': '&bull;',
  '\u00D7': '&times;',
  '\u00F7': '&divide;',
  '\u00B0': '&deg;',
  '\u00B1': '&plusmn;',
  '\u00BC': '&frac14;',
  '\u00BD': '&frac12;',
  '\u00BE': '&frac34;',
}

const REVERSE_ENTITIES: Record<string, string> = {}
for (const [char, entity] of Object.entries(NAMED_ENTITIES)) {
  REVERSE_ENTITIES[entity] = char
}

function encodeHtmlEntities(text: string): string {
  let result = ''
  for (const char of text) {
    if (NAMED_ENTITIES[char]) {
      result += NAMED_ENTITIES[char]
    } else {
      const code = char.codePointAt(0)!
      if (code > 127) {
        result += `&#${code};`
      } else {
        result += char
      }
    }
  }
  return result
}

function decodeHtmlEntities(text: string): string {
  let result = text

  // Decode named entities
  result = result.replace(/&[a-zA-Z]+;/g, (match) => {
    return REVERSE_ENTITIES[match] ?? match
  })

  // Decode decimal numeric entities (&#60;)
  result = result.replace(/&#(\d+);/g, (_, code) => {
    const num = parseInt(code, 10)
    try {
      return String.fromCodePoint(num)
    } catch {
      return `&#${code};`
    }
  })

  // Decode hex numeric entities (&#x3C;)
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    const num = parseInt(hex, 16)
    try {
      return String.fromCodePoint(num)
    } catch {
      return `&#x${hex};`
    }
  })

  return result
}

const REFERENCE_TABLE = [
  { char: '&', entity: '&amp;', description: 'Ampersand' },
  { char: '<', entity: '&lt;', description: 'Less than' },
  { char: '>', entity: '&gt;', description: 'Greater than' },
  { char: '"', entity: '&quot;', description: 'Double quote' },
  { char: "'", entity: '&#39;', description: 'Single quote' },
  { char: '\u00A0', entity: '&nbsp;', description: 'Non-breaking space' },
  { char: '\u00A9', entity: '&copy;', description: 'Copyright' },
  { char: '\u00AE', entity: '&reg;', description: 'Registered' },
  { char: '\u2122', entity: '&trade;', description: 'Trademark' },
  { char: '\u20AC', entity: '&euro;', description: 'Euro' },
  { char: '\u00A3', entity: '&pound;', description: 'Pound' },
  { char: '\u00A5', entity: '&yen;', description: 'Yen' },
  { char: '\u2013', entity: '&ndash;', description: 'En dash' },
  { char: '\u2014', entity: '&mdash;', description: 'Em dash' },
  { char: '\u2018', entity: '&lsquo;', description: 'Left single quote' },
  { char: '\u2019', entity: '&rsquo;', description: 'Right single quote' },
  { char: '\u201C', entity: '&ldquo;', description: 'Left double quote' },
  { char: '\u201D', entity: '&rdquo;', description: 'Right double quote' },
  { char: '\u2026', entity: '&hellip;', description: 'Ellipsis' },
  { char: '\u2022', entity: '&bull;', description: 'Bullet' },
  { char: '\u00D7', entity: '&times;', description: 'Multiplication' },
  { char: '\u00F7', entity: '&divide;', description: 'Division' },
  { char: '\u00B0', entity: '&deg;', description: 'Degree' },
  { char: '\u00B1', entity: '&plusmn;', description: 'Plus-minus' },
]

export default function HtmlEntityCodec() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    if (!input.trim()) {
      setError('Please enter text to encode')
      setOutput('')
      return
    }
    setError('')
    setOutput(encodeHtmlEntities(input))
  }

  const decode = () => {
    if (!input.trim()) {
      setError('Please enter text to decode')
      setOutput('')
      return
    }
    setError('')
    setOutput(decodeHtmlEntities(input))
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ToolTextarea
          label="Input"
          className="font-mono min-h-[200px]"
          placeholder="Enter text with special characters or HTML entities..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ToolTextarea
          label="Output"
          className="font-mono min-h-[200px] bg-muted/50"
          value={output}
          readOnly
          placeholder="Result will appear here..."
        />
      </div>

      {error && (
        <ToolAlert variant="error">{error}</ToolAlert>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={encode}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label="Encode to HTML entities"
        >
          Encode
        </button>
        <button
          onClick={decode}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label="Decode HTML entities"
        >
          Decode
        </button>
        {output && (
          <button
            onClick={swap}
            className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
            aria-label="Swap output to input"
          >
            Swap
          </button>
        )}
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear all fields"
        >
          Clear
        </button>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Common HTML Entities Reference</h3>
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left px-3 py-2 font-medium">Character</th>
                  <th className="text-left px-3 py-2 font-medium">Entity</th>
                  <th className="text-left px-3 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_TABLE.map((row) => (
                  <tr key={row.entity} className="border-b border-border/50 last:border-b-0">
                    <td className="px-3 py-1.5 font-mono text-primary">{row.char}</td>
                    <td className="px-3 py-1.5 font-mono text-muted-foreground">{row.entity}</td>
                    <td className="px-3 py-1.5 text-muted-foreground">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
