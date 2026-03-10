import { describe, it, expect } from 'vitest'
import { ADSENSE_CLIENT_ID, AD_SLOTS, isAdsenseEnabled } from '@/lib/ads/adsense'

// ---------------------------------------------------------------------------
// ADSENSE_CLIENT_ID
// ---------------------------------------------------------------------------
describe('ADSENSE_CLIENT_ID', () => {
  it('should be a string', () => {
    expect(typeof ADSENSE_CLIENT_ID).toBe('string')
  })

  it('should be empty string initially (waiting for approval)', () => {
    expect(ADSENSE_CLIENT_ID).toBe('')
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

  it('should have all slots as empty strings initially (pending approval)', () => {
    for (const [key, value] of Object.entries(AD_SLOTS)) {
      expect(value, `AD_SLOTS.${key} should be empty`).toBe('')
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

  it('should return false when ADSENSE_CLIENT_ID is empty', () => {
    // Currently ADSENSE_CLIENT_ID is empty string
    expect(isAdsenseEnabled()).toBe(false)
  })

  it('should return false because ads are not yet approved', () => {
    // Reflects the current production state
    expect(isAdsenseEnabled()).toBe(false)
  })
})
