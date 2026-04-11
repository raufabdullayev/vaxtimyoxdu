# Hreflang Bug Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate hreflang SEO signal loss by removing (1) the trailing-slash 308-redirect chain on homepage locale alternates and (2) the 404-pointing blog/[slug] cross-locale hreflang, so Google consolidates all 4 language clusters correctly.

**Architecture:** Two root-cause fixes in one helper + one page + one sitemap file. The shared helper `getLocalizedUrl()` is the canonical source of URL shape — special-case the root path so non-default-locale homes emit `/en` (no trailing slash). Blog/[slug] stops calling `generateHreflangAlternates()` blindly and instead probes `blogPostsByLocale[loc]?.[slug]` to only emit hreflang for locales that actually have the post (mirror of the info/[slug] pattern from commit `af6d684`). Sitemap DRYs out its duplicated `localizedUrl` function and imports the shared helper — automatically inheriting the fix.

**Tech Stack:** Next.js 15.5.9 (App Router), next-intl 4.8.3, React 19.2.4, Vitest, TypeScript. Locales: `['az', 'en', 'tr', 'ru']`, `defaultLocale = 'az'`, `localePrefix: 'as-needed'` (default locale has no URL prefix).

**Team:** PO (orchestrator), React/Next.js engineer (execution), SEO specialist (post-deploy verification), QA engineer (test + browser verification).

---

## Scope

### Bugs being fixed (from Phase 1 investigation, 2026-04-11)

| ID | Severity | Bug | Evidence |
|----|----------|-----|----------|
| **A** | **P0** | Homepage hreflang for EN/TR/RU emits `https://vaxtimyoxdu.com/en/` (trailing slash). Live server 308-redirects `/en/` → `/en`. Every Googlebot click on a hreflang alternate eats a 308. | `curl -I https://vaxtimyoxdu.com/en/` → `HTTP/2 308, location: /en`. Live `sitemap.xml` confirmed: `<xhtml:link rel="alternate" hreflang="en" href="https://vaxtimyoxdu.com/en/" />`. |
| **B** | **P0** | `blog/[slug]/page.tsx` L36 calls `generateHreflangAlternates()` unconditionally for all 4 locales. Blog posts use `blogPostsByLocale` with per-locale slug sets — a post that exists only in AZ/TR/RU emits `/en/blog/<slug>` which `notFound()`s (404). Same bug class that was fixed for `info/[slug]` in commit `af6d684` but never propagated to blog. | `src/data/blog-posts.ts:2857` exports `blogPostsByLocale`. `getBlogPostBySlug(slug, 'en')` returns `undefined` for AZ-only slugs, triggering `notFound()` at `src/app/[locale]/blog/[slug]/page.tsx:49`. Affected post counts per file header: EN=28, AZ=33, TR=33, RU=33. |
| **C** | **P0** | Sitemap homepage rows emit `/en/`, `/tr/`, `/ru/` (trailing slash) — same underlying helper bug as A. | Live `sitemap.xml` verified via `curl -s https://vaxtimyoxdu.com/sitemap.xml \| head -20`. |
| **D** | **P1** | `src/app/sitemap.ts` L13-L19 duplicates `getLocalizedUrl()` logic locally. If the shared helper is updated without mirroring the change in sitemap, the two diverge silently. | Two-function drift identified by code-explorer audit. |

### Explicitly OUT of scope (don't touch, document only)

