# SEO & Tracking Invariants — vaxtimyoxdu.com

> **Owner:** SeoPro (Senior SEO Specialist, `gate-infra` team)
> **Authority:** This document is the single source of truth for SEO/tracking VETO decisions during Sprints 1–6 of the backlog execution plan (`/Users/raufabdullayev/.claude/plans/vast-tickling-thimble.md`).
> **Scope:** Tracking primitives, canonical URLs, hreflang, metadata length, JSON-LD schemas, sitemap completeness, third-party providers.
> **Out of scope (owned by SmmPro in `SMM_CONTENT_INVARIANTS.md`):** Share buttons, OG images, brand voice, CTA copy.
> **Companion process doc:** `docs/review-cowork.md` (review workflow mechanics, owned by QaPro).

---

## How to use this document

1. **Reviewing a PR / sprint deliverable:** Walk the "Reviewer Checklist" table at the bottom of this file. If any row fails, you have grounds to issue a `VETO` with a citation to the specific invariant number.
2. **Issuing a VETO:** Cite the invariant number (e.g., `VETO #4: violates Canonical URL invariant — see SEO_TRACKING_INVARIANTS.md §4`). Include the offending file path and line number. Suggest the minimal fix.
3. **When you cannot block:** If the concern is NOT in this document, you must use `APPROVE_WITH_FOLLOWUP` instead of VETO and add the concern to a backlog item for the next invariant revision.
4. **Updating this document:** Any change to the invariants below requires PO approval and a schema version bump (see §11).

---

## Schema version

Current version: **1.0.0** (2026-04-11)

| Version | Date | Changes |
|---|---|---|
| 1.0.0 | 2026-04-11 | Initial Sprint 0 codification of 10 invariants |

A **schema version bump** is required when:
- A new `event_type` literal is added to the analytics endpoint allowlist (§1)
- The POST body shape of `/api/analytics/track` changes (§2)
- A new tracking provider is introduced (§10)
- Any rule in §1–§10 is loosened or removed

A patch bump (e.g., 1.0.0 → 1.0.1) is acceptable for:
- Clarifications, examples, or additional verification commands
- New invariants that are stricter than existing ones (additive)

---

## 1. Event allowlist

### Rule

The `/api/analytics/track` endpoint accepts **exactly 10 event_type literals** and rejects everything else with a silent 204. No new event_type literals may be introduced without an explicit schema version bump in this document.

### The 10 allowed event_type values

```
1.  page_view
2.  tool_use
3.  newsletter_subscribe
4.  share_click
5.  tool_complete
6.  scroll_depth
7.  search_query
8.  outbound_click
9.  404_error
10. session_engagement
```

### Cite

`src/app/api/analytics/track/route.ts:29-40`

### Why this matters

The allowlist is enforced server-side at line 75 (`!ALLOWED_EVENT_TYPES.has(event_type)`). Any client that fires an event_type outside this set receives a silent 204 — no error, no log entry, no data captured. This means a typo (e.g., `page-view` instead of `page_view`) or a casually added new event will fail silently and the missing data will only be discovered weeks later in a Looker report. Locking the list to a versioned set forces every change through review.

### How to verify

```bash
# Confirm the current allowlist matches this document
grep -n "'" src/app/api/analytics/track/route.ts | grep -v import | head -20

# Find any client-side code firing events not in the allowlist
grep -rEn "event_type:\s*['\"]" src/components src/app | \
  grep -vE "'(page_view|tool_use|newsletter_subscribe|share_click|tool_complete|scroll_depth|search_query|outbound_click|404_error|session_engagement)'"
```

If the second command returns any results, you have an unauthorized event_type in client code — VETO.

### VETO triggers

- A new string literal added to the `ALLOWED_EVENT_TYPES` Set without a schema version bump in §11
- Client code fires an event_type not in the allowlist
- The allowlist is converted from a `Set` to a more permissive structure (e.g., regex match, "any string")

---

## 2. POST body shape (analytics endpoint contract)

### Rule

The `/api/analytics/track` endpoint accepts a JSON body with the exact shape:

```typescript
{
  event_type: string,         // required, must be in allowlist (§1)
  event_data: object | null,  // optional, must be a plain object (not array)
  page_path: string | null,   // optional, validated as non-empty string
  locale: string | null,      // optional, max 10 chars
}
```

Clients **must** use the `useTrackToolUse` hook (or future named hooks following the same pattern) to fire events. Raw `fetch('/api/analytics/track', ...)` calls from arbitrary components are forbidden.

### Cite

- Server validation: `src/app/api/analytics/track/route.ts:72-85`
- Reference client implementation: `src/components/analytics/useTrackToolUse.ts:34-46`

### Why this matters

