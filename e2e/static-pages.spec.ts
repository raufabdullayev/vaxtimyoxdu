import { test, expect } from '@playwright/test'

test.describe('Static Pages', () => {
  test('about page loads', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('about page in English', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('about page in Turkish', async ({ page }) => {
    await page.goto('/tr/about')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('about page in Russian', async ({ page }) => {
    await page.goto('/ru/about')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('privacy page loads', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('terms page loads', async ({ page }) => {
    await page.goto('/terms')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('privacy page in English', async ({ page }) => {
    await page.goto('/en/privacy')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('terms page in English', async ({ page }) => {
    await page.goto('/en/terms')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('about page has meta description', async ({ page }) => {
    await page.goto('/about')
    const meta = page.locator('meta[name="description"]')
    await expect(meta).toHaveAttribute('content', /.+/)
  })

  test('privacy page has meta description', async ({ page }) => {
    await page.goto('/privacy')
    const meta = page.locator('meta[name="description"]')
    await expect(meta).toHaveAttribute('content', /.+/)
  })
})
