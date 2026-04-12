# SMM Content Invariants

> **Owner:** SmmPro
> **Status:** Active (Sprint 0 deliverable, ratified by PO)
> **Scope:** Marketing, brand voice, share/funnel integrity, social-facing assets
> **Authority:** Single source of truth for every SMM VETO during Sprints 1-6

## Purpose

This document codifies WHAT SmmPro is allowed to veto on. Any change to vaxtimyoxdu.com that touches share buttons, OG images, brand voice, CTA copy, the newsletter funnel, footer social links, or related marketing primitives MUST be reviewed against the invariants below.

**Decision rules for SmmPro reviews:**
- **VETO** — change violates one of the numbered invariants in this doc.
- **APPROVE_WITH_FOLLOWUP** — change is fine on its own, but raises a marketing concern that is NOT captured here. File a follow-up task; do NOT block.
- **APPROVE** — change is consistent with all invariants.

If a concern is not in this doc, SmmPro may not block on it. New invariants must be added here via PR before they can be enforced.

**Scope boundary vs. SeoPro:** Technical SEO primitives (title, meta description, canonical, hreflang, schema.org JSON-LD, robots, sitemaps, Core Web Vitals) belong to `SEO_TRACKING_INVARIANTS.md`. This doc covers user-facing marketing/brand surfaces.

---

## 1. Share Button Taxonomy

**Rule:** The share button component on tool pages, blog posts, and news articles MUST support exactly these 6 channels: WhatsApp, Telegram, Twitter (X), Facebook, LinkedIn, and Copy Link. Any new share platform MUST also fire a `share_click` analytics event with the shape `{ event_type: 'share_click', event_data: { platform, toolSlug, url } }`. Removing a platform requires explicit PO approval.

**Cite:** `src/components/common/ShareButtons.tsx:65-124` (platforms array), `src/components/common/ShareButtons.tsx:45-54` (`trackShareClick`)

**How to verify:**
1. Open `src/components/common/ShareButtons.tsx` and confirm the `platforms` array contains exactly: WhatsApp, Telegram, Twitter, Facebook, LinkedIn (5 entries) plus the dedicated Copy Link button (rendered separately).
2. Search the changed file for `trackShareClick(` calls — every share entry point MUST call it.
3. Run Vitest: `npm run test:run -- ShareButtons` (existing test in `src/components/common/__tests__/ShareButtons.test.tsx`).
4. In a browser DevTools Network tab, click each share button and confirm a POST to `/api/analytics/track` fires with the expected `event_type: 'share_click'`.

**Veto triggers:**
- New platform added without `share_click` event wiring.
- Existing platform removed without PO sign-off.
- `event_data.platform` value renamed (breaks analytics taxonomy continuity — the dashboards depend on stable platform names: `whatsapp`, `telegram`, `twitter`, `facebook`, `linkedin`, `copy_link`).

---

## 2. UTM Parameter Preservation

**Rule:** Every share URL emitted by `ShareButtons.tsx` MUST carry `utm_source=share`, `utm_medium=<platform>`, and `utm_campaign=tool_share` query parameters. Any change to share URL generation that strips, reorders, or renames these parameters is a VETO. Adding new UTM keys (e.g., `utm_content`) is permitted; removing or renaming existing ones is not.

**Cite:** `src/components/common/ShareButtons.tsx:36-43` (`buildShareUrl` helper)

**Current `buildShareUrl` contract:**
```
buildShareUrl(baseUrl, utmMedium, campaign)
  → baseUrl?utm_source=share&utm_medium=<utmMedium>&utm_campaign=<campaign>
```
The campaign is hardcoded as `tool_share` at every call site.

**How to verify:**
1. Grep the share component for every `buildShareUrl(` call site — confirm `utm_source=share` and `utm_campaign=tool_share` are present in the resulting URL.
2. In a browser, click each share button and inspect the `target="_blank"` href. Confirm it contains all 3 UTM keys.
3. Manually click a share link from a test post and verify the `utm_*` params land in GA4 / PostHog as expected.

**Veto triggers:**
- A platform handler skips `buildShareUrl` and emits a raw URL.
- The `?` vs `&` separator logic in `buildShareUrl` is broken (test with a base URL that already has a query string).
- Campaign value is changed without an analytics rename plan filed alongside.

