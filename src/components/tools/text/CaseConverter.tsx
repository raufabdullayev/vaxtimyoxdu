'use client'

import { useState, useMemo } from 'react'
import { ToolTextarea, ToolRadioGroup } from '@/components/ui'

type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant'
  | 'dot'

function splitIntoWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[_\-\.]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function toTitleCase(text: string): string {
  return text.replace(
    /\b\w+/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
}

function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, prefix, char) => prefix + char.toUpperCase())
}

function toCamelCase(text: string): string {
  const words = splitIntoWords(text)
  if (words.length === 0) return ''
  return words
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join('')
}

function toPascalCase(text: string): string {
  const words = splitIntoWords(text)
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
}

function toSnakeCase(text: string): string {
  return splitIntoWords(text)
    .map((w) => w.toLowerCase())
    .join('_')
}

function toKebabCase(text: string): string {
  return splitIntoWords(text)
    .map((w) => w.toLowerCase())
    .join('-')
}

function toConstantCase(text: string): string {
  return splitIntoWords(text)
    .map((w) => w.toUpperCase())
    .join('_')
}

function toDotCase(text: string): string {
  return splitIntoWords(text)
    .map((w) => w.toLowerCase())
    .join('.')
}

function convert(text: string, caseType: CaseType): string {
  if (!text) return ''
  switch (caseType) {
    case 'upper':
      return text.toUpperCase()
    case 'lower':
      return text.toLowerCase()
    case 'title':
      return toTitleCase(text)
    case 'sentence':
      return toSentenceCase(text)
    case 'camel':
      return toCamelCase(text)
    case 'pascal':
      return toPascalCase(text)
    case 'snake':
      return toSnakeCase(text)
    case 'kebab':
      return toKebabCase(text)
    case 'constant':
      return toConstantCase(text)
    case 'dot':
      return toDotCase(text)
  }
}

const caseOptions: { type: CaseType; label: string }[] = [
  { type: 'upper', label: 'UPPERCASE' },
  { type: 'lower', label: 'lowercase' },
  { type: 'title', label: 'Title Case' },
  { type: 'sentence', label: 'Sentence case' },
  { type: 'camel', label: 'camelCase' },
  { type: 'pascal', label: 'PascalCase' },
  { type: 'snake', label: 'snake_case' },
  { type: 'kebab', label: 'kebab-case' },
  { type: 'constant', label: 'CONSTANT_CASE' },
  { type: 'dot', label: 'dot.case' },
]

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [selectedCase, setSelectedCase] = useState<CaseType>('upper')
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => convert(input, selectedCase), [input, selectedCase])

  const stats = useMemo(() => {
    const chars = input.length
    const words = input.trim() ? input.trim().split(/\s+/).length : 0
    return { chars, words }
  }, [input])

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.chars}</div>
          <div className="text-xs text-muted-foreground mt-1">Characters</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{stats.words}</div>
          <div className="text-xs text-muted-foreground mt-1">Words</div>
        </div>
      </div>

      <ToolTextarea
        label="Input Text"
        className="min-h-[160px]"
        placeholder="Enter or paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ToolRadioGroup
        label="Conversion Type"
        options={caseOptions.map((opt) => ({ value: opt.type, label: opt.label }))}
        value={selectedCase}
        onChange={(val) => setSelectedCase(val as CaseType)}
      />

      <ToolTextarea
        label="Output"
        className="min-h-[160px] bg-muted/50"
        value={output}
        readOnly
        placeholder="Converted text will appear here..."
      />

      {input.trim() && (
        <button
          onClick={() => setInput('')}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          aria-label="Clear all fields"
        >
          Clear
        </button>
      )}
    </div>
  )
}
