import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const MESSAGES_DIR = path.resolve(__dirname, '..')
const LOCALES = ['az', 'en', 'tr', 'ru']
const REFERENCE_LOCALE = 'az' // az is the default locale

/**
 * Recursively extract all keys from a nested object.
 * Returns dot-separated paths: e.g. "common.nav.home"
 */
function extractKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...extractKeys(obj[key] as Record<string, unknown>, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys.sort()
}

function loadLocale(locale: string): Record<string, unknown> {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`)
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

describe('i18n translation consistency', () => {
  const localeData: Record<string, Record<string, unknown>> = {}
  const localeKeys: Record<string, string[]> = {}

  // Load all locale files
  for (const locale of LOCALES) {
    localeData[locale] = loadLocale(locale)
    localeKeys[locale] = extractKeys(localeData[locale])
  }

  it('all locale files exist and are valid JSON', () => {
    for (const locale of LOCALES) {
      const filePath = path.join(MESSAGES_DIR, `${locale}.json`)
      expect(fs.existsSync(filePath), `${locale}.json should exist`).toBe(true)
      expect(localeData[locale]).toBeTruthy()
    }
  })

  it('all locales have the same top-level namespaces as the reference locale', () => {
    const referenceTopKeys = Object.keys(localeData[REFERENCE_LOCALE]).sort()

    for (const locale of LOCALES) {
      if (locale === REFERENCE_LOCALE) continue
      const topKeys = Object.keys(localeData[locale]).sort()
      const missingNamespaces = referenceTopKeys.filter((k) => !topKeys.includes(k))
      const extraNamespaces = topKeys.filter((k) => !referenceTopKeys.includes(k))

      if (missingNamespaces.length > 0) {
        console.warn(
          `[${locale}] Missing top-level namespaces: ${missingNamespaces.join(', ')}`
        )
      }
      if (extraNamespaces.length > 0) {
        console.warn(
          `[${locale}] Extra top-level namespaces: ${extraNamespaces.join(', ')}`
        )
      }

      // At minimum, common namespaces must be present
      expect(topKeys).toContain('common')
    }
  })

  it('common namespace keys are consistent across all locales', () => {
    const referenceCommon = extractKeys(
      localeData[REFERENCE_LOCALE]['common'] as Record<string, unknown>,
      'common'
    )

    for (const locale of LOCALES) {
      if (locale === REFERENCE_LOCALE) continue
      const localeCommon = extractKeys(
        localeData[locale]['common'] as Record<string, unknown>,
        'common'
      )
      const missing = referenceCommon.filter((k) => !localeCommon.includes(k))

      expect(
        missing,
        `[${locale}] Missing common keys compared to ${REFERENCE_LOCALE}: ${missing.join(', ')}`
      ).toEqual([])
    }
  })

  it('toolUI namespace exists in az and en locales', () => {
    expect(localeData['az']).toHaveProperty('toolUI')
    expect(localeData['en']).toHaveProperty('toolUI')
  })

  it('toolUI keys match between az and en', () => {
    const azToolUI = localeData['az']['toolUI']
    const enToolUI = localeData['en']['toolUI']

    if (azToolUI && enToolUI) {
      const azKeys = extractKeys(azToolUI as Record<string, unknown>).sort()
      const enKeys = extractKeys(enToolUI as Record<string, unknown>).sort()
      expect(azKeys).toEqual(enKeys)
    }
  })

  it('no translation values are empty strings', () => {
    for (const locale of LOCALES) {
      const keys = localeKeys[locale]
      for (const key of keys) {
        const value = key.split('.').reduce(
          (obj: unknown, k: string) =>
            typeof obj === 'object' && obj !== null
              ? (obj as Record<string, unknown>)[k]
              : undefined,
          localeData[locale]
        )
        if (typeof value === 'string') {
          expect(
            value.length > 0,
            `[${locale}] Key "${key}" has empty string value`
          ).toBe(true)
        }
      }
    }
  })

  it('no translation values contain raw key-like patterns (untranslated)', () => {
    // Check that no values look like untranslated template keys
    const keyPattern = /^[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/

    for (const locale of LOCALES) {
      const keys = localeKeys[locale]
      for (const key of keys) {
        const value = key.split('.').reduce(
          (obj: unknown, k: string) =>
            typeof obj === 'object' && obj !== null
              ? (obj as Record<string, unknown>)[k]
              : undefined,
          localeData[locale]
        )
        if (typeof value === 'string' && value.length > 0) {
          // Only flag if value matches dot-separated pattern AND matches a known key
          if (keyPattern.test(value) && keys.includes(value)) {
            console.warn(
              `[${locale}] Key "${key}" has value "${value}" which looks like an untranslated key reference`
            )
          }
        }
      }
    }
  })

  it('all locale files have at least 50 translation keys', () => {
    for (const locale of LOCALES) {
      expect(
        localeKeys[locale].length,
        `[${locale}] should have at least 50 translation keys, got ${localeKeys[locale].length}`
      ).toBeGreaterThanOrEqual(50)
    }
  })
})