---

## 3. OG Image Requirements

**Rule:** Every public-indexed page (homepage, tool pages, blog posts, news articles, info hub) MUST emit an `og:image` of exactly 1200×630 pixels, generated dynamically via `/api/og` and rendered correctly across all 4 supported locales (az, en, tr, ru). Pages without a valid OG image are a VETO.

**Cite:**
- OG generator: `src/app/api/og/route.tsx:106-108` (width/height) and `src/app/api/og/route.tsx:1-110` (full ImageResponse).
- OG URL builder: `src/lib/utils/seo/og.ts:16-25` (`getOgImageUrl`).
- Metadata wiring: `src/lib/utils/seo/metadata.ts:13`, `:68`, `:125`, `:182` (each `generate*Metadata` function calls `getOgImageUrl`).

**Locale support:** The OG route currently accepts `title`, `subtitle`, and `type` query params. Each locale's `generate*Metadata` function passes the localized title/description, so per-locale OG renders work today via different URLs (the image content is pixel-different per locale, even though the route is one).

**How to verify:**
1. Build a tool page and check the rendered HTML `<meta property="og:image">`. The URL should resolve to `https://vaxtimyoxdu.com/api/og?title=...&subtitle=...&type=tool`.
2. Open the resolved OG image URL directly in a browser. Confirm it loads as a 1200×630 PNG.
3. Repeat for all 4 locales (`/`, `/en`, `/tr`, `/ru`) of the same tool. Confirm each locale produces a localized title and that the image dimensions remain 1200×630.
4. Use the chrome-devtools-mcp `navigate_page` + `evaluate_script` combo to fetch the og:image via `document.querySelector('meta[property="og:image"]').content` and verify it returns a valid URL per locale.
5. Smoke test in Twitter Card Validator and Facebook Sharing Debugger before any major launch.

**Veto triggers:**
- A new page type is added without a corresponding `getOgImageUrl(...)` call in its metadata generator.
- The `width` or `height` in `route.tsx` is changed away from 1200/630.
- A locale renders a fallback English title because the metadata generator was not given a localized name.
- The OG route's `runtime = 'edge'` is changed without a regression check on cold-start latency.

---

## 4. Twitter Card

**Rule:** Every page that emits Twitter card metadata MUST set `twitter:card` to `summary_large_image`. Downgrading to `summary` (the smaller card without a hero image) is a VETO. The Twitter card MUST also include a `title`, `description`, and at least one entry in `images`.

**Cite:**
- `src/lib/utils/seo/metadata.ts:38` (base/home)
- `src/lib/utils/seo/metadata.ts:96` (tool)
- `src/lib/utils/seo/metadata.ts:155` (article/news)
- `src/lib/utils/seo/metadata.ts:211` (blog post)
- `src/app/[locale]/page.tsx:47` (homepage override)
- `src/app/[locale]/tools/page.tsx:38` (tools index)
- `src/app/[locale]/tools/[slug]/page.tsx:200` (per-tool)
- `src/app/[locale]/info/page.tsx:39` (info hub)
- `src/app/[locale]/blog/page.tsx:40` (blog index)
- Existing tests: `src/lib/utils/__tests__/seo.test.ts:97`, `:167`

**How to verify:**
1. `npm run test:run -- seo.test` — the existing assertions cover both base and tool metadata.
2. Grep the codebase for `card:` and confirm every match resolves to `'summary_large_image'`.
3. View source on a deployed page; confirm `<meta name="twitter:card" content="summary_large_image">`.

**Veto triggers:**
- Any new metadata generator that omits `twitter` block entirely.
- Any `card: 'summary'` value (other than the user-facing `MetaTagGenerator` tool, which is a generator widget for site visitors and is NOT site metadata — see exception below).

**Exception:** `src/components/tools/generators/MetaTagGenerator.tsx` and `src/components/tools/generators/OpenGraphGenerator.tsx` are user-facing generator tools where the visitor picks their own card type. The `summary` option being available there is correct and not in scope for this rule.

---

## 5. Brand Voice Per Language

