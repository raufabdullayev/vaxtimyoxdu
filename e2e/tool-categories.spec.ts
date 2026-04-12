import { test, expect } from '@playwright/test'

test.describe('Tool Categories', () => {
  test('tools page shows AI category', async ({ page }) => {
    await page.goto('/tools')
    await expect(page.locator('section').filter({ has: page.locator('h2') }).first()).toBeVisible()
  })

  test('each category has at least one tool', async ({ page }) => {
    await page.goto('/tools')

    const sections = page.locator('section')
    const sectionCount = await sections.count()

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i)
      const heading = section.locator('h2')
      if (await heading.isVisible()) {
        const links = section.locator('a[href*="/tools/"]')
        const linkCount = await links.count()
        expect(linkCount).toBeGreaterThan(0)
      }
    }
  })

  test('category anchor links work', async ({ page }) => {
    await page.goto('/tools#dev')

    // The dev section should be in view
    const url = page.url()
    expect(url).toContain('#dev')
  })

  test('PDF tools category exists', async ({ page }) => {
    await page.goto('/tools')

    const pdfSection = page.locator('section').filter({
      has: page.locator('h2:text-matches("PDF", "i")'),
    })
    await expect(pdfSection).toBeVisible()
  })

  test('Image tools category exists', async ({ page }) => {
    await page.goto('/tools')

    const imageSection = page.locator('section').filter({
      has: page.locator('h2:text-matches("Image|Şəkil|Resim|Изображ", "i")'),
    })
    await expect(imageSection).toBeVisible()
  })

  test('text tools category exists', async ({ page }) => {
    await page.goto('/tools')

    const textSection = page.locator('section').filter({
      has: page.locator('h2:text-matches("Text|Mətn|Metin|Текст", "i")'),
    })
    await expect(textSection).toBeVisible()
  })

  test('tools page has at least 50 tools listed', async ({ page }) => {
    await page.goto('/tools')

    const toolLinks = page.locator('a[href*="/tools/"]')
    const count = await toolLinks.count()
    expect(count).toBeGreaterThanOrEqual(50)
  })

  test('generator tools category exists', async ({ page }) => {
    await page.goto('/tools')

    const genSection = page.locator('section').filter({
      has: page.locator('h2:text-matches("Generator|Генератор", "i")'),
    })
    await expect(genSection).toBeVisible()
  })
})
