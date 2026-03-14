import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { locales, defaultLocale } from '@/i18n/config'

type MessageObject = Record<string, unknown>

/**
 * Recursively collect all leaf-key paths from a nested object.
 * e.g. { a: { b: 'x' } } => ['a.b']
 */
function getAllKeys(obj: MessageObject, prefix = ''): string[] {
  const keys: string[] = []
  for (const k of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    const val = obj[k]
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      keys.push(...getAllKeys(val as MessageObject, path))
    } else {
      keys.push(path)
    }
  }
  return keys.sort()
}

/**
 * Get all top-level namespace keys.
 */
function getNamespaces(obj: MessageObject): string[] {
  return Object.keys(obj).sort()
}

// Load all locale files
const messagesDir = path.resolve(__dirname, '..', 'messages')
const messages: Record<string, MessageObject> = {}
for (const locale of locales) {
  const filePath = path.join(messagesDir, `${locale}.json`)
  messages[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

const referenceLocale = defaultLocale // 'az' is the source of truth
const referenceKeys = getAllKeys(messages[referenceLocale])
const referenceNamespaces = getNamespaces(messages[referenceLocale])

describe('i18n translation key consistency', () => {
  it('reference locale (az) should have translations', () => {
    expect(referenceKeys.length).toBeGreaterThan(0)
  })

  for (const locale of locales) {
    if (locale === referenceLocale) continue

    describe(`${locale.toUpperCase()} vs ${referenceLocale.toUpperCase()}`, () => {
      it('should have all top-level namespaces', () => {
        const namespaces = getNamespaces(messages[locale])
        const missing = referenceNamespaces.filter((ns) => !namespaces.includes(ns))
        expect(missing).toEqual([])
      })

      it('should not have extra top-level namespaces', () => {
        const namespaces = getNamespaces(messages[locale])
        const extra = namespaces.filter((ns) => !referenceNamespaces.includes(ns))
        expect(extra).toEqual([])
      })

      it('should have all translation keys from reference', () => {
        const localeKeys = new Set(getAllKeys(messages[locale]))
        const missing = referenceKeys.filter((k) => !localeKeys.has(k))
        if (missing.length > 0) {
          console.warn(
            `[i18n] ${locale.toUpperCase()} missing ${missing.length} keys:`,
            missing.slice(0, 10).join(', '),
            missing.length > 10 ? `... and ${missing.length - 10} more` : ''
          )
        }
        expect(missing).toEqual([])
      })

      it('should not have extra keys not in reference', () => {
        const localeKeys = getAllKeys(messages[locale])
        const referenceSet = new Set(referenceKeys)
        const extra = localeKeys.filter((k) => !referenceSet.has(k))
        if (extra.length > 0) {
          console.warn(
            `[i18n] ${locale.toUpperCase()} has ${extra.length} extra keys:`,
            extra.join(', ')
          )
        }
        expect(extra).toEqual([])
      })

      it('should not have empty string values', () => {
        const localeKeys = getAllKeys(messages[locale])
        const empty: string[] = []
        for (const key of localeKeys) {
          const parts = key.split('.')
          let val: unknown = messages[locale]
          for (const part of parts) {
            val = (val as MessageObject)?.[part]
          }
          if (val === '') {
            empty.push(key)
          }
        }
        if (empty.length > 0) {
          console.warn(
            `[i18n] ${locale.toUpperCase()} has ${empty.length} empty values:`,
            empty.slice(0, 10).join(', ')
          )
        }
        expect(empty).toEqual([])
      })
    })
  }

  describe('all locales', () => {
    it('should have valid JSON (no undefined values)', () => {
      for (const locale of locales) {
        const json = JSON.stringify(messages[locale])
        expect(json).toBeDefined()
        expect(() => JSON.parse(json)).not.toThrow()
      }
    })

    it('should all have the same number of top-level namespaces', () => {
      const counts = locales.map((l) => ({
        locale: l,
        count: getNamespaces(messages[l]).length,
      }))
      const expected = counts[0].count
      for (const { locale, count } of counts) {
        expect(count, `${locale} has ${count} namespaces, expected ${expected}`).toBe(expected)
      }
    })
  })
})