**Rule:** The site brand name MUST be referenced through the i18n `common.siteName` translation key. Hardcoded brand strings in any component or page are a VETO. The brand name varies by locale to preserve the Azerbaijani diacritic that gives the brand its identity:

| Locale | Brand string | Source key |
|---|---|---|
| `az` | `Vaxtım Yoxdu` (with `ı` — dotless i) | `src/messages/az.json:3` |
| `en` | `Vaxtim Yoxdu` | `src/messages/en.json:3` |
| `tr` | `Vaxtim Yoxdu` | `src/messages/tr.json:3` |
| `ru` | `Vaxtim Yoxdu` | `src/messages/ru.json:3` |

The hero title is split into two translation keys (`home.heroTitle` + `home.heroTitleHighlight`) so the AZ version preserves `Vaxtım` correctly:
- `src/messages/az.json:20` → `"heroTitle": "Vaxtım"`
- `src/messages/en.json:20` → `"heroTitle": "Vaxtim"`
- `src/messages/tr.json:20` → `"heroTitle": "Vaxtim"`
- `src/messages/ru.json:20` → `"heroTitle": "Vaxtim"`

**Cite:** `src/messages/{az,en,tr,ru}.json` — `common.siteName` and `home.heroTitle`. Renderers: `src/components/layout/Footer.tsx:78` and `:179` (use `common('siteName')`).

**How to verify:**
1. `grep -r "Vaxtim Yoxdu\|Vaxtım Yoxdu"` across `src/` excluding `messages/` and tests. Any hit in a `.tsx`/`.ts` file is a violation.
2. Manually load the AZ homepage and confirm the hero shows `Vaxtım` (not `Vaxtim`).
3. Switch locale to en/tr/ru and confirm `Vaxtim` (no diacritic).
4. The Session 20 fix specifically restored the `ı` diacritic in AZ — any regression here is a P0.

**Veto triggers:**
- Any string literal `"Vaxtim"` or `"Vaxtım"` outside `messages/`, snapshot tests, or test fixtures.
- Adding the brand to a new component without going through `useTranslations('common')`.
- Mixing the AZ form (`Vaxtım`) into non-AZ locale files or vice versa.

---

## 6. CTA Copy Rules

**Rule:** Every primary call-to-action on a public surface (homepage hero, tool page entry, newsletter form button, share prompt) MUST follow the imperative-verb-plus-benefit pattern. Generic CTAs like "Click here", "Submit", "Learn more" are a VETO unless the surrounding copy already supplies the benefit. New CTA copy MUST be reviewed against this template before merge.

**Approved patterns (current state):**

| Locale | Hero CTA | Source |
|---|---|---|
| `az` | `100+ Pulsuz Alətləri Kəşf Et` ("Discover 100+ Free Tools") | `src/messages/az.json:29` |
| `en` | `Explore 100+ Free Tools` | `src/messages/en.json:29` |
| `tr` | `100+ Ücretsiz Aracı Keşfet` | `src/messages/tr.json:29` |
| `ru` | `Более 100 бесплатных инструментов` | `src/messages/ru.json:29` |

All four follow the pattern: **action verb + concrete benefit** (the "100+" specificity, the "Free" trust signal, the "Tools" object).

**Heuristics for SmmPro review:**
- Imperative verb in present tense (Explore, Try, Get, Read, Start, Generate, Convert).
- Specific benefit or quantity (100+, Free, Instant, No upload).
- Avoid filler ("here", "now" as a bare adverb without context).
- Avoid jargon ("Click", "Submit", "Go").
- Length target: 3-6 words in EN; corresponding short phrasing in other locales.

**Cite:** `src/messages/{az,en,tr,ru}.json` → `home.heroCta` and `home.heroCtaNews` lines 29-30.

**How to verify:**
1. Read the proposed copy in all 4 locales side-by-side.
2. Confirm each starts with an imperative verb.
3. Confirm each names a concrete benefit (free, fast, no signup, quantity).
4. Reject anything that reads as a system instruction ("Submit form", "Press button").

**Veto triggers:**
- New CTA without benefit ("Try it", "Get started" with no context).
- Localized version that drops the benefit while EN keeps it (parity issue).
- Marketing-jargon CTAs ("Unlock the power of...", "Revolutionize your workflow...") — do not match the practical, helpful house voice.