- **`hrefLang` (camelCase) vs `hreflang` (lowercase) in HTML attribute** — Next.js metadata serializer emits camelCase by design. HTML5 attribute names are case-insensitive, Google's hreflang matching is case-insensitive. Confirmed via `curl -s https://vaxtimyoxdu.com/en | grep -io 'hreflang[^"]*"[^"]*"'` — only camelCase found. Not a bug. Flagging to SEO agents (Ahrefs/Screaming Frog) but no ranking impact.
- **`offline/page.tsx` has no metadata** — PWA fallback page, never crawled. Defer to dedicated metadata pass.
- **BCP47 regional codes** (`az-AZ`, `en-US`) — current plain codes are valid per Google spec. Optimisation for a future sprint, not a bug.
- **News `/info/[slug]` cross-locale linking with different slugs** — SEO agent flagged as "cluster-consolidation loss". Requires a news-article-id mapping table (feature-level work). Defer to backlog.
- **Canonical shape consistency across AZ vs non-AZ** — test `src/lib/utils/__tests__/seo.test.ts:110` asserts `${SITE_URL}/` (with slash) for AZ home canonical. This IS the canonical. Fix A keeps AZ at `/` (with slash) and only normalises EN/TR/RU to no-slash — matching each locale's actual 200-OK URL.

### Files that will be touched

| File | Action | Purpose |
|---|---|---|
| `src/lib/utils/seo/url.ts` | Modify (1 function) | Root-path special case in `getLocalizedUrl` |
| `src/lib/utils/seo/__tests__/url.test.ts` | Modify (2 assertions, +3 tests) | Update buggy test + add root-path coverage |
| `src/lib/utils/__tests__/seo.test.ts` | Modify (3 assertions) | Update `generateBaseMetadata` hreflang assertions |
| `src/app/[locale]/blog/[slug]/page.tsx` | Modify (generateMetadata only) | Probe `blogPostsByLocale` per locale |
| `src/app/[locale]/blog/[slug]/__tests__/blog-hreflang.test.ts` | **Create** | Test the new per-locale probe logic |
| `src/app/sitemap.ts` | Modify | Import shared `getLocalizedUrl`, delete local copy |
| `src/app/__tests__/sitemap.test.ts` | Modify (homepage assertions) | Update to new URL shape |
| `docs/session-state.md` | Modify | Remove "hreflang bug" from HIGH backlog + log Session 23 |

---

## Task Breakdown

### Task 1: Add failing test for root-path locale URL shape

**Files:**
- Modify: `src/lib/utils/seo/__tests__/url.test.ts:40-42`

- [ ] **Step 1.1: Rewrite the existing root-path test to the CORRECT expectation**

Replace lines 40-42 of `src/lib/utils/seo/__tests__/url.test.ts`:

```typescript
    it('handles root path for non-default locale without trailing slash', () => {
      // Root path must not produce a trailing-slash variant that Next.js
      // 308-redirects to the canonical no-slash form.
      // See docs/superpowers/plans/2026-04-11-hreflang-bugfix.md (Bug A).
      expect(getLocalizedUrl('/', 'en')).toBe('https://vaxtimyoxdu.com/en')
      expect(getLocalizedUrl('/', 'tr')).toBe('https://vaxtimyoxdu.com/tr')
      expect(getLocalizedUrl('/', 'ru')).toBe('https://vaxtimyoxdu.com/ru')
    })

    it('handles root path for default locale with trailing slash', () => {
      // Default locale root is the canonical home; keep trailing slash.
      expect(getLocalizedUrl('/', 'az')).toBe('https://vaxtimyoxdu.com/')
    })

    it('handles empty path as root for non-default locale', () => {
      expect(getLocalizedUrl('', 'en')).toBe('https://vaxtimyoxdu.com/en')
    })
```

- [ ] **Step 1.2: Run test to verify it fails**

```bash
cd /Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu
npm run test:run -- src/lib/utils/seo/__tests__/url.test.ts
```

Expected: 2 FAILS with actual `https://vaxtimyoxdu.com/en/` / `/tr/` / `/ru/` vs expected no-slash. The AZ and empty-path tests pass or fail based on current behaviour — both should pass before code change (AZ: current correct, empty: `cleanPath = '/'` currently yields `/en/`).

### Task 2: Implement `getLocalizedUrl` root-path special case

**Files:**
- Modify: `src/lib/utils/seo/url.ts:10-16`

- [ ] **Step 2.1: Apply the root-path branch**

Replace lines 10-16 of `src/lib/utils/seo/url.ts`:

```typescript
/**
 * Build a locale-prefixed absolute URL.
 *
 * The default locale (az) has no prefix; others get /{locale}/path.
 *
 * Root-path special case: for the default locale we keep the canonical
 * trailing slash (`https://vaxtimyoxdu.com/`), but for non-default locales
 * we return `https://vaxtimyoxdu.com/{locale}` WITHOUT a trailing slash —
 * Next.js (trailingSlash: false) 308-redirects `/en/` → `/en`, so any
 * hreflang or canonical pointing at `/en/` eats a redirect.
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (cleanPath === '/') {
    return locale === defaultLocale
      ? `${SITE_URL}/`
      : `${SITE_URL}/${locale}`
  }
  if (locale === defaultLocale) {
    return `${SITE_URL}${cleanPath}`
  }
  return `${SITE_URL}/${locale}${cleanPath}`
}
```

- [ ] **Step 2.2: Run the helper tests — expect PASS**

```bash
npm run test:run -- src/lib/utils/seo/__tests__/url.test.ts
```

Expected: all tests in `seo/url` file PASS (including the 3 new/updated assertions from Task 1.1).

- [ ] **Step 2.3: Commit**

```bash
git add src/lib/utils/seo/url.ts src/lib/utils/seo/__tests__/url.test.ts
git commit -m "$(cat <<'EOF'
fix(seo): drop trailing slash on locale-prefixed root URLs

`getLocalizedUrl('/', 'en')` used to return
`https://vaxtimyoxdu.com/en/` which Next.js 308-redirects to
`/en`. Every hreflang alternate on the homepage pointed at the
redirect target, losing SEO signal consolidation.

Root path now special-cases: default locale keeps trailing slash,
non-default locales emit no-slash form matching the live
canonical URL.

Refs: docs/superpowers/plans/2026-04-11-hreflang-bugfix.md (Bug A)
EOF
)"
```

### Task 3: Update `generateBaseMetadata` hreflang test assertions

**Files:**
- Modify: `src/lib/utils/__tests__/seo.test.ts:117-120`

- [ ] **Step 3.1: Fix the assertions**

Replace lines 117-120 of `src/lib/utils/__tests__/seo.test.ts`:

```typescript
    expect(languages['az']).toBe(`${SITE_URL}/`)
    expect(languages['en']).toBe(`${SITE_URL}/en`)
    expect(languages['tr']).toBe(`${SITE_URL}/tr`)
    expect(languages['ru']).toBe(`${SITE_URL}/ru`)
