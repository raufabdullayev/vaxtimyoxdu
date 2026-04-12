import { test, expect } from '@playwright/test'

test.describe('Performance Smoke Tests', () => {
  test('homepage loads within 10 seconds', async ({ page }) => {
    const start = Date.now()
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const loadTime = Date.now() - start

    expect(loadTime).toBeLessThan(10_000)
  })

  test('tools page loads within 10 seconds', async ({ page }) => {
    const start = Date.now()
    await page.goto('/tools', { waitUntil: 'domcontentloaded' })
    const loadTime = Date.now() - start

    expect(loadTime).toBeLessThan(10_000)
  })

  test('tool detail page loads within 10 seconds', async ({ page }) => {
    const start = Date.now()
    await page.goto('/tools/json-formatter', { waitUntil: 'domcontentloaded' })
    const loadTime = Date.now() - start

    expect(loadTime).toBeLessThan(10_000)
  })

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForTimeout(2000)

    // Filter out known non-critical errors (ads, third-party scripts)
    const criticalErrors = errors.filter(
      (e) => !e.includes('adsbygoogle') && !e.includes('googletag') && !e.includes('favicon')
    )
    expect(criticalErrors).toEqual([])
  })

  test('no console errors on tool page', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/tools/base64-encode-decode')
    await page.waitForTimeout(2000)

    const criticalErrors = errors.filter(
      (e) => !e.includes('adsbygoogle') && !e.includes('googletag') && !e.includes('favicon')
    )
    expect(criticalErrors).toEqual([])
  })

  test('images have alt attributes', async ({ page }) => {
    await page.goto('/')

    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      // All images should have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull()
    }
  })
})
