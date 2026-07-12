import { describe, it, expect } from 'vitest'
import {
  valueToYaml,
  parseYamlValue,
  parseYamlValueExtended,
  parseYamlLines,
  parseYamlLinesExtended,
  parseYaml,
  parseYamlExtended,
} from '../yaml-parser'

/**
 * Characterization suite for the shared YAML engine.
 *
 * These tests lock the CURRENT observable behavior of every exported function
 * (the module header claims "byte-identical" / "EXACT behavior preserved" but
 * nothing enforced it). They intentionally document quirks (e.g. unterminated
 * brackets returning the raw string) so the later dedup/merge refactor cannot
 * silently change any tool's output. Divergences between the "basic"
 * (JsonToYaml) and "extended" (YamlToJson) variants are asserted explicitly.
 */

describe('valueToYaml', () => {
  it('serializes scalars', () => {
    expect(valueToYaml(null)).toBe('null')
    expect(valueToYaml(undefined)).toBe('null')
    expect(valueToYaml(true)).toBe('true')
    expect(valueToYaml(false)).toBe('false')
    expect(valueToYaml(42)).toBe('42')
    expect(valueToYaml(-3.14)).toBe('-3.14')
  })

  it('leaves plain strings unquoted but quotes ambiguous / special ones', () => {
    expect(valueToYaml('hello')).toBe('hello')
    // number-like strings get quoted so they round-trip as strings
    expect(valueToYaml('123')).toBe('"123"')
    // reserved words get quoted
    expect(valueToYaml('true')).toBe('"true"')
    expect(valueToYaml('null')).toBe('"null"')
    expect(valueToYaml('yes')).toBe('"yes"')
    // YAML-significant characters force quoting
    expect(valueToYaml('has: colon')).toBe('"has: colon"')
    expect(valueToYaml('a#b')).toBe('"a#b"')
    // leading/trailing whitespace forces quoting
    expect(valueToYaml(' padded ')).toBe('" padded "')
  })

  it('escapes backslashes, quotes and newlines inside quoted strings', () => {
    expect(valueToYaml('line1\nline2')).toBe('"line1\\nline2"')
    expect(valueToYaml('a"b')).toBe('"a\\"b"')
  })

  it('serializes flat objects', () => {
    expect(valueToYaml({ name: 'Alice', age: 30 })).toBe('name: Alice\nage: 30')
  })

  it('serializes nested objects with 2-space indentation', () => {
    expect(valueToYaml({ server: { host: 'localhost', port: 8080 } })).toBe(
      'server:\n  host: localhost\n  port: 8080'
    )
  })

  it('serializes arrays of scalars', () => {
    expect(valueToYaml(['apple', 'banana', 'cherry'])).toBe('- apple\n- banana\n- cherry')
  })

  it('serializes empty collections', () => {
    expect(valueToYaml({})).toBe('{}')
    expect(valueToYaml([])).toBe('[]')
  })

  it('quotes keys containing colon, hash or space', () => {
    expect(valueToYaml({ 'a:b': 1 })).toBe('"a:b": 1')
    expect(valueToYaml({ 'a b': 1 })).toBe('"a b": 1')
  })
})

describe('parseYamlValue (basic scalar parser)', () => {
  it('parses null-ish, booleans and empty collections', () => {
    expect(parseYamlValue('null')).toBeNull()
    expect(parseYamlValue('~')).toBeNull()
    expect(parseYamlValue('')).toBeNull()
    expect(parseYamlValue('true')).toBe(true)
    expect(parseYamlValue('yes')).toBe(true)
    expect(parseYamlValue('false')).toBe(false)
    expect(parseYamlValue('no')).toBe(false)
    expect(parseYamlValue('[]')).toEqual([])
    expect(parseYamlValue('{}')).toEqual({})
  })

  it('parses quoted strings with escapes', () => {
    expect(parseYamlValue('"hello"')).toBe('hello')
    expect(parseYamlValue("'hello'")).toBe('hello')
    expect(parseYamlValue('"a\\nb"')).toBe('a\nb')
  })

  it('parses integer, decimal, hex and octal numbers', () => {
    expect(parseYamlValue('42')).toBe(42)
    expect(parseYamlValue('-3.14')).toBe(-3.14)
    expect(parseYamlValue('0xFF')).toBe(255)
    expect(parseYamlValue('0o17')).toBe(15)
  })

  it('does NOT parse exponent numbers (basic quirk)', () => {
    expect(parseYamlValue('1e3')).toBe('1e3')
  })

  it('parses inline arrays and objects', () => {
    expect(parseYamlValue('[a, b, c]')).toEqual(['a', 'b', 'c'])
    expect(parseYamlValue('{a: 1, b: 2}')).toEqual({ a: 1, b: 2 })
  })

  it('does NOT de-quote inline-object keys (basic quirk)', () => {
    expect(parseYamlValue('{"a": 1}')).toEqual({ '"a"': 1 })
  })

  it('returns the raw string for unterminated brackets (documented quirk)', () => {
    expect(parseYamlValue('[a, b')).toBe('[a, b')
    expect(parseYamlValue('{a: 1')).toBe('{a: 1')
  })

  it('returns the raw string for plain unquoted text', () => {
    expect(parseYamlValue('plain text')).toBe('plain text')
  })
})

