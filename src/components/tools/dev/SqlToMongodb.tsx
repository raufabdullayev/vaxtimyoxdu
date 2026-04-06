'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

function sqlToMongodb(sql: string): string {
  const trimmed = sql.trim().replace(/;$/, '')

  // SELECT
  const selectMatch = trimmed.match(/^SELECT\s+(.*?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.*?))?(?:\s+ORDER\s+BY\s+(.*?))?(?:\s+LIMIT\s+(\d+))?$/i)
  if (selectMatch) {
    const [, fields, collection, where, orderBy, limit] = selectMatch
    const projection = fields.trim() === '*' ? '{}' : `{ ${fields.split(',').map((f) => `${f.trim()}: 1`).join(', ')} }`
    const filter = where ? parseWhere(where) : '{}'
    let result = `db.${collection}.find(${filter}, ${projection})`
    if (orderBy) {
      const sorts = orderBy.split(',').map((s) => {
        const parts = s.trim().split(/\s+/)
        const dir = parts[1]?.toUpperCase() === 'DESC' ? -1 : 1
        return `${parts[0]}: ${dir}`
      })
      result += `.sort({ ${sorts.join(', ')} })`
    }
    if (limit) result += `.limit(${limit})`
    return result
  }

  // INSERT
  const insertMatch = trimmed.match(/^INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i)
  if (insertMatch) {
    const [, collection, columns, values] = insertMatch
    const cols = columns.split(',').map((c) => c.trim())
    const vals = values.split(',').map((v) => v.trim())
    const doc = cols.map((c, i) => `${c}: ${vals[i]}`).join(', ')
    return `db.${collection}.insertOne({ ${doc} })`
  }

  // UPDATE
  const updateMatch = trimmed.match(/^UPDATE\s+(\w+)\s+SET\s+(.*?)\s+WHERE\s+(.*)/i)
  if (updateMatch) {
    const [, collection, setClause, where] = updateMatch
    const updates = setClause.split(',').map((s) => {
      const [key, val] = s.split('=').map((x) => x.trim())
      return `${key}: ${val}`
    })
    return `db.${collection}.updateMany(${parseWhere(where)}, { $set: { ${updates.join(', ')} } })`
  }

  // DELETE
  const deleteMatch = trimmed.match(/^DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.*))?/i)
  if (deleteMatch) {
    const [, collection, where] = deleteMatch
    const filter = where ? parseWhere(where) : '{}'
    return `db.${collection}.deleteMany(${filter})`
  }

  // COUNT
  const countMatch = trimmed.match(/^SELECT\s+COUNT\(\*\)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.*))?/i)
  if (countMatch) {
    const [, collection, where] = countMatch
    const filter = where ? parseWhere(where) : '{}'
    return `db.${collection}.countDocuments(${filter})`
  }

  return '// Could not parse SQL query. Supported: SELECT, INSERT, UPDATE, DELETE'
}

function parseWhere(where: string): string {
  const conditions: string[] = []
  const parts = where.split(/\s+AND\s+/i)
  for (const part of parts) {
    const match = part.trim().match(/^(\w+)\s*(=|!=|<>|>=|<=|>|<|LIKE|IN)\s*(.+)$/i)
    if (match) {
      const [, field, op, rawVal] = match
      const val = rawVal.trim()
      switch (op.toUpperCase()) {
        case '=': conditions.push(`${field}: ${val}`); break
        case '!=': case '<>': conditions.push(`${field}: { $ne: ${val} }`); break
        case '>': conditions.push(`${field}: { $gt: ${val} }`); break
        case '>=': conditions.push(`${field}: { $gte: ${val} }`); break
        case '<': conditions.push(`${field}: { $lt: ${val} }`); break
        case '<=': conditions.push(`${field}: { $lte: ${val} }`); break
        case 'LIKE': conditions.push(`${field}: /${val.replace(/%/g, '.*').replace(/'/g, '')}/i`); break
        case 'IN': conditions.push(`${field}: { $in: [${val.replace(/[()]/g, '')}] }`); break
      }
    }
  }
  return `{ ${conditions.join(', ')} }`
}

const SAMPLES = [
  "SELECT * FROM users WHERE age > 25 ORDER BY name LIMIT 10",
  "SELECT name, email FROM users WHERE status = 'active'",
  "INSERT INTO users (name, email, age) VALUES ('John', 'john@example.com', 30)",
  "UPDATE users SET status = 'inactive' WHERE lastLogin < '2025-01-01'",
  "DELETE FROM sessions WHERE expired = true",
]

export default function SqlToMongodb() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.devTools')
  const [sql, setSql] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setResult(sqlToMongodb(sql))
  }

  const copy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">SQL Query</label>
        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="SELECT * FROM users WHERE age > 25"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((s, i) => (
          <button
            key={i}
            onClick={() => { setSql(s); setResult(sqlToMongodb(s)) }}
            className="px-2 py-1 rounded border text-xs text-muted-foreground hover:bg-accent transition-colors"
          >
            {s.split(' ')[0]} {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={convert}
        disabled={!sql.trim()}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {t('convert')}
      </button>

      {result && (
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">MongoDB Query</span>
            <button onClick={copy} className="text-xs text-primary hover:underline">
              {copied ? tc('copied') : tc('copy')}
            </button>
          </div>
          <pre className="text-sm font-mono bg-muted/50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}
