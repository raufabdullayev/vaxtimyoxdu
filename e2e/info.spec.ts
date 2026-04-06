import { test, expect } from '@playwright/test'

test.describe('Info (News) Pages', () => {
  test('info page loads and shows articles', async ({ page }) => {
    await page.goto('/info')
    await expect(page.locator('h1')).toBeVisible()
    const links = page.locator('a[href*="/info/"]')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('info page has meta description', async ({ page }) => {
    await page.goto('/info')
    const meta = page.locator('meta[name="description"]')
    await expect(meta).toHaveAttribute('content', /.+/)
  })

  test('info page works in English', async ({ page }) => {
    await page.goto('/en/info')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('info page works in Turkish', async ({ page }) => {
    await page.goto('/tr/info')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('info page works in Russian', async ({ page }) => {
    await page.goto('/ru/info')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('info article page loads correctly', async ({ page }) => {
    await page.goto('/info')
    const firstLink = page.locator('a[href*="/info/"]').first()
    const href = await firstLink.getAttribute('href')
    if (href) {
      await page.goto(href)
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('info article has breadcrumb', async ({ page }) => {
    await page.goto('/info')
    const firstLink = page.locator('a[href*="/info/"]').first()
    const href = await firstLink.getAttribute('href')
    if (href) {
      await page.goto(href)
      const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
      await expect(breadcrumb).toBeVisible()
    }
  })
})
