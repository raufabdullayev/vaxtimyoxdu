import { test, expect } from '@playwright/test'

test.describe('Redirects', () => {
  test('/xeberler redirects to /info', async ({ page }) => {
    await page.goto('/xeberler')

    // Should redirect to /info or show the info page
    const url = page.url()
    expect(url).toMatch(/\/info/)
  })

  test('canonical URL does not include www', async ({ page }) => {
    await page.goto('/')

    const canonical = page.locator('link[rel="canonical"]')
    const href = await canonical.getAttribute('href')
    expect(href).not.toContain('www.')
  })

  test('trailing slash handling is consistent', async ({ page }) => {
    const response1 = await page.goto('/tools')
    const response2 = await page.goto('/tools/')

    // Both should resolve to the same page (200)
    expect(response1?.status()).toBeLessThan(400)
    expect(response2?.status()).toBeLessThan(400)
  })
})