---

## 7. Newsletter Popup Timing

**Rule:** The newsletter popup is a high-impact funnel surface. Any change to its trigger logic, visibility rules, or storage keys requires SmmPro review. The current contract is:

- **Delay:** Appears 45 seconds after page load.
- **Visibility gates:** Hidden if (a) user is already subscribed (localStorage probe via `isSubscribed()`), (b) user previously dismissed with "Don't show again" (`STORAGE_KEY_DISMISSED`), or (c) already shown this session (`STORAGE_KEY_SESSION`).
- **Position:** Slides up from the bottom-right corner (non-modal, dismissible).
- **Accessibility:** Respects `prefers-reduced-motion`.
- **Re-check at fire time:** Re-runs `isSubscribed()` right before showing, so a footer subscribe completed during the 45s window suppresses the popup.

**Cite:**
- `src/components/layout/NewsletterPopup.tsx:11` (`POPUP_DELAY_MS = 45_000`)
- `src/components/layout/NewsletterPopup.tsx:12-13` (storage keys)
- `src/components/layout/NewsletterPopup.tsx:51-93` (visibility effect)

**How to verify:**
1. `npm run test:run -- NewsletterPopup` (test in `src/components/layout/__tests__/NewsletterPopup.test.tsx`).
2. Manual: load a tool page, wait 45 seconds, confirm popup appears once. Reload — popup should NOT reappear in the same session.
3. Subscribe via the inline footer form, then load a fresh page — popup must NOT appear.
4. Click "Don't show again", reload, confirm popup never appears in subsequent sessions until localStorage is cleared.

**Veto triggers:**
- Delay reduced below 30 seconds without a measured A/B justification (under-30s is annoying and tanks session duration).
- Delay raised above 90 seconds without justification (loses conversion window).
- Removing any of the 3 visibility gates (subscribed / dismissed / session-shown).
- Changing the popup from non-modal to modal/blocking without UX review (we explicitly chose non-blocking to protect tool engagement).
- Adding the popup to surfaces where it currently does not appear (e.g., legal pages, the embed routes) without scope review.

---

## 8. Social Share Text

**Rule:** The share message rendered into share platform URLs MUST be helpful and practical, never salesy. The currently shipped `share.shareMessage` template, in all 4 locales, follows the pattern "[verb suggesting personal recommendation] this free tool: {title} - {url}". Changes that introduce ALL CAPS, more than one emoji per share text, or marketing-speak ("AMAZING!!! 🚀🔥💯") are a VETO.

**Current shipped templates:**

| Locale | `share.shareMessage` | Source |
|---|---|---|
| `az` | `Bu pulsuz aləti yoxlayın: {title} - {url}` | `src/messages/az.json:701` |
| `en` | `Check out this free tool: {title} - {url}` | `src/messages/en.json:701` |
| `tr` | `Bu ücretsiz aracı deneyin: {title} - {url}` | `src/messages/tr.json:701` |
| `ru` | `Попробуйте этот бесплатный инструмент: {title} - {url}` | `src/messages/ru.json:701` |

**Tone rules:**
- Helpful tone, not salesy. Speak to a friend, not a buyer.
- Sentence case, not ALL CAPS.
- Maximum **one** emoji per share text (currently zero — adding one is fine, two is not).
- Always include the `{title}` placeholder so the tool name surfaces in social previews.
- Always include `{url}` so click-through is preserved.

**Cite:** `src/messages/{az,en,tr,ru}.json:701` plus `src/components/common/ShareButtons.tsx:73,85,97` (the call sites that interpolate the template).

**How to verify:**
1. Read the four `shareMessage` strings side-by-side. Confirm tone parity.
2. Manually click a share button on Twitter and confirm the prefilled tweet is short, on-tone, and contains both the title and URL.
3. Confirm both `{title}` and `{url}` placeholders are still present in any new locale string.

**Veto triggers:**
- A locale gets ALL CAPS or more-than-one emoji.
- The `{title}` or `{url}` placeholder is dropped.
- A locale's tone diverges from the others (e.g., one becomes a salesy pitch while the others stay practical).
- The "free" framing is dropped from a locale where it currently exists (the free positioning is core to the brand promise).