The hook centralizes three things that are easy to get wrong if every component re-implements them:

1. **Deduplication** — `useTrackToolUse.ts:30` short-circuits if the same toolSlug was already tracked on this page load. Without this, a user clicking a button 10 times inflates `tool_use` counts by 10×.
2. **Fire-and-forget semantics** — `keepalive: true` (line 43) ensures the request survives page navigation, and `.catch(() => {})` (line 44) ensures analytics errors never break the UX.
3. **Pathname + locale auto-injection** — `usePathname()` and `useLocale()` (lines 23–24) are pulled from React context, so callers cannot pass stale values.

A raw `fetch` call from a random component will skip dedup, may bubble errors into the React tree, and may pass a hand-rolled pathname that drifts from `usePathname()`.

### How to verify

```bash
# Find any raw fetch to the analytics endpoint outside the hooks directory
grep -rEn "fetch\(['\"]/api/analytics/track" src/ | \
  grep -v "src/components/analytics/"

# Confirm the hook still uses the canonical 4-field shape
grep -A 8 "JSON.stringify" src/components/analytics/useTrackToolUse.ts
```

The first command must return zero results outside `src/components/analytics/`. If a new tracking hook is added (e.g., `useTrackShareClick`), it must live in that directory and follow the same fire-and-forget + dedup pattern.

### VETO triggers

- Raw `fetch('/api/analytics/track', ...)` outside `src/components/analytics/`
- A new tracking hook that omits `keepalive: true`
- A new tracking hook that lets exceptions bubble to React (no `.catch(() => {})`)
- Any change that adds a 5th top-level field to the POST body without bumping the schema version

---

## 3. Consent gate (GDPR + ePrivacy)

### Rule

Google Analytics and **any other third-party tracking script** must:

1. Default to "denied" consent state on first page load (Google Consent Mode v2).
2. Only fire `gtag('consent', 'update', { ... 'granted' })` after the user explicitly clicks Accept on the consent dialog.
3. Read `localStorage.getItem('cookie-consent')` and treat the value `'accepted'` as the only state in which tracking may run. Values `'rejected'`, `null`, or any other string mean tracking is **off**.

The first-party `/api/analytics/track` endpoint is **exempt** from the consent gate because it is a strictly necessary cookie-free analytics call (no PII, no cross-site tracking, no third-party transfer). This exemption is documented here so future reviewers don't try to gate it.

### Cite

- Consent dialog + handlers: `src/components/layout/CookieConsent.tsx:15-48`
- Consent update call (granted state): `src/components/layout/CookieConsent.tsx:32-40`
- LocalStorage key (literal `'cookie-consent'`): `src/components/layout/CookieConsent.tsx:15,26,45`

### Why this matters

Misconfigured consent is one of the few SEO/analytics changes that can result in a regulator fine, not just a ranking drop. The current implementation correctly:

