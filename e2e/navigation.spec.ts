import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Vaxtim Yoxdu/)
    // Verify the hero heading is visible
    await expect(page.locator('h1')).toBeVisible()
  })

  test('navigate to tools page via nav link', async ({ page }) => {
    await page.goto('/')

    // Use the nav link by its role and text (works regardless of locale prefix)
    const nav = page.locator('nav[aria-label="Main navigation"]')
    await nav.locator('a').filter({ hasText: /Tools|Aletler|Aletl/ }).click()

    await expect(page).toHaveURL(/\/tools/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('navigate to info (news) page via nav link', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    await nav.locator('a').filter({ hasText: /News|Xeberler|Haberler/ }).click()

    await expect(page).toHaveURL(/\/info/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('navigate to blog page via nav link', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    await nav.locator('a').filter({ hasText: /Blog/ }).click()

    await expect(page).toHaveURL(/\/blog/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('navigate to about page via nav link', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    await nav.locator('a').filter({ hasText: /About|Haqqimizda/ }).click()

    await expect(page).toHaveURL(/\/about/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('404 page for invalid route', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-at-all')

    await expect(page.getByText('404')).toBeVisible()
  })

  test('header logo links to homepage', async ({ page }) => {
    await page.goto('/en/about')

    // The logo link text is always "Vaxtim Yoxdu" regardless of locale
    const logoLink = page.locator('header a', { hasText: 'Vaxtim' })
    await expect(logoLink).toBeVisible()
    await logoLink.click()

    // Wait for navigation to settle -- should leave the /about page
    await expect(page).not.toHaveURL(/\/about/)
    // URL should be the locale root
    await expect(page).toHaveURL(/\/(en|tr|ru)?$/)
  })

  test('navigation links are present in header', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav).toBeVisible()
    await expect(nav.locator('a')).toHaveCount(4)
  })

  test('desktop mega menu click navigates to /tools', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    const toolsTrigger = nav
      .locator('a')
      .filter({ hasText: /Alətlər|Tools|Araçlar|Инструменты/i })
      .first()
    await toolsTrigger.click()

    await expect(page).toHaveURL(/\/(az|en|tr|ru)?\/?tools$/)
    await expect(page.locator('h1')).toBeVisible()
  })
})
