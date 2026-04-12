import { test, expect } from '@playwright/test'

test.describe('Cookie Consent', () => {
  test('cookie consent banner appears on first visit', async ({ page }) => {
    await page.goto('/')

    const dialog = page.locator('[role="dialog"]').filter({ hasText: /cookie/i })
    await expect(dialog).toBeVisible({ timeout: 5000 })
  })

  test('cookie consent has accept and reject buttons', async ({ page }) => {
    await page.goto('/')

    const dialog = page.locator('[role="dialog"]').filter({ hasText: /cookie/i })
    await expect(dialog).toBeVisible({ timeout: 5000 })

    const buttons = dialog.locator('button')
    await expect(buttons).toHaveCount(2)
  })

  test('accepting cookies hides the banner', async ({ page }) => {
    await page.goto('/')

    const dialog = page.locator('[role="dialog"]').filter({ hasText: /cookie/i })
    await expect(dialog).toBeVisible({ timeout: 5000 })

    // Click the accept button (usually the primary/styled one)
    const acceptBtn = dialog.locator('button').last()
    await acceptBtn.click()

    await expect(dialog).not.toBeVisible()
  })

  test('rejecting cookies hides the banner', async ({ page }) => {
    await page.goto('/')

    const dialog = page.locator('[role="dialog"]').filter({ hasText: /cookie/i })
    await expect(dialog).toBeVisible({ timeout: 5000 })

    const rejectBtn = dialog.locator('button').first()
    await rejectBtn.click()

    await expect(dialog).not.toBeVisible()
  })

  test('cookie consent does not reappear after accepting', async ({ page }) => {
    await page.goto('/')

    const dialog = page.locator('[role="dialog"]').filter({ hasText: /cookie/i })
    await expect(dialog).toBeVisible({ timeout: 5000 })

    const acceptBtn = dialog.locator('button').last()
    await acceptBtn.click()

    // Navigate to another page
    await page.goto('/tools')
    await page.waitForTimeout(1000)

    await expect(dialog).not.toBeVisible()
  })

  test('cookie consent has privacy policy link', async ({ page }) => {
    await page.goto('/')

    const dialog = page.locator('[role="dialog"]').filter({ hasText: /cookie/i })
    await expect(dialog).toBeVisible({ timeout: 5000 })

    const privacyLink = dialog.locator('a[href*="privacy"]')
    await expect(privacyLink).toBeVisible()
  })
})
