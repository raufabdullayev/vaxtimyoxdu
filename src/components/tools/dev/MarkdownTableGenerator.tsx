'use client'

import { useState, useMemo } from 'react'

type Alignment = 'left' | 'center' | 'right'

export default function MarkdownTableGenerator() {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [data, setData] = useState<string[][]>(() =>
    Array.from({ length: 4 }, () => Array(3).fill(''))
  )
  const [alignments, setAlignments] = useState<Alignment[]>(() => Array(3).fill('left'))
  const [copied, setCopied] = useState(false)
  const [includeHeader, setIncludeHeader] = useState(true)

  const updateCell = (row: number, col: number, value: string) => {
    setData((prev) => {
      const next = prev.map((r) => [...r])
      if (!next[row]) next[row] = Array(cols).fill('')
      next[row][col] = value
      return next
    })
  }

  const updateAlignment = (col: number, alignment: Alignment) => {
    setAlignments((prev) => {
      const next = [...prev]
      next[col] = alignment
      return next
    })
  }

  const addRow = () => {
    if (rows >= 20) return
    setRows((r) => r + 1)
    setData((prev) => [...prev, Array(cols).fill('')])
  }

  const removeRow = () => {
    if (rows <= 1) return
    setRows((r) => r - 1)
    setData((prev) => prev.slice(0, -1))
  }

  const addCol = () => {
    if (cols >= 10) return
    setCols((c) => c + 1)
    setData((prev) => prev.map((row) => [...row, '']))
    setAlignments((prev) => [...prev, 'left'])
  }

  const removeCol = () => {
    if (cols <= 1) return
    setCols((c) => c - 1)
    setData((prev) => prev.map((row) => row.slice(0, -1)))
    setAlignments((prev) => prev.slice(0, -1))
  }

  const markdown = useMemo(() => {
    const totalRows = includeHeader ? rows + 1 : rows
    const tableData = data.slice(0, totalRows)

    // Calculate column widths
    const colWidths: number[] = Array(cols).fill(3)
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < totalRows; r++) {
        const cellLen = (tableData[r]?.[c] || '').length
        colWidths[c] = Math.max(colWidths[c], cellLen)
      }
    }

    const lines: string[] = []

    if (includeHeader) {
      // Header row
      const headerCells = Array.from({ length: cols }, (_, c) => {
        const cell = tableData[0]?.[c] || ''
        return ` ${cell.padEnd(colWidths[c])} `
      })
      lines.push(`|${headerCells.join('|')}|`)

      // Separator row
      const sepCells = Array.from({ length: cols }, (_, c) => {
        const width = colWidths[c]
        const align = alignments[c] || 'left'
        const dashes = '-'.repeat(width)
        if (align === 'center') return `:${dashes}:`
        if (align === 'right') return ` ${dashes}:`
        return `:${dashes} `
      })
      lines.push(`|${sepCells.join('|')}|`)

      // Data rows
      for (let r = 1; r < totalRows; r++) {
        const cells = Array.from({ length: cols }, (_, c) => {
          const cell = tableData[r]?.[c] || ''
          return ` ${cell.padEnd(colWidths[c])} `
        })
        lines.push(`|${cells.join('|')}|`)
      }
    } else {
      // No header - just data rows
      for (let r = 0; r < totalRows; r++) {
        const cells = Array.from({ length: cols }, (_, c) => {
          const cell = tableData[r]?.[c] || ''
          return ` ${cell.padEnd(colWidths[c])} `
        })
        lines.push(`|${cells.join('|')}|`)
      }
    }

    return lines.join('\n')
  }, [data, rows, cols, alignments, includeHeader])

  const copy = async () => {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setData(Array.from({ length: rows + 1 }, () => Array(cols).fill('')))
  }

  const loadSample = () => {
    const sampleData = [
      ['Name', 'Role', 'Status'],
      ['Alice', 'Developer', 'Active'],
      ['Bob', 'Designer', 'Active'],
      ['Charlie', 'Manager', 'Away'],
    ]
    setRows(3)
    setCols(3)
    setData(sampleData)
    setAlignments(['left', 'left', 'center'])
    setIncludeHeader(true)
  }

  const totalRows = includeHeader ? rows + 1 : rows

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Rows:</label>
          <button onClick={removeRow} className="w-8 h-8 border rounded-lg hover:bg-accent text-sm font-bold" disabled={rows <= 1}>-</button>
          <span className="text-sm font-mono w-6 text-center">{rows}</span>
          <button onClick={addRow} className="w-8 h-8 border rounded-lg hover:bg-accent text-sm font-bold" disabled={rows >= 20}>+</button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Cols:</label>
          <button onClick={removeCol} className="w-8 h-8 border rounded-lg hover:bg-accent text-sm font-bold" disabled={cols <= 1}>-</button>
          <span className="text-sm font-mono w-6 text-center">{cols}</span>
          <button onClick={addCol} className="w-8 h-8 border rounded-lg hover:bg-accent text-sm font-bold" disabled={cols >= 10}>+</button>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeHeader}
            onChange={(e) => setIncludeHeader(e.target.checked)}
            className="accent-primary"
          />
          Include header row
        </label>
      </div>

      {/* Table editor */}
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <tbody>
            {Array.from({ length: totalRows }, (_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }, (_, c) => (
                  <td key={c} className="p-0.5">
                    <input
                      type="text"
                      value={data[r]?.[c] || ''}
                      onChange={(e) => updateCell(r, c, e.target.value)}
                      className={`w-full min-w-[100px] rounded border px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                        includeHeader && r === 0
                          ? 'bg-muted/50 font-semibold'
                          : 'bg-background'
                      }`}
                      placeholder={includeHeader && r === 0 ? `Header ${c + 1}` : `Cell ${r},${c + 1}`}
                      aria-label={`${includeHeader && r === 0 ? 'Header' : 'Cell'} row ${r + 1}, column ${c + 1}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Column alignments */}
      {includeHeader && (
        <div>
          <label className="text-sm font-medium mb-2 block">Column Alignment</label>
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: cols }, (_, c) => (
              <div key={c} className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground mr-1">Col {c + 1}:</span>
                {(['left', 'center', 'right'] as Alignment[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => updateAlignment(c, a)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      (alignments[c] || 'left') === a
                        ? 'bg-primary text-primary-foreground'
                        : 'border hover:bg-accent'
                    }`}
                  >
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={loadSample}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors text-sm"
        >
          Load Sample
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Markdown output */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Markdown Output</label>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono whitespace-pre overflow-x-auto">
          {markdown}
        </pre>
      </div>
    </div>
  )
}
