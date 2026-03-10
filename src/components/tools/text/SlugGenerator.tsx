'use client'

import { useState, useMemo } from 'react'

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'it', 'as', 'are', 'was', 'were',
  'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall',
  'not', 'no', 'nor', 'so', 'if', 'then', 'than', 'too', 'very',
  'just', 'about', 'above', 'after', 'again', 'all', 'also', 'any',
  'because', 'before', 'between', 'both', 'each', 'few', 'into',
  'more', 'most', 'other', 'out', 'over', 'such', 'that', 'these',
  'this', 'those', 'through', 'under', 'until', 'up', 'which', 'while',
])

const ACCENT_MAP: Record<string, string> = {
  'a': 'aàáâãäåæ', 'c': 'cçč', 'd': 'dð', 'e': 'eèéêëě',
  'g': 'gğ', 'i': 'iìíîïı', 'n': 'nñň', 'o': 'oòóôõöøő',
  'r': 'rř', 's': 'sšş', 't': 'tť', 'u': 'uùúûüůű', 'y': 'yýÿ', 'z': 'zžź',
  'ss': 'ß', 'ae': 'æ', 'oe': 'œ',
}

function removeAccents(text: string): string {
  let result = text
  for (const [replacement, chars] of Object.entries(ACCENT_MAP)) {
    for (const char of chars) {
      if (char === replacement) continue
      result = result.replace(new RegExp(char, 'g'), replacement)
      result = result.replace(new RegExp(char.toUpperCase(), 'g'), replacement.toUpperCase())
    }
  }
  return result
}

interface SlugOptions {
  separator: '-' | '_'
  lowercase: boolean
  maxLength: number
  removeStopWords: boolean
}

function generateSlug(text: string, options: SlugOptions): string {
  if (!text.trim()) return ''

  let slug = removeAccents(text)

  slug = slug.replace(/[^\w\s-]/g, '')

  if (options.removeStopWords) {
    const words = slug.split(/\s+/)
    const filtered = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()))
    slug = filtered.length > 0 ? filtered.join(' ') : words.join(' ')
  }

  slug = slug.trim().replace(/[\s_-]+/g, options.separator)

  if (options.lowercase) {
    slug = slug.toLowerCase()
  }

  if (options.maxLength > 0 && slug.length > options.maxLength) {
    slug = slug.substring(0, options.maxLength)
    const lastSep = slug.lastIndexOf(options.separator)
    if (lastSep > 0) {
      slug = slug.substring(0, lastSep)
    }
  }

  slug = slug.replace(new RegExp(`^[${options.separator}]+|[${options.separator}]+$`, 'g'), '')

  return slug
}

export default function SlugGenerator() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [options, setOptions] = useState<SlugOptions>({
    separator: '-',
    lowercase: true,
    maxLength: 0,
    removeStopWords: false,
  })

  const slug = useMemo(() => generateSlug(input, options), [input, options])

  const variants = useMemo(() => {
    if (!input.trim()) return []
    const results: { label: string; value: string }[] = []

    const hyphenSlug = generateSlug(input, { ...options, separator: '-' })
    const underscoreSlug = generateSlug(input, { ...options, separator: '_' })
    const withStopWords = generateSlug(input, { ...options, removeStopWords: false })
    const withoutStopWords = generateSlug(input, { ...options, removeStopWords: true })

    results.push({ label: 'Hyphenated', value: hyphenSlug })
    if (underscoreSlug !== hyphenSlug) {
      results.push({ label: 'Underscored', value: underscoreSlug })
    }
    if (withoutStopWords !== withStopWords && !options.removeStopWords) {
      results.push({ label: 'Without stop words', value: withoutStopWords })
    }
    if (options.removeStopWords && withStopWords !== withoutStopWords) {
      results.push({ label: 'With stop words', value: withStopWords })
    }

    return results.filter((v, i, arr) => arr.findIndex((x) => x.value === v.value) === i)
  }, [input, options])

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Input Text</label>
        <input
          type="text"
          className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter a title, heading, or any text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Text input for slug generation"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="text-sm font-medium mr-2">Separator</label>
          <select
            value={options.separator}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, separator: e.target.value as '-' | '_' }))
            }
            className="w-full rounded-lg border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            aria-label="Separator type"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Max Length</label>
          <input
            type="number"
            min={0}
            max={500}
            value={options.maxLength || ''}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                maxLength: parseInt(e.target.value) || 0,
              }))
            }
            className="w-full rounded-lg border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary mt-1"
            placeholder="0 = no limit"
            aria-label="Maximum slug length"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) => setOptions((prev) => ({ ...prev, lowercase: e.target.checked }))}
              className="rounded border-gray-300 text-primary focus:ring-primary"
              aria-label="Convert to lowercase"
            />
            <span className="font-medium">Lowercase</span>
          </label>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={options.removeStopWords}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, removeStopWords: e.target.checked }))
              }
              className="rounded border-gray-300 text-primary focus:ring-primary"
              aria-label="Remove stop words"
            />
            <span className="font-medium">Remove stop words</span>
          </label>
        </div>
      </div>

      {slug && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Generated Slug</label>
            <button
              onClick={() => copy(slug)}
              className="text-xs text-primary hover:underline"
              aria-label="Copy slug to clipboard"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div
            className="font-mono text-lg text-primary bg-background rounded-lg px-3 py-2 border select-all break-all"
            aria-label="Generated slug"
          >
            {slug}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {slug.length} characters
          </div>
        </div>
      )}

      {variants.length > 1 && (
        <div>
          <label className="block text-sm font-medium mb-2">Other Variants</label>
          <div className="space-y-2">
            {variants
              .filter((v) => v.value !== slug)
              .map((variant) => (
                <div
                  key={variant.label}
                  className="flex items-center justify-between rounded-lg border bg-background px-3 py-2"
                >
                  <div>
                    <span className="text-xs text-muted-foreground mr-2">{variant.label}:</span>
                    <span className="font-mono text-sm break-all">{variant.value}</span>
                  </div>
                  <button
                    onClick={() => copy(variant.value)}
                    className="text-xs text-primary hover:underline ml-3 shrink-0"
                    aria-label={`Copy ${variant.label} variant`}
                  >
                    Copy
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {input.trim() && (
        <button
          onClick={() => setInput('')}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear input"
        >
          Clear
        </button>
      )}
    </div>
  )
}