describe('parseYamlValueExtended (extended scalar parser)', () => {
  it('parses exponent numbers (extended-only)', () => {
    expect(parseYamlValueExtended('1e3')).toBe(1000)
    expect(parseYamlValueExtended('-2.5E2')).toBe(-250)
  })

  it('unescapes tabs inside quoted strings (extended-only)', () => {
    expect(parseYamlValueExtended('"a\\tb"')).toBe('a\tb')
    // basic does not unescape tabs — the backslash survives
    expect(parseYamlValue('"a\\tb"')).toBe('a\\tb')
  })

  it('de-quotes inline-object keys (extended-only)', () => {
    expect(parseYamlValueExtended('{"a": 1}')).toEqual({ a: 1 })
  })

  it('shares the null/bool/hex/octal/inline behavior with basic', () => {
    expect(parseYamlValueExtended('null')).toBeNull()
    expect(parseYamlValueExtended('0xFF')).toBe(255)
    expect(parseYamlValueExtended('[a, b]')).toEqual(['a', 'b'])
    expect(parseYamlValueExtended('{a: 1')).toBe('{a: 1')
  })
})

describe('parseYamlLines (basic line parser)', () => {
  it('skips blank lines and comments, records indent/key/value', () => {
    expect(parseYamlLines('a: 1\n\n# comment\nb: 2')).toEqual([
      { indent: 0, key: 'a', value: '1', isArrayItem: false },
      { indent: 0, key: 'b', value: '2', isArrayItem: false },
    ])
  })

  it('does NOT strip inline comments (basic quirk)', () => {
    expect(parseYamlLines('a: 1 # note')).toEqual([
      { indent: 0, key: 'a', value: '1 # note', isArrayItem: false },
    ])
  })

  it('detects "- " array items but treats bare "-" as a keyless value', () => {
    expect(parseYamlLines('- x')).toEqual([
      { indent: 0, key: null, value: 'x', isArrayItem: true },
    ])
    expect(parseYamlLines('-')).toEqual([
      { indent: 0, key: null, value: '-', isArrayItem: false },
    ])
  })
})

describe('parseYamlLinesExtended (extended line parser)', () => {
  it('strips inline comments outside quotes (extended-only)', () => {
    expect(parseYamlLinesExtended('a: 1 # note')).toEqual([
      { indent: 0, key: 'a', value: '1', isArrayItem: false },
    ])
  })

  it('treats a bare "-" as an empty array item (extended-only)', () => {
    expect(parseYamlLinesExtended('-')).toEqual([
      { indent: 0, key: null, value: '', isArrayItem: true },
    ])
  })
})

describe('parseYaml (basic entry point)', () => {
  it('returns null for empty / comment-only input (does not throw)', () => {
    expect(parseYaml('')).toBeNull()
    expect(parseYaml('   ')).toBeNull()
    expect(parseYaml('# just a comment')).toBeNull()
  })

  it('parses flat key/value blocks', () => {
    expect(parseYaml('name: Alice\nage: 30')).toEqual({ name: 'Alice', age: 30 })
  })

  it('parses block arrays under a key', () => {
    expect(parseYaml('fruits:\n  - apple\n  - banana\n  - cherry')).toEqual({
      fruits: ['apple', 'banana', 'cherry'],
    })
  })

  it('round-trips representative objects through valueToYaml', () => {
    const value = { name: 'Alice', age: 30, active: true }
    expect(parseYaml(valueToYaml(value))).toEqual(value)
  })
})

describe('parseYamlExtended (extended entry point)', () => {
  it('throws on empty input', () => {
    expect(() => parseYamlExtended('')).toThrow('Empty YAML input')
    expect(() => parseYamlExtended('   ')).toThrow('Empty YAML input')
  })

  it('throws on comment-only / no-content input', () => {
    expect(() => parseYamlExtended('# only a comment')).toThrow('No valid YAML content found')
  })

  it('parses key/value blocks with comment stripping', () => {
    expect(parseYamlExtended('name: Alice # owner\nage: 30')).toEqual({
      name: 'Alice',
      age: 30,
    })
  })

  it('parses block arrays', () => {
    expect(parseYamlExtended('items:\n  - one\n  - two\n  - three')).toEqual({
      items: ['one', 'two', 'three'],
    })
  })
})

describe('safety guards', () => {
  it('drops __proto__ / constructor / prototype keys in block parsing', () => {
    // Keys that could re-parent the object are silently skipped; the object
    // stays empty (own-property-wise) and nothing leaks to Object.prototype.
    expect(parseYaml('__proto__:\n  polluted: 1')).toEqual({})
    expect(parseYaml('constructor: bad')).toEqual({})
    expect(parseYamlExtended('prototype: x')).toEqual({})
    // Global prototype must remain clean.
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
    expect((Object.prototype as Record<string, unknown>).polluted).toBeUndefined()
  })

  it('drops unsafe keys in inline objects (both scalar parsers)', () => {
    expect(parseYamlValue('{__proto__: 1}')).toEqual({})
    expect(parseYamlValueExtended('{"__proto__": 1}')).toEqual({})
    expect(parseYamlValue('{constructor: 1, a: 2}')).toEqual({ a: 2 })
  })

  it('throws instead of overflowing the stack on pathological nesting', () => {
    const deepInline = '['.repeat(250) + ']'.repeat(250)
    expect(() => parseYamlValue(deepInline)).toThrow('YAML nesting too deep')
    expect(() => parseYamlValueExtended(deepInline)).toThrow('YAML nesting too deep')

    const deepBlock = Array.from({ length: 250 }, (_, i) => '  '.repeat(i) + `k${i}:`).join('\n')
    expect(() => parseYaml(deepBlock)).toThrow('YAML nesting too deep')
  })
})
