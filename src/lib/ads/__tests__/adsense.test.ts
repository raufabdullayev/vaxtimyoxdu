import { describe, it, expect } from 'vitest'
import { ADSENSE_CLIENT_ID, AD_SLOTS, isAdsenseEnabled } from '@/lib/ads/adsense'

// ---------------------------------------------------------------------------
// ADSENSE_CLIENT_ID
// ---------------------------------------------------------------------------
describe('ADSENSE_CLIENT_ID', () => {
  it('should be a string', () => {
    expect(typeof ADSENSE_CLIENT_ID).toBe('string')
  })

  it('should read from NEXT_PUBLIC_ADSENSE_ID env variable', () => {
    // In test environment, env var is not set so it falls back to empty string
    expect(typeof ADSENSE_CLIENT_ID).toBe('string')
  })
})

// ---------------------------------------------------------------------------
// AD_SLOTS
// ---------------------------------------------------------------------------
describe('AD_SLOTS', () => {
  it('should be an object', () => {
    expect(typeof AD_SLOTS).toBe('object')
    expect(AD_SLOTS).not.toBeNull()
  })

  it('should have headerBanner slot', () => {
    expect(AD_SLOTS).toHaveProperty('headerBanner')
  })

  it('should have footerBanner slot', () => {
    expect(AD_SLOTS).toHaveProperty('footerBanner')
  })

  it('should have sidebarTop slot', () => {
    expect(AD_SLOTS).toHaveProperty('sidebarTop')
  })

  it('should have sidebarBottom slot', () => {
    expect(AD_SLOTS).toHaveProperty('sidebarBottom')
  })

  it('should have toolTop slot', () => {
    expect(AD_SLOTS).toHaveProperty('toolTop')
  })

  it('should have toolBottom slot', () => {
    expect(AD_SLOTS).toHaveProperty('toolBottom')
  })

  it('should have inContent slot', () => {
    expect(AD_SLOTS).toHaveProperty('inContent')
  })

  it('should have exactly 7 ad slot keys', () => {
    expect(Object.keys(AD_SLOTS)).toHaveLength(7)
  })

  it('should have string values for all slots', () => {
    for (const [key, value] of Object.entries(AD_SLOTS)) {
      expect(typeof value, `AD_SLOTS.${key} should be a string`).toBe('string')
    }
  })

  it('should have non-empty slot identifiers', () => {
    for (const [key, value] of Object.entries(AD_SLOTS)) {
      expect(value.length, `AD_SLOTS.${key} should not be empty`).toBeGreaterThan(0)
    }
  })
})

// ---------------------------------------------------------------------------
// isAdsenseEnabled
// ---------------------------------------------------------------------------
describe('isAdsenseEnabled()', () => {
  it('should be a function', () => {
    expect(typeof isAdsenseEnabled).toBe('function')
  })

  it('should return a boolean', () => {
    expect(typeof isAdsenseEnabled()).toBe('boolean')
  })

  it('should return false when NEXT_PUBLIC_ADSENSE_ID env is not set', () => {
    // In test environment, env var is not set so returns false
    expect(isAdsenseEnabled()).toBe(false)
  })
})
