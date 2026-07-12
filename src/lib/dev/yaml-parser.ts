/**
 * Shared YAML <-> JSON parsing engine for the dev tools.
 *
 * Extracted from JsonToYaml.tsx and YamlToJson.tsx, which previously each
 * shipped their own copy of this logic in separate route-split chunks.
 *
 * IMPORTANT: The two tools historically diverged in subtle, observable ways,
 * and both have tests asserting their exact behavior. The tool-specific
 * differences are expressed as ScalarOptions / LineOptions flags injected into
 * shared scalar, line, and block parsers, so each tool keeps its EXACT behavior
 * (locked by the characterization tests) with no duplicated logic.
 *
 * Differences that are intentionally preserved:
 *  - JsonToYaml ("basic"):    no `\t` unescape, integer/decimal numbers only,
 *                             no inline-comment stripping, no key de-quoting in
 *                             line parsing, empty input -> `null`.
 *  - YamlToJson ("extended"): `\t` unescape, exponent numbers, inline-comment
 *                             stripping, bare `-` lines, key de-quoting, and
 *                             throws on empty / no-content input.
 */

// ---------------------------------------------------------------------------
// Safety helpers (prototype-pollution guard + recursion depth cap)
// ---------------------------------------------------------------------------

/**
 * Maximum nesting depth before the parser bails out. Bounds recursion on
 * pathological / hostile input (deeply nested blocks or inline `[[[...]]]`)
 * so a single tab can't blow the stack.
 */
const MAX_YAML_DEPTH = 200

/**
 * Keys that must never be assigned from parsed input — writing them can corrupt
 * the prototype chain (`__proto__` re-parents the object; `constructor` /
 * `prototype` are classic pollution vectors).
 */
const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/**
 * Assign a dynamically-named key onto a plain object, skipping unsafe keys. The
 * parsers build objects from untrusted input; although today's sinks (a
 * textarea + JSON.stringify) never execute the result, guarding here keeps this
 * shared module safe for any future server-side reuse.
 */
function assignKey(obj: Record<string, unknown>, key: string, value: unknown): void {
  if (UNSAFE_KEYS.has(key)) return
  obj[key] = value
}

// ---------------------------------------------------------------------------
// JSON -> YAML (used by JsonToYaml only)
// ---------------------------------------------------------------------------

