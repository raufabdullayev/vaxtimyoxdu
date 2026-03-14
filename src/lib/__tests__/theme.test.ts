import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// We need to test with a real-ish localStorage, so mock it
const store: Record<string, string> = {}
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { store[key] = value }),
  removeItem: vi.fn((key: string) => { delete store[key] }),
  clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]) }),
  length: 0,
  key: vi.fn(() => null),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true })

import { getTheme, setTheme, getResolvedTheme, themeBlockingScript } from '../theme'

describe('theme utilities', () => {
  beforeEach(() => {
    Object.keys(store).forEach(k => delete store[k])
    vi.clearAllMocks()
    document.documentElement.classList.remove('dark')
  })

  describe('getTheme', () => {
    it('returns "system" when nothing is stored', () => {
      expect(getTheme()).toBe('system')
    })

    it('returns "dark" when stored', () => {
      store['theme-preference'] = 'dark'
      expect(getTheme()).toBe('dark')
    })

    it('returns "light" when stored', () => {
      store['theme-preference'] = 'light'
      expect(getTheme()).toBe('light')
    })

    it('returns "system" when stored', () => {
      store['theme-preference'] = 'system'
      expect(getTheme()).toBe('system')
    })

    it('returns "system" for invalid stored value', () => {
      store['theme-preference'] = 'invalid'
      expect(getTheme()).toBe('system')
    })
  })

  describe('setTheme', () => {
    it('saves theme to localStorage', () => {
      setTheme('dark')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme-preference', 'dark')
    })

    it('adds dark class when set to dark', () => {
      setTheme('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('removes dark class when set to light', () => {
      document.documentElement.classList.add('dark')
      setTheme('light')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('getResolvedTheme', () => {
    it('returns "light" for light theme', () => {
      expect(getResolvedTheme('light')).toBe('light')
    })

    it('returns "dark" for dark theme', () => {
      expect(getResolvedTheme('dark')).toBe('dark')
    })

    it('returns based on media query for system theme', () => {
      const result = getResolvedTheme('system')
      expect(['light', 'dark']).toContain(result)
    })
  })

  describe('themeBlockingScript', () => {
    it('is a non-empty string', () => {
      expect(typeof themeBlockingScript).toBe('string')
      expect(themeBlockingScript.length).toBeGreaterThan(0)
    })

    it('references theme-preference localStorage key', () => {
      expect(themeBlockingScript).toContain('theme-preference')
    })

    it('references prefers-color-scheme media query', () => {
      expect(themeBlockingScript).toContain('prefers-color-scheme')
    })

    it('adds dark class to documentElement', () => {
      expect(themeBlockingScript).toContain('classList.add')
    })
  })
})