- Uses `'cookie-consent'` as the localStorage key (NOT `'consent'` or `'cookies'` — match exactly)
- Updates four storage signals (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`) — Consent Mode v2 requires all four; v1 only required two
- Does not render a "third option" — the dialog returns `null` once a choice is stored, so the user is never re-prompted unless they clear localStorage

If a new third-party script is added (Hotjar, Clarity, Meta Pixel, LinkedIn Insight Tag, etc.), it must:

1. Initialize in a "denied" state
2. Subscribe to the same consent decision (read from localStorage on mount, listen for the Accept click)
3. Be added to §10 with CEO sign-off

### How to verify

```bash
# Confirm the localStorage key is the canonical 'cookie-consent'
grep -rn "cookie-consent" src/ | grep -v test

# Find any third-party script tag added without consent gating
grep -rEn "<Script|gtag\(|fbq\(|hotjar|clarity\.ms" src/app src/components | \
  grep -v "CookieConsent.tsx"
```

The second command should only return results where the script is conditionally rendered behind a consent check, OR where the script self-initializes in a denied state and waits for the consent update.

### Browser-side verification (chrome-devtools)

```javascript
// 1. Open the site in incognito (clears localStorage)
// 2. In DevTools console:
localStorage.getItem('cookie-consent')  // expected: null
typeof window.gtag                        // expected: 'function' (script loaded but denied)
// gtag should NOT have fired any pageview yet

// 3. Click "Accept" in the cookie banner
localStorage.getItem('cookie-consent')  // expected: 'accepted'
// Now check Network tab: a /collect request to google-analytics.com should appear
```

### VETO triggers

- A new script that fires before the consent decision is stored
- The localStorage key is renamed from `'cookie-consent'` (breaks all existing user choices)
- The consent update omits one of the four Consent Mode v2 signals
- A "Reject" path that still allows tracking (silent re-enable)

---

## 4. Canonical URL construction

### Rule

Every canonical URL, hreflang URL, sitemap URL, and any other absolute URL emitted to search engines or shared links **must** be constructed via the shared `getLocalizedUrl(path, locale)` helper. Manual string concatenation (`https://vaxtimyoxdu.com${path}`, template literals with `SITE_URL`, or hand-rolled locale prefixing) is forbidden.

### Cite

- Helper definition: `src/lib/utils/seo/url.ts:17-28`
- Hreflang generator: `src/lib/utils/seo/url.ts:35-51`
- Sitemap usage (post-Session 23 fix): `src/app/sitemap.ts:6,18-22`
- Tool metadata usage: `src/lib/utils/seo/metadata.ts:67`
- Article metadata usage: `src/lib/utils/seo/metadata.ts:123`
- Blog post metadata usage: `src/lib/utils/seo/metadata.ts:180`
- Breadcrumb usage: `src/components/layout/Breadcrumb.tsx:24`

### Why this matters

Session 23 (2026-04-11) fixed three hreflang bugs that all stemmed from drift between the sitemap and the HTML `<link rel="alternate">` emissions. The root cause was that `sitemap.ts` had its own `localizedUrl` helper that did not match the `getLocalizedUrl` used elsewhere — specifically, it appended a trailing slash for non-default locales (`/en/`), which Next.js then 308-redirected to `/en`, eating a redirect on every hreflang resolution by Googlebot.

The non-obvious behavior locked in by `getLocalizedUrl`:

1. **Default locale (`az`) on the root path** keeps the trailing slash: `https://vaxtimyoxdu.com/`
2. **Non-default locales on the root path** drop the trailing slash: `https://vaxtimyoxdu.com/en` (NOT `/en/`)
3. **Any other path** uses the locale prefix only for non-default locales: `/en/tools/word-counter` vs `/tools/word-counter`

If a future change needs a slightly different URL shape (e.g., adding a region subdomain), the change must happen **inside** `getLocalizedUrl` so all 7 call sites listed above pick it up automatically. Adding a parallel helper is the exact failure mode that caused the Session 23 incident.

### How to verify

```bash
# Find any manual URL construction that bypasses the helper
grep -rEn "https?://vaxtimyoxdu\.com" src/ | \
  grep -v "src/lib/utils/seo/url.ts" | \
  grep -v "test" | \
  grep -v "robots.ts"

# Confirm sitemap.ts imports from the shared helper (Session 23 fix)
grep -n "getLocalizedUrl" src/app/sitemap.ts
```

The first command should return only the `metadataBase` declaration in `layout.tsx` and other places where the literal `https://vaxtimyoxdu.com` is unavoidable (e.g., env-driven defaults). Any URL meant for a search engine must go through the helper.

### Browser-side verification (Session 23 invariant — keep checking on every metadata PR)

```javascript
// Visit https://vaxtimyoxdu.com/en in Chrome DevTools and run:
const links = [...document.querySelectorAll('link[rel="alternate"]')]
links.map(l => ({ hreflang: l.hreflang, href: l.href }))

// Expected: 5 entries (az, en, tr, ru, x-default), all built from getLocalizedUrl
// CRITICAL: hreflang="en" must be href="https://vaxtimyoxdu.com/en" (NO trailing slash)
// CRITICAL: hreflang="az" and x-default must both be "https://vaxtimyoxdu.com/" (with slash)
```

### VETO triggers

- Any new helper that builds canonical URLs without delegating to `getLocalizedUrl`
- Direct template literal `\`${SITE_URL}/${locale}${path}\`` in a metadata file
- A hreflang URL that re-introduces the `/en/` (with trailing slash) shape
- A new page route that hand-rolls its canonical instead of using one of the four `generate*Metadata` factories

---

## 5. Hreflang 4-locale requirement

### Rule

Every public page must emit `<link rel="alternate" hrefLang>` entries for **all 4 locales** (`az`, `en`, `tr`, `ru`) plus `x-default`, **with one critical exception**: if a piece of content does not exist in a given locale (e.g., a blog post is AZ-only), the page must **omit** that locale's hreflang entry — it must NOT emit a hreflang to a 404 URL.

This is the "cross-locale mismatch" rule. A page that is published in 2 of 4 locales should emit 3 hreflang links (the 2 locales + x-default), not 5.

### Cite

- Hreflang generator (full 4-locale set): `src/lib/utils/seo/url.ts:35-51`
- Sitemap per-page alternates builder: `src/app/sitemap.ts:15-24`
- Per-locale probe for blog posts (Session 23 Bug B fix): `src/app/[locale]/blog/[slug]/page.tsx::generateMetadata` (probes `blogPostsByLocale[loc]?.[slug]`)
- Locale list (the canonical 4): `src/i18n/config.ts:1` — `['az', 'en', 'tr', 'ru']`

### Why this matters

Session 23 closed two related hreflang bugs:

- **Bug 1** — Root path emitted `/en/` (with slash), Googlebot followed and got 308 → wasted crawl budget
- **Bug 2** — Sitemap had a duplicated helper that drifted from the metadata helper
- **Bug B** — Blog post `generateMetadata` emitted hreflang for all 4 locales even when the post only existed in 2 of them, causing 404s on the alternate URLs and a "Hreflang error: no return tag" warning in Search Console

The current implementation handles all three correctly. The non-obvious rule is **omission, not redirect**: if a post does not exist in `en`, do not link to `/en/blog/<slug>`. Do not 301-redirect `/en/blog/<slug>` to the AZ version either — Google penalizes that pattern.

### Locale enumeration (memorize this — it is the only valid set)

```typescript
const locales = ['az', 'en', 'tr', 'ru'] as const
// Default locale: 'az' (no URL prefix)
// x-default points to: 'az' variant
```

### How to verify

```bash
# Confirm the locale list has not been changed
grep -n "locales =" src/i18n/config.ts

# Find any page that emits hreflang for a hardcoded subset (e.g., only 2 locales)
grep -rEn "hreflang|alternates.*languages" src/app src/lib | \
  grep -v test

# Confirm the blog post per-locale probe is still in place
grep -n "blogPostsByLocale" src/app/\[locale\]/blog/\[slug\]/page.tsx
```

### Browser-side verification

```javascript
// On any tool page (exists in all 4 locales):
[...document.querySelectorAll('link[rel="alternate"]')].length
// expected: 5 (az, en, tr, ru, x-default)

// On an AZ-only blog post:
[...document.querySelectorAll('link[rel="alternate"]')]
  .map(l => l.hreflang).sort()
// expected: ['az', 'x-default']  (NOT ['az', 'en', 'ru', 'tr', 'x-default'])
```

### VETO triggers

- A new page that hardcodes a subset of locales in its hreflang (e.g., only `az` + `en`)
- A page that emits hreflang to a URL that returns 404 in another locale
- A page that 301-redirects cross-locale alternates instead of omitting them
- The locale list is changed from `['az', 'en', 'tr', 'ru']` without a coordinated update to: i18n config, sitemap, all metadata factories, and this document

---

## 6. Title length: ≤60 characters per locale

### Rule

The rendered `<title>` tag for every public page must be **≤60 characters** in every locale. This is the value emitted to the browser and to search engines, including the site name suffix.

The 5-character buffer under the SERP truncation limit (~65 chars on desktop) accounts for:
- Pixel-width variation across glyphs (Cyrillic and Turkish characters render slightly wider)
- Mobile SERP truncation (which is more aggressive than desktop)
- Brand name appended by `generateBaseMetadata` and `generateToolMetadata`

### Cite

- Tool title rendering: `src/lib/utils/seo/metadata.ts:74` — `\`${name} — ${titleSuffix} | ${SITE_NAME}\``
- Article title rendering: `src/lib/utils/seo/metadata.ts:131` — `\`${title} - ${SITE_NAME}\``
- Blog post title rendering: `src/lib/utils/seo/metadata.ts:188` — `\`${title} - ${SITE_NAME} Blog\``
- Base metadata title: `src/lib/utils/seo/metadata.ts:18`

### Why this matters

Session 22 audited every tool page title and found 14 locale variants exceeded 65 characters, the most egregious being a Turkish "PDF Birleştirici" title that rendered as "PDF Dosyalarını Birleştirici — Ücretsiz, Yükleme Gerektirmez | Vaxtim Yoxdu" (78 chars). Google truncated this to "PDF Dosyalarını Birleştirici — Ücretsiz, Yükleme..." which buried the brand name and the keyword "Vaxtim Yoxdu".

The 60-char rule is enforced **at the rendered title level**, not at the input fields, because the metadata factories append a suffix (` | Vaxtim Yoxdu`, ` - Vaxtim Yoxdu Blog`, etc.) that varies by content type. A 50-char tool name becomes a 78-char rendered title once the suffix is added.

### Important note on the Tool type

The `Tool` interface (`src/types/tool.ts:3-13`) does **not** currently have `metaTitle` or `metaDescription` fields. The rendered title is derived from `tool.name` plus the suffix in `generateToolMetadata` line 74. If a future PR adds explicit `metaTitle`/`metaDescription` fields to the Tool type to give content authors finer control, they MUST be enforced against this 60-char rule with a build-time check.

### How to verify

```bash
# Run the title length audit (manual until a build-time check is added)
node -e "
const { tools } = require('./src/config/tools');
const SITE = ' | Vaxtim Yoxdu';
const SUFFIXES = {
  default: ' — Free, No Upload Required' + SITE,
  // (locale-specific suffixes can be added here)
};
tools.forEach(t => {
  const rendered = t.name + SUFFIXES.default;
  if (rendered.length > 60) {
    console.log('FAIL', rendered.length, rendered);
  }
});
"
```

For locale-specific titles (after the `metaTitle` field is added), repeat the audit per-locale in `messages/{az,en,tr,ru}.json`.

### Browser-side verification

```javascript
document.title.length
// expected: ≤60 on every public page
// If >60, screenshot the SERP preview at https://www.bing.com/webmaster/serpsnippet
```

### VETO triggers

- A tool name added that produces a rendered title > 60 characters
- A locale translation in `messages/*.json` that expands the title past 60 chars
- A new title format in `generate*Metadata` that does not enforce a character budget
- Removal of the brand suffix to "save chars" without PO approval (brand recognition is non-negotiable)

---

## 7. Meta description length: ≤155 characters per locale

### Rule

The `<meta name="description">` content for every public page must be **≤155 characters** in every locale. This is enforced at the value passed to the metadata factories, before they wrap it in OpenGraph and Twitter card variants.

### Cite

- Tool description used directly (no auto-truncation): `src/lib/utils/seo/metadata.ts:63-65,75`
- Article description used directly: `src/lib/utils/seo/metadata.ts:132`
- Blog post description used directly: `src/lib/utils/seo/metadata.ts:189`
- Base metadata description: `src/lib/utils/seo/metadata.ts:19`
- OG image subtitle uses `description.slice(0, 80)`: `src/lib/utils/seo/metadata.ts:70,127,184` — note this is OG-only, the meta description itself is NOT truncated

### Why this matters

155 characters is the conservative SERP snippet limit (Google has used 155–160 for years; mobile snippets are sometimes 130). Session 22 set this as the hard rule with a 5-char buffer.

The non-obvious risk: the tool description is **used directly** at line 65 (with the optional browser-based note appended for client-side tools, line 64). For client-side tools, the rendered description becomes:

```
<baseDescription> 100% browser-based — your files never leave your device.
```

The "browser-based note" is 53 characters. So a tool whose `description` field is 110 characters becomes a 163-character meta description after the note is appended — over budget. **The 155-char rule applies to the rendered output, not the input.**

### How to verify

```bash
# Count description length per tool (raw, before browser-based note)
node -e "
const { tools } = require('./src/config/tools');
const NOTE = ' 100% browser-based — your files never leave your device.';
tools.forEach(t => {
  const rendered = t.isClientSide ? t.description + NOTE : t.description;
  if (rendered.length > 155) {
    console.log('FAIL', rendered.length, t.slug, rendered.slice(0, 80) + '...');
  }
});
"
```

### Browser-side verification

```javascript
document.querySelector('meta[name="description"]').content.length
// expected: ≤155 on every public page
```

### VETO triggers

- A new tool description that exceeds 155 chars after the browser-based note is appended
- A locale translation that expands a description past 155 chars
- A change to the browser-based note that lengthens it without a corresponding shortening of the description budget
- A page that does not emit a meta description at all

---

## 8. JSON-LD structured data schemas

### Rule

The site emits JSON-LD inside `<script type="application/ld+json">` tags rendered as inline HTML. Every page type must emit the appropriate schema, and the schema must validate via `mcp__search-console__schema_validate` before deployment.

| Page type | Required schema(s) | Optional schema(s) |
|---|---|---|
| Tool page (`/tools/{slug}`) | `SoftwareApplication` | `FAQPage`, `HowTo` |
| Blog post (`/blog/{slug}`) | `Article` | `BreadcrumbList` |
| News article (`/info/{slug}`) | `Article` | `BreadcrumbList` |
| Any page with breadcrumbs | `BreadcrumbList` | — |
| Homepage | `Organization` or `WebSite` | — |

### Cite

- `SoftwareApplication` generator: `src/lib/utils/seo/json-ld.ts:23-60`
- `HowTo` generator: `src/lib/utils/seo/json-ld.ts:66-154`
- `FAQPage` generator: `src/lib/utils/seo/json-ld.ts:156-178`
- `BreadcrumbList` generator: `src/components/layout/Breadcrumb.tsx:17-26`
- Schema test coverage: `src/lib/utils/__tests__/seo.test.ts:233,437,441` and `src/components/layout/__tests__/Breadcrumb.test.tsx:84`

### Why this matters

JSON-LD is the most reliable way to communicate page semantics to Google, Bing, and emerging LLM crawlers (GPTBot, ClaudeBot, PerplexityBot). The schemas listed above are the **minimum** for each page type. Adding extra schemas (e.g., `Review`, `AggregateRating`) is allowed only if the data is real — fake or hallucinated review counts will trigger a manual action from Google.

The current `SoftwareApplication` schema (lines 23–60) emits a complete object including `applicationCategory`, `operatingSystem: 'Web Browser'`, `inLanguage`, an `Offer` with `price: '0'`, and `creator`/`publisher` references. Removing any of these fields requires PO approval because they affect rich result eligibility.

### How to verify (CLI)

```bash
# Find all JSON-LD emissions
grep -rn 'application/ld+json' src/

# Confirm the four required schema types are still imported in their pages
grep -rn "generateToolJsonLd\|BreadcrumbList\|generateToolFaqJsonLd" src/app
```

### How to verify (MCP)

```
# Validate a tool page schema before merging
mcp__search-console__schema_validate(url: "https://vaxtimyoxdu.com/tools/word-counter")

# Expected output: no errors, all schemas parseable
# Acceptable warnings: missing optional fields like `aggregateRating`
# UNACCEPTABLE warnings: type mismatches, malformed JSON, schema not recognized
```

Run this check on:

1. One tool page per category (text, image, pdf, ai, dev, generators) — 6 calls total
2. One blog post per locale — 4 calls
3. One news article per locale — 4 calls
4. Homepage in default locale — 1 call

### VETO triggers

- A new page type added without a corresponding JSON-LD schema
- A schema change that breaks validation (use `mcp__search-console__schema_validate` to confirm)
- A schema with hallucinated data (fake reviews, made-up ratings, fabricated counts)
- Removal of `inLanguage`, `applicationCategory`, or `operatingSystem` from `SoftwareApplication`
- Removal of `BreadcrumbList` from a page that has a breadcrumb UI (mismatch between visual and structured data)

---

## 9. Sitemap completeness

### Rule

Every public URL must appear in `src/app/sitemap.ts` output. The Session 23 baseline is **628 URLs** (4 locales × 157 unique paths, with cross-locale omissions for AZ-only content). Any change that adds a new public route must add a corresponding entry to `sitemap.ts`. Any change that adds a new locale must update the `locales` array in `src/i18n/config.ts:1` AND verify the sitemap regenerates correctly.

### Cite

- Sitemap factory: `src/app/sitemap.ts:46`
- Static page enumeration: `src/app/sitemap.ts:51-59`
- Tool page generation: `src/app/sitemap.ts:62-65`
- News article per-locale logic (handles cross-locale omission): `src/app/sitemap.ts:68+`
- Sitemap test coverage: `src/app/__tests__/sitemap.test.ts`

### Why this matters

URLs not in the sitemap can still be crawled, but Googlebot prioritizes sitemap-listed URLs and uses sitemap freshness signals (`lastModified`) to schedule recrawls. A new tool page that ships without a sitemap entry may take 2–4 weeks longer to appear in SERPs.

The Session 23 fix (commit `ec9d88b`) eliminated the duplicated `localizedUrl` helper in `sitemap.ts` so it now imports `getLocalizedUrl` from the shared module. This means:

1. The sitemap cannot drift from the HTML hreflang emissions (single source of truth)
2. Any future change to URL shape automatically propagates to the sitemap

The 628-URL count breakdown (current as of 2026-04-11):

- Static pages: 7 paths × 4 locales = 28 URLs
- Tool pages: ~111 tools × 4 locales = ~444 URLs (varies as new tools are added)
- News articles: ~44 articles, mostly 1 locale each (AZ-only content) = ~44 URLs
- Blog posts: ~28 posts × variable locale coverage = ~112 URLs

### How to verify

```bash
# Count URLs in the generated sitemap
curl -s https://vaxtimyoxdu.com/sitemap.xml | grep -c "<loc>"
# expected: ~628 (drift of ±10 is acceptable as content is added)

# Confirm sitemap import is the shared helper (Session 23 fix)
grep -n "import.*getLocalizedUrl" src/app/sitemap.ts
```

### Browser-side verification

```bash
# Spot-check a tool page is in the sitemap
curl -s https://vaxtimyoxdu.com/sitemap.xml | grep "tools/word-counter"
# expected: 4 entries (az, en, tr, ru)
```

### VETO triggers

- A new public page added without a corresponding `localeEntries(...)` call in `sitemap.ts`
- A new tool added to `src/config/tools/*` whose slug does not appear in the sitemap output
- A locale added to `src/i18n/config.ts` without `localeEntries` regenerating
- The sitemap reverts to a hand-rolled URL helper instead of importing `getLocalizedUrl`

---

## 10. No new tracking providers without CEO approval

### Rule

Adding a new third-party tracking script (Mixpanel, Segment, Hotjar, Microsoft Clarity, Meta Pixel, LinkedIn Insight Tag, TikTok Pixel, Pinterest Tag, Amplitude, PostHog, etc.) requires **explicit CEO approval**, not just SeoPro/SmmPro reviewer approval. This invariant is the only one in this document where the reviewer cannot grant approval — it must be escalated.

The current third-party tracking surface is intentionally minimal:

1. **Google Analytics 4** (gated by Consent Mode v2 — see §3)
2. **Google Search Console** (verification only, no client-side script)
3. **Bing Webmaster Tools** (verification only, no client-side script)
4. **First-party `/api/analytics/track`** (consent-exempt — see §3)

Any addition to this list is a privacy + performance + maintainability decision that the CEO owns.

### Why this matters

Each new tracking script adds:

- **Privacy obligations** — updated cookie banner, updated privacy policy, possibly DPA with the vendor
- **Performance cost** — typically 30–80ms blocking time on first paint, plus an extra DNS lookup
- **Schema complexity** — vendor-specific event schemas that can drift from the first-party event allowlist (§1)
- **Vendor lock-in risk** — a year of historical data that lives outside the project

The current single-vendor (GA4) + first-party setup is the lowest-risk configuration. Adding a second vendor doubles the privacy surface area for marginal incremental insight.

### How to verify

```bash
# Find any third-party script tag added to the codebase
grep -rEn "<script.*src=['\"]https?://" src/app src/components | \
  grep -v "google-analytics.com\|googletagmanager.com" | \
  grep -v test

# Confirm no new tracking SDKs in package.json
cat package.json | grep -E "mixpanel|segment|hotjar|clarity|amplitude|posthog"
```

Both commands must return zero results unless CEO approval has been logged in `docs/ceo-action-items.md` for the specific addition.

### VETO triggers

- A new `<Script>` tag from a tracking domain not on the approved list
- A new dependency in `package.json` from a tracking SDK (mixpanel, segment, etc.)
- A first-party endpoint that proxies to a third-party tracker (e.g., `/api/track-mixpanel` that forwards events) — this is "third-party tracking with extra steps" and falls under this rule

This is the only invariant where the correct response to a violation is **not** "VETO with a fix suggestion" — it is "VETO and require CEO sign-off in `docs/ceo-action-items.md` before re-review".

---

## Reviewer Checklist

Use this table during sprint reviews. Walk every row for every PR/sprint deliverable. A `FAIL` in any row is grounds for VETO; cite the invariant number in the VETO message.

| # | Check | Cite | How to verify | Pass criteria |
|---|---|---|---|---|
| 1 | New event_type literals are in the §1 allowlist OR a schema version bump exists in §11 | `src/app/api/analytics/track/route.ts:29-40` | `grep "ALLOWED_EVENT_TYPES" src/app/api/analytics/track/route.ts` | All client-fired event_types appear in the 10-item Set |
| 2 | Client analytics calls go through `useTrackToolUse` (or sibling hooks in `src/components/analytics/`), not raw `fetch` | `src/components/analytics/useTrackToolUse.ts:34-46` | `grep -rEn "fetch\(['\"]/api/analytics/track" src/ \| grep -v "src/components/analytics/"` returns nothing | Zero raw fetches outside the analytics directory |
| 3 | Third-party tracking is gated by `localStorage.getItem('cookie-consent') === 'accepted'`, with Consent Mode v2 default-deny | `src/components/layout/CookieConsent.tsx:15-48` | DevTools: open in incognito, confirm gtag does not fire before Accept click | No tracking events in Network tab pre-consent |
| 4 | Canonical URLs constructed via `getLocalizedUrl(path, locale)` from `src/lib/utils/seo/url.ts:17-28` — no manual concatenation | `src/lib/utils/seo/url.ts:17` | `grep -rEn "https?://vaxtimyoxdu\.com" src/ \| grep -v "url.ts\|test\|robots.ts"` returns only known exceptions | No drift between sitemap and HTML hreflang URL shapes |
| 5 | Hreflang emits all 4 locales (az/en/tr/ru) + x-default; cross-locale mismatches are OMITTED, not 404-linked | `src/i18n/config.ts:1`; `src/app/[locale]/blog/[slug]/page.tsx::generateMetadata` | DevTools: count `<link rel="alternate">` on the page; AZ-only post should have 3 (az, x-default, and any other locale that exists) | No hreflang link returns 404 |
| 6 | Rendered `<title>` ≤60 characters in every locale, including the brand suffix | `src/lib/utils/seo/metadata.ts:74,131,188` | DevTools: `document.title.length ≤ 60` on every public page | Zero pages with `>60` char rendered title |
| 7 | `<meta name="description">` ≤155 characters in every locale, including the browser-based note for client-side tools | `src/lib/utils/seo/metadata.ts:63-65,132,189` | DevTools: `document.querySelector('meta[name="description"]').content.length ≤ 155` | Zero pages with `>155` char meta description |
| 8 | JSON-LD schemas match the page type matrix in §8 and validate via `mcp__search-console__schema_validate` | `src/lib/utils/seo/json-ld.ts:23,156`; `src/components/layout/Breadcrumb.tsx:17` | Run `mcp__search-console__schema_validate` on a sample URL per page type | Zero validation errors; warnings only on optional fields |
| 9 | New public routes appear in `src/app/sitemap.ts` output; total URL count is within ±10 of the Session 23 baseline (628) | `src/app/sitemap.ts:46-65` | `curl -s https://vaxtimyoxdu.com/sitemap.xml \| grep -c "<loc>"` | Result is ≥618 and ≤640 (drift band) |
| 10 | No new third-party tracking scripts (Mixpanel, Hotjar, Pixel, etc.) without CEO approval logged in `docs/ceo-action-items.md` | `package.json`; `src/app/layout.tsx` | `grep -rEn "<script.*src=['\"]https?://" src/ \| grep -v "google-analytics.com\|googletagmanager.com"` returns nothing new | No new tracking providers without CEO sign-off |

### How to record a review decision

After walking the checklist, record one of three verdicts in the PR description or sprint review thread:

- **APPROVE** — All 10 rows pass.
- **APPROVE_WITH_FOLLOWUP** — All 10 rows pass, but you noticed a related concern that is NOT covered by an invariant in this document. File a backlog item to add a new invariant in v1.x of this doc.
- **VETO #N** — Row N failed. Cite the invariant number, the offending file path and line number, and the minimal fix required.

### Escalation path

| Trigger | Action |
|---|---|
| Disagreement on whether a violation occurred | Re-read the cited file, then escalate to PO if still unresolved |
| Invariant is unclear or missing edge case | File a backlog item for v1.x update; do NOT block on the unclear case |
| Row #10 violation (new tracking provider) | Halt review, escalate to CEO via `docs/ceo-action-items.md` |
| Schema version bump needed (rows 1, 2, or 10) | Halt sprint, update §11, route through PO before resuming |

---

## 11. Schema versioning policy (governance)

### Current version

**1.0.0** — Sprint 0 baseline, 2026-04-11

### Bump rules

| Bump type | Trigger | Approval required |
|---|---|---|
| **Major (X.0.0)** | Removing or loosening any invariant; renaming a localStorage key; changing the locale set | PO + CEO |
| **Minor (1.X.0)** | Adding a new invariant; tightening an existing rule; adding a new event_type to the allowlist | PO |
| **Patch (1.0.X)** | Clarification, examples, additional verification commands, typo fixes | SeoPro (self-approve) |

### Bump procedure

1. Open a PR titled `docs(seo-invariants): bump to vX.Y.Z — <reason>`
2. Update the version table at the top of this document
3. Update the §11 "Current version" line
4. List the specific invariant(s) added/changed in the version table
5. Notify SmmPro and QaPro in their respective threads (their docs may need parallel updates)
6. Merge after PO approval

### Out-of-band updates

The SeoPro reviewer may make patch-level updates (typos, clarifications) without a PR review, but must notify the team in the next sprint review. Minor and major bumps always require a PR.

---

## Appendix: Cited file index

For quick navigation during reviews, here is every file referenced by an invariant in this document:

| File | Used by invariants |
|---|---|
| `src/app/api/analytics/track/route.ts` | §1, §2 |
| `src/components/analytics/useTrackToolUse.ts` | §2 |
| `src/components/layout/CookieConsent.tsx` | §3 |
| `src/lib/utils/seo/url.ts` | §4, §5 |
| `src/lib/utils/seo/metadata.ts` | §4, §6, §7 |
| `src/app/sitemap.ts` | §4, §5, §9 |
| `src/lib/utils/seo/json-ld.ts` | §8 |
| `src/components/layout/Breadcrumb.tsx` | §4, §8 |
| `src/i18n/config.ts` | §5, §9 |
| `src/app/[locale]/blog/[slug]/page.tsx` | §5 |
| `src/types/tool.ts` | §6 (note: no metaTitle/metaDescription fields exist yet) |
| `src/config/tools/*.ts` | §6, §7 |
| `package.json` | §10 |
| `docs/ceo-action-items.md` | §10 (escalation log) |

---

**End of document.** Review verdicts must cite the invariant number from this file. If the concern is not in this file, the correct verdict is `APPROVE_WITH_FOLLOWUP` plus a backlog item to add the missing invariant in v1.x.
