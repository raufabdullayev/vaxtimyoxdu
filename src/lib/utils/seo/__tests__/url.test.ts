import { describe, it, expect } from 'vitest'
import { getLocalizedUrl, generateHreflangAlternates, SITE_URL, SITE_NAME } from '../url'

describe('seo/url', () => {
  describe('constants', () => {
    it('exports correct SITE_URL', () => {
      expect(SITE_URL).toBe('https://vaxtimyoxdu.com')
    })

    it('exports correct SITE_NAME', () => {
      expect(SITE_NAME).toBe('Vaxtim Yoxdu')
    })
  })

  describe('getLocalizedUrl', () => {
    it('returns URL without prefix for default locale (az)', () => {
      expect(getLocalizedUrl('/tools', 'az')).toBe('https://vaxtimyoxdu.com/tools')
    })

    it('returns URL with /en prefix for English locale', () => {
      expect(getLocalizedUrl('/tools', 'en')).toBe('https://vaxtimyoxdu.com/en/tools')
    })

    it('returns URL with /tr prefix for Turkish locale', () => {
      expect(getLocalizedUrl('/about', 'tr')).toBe('https://vaxtimyoxdu.com/tr/about')
    })

    it('returns URL with /ru prefix for Russian locale', () => {
      expect(getLocalizedUrl('/blog', 'ru')).toBe('https://vaxtimyoxdu.com/ru/blog')
    })

    it('handles paths without leading slash', () => {
      expect(getLocalizedUrl('tools', 'en')).toBe('https://vaxtimyoxdu.com/en/tools')
    })

    it('handles root path for default locale', () => {
      expect(getLocalizedUrl('/', 'az')).toBe('https://vaxtimyoxdu.com/')
    })

    it('handles root path for non-default locale', () => {
      expect(getLocalizedUrl('/', 'en')).toBe('https://vaxtimyoxdu.com/en/')
    })
  })

  describe('generateHreflangAlternates', () => {
    it('generates alternates for all locales', () => {
      const result = generateHreflangAlternates('/tools')

      expect(result.languages['az']).toBe('https://vaxtimyoxdu.com/tools')
      expect(result.languages['en']).toBe('https://vaxtimyoxdu.com/en/tools')
      expect(result.languages['tr']).toBe('https://vaxtimyoxdu.com/tr/tools')
      expect(result.languages['ru']).toBe('https://vaxtimyoxdu.com/ru/tools')
    })

    it('sets x-default to az (default locale) variant', () => {
      const result = generateHreflangAlternates('/tools')

      expect(result.languages['x-default']).toBe('https://vaxtimyoxdu.com/tools')
    })

    it('uses current locale for canonical when specified', () => {
      const result = generateHreflangAlternates('/tools', 'en')

      expect(result.canonical).toBe('https://vaxtimyoxdu.com/en/tools')
    })

    it('uses default locale for canonical when not specified', () => {
      const result = generateHreflangAlternates('/tools')

      expect(result.canonical).toBe('https://vaxtimyoxdu.com/tools')
    })
  })
})
