'use client'

import { useState, useEffect, useCallback } from 'react'

function generateUuidV4(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback using crypto.getRandomValues
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

function formatUuid(uuid: string, uppercase: boolean, hyphens: boolean): string {
  let result = uuid
  if (!hyphens) result = result.replace(/-/g, '')
  if (uppercase) result = result.toUpperCase()
  else result = result.toLowerCase()
  return result
}

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')
  const [uppercase, setUppercase] = useState(false)
  const [hyphens, setHyphens] = useState(true)
  const [bulkCount, setBulkCount] = useState(5)
  const [bulkUuids, setBulkUuids] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedMain, setCopiedMain] = useState(false)
  const [copiedAll, setCopiedAll] = useState(false)

  const generateNew = useCallback(() => {
    setUuid(generateUuidV4())
  }, [])

  useEffect(() => {
    generateNew()
  }, [generateNew])

  const displayUuid = formatUuid(uuid, uppercase, hyphens)

  const copyMain = useCallback(() => {
    navigator.clipboard.writeText(displayUuid)
    setCopiedMain(true)
    setTimeout(() => setCopiedMain(false), 1500)
  }, [displayUuid])

  const copyOne = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }, [])

  const generateBulk = useCallback(() => {
    const count = Math.max(1, Math.min(100, bulkCount))
    const uuids = Array.from({ length: count }, () => generateUuidV4())
    setBulkUuids(uuids)
  }, [bulkCount])

  const copyAll = useCallback(() => {
    const formatted = bulkUuids.map((u) => formatUuid(u, uppercase, hyphens)).join('\n')
    navigator.clipboard.writeText(formatted)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 1500)
  }, [bulkUuids, uppercase, hyphens])

  return (
    <div className="space-y-6">
      {/* Single UUID display */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Generated UUID v4</label>
          <button
            onClick={copyMain}
            className="text-xs text-primary hover:underline"
            aria-label="Copy UUID"
          >
            {copiedMain ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-lg font-mono break-all select-all" aria-label="Generated UUID">
          {displayUuid}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={generateNew}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label="Generate new UUID"
        >
          Generate New
        </button>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="rounded accent-primary"
          />
          Uppercase
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={hyphens}
            onChange={(e) => setHyphens(e.target.checked)}
            className="rounded accent-primary"
          />
          Hyphens
        </label>
      </div>

      {/* Bulk generation */}
      <div className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-medium">Bulk Generate</h3>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="bulk-count" className="block text-sm text-muted-foreground mb-1">
              Count (1-100)
            </label>
            <input
              id="bulk-count"
              type="number"
              min={1}
              max={100}
              value={bulkCount}
              onChange={(e) => setBulkCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-24 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Number of UUIDs to generate"
            />
          </div>
          <button
            onClick={generateBulk}
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            Generate Bulk
          </button>
          {bulkUuids.length > 0 && (
            <button
              onClick={copyAll}
              className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              aria-label="Copy all UUIDs"
            >
              {copiedAll ? 'Copied All!' : 'Copy All'}
            </button>
          )}
        </div>

        {bulkUuids.length > 0 && (
          <div className="rounded-lg border bg-muted/50 max-h-[400px] overflow-y-auto divide-y">
            {bulkUuids.map((u, i) => {
              const formatted = formatUuid(u, uppercase, hyphens)
              return (
                <div key={i} className="flex items-center justify-between px-3 py-2 gap-2">
                  <span className="text-xs text-muted-foreground w-6 shrink-0">{i + 1}</span>
                  <code className="text-sm font-mono flex-1 break-all select-all">{formatted}</code>
                  <button
                    onClick={() => copyOne(formatted, i)}
                    className="text-xs text-primary hover:underline shrink-0"
                    aria-label={`Copy UUID number ${i + 1}`}
                  >
                    {copiedIndex === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
