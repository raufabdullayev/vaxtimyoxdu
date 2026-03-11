import { NextRequest, NextResponse } from 'next/server'
import {
  submitToIndexNow,
  expandPathsToAllLocales,
  getIndexNowKey,
} from '@/lib/indexnow'

/**
 * POST /api/indexnow
 *
 * Submit URLs to IndexNow for search engine indexing notification.
 *
 * Request body:
 *   { "paths": ["/tools/json-formatter", "/info/new-article"] }
 *     - Paths are expanded to all 4 locale variants automatically.
 *
 * Or submit absolute URLs directly:
 *   { "urls": ["https://vaxtimyoxdu.com/tools/json-formatter", ...] }
 *
 * Authentication: Requires INDEXNOW_API_KEY as Bearer token or x-api-key header.
 */
export async function POST(req: NextRequest) {
  try {
    // ----------------------------------------------------------------
    // 1. Authenticate the request
    // ----------------------------------------------------------------
    let apiKey: string
    try {
      apiKey = getIndexNowKey()
    } catch {
      return NextResponse.json(
        { error: 'IndexNow is not configured. Set INDEXNOW_API_KEY env var.' },
        { status: 503 }
      )
    }

    const authHeader = req.headers.get('authorization')
    const xApiKey = req.headers.get('x-api-key')
    const providedKey =
      authHeader?.replace(/^Bearer\s+/i, '') || xApiKey || ''

    if (providedKey !== apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ----------------------------------------------------------------
    // 2. Parse request body
    // ----------------------------------------------------------------
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const { paths, urls } = body as {
      paths?: string[]
      urls?: string[]
    }

    // ----------------------------------------------------------------
    // 3. Validate input
    // ----------------------------------------------------------------
    if (!paths && !urls) {
      return NextResponse.json(
        { error: 'Request body must include "paths" or "urls" array' },
        { status: 400 }
      )
    }

    if (paths && !Array.isArray(paths)) {
      return NextResponse.json(
        { error: '"paths" must be an array of strings' },
        { status: 400 }
      )
    }

    if (urls && !Array.isArray(urls)) {
      return NextResponse.json(
        { error: '"urls" must be an array of strings' },
        { status: 400 }
      )
    }

    // ----------------------------------------------------------------
    // 4. Build URL list
    // ----------------------------------------------------------------
    let urlList: string[] = []

    if (paths && paths.length > 0) {
      // Expand paths to all locale variants
      urlList = expandPathsToAllLocales(
        paths.filter((p): p is string => typeof p === 'string')
      )
    }

    if (urls && urls.length > 0) {
      // Add absolute URLs directly
      urlList = urlList.concat(
        urls.filter((u): u is string => typeof u === 'string')
      )
    }

    // Remove duplicates
    urlList = [...new Set(urlList)]

    if (urlList.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs to submit' },
        { status: 400 }
      )
    }

    // ----------------------------------------------------------------
    // 5. Submit to IndexNow
    // ----------------------------------------------------------------
    const result = await submitToIndexNow(urlList)

    return NextResponse.json({
      success: result.success,
      submitted: result.submitted,
      total: urlList.length,
      errors: result.errors,
    })
  } catch (error) {
    console.error('[IndexNow] API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
