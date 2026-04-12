---
title: Visual Review Playbook
owner: VisualTester (frontend-testing-engineer)
sprint: 0 (gate-infra)
status: active
last_updated: 2026-04-11
related:
  - docs/review-cowork.md (§6 Visual Review Protocol)
  - ~/.claude/skills/controlling-users-real-chrome/SKILL.md
  - docs/session-state.md (Session 23 patterns)
  - .claude/plans/vast-tickling-thimble.md (§5.5 Check #10 — tracking beacons)
---

# Visual Review Playbook

A copy-paste ready guide for any reviewer (QA, SEO, SMM, PO) to perform a visual + SEO + tracking review of vaxtimyoxdu.com routes against a local dev server using `chrome-devtools-mcp`.

**Scope:** local dev server (`http://localhost:3000`) only. Production verification uses GSC + IndexNow flows (see SeoPro's playbook).

**Tool surface:** all snippets use `mcp__plugin_chrome-devtools-mcp_chrome-devtools__*` tools. The MCP Chrome instance is isolated from the user's real Chrome — for tasks requiring real Chrome (Google login, GSC submit), see §5 pitfalls and the linked skill.

---

## 1. Pre-flight Check

Always run this block first. It is idempotent — safe to re-run.

```bash
# 1.1 — Is dev server up?
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
# Expected: 200 or 307 (locale redirect). Anything else → not ready.
```

If the response is empty, `000`, or a connection-refused error, start the server in the background:

```bash
cd /Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu && npm run dev &
# Wait ~10s for Next.js dev ready
sleep 10
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
# Re-check; expect 200 or 307
```

**Notes:**
- The project uses Next.js 15.5.9 + Turbopack — first compile of a route can take 5-15s; subsequent navigations are fast.
- If `npm run dev` is already running in another terminal, `curl` will succeed and you do not need to start another.
- Do **not** run `npm run build && npm run start` for visual reviews — dev server is required so HMR + error overlays + source maps are available.

```bash
# 1.2 — Is MCP Chrome reachable?
# (Calling list_pages will spin up the MCP Chrome instance on first use.)
```
```
mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_pages()
```

If `list_pages` fails with "instance collision", see §5 pitfall "MCP Chrome instance collision".

---

## 2. Core Patterns (copy-paste)

### 2.1 Navigate to a route

```
mcp__plugin_chrome-devtools-mcp_chrome-devtools__navigate_page({
  url: "http://localhost:3000/az/tools/qr-code-generator"
})
```

Locale prefixes: `/az`, `/en`, `/tr`, `/ru`. AZ is the default and may also resolve without a prefix in some routes — always test the explicit `/az/...` form for consistency.

### 2.2 Extract SEO primitives in one shot

```
mcp__plugin_chrome-devtools-mcp_chrome-devtools__evaluate_script({
  function: `() => JSON.stringify({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => ({hrefLang: l.hreflang, href: l.href})),
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    ogTitle: document.querySelector('meta[property="og:title"]')?.content,
    ogDescription: document.querySelector('meta[property="og:description"]')?.content,
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
    h1: document.querySelector('h1')?.textContent?.trim(),
    h1Count: document.querySelectorAll('h1').length,
    schemaJsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => s.textContent)
  })`
})
```

