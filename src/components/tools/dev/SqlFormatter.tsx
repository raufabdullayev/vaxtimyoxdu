'use client'

import { useState } from 'react'
import { ToolTextarea } from '@/components/ui'

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'INTO', 'VALUES',
  'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'ADD',
  'INDEX', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'FULL', 'ON',
  'GROUP', 'BY', 'ORDER', 'ASC', 'DESC', 'HAVING', 'LIMIT', 'OFFSET',
  'UNION', 'ALL', 'AS', 'IN', 'NOT', 'NULL', 'IS', 'LIKE', 'BETWEEN',
  'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'DISTINCT', 'COUNT',
  'SUM', 'AVG', 'MIN', 'MAX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES',
  'CONSTRAINT', 'DEFAULT', 'CHECK', 'UNIQUE', 'CASCADE', 'TRUNCATE',
  'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION', 'WITH', 'RECURSIVE',
]

const NEWLINE_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER', 'GROUP', 'HAVING',
  'LIMIT', 'OFFSET', 'UNION', 'INSERT', 'INTO', 'VALUES', 'UPDATE',
  'SET', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'JOIN', 'INNER', 'LEFT',
  'RIGHT', 'OUTER', 'FULL', 'ON', 'WHEN', 'ELSE', 'END',
])

const INDENT_KEYWORDS = new Set([
  'AND', 'OR', 'ON', 'SET', 'WHEN', 'ELSE',
])

function formatSql(sql: string): string {
  const keywordSet = new Set(SQL_KEYWORDS)
  // Tokenize: split by whitespace, keeping strings and parentheses
  const tokens: string[] = []
  let current = ''
  let inString: string | null = null

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i]

    if (inString) {
      current += ch
      if (ch === inString) {
        inString = null
        tokens.push(current)
        current = ''
      }
      continue
    }

    if (ch === "'" || ch === '"') {
      if (current.trim()) tokens.push(current.trim())
      current = ch
      inString = ch
      continue
    }

    if (ch === '(' || ch === ')' || ch === ',' || ch === ';') {
      if (current.trim()) tokens.push(current.trim())
      tokens.push(ch)
      current = ''
      continue
    }

    if (/\s/.test(ch)) {
      if (current.trim()) tokens.push(current.trim())
      current = ''
      continue
    }

    current += ch
  }
  if (current.trim()) tokens.push(current.trim())

  // Format
  const lines: string[] = []
  let currentLine = ''
  let indentLevel = 0
  const tab = '  '
  let parenDepth = 0

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const upper = token.toUpperCase()

    if (token === '(') {
      currentLine += ' ('
      parenDepth++
      continue
    }
    if (token === ')') {
      parenDepth--
      currentLine += ')'
      continue
    }
    if (token === ',') {
      currentLine += ','
      if (parenDepth === 0) {
        lines.push(tab.repeat(indentLevel) + currentLine.trim())
        currentLine = ''
      }
      continue
    }
    if (token === ';') {
      currentLine += ';'
      lines.push(tab.repeat(indentLevel) + currentLine.trim())
      currentLine = ''
      lines.push('')
      indentLevel = 0
      continue
    }

    if (keywordSet.has(upper) && NEWLINE_KEYWORDS.has(upper) && parenDepth === 0) {
      if (currentLine.trim()) {
        lines.push(tab.repeat(indentLevel) + currentLine.trim())
        currentLine = ''
      }

      if (INDENT_KEYWORDS.has(upper)) {
        currentLine = upper
        indentLevel = 1
      } else {
        indentLevel = 0
        currentLine = upper
        if (['SELECT', 'FROM', 'WHERE', 'ORDER', 'GROUP', 'HAVING'].includes(upper)) {
          indentLevel = 0
        }
      }
    } else if (keywordSet.has(upper)) {
      currentLine += (currentLine ? ' ' : '') + upper
    } else {
      currentLine += (currentLine ? ' ' : '') + token
    }
  }

  if (currentLine.trim()) {
    lines.push(tab.repeat(indentLevel) + currentLine.trim())
  }

  return lines.join('\n').trim()
}

export default function SqlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFormat = () => {
    if (!input.trim()) return
    setOutput(formatSql(input))
  }

  const handleCompact = () => {
    if (!input.trim()) return
    setOutput(input.replace(/\s+/g, ' ').replace(/\s*;\s*/g, '; ').trim())
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
  }

  const loadExample = () => {
    setInput(
      'SELECT u.id, u.name, u.email, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = \'active\' AND u.created_at > \'2024-01-01\' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 5 ORDER BY order_count DESC LIMIT 20;'
    )
    setOutput('')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Input SQL</span>
            <button
              onClick={loadExample}
              className="text-xs text-primary hover:underline"
            >
              Load Example
            </button>
          </div>
          <ToolTextarea
            label="SQL input"
            className="font-mono min-h-[250px]"
            placeholder="Paste your SQL query here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <ToolTextarea
            label="SQL output"
            className="font-mono min-h-[250px] bg-muted/50"
            value={output}
            readOnly
            placeholder="Formatted SQL will appear here..."
          />
          {output && (
            <button
              onClick={copy}
              className="text-xs text-primary hover:underline mt-1"
              aria-label="Copy output to clipboard"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleFormat}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Format
        </button>
        <button
          onClick={handleCompact}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Compact
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
