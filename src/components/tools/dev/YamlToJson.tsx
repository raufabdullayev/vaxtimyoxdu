'use client'

import { useState } from 'react'

function parseYamlValue(value: string): unknown {
  const trimmed = value.trim()
  if (trimmed === '' || trimmed === 'null' || trimmed === '~') return null
  if (trimmed === 'true' || trimmed === 'yes') return true
  if (trimmed === 'false' || trimmed === 'no') return false
  if (trimmed === '[]') return []
  if (trimmed === '{}') return {}

  // Quoted string
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed
      .slice(1, -1)
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
  }

  // Number
  if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(trimmed)) {
    return Number(trimmed)
  }
  if (/^0x[0-9a-fA-F]+$/.test(trimmed)) {
    return parseInt(trimmed, 16)
  }
  if (/^0o[0-7]+$/.test(trimmed)) {
    return parseInt(trimmed.slice(2), 8)
  }

  // Inline array [a, b, c]
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return []
    return inner.split(',').map((item) => parseYamlValue(item.trim()))
  }

  // Inline object {a: 1, b: 2}
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return {}
    const obj: Record<string, unknown> = {}
    const parts = inner.split(',')
    for (const part of parts) {
      const colonIdx = part.indexOf(':')
      if (colonIdx === -1) continue
      const key = part.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '')
      const val = part.slice(colonIdx + 1).trim()
      obj[key] = parseYamlValue(val)
    }
    return obj
  }

  return trimmed
}

interface YamlLine {
  indent: number
  key: string | null
  value: string
  isArrayItem: boolean
  lineNumber: number
}

function parseYamlLines(yaml: string): YamlLine[] {
  const lines = yaml.split('\n')
  const result: YamlLine[] = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue

    const indentMatch = raw.match(/^(\s*)/)
    const indent = indentMatch ? indentMatch[1].length : 0
    let content = raw.trim()

    // Remove inline comments (not inside quotes)
    const commentIdx = content.indexOf(' #')
    if (commentIdx > 0) {
      const before = content.slice(0, commentIdx)
      const quoteCount = (before.match(/"/g) || []).length + (before.match(/'/g) || []).length
      if (quoteCount % 2 === 0) {
        content = before.trimEnd()
      }
    }

    const isArrayItem = content.startsWith('- ')
    if (isArrayItem) {
      content = content.slice(2)
    } else if (content === '-') {
      result.push({ indent, key: null, value: '', isArrayItem: true, lineNumber: i + 1 })
      continue
    }

    const colonIdx = content.indexOf(':')
    if (colonIdx > 0 && !content.startsWith('"') && !content.startsWith("'")) {
      const key = content.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '')
      const value = content.slice(colonIdx + 1).trim()
      result.push({ indent, key, value, isArrayItem, lineNumber: i + 1 })
    } else {
      result.push({ indent, key: null, value: content, isArrayItem, lineNumber: i + 1 })
    }
  }

  return result
}