```

(The `x-default` assertion on line 121 stays as-is: `${SITE_URL}/`.)

- [ ] **Step 3.2: Run test — expect PASS**

```bash
npm run test:run -- src/lib/utils/__tests__/seo.test.ts
```

Expected: `generateBaseMetadata` suite PASS. If fail, re-check that line 110's canonical assertion (`${SITE_URL}/`) was NOT touched.

- [ ] **Step 3.3: Commit**

```bash
git add src/lib/utils/__tests__/seo.test.ts
git commit -m "test(seo): update hreflang assertions to match no-trailing-slash locale URLs"
```

### Task 4: Add failing test for blog/[slug] per-locale hreflang probe

**Files:**
- Create: `src/app/[locale]/blog/[slug]/__tests__/blog-hreflang.test.ts`

- [ ] **Step 4.1: Write the failing test**

Create `src/app/[locale]/blog/[slug]/__tests__/blog-hreflang.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the blog-posts data module BEFORE importing the page
vi.mock('@/data/blog-posts', () => {
  const base = {
    title: 'Test Post',
    description: 'Test description',
    content: 'Body content.',
    date: '2026-04-01',
    relatedTools: [],
  }
  return {
    blogPosts: { 'post-in-all-locales': base, 'post-en-only': base },
    blogPostsByLocale: {
      en: { 'post-in-all-locales': base, 'post-en-only': base },
      az: { 'post-in-all-locales': { ...base, title: 'Test AZ' }, 'post-az-only': base },
      tr: { 'post-in-all-locales': { ...base, title: 'Test TR' } },
      ru: { 'post-in-all-locales': { ...base, title: 'Test RU' } },
    },
    getBlogPostBySlug: vi.fn((slug: string, locale: string) => {
      const byLoc: Record<string, Record<string, unknown>> = {
        en: { 'post-in-all-locales': base, 'post-en-only': base },
        az: { 'post-in-all-locales': { ...base, title: 'Test AZ' }, 'post-az-only': base },
        tr: { 'post-in-all-locales': { ...base, title: 'Test TR' } },
        ru: { 'post-in-all-locales': { ...base, title: 'Test RU' } },
      }
      return byLoc[locale]?.[slug]
    }),
    getBlogPostsByLocale: vi.fn(() => ({})),
  }
})

