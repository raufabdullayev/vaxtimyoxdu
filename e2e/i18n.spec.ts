import { test, expect } from '@playwright/test'

test.describe('Internationalization (i18n)', () => {
  test('default locale (az) has no URL prefix', async ({ page }) => {
    await page.goto('/')

    // URL should be / with no locale prefix
    expect(page.url()).not.toMatch(/\/az(\/|$)/)
    // Page should contain Azerbaijani content
    await expect(page.locator('h1')).toContainText('Vaxtim')
  })

  test('/en/ prefix shows English content', async ({ page }) => {
    await page.goto('/en')

    await expect(page).toHaveURL(/\/en/)
    // English navigation text should be present
    await expect(
      page.locator('nav[aria-label="Main navigation"] a', { hasText: 'Tools' })
    ).toBeVisible()
  })

  test('/tr/ prefix loads Turkish locale', async ({ page }) => {
    await page.goto('/tr')

    await expect(page).toHaveURL(/\/tr/)
    // The page should render without errors
    await expect(page.locator('h1')).toBeVisible()
  })

  test('/ru/ prefix loads Russian locale', async ({ page }) => {
    await page.goto('/ru')

    await expect(page).toHaveURL(/\/ru/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('language selector is visible', async ({ page }) => {
    await page.goto('/')

    const langButton = page.locator('button[aria-label="Select language"]')
    await expect(langButton).toBeVisible()
  })

  test('language selector opens dropdown with all locales', async ({ page }) => {
    await page.goto('/')

    // Click the language selector
    await page.click('button[aria-label="Select language"]')

    // Dropdown should appear with 4 language options
    const listbox = page.locator('[role="listbox"]')
    await expect(listbox).toBeVisible()

    const options = listbox.locator('[role="option"]')
    await expect(options).toHaveCount(4)
  })

  test('language selector changes locale to English', async ({ page }) => {
    await page.goto('/')

    // Open language selector
    await page.click('button[aria-label="Select language"]')

    // Click English option
    await page.click('[role="option"]:has-text("EN")')

    // Should navigate to /en
    await expect(page).toHaveURL(/\/en/)

    // Navigation should show English labels
    await expect(
      page.locator('nav[aria-label="Main navigation"] a', { hasText: 'Tools' })
    ).toBeVisible()
  })

  test('tools page works in English locale', async ({ page }) => {
    await page.goto('/en/tools')

    // English tools page title
    await expect(page.locator('h1')).toContainText('Free Online Tools')
  })

  test('tool detail page works in English locale', async ({ page }) => {
    await page.goto('/en/tools/base64-encode-decode')

    await expect(page.locator('h1')).toContainText('Base64')
    // Breadcrumb should exist
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
    await expect(breadcrumb).toBeVisible()
  })

  test('about page works in English locale', async ({ page }) => {
    await page.goto('/en/about')

    await expect(page.locator('h1')).toBeVisible()
  })
})