**Validation rules** (see SeoPro's invariant doc for full list):
- `title` ≤ 60 chars, ≥ 30 chars
- `description` 120-160 chars
- `canonical` matches the requested URL (no trailing slash mismatch, no `?` query)
- `hreflang` has exactly 4 entries (az/en/tr/ru) **plus** `x-default` (5 total)
- `ogImage` is an absolute https URL, not a relative path
- `h1Count === 1` (exactly one H1 per page)

### 2.3 Accessibility tree snapshot (text-only, fast)

Always prefer `take_snapshot` over `take_screenshot` when you only need to verify structure, ARIA labels, or interactive element refs. It is ~10x faster and returns deterministic node refs you can pass to `click(ref)` later.

```
mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_snapshot()
```

Output is the accessibility tree with stable refs like `node_42`. Use these refs in `click({ref: "node_42"})`, `fill({ref: "node_42", value: "..."})`, etc.

### 2.4 Screenshot (only when visual evidence is required)

```
mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_screenshot({
  fullPage: true,
  filePath: "docs/agent-reports/visual/2026-04-11-qr-code-generator-az-desktop.png"
})
```

**Naming convention:** `YYYY-MM-DD-{slug}-{locale}-{viewport}.png` where viewport is `mobile|tablet|desktop`.

**When to screenshot:**
- Layout regression check (mobile/tablet/desktop)
- Visual proof for PR description
- Bug reproduction (CSS, hydration, image rendering)

**When NOT to screenshot:**
- SEO primitive checks → use `evaluate_script` (§2.2)
- Click target verification → use `take_snapshot` (§2.3)
- Performance metrics → use `lighthouse_audit` (§4)

### 2.5 Console errors check (always run)

```
mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_console_messages()
```

**Expected:** zero `error` level messages. Warnings about React DevTools or favicon are acceptable. **Any** `Hydration mismatch`, `CSP violation`, or uncaught exception → escalate to `react-nextjs-engineer` (see §5).

### 2.6 Tracking beacon test (Sprint plan §5.5 Check #10)

This is the procedure for verifying that user actions emit the expected analytics events. It is **mandatory** for any PR touching a tool component, share button, or CTA.

```
# Step 1 — baseline: clear network log via fresh navigate
mcp__plugin_chrome-devtools-mcp_chrome-devtools__navigate_page({
  url: "http://localhost:3000/az/tools/qr-code-generator"
})

# Step 2 — wait for hydration so click handlers are bound
mcp__plugin_chrome-devtools-mcp_chrome-devtools__wait_for({text: "QR Kod Generator"})

# Step 3 — get the snapshot to find the tracked button ref
mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_snapshot()
# (locate the "Generate" / "Yarat" button ref in the output)

# Step 4 — perform the action
mcp__plugin_chrome-devtools-mcp_chrome-devtools__click({ref: "<button-ref-from-snapshot>"})

# Step 5 — list network requests since the click
mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_network_requests()

# Step 6 — drill into the analytics POST
mcp__plugin_chrome-devtools-mcp_chrome-devtools__get_network_request({
  url: "/api/analytics/track"
})
```

**Expected request body shape** (verify with SmmPro's tracking spec):
```json
{
  "event_type": "tool_use",
  "event_data": {
    "tool_slug": "qr-code-generator",
    "locale": "az"
  },
  "timestamp": "2026-04-11T..."
}
```

**Failure modes:**
- No POST captured → handler not bound (hydration issue) or feature flag disabled → flag to `react-nextjs-engineer`
- POST fired but `event_type` wrong → tracking spec drift → flag to SmmPro
- POST fired but missing `event_data.tool_slug` → instrumentation bug → flag to implementer

---

## 3. The 4-Locale × 3-Viewport Matrix

When SeoPro or SmmPro requests a "full matrix" review (typical for a new tool launch or content batch), produce 12 screenshots in this order.

### 3.1 Viewport setup

```
# Mobile
mcp__plugin_chrome-devtools-mcp_chrome-devtools__resize_page({width: 375, height: 667})

# Tablet
mcp__plugin_chrome-devtools-mcp_chrome-devtools__resize_page({width: 768, height: 1024})

# Desktop
mcp__plugin_chrome-devtools-mcp_chrome-devtools__resize_page({width: 1440, height: 900})
```

### 3.2 Matrix execution loop

For each `(locale, viewport)` pair:

1. `resize_page` to viewport dimensions
2. `navigate_page` to `http://localhost:3000/{locale}/{route}`
3. `wait_for` a known visible string (page heading)
4. `take_screenshot` with filename `YYYY-MM-DD-{slug}-{locale}-{viewport}.png`
5. `list_console_messages` → record any errors in the report

Total: 4 locales × 3 viewports = **12 screenshots** + 12 console checks.

### 3.3 Output

All 12 PNGs land in `docs/agent-reports/visual/`. The deliverable markdown report (template in §6) embeds them and gives a pass/fail per cell.

**Time budget:** ~3-5 minutes per route end-to-end. If you are tasked with N routes, budget `N × 5min` and ask the team lead to confirm before starting.

---

## 4. Performance Quick-Check (Sprint 5 scope, optional in earlier sprints)

For Lighthouse audits — these are heavier (~30-60s per URL) so only run on demand.

```
mcp__plugin_chrome-devtools-mcp_chrome-devtools__lighthouse_audit({
  url: "http://localhost:3000/az/tools/qr-code-generator",
  categories: ["performance", "accessibility", "seo"]
})
```

**Metrics to record in the report:**
- FCP (First Contentful Paint) — target < 1.8s
- LCP (Largest Contentful Paint) — target < 2.5s
- CLS (Cumulative Layout Shift) — target < 0.1
- TBT (Total Blocking Time) — target < 200ms
- INP (Interaction to Next Paint) — target < 200ms
- Performance score — target ≥ 90
- Accessibility score — target ≥ 95
- SEO score — target = 100

**Important:** dev server scores are **always** lower than production (no minification, source maps loaded, React dev mode). Use dev Lighthouse for **regression detection**, not absolute targets. For absolute production scores, use `mcp__search-console__pagespeed_core_web_vitals` against the live URL.

---

## 5. Common Pitfalls

### 5.1 CSP / hydration errors visible in console

**Symptom:** `list_console_messages` shows `Hydration failed` or `Refused to execute inline script`.

**Action:** Do **not** attempt to fix in this review. This is the Sprint 9 (2026-04-07) white-screen incident pattern. Stop, file the failure, escalate to `react-nextjs-engineer`. Reference `~/CLAUDE.md` rule: "DİQQƏT — CSP" + Layihə CLAUDE.md Qayda F (real browser test mandatory after CSP/JS changes).

### 5.2 Stale dev server (CSS/metadata wrong)

**Symptom:** Screenshots show old styling, metadata still shows yesterday's title, or `evaluate_script` returns stale data.

**Action:**
```bash
# Find and kill the running next dev process
pkill -f "next dev"
# Wait, then restart
cd /Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu && npm run dev &
sleep 10
```
Re-run pre-flight check.

### 5.3 MCP Chrome instance collision

**Symptom:** `navigate_page` returns "another Chrome instance is using this profile" or `list_pages` returns empty.

**Action:**
```bash
# Find the MCP Chrome process
MCP_PID=$(pgrep -f 'chrome-devtools-mcp/chrome-profile' | head -1)
echo "MCP Chrome PID: $MCP_PID"

# Kill it
[ -n "$MCP_PID" ] && pkill -P "$MCP_PID" && kill "$MCP_PID"
sleep 1

# Re-list to confirm
ps aux | grep chrome-devtools-mcp | grep -v grep
```
Then retry the original `navigate_page` call. The MCP server will spin up a fresh Chrome instance on next call.

### 5.4 Screenshot scale (Retina) confusion

**Symptom:** Coordinates from a screenshot don't match `click({x, y})` targets — clicks land in the wrong place.

**Cause:** macOS Retina screencapture outputs pixel dimensions (e.g. 3456×2234) while Chrome bounds and click coordinates use logical points (e.g. 1728×1117). Scale factor is **2.0** for standard Retina, but thumbnail downscaling in some screenshot tools makes it `thumbnail_size × 2.88`.

**Fix:** Always prefer **ref-based clicks** (`click({ref: "node_42"})`) from `take_snapshot` output instead of coordinate-based clicks. Use coordinates only as a last resort, and divide pixel values by 2 for logical points.

**Full pattern reference:** `~/.claude/skills/controlling-users-real-chrome/SKILL.md` (the 7-problem table — problem #4 is the canonical Retina explanation).

### 5.5 Real Chrome required (not MCP Chrome)

**Symptom:** Task says "open my Chrome", "I'm logged in there", "submit to GSC", or you need a Google session.

**Action:** This playbook does **not** cover real-Chrome control. Switch to `~/.claude/skills/controlling-users-real-chrome/SKILL.md` which has the AppleScript + cliclick pattern, the 7 confirmed problems, and the atomic control block template. Do **not** attempt with chrome-devtools-mcp — it has `--enable-automation` and Google blocks login.

### 5.6 Hydration deferred / route 404 in dev

If `evaluate_script` returns `undefined` for DOM elements that should exist, add `wait_for({text: "<visible string>"})` before extracting — Next.js 15 + React 19 streams HTML so server text appears before client hydration.

If `navigate_page` returns 404 for a known route, verify the slug exists in `src/data/tools/` then restart dev server (§5.2) — Next.js sometimes loses dynamic-route bindings after edits.

---

## 6. Report Template

Every visual review produces a report at `docs/agent-reports/visual-review-{sprint}-{seq}.md`. Use this template verbatim — consistency lets the team lead grep for `Verdict:` to assemble sprint summaries.

```markdown
## Visual Review RT-{sprint}-{seq}

**Reviewer:** VisualTester
**Date:** 2026-MM-DD
**Sprint:** {sprint-name}
**Trigger:** {what made this review necessary — PR #, task ID, ad-hoc request}

**URL(s) tested:**
- /{locale}/tools/{slug} (az/en/tr/ru)

**Viewports:** 375×667, 768×1024, 1440×900

---

### SEO primitives (from evaluate_script)

| Field | Value | Length | Pass |
|---|---|---|---|
| title | "..." | 45 | yes |
| description | "..." | 142 | yes |
| canonical | https://vaxtimyoxdu.com/az/tools/... | — | yes |
| hreflang count | 5 (az/en/tr/ru/x-default) | — | yes |
| ogImage | https://vaxtimyoxdu.com/og/... | — | yes |
| h1 count | 1 | — | yes |
| schema.org JSON-LD | SoftwareApplication | — | yes |

### Tracking beacons

| Action | Endpoint | event_type | event_data | Pass |
|---|---|---|---|---|
| Generate button click | POST /api/analytics/track | tool_use | {tool_slug: "qr-code-generator", locale: "az"} | yes |
| Share button click | POST /api/analytics/track | share_click | {channel: "twitter", url: "..."} | yes |

### Console

- Errors: 0
- Warnings: 1 (React DevTools — ignored)
- Hydration mismatches: 0
- CSP violations: 0

### Accessibility

- All buttons have accessible names: yes
- All form inputs have associated labels: yes
- H1/Hn hierarchy: yes
- Color contrast (manual spot check): yes

### Visual matrix (12 screenshots)

| Locale \ Viewport | 375 | 768 | 1440 |
|---|---|---|---|
| az | ![](visual/2026-MM-DD-slug-az-mobile.png) | ![](visual/2026-MM-DD-slug-az-tablet.png) | ![](visual/2026-MM-DD-slug-az-desktop.png) |
| en | ![](visual/2026-MM-DD-slug-en-mobile.png) | ![](visual/2026-MM-DD-slug-en-tablet.png) | ![](visual/2026-MM-DD-slug-en-desktop.png) |
| tr | ![](visual/2026-MM-DD-slug-tr-mobile.png) | ![](visual/2026-MM-DD-slug-tr-tablet.png) | ![](visual/2026-MM-DD-slug-tr-desktop.png) |
| ru | ![](visual/2026-MM-DD-slug-ru-mobile.png) | ![](visual/2026-MM-DD-slug-ru-tablet.png) | ![](visual/2026-MM-DD-slug-ru-desktop.png) |

### Performance (optional, Sprint 5+)

FCP / LCP / CLS / TBT / INP / Perf score / A11y score / SEO score — see §4 targets.

---

### Verdict: PASS | PASS-WITH-NOTES | FAIL

**Notes:**
- {anything that did not block but should be tracked}

**Blockers (if FAIL):**
- {what must be fixed before re-review}

**Escalations:**
- {who was pinged and why — react-nextjs-engineer for hydration, SeoPro for primitive drift, etc.}
```

---

## 7. Quick Reference Card

| I need to... | Use |
|---|---|
| Check if dev server is up | `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/` |
| Open a route | `navigate_page({url})` |
| Check title/desc/canonical/hreflang | `evaluate_script` (§2.2 snippet) |
| Click a button | `take_snapshot` → `click({ref})` |
| Verify analytics fired | sequence in §2.6 |
| Take a screenshot | `take_screenshot({fullPage: true, filePath})` |
| Check console errors | `list_console_messages` |
| Run Lighthouse | `lighthouse_audit` (§4) |
| Resize for mobile/tablet/desktop | `resize_page` (§3.1) |
| Real Chrome (Google login required) | `~/.claude/skills/controlling-users-real-chrome/SKILL.md` |

---

## 8. Cross-references

- **`docs/review-cowork.md` §6** — the workflow protocol (when to call this playbook, who triggers it, where the report goes). Owned by QaPro.
- **`docs/session-state.md`** — Session 23 patterns (hreflang fix workflow, GSC submit, IndexNow). The hreflang fix is the canonical example of a SEO primitive bug caught by §2.2.
- **`.claude/plans/vast-tickling-thimble.md` §5.5** — Sprint plan, "Check #10 — tracking beacons" is the source of the §2.6 procedure.
- **Project root `CLAUDE.md` Qayda F** — real browser test mandatory after CSP / inline script / hydration / Next.js script loading changes. This playbook satisfies that requirement when used with `chrome-devtools-mcp`.
- **`~/.claude/skills/controlling-users-real-chrome/SKILL.md`** — required for any task touching the user's logged-in Chrome (Google, GSC, Notion). The 7 problems and atomic control block template live there, not here.

---

**End of playbook.** Update this file when you discover new pitfalls, new MCP tool capabilities, or new invariants from SeoPro/SmmPro. Bump `last_updated` in the frontmatter.
