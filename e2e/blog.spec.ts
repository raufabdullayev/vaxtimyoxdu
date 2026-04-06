import { test, expect } from '@playwright/test'

test.describe('Blog', () => {
  test('blog page loads and shows articles', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.locator('h1')).toBeVisible()
    // Should have article links
    const links = page.locator('a[href*="/blog/"]')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('blog page has meta description', async ({ page }) => {
    await page.goto('/blog')
    const meta = page.locator('meta[name="description"]')
    await expect(meta).toHaveAttribute('content', /.+/)
  })

  test('blog page works in English', async ({ page }) => {
    await page.goto('/en/blog')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('blog page works in Turkish', async ({ page }) => {
    await page.goto('/tr/blog')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('blog page works in Russian', async ({ page }) => {
    await page.goto('/ru/blog')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('blog article page loads correctly', async ({ page }) => {
    await page.goto('/blog')
    // Click the first blog link
    const firstLink = page.locator('a[href*="/blog/"]').first()
    const href = await firstLink.getAttribute('href')
    if (href) {
      await page.goto(href)
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('blog article has breadcrumb', async ({ page }) => {
    await page.goto('/blog')
    const firstLink = page.locator('a[href*="/blog/"]').first()
    const href = await firstLink.getAttribute('href')
    if (href) {
      await page.goto(href)
      const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
      await expect(breadcrumb).toBeVisible()
    }
  })
})