function yamlToJson(yaml: string): unknown {
  const trimmed = yaml.trim()
  if (!trimmed) throw new Error('Empty YAML input')

  const lines = parseYamlLines(trimmed)
  if (lines.length === 0) throw new Error('No valid YAML content found')

  function parseBlock(
    startIdx: number,
    parentIndent: number
  ): { value: unknown; nextIdx: number } {
    if (startIdx >= lines.length) return { value: null, nextIdx: startIdx }

    const line = lines[startIdx]

    // Array
    if (line.isArrayItem) {
      const arr: unknown[] = []
      let idx = startIdx
      while (idx < lines.length && lines[idx].indent >= parentIndent) {
        const current = lines[idx]
        if (current.indent < parentIndent) break
        if (current.indent === parentIndent && !current.isArrayItem) break
        if (current.indent > parentIndent) {
          idx++
          continue
        }

        if (current.isArrayItem) {
          if (current.key !== null) {
            const obj: Record<string, unknown> = {}
            if (current.value) {
              obj[current.key] = parseYamlValue(current.value)
            } else {
              const sub = parseBlock(idx + 1, current.indent + 2)
              obj[current.key] = sub.value
              let nextIdx = sub.nextIdx
              while (
                nextIdx < lines.length &&
                !lines[nextIdx].isArrayItem &&
                lines[nextIdx].indent > parentIndent
              ) {
                const nextLine = lines[nextIdx]
                if (nextLine.key !== null) {
                  if (nextLine.value) {
                    obj[nextLine.key] = parseYamlValue(nextLine.value)
                    nextIdx++
                  } else {
                    const innerSub = parseBlock(nextIdx + 1, nextLine.indent + 2)
                    obj[nextLine.key] = innerSub.value
                    nextIdx = innerSub.nextIdx
                  }
                } else {
                  nextIdx++
                }
              }
              arr.push(obj)
              idx = nextIdx
              continue
            }
            arr.push(obj)
          } else {
            arr.push(parseYamlValue(current.value))
          }
          idx++
        } else {
          idx++
        }
      }
      return { value: arr, nextIdx: idx }
    }

    // Object
    const obj: Record<string, unknown> = {}
    let idx = startIdx
    while (idx < lines.length) {
      const current = lines[idx]
      if (current.indent < parentIndent) break
      if (current.indent > parentIndent) {
        idx++
        continue
      }

      if (current.key !== null) {
        if (current.value) {
          obj[current.key] = parseYamlValue(current.value)
          idx++
        } else {
          const sub = parseBlock(idx + 1, current.indent + 2)
          obj[current.key] = sub.value
          idx = sub.nextIdx
        }
      } else {
        idx++
      }
    }
    return { value: obj, nextIdx: idx }
  }

  const { value } = parseBlock(0, lines[0].indent)
  return value
}

function validateYaml(yaml: string): string[] {
  const errors: string[] = []
  const lines = yaml.split('\n')
  let prevIndent = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '' || line.trim().startsWith('#')) continue

    const indentMatch = line.match(/^(\s*)/)
    const indent = indentMatch ? indentMatch[1].length : 0

    // Check for tab characters
    if (line.includes('\t')) {
      errors.push(`Line ${i + 1}: Tab characters are not allowed in YAML, use spaces`)
    }

    // Check for odd indent jumps (more than typical 2-space increase)
    if (indent > prevIndent + 4 && indent !== prevIndent) {
      errors.push(`Line ${i + 1}: Unexpected indentation jump (${prevIndent} -> ${indent})`)
    }

    prevIndent = indent
  }

  return errors
}

export default function YamlToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [warnings, setWarnings] = useState<string[]>([])
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) {
      setError('Please enter YAML content to convert')
      setOutput('')
      setWarnings([])
      return
    }

    const validationWarnings = validateYaml(input)
    setWarnings(validationWarnings)

    try {
      const parsed = yamlToJson(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid YAML')
      setOutput('')
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    setInput(`# Server configuration
server:
  host: localhost
  port: 8080
  ssl: true
  cors:
    origins:
      - "https://example.com"
      - "https://api.example.com"
    methods: [GET, POST, PUT, DELETE]

database:
  name: myapp
  port: 5432
  credentials:
    username: admin
    password: "s3cret"
  replicas:
    - host: db1.example.com
      port: 5432
      role: primary
    - host: db2.example.com
      port: 5432
      role: secondary

features:
  - auth
  - logging
  - cache

settings:
  debug: false
  max_connections: 100
  timeout: 30.5
  description: "A sample YAML configuration"`)
    setOutput('')
    setError('')
    setWarnings([])
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
    setWarnings([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <label className="text-sm font-medium mr-2">JSON Indent:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-lg border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="JSON indentation"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </div>
        <button
          onClick={loadSample}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-accent transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">YAML Input</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[350px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste your YAML here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="YAML input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">JSON Output</label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label="Copy JSON output"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[350px] focus:outline-none"
            value={output}
            readOnly
            placeholder="JSON output will appear here..."
            aria-label="JSON output"
          />
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-sm space-y-1">
          <p className="font-medium">Warnings:</p>
          {warnings.map((w, i) => (
            <p key={i}>{w}</p>
          ))}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          Error: {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={convert}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Convert to JSON
        </button>
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">About YAML to JSON</p>
        <p>
          YAML (YAML Ain&apos;t Markup Language) is a human-readable data serialization format
          commonly used for configuration files. This tool parses YAML and converts it to
          JSON format. It supports basic types (strings, numbers, booleans, null), nested
          objects, arrays, inline collections, comments, and quoted strings.
        </p>
      </div>
    </div>
  )
}
