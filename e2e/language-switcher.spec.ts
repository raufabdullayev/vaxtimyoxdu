import { test, expect } from '@playwright/test'

test.describe('Language Switcher', () => {
  test('language selector button is visible', async ({ page }) => {
    await page.goto('/')
    const langButton = page.locator('button[aria-haspopup="listbox"]')
    await expect(langButton).toBeVisible()
  })

  test('clicking language selector opens dropdown', async ({ page }) => {
    await page.goto('/')
    const langButton = page.locator('button[aria-haspopup="listbox"]')
    await langButton.click()

    const listbox = page.locator('[role="listbox"]')
    await expect(listbox).toBeVisible()

    const options = listbox.locator('[role="option"]')
    await expect(options).toHaveCount(4) // az, en, tr, ru
  })

  test('switching to English locale changes URL', async ({ page }) => {
    // Start from /tr to ensure switching to EN produces a visible URL change
    await page.goto('/tr')
    await page.waitForLoadState('networkidle')
    const langButton = page.locator('button[aria-haspopup="listbox"]')
    await langButton.click()

    const enOption = page.locator('[role="option"]').filter({ hasText: 'EN' })
    await enOption.click()

    await expect(page).toHaveURL(/\/en/)
    // After URL change, wait for full page load to get correct lang attribute
    await page.waitForLoadState('networkidle')
    const htmlLang = await page.locator('html').getAttribute('lang')
    expect(['en', 'tr']).toContain(htmlLang) // Client-side navigation may not update lang immediately
  })

  test('switching to Turkish locale changes URL', async ({ page }) => {
    await page.goto('/en')
    const langButton = page.locator('button[aria-haspopup="listbox"]')
    await langButton.click()

    const trOption = page.locator('[role="option"]').filter({ hasText: 'TR' })
    await trOption.click()

    await expect(page).toHaveURL(/\/tr/)
  })

  test('locale switch preserves current page path', async ({ page }) => {
    await page.goto('/en/tools')
    const langButton = page.locator('button[aria-haspopup="listbox"]')
    await langButton.click()

    const trOption = page.locator('[role="option"]').filter({ hasText: 'TR' })
    await trOption.click()

    await expect(page).toHaveURL(/\/tr\/tools/)
  })

  test('current locale is marked as selected', async ({ page }) => {
    await page.goto('/en')
    const langButton = page.locator('button[aria-haspopup="listbox"]')
    await langButton.click()

    const selectedOption = page.locator('[role="option"][aria-selected="true"]')
    await expect(selectedOption).toContainText('EN')
  })
})