// Mock next-intl server helpers
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
  setRequestLocale: vi.fn(),
}))

import { generateMetadata } from '../page'

describe('blog/[slug] generateMetadata hreflang probe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('emits hreflang for every locale that has the post', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'post-in-all-locales', locale: 'az' }),
    })
    const alt = meta.alternates as {
      canonical: string
      languages: Record<string, string>
    }
    expect(alt.languages['az']).toBe('https://vaxtimyoxdu.com/blog/post-in-all-locales')
    expect(alt.languages['en']).toBe('https://vaxtimyoxdu.com/en/blog/post-in-all-locales')
    expect(alt.languages['tr']).toBe('https://vaxtimyoxdu.com/tr/blog/post-in-all-locales')
    expect(alt.languages['ru']).toBe('https://vaxtimyoxdu.com/ru/blog/post-in-all-locales')
    expect(alt.languages['x-default']).toBe('https://vaxtimyoxdu.com/blog/post-in-all-locales')
  })

  it('omits hreflang for locales where the post does not exist (AZ-only post)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'post-az-only', locale: 'az' }),
    })
    const alt = meta.alternates as {
      canonical: string
      languages: Record<string, string>
    }
    expect(alt.languages['az']).toBe('https://vaxtimyoxdu.com/blog/post-az-only')
    expect(alt.languages['en']).toBeUndefined()
    expect(alt.languages['tr']).toBeUndefined()
    expect(alt.languages['ru']).toBeUndefined()
    // x-default falls back to self when default locale does not have the post? No —
    // az IS the default locale here, so x-default matches the az entry.
    expect(alt.languages['x-default']).toBe('https://vaxtimyoxdu.com/blog/post-az-only')
  })

  it('omits hreflang for locales where the post does not exist (EN-only post)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'post-en-only', locale: 'en' }),
    })
    const alt = meta.alternates as {
      canonical: string
      languages: Record<string, string>
    }
    expect(alt.languages['en']).toBe('https://vaxtimyoxdu.com/en/blog/post-en-only')
    expect(alt.languages['az']).toBeUndefined()
    expect(alt.languages['tr']).toBeUndefined()
    expect(alt.languages['ru']).toBeUndefined()
    // x-default falls back to self (en) because az does not have the post
    expect(alt.languages['x-default']).toBe('https://vaxtimyoxdu.com/en/blog/post-en-only')
  })

  it('returns empty metadata object when slug does not exist in any locale', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: 'nonexistent', locale: 'az' }),
    })
    expect(meta).toEqual({})
  })
})
```

- [ ] **Step 4.2: Run test — expect FAIL**

```bash
npm run test:run -- src/app/[locale]/blog/[slug]/__tests__/blog-hreflang.test.ts
```

Expected: ≥ 3 failures — the current `blog/[slug]/page.tsx` emits 4-locale hreflang unconditionally via `generateHreflangAlternates()`, so the "omits for locales without post" assertions fail.

### Task 5: Implement the per-locale probe in `blog/[slug]/page.tsx`

**Files:**
- Modify: `src/app/[locale]/blog/[slug]/page.tsx:1-38`

- [ ] **Step 5.1: Update imports**

Replace line 5 of `src/app/[locale]/blog/[slug]/page.tsx`:

```typescript
import { generateBlogPostMetadata, generateBlogArticleJsonLd, getLocalizedUrl } from '@/lib/utils/seo'
```

And replace line 13:

```typescript
import { blogPosts, blogPostsByLocale, getBlogPostBySlug, getBlogPostsByLocale } from '@/data/blog-posts'
```

Also add the locales import (new line 14 area):

```typescript
import { locales, defaultLocale } from '@/i18n/config'
```

- [ ] **Step 5.2: Replace `generateMetadata` body**

Replace lines 21-38 of `src/app/[locale]/blog/[slug]/page.tsx`:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = (rawLocale ?? 'az') as Locale
  const post = getBlogPostBySlug(slug, locale)
  if (!post) return {}

  const description = post.description || post.content.slice(0, 160).replace(/[#\n]/g, '').trim()

  const metadata = generateBlogPostMetadata({
    title: post.title,
    description,
    slug,
    date: post.date,
    locale: rawLocale,
  })

  // Blog posts use per-locale slug sets (src/data/blog-posts.ts::blogPostsByLocale).
  // A post available only in some locales would 404 on the missing ones if we
  // emitted the full 4-language hreflang set — so probe each locale and only
  // emit a hreflang entry when the slug actually resolves there.
  // This mirrors the pattern established in src/app/[locale]/info/[slug]/page.tsx
  // (commit af6d684) but tolerates the case where the same slug DOES exist in
  // multiple locales (which is the norm for translated posts).
  const languages: Record<string, string> = {}
  for (const loc of locales) {
    if (blogPostsByLocale[loc]?.[slug]) {
      languages[loc] = getLocalizedUrl(`/blog/${slug}`, loc)
    }
  }
  // x-default: prefer default locale if it has the post, otherwise fall back to self.
  languages['x-default'] =
    languages[defaultLocale] ?? getLocalizedUrl(`/blog/${slug}`, locale)

  const alternates = {
    canonical: getLocalizedUrl(`/blog/${slug}`, locale),
    languages,
  }
  return { ...metadata, alternates }
}
```

