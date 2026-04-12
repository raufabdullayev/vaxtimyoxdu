import { test, expect } from '@playwright/test'

test.describe('Newsletter', () => {
  test('footer has newsletter signup form', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const emailInput = footer.locator('input[type="email"]')
    await expect(emailInput).toBeVisible()
  })

  test('newsletter form has submit button', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const submitBtn = footer.locator('form button[type="submit"]')
    await expect(submitBtn).toBeVisible()
  })

  test('submitting empty email shows validation error', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const submitBtn = footer.locator('form button[type="submit"]')
    await submitBtn.click()

    // Should show an error message
    const error = footer.locator('[role="alert"], .text-destructive')
    await expect(error).toBeVisible({ timeout: 3000 })
  })

  test('submitting invalid email shows error', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const emailInput = footer.locator('input[type="email"]')
    await emailInput.fill('not-an-email')

    const submitBtn = footer.locator('form button[type="submit"]')
    await submitBtn.click()

    const error = footer.locator('[role="alert"], .text-destructive')
    await expect(error).toBeVisible({ timeout: 3000 })
  })

  test('newsletter email input has accessible label', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const emailInput = footer.locator('input[type="email"]')

    // Should have aria-label or associated label
    const hasLabel = await emailInput.evaluate((el) => {
      return !!(
        el.getAttribute('aria-label') ||
        el.getAttribute('aria-labelledby') ||
        el.id && document.querySelector(`label[for="${el.id}"]`)
      )
    })
    expect(hasLabel).toBe(true)
  })
})
