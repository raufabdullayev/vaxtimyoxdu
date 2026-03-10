'use client'

import { useState } from 'react'

type Direction = 'json-to-yaml' | 'yaml-to-json'

function jsonToYaml(obj: unknown, indent: number = 0): string {
  const prefix = '  '.repeat(indent)

  if (obj === null) return 'null'
  if (obj === undefined) return 'null'
  if (typeof obj === 'boolean') return obj.toString()
  if (typeof obj === 'number') return obj.toString()
  if (typeof obj === 'string') {
    if (
      obj === '' ||
      obj.includes('\n') ||
      obj.includes(':') ||
      obj.includes('#') ||
      obj.includes('{') ||
      obj.includes('}') ||
      obj.includes('[') ||
      obj.includes(']') ||
      obj.includes(',') ||
      obj.includes('&') ||
      obj.includes('*') ||
      obj.includes('!') ||
      obj.includes('|') ||
      obj.includes('>') ||
      obj.includes("'") ||
      obj.includes('"') ||
      obj.includes('%') ||
      obj.includes('@') ||
      obj.includes('`') ||
      obj.trim() !== obj ||
      obj === 'true' ||
      obj === 'false' ||
      obj === 'null' ||
      obj === 'yes' ||
      obj === 'no' ||
      !isNaN(Number(obj))
    ) {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`
    }
    return obj
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    const lines: string[] = []
    for (const item of obj) {
      const value = jsonToYaml(item, indent + 1)
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const objLines = value.split('\n')
        lines.push(`${prefix}- ${objLines[0]}`)
        for (let i = 1; i < objLines.length; i++) {
          lines.push(`${prefix}  ${objLines[i]}`)
        }
      } else {
        lines.push(`${prefix}- ${value}`)
      }
    }
    return lines.join('\n')
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    const lines: string[] = []
    for (const [key, value] of entries) {
      const safeKey =
        key.includes(':') || key.includes('#') || key.includes(' ') || key === ''
          ? `"${key}"`
          : key
      if (typeof value === 'object' && value !== null) {
        const nested = jsonToYaml(value, indent + 1)
        lines.push(`${prefix}${safeKey}:`)
        lines.push(nested)
      } else {
        lines.push(`${prefix}${safeKey}: ${jsonToYaml(value, indent + 1)}`)
      }
    }
    return lines.join('\n')
  }

  return String(obj)
}

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
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
  }

  // Number
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed)
  }
  if (/^0x[0-9a-fA-F]+$/.test(trimmed)) {
    return parseInt(trimmed, 16)
  }
  if (/^0o[0-7]+$/.test(trimmed)) {
    return parseInt(trimmed.slice(2), 8)
  }

  // Inline array
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return []
    return inner.split(',').map((item) => parseYamlValue(item.trim()))
  }

  // Inline object
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return {}
    const obj: Record<string, unknown> = {}
    const parts = inner.split(',')
    for (const part of parts) {
      const colonIdx = part.indexOf(':')
      if (colonIdx === -1) continue
      const key = part.slice(0, colonIdx).trim()
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
  raw: string
}

function parseYamlLines(yaml: string): YamlLine[] {
  const lines = yaml.split('\n')
  const result: YamlLine[] = []

  for (const raw of lines) {
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue

    const indentMatch = raw.match(/^(\s*)/)
    const indent = indentMatch ? indentMatch[1].length : 0
    let content = raw.trim()

    const isArrayItem = content.startsWith('- ')
    if (isArrayItem) {
      content = content.slice(2)
    }

    const colonIdx = content.indexOf(':')
    if (colonIdx > 0 && !content.startsWith('"') && !content.startsWith("'")) {
      const key = content.slice(0, colonIdx).trim()
      const value = content.slice(colonIdx + 1).trim()
      result.push({ indent, key, value, isArrayItem, raw })
    } else {
      result.push({ indent, key: null, value: content, isArrayItem, raw })
    }
  }

  return result
}

function yamlToJson(yaml: string): unknown {
  const lines = parseYamlLines(yaml)
  if (lines.length === 0) return null

  function parseBlock(startIdx: number, parentIndent: number): { value: unknown; nextIdx: number } {
    if (startIdx >= lines.length) return { value: null, nextIdx: startIdx }

    const line = lines[startIdx]

    // Determine if this level is an array or object
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
            // Array item that starts an object
            const obj: Record<string, unknown> = {}
            if (current.value) {
              obj[current.key] = parseYamlValue(current.value)
            } else {
              const sub = parseBlock(idx + 1, current.indent + 2)
              obj[current.key] = sub.value
              // Check for more keys at same level
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

export default function JsonToYaml() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [direction, setDirection] = useState<Direction>('json-to-yaml')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!input.trim()) {
      setError('Please enter some content to convert')
      setOutput('')
      return
    }

    try {
      if (direction === 'json-to-yaml') {
        const parsed = JSON.parse(input)
        const yaml = jsonToYaml(parsed)
        setOutput(yaml)
      } else {
        const parsed = yamlToJson(input)
        setOutput(JSON.stringify(parsed, null, 2))
      }
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input')
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
    if (direction === 'json-to-yaml') {
      setInput(
        JSON.stringify(
          {
            server: {
              host: 'localhost',
              port: 8080,
              ssl: true,
            },
            database: {
              name: 'myapp',
              connections: [
                { host: 'db1.example.com', port: 5432 },
                { host: 'db2.example.com', port: 5432 },
              ],
            },
            features: ['auth', 'logging', 'cache'],
          },
          null,
          2
        )
      )
    } else {
      setInput(
        `server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  connections:
    - host: db1.example.com
      port: 5432
    - host: db2.example.com
      port: 5432
features:
  - auth
  - logging
  - cache`
      )
    }
    setOutput('')
    setError('')
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setDirection('json-to-yaml')
              setInput('')
              setOutput('')
              setError('')
            }}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              direction === 'json-to-yaml'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
            aria-pressed={direction === 'json-to-yaml'}
          >
            JSON to YAML
          </button>
          <button
            onClick={() => {
              setDirection('yaml-to-json')
              setInput('')
              setOutput('')
              setError('')
            }}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              direction === 'yaml-to-json'
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
            aria-pressed={direction === 'yaml-to-json'}
          >
            YAML to JSON
          </button>
        </div>
        <button
          onClick={loadSample}
          className="px-3 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {direction === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}
          </label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={
              direction === 'json-to-yaml'
                ? 'Paste your JSON here...'
                : 'Paste your YAML here...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label={direction === 'json-to-yaml' ? 'JSON input' : 'YAML input'}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">
              {direction === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'}
            </label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label="Copy output to clipboard"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none"
            value={output}
            readOnly
            placeholder={
              direction === 'json-to-yaml'
                ? 'YAML output will appear here...'
                : 'JSON output will appear here...'
            }
            aria-label={direction === 'json-to-yaml' ? 'YAML output' : 'JSON output'}
          />
        </div>
      </div>

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
          Convert
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