- [ ] **Step 5.3: Run blog hreflang test — expect PASS**

```bash
npm run test:run -- src/app/[locale]/blog/[slug]/__tests__/blog-hreflang.test.ts
```

Expected: all 4 tests PASS.

- [ ] **Step 5.4: Run full blog page test file (regressions)**

```bash
npm run test:run -- src/app/[locale]/blog
```

Expected: all blog-related tests PASS. Investigate any new failures before proceeding.

- [ ] **Step 5.5: Commit**

```bash
git add src/app/[locale]/blog/[slug]/page.tsx src/app/[locale]/blog/[slug]/__tests__/blog-hreflang.test.ts
git commit -m "$(cat <<'EOF'
fix(seo): probe blogPostsByLocale before emitting cross-locale hreflang

Previously blog/[slug] emitted hreflang for all 4 locales via
generateHreflangAlternates(). Posts that exist only in some
locales (e.g. AZ-only long-form content) produced hreflang URLs
that 404'd on the missing locales because
getBlogPostBySlug(slug, 'en') returns undefined → notFound().

Now each locale is probed against blogPostsByLocale[loc][slug]
and only locales that actually host the post contribute a
hreflang entry. x-default prefers the default locale (az) when
available, falling back to the current locale otherwise.

This mirrors the pattern already used by info/[slug] (af6d684)
but tolerates same-slug translations which are the common case
for blog content.

Refs: docs/superpowers/plans/2026-04-11-hreflang-bugfix.md (Bug B)
EOF
)"
```

### Task 6: DRY the sitemap to use the shared helper

**Files:**
- Modify: `src/app/sitemap.ts:1-33`

