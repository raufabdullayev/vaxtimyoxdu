import { test, expect } from '@playwright/test'

test.describe('Social Links', () => {
  test('footer has Instagram link', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const instagram = footer.locator('a[aria-label="Instagram"]')
    await expect(instagram).toBeVisible()
    await expect(instagram).toHaveAttribute('href', /instagram\.com\/vaxtimyoxdu/)
    await expect(instagram).toHaveAttribute('target', '_blank')
  })

  test('footer has TikTok link', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const tiktok = footer.locator('a[aria-label="TikTok"]')
    await expect(tiktok).toBeVisible()
    await expect(tiktok).toHaveAttribute('href', /tiktok\.com/)
  })

  test('footer has Telegram link', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const telegram = footer.locator('a[aria-label="Telegram"]')
    await expect(telegram).toBeVisible()
    await expect(telegram).toHaveAttribute('href', /t\.me\/vaxtimyoxdu/)
  })

  test('footer has YouTube link', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const youtube = footer.locator('a[aria-label="YouTube"]')
    await expect(youtube).toBeVisible()
    await expect(youtube).toHaveAttribute('href', /youtube\.com/)
  })

  test('footer has X/Twitter link', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const twitter = footer.locator('a[aria-label="X / Twitter"]')
    await expect(twitter).toBeVisible()
    await expect(twitter).toHaveAttribute('href', /x\.com\/vaxtimyoxdu/)
  })

  test('all social links have rel="noopener noreferrer"', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const socialLinks = footer.locator('a[target="_blank"]')
    const count = await socialLinks.count()

    for (let i = 0; i < count; i++) {
      const rel = await socialLinks.nth(i).getAttribute('rel')
      expect(rel).toContain('noopener')
      expect(rel).toContain('noreferrer')
    }
  })
})
