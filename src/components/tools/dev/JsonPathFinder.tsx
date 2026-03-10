'use client'

import { useState, useMemo, useCallback } from 'react'

interface TreeNode {
  key: string
  path: string
  value: unknown
  type: string
  children?: TreeNode[]
}

function getType(value: unknown): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

function buildTree(data: unknown, path: string = '$', key: string = '$'): TreeNode {
  const type = getType(data)
  const node: TreeNode = { key, path, value: data, type }

  if (type === 'object' && data !== null) {
    node.children = Object.entries(data as Record<string, unknown>).map(([k, v]) => {
      const childPath = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? `${path}.${k}` : `${path}["${k}"]`
      return buildTree(v, childPath, k)
    })
  } else if (type === 'array') {
    node.children = (data as unknown[]).map((item, i) =>
      buildTree(item, `${path}[${i}]`, String(i))
    )
  }

  return node
}

function queryPath(data: unknown, pathStr: string): { value: unknown; found: boolean } {
  try {
    const parts: string[] = []
    const regex = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)|(?:\["([^"]+)"\])|(?:\[(\d+)\])/g
    let match

    while ((match = regex.exec(pathStr)) !== null) {
      parts.push(match[1] || match[2] || match[3])
    }

    let current: unknown = data
    for (const part of parts) {
      if (current === null || current === undefined) return { value: undefined, found: false }
      if (typeof current === 'object') {
        current = (current as Record<string, unknown>)[part]
      } else {
        return { value: undefined, found: false }
      }
    }

    return { value: current, found: true }
  } catch {
    return { value: undefined, found: false }
  }
}

function TreeNodeComponent({
  node,
  onSelect,
  selectedPath,
  depth = 0,
}: {
  node: TreeNode
  onSelect: (path: string) => void
  selectedPath: string
  depth?: number
}) {
  const [expanded, setExpanded] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedPath === node.path

  const typeColor: Record<string, string> = {
    string: 'text-green-600 dark:text-green-400',
    number: 'text-blue-600 dark:text-blue-400',
    boolean: 'text-orange-600 dark:text-orange-400',
    null: 'text-red-600 dark:text-red-400',
    object: 'text-purple-600 dark:text-purple-400',
    array: 'text-purple-600 dark:text-purple-400',
  }

  const formatValue = (val: unknown, type: string): string => {
    if (type === 'string') return `"${String(val).slice(0, 50)}${String(val).length > 50 ? '...' : ''}"`
    if (type === 'null') return 'null'
    if (type === 'object') return `{${Object.keys(val as object).length}}`
    if (type === 'array') return `[${(val as unknown[]).length}]`
    return String(val)
  }

  return (
    <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-sm hover:bg-accent transition-colors ${
          isSelected ? 'bg-primary/10 ring-1 ring-primary' : ''
        }`}
        onClick={() => onSelect(node.path)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(!expanded)
            }}
            className="w-4 h-4 flex items-center justify-center text-muted-foreground shrink-0"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? '\u25BC' : '\u25B6'}
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}
        <span className="font-mono text-xs font-medium">{node.key}</span>
        <span className="text-muted-foreground text-xs mx-1">:</span>
        <span className={`font-mono text-xs ${typeColor[node.type] || ''}`}>
          {formatValue(node.value, node.type)}
        </span>
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <TreeNodeComponent
              key={`${child.path}-${i}`}
              node={child}
              onSelect={onSelect}
              selectedPath={selectedPath}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function JsonPathFinder() {
  const [input, setInput] = useState('')
  const [pathInput, setPathInput] = useState('')
  const [selectedPath, setSelectedPath] = useState('')
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  const parsed = useMemo(() => {
    if (!input.trim()) return null
    try {
      const data = JSON.parse(input)
      setError('')
      return data
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
      return null
    }
  }, [input])

  const tree = useMemo(() => {
    if (parsed === null || parsed === undefined) return null
    return buildTree(parsed)
  }, [parsed])

  const queryResult = useMemo(() => {
    if (!parsed || !pathInput.trim()) return null
    return queryPath(parsed, pathInput)
  }, [parsed, pathInput])

  const handleSelect = useCallback((path: string) => {
    setSelectedPath(path)
    setPathInput(path)
  }, [])

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const loadSample = () => {
    setInput(JSON.stringify({
      name: "John Doe",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL"
      },
      hobbies: ["reading", "coding", "gaming"],
      isActive: true,
      metadata: null
    }, null, 2))
    setSelectedPath('')
    setPathInput('')
  }

  return (
    <div className="space-y-4">
      {/* JSON Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">JSON Input</label>
          <button
            onClick={loadSample}
            className="text-xs text-primary hover:underline"
          >
            Load Sample
          </button>
        </div>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[180px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder='{"key": "value"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="JSON input"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {tree && (
        <>
          {/* Path input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium">JSON Path</label>
              <button
                onClick={() => copy(pathInput, 'path')}
                className="text-xs text-primary hover:underline"
              >
                {copied === 'path' ? 'Copied!' : 'Copy Path'}
              </button>
            </div>
            <input
              type="text"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="$.key or click a node below"
              value={pathInput}
              onChange={(e) => {
                setPathInput(e.target.value)
                setSelectedPath(e.target.value)
              }}
              aria-label="JSON path expression"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Click any node in the tree to get its path, or type a path manually.
            </p>
          </div>

          {/* Query result */}
          {queryResult && queryResult.found && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Value at Path</label>
                <button
                  onClick={() => copy(JSON.stringify(queryResult.value, null, 2), 'value')}
                  className="text-xs text-primary hover:underline"
                >
                  {copied === 'value' ? 'Copied!' : 'Copy Value'}
                </button>
              </div>
              <pre className="rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono whitespace-pre-wrap max-h-40 overflow-auto">
                {JSON.stringify(queryResult.value, null, 2)}
              </pre>
            </div>
          )}

          {/* Tree view */}
          <div>
            <label className="text-sm font-medium mb-2 block">JSON Tree (click to select path)</label>
            <div className="rounded-lg border p-3 max-h-[400px] overflow-auto bg-muted/30">
              <TreeNodeComponent
                node={tree}
                onSelect={handleSelect}
                selectedPath={selectedPath}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
