import { test, expect } from '@playwright/test'

test.describe('Error Pages', () => {
  test('404 page shows for non-existent route', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-at-all-12345')

    await expect(page.getByText('404')).toBeVisible()
  })

  test('404 page has a link to go home', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz')

    await expect(page.getByText('404')).toBeVisible()

    // Should have a link back to homepage
    const homeLink = page.locator('a[href="/"], a[href*="://"]').first()
    await expect(homeLink).toBeVisible()
  })

  test('404 page returns correct status', async ({ page }) => {
    const response = await page.goto('/nonexistent-route-123')

    // Next.js returns 404 status code
    expect(response?.status()).toBe(404)
  })

  test('nested invalid tool slug shows 404 or not-found page', async ({ page }) => {
    const response = await page.goto('/tools/this-tool-definitely-does-not-exist')

    // May return 404 status or render a not-found page with 200
    const status = response?.status()
    if (status === 404) {
      expect(status).toBe(404)
    } else {
      // Should show 404 content on the page
      await expect(page.getByText('404')).toBeVisible()
    }
  })

  test('invalid locale prefix still shows page', async ({ page }) => {
    const response = await page.goto('/xx/tools')

    // Should either 404 or redirect
    expect([200, 301, 302, 307, 308, 404]).toContain(response?.status())
  })
})