export function valueToYaml(obj: unknown, indent: number = 0): string {
  const prefix = '  '.repeat(indent)

  if (obj === null) return 'null'
  if (obj === undefined) return 'null'
  if (typeof obj === 'boolean') return obj.toString()
  if (typeof obj === 'number') return obj.toString()
  if (typeof obj === 'string') {
    if (
      obj === '' ||
      obj.includes('\n') ||
      obj.includes(':') ||
      obj.includes('#') ||
      obj.includes('{') ||
      obj.includes('}') ||
      obj.includes('[') ||
      obj.includes(']') ||
      obj.includes(',') ||
      obj.includes('&') ||
      obj.includes('*') ||
      obj.includes('!') ||
      obj.includes('|') ||
      obj.includes('>') ||
      obj.includes("'") ||
      obj.includes('"') ||
      obj.includes('%') ||
      obj.includes('@') ||
      obj.includes('`') ||
      obj.trim() !== obj ||
      obj === 'true' ||
      obj === 'false' ||
      obj === 'null' ||
      obj === 'yes' ||
      obj === 'no' ||
      !isNaN(Number(obj))
    ) {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`
    }
    return obj
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    const lines: string[] = []
    for (const item of obj) {
      const value = valueToYaml(item, indent + 1)
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const objLines = value.split('\n')
        lines.push(`${prefix}- ${objLines[0]}`)
        for (let i = 1; i < objLines.length; i++) {
          lines.push(`${prefix}  ${objLines[i]}`)
        }
      } else {
        lines.push(`${prefix}- ${value}`)
      }
    }
    return lines.join('\n')
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    const lines: string[] = []
    for (const [key, value] of entries) {
      const safeKey =
        key.includes(':') || key.includes('#') || key.includes(' ') || key === ''
          ? `"${key}"`
          : key
      if (typeof value === 'object' && value !== null) {
        const nested = valueToYaml(value, indent + 1)
        lines.push(`${prefix}${safeKey}:`)
        lines.push(nested)
      } else {
        lines.push(`${prefix}${safeKey}: ${valueToYaml(value, indent + 1)}`)
      }
    }
    return lines.join('\n')
  }

  return String(obj)
}

// ---------------------------------------------------------------------------
// Scalar value parsing
// ---------------------------------------------------------------------------

/** Per-tool scalar-parsing differences, injected as flags. */
interface ScalarOptions {
  /** Unescape `\t` inside quoted strings (extended only). */
  unescapeTabs: boolean
  /** Accept exponent notation as a number, e.g. `1e3` (extended only). */
  allowExponent: boolean
  /** Strip surrounding quotes from inline-object keys (extended only). */
  dequoteKeys: boolean
}

const BASIC_SCALAR: ScalarOptions = { unescapeTabs: false, allowExponent: false, dequoteKeys: false }
const EXTENDED_SCALAR: ScalarOptions = { unescapeTabs: true, allowExponent: true, dequoteKeys: true }

/**
 * Shared scalar parser. The two tools differ only in the ScalarOptions flags;
 * the branch order and all non-flagged behavior are identical (and locked by
 * the characterization tests).
 */
function parseScalar(value: string, opts: ScalarOptions, depth: number): unknown {
  if (depth > MAX_YAML_DEPTH) throw new Error('YAML nesting too deep')
  const trimmed = value.trim()
  if (trimmed === '' || trimmed === 'null' || trimmed === '~') return null
  if (trimmed === 'true' || trimmed === 'yes') return true
  if (trimmed === 'false' || trimmed === 'no') return false
  if (trimmed === '[]') return []
  if (trimmed === '{}') return {}

  // Quoted string
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    let unquoted = trimmed.slice(1, -1).replace(/\\n/g, '\n')
    if (opts.unescapeTabs) unquoted = unquoted.replace(/\\t/g, '\t')
    return unquoted.replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  }

  // Number
  const numberRe = opts.allowExponent
    ? /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/
    : /^-?\d+(\.\d+)?$/
  if (numberRe.test(trimmed)) {
    return Number(trimmed)
  }
  if (/^0x[0-9a-fA-F]+$/.test(trimmed)) {
    return parseInt(trimmed, 16)
  }
  if (/^0o[0-7]+$/.test(trimmed)) {
    return parseInt(trimmed.slice(2), 8)
  }

  // Inline array [a, b, c]
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return []
    return inner.split(',').map((item) => parseScalar(item.trim(), opts, depth + 1))
  }

  // Inline object {a: 1, b: 2}
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return {}
    const obj: Record<string, unknown> = {}
    for (const part of inner.split(',')) {
      const colonIdx = part.indexOf(':')
      if (colonIdx === -1) continue
      let key = part.slice(0, colonIdx).trim()
      if (opts.dequoteKeys) key = key.replace(/^["']|["']$/g, '')
      const val = part.slice(colonIdx + 1).trim()
      assignKey(obj, key, parseScalar(val, opts, depth + 1))
    }
    return obj
  }

  return trimmed
}

/**
 * JsonToYaml's scalar parser. Integer/decimal numbers only; no `\t` unescape;
 * inline-object keys are NOT de-quoted.
 */
export function parseYamlValue(value: string, depth: number = 0): unknown {
  return parseScalar(value, BASIC_SCALAR, depth)
}

/**
 * YamlToJson's scalar parser. Adds `\t` unescape, exponent numbers, and
 * de-quotes inline-object keys.
 */
export function parseYamlValueExtended(value: string, depth: number = 0): unknown {
  return parseScalar(value, EXTENDED_SCALAR, depth)
}

// ---------------------------------------------------------------------------
// Line parsing
// ---------------------------------------------------------------------------

/**
 * Parsed YAML line. The block parser only reads `indent`, `key`, `value` and
 * `isArrayItem`; the original per-tool `raw` / `lineNumber` fields were never
 * consumed downstream and are therefore omitted here.
 */
export interface YamlLine {
  indent: number
  key: string | null
  value: string
  isArrayItem: boolean
}

/** Per-tool line-parsing differences, injected as flags. */
interface LineOptions {
  /** Strip ` #`-delimited inline comments outside quotes (extended only). */
  stripComments: boolean
  /** Treat a bare `-` line as an empty array item (extended only). */
  allowBareDash: boolean
  /** Strip surrounding quotes from keys (extended only). */
  dequoteKeys: boolean
}

const BASIC_LINES: LineOptions = { stripComments: false, allowBareDash: false, dequoteKeys: false }
const EXTENDED_LINES: LineOptions = { stripComments: true, allowBareDash: true, dequoteKeys: true }

/**
 * Shared line tokenizer. The two tools differ only in the LineOptions flags;
 * tokenization is otherwise identical (and locked by the characterization
 * tests).
 */
function parseLines(yaml: string, opts: LineOptions): YamlLine[] {
  const lines = yaml.split('\n')
  const result: YamlLine[] = []

  for (const raw of lines) {
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue

    const indentMatch = raw.match(/^(\s*)/)
    const indent = indentMatch ? indentMatch[1].length : 0
    let content = raw.trim()

    // Remove inline comments (not inside quotes)
    if (opts.stripComments) {
      const commentIdx = content.indexOf(' #')
      if (commentIdx > 0) {
        const before = content.slice(0, commentIdx)
        const quoteCount = (before.match(/"/g) || []).length + (before.match(/'/g) || []).length
        if (quoteCount % 2 === 0) {
          content = before.trimEnd()
        }
      }
    }

    const isArrayItem = content.startsWith('- ')
    if (isArrayItem) {
      content = content.slice(2)
    } else if (opts.allowBareDash && content === '-') {
      result.push({ indent, key: null, value: '', isArrayItem: true })
      continue
    }

    const colonIdx = content.indexOf(':')
    if (colonIdx > 0 && !content.startsWith('"') && !content.startsWith("'")) {
      let key = content.slice(0, colonIdx).trim()
      if (opts.dequoteKeys) key = key.replace(/^["']|["']$/g, '')
      const value = content.slice(colonIdx + 1).trim()
      result.push({ indent, key, value, isArrayItem })
    } else {
      result.push({ indent, key: null, value: content, isArrayItem })
    }
  }

  return result
}

/**
 * JsonToYaml's line parser. No inline-comment stripping, no bare `-` handling,
 * keys are NOT de-quoted.
 */
export function parseYamlLines(yaml: string): YamlLine[] {
  return parseLines(yaml, BASIC_LINES)
}

/**
 * YamlToJson's line parser. Strips inline comments (outside quotes), supports
 * bare `-` array items, and de-quotes keys.
 */
export function parseYamlLinesExtended(yaml: string): YamlLine[] {
  return parseLines(yaml, EXTENDED_LINES)
}

// ---------------------------------------------------------------------------
// Shared block parsing recursion (byte-identical between both tools)
// ---------------------------------------------------------------------------

/**
 * Recursively parses pre-tokenized YAML lines into a JS value. This is the
 * large recursion that was duplicated verbatim in both tools. The scalar
 * parser is injected so each tool keeps its own value-parsing semantics.
 */
function parseYamlBlocks(
  lines: YamlLine[],
  scalarParser: (value: string) => unknown
): unknown {
  function parseBlock(
    startIdx: number,
    parentIndent: number,
    depth: number
  ): { value: unknown; nextIdx: number } {
    if (depth > MAX_YAML_DEPTH) throw new Error('YAML nesting too deep')
    if (startIdx >= lines.length) return { value: null, nextIdx: startIdx }

    const line = lines[startIdx]

    // Determine if this level is an array or object
    if (line.isArrayItem) {
      const arr: unknown[] = []
      let idx = startIdx
      while (idx < lines.length && lines[idx].indent >= parentIndent) {
        const current = lines[idx]
        if (current.indent < parentIndent) break
        if (current.indent === parentIndent && !current.isArrayItem) break
        if (current.indent > parentIndent) {
          idx++
          continue
        }

        if (current.isArrayItem) {
          if (current.key !== null) {
            // Array item that starts an object
            const obj: Record<string, unknown> = {}
            if (current.value) {
              assignKey(obj, current.key, scalarParser(current.value))
            } else {
              const sub = parseBlock(idx + 1, current.indent + 2, depth + 1)
              assignKey(obj, current.key, sub.value)
              // Check for more keys at same level
              let nextIdx = sub.nextIdx
              while (
                nextIdx < lines.length &&
                !lines[nextIdx].isArrayItem &&
                lines[nextIdx].indent > parentIndent
              ) {
                const nextLine = lines[nextIdx]
                if (nextLine.key !== null) {
                  if (nextLine.value) {
                    assignKey(obj, nextLine.key, scalarParser(nextLine.value))
                    nextIdx++
                  } else {
                    const innerSub = parseBlock(nextIdx + 1, nextLine.indent + 2, depth + 1)
                    assignKey(obj, nextLine.key, innerSub.value)
                    nextIdx = innerSub.nextIdx
                  }
                } else {
                  nextIdx++
                }
              }
              arr.push(obj)
              idx = nextIdx
              continue
            }
            arr.push(obj)
          } else {
            arr.push(scalarParser(current.value))
          }
          idx++
        } else {
          idx++
        }
      }
      return { value: arr, nextIdx: idx }
    }

    // Object
    const obj: Record<string, unknown> = {}
    let idx = startIdx
    while (idx < lines.length) {
      const current = lines[idx]
      if (current.indent < parentIndent) break
      if (current.indent > parentIndent) {
        idx++
        continue
      }

      if (current.key !== null) {
        if (current.value) {
          assignKey(obj, current.key, scalarParser(current.value))
          idx++
        } else {
          const sub = parseBlock(idx + 1, current.indent + 2, depth + 1)
          assignKey(obj, current.key, sub.value)
          idx = sub.nextIdx
        }
      } else {
        idx++
      }
    }
    return { value: obj, nextIdx: idx }
  }

  const { value } = parseBlock(0, lines[0].indent, 0)
  return value
}

// ---------------------------------------------------------------------------
// YAML -> JSON entry points
// ---------------------------------------------------------------------------

/**
 * JsonToYaml's YAML->value entry point. Returns `null` for empty / no-content
 * input (does not throw).
 */
export function parseYaml(yaml: string): unknown {
  const lines = parseYamlLines(yaml)
  if (lines.length === 0) return null
  return parseYamlBlocks(lines, parseYamlValue)
}

/**
 * YamlToJson's YAML->value entry point. Throws on empty / no-content input and
 * uses the extended scalar + line parsers (comment stripping, etc.).
 */
export function parseYamlExtended(yaml: string): unknown {
  const trimmed = yaml.trim()
  if (!trimmed) throw new Error('Empty YAML input')

  const lines = parseYamlLinesExtended(trimmed)
  if (lines.length === 0) throw new Error('No valid YAML content found')

  return parseYamlBlocks(lines, parseYamlValueExtended)
}
