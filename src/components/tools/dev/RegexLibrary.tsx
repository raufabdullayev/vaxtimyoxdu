'use client'

import { useState, useMemo } from 'react'

interface RegexPattern {
  name: string
  pattern: string
  flags: string
  description: string
  example: string
  category: string
}

const PATTERNS: RegexPattern[] = [
  // Email & URLs
  { name: 'Email Address', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', flags: '', description: 'Validates standard email addresses', example: 'user@example.com', category: 'Validation' },
  { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: '', description: 'Matches HTTP/HTTPS URLs', example: 'https://example.com/path?q=1', category: 'Validation' },
  { name: 'IPv4 Address', pattern: '^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$', flags: '', description: 'Validates IPv4 addresses', example: '192.168.1.1', category: 'Validation' },
  { name: 'IPv6 Address', pattern: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$', flags: '', description: 'Validates full IPv6 addresses', example: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', category: 'Validation' },
  { name: 'Phone Number (US)', pattern: '^\\+?1?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$', flags: '', description: 'Matches US phone numbers in various formats', example: '(555) 123-4567', category: 'Validation' },
  { name: 'Phone Number (International)', pattern: '^\\+?[1-9]\\d{1,14}$', flags: '', description: 'Matches international phone numbers (E.164)', example: '+14155552671', category: 'Validation' },

  // Strings & Text
  { name: 'Hex Color Code', pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', flags: '', description: 'Matches hex color codes (3 or 6 digits)', example: '#ff5733', category: 'Strings' },
  { name: 'HTML Tag', pattern: '<\\/?[a-z][\\s\\S]*?>', flags: 'gi', description: 'Matches opening and closing HTML tags', example: '<div class="test">', category: 'Strings' },
  { name: 'Slug / URL-friendly', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$', flags: '', description: 'Matches URL slugs (lowercase, hyphens)', example: 'my-blog-post', category: 'Strings' },
  { name: 'UUID v4', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', flags: 'i', description: 'Validates UUID version 4', example: '550e8400-e29b-41d4-a716-446655440000', category: 'Strings' },
  { name: 'JSON String', pattern: '"(?:[^"\\\\]|\\\\.)*"', flags: 'g', description: 'Matches JSON string values', example: '"hello \\"world\\""', category: 'Strings' },

  // Numbers
  { name: 'Integer', pattern: '^-?\\d+$', flags: '', description: 'Matches positive and negative integers', example: '-42', category: 'Numbers' },
  { name: 'Decimal Number', pattern: '^-?\\d+\\.\\d+$', flags: '', description: 'Matches decimal numbers', example: '3.14', category: 'Numbers' },
  { name: 'Scientific Notation', pattern: '^-?\\d+\\.?\\d*[eE][+-]?\\d+$', flags: '', description: 'Matches numbers in scientific notation', example: '1.5e10', category: 'Numbers' },
  { name: 'Currency (USD)', pattern: '^\\$?\\d{1,3}(,\\d{3})*(\\.\\d{2})?$', flags: '', description: 'Matches US dollar amounts', example: '$1,234.56', category: 'Numbers' },
  { name: 'Percentage', pattern: '^-?\\d+(\\.\\d+)?%$', flags: '', description: 'Matches percentage values', example: '99.9%', category: 'Numbers' },

  // Date & Time
  { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', flags: '', description: 'Matches ISO date format', example: '2024-01-15', category: 'Date & Time' },
  { name: 'Date (MM/DD/YYYY)', pattern: '^(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}$', flags: '', description: 'Matches US date format', example: '01/15/2024', category: 'Date & Time' },
  { name: 'Time (HH:MM:SS)', pattern: '^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$', flags: '', description: 'Matches 24-hour time', example: '14:30:00', category: 'Date & Time' },
  { name: 'ISO 8601 DateTime', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})?$', flags: '', description: 'Matches ISO 8601 datetime format', example: '2024-01-15T14:30:00Z', category: 'Date & Time' },

  // Security
  { name: 'Strong Password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', flags: '', description: 'At least 8 chars, uppercase, lowercase, digit, special char', example: 'MyP@ssw0rd', category: 'Security' },
  { name: 'Credit Card (Visa)', pattern: '^4[0-9]{12}(?:[0-9]{3})?$', flags: '', description: 'Matches Visa card numbers', example: '4111111111111111', category: 'Security' },
  { name: 'Social Security Number', pattern: '^(?!000|666|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0000)\\d{4}$', flags: '', description: 'Matches US SSN format', example: '123-45-6789', category: 'Security' },

  // Code
  { name: 'CSS Property', pattern: '[a-z-]+\\s*:\\s*[^;]+;', flags: 'g', description: 'Matches CSS property declarations', example: 'color: #333;', category: 'Code' },
  { name: 'JavaScript Variable', pattern: '\\b(const|let|var)\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\\b', flags: 'g', description: 'Matches JS variable declarations', example: 'const myVar', category: 'Code' },
  { name: 'Import Statement', pattern: "^import\\s+.*\\s+from\\s+['\"].*['\"]", flags: 'gm', description: 'Matches ES module imports', example: "import React from 'react'", category: 'Code' },
]

const CATEGORIES = Array.from(new Set(PATTERNS.map((p) => p.category)))

export default function RegexLibrary() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [testInput, setTestInput] = useState('')
  const [selectedPattern, setSelectedPattern] = useState<RegexPattern | null>(null)
  const [copied, setCopied] = useState('')

  const filtered = useMemo(() => {
    return PATTERNS.filter((p) => {
      const matchesSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const testResult = useMemo(() => {
    if (!selectedPattern || !testInput) return null
    try {
      const regex = new RegExp(selectedPattern.pattern, selectedPattern.flags)
      const matches = testInput.match(regex)
      const isFullMatch = regex.test(testInput)
      return { matches, isFullMatch }
    } catch {
      return null
    }
  }, [selectedPattern, testInput])

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const selectPattern = (pattern: RegexPattern) => {
    setSelectedPattern(pattern)
    setTestInput(pattern.example)
  }

  return (
    <div className="space-y-4">
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search patterns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search regex patterns"
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern list */}
      <div>
        <label className="text-sm font-medium mb-2 block">{filtered.length} Patterns</label>
        <div className="rounded-lg border divide-y max-h-[400px] overflow-auto">
          {filtered.map((pattern, i) => (
            <div
              key={i}
              className={`px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors ${
                selectedPattern?.name === pattern.name ? 'bg-primary/10' : ''
              }`}
              onClick={() => selectPattern(pattern)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{pattern.name}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{pattern.category}</span>
              </div>
              <p className="text-xs text-muted-foreground">{pattern.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <code className="text-xs font-mono bg-muted/50 px-2 py-0.5 rounded break-all">
                  /{pattern.pattern}/{pattern.flags}
                </code>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    copy(pattern.pattern, pattern.name)
                  }}
                  className="text-xs text-primary hover:underline shrink-0"
                >
                  {copied === pattern.name ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test panel */}
      {selectedPattern && (
        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Test: {selectedPattern.name}</h3>
            <button
              onClick={() => copy(`/${selectedPattern.pattern}/${selectedPattern.flags}`, 'full')}
              className="text-xs text-primary hover:underline"
            >
              {copied === 'full' ? 'Copied!' : 'Copy Regex'}
            </button>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Test String</label>
            <input
              type="text"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Enter test string..."
              aria-label="Test string input"
            />
          </div>
          {testResult && (
            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-sm ${testResult.isFullMatch ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                <span>{testResult.isFullMatch ? 'Match' : 'No match'}</span>
              </div>
              {testResult.matches && testResult.matches.length > 0 && (
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Matches ({testResult.matches.length})</label>
                  <div className="flex flex-wrap gap-1.5">
                    {testResult.matches.map((m, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-green-500/15 text-green-700 dark:text-green-400 rounded text-xs font-mono">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
