import { locales, defaultLocale, Locale } from '@/i18n/config'

const SITE_URL = 'https://vaxtimyoxdu.com'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

/**
 * Get the IndexNow API key from environment variables.
 */
export function getIndexNowKey(): string {
  const key = process.env.INDEXNOW_API_KEY
  if (!key) {
    throw new Error('INDEXNOW_API_KEY environment variable is not set')
  }
  return key
}

/**
 * Build a locale-prefixed absolute URL.
 * The default locale (az) has no prefix; others get /{locale}/path.
 */
export function buildLocalizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) {
    return `${SITE_URL}${cleanPath}`
  }
  return `${SITE_URL}/${locale}${cleanPath}`
}

/**
 * Expand a single path into all locale variants.
 * For example, "/tools/json-formatter" becomes:
 *   - https://vaxtimyoxdu.com/tools/json-formatter       (az, default)
 *   - https://vaxtimyoxdu.com/en/tools/json-formatter     (en)
 *   - https://vaxtimyoxdu.com/tr/tools/json-formatter     (tr)
 *   - https://vaxtimyoxdu.com/ru/tools/json-formatter     (ru)
 */
export function expandToAllLocales(path: string): string[] {
  return locales.map((locale) => buildLocalizedUrl(path, locale))
}

/**
 * Expand multiple paths into all locale variants.
 */
export function expandPathsToAllLocales(paths: string[]): string[] {
  return paths.flatMap((path) => expandToAllLocales(path))
}

/**
 * Submit URLs to IndexNow for immediate indexing by search engines
 * (Bing, Yandex, Naver, Seznam, etc.).
 *
 * IndexNow supports batch submissions of up to 10,000 URLs per request.
 * If more than 10,000 URLs are provided, they are split into batches.
 *
 * @param urls - Array of absolute URLs to submit
 * @returns Results for each batch submission
 */
export async function submitToIndexNow(
  urls: string[]
): Promise<{ success: boolean; submitted: number; errors: string[] }> {
  if (urls.length === 0) {
    return { success: true, submitted: 0, errors: [] }
  }

  const key = getIndexNowKey()
  const errors: string[] = []
  let totalSubmitted = 0

  // IndexNow supports up to 10,000 URLs per request
  const BATCH_SIZE = 10_000
  const batches: string[][] = []

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE))
  }

  for (const batch of batches) {
    try {
      const payload = {
        host: 'vaxtimyoxdu.com',
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList: batch,
      }

      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      // IndexNow returns 200 (OK) or 202 (Accepted) on success
      if (response.ok || response.status === 202) {
        totalSubmitted += batch.length
      } else {
        const statusText = response.statusText || 'Unknown error'
        errors.push(
          `Batch failed: HTTP ${response.status} ${statusText} (${batch.length} URLs)`
        )
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      errors.push(`Batch failed: ${message} (${batch.length} URLs)`)
    }
  }

  return {
    success: errors.length === 0,
    submitted: totalSubmitted,
    errors,
  }
}

/**
 * Notify IndexNow about new or updated content pages.
 * Automatically expands paths to all locale variants.
 *
 * Usage examples:
 *   notifyIndexNow(['/tools/new-tool'])
 *   notifyIndexNow(['/info/new-article', '/blog/new-post'])
 *   notifyIndexNow(['/']) // homepage updated
 */
export async function notifyIndexNow(
  paths: string[]
): Promise<{ success: boolean; submitted: number; errors: string[] }> {
  const urls = expandPathsToAllLocales(paths)
  return submitToIndexNow(urls)
}
