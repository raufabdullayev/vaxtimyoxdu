import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getIndexNowKey,
  buildLocalizedUrl,
  expandToAllLocales,
  expandPathsToAllLocales,
  submitToIndexNow,
  notifyIndexNow,
} from '@/lib/indexnow'

describe('IndexNow utility library', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  describe('getIndexNowKey', () => {
    it('should return the key from environment variables', () => {
      vi.stubEnv('INDEXNOW_API_KEY', 'test-key-123')
      expect(getIndexNowKey()).toBe('test-key-123')
    })

    it('should throw if INDEXNOW_API_KEY is not set', () => {
      vi.stubEnv('INDEXNOW_API_KEY', '')
      expect(() => getIndexNowKey()).toThrow(
        'INDEXNOW_API_KEY environment variable is not set'
      )
    })

    it('should throw if INDEXNOW_API_KEY is undefined', () => {
      delete process.env.INDEXNOW_API_KEY
      expect(() => getIndexNowKey()).toThrow(
        'INDEXNOW_API_KEY environment variable is not set'
      )
    })
  })

  describe('buildLocalizedUrl', () => {
    it('should build URL for default locale (az) without prefix', () => {
      expect(buildLocalizedUrl('/tools/json-formatter', 'az')).toBe(
        'https://vaxtimyoxdu.com/tools/json-formatter'
      )
    })

    it('should build URL for English with /en prefix', () => {
      expect(buildLocalizedUrl('/tools/json-formatter', 'en')).toBe(
        'https://vaxtimyoxdu.com/en/tools/json-formatter'
      )
    })

    it('should build URL for Turkish with /tr prefix', () => {
      expect(buildLocalizedUrl('/tools/json-formatter', 'tr')).toBe(
        'https://vaxtimyoxdu.com/tr/tools/json-formatter'
      )
    })

    it('should build URL for Russian with /ru prefix', () => {
      expect(buildLocalizedUrl('/tools/json-formatter', 'ru')).toBe(
        'https://vaxtimyoxdu.com/ru/tools/json-formatter'
      )
    })

    it('should handle root path correctly', () => {
      expect(buildLocalizedUrl('/', 'az')).toBe('https://vaxtimyoxdu.com/')
      expect(buildLocalizedUrl('/', 'en')).toBe('https://vaxtimyoxdu.com/en/')
    })

    it('should add leading slash if missing', () => {
      expect(buildLocalizedUrl('blog/post', 'az')).toBe(
        'https://vaxtimyoxdu.com/blog/post'
      )
      expect(buildLocalizedUrl('blog/post', 'en')).toBe(
        'https://vaxtimyoxdu.com/en/blog/post'
      )
    })
  })

  describe('expandToAllLocales', () => {
    it('should expand a single path to all 4 locale variants', () => {
      const urls = expandToAllLocales('/tools/json-formatter')
      expect(urls).toHaveLength(4)
      expect(urls).toContain('https://vaxtimyoxdu.com/tools/json-formatter')
      expect(urls).toContain('https://vaxtimyoxdu.com/en/tools/json-formatter')
      expect(urls).toContain('https://vaxtimyoxdu.com/tr/tools/json-formatter')
      expect(urls).toContain('https://vaxtimyoxdu.com/ru/tools/json-formatter')
    })

    it('should expand the root path correctly', () => {
      const urls = expandToAllLocales('/')
      expect(urls).toHaveLength(4)
      expect(urls).toContain('https://vaxtimyoxdu.com/')
      expect(urls).toContain('https://vaxtimyoxdu.com/en/')
      expect(urls).toContain('https://vaxtimyoxdu.com/tr/')
      expect(urls).toContain('https://vaxtimyoxdu.com/ru/')
    })
  })

  describe('expandPathsToAllLocales', () => {
    it('should expand multiple paths to all locale variants', () => {
      const urls = expandPathsToAllLocales(['/tools/tool-a', '/blog/post-b'])
      expect(urls).toHaveLength(8) // 2 paths x 4 locales
    })

    it('should return empty array for empty input', () => {
      expect(expandPathsToAllLocales([])).toEqual([])
    })
  })

  describe('submitToIndexNow', () => {
    it('should return success with 0 submitted for empty URL list', async () => {
      const result = await submitToIndexNow([])
      expect(result.success).toBe(true)
      expect(result.submitted).toBe(0)
      expect(result.errors).toEqual([])
    })

    it('should submit URLs and handle 200 response', async () => {
      vi.stubEnv('INDEXNOW_API_KEY', 'test-key-abc')

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
      })
      vi.stubGlobal('fetch', mockFetch)

      const urls = ['https://vaxtimyoxdu.com/tools/json-formatter']
      const result = await submitToIndexNow(urls)

      expect(result.success).toBe(true)
      expect(result.submitted).toBe(1)
      expect(result.errors).toEqual([])
      expect(mockFetch).toHaveBeenCalledOnce()

      // Verify the request payload
      const [url, options] = mockFetch.mock.calls[0]
      expect(url).toBe('https://api.indexnow.org/indexnow')
      expect(options.method).toBe('POST')
      const body = JSON.parse(options.body)
      expect(body.host).toBe('vaxtimyoxdu.com')
      expect(body.key).toBe('test-key-abc')
      expect(body.urlList).toEqual(urls)
    })

    it('should handle 202 Accepted response as success', async () => {
      vi.stubEnv('INDEXNOW_API_KEY', 'test-key-abc')

      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          status: 202,
          statusText: 'Accepted',
        })
      )

      const result = await submitToIndexNow([
        'https://vaxtimyoxdu.com/test',
      ])
      expect(result.success).toBe(true)
      expect(result.submitted).toBe(1)
    })

    it('should handle HTTP errors gracefully', async () => {
      vi.stubEnv('INDEXNOW_API_KEY', 'test-key-abc')

      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          status: 422,
          statusText: 'Unprocessable Entity',
        })
      )

      const result = await submitToIndexNow([
        'https://vaxtimyoxdu.com/test',
      ])
      expect(result.success).toBe(false)
      expect(result.submitted).toBe(0)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toContain('422')
    })

    it('should handle network errors gracefully', async () => {
      vi.stubEnv('INDEXNOW_API_KEY', 'test-key-abc')

      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network error'))
      )

      const result = await submitToIndexNow([
        'https://vaxtimyoxdu.com/test',
      ])
      expect(result.success).toBe(false)
      expect(result.submitted).toBe(0)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toContain('Network error')
    })
  })

  describe('notifyIndexNow', () => {
    it('should expand paths and submit all locale variants', async () => {
      vi.stubEnv('INDEXNOW_API_KEY', 'test-key-notify')

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
      })
      vi.stubGlobal('fetch', mockFetch)

      const result = await notifyIndexNow(['/tools/new-tool'])

      expect(result.success).toBe(true)
      expect(result.submitted).toBe(4) // 1 path x 4 locales

      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(body.urlList).toHaveLength(4)
      expect(body.urlList).toContain(
        'https://vaxtimyoxdu.com/tools/new-tool'
      )
      expect(body.urlList).toContain(
        'https://vaxtimyoxdu.com/en/tools/new-tool'
      )
    })

    it('should handle multiple paths', async () => {
      vi.stubEnv('INDEXNOW_API_KEY', 'test-key-notify')

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
      })
      vi.stubGlobal('fetch', mockFetch)

      const result = await notifyIndexNow([
        '/tools/tool-a',
        '/info/article-b',
      ])

      expect(result.success).toBe(true)
      expect(result.submitted).toBe(8) // 2 paths x 4 locales
    })
  })
})