- [ ] **Step 6.1: Update imports and remove local `localizedUrl`**

Replace lines 1-33 of `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'
import { tools } from '@/config/tools'
import { newsArticles } from '@/data/news-articles'
import { blogPosts } from '@/data/blog-posts'
import { locales, defaultLocale, Locale } from '@/i18n/config'
import { getLocalizedUrl } from '@/lib/utils/seo/url'

/**
 * Build an alternates object with hreflang entries for every locale.
 *
 * Delegates to the shared getLocalizedUrl() helper so the sitemap cannot
 * drift from the HTML <link rel="alternate"> emissions (single source of
 * truth for hreflang URL shape).
 */
function buildAlternates(path: string): {
  languages: Record<string, string>
} {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = getLocalizedUrl(path, locale)
  }
  languages['x-default'] = getLocalizedUrl(path, defaultLocale)
  return { languages }
}

/**
 * Create a sitemap entry for every locale variant of a given path.
 */
function localeEntries(
  path: string,
  lastModified: Date,
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
  priority: number,
): MetadataRoute.Sitemap {
  const alternates = buildAlternates(path)

  return locales.map((locale) => ({
    url: getLocalizedUrl(path, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates,
  }))
}
```

Keep lines 35 onwards unchanged (the `sitemap()` default export).

Also update the news-article branch (lines 82, 96 in the original file — adjust for new line numbers) where it uses the now-deleted local `localizedUrl`:

```typescript
        const url = getLocalizedUrl(`/info/${slug}`, articleLocale)
```

(One-line change — replace the local helper call with the imported one.)

- [ ] **Step 6.2: Run sitemap test — expect FAIL on homepage URL assertions**

```bash
npm run test:run -- src/app/__tests__/sitemap.test.ts
```

Expected: failures around homepage row because the old test asserts `/en/`, `/tr/`, `/ru/` with trailing slash. All other URL assertions (tools, blog, info) should still pass because those paths weren't root.

- [ ] **Step 6.3: Update sitemap test assertions**

Open `src/app/__tests__/sitemap.test.ts`. Find any assertion that expects the homepage row's locale-prefixed URL to have a trailing slash (e.g. `https://vaxtimyoxdu.com/en/`). Replace with no-trailing-slash form (`https://vaxtimyoxdu.com/en`).

*(Exact line numbers to be confirmed when the file is opened; grep for `vaxtimyoxdu.com/en/` in the test file.)*

Expected change pattern:

```typescript
// Before
expect(homeUrls).toContain('https://vaxtimyoxdu.com/en/')
// After
expect(homeUrls).toContain('https://vaxtimyoxdu.com/en')
```

- [ ] **Step 6.4: Run sitemap test — expect PASS**

```bash
npm run test:run -- src/app/__tests__/sitemap.test.ts
```

Expected: all sitemap tests PASS.

- [ ] **Step 6.5: Commit**

```bash
git add src/app/sitemap.ts src/app/__tests__/sitemap.test.ts
git commit -m "$(cat <<'EOF'
refactor(sitemap): import shared getLocalizedUrl, drop duplicated helper

sitemap.ts maintained its own copy of the URL builder, which
silently drifted from src/lib/utils/seo/url.ts. Switching to the
shared helper means sitemap URLs inherit the Bug A root-path fix
(no trailing slash on /en, /tr, /ru) and any future shape changes
propagate automatically.

Refs: docs/superpowers/plans/2026-04-11-hreflang-bugfix.md (Bug D)
EOF
)"
```

### Task 7: Full test suite + build

- [ ] **Step 7.1: Run the full Vitest suite**

```bash
npm run test:run
```

Expected: all 2943+ tests PASS (baseline from Session 22). No new failures introduced by tasks 1-6.

If any unrelated test fails — stop, investigate, and loop back to Phase 1 of systematic-debugging. Do NOT push through.

- [ ] **Step 7.2: Run production build**

```bash
npm run build
```