---

## 9. Footer Social Links

**Rule:** The footer's `socialLinks` array MUST point at the canonical brand handles for Instagram, TikTok, Telegram, YouTube, and X. The Instagram handle is the canonical brand identity surface — changes to it require explicit CEO approval per the Session 23 CEO action item.

**Current shipped state:**

| Platform | Footer URL | Source |
|---|---|---|
| Instagram | `https://instagram.com/vaxtimyoxdu` | `src/components/layout/Footer.tsx:20` |
| TikTok | `https://tiktok.com/@vaxtimyoxdu` | `src/components/layout/Footer.tsx:25` |
| Telegram | `https://t.me/vaxtimyoxdu` | `src/components/layout/Footer.tsx:30` |
| YouTube | `https://youtube.com/@vaxtimyoxdu` | `src/components/layout/Footer.tsx:35` |
| X / Twitter | `https://x.com/vaxtimyoxdu` | `src/components/layout/Footer.tsx:40` |

**LinkedIn:** Not currently in the footer. If/when added, requires SmmPro review (LinkedIn is a different audience and may need a separate CTA strategy than the other platforms).

**OUTSTANDING DISCREPANCY (raise with PO before any footer change):**

The Session 23 CEO action item documents the canonical Instagram username as `@vaxtimyoxdu_` (with a trailing underscore), backed by the credentials at `~/.claude/notes/instagram-credentials.md`. The footer currently links to `https://instagram.com/vaxtimyoxdu` (no underscore), which is a different — possibly squatted or unowned — handle. SmmPro MUST raise this in the next review cycle and either:
1. Update the footer URL to `https://instagram.com/vaxtimyoxdu_` (matching the actual brand handle), OR
2. Confirm the no-underscore handle is also owned by the brand and is the public-facing one.

Until that ambiguity is resolved, treat the trailing-underscore handle as the source of truth per CEO action.

**How to verify:**
1. Open `src/components/layout/Footer.tsx` and confirm the `socialLinks` array contains all 5 platforms above with `https://` URLs.
2. Click each link in a deployed footer and confirm the destination loads a brand-owned profile, not an unowned account.
3. Confirm `target="_blank"` and `rel="noopener noreferrer"` on every link (already present in `Footer.tsx:89-90`).

**Veto triggers:**
- Removing any of the 5 platforms without CEO approval.
- Renaming the Instagram link without resolving the `_` discrepancy first.
- Adding a 6th platform (e.g., Threads, Mastodon, Bluesky) without a content plan attached.
- Dropping `rel="noopener"` on any external link (security issue).

---

## 10. ProductHunt Badge

**Rule:** ProductHunt is currently a deferred launch surface. No badge ships today. If/when the site launches on ProductHunt, the official PH "Featured" badge MAY be added BUT only if it does not push below-the-fold the LCP (Largest Contentful Paint) element on the homepage. The badge MUST be lazy-loaded, MUST not trigger CLS (Cumulative Layout Shift), and MUST be removable within 24 hours of launch day if it tanks Core Web Vitals.

**Cite:** Not yet implemented — future invariant. No PH badge currently exists in `src/`. Confirm with: `grep -r "producthunt\|product-hunt\|ProductHunt" src/` returns no matches.

**Pre-launch checklist (when PH launch is scheduled):**
1. Decide badge placement: prefer footer or sidebar over hero/above-the-fold.
2. Use the official PH embed with explicit `width`/`height` attributes to prevent CLS.
3. Lazy-load via `loading="lazy"` (or `next/image` with `loading="lazy"`) and never make the badge the LCP element.
4. Run Lighthouse before and after the addition; LCP delta MUST be ≤ 100ms; CLS delta MUST be 0.
5. Verify across all 4 locales and on mobile.
6. Have a single-commit revert ready in case of metric regression.

**Veto triggers (when implemented):**
- PH badge placed in the hero slot, displacing the existing CTA.
- Badge embedded as an unsized iframe (CLS risk).
- No revert plan documented.
- Badge launched without measuring LCP/CLS impact first.

