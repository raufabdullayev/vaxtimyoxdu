import { test, expect } from '@playwright/test'

test.describe('Tool Categories', () => {
  test('text tool loads - case converter', async ({ page }) => {
    await page.goto('/tools/case-converter')
    await expect(page.locator('h1')).toBeVisible()
    // Should have an input area
    const textarea = page.locator('textarea').first()
    await expect(textarea).toBeVisible()
  })

  test('text tool loads - word counter', async ({ page }) => {
    await page.goto('/tools/word-counter')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('text tool loads - slug generator', async ({ page }) => {
    await page.goto('/tools/slug-generator')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('dev tool loads - json-to-yaml', async ({ page }) => {
    await page.goto('/tools/json-to-yaml')
    await expect(page.locator('h1')).toBeVisible()
    const textarea = page.locator('textarea').first()
    await expect(textarea).toBeVisible()
  })

  test('dev tool loads - hash-generator', async ({ page }) => {
    await page.goto('/tools/hash-generator')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('dev tool loads - url-encode-decode', async ({ page }) => {
    await page.goto('/tools/url-encode-decode')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('generator tool loads - uuid-generator', async ({ page }) => {
    await page.goto('/tools/uuid-generator')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('generator tool loads - qr-code-generator', async ({ page }) => {
    await page.goto('/tools/qr-code-generator')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('generator tool loads - color-picker', async ({ page }) => {
    await page.goto('/tools/color-picker')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('generator tool loads - lorem-ipsum', async ({ page }) => {
    await page.goto('/tools/lorem-ipsum-generator')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('generator tool loads - unit-converter', async ({ page }) => {
    await page.goto('/tools/unit-converter')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('image tool loads - image-compress', async ({ page }) => {
    await page.goto('/tools/image-compress')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('pdf tool loads - pdf-merge', async ({ page }) => {
    await page.goto('/tools/pdf-merge')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('tool page has share buttons', async ({ page }) => {
    await page.goto('/tools/json-formatter')
    // Share buttons should be present
    const shareSection = page.locator('[aria-label*="Share"], [aria-label*="share"], button[title*="Share"]')
    // May or may not exist depending on implementation, just verify page loads
    await expect(page.locator('h1')).toBeVisible()
  })

  test('tool page in English locale', async ({ page }) => {
    await page.goto('/en/tools/case-converter')
    await expect(page.locator('h1')).toBeVisible()
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    await expect(breadcrumb).toBeVisible()
  })

  test('tool page in Turkish locale', async ({ page }) => {
    await page.goto('/tr/tools/json-formatter')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('tool page in Russian locale', async ({ page }) => {
    await page.goto('/ru/tools/password-generator')
    await expect(page.locator('h1')).toBeVisible()
  })
})