Expected:
- Build SUCCESS
- 820 static pages generated (matches Session 22 baseline)
- No TypeScript errors
- No new warnings about metadata or alternates

- [ ] **Step 7.3: Inspect a built page's HTML manually**

```bash
grep -Eio 'hreflang[^"]*"[^"]*"' .next/server/app/en.html | head -20
grep -Eio 'hreflang[^"]*"[^"]*"' .next/server/app/\[locale\]/tools.html 2>/dev/null | head -20
```

Expected: no `/en/` trailing-slash URLs in any `hreflang` attribute. All locale-prefixed homepage URLs must be `/en`, `/tr`, `/ru` (no slash).

### Task 8: Real browser verification (Qayda F — CSP/SSR/hydration changes all require live browser test)

- [ ] **Step 8.1: Start dev server in background**

```bash
npm run dev &
sleep 5
```

- [ ] **Step 8.2: Use chrome-devtools-mcp to fetch each locale home**

```
Navigate to http://localhost:3000/
Take snapshot
Navigate to http://localhost:3000/en
Take snapshot
Navigate to http://localhost:3000/tr
Take snapshot
Navigate to http://localhost:3000/ru
Take snapshot
```

For each snapshot, extract all `<link rel="alternate">` tags. Verify:
- No `/en/`, `/tr/`, `/ru/` (trailing slash) in hreflang hrefs
- All 4 locales present + `x-default`
- Canonical matches self-reference

- [ ] **Step 8.3: Verify a blog post page**

Pick a blog slug from `src/data/blog-posts.ts` (e.g. check `blogPostsByLocale.az` for an AZ-only slug if one exists, else any common slug).

```
Navigate to http://localhost:3000/blog/<slug>
Take snapshot → extract hreflang
Navigate to http://localhost:3000/en/blog/<slug>
Check: if it 404s, the slug is locale-specific
```

Expected: hreflang on a multi-locale blog post lists all 4 locales; hreflang on an AZ-only blog post lists only AZ.

- [ ] **Step 8.4: Stop the dev server**

```bash
# Find and kill next dev
pkill -f 'next dev' || true
```

### Task 9: Deploy pipeline

- [ ] **Step 9.1: Final git status + diff review**

```bash
git status
git log --oneline -10
```

Expected: 3 new commits (Task 2, 5, 6) plus optional Task 3 commit, plus this plan file. Clean working tree otherwise.

- [ ] **Step 9.2: Push to GitLab (triggers Vercel auto-deploy)**

```bash
git push origin main
```

Expected: GitLab pipeline green → Vercel picks up → ~4 min to production.

- [ ] **Step 9.3: Push to GitHub mirror**

```bash
git push github main
```

- [ ] **Step 9.4: Wait for Vercel deploy, then verify production**

```bash
# Wait for deploy (~4 min), then:
curl -sI https://vaxtimyoxdu.com/en | head -5  # must be 200, not 308
curl -s https://vaxtimyoxdu.com/sitemap.xml | grep 'hreflang' | head -10
# Verify /en not /en/ in hreflang hrefs
curl -s https://vaxtimyoxdu.com/ | grep -Eio 'hreflang[^"]*"https://[^"]*"' | sort -u
```

Expected:
- `/en` returns HTTP 200 (not 308)
- Sitemap `hreflang` hrefs use `/en`, `/tr`, `/ru` (no trailing slash)
- HTML `hreflang` set on homepage: `vaxtimyoxdu.com/`, `/en`, `/tr`, `/ru`, and `x-default → /`

### Task 10: Post-deploy SEO dispatch

- [ ] **Step 10.1: Ping Google and Bing sitemaps**

```bash
curl -s "https://www.google.com/ping?sitemap=https://vaxtimyoxdu.com/sitemap.xml"
curl -s "https://www.bing.com/ping?sitemap=https://vaxtimyoxdu.com/sitemap.xml"
```

- [ ] **Step 10.2: Submit sitemap via GSC MCP**