---

## SMM Reviewer Checklist

For every PR/MR that touches share buttons, OG images, brand voice, CTA copy, the newsletter funnel, footer social links, or related marketing surfaces, walk through this table. If any check fails, the answer is **VETO** with a citation back to the violated invariant.

| # | Check | What to look at | Pass criteria | Fail → action |
|---|---|---|---|---|
| 1 | Share platforms intact | `src/components/common/ShareButtons.tsx` `platforms` array | All 5 platforms present (WhatsApp, Telegram, Twitter, Facebook, LinkedIn) + Copy Link button | VETO — cite §1 |
| 2 | `share_click` event wired | Every share button onClick / handler | `trackShareClick(...)` called with the platform name | VETO — cite §1 |
| 3 | UTM params preserved | `buildShareUrl` call sites | URL contains `utm_source=share`, `utm_medium=<platform>`, `utm_campaign=tool_share` | VETO — cite §2 |
| 4 | OG image present | New page's metadata generator | Calls `getOgImageUrl(...)` and includes `images: [{ url, width: 1200, height: 630 }]` | VETO — cite §3 |
| 5 | OG image works in 4 locales | Fetch og:image URL per locale | Each locale renders a 1200×630 PNG with the localized title | VETO — cite §3 |
| 6 | Twitter card = `summary_large_image` | Metadata generator's `twitter` block | `card: 'summary_large_image'` | VETO — cite §4 |
| 7 | Brand name uses i18n | Grep for `Vaxtim`/`Vaxtım` outside `messages/` | Zero hits in `.tsx`/`.ts` source files | VETO — cite §5 |
| 8 | AZ diacritic preserved | `src/messages/az.json` → `common.siteName`, `home.heroTitle` | Both contain `Vaxtım` (with `ı`) | VETO — cite §5 |
| 9 | CTA follows verb-plus-benefit | New CTA copy in all 4 locales | Imperative verb + concrete benefit, 3-6 words | VETO — cite §6 |
| 10 | Newsletter popup timing unchanged | `src/components/layout/NewsletterPopup.tsx:11` | `POPUP_DELAY_MS = 45_000` (or justified change) | VETO — cite §7 |
| 11 | Newsletter visibility gates intact | `NewsletterPopup.tsx:51-93` | All 3 gates (subscribed, dismissed, session-shown) present | VETO — cite §7 |
| 12 | Share text tone | `share.shareMessage` in all 4 locales | Sentence case, ≤1 emoji, contains `{title}` and `{url}` | VETO — cite §8 |
| 13 | Footer socials intact | `src/components/layout/Footer.tsx:18-44` | All 5 platforms present, all use `target="_blank" rel="noopener noreferrer"` | VETO — cite §9 |
| 14 | Instagram handle | `Footer.tsx:20` | Resolved with PO/CEO until `_` discrepancy is closed | APPROVE_WITH_FOLLOWUP, raise discrepancy |
| 15 | PH badge LCP impact | Lighthouse before/after if PH badge added | LCP delta ≤ 100ms, CLS delta = 0 | VETO — cite §10 |

---

## Out of Scope (defer to SeoPro)

These are SeoPro's domain — SmmPro must NOT veto on them, but should flag concerns to SeoPro:

- `<title>` tag length and formatting
- `<meta name="description">` length and formatting
- Canonical URL construction
- Hreflang alternates
- Schema.org JSON-LD (`Article`, `SoftwareApplication`, `BreadcrumbList`, etc.)
- Sitemap inclusion/exclusion
- Robots directives
- Internal linking structure
- Core Web Vitals primitives (except where they intersect with marketing surfaces, e.g., §10 PH badge LCP rule)
- GA4 / PostHog event taxonomy beyond `share_click` (the `share_click` event is co-owned by SMM because it tracks share-funnel performance)

If a change touches BOTH SEO and SMM primitives (e.g., a new tool page with new metadata AND a new CTA), both reviewers sign off independently.

---

## Change Log

| Date | Author | Change |
|---|---|---|
| 2026-04-11 | SmmPro | Initial Sprint 0 draft. 10 invariants ratified. Open discrepancy on Instagram handle (§9) raised for next review. |
