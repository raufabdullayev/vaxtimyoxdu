import { test, expect } from '@playwright/test'

test.describe('API Health', () => {
  test('health endpoint returns 200', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.status).toBe('ok')
  })

  test('robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    expect(response?.status()).toBe(200)
    const text = await page.locator('body').textContent()
    expect(text).toContain('User-agent')
  })

  test('sitemap.xml is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
  })

  test('newsletter API rejects empty body', async ({ request }) => {
    const response = await request.post('/api/newsletter', {
      data: {},
    })
    // Should return 400 for missing email
    expect(response.status()).toBe(400)
  })

  test('newsletter API rejects invalid email', async ({ request }) => {
    const response = await request.post('/api/newsletter', {
      data: { email: 'not-an-email' },
    })
    expect(response.status()).toBe(400)
  })
})
