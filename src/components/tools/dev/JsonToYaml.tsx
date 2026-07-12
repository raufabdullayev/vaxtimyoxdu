'use client'

import { useState } from 'react'
import { valueToYaml, parseYaml } from '@/lib/dev/yaml-parser'

type Direction = 'json-to-yaml' | 'yaml-to-json'

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
        const yaml = valueToYaml(parsed)
        setOutput(yaml)
      } else {
        const parsed = parseYaml(input)
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
