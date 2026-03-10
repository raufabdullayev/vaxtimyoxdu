'use client'

import { useState } from 'react'

type XmlMode = 'format' | 'minify' | 'validate'

interface ValidationResult {
  valid: boolean
  errors: string[]
}

function validateXml(xml: string): ValidationResult {
  const errors: string[] = []
  const trimmed = xml.trim()

  if (!trimmed) {
    errors.push('XML is empty')
    return { valid: false, errors }
  }

  // Check for matching tags using a stack
  const tagStack: string[] = []
  const tagPattern = /<\/?([a-zA-Z_][\w.-]*)((?:\s+[a-zA-Z_][\w.-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'))?)*\s*)(\/?)>/g
  let match: RegExpExecArray | null

  // Check for basic well-formedness
  let insideTag = false
  let angleBracketCount = 0
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '<') {
      angleBracketCount++
      insideTag = true
    }
    if (trimmed[i] === '>') {
      angleBracketCount--
      insideTag = false
    }
  }
  if (angleBracketCount !== 0 || insideTag) {
    errors.push('Mismatched angle brackets < >')
  }

  while ((match = tagPattern.exec(trimmed)) !== null) {
    const fullMatch = match[0]
    const tagName = match[1]
    const isSelfClosing = match[3] === '/' || fullMatch.endsWith('/>')
    const isClosing = fullMatch.startsWith('</')

    if (isSelfClosing) {
      continue
    } else if (isClosing) {
      if (tagStack.length === 0) {
        errors.push(`Unexpected closing tag </${tagName}> — no matching opening tag`)
      } else if (tagStack[tagStack.length - 1] !== tagName) {
        errors.push(
          `Mismatched tag: expected </${tagStack[tagStack.length - 1]}> but found </${tagName}>`
        )
        tagStack.pop()
      } else {
        tagStack.pop()
      }
    } else {
      tagStack.push(tagName)
    }
  }

  for (const unclosed of tagStack) {
    errors.push(`Unclosed tag: <${unclosed}>`)
  }

  return { valid: errors.length === 0, errors }
}

function formatXml(xml: string, indentSize: number = 2): string {
  const trimmed = xml.trim()
  if (!trimmed) return ''

  // Remove existing whitespace between tags
  let formatted = trimmed.replace(/>\s*</g, '><')

  const indent = ' '.repeat(indentSize)
  let result = ''
  let level = 0
  let i = 0

  while (i < formatted.length) {
    if (formatted[i] === '<') {
      const closeIdx = formatted.indexOf('>', i)
      if (closeIdx === -1) {
        result += formatted.slice(i)
        break
      }

      const tag = formatted.slice(i, closeIdx + 1)
      const isClosing = tag.startsWith('</')
      const isSelfClosing = tag.endsWith('/>') || tag.startsWith('<?') || tag.startsWith('<!')
      const isComment = tag.startsWith('<!--')

      if (isComment) {
        const commentEnd = formatted.indexOf('-->', i)
        if (commentEnd !== -1) {
          const comment = formatted.slice(i, commentEnd + 3)
          result += indent.repeat(level) + comment + '\n'
          i = commentEnd + 3
          continue
        }
      }

      if (isClosing) {
        level = Math.max(0, level - 1)
        result += indent.repeat(level) + tag + '\n'
      } else if (isSelfClosing) {
        result += indent.repeat(level) + tag + '\n'
      } else {
        result += indent.repeat(level) + tag + '\n'
        level++
      }

      i = closeIdx + 1
    } else {
      // Text content
      const nextTag = formatted.indexOf('<', i)
      const text = nextTag === -1 ? formatted.slice(i) : formatted.slice(i, nextTag)

      if (text.trim()) {
        // For text content, go back and place it inline with the previous opening tag
        const lines = result.split('\n').filter((l) => l !== '')
        if (lines.length > 0) {
          const lastLine = lines[lines.length - 1]
          const nextClose = formatted.indexOf('</', nextTag !== -1 ? nextTag : i)
          if (nextClose === nextTag && nextTag !== -1) {
            // Text between opening and closing tags — put inline
            const closeEnd = formatted.indexOf('>', nextClose)
            const closeTag = formatted.slice(nextClose, closeEnd + 1)
            lines[lines.length - 1] = lastLine + text.trim() + closeTag
            result = lines.join('\n') + '\n'
            level = Math.max(0, level - 1)
            i = closeEnd + 1
            continue
          }
        }
        result += indent.repeat(level) + text.trim() + '\n'
      }

      i = nextTag === -1 ? formatted.length : nextTag
    }
  }

  return result.trimEnd()
}

function minifyXml(xml: string): string {
  return xml
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .replace(/>\s+/g, '>')
    .replace(/\s+</g, '<')
    .trim()
}

export default function XmlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)

  const handleAction = (mode: XmlMode) => {
    if (!input.trim()) {
      setError('Please enter some XML')
      setOutput('')
      setValidation(null)
      return
    }

    setError('')

    if (mode === 'validate') {
      const result = validateXml(input)
      setValidation(result)
      setOutput('')
      return
    }

    if (mode === 'format') {
      const result = validateXml(input)
      if (!result.valid) {
        setValidation(result)
        setOutput('')
        return
      }
      setValidation(null)
      setOutput(formatXml(input, indent))
    } else {
      setValidation(null)
      setOutput(minifyXml(input))
    }
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    setInput(
      `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
  </book>
  <book id="bk102">
    <author>Ralls, Kim</author>
    <title>Midnight Rain</title>
    <genre>Fantasy</genre>
    <price>5.95</price>
    <publish_date>2000-12-16</publish_date>
  </book>
</catalog>`
    )
    setOutput('')
    setError('')
    setValidation(null)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
    setValidation(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <label className="text-sm font-medium mr-2">Indent:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-lg border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
          <label className="block text-sm font-medium mb-1">XML Input</label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste your XML here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="XML input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Output</label>
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
            placeholder="Formatted XML will appear here..."
            aria-label="XML output"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          Error: {error}
        </div>
      )}

      {validation && (
        <div
          className={`p-3 rounded-lg text-sm ${
            validation.valid
              ? 'bg-green-500/15 text-green-700 dark:text-green-400'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          {validation.valid ? (
            <p className="font-medium">Valid XML - No errors found</p>
          ) : (
            <div>
              <p className="font-medium mb-2">
                Validation failed ({validation.errors.length} error
                {validation.errors.length !== 1 ? 's' : ''}):
              </p>
              <ul className="list-disc list-inside space-y-1">
                {validation.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleAction('format')}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Format / Beautify
        </button>
        <button
          onClick={() => handleAction('minify')}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Minify
        </button>
        <button
          onClick={() => handleAction('validate')}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Validate
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