Use `mcp__search-console__sitemaps_submit` with `feedpath: /sitemap.xml` and `siteUrl: https://vaxtimyoxdu.com`.

- [ ] **Step 10.3: Update `docs/session-state.md`**

- Remove "hreflang bug" from the HIGH backlog (it's no longer pending).
- Add a Session 23 entry summarising this fix, the commits, and the deploy outcome.
- Bump the `**Son commit:**` and `**Testlər:**` lines.

- [ ] **Step 10.4: Commit session-state update**

```bash
git add docs/session-state.md docs/superpowers/plans/2026-04-11-hreflang-bugfix.md
git commit -m "docs(session): log Session 23 hreflang bugfix + close HIGH backlog item"
git push origin main && git push github main
```

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Sitemap test has many homepage-row assertions to update | Medium | Low — repetitive but mechanical | Task 6.3 explicitly grep-based; adjust as needed |
| A blog post slug genuinely differs across locales (translated slugs) | Unknown — needs data check | Low — new logic handles it correctly | Probe logic only emits hreflang for locales with matching slug |
| `generateMetadata` import graph breaks when adding `blogPostsByLocale` export | Low — it's already exported | N/A | Verified in blog-posts.ts:2857 |
| Next.js 15 metadata serializer changes case on alternates.languages keys | Low — documented stable API | Low | Out of scope per plan |
| Vercel cache stale after deploy | Medium | Low | Task 9.4 uses fresh `curl` (no cache); if stale, `vercel --prod --force` |
| Test snapshot mocks break when page body imports server-only modules | Medium | Medium | Task 4.1 mocks both `@/data/blog-posts` AND `next-intl/server` |
| `next-intl` `getTranslations` mock insufficient — page body imports fail on module load | Low | Medium | Test only imports `generateMetadata`, not the default component export |

---

## Success Criteria

1. ✅ `curl -sI https://vaxtimyoxdu.com/en` returns `HTTP/2 200` (not 308)
2. ✅ `https://vaxtimyoxdu.com/sitemap.xml` contains no `hreflang="..." href=".../en/"` (trailing slash) entries
3. ✅ Every live homepage variant's HTML `<link rel="alternate">` tags list `/en`, `/tr`, `/ru` without trailing slash
4. ✅ Every blog/[slug] page's hreflang set matches the locales where that slug actually exists — no 404 alternates
5. ✅ All 2943+ Vitest tests PASS
6. ✅ Production build succeeds with 820 static pages
7. ✅ Chrome DevTools snapshot on production confirms no hreflang redirect chains
8. ✅ `docs/session-state.md` no longer lists "hreflang bug" in HIGH backlog

---

## Self-Review Checklist (for plan author)

- [x] **Spec coverage**: Bugs A, B, C, D all have dedicated tasks (A: Task 1-2, B: Task 4-5, C: Task 6, D: Task 6.1). Out-of-scope items are explicitly enumerated.
- [x] **Placeholder scan**: No TBD, no "implement later", no "add appropriate error handling". All code blocks contain complete code.
- [x] **Type consistency**: `blogPostsByLocale: Record<string, Record<string, BlogPost>>` — matches usage in Task 5.2. `getLocalizedUrl(path: string, locale: Locale)` signature preserved in Task 2.1. `locales` import type is compatible with the `for (const loc of locales)` iteration.
- [x] **File path accuracy**: All paths use absolute project-root form matching the codebase.
- [x] **Commit messages**: Follow existing convention (`fix(seo):`, `refactor(sitemap):`, `test(seo):`, `docs(session):`) and include `Refs:` backlink to this plan file.

---

## Execution Handoff

**Two execution options:**

1. **Subagent-Driven (recommended)** — PO dispatches a fresh Next.js engineer subagent per task, reviews between tasks, fastest iteration path. Matches the team mode the user requested.
2. **Inline Execution** — Execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints at Task 2, 5, 6, 7, 9.

**Which approach, CEO?**
