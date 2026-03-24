'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolTextarea from '@/components/ui/ToolTextarea'

function inferType(value: unknown, name: string, interfaces: Map<string, string>, depth: number): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') return 'string'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'

  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]'
    const itemTypes = new Set(value.map((v) => inferType(v, name + 'Item', interfaces, depth + 1)))
    if (itemTypes.size === 1) return `${[...itemTypes][0]}[]`
    return `(${[...itemTypes].join(' | ')})[]`
  }

  if (typeof value === 'object') {
    const interfaceName = name.charAt(0).toUpperCase() + name.slice(1)
    const entries = Object.entries(value as Record<string, unknown>)
    const fields = entries
      .map(([key, val]) => {
        const fieldName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
        const fieldType = inferType(val, key, interfaces, depth + 1)
        return `  ${fieldName}: ${fieldType};`
      })
      .join('\n')

    if (depth > 0) {
      interfaces.set(interfaceName, `export interface ${interfaceName} {\n${fields}\n}`)
      return interfaceName
    }

    return fields
  }

  return 'unknown'
}

function jsonToTs(json: string, rootName: string): { output: string; error: string | null } {
  try {
    const parsed = JSON.parse(json)
    const interfaces = new Map<string, string>()

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        return { output: `export type ${rootName} = unknown[];`, error: null }
      }
      const itemType = inferType(parsed[0], rootName + 'Item', interfaces, 0)
      const rootFields = itemType
      const childInterfaces = [...interfaces.values()].join('\n\n')
      if (typeof parsed[0] === 'object' && parsed[0] !== null && !Array.isArray(parsed[0])) {
        const mainInterface = `export interface ${rootName}Item {\n${rootFields}\n}`
        const typeAlias = `export type ${rootName} = ${rootName}Item[];`
        return {
          output: [childInterfaces, mainInterface, typeAlias].filter(Boolean).join('\n\n'),
          error: null,
        }
      }
      return { output: `export type ${rootName} = ${itemType}[];`, error: null }
    }

    if (typeof parsed === 'object' && parsed !== null) {
      const fields = inferType(parsed, rootName, interfaces, 0)
      const childInterfaces = [...interfaces.values()].join('\n\n')
      const mainInterface = `export interface ${rootName} {\n${fields}\n}`
      return {
        output: [childInterfaces, mainInterface].filter(Boolean).join('\n\n'),
        error: null,
      }
    }

    const primitiveType = typeof parsed
    return { output: `export type ${rootName} = ${primitiveType};`, error: null }
  } catch {
    return { output: '', error: 'invalidJson' }
  }
}

export default function JsonToTypescript() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [rootName, setRootName] = useState('Root')
  const [copied, setCopied] = useState(false)

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null }
    return jsonToTs(input, rootName || 'Root')
  }, [input, rootName])

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          isActive: true,
          address: {
            street: '123 Main St',
            city: 'New York',
            zip: '10001',
          },
          tags: ['developer', 'designer'],
          scores: [95, 87, 92],
        },
        null,
        2
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolInput
          label={t('interfaceName')}
          value={rootName}
          onChange={(e) => setRootName(e.target.value.replace(/[^a-zA-Z0-9_$]/g, ''))}
          placeholder="Root"
        />
        <div className="flex items-end">
          <button
            onClick={loadSample}
            className="w-full py-2 px-4 rounded-lg border text-sm hover:bg-accent transition-colors"
          >
            {t('loadSample')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ToolTextarea
          label={t('jsonInput')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('pasteJsonHere')}
          rows={14}
          className="font-mono text-sm"
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">{t('typescriptOutput')}</label>
            {output && (
              <button onClick={copy} className="text-xs text-primary hover:underline">
                {copied ? t('copied') : t('copy')}
              </button>
            )}
          </div>
          <pre className="rounded-lg border bg-muted/50 px-4 py-3 text-sm font-mono overflow-auto whitespace-pre-wrap min-h-[290px] max-h-[400px]">
            {error ? (
              <span className="text-destructive">{t(error as Parameters<typeof t>[0])}</span>
            ) : (
              output || <span className="text-muted-foreground">{t('typescriptWillAppear')}</span>
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}
