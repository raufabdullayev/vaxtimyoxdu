import { test, expect } from '@playwright/test'

test.describe('Tools Search and Filter', () => {
  test('tools page has a search input', async ({ page }) => {
    await page.goto('/tools')

    const searchInput = page.locator('input[type="search"], input[type="text"]').first()
    await expect(searchInput).toBeVisible()
  })

  test('typing in search filters tool list', async ({ page }) => {
    await page.goto('/tools')

    const searchInput = page.locator('input[type="search"], input[type="text"]').first()
    const initialToolCount = await page.locator('a[href*="/tools/"]').count()

    await searchInput.fill('json')
    await page.waitForTimeout(500)

    const filteredCount = await page.locator('a[href*="/tools/"]').count()
    expect(filteredCount).toBeLessThan(initialToolCount)
    expect(filteredCount).toBeGreaterThan(0)
  })

  test('search with no results reduces visible tools', async ({ page }) => {
    await page.goto('/tools')

    const searchInput = page.locator('input[type="search"], input[type="text"]').first()
    const initialCount = await page.locator('a[href*="/tools/"]').count()

    await searchInput.fill('xyznonexistenttool123')
    await page.waitForTimeout(500)

    const filteredCount = await page.locator('a[href*="/tools/"]').count()
    expect(filteredCount).toBeLessThan(initialCount)
  })

  test('clearing search shows all tools again', async ({ page }) => {
    await page.goto('/tools')

    const searchInput = page.locator('input[type="search"], input[type="text"]').first()
    const initialCount = await page.locator('a[href*="/tools/"]').count()

    await searchInput.fill('json')
    await page.waitForTimeout(500)

    await searchInput.fill('')
    await page.waitForTimeout(500)

    const restoredCount = await page.locator('a[href*="/tools/"]').count()
    expect(restoredCount).toBe(initialCount)
  })
})
