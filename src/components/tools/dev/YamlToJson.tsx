'use client'

import { useState } from 'react'
import { parseYamlExtended } from '@/lib/dev/yaml-parser'

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
      const parsed = parseYamlExtended(input)
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
