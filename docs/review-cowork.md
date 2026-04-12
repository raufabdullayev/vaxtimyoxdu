# Review Co-Work — Sprint Gate Workflow

**Status:** Active (Sprint 0 deliverable)
**Owners:** PO (orchestrator), `qa-engineer` (this doc), `seo-specialist` + `marketing-smm-strategist` (mandatory reviewers)
**Created:** 2026-04-11 (Sprint 0 of post-Session-23 backlog execution)
**Plan reference:** `/Users/raufabdullayev/.claude/plans/vast-tickling-thimble.md` §5, §6
**Companion docs (invariant content, NOT in this file):**
- `docs/SEO_TRACKING_INVARIANTS.md` — authored by `seo-specialist`
- `docs/SMM_CONTENT_INVARIANTS.md` — authored by `marketing-smm-strategist`
- `docs/sprint-injection-log.md` — append-only ledger of injected tasks

> **Scope of this file.** This document codifies **how a change flows from implementer → reviewer → approval → commit** during sprint execution. It does **not** enumerate SEO or SMM invariants (those live in the companion files above). When a reviewer cites a rule to justify a VETO, they cite the invariant doc by filename + line number — never this file.

> **Why we need this.** Pre-Session-24, review was ad-hoc. SEO and SMM agents reviewed when pinged but had no shared template, no veto vocabulary, no SLA, no injection caps. The Session 23 hreflang incident (4 commits, 3 bugs in production for ~1 day before detection) and the Session 9 CSP white-screen incident both root-caused to "no formal pre-commit gate." This doc closes that gap.

---

## Table of Contents

1. [Review Ticket Template](#1-review-ticket-template)
2. [Verdict Vocabulary](#2-verdict-vocabulary)
3. [Approval Rules](#3-approval-rules)
4. [New Task Injection Mechanics](#4-new-task-injection-mechanics)
5. [Tracking Compliance Checklist](#5-tracking-compliance-checklist)
6. [Visual Review Protocol](#6-visual-review-protocol)
7. [Category Matrix for Efficiency](#7-category-matrix-for-efficiency)
8. [Tiebreak Hierarchy (SEO vs SMM Conflict)](#8-tiebreak-hierarchy-seo-vs-smm-conflict)
9. [Local Test Gate Commands](#9-local-test-gate-commands)
10. [Commit Message Format](#10-commit-message-format)

---

## 1. Review Ticket Template

Every code-change-bearing commit is preceded by exactly one review ticket. Implementers send the ticket via `SendMessage` to both `seo-specialist` and `marketing-smm-strategist` simultaneously (and to any other mandatory reviewers for the sprint, e.g. `qa-engineer` for tests).

### 1.1 Canonical Template

```
REVIEW TICKET #RT-{sprint}-{seq}
Type: ui-change | metadata | tracking | copy | nav | new-tool | infra | test
Category risk: HIGH | MEDIUM | LOW
Files changed:
  - path/to/file.tsx (new/modified, LOC delta)
Description: 2-3 sentences on intent and approach
Visual URL(s): /tools/new-tool (4 locales)
Tracking events touched: tool_use (existing), tool_complete (existing)
  (list ALL event_type strings in changed code)
Metadata touched: yes/no (generateMetadata in ...)
Self-check:
  - i18n 4-dil complete [y/n]
  - events in allowlist [y/n]
  - no new event_type literal [y/n]
  - canonical uses getLocalizedUrl [y/n]
Local test results:
  - test:run: 2949/2949 PASS
  - test:e2e: 35/35 PASS
  - tsc: CLEAN
  - lint: CLEAN
  - build: SUCCESS
Decision needed within: 60 minutes
```

### 1.2 Field Reference

| Field | Required? | Notes |
|---|---|---|
| `#RT-{sprint}-{seq}` | yes | `sprint` is sprint number (e.g. `1`, `2`); `seq` is zero-padded ticket sequence inside the sprint (e.g. `01`, `02`). Example: `#RT-1-03` = third ticket in Sprint 1. |
| `Type` | yes | Pick **one** from the 8-value enum. Multi-type changes are smell — split into two tickets unless the cross-cutting nature is the point. |
| `Category risk` | yes | Implementer self-assesses. Reviewer may upgrade (downgrade requires both reviewers' agreement). |
| `Files changed` | yes | Absolute paths from repo root, with LOC delta `(+x/-y)`. Reviewers use this to scope their `Read` calls. |
| `Description` | yes | 2-3 sentences on **intent** and **approach**. Not "what code did I write" — "why this change exists and the shape of the solution." |
| `Visual URL(s)` | yes if `Type` ∈ {ui-change, metadata, copy, nav, new-tool} | List all dev-server URLs reviewer should hit. Always include all 4 locale variants when applicable. |
| `Tracking events touched` | yes | List **every** `event_type` string literal that appears in changed code, even if unchanged. SMM uses this to spot allowlist drift; SEO uses it to verify GA4 consent gating. |
| `Metadata touched` | yes | If `yes`, name the `generateMetadata` function and file. |
| `Self-check` | yes | Implementer answers each as `y/n`. A `n` is not auto-veto but reviewer will dig in. |
| `Local test results` | yes | All 5 commands. **Cannot submit a ticket with red tests.** This is the enforcement teeth of §9. |
| `Decision needed within` | yes | Default 60 minutes. May be shorter for incident response (e.g. 15 min) but not by default. |

### 1.3 Concrete Examples per Type

#### Type: `ui-change` (HIGH risk)

```
REVIEW TICKET #RT-1-02
Type: ui-change
Category risk: HIGH
Files changed:
  - src/components/layout/MegaMenu.tsx (modified, +12/-8)
  - e2e/navigation.spec.ts (modified, +18/-0)
  - src/components/layout/__tests__/MegaMenu.test.tsx (new, +47)
Description: Convert desktop "Alətlər" mega menu trigger from <button onClick> to <Link href="/tools">. Hover dropdown is preserved (parent onMouseEnter still wired). Click now navigates instead of toggling dropdown.
Visual URL(s):
  - http://localhost:3000/      (AZ default)
  - http://localhost:3000/en
  - http://localhost:3000/tr
  - http://localhost:3000/ru
Tracking events touched: NONE (client-side Link only, no event change)
Metadata touched: NO
Self-check:
  - i18n 4-dil complete [y]
  - events in allowlist [y]
  - no new event_type literal [y]
  - canonical uses getLocalizedUrl [n/a]
Local test results:
  - test:run: 2950/2950 PASS (+1 unit MegaMenu)
  - test:e2e: 36/36 PASS (+1 nav assertion)
  - tsc: CLEAN
  - lint: CLEAN
  - build: SUCCESS (820 static pages)
Decision needed within: 60 minutes
```

#### Type: `metadata` (MEDIUM risk)

```
REVIEW TICKET #RT-2-04
Type: metadata
Category risk: MEDIUM
Files changed:
  - src/config/tools/ai.ts (modified, +0/-0 — metaTitle/metaDescription rewrites only)
  - src/config/tools/pdf.ts (modified, +0/-0)
  - src/config/tools/image.ts (modified, +0/-0)
Description: CTR optimization Phase B — apply pre-approved title/desc rewrites for top 20 tools. All new strings ≤60 / ≤155 chars per locale (verified by util test). No file structure changes; ToolMeta type contract unchanged.
Visual URL(s):
  - http://localhost:3000/tools/qr-code-generator (all 4 locales)
  - http://localhost:3000/tools/ai-image-generator (all 4 locales)
  - http://localhost:3000/tools/pdf-merger (all 4 locales)
Tracking events touched: NONE
Metadata touched: YES — generateMetadata in src/app/[locale]/tools/[slug]/page.tsx (no code change, only data input)
Self-check:
  - i18n 4-dil complete [y]
  - events in allowlist [y]
  - no new event_type literal [y]
  - canonical uses getLocalizedUrl [y]
Local test results: [as above]
Decision needed within: 60 minutes
```

#### Type: `tracking` (HIGH risk)

```
REVIEW TICKET #RT-3-07
Type: tracking
Category risk: HIGH
Files changed:
  - e2e/tracking.spec.ts (new, +120)
  - src/components/analytics/__tests__/useTrackToolUse.test.ts (modified, +35/-2)
Description: New E2E spec asserts (a) cookie-consent gate blocks GA4 + /api/analytics/track until accept, (b) post-accept the deduplication logic in useTrackToolUse fires exactly once per tool_use per session, (c) keepalive: true is set. No production code changes.
Visual URL(s): N/A (test code only)
Tracking events touched: tool_use, tool_complete, page_view (all reads, no new emissions)
Metadata touched: NO
Self-check:
  - i18n 4-dil complete [n/a]
  - events in allowlist [y]
  - no new event_type literal [y]
  - canonical uses getLocalizedUrl [n/a]
Local test results: [as above]
Decision needed within: 60 minutes
```

#### Type: `copy` (LOW risk)

```
REVIEW TICKET #RT-4-12
Type: copy
Category risk: LOW
Files changed:
  - src/messages/az.json (modified, +24/-0 — newsArticles.2026-04-11.* keys)
  - src/messages/en.json (modified, +24/-0)
  - src/messages/tr.json (modified, +24/-0)
  - src/messages/ru.json (modified, +24/-0)
  - src/data/news-articles.ts (modified, +5/-0 — register 5 new article slugs)
Description: Content Wave 1 day 2 — 5 news articles × 4 locales (20 strings per article: title, lede, 6 sections, meta). All articles fit "Vaxtım" brand voice in AZ, "Vaxtim" in EN/TR/RU per SMM_CONTENT_INVARIANTS.md.
Visual URL(s):
  - http://localhost:3000/news/2026-04-11-{slug} (all 4 locales × 5 articles = 20 URLs)
Tracking events touched: news_view (existing, automatic via page mount)
Metadata touched: YES — generateMetadata in src/app/[locale]/news/[slug]/page.tsx (data only)
Self-check:
  - i18n 4-dil complete [y]
  - events in allowlist [y]
  - no new event_type literal [y]
  - canonical uses getLocalizedUrl [y]
Local test results: [as above]
Decision needed within: 60 minutes
```

#### Type: `nav` (MEDIUM risk)

```
REVIEW TICKET #RT-1-01
Type: nav
Category risk: MEDIUM
Files changed:
  - src/components/layout/MegaMenu.tsx (modified, +12/-8)
Description: Replace button with Link in desktop mega menu. Hover dropdown preserved. See Sprint 1 spec §7 for the 5-bullet acceptance list.
Visual URL(s): /, /en, /tr, /ru (all locales)
Tracking events touched: NONE
Metadata touched: NO
Self-check: [all y]
Local test results: [as above]
Decision needed within: 60 minutes
```

(Note: nav and ui-change overlap — `nav` is for header/footer/breadcrumb structural changes; `ui-change` is for in-page component visual/UX changes. When in doubt, use `ui-change`.)

#### Type: `new-tool` (HIGH risk)

```
REVIEW TICKET #RT-5-03
Type: new-tool
Category risk: HIGH
Files changed:
  - src/config/tools/ai.ts (modified, +1 entry)
  - src/components/tools/ai/AiImageUpscaler.tsx (new, +280)
  - src/app/[locale]/tools/ai-image-upscaler/page.tsx (new, +18)
  - src/messages/{az,en,tr,ru}.json (modified, +12 keys × 4)
Description: New AI tool — image upscaler. Uses ToolTemplate component, useTrackToolUse hook, standard generateMetadata with alternates.languages 4-locale. Eligible for Tool Template Compliance auto-approve (§7).
Visual URL(s):
  - http://localhost:3000/tools/ai-image-upscaler (all 4 locales)
Tracking events touched: tool_use, tool_complete (existing allowlist)
Metadata touched: YES — generateMetadata in src/app/[locale]/tools/[slug]/page.tsx (template-compliant)
Self-check:
  - i18n 4-dil complete [y]
  - events in allowlist [y]
  - no new event_type literal [y]
  - canonical uses getLocalizedUrl [y]
Local test results: [as above]
Decision needed within: 60 minutes
```

#### Type: `infra` (HIGH risk)

```
REVIEW TICKET #RT-6-01
Type: infra
Category risk: HIGH
Files changed:
  - next.config.js (modified, +14/-3 — CSP nonce experiment)
Description: Sprint 6 R&D verdict implementation — partial nonce-based CSP hardening. Fallback path retained: if nonce header missing, falls back to current SHA256-hash CSP. Verified locally with chrome-devtools-mcp navigate to /, /tools, /tools/qr-code-generator in all 4 locales — no white screen, hydration successful, GA4 + analytics scripts loaded.
Visual URL(s):
  - http://localhost:3000/ (all 4 locales)
  - http://localhost:3000/tools (all 4 locales)
  - http://localhost:3000/tools/qr-code-generator (all 4 locales)
Tracking events touched: NONE (verifying GA4 still loads)
Metadata touched: NO
Self-check:
  - i18n 4-dil complete [n/a]
  - events in allowlist [y]
  - no new event_type literal [y]
  - canonical uses getLocalizedUrl [n/a]
Local test results: [as above + chrome-devtools-mcp lighthouse score attached as agent-reports/visual/2026-MM-DD-csp-rd-lighthouse.json]
Decision needed within: 60 minutes
```

(Reviewer note: `infra` always carries Qayda F mandate — real-browser test required, not just `npm run build`.)

#### Type: `test` (LOW-to-MEDIUM risk)

```
REVIEW TICKET #RT-3-02
Type: test
Category risk: LOW
Files changed:
  - src/components/layout/__tests__/Footer.test.tsx (new, +180)
  - vitest.config.ts (modified, +2/-0 — coverage threshold raised 35→40)
Description: Footer component coverage — 0% → 95%. Asserts theme toggle wiring, newsletter form ID, social link presence, locale-aware copyright string. Coverage threshold bumped 35→40 to lock in.
Visual URL(s): N/A
Tracking events touched: NONE
Metadata touched: NO
Self-check: [all n/a or y]
Local test results: [as above + coverage report attached]
Decision needed within: 60 minutes
```

---

## 2. Verdict Vocabulary

Reviewers respond with **exactly one** of four verdicts. No free-form "looks good" or "👍" — the verdict is a structured signal that the implementer's local tooling and the PO's progress tracker can parse.

| Verdict | Meaning | Next step |
|---|---|---|
| `APPROVE` | Change is safe, proceed to commit | Implementer commits |
| `APPROVE_WITH_FOLLOWUP` | Safe, but opens non-blocking new task | Commit now, new task logged |
| `VETO` | Blocks commit — must cite invariant doc rule | Implementer fixes, re-submits (max 2 retries) |
| `VETO_WITH_NEW_TASK` | Blocks + opens new immediate task | Fix current + execute new task in same sprint |

### 2.1 `APPROVE` — Concrete Example

> **From:** `seo-specialist`
> **To:** `react-nextjs-engineer`
> **Re:** RT-1-02 (MegaMenu click-nav)
>
> **Verdict: APPROVE**
>
> Verified all 4 locales via `chrome-devtools-mcp:navigate_page`:
> - AZ `/`: clicking "Alətlər" navigates to `/tools` ✓
> - EN `/en`: clicking "Tools" navigates to `/en/tools` ✓
> - TR `/tr`: clicking "Araçlar" navigates to `/tr/tools` ✓
> - RU `/ru`: clicking "Инструменты" navigates to `/ru/tools` ✓
>
> Hover dropdown still opens on `mouseenter` (verified via `evaluate_script` reading `aria-expanded`). `aria-haspopup="true"` preserved. Mobile accordion untouched. No new tracking events. SEO primitives unchanged (canonical, hreflang, title — all stable).
>
> Proceed to commit.

### 2.2 `APPROVE_WITH_FOLLOWUP` — Concrete Example

> **From:** `marketing-smm-strategist`
> **To:** `content-writer`
> **Re:** RT-4-12 (5 news articles 4-locale)
>
> **Verdict: APPROVE_WITH_FOLLOWUP**
>
> Brand voice ✓ (Vaxtım/Vaxtim split correct per `SMM_CONTENT_INVARIANTS.md:42`).
> Title char counts ✓ (longest is 58 in TR, under 60 limit).
> Meta desc char counts ✓ (longest is 153 in RU, under 155 limit).
>
> **Followup task** (non-blocking, log it and proceed): two articles ("ai-creativity-2026", "remote-work-tools") are missing the `og:image` override field — they fall back to the default site OG. Suggest custom OG for these high-impressions topics. Est: 20 min, can be in next batch or Sprint 4 day 3.
>
> Logged as new task in `docs/sprint-injection-log.md` per §4. Proceed to commit current ticket.

### 2.3 `VETO` — Concrete Example

> **From:** `seo-specialist`
> **To:** `react-nextjs-engineer`
> **Re:** RT-2-04 (CTR title/desc rewrites)
>
> **Verdict: VETO**
>
> **Cited rule:** `SEO_TRACKING_INVARIANTS.md:71` — "Title length ≤60 char in **all** 4 locales, measured per locale."
>
> The new TR title for `qr-code-generator` is **63 characters**:
> > `"QR Kod Oluşturucu — Ücretsiz Online QR Kodu Üretici Aracı"`
>
> SERP truncation in Bing TR is 58–60 chars. This will cut off "...Aracı" and damage CTR — the very metric this sprint is trying to improve.
>
> **Suggested fix:** drop "Online" or "Üretici" — both are redundant with "Oluşturucu". Try:
> > `"QR Kod Oluşturucu — Ücretsiz Online QR Kodu Aracı"` (55 char)
>
> Re-submit ticket as RT-2-04-r1 after fix. This is retry #1 of 2 (per §3, max 2 retries before PO adjudication).

### 2.4 `VETO_WITH_NEW_TASK` — Concrete Example

> **From:** `marketing-smm-strategist`
> **To:** `react-nextjs-engineer`
> **Re:** RT-5-03 (new tool: ai-image-upscaler)
>
> **Verdict: VETO_WITH_NEW_TASK**
>
> **Cited rule:** `SMM_CONTENT_INVARIANTS.md:118` — "Every new tool must have an `og:image` matching the 1200×630 brand template."
>
> The new tool `ai-image-upscaler` is using the default site OG image. Manual brand-template render is missing. This is a hard block on commit (allowing it would set a template-violation precedent for the +24 tools incoming in Sprint 5).
>
> **Immediate task injection** (per §4 — same file/component, blocks SEO/SMM invariant, fits in ≤30 min):
>
> ```
> [SPRINT-5] [TICKET-RT-5-03] [SOURCE:SmmPro] [PRIORITY:P0] [STATUS:immediate]
> Generate 1200×630 OG image for ai-image-upscaler tool using brand template at public/og-template.png. Save to public/og/tools/ai-image-upscaler.png. Reference src/lib/utils/seo/og-image.ts for the helper function.
> Est: 25min. Owner: ui-styling-engineer (in-team).
> Cap counter: 1/3 ticket, 1/8 sprint.
> ```
>
> Re-submit RT-5-03 after `og:image` fix. Cap counter logged.

---

## 3. Approval Rules

### 3.1 The Two-Reviewer Rule

**Both `seo-specialist` AND `marketing-smm-strategist` must send `APPROVE` or `APPROVE_WITH_FOLLOWUP`.** A single `VETO` from either is a hard stop. There is no "majority wins" — the gate is unanimous-or-block.

This is intentional. SEO and SMM cover orthogonal failure modes (technical SEO vs brand integrity vs funnel correctness), and both are reversible only at high cost post-deploy. The cost of a false-VETO (1 hour of rework) is much lower than the cost of a false-APPROVE landing in production.

### 3.2 Invariant-Docs-Only Veto

Reviewers may **only** veto on violations of:
1. `docs/SEO_TRACKING_INVARIANTS.md` (SEO-owned), or
2. `docs/SMM_CONTENT_INVARIANTS.md` (SMM-owned)

Every `VETO` and `VETO_WITH_NEW_TASK` **must** cite a specific rule by filename + line number (e.g. `SEO_TRACKING_INVARIANTS.md:71`).

**"I don't like it" is NOT a valid veto.** If a reviewer feels strongly about something not in the invariant docs, they have two recourses:
1. **Open a new task** to *amend the invariant doc* — this becomes a separate sprint item, not a block on the current ticket
2. **Escalate to PO** for an exception — PO either adjudicates or pulls in `architecture-quality-tech-lead` per §3.5

This is the most important rule in the gate. It prevents subjective vibes-based blocking while still giving reviewers full authority over the codified rules.

### 3.3 Response SLA

| Time elapsed | What happens |
|---|---|
| 0–60 min | Reviewer formulates verdict, sends via SendMessage |
| 60 min | PO pings reviewer ("RT-X-Y still pending — reminder") |
| 90 min | PO pings reviewer second time + cc's the other reviewer |
| 120 min | PO escalates to CEO ("Reviewer X silent for 2h on RT-X-Y, blocking sprint progress") |

**Exception:** content sprints (S4) submit in batches of 10 — SLA is 90 min for batched tickets, not 60.

### 3.4 Max 2 Retry Cycles

Each ticket may go through **at most 2 fix-retry cycles**. Suffix the retry sequence: `RT-2-04` → `RT-2-04-r1` → `RT-2-04-r2`. Retry #3 does not exist.

If a ticket is still being vetoed after retry 2:
1. PO reads the 3 ticket versions + 3 verdict messages
2. PO adjudicates with the rule "SEO wins SEO matters (technical, structural), SMM wins brand matters (voice, copy, image)"
3. If both reviewers' VETOs are in the same domain (e.g. two SEO objections), PO pulls in `architecture-quality-tech-lead` for second opinion
4. Unresolvable after PO + tiebreaker → CEO escalation

This cap exists to prevent reviewer perfectionism from indefinitely blocking. Two passes is enough to surface real issues; pass 3 is usually a personality conflict.

### 3.5 Second-Opinion Escape

If an implementer believes a `VETO` is wrong (e.g. reviewer cited a rule but misread the code), they may request **second opinion** from `architecture-quality-tech-lead` *before* attempting a fix. PO must approve the request (it's not free — ArchPro's time is finite).

Second opinion is **advisory only**. PO still adjudicates the final outcome. ArchPro's role is to be the neutral technical referee on whether the cited invariant rule actually applies to the code in question.

Use sparingly — expected ≤1 second-opinion request per sprint.

---

## 4. New Task Injection Mechanics

This is the **core "immediate task" feature** that the CEO directive (§17 of plan) requires. The mechanic is: when a reviewer notices a related issue while reviewing, they can either log it as follow-up (queued for next sprint) or inject it immediately into the current sprint.

### 4.1 The Three-Gate Preemption Rule

A new task **preempts the current sprint** (becomes immediate, executed before the sprint closes) **only if all three** are true:

| Gate | Check |
|---|---|
| **G1: Locality** | Same file or component that the implementer just touched in the current ticket |
| **G2: Severity** | Blocks a tracking or SEO invariant violation (i.e. would itself be vetoed if shipped separately) |
| **G3: Effort** | Estimated fix fits in ≤30 minutes |

**All three** must be true. If any one fails → the task goes to the **follow-up queue**, not immediate.

| Gates passed | Status |
|---|---|
| G1 ∧ G2 ∧ G3 | `immediate` — same sprint, before commit |
| G1 ∧ G2 ∧ ¬G3 | `follow-up` — next sprint, P1 |
| G1 ∧ ¬G2 ∧ G3 | `follow-up` — next sprint, P2 |
| ¬G1 (different file) | `deferred` — backlog, no priority bump |
| Subjective polish only | Reject — open backlog item, do not log here |

### 4.2 Recording Format

All injected tasks are logged in `docs/sprint-injection-log.md` (append-only). The format is:

```
[SPRINT-{N}] [TICKET-RT-{N}-{SEQ}] [SOURCE:{SeoPro|SmmPro}] [PRIORITY:P0|P1|P2] [STATUS:immediate|follow-up|deferred]
Description (1-3 lines).
Est: {mins}min. Owner: {agent-name} ({in-team|new-team}).
Cap counter: {X/3 ticket, Y/8 sprint}.
```

The cap counter is what enforces §4.3.

### 4.3 Boundedness Caps

Without caps, the injection mechanic could turn every sprint into infinite scope creep. The caps:

| Limit | Trigger | Action on overflow |
|---|---|---|
| **3 immediate injections per ticket** | 4th injection on same ticket | Escalate to CEO — likely the underlying ticket is too big and should be split |
| **8 immediate injections per sprint** | 9th injection in same sprint | Force-demote 9th to next sprint as `follow-up`. Do not block current sprint. |
| **2 ticket-level injections from same reviewer** | Same reviewer hits 3 injections on same ticket | Auto-trigger second opinion from `architecture-quality-tech-lead` — reviewer may be over-specifying |

PO reports counters at sprint end in `docs/session-state.md` (e.g. "Sprint 3: 4 immediate, 2 follow-up, 1 deferred"). If a sprint is consistently hitting the 8-cap, the next sprint's PO brief includes "tighten scope upfront."

### 4.4 Why These Specific Numbers

- **3 per ticket** — empirically, more than 3 means the ticket scope was wrong; splitting is cheaper than continuing
- **8 per sprint** — at 60 min average per immediate injection, 8 injections = 8 hours, which is roughly half a sprint. Beyond half-sprint scope creep, the original sprint goal is lost
- **30 min cutoff for G3** — 30 min is short enough that the implementer's context is still warm; longer means they've moved on and re-context-loading is wasteful

### 4.5 PO Override

PO may **override** the three-gate check in two narrow cases:
1. **Production incident on a related route** — e.g. while reviewing RT-5-03 we discover an unrelated tool has been throwing 500s for 3 days. Drop everything, fix it.
2. **Time-sensitive external dependency** — e.g. GSC-detected indexation issue with a 24h decay window

PO override is logged in the sprint-injection-log with `[PO_OVERRIDE]` prefix and a one-line justification. Expected frequency: ≤1 per wave (so ~once per 5 sprints).

---

## 5. Tracking Compliance Checklist

Reviewers run this 10-item checklist as a spot-check on every ticket of `Type` ∈ {tracking, ui-change, new-tool, metadata}. SEO owns checks #6–10 (metadata/SEO primitives). SMM owns checks #1–5 (funnel integrity).

| # | Check | How | Tool |
|---|---|---|---|
| 1 | No new `event_type` string outside allowlist | Compare against `src/app/api/analytics/track/route.ts:29-40` allowlist | `Grep "event_type:" {changed-files}` |
| 2 | `/api/analytics/track` POST shape unchanged | Diff `body: JSON.stringify({...})` shape against current production | `Read` changed hook files |
| 3 | `useTrackToolUse` deduplication not bypassed | Confirm session-key dedup logic still wraps emission | `Grep "analytics/track"` changed files |
| 4 | `keepalive: true` on any new tracker | Required for unload-time beacons | `Read` new hook files |
| 5 | GA4 consent gate respected (`localStorage['cookie-consent']`) | Confirm beacon is gated behind consent check | `Grep` for `cookie-consent` + `CookieConsent.tsx` reference |
| 6 | `generateMetadata` has 4-locale `alternates.languages` | Confirm hreflang completeness | `chrome-devtools-mcp:evaluate_script` reading `link[rel="alternate"][hreflang]` |
| 7 | Canonical URL uses `getLocalizedUrl` shared helper | Prevent the Session 23 trailing-slash regression class | `Grep` for manual URL construction |
| 8 | Title ≤60 char, meta desc ≤155 char in **all** 4 locales | SERP truncation prevention | `chrome-devtools-mcp:evaluate_script` reading `document.title.length` and `document.querySelector('meta[name="description"]').content.length` per locale |
| 9 | OG image + twitter card present | Social share rendering | `chrome-devtools-mcp` DOM inspection of `meta[property^="og:"]` and `meta[name^="twitter:"]` |
| 10 | **Dynamic test** — fire interaction, verify POST to `/api/analytics/track` in Network panel | Last-mile beacon verification | `chrome-devtools-mcp:list_network_requests` |

### 5.1 Ownership Matrix

| Reviewer | Owns checks | Reasoning |
|---|---|---|
| `marketing-smm-strategist` (SMM) | #1–#5 | These are funnel integrity / consent / dedup — the SMM agent is responsible for ensuring the funnel data is trustworthy |
| `seo-specialist` (SEO) | #6–#10 | These are SERP-facing primitives + the dynamic beacon test — SEO agent owns indexation and tracking truth |

When a check fails, the relevant reviewer issues `VETO` or `VETO_WITH_NEW_TASK` and cites the invariant doc rule that the check enforces. Example: check #8 failure cites `SEO_TRACKING_INVARIANTS.md:71`.

### 5.2 When Checks Don't Apply

- `Type: test` and `Type: infra` — checks #1–#10 generally don't apply (test code isn't user-facing). Reviewer may skip with a note: "Type=test, tracking checks N/A."
- `Type: copy` (i18n strings only) — checks #6–#9 still apply (string changes affect title/desc length); check #10 may be skipped if no interactive element changed
- `Type: metadata` — **all checks apply**, this is the highest-stakes type for SEO

### 5.3 Spot-Check vs Full-Check

A "spot check" is one URL × one locale × one viewport. Full-check is all URLs × 4 locales × 2-3 viewports. Spot check applies when the change is template-compliant (§7); full-check applies otherwise.

---

## 6. Visual Review Protocol

**Chosen method:** chrome-devtools-mcp live DOM inspection on the dev server. This is the Session 23 proven pattern (hreflang fix used exactly this flow).

> **Source of truth for MCP snippets:** `docs/agent-reports/visual-review-playbook.md` (maintained by `frontend-testing-engineer` / VisualTester). This file (`review-cowork.md`) owns the workflow protocol — **when** a visual check runs, **who** owns it, and **where** results land. The playbook owns the MCP-tool mechanics — the exact `evaluate_script` snippets, the ref-based click patterns, the step sequences. When in doubt, read the playbook for the code and come back here for the process.
>
> The §6.3 patterns below are a **short reference extract** to keep the workflow doc self-sufficient for common cases. For anything beyond the four extracted patterns, open the playbook directly.

### 6.1 Per-Change Steps

1. **Implementer ensures dev server is running** before submitting the ticket. PO checks `npm run dev` is alive once at sprint start; implementer is responsible mid-sprint. Ticket cannot be submitted if dev server is down.

2. **Reviewer opens each `Visual URL(s)`** from the ticket using `chrome-devtools-mcp:navigate_page`. URLs are absolute (`http://localhost:3000/...`) — never relative.

3. **Reviewer extracts SEO primitives** via `chrome-devtools-mcp:evaluate_script`. Standard snippets:

   ```js
   // Title length per locale
   ({ title: document.title, len: document.title.length })

   // Meta description
   (() => {
     const m = document.querySelector('meta[name="description"]')
     return { content: m?.content, len: m?.content?.length }
   })()

   // Canonical
   document.querySelector('link[rel="canonical"]')?.href

   // Hreflang completeness (Session 23 pattern)
   Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'))
     .map(l => ({ lang: l.hreflang, href: l.href }))

   // OG image
   document.querySelector('meta[property="og:image"]')?.content
   ```

4. **Reviewer takes accessibility snapshot** (`chrome-devtools-mcp:take_snapshot`) for copy review. The accessibility tree is text-only and fast — preferred over screenshots when checking *what's on the page* rather than *how it looks*. Default to snapshot for `copy`, `metadata`, and `tracking` types.

5. **Reviewer takes screenshot** (`chrome-devtools-mcp:take_screenshot`) **only when** visual layout is load-bearing — i.e. for `ui-change`, `nav`, and `new-tool` types where the rendered output matters. Full-page capture: `take_screenshot({fullPage: true})`. Save path: `docs/agent-reports/visual/YYYY-MM-DD-{slug}-{locale}-{viewport}.png`. The `-{viewport}` suffix (`mobile`, `tablet`, `desktop`) is mandatory so captures across breakpoints don't collide.

6. **Reviewer runs `list_console_messages` after every navigate.** Zero error-level messages are required. Any hydration mismatch or CSP violation is an immediate escalation to `react-nextjs-engineer` (the Sprint 9 white-screen incident class — see `next.config.js:142-168`).

7. **Reviewer uses ref-based `click({ref})`** (not coordinate clicks) when interacting with the page. Refs come from the most recent `take_snapshot` output. Ref-based clicks avoid the Retina-display coordinate trap and work deterministically across viewports.

8. **For 4-locale × multi-viewport matrices**, reviewer **delegates** to `frontend-testing-engineer` (VisualTester) via SendMessage. This avoids the in-line reviewer doing 12 navigate+screenshot cycles per ticket. VisualTester returns a summary message + a visual diff index. The current ticket is not approved until VisualTester replies.

### 6.2 Snapshot vs Screenshot Decision Rule

| Change type | Default tool | Why |
|---|---|---|
| `copy` | `take_snapshot` | Text-only — accessibility tree is faster and exposes the same data |
| `metadata` | `evaluate_script` only (no visual needed) | Metadata is in `<head>`, not visual |
| `tracking` | `list_network_requests` + `evaluate_script` | The dynamic test (check #10) is the visual |
| `ui-change` | `take_screenshot` | Visual is the entire point of the change |
| `nav` | `take_screenshot` for desktop, `take_snapshot` for keyboard nav | Layout matters; tab order is text-tree-checkable |
| `new-tool` | `take_screenshot` (mobile + desktop, 1 locale spot check) | First-impression visual |
| `infra` | Both — `take_screenshot` AND `list_console_messages` | CSP/build changes have invisible failure modes |
| `test` | None — review the test code via `Read` | Tests aren't visual |

### 6.3 Session 23 Patterns to Reuse

The hreflang bug fix in Session 23 produced reusable evaluate_script patterns. These are codified here so future reviewers don't reinvent them.

> **Extended patterns live in the playbook.** See `docs/agent-reports/visual-review-playbook.md` for the full set:
> - **§2.2 One-shot SEO primitive extraction** — single `evaluate_script` returns title, description, canonical, hreflang[], og:*, twitter:card, h1, h1Count, JSON-LD in one call. This is the snippet that would have caught the Session 23 hreflang bug pre-merge. Use this in preference to stringing together Patterns A–D below when you need the full picture.
> - **§2.6 Tracking beacon test** — the 6-step sequence (navigate → wait_for → take_snapshot → click(ref) → list_network_requests → get_network_request) for verifying analytics POSTs fire with correct `event_type` and `event_data`. **Mandatory** for any PR touching tools, CTAs, or share buttons — this is the §5 Check #10 dynamic test.
>
> Patterns A–D below are kept inline as a quick-reference subset for the most common spot-checks.

**Pattern A — Hreflang completeness check:**
```js
(() => {
  const alts = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'))
  const langs = alts.map(l => l.hreflang)
  return {
    count: alts.length,
    langs: langs.sort(),
    has4Locales: ['az', 'en', 'tr', 'ru'].every(l => langs.includes(l)),
    hasXDefault: langs.includes('x-default'),
    urls: alts.map(l => ({ lang: l.hreflang, href: l.href })),
  }
})()
```
**Validation rule (from Session 23):** for a fully-localized page, `count` **must equal exactly 5** (az + en + tr + ru + x-default). A count of 4 means `x-default` is missing (most common bug), and a count of 3 or below means a locale is missing entirely. Any deviation is an SEO check #6 violation — cite `SEO_TRACKING_INVARIANTS.md` and VETO.

Expected output for a 4-locale page: `{ count: 5, has4Locales: true, hasXDefault: true }`.
For an **intentionally** AZ-only blog post (e.g. content not yet translated): `{ count: 4, langs: ['az','ru','tr','x-default'] }` (en omitted intentionally). This case is valid **only** when the page's `generateMetadata` probes locale availability — see `blog/[slug]/page.tsx` after Session 23 fix `0fc6318`.

**Pattern B — Trailing-slash canonical regression check** (the Session 23 bug):
```js
(() => {
  const canon = document.querySelector('link[rel="canonical"]')?.href
  const alts = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'))
  return {
    canonical: canon,
    canonicalEndsWithSlash: canon?.endsWith('/') && canon !== canon?.replace(/\/$/, ''),
    altsWithSlash: alts.filter(a => a.href.endsWith('/') && a.href !== a.href.replace(/\/$/, '')).length,
  }
})()
```
Expected: `canonicalEndsWithSlash: false`, `altsWithSlash: 0` (root URL `https://vaxtimyoxdu.com/` is allowed; locale-prefixed `/en/` should be `/en` no slash).

**Pattern C — Title and meta-description char count per locale:**
Run after `navigate_page` to each of `/`, `/en`, `/tr`, `/ru` and tabulate:
```js
(() => {
  const title = document.title
  const desc = document.querySelector('meta[name="description"]')?.content || ''
  return {
    titleLen: title.length, titleOk: title.length <= 60,
    descLen: desc.length, descOk: desc.length <= 155,
    title, desc,
  }
})()
```
Reviewer aggregates results across 4 locales — any `titleOk: false` or `descOk: false` is an SEO check #8 violation.

**Pattern D — GA4 consent gate verification (check #5):**
```js
(() => {
  const consent = localStorage.getItem('cookie-consent')
  const gtagPresent = typeof window.gtag === 'function'
  const dataLayerLen = (window.dataLayer || []).length
  return { consent, gtagPresent, dataLayerLen }
})()
```
Then click "Accept" on the cookie banner and re-run; expected delta: `consent: 'accepted'`, `dataLayerLen` increases.

### 6.4 When to Delegate to VisualTester

Delegate via `SendMessage` to `frontend-testing-engineer` when:
- Change touches 4 locales × ≥2 viewports (mobile, desktop) — delegating saves the in-line reviewer ~12 navigate cycles
- Change is a new component with potential layout shift implications (CLS risk)
- Change is `infra` type with potential white-screen risk (Sprint 9 / CSP class) — VisualTester runs a Lighthouse pass via `lighthouse_audit`
- Reviewer wants a baseline screenshot diff across locales

**Delegate request format** (send via SendMessage to `frontend-testing-engineer`):
```
RT-X-Y visual matrix request:
- Route slug(s): /tools/ai-image-upscaler
- Locales: az, en, tr, ru   (default: all 4)
- Viewports: 375, 768, 1440   (default: mobile/tablet/desktop)
- Trigger: RT-5-03 (or commit SHA, or issue/PR #)
- Notes: [anything load-bearing the reviewer wants VisualTester to attend to]
```

Time budget: ~3–5 min per route end-to-end (navigate + snapshot + screenshot + console check × all breakpoints).

VisualTester's reply format (expected):
```
RT-X-Y visual review summary:
- Locales tested: az, en, tr, ru
- Viewports: mobile (375×667), tablet (768×1024), desktop (1440×900)
- Screenshots saved: docs/agent-reports/visual/YYYY-MM-DD-{slug}-{locale}-{viewport}.png (12 files)
- CLS observed: 0.02 (within budget)
- Console errors: 0 (error-level)
- Hydration warnings: 0
- Verdict suggestion: APPROVE | VETO (cite rule)
```

The reviewer still owns the final verdict — VisualTester is doing the legwork, not the deciding.

### 6.5 Pitfalls (Session 23 Lessons)

- **Dev server cache.** If you change a route, sometimes Next.js dev server keeps the old metadata cached. Force a hard reload via `chrome-devtools-mcp:navigate_page` with the URL appended `?_=${Date.now()}` to bust the cache.
- **Locale prefix on root.** The default locale (AZ) has no prefix — `/`, not `/az`. Reviewers often check `/az` and get a 404. Always include `/` in the URL list for AZ.
- **Hreflang `x-default`.** This is required, not optional. If the implementer forgets it, the snapshot will show 4 alternates not 5.
- **Trailing slash on locale URLs.** `/en/` (with slash) is wrong; `/en` (no slash) is correct. The Session 23 helper `getLocalizedUrl` enforces this; manual URL construction breaks it.
- **MCP Chrome instance collision.** If `chrome-devtools-mcp:navigate_page` fails or hangs, there's usually a stale Chrome MCP process. Fix: `pkill -f 'chrome-devtools-mcp/chrome-profile'` and retry. This is a known recovery step, not an error condition.
- **Real Chrome (Google login, GSC submit) is OUT of scope for chrome-devtools-mcp.** MCP Chrome launches with `--enable-automation`, which Google actively blocks for login flows (GSC, Gmail, Drive, etc.). If a reviewer needs to drive the user's actual Chrome (e.g. submit a URL in the real Google Search Console), **switch protocol** to the `controlling-users-real-chrome` skill at `~/.claude/skills/controlling-users-real-chrome/SKILL.md` (AppleScript + cliclick). chrome-devtools-mcp is for dev-server DOM inspection only.

---

## 7. Category Matrix for Efficiency

Not every change category needs full review. The matrix below balances rigor against throughput.

| Category | SEO review | SMM review | QA review | Visual gate |
|---|---|---|---|---|
| `ui-change` (HIGH risk) | Full | Full | Spot | Full (4 locales × 2 viewports) |
| `ui-change` (LOW risk, e.g. spacing tweak) | Spot | Spot | Skip | Spot (1 locale, desktop) |
| `metadata` (any risk) | Full | Spot | Skip | `evaluate_script` only |
| `tracking` (any risk) | Full | Full | Full | Dynamic test (check #10) mandatory |
| `copy` (i18n batch) | Spot (char count automated) | Full (brand voice) | Skip | Snapshot only |
| `nav` (header/footer change) | Full | Spot | Spot | Full (4 locales) |
| `new-tool` (template-compliant) | Spot (auto-approve eligible) | Spot | Skip | Spot (1 locale) |
| `new-tool` (template-divergent) | Full | Full | Full | Full |
| `infra` (next.config / build) | Spot (verify scripts load) | Skip | Full (build + types) | Full + Lighthouse |
| `test` (test code only) | Skip | Skip | Full | Skip |

### 7.1 "Tool Template Compliance" Auto-Approve Rule

A new tool **auto-passes with only a spot check** if **all** the following are true:

1. Uses `ToolTemplate` component (`src/components/tools/ToolTemplate.tsx` or equivalent)
2. Uses `useTrackToolUse` hook (no custom event emission)
3. `generateMetadata` follows the standard pattern with `alternates.languages` 4-locale
4. All copy lives under `toolUI.*` i18n namespace (no hardcoded strings)
5. Slug follows `kebab-case` convention
6. Listed in `src/config/tools/{category}.ts` with all required fields (`metaTitle`, `metaDescription`, `category`, `slug`, `iconKey`)

When all 6 are true, the ticket is **auto-eligible** for spot-check-only review:
- SEO does **only** check #8 (title/desc char count) on 1 locale + check #10 (dynamic tracking)
- SMM does **only** brand voice check on the 1 locale + verifies OG image is present (check #9)
- Skip the 4-locale full sweep

**Expected savings:** Sprint 5 has +24 new tools. At ~15 min full-review per tool × 24 = 6 hours of review. With auto-approve at ~5 min spot-check × 24 = 2 hours. **Savings: ~4 hours per sprint** — and Sprint 5 is the bottleneck of Wave 2.

### 7.2 Pattern Violation Detection

Auto-approve **does NOT apply** if any of these are detected:
- The implementer bypasses `useTrackToolUse` and calls `fetch('/api/analytics/track')` directly
- A new `event_type` literal appears in the changed code (always full review)
- Hardcoded user-facing strings (i.e. not pulled from `next-intl` t() calls)
- Custom `<head>` tags injected outside of `generateMetadata`
- Any non-standard locale handling (e.g. hardcoded `'az'` instead of `useLocale()`)

If any one of these is present → fall back to **full review** for the ticket. The implementer should be told why so they can fix the divergence next time.

### 7.3 Risk-Based Skipping

The matrix is a **default**, not a hard rule. PO may upgrade or downgrade per ticket:
- **Upgrade** is unilateral — PO can require full review on any ticket. (Defensive default.)
- **Downgrade** requires both reviewers' agreement — neither SEO nor SMM can be forced into a less-rigorous review against their will.

---

## 8. Tiebreak Hierarchy (SEO vs SMM Conflict)

When SEO and SMM disagree on the same ticket — one approves, the other vetoes — the tiebreak is **not** "majority wins" (there's no majority with two reviewers). The hierarchy below resolves it.

### 8.1 Hard Constraints Win First (No Override)

Some rules are non-negotiable regardless of which reviewer cites them. If either reviewer cites a hard constraint, the ticket is **vetoed**, period. No tiebreak needed.

Hard constraints:
1. **60-char SERP title limit** — cited from `SEO_TRACKING_INVARIANTS.md`. SMM cannot override this even if the brand-voice copy needs more characters.
2. **155-char meta description limit** — same.
3. **4-locale completeness** — every user-facing change must work in all 4 locales (AZ, EN, TR, RU). Partial-locale ships are vetoed by either reviewer.
4. **Allowlist event types** — no new `event_type` string without first amending `src/app/api/analytics/track/route.ts:29-40` *and* the SEO_TRACKING_INVARIANTS.md doc, in a separate ticket.
5. **GA4 consent gate** — every beacon must be gated behind `localStorage['cookie-consent']`. No exceptions, including "for testing."

### 8.2 Domain Wins for Soft Conflicts

For soft conflicts where no hard constraint is at stake, the tiebreak is **domain authority**. Each surface area has a domain owner:

| Surface area | Owner | Reasoning |
|---|---|---|
| `<title>` element | **SEO** | Primary SERP signal — SEO authority |
| `<meta name="description">` | **SEO** | SERP snippet — SEO authority |
| `<h1>` (page heading) | **SEO** | Indexation primary signal — SEO authority |
| URL slug | **SEO** | Permanent technical decision — SEO authority |
| Schema.org JSON-LD | **SEO** | Indexation primary signal — SEO authority |
| Canonical URL shape | **SEO** | Indexation primary signal — SEO authority |
| Hreflang structure | **SEO** | International indexation — SEO authority |
| Button copy / CTA labels | **SMM** | Conversion lever — SMM authority |
| Hero tagline | **SMM** | Brand voice — SMM authority |
| Social share text (button labels, share-card snippets) | **SMM** | Brand voice — SMM authority |
| `og:title` (when distinct from `<title>`) | **SMM** | Brand-voice override for social — see §8.3 |
| OG image content / template | **SMM** | Brand asset — SMM authority |
| Cookie banner copy | **SMM** | User-facing copy — SMM authority |
| Newsletter form copy | **SMM** | Conversion + brand — SMM authority |

If the conflict is in a surface area not in this table, escalate to PO (likely the table needs an entry).

### 8.3 The og:title vs <title> Pattern

A common conflict: SEO wants a long-tail keyword `<title>` for SERP CTR; SMM wants a punchy brand-voice `og:title` for social share CTR. **These can be different.**

Next.js `metadata` API supports independent overrides:
```ts
export const metadata: Metadata = {
  title: 'AI Image Upscaler — Free Online Tool | Vaxtim',  // SEO controls
  openGraph: {
    title: 'Make blurry images sharp with AI ✨',           // SMM controls
  },
}
```

When the conflict is between `<title>` and `og:title`, **both reviewers approve their respective surface** and the implementer ships both. There is no tiebreak — they're orthogonal channels.

The same pattern applies to `<meta name="description">` (SEO) vs `og:description` (SMM).

### 8.4 Adjudication Path When Hierarchy Doesn't Resolve

| Step | Action |
|---|---|
| 1 | Reviewers send their verdicts. |
| 2 | If both `APPROVE` or both `VETO`, no conflict — proceed. |
| 3 | If split (one approve, one veto), implementer applies §8.1–§8.3 and re-submits with the resolution noted in the ticket: "Resolved per §8.2 — SEO domain owns title, applied SEO version; brand voice preserved in og:title." |
| 4 | If both reviewers re-veto the resolution, PO adjudicates. |
| 5 | If PO can't decide, PO pulls in `architecture-quality-tech-lead` for a tiebreak vote (advisory only). |
| 6 | If still unresolved after PO + ArchPro tiebreak (rare), CEO escalates. |

Expected frequency: §8.4 step 5 happens ≤1 time per wave. Step 6 happens ≤1 time per quarter.

### 8.5 Worked Example

> **Ticket:** RT-2-04 — CTR title rewrite for `qr-code-generator`
> **Conflict:** SEO proposes `"QR Code Generator — Free Online QR Maker | Vaxtim"` (54 char). SMM objects: "Vaxtim" should always be "Vaxtım" in AZ. So in AZ specifically the title is `"QR Kod Yaradan — Pulsuz Onlayn QR Maker | Vaxtım"` (49 char).
>
> **Resolution per §8.2:** Title is SEO-domain. SEO writes the structure. SMM cannot veto the structure but SMM **can** veto the brand-voice violation (using "Vaxtim" in AZ instead of "Vaxtım"). Implementer fixes per-locale: EN/TR/RU use "Vaxtim", AZ uses "Vaxtım". Both reviewers approve. No tiebreak needed — both rules respected.

---

## 9. Local Test Gate Commands

**No commit may land without all 7 steps green.** This is the enforcement layer — if local tests pass, the gate has succeeded; if local tests fail, no review can override.

Run from `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/` (or worktree subdirectory):

```bash
# 1. Unit + integration (hard gate — fails if any test red)
npm run test:run

# 2. Coverage (fails if drops below threshold in vitest.config.ts)
npm run test:coverage

# 3. E2E (Playwright auto-starts next dev on :3000)
npm run test:e2e

# 4. Type check
npx tsc --noEmit

# 5. Lint
npm run lint

# 6. Production build sanity (catches SSG/CSP regressions)
npm run build

# 7. Visual check (chrome-devtools-mcp navigate + snapshot/screenshot on dev server)
#    — reviewer-driven, logged in ticket
```

### 9.1 Failure Policy

| Step | Failure mode | Policy |
|---|---|---|
| #1 `test:run` | Any test red | **Fix code**, never modify the test to make it pass — unless QA agrees in writing on the ticket |
| #2 `test:coverage` | Drops below threshold | Add tests until restored. The threshold is the floor, not the goal. Bumping the threshold *down* requires explicit PO approval. |
| #3 `test:e2e` | Any spec red | Read trace in `test-results/`, fix root cause. **Flaky tests are not tolerated** — if proven flaky, open a new task to quarantine, but the current change is still blocked until green. |
| #4 `tsc` | Any type error | **HARD BLOCK, no override.** TS errors break SSG. Cannot ship. |
| #5 `lint` | Any lint error | Fix, or explicit `// eslint-disable-next-line {rule}` with justification in ticket. Blanket `eslint-disable` for the whole file is not allowed. |
| #6 `build` | Build error | **HARD BLOCK, no override.** Build is critical — `next.config.js:142` documents the past CSP-triggered white screen. |
| #7 visual | Reviewer reports regression | `frontend-testing-engineer` decides: expected diff → update baseline with note in ticket; unexpected → block. |

### 9.2 Why All 7 Are Mandatory

- **#1 alone is insufficient** — unit tests don't catch SSG/CSP regressions, type errors, or hydration issues
- **#6 alone is insufficient** — build can succeed while tests are red
- **#7 alone is insufficient** — visual review can miss type/lint issues that the local toolchain catches in seconds

The 7-command sequence is the **minimum sufficient gate**. Skipping any one step has caused at least one historical incident:
- Skipping #6 → Sprint 9 CSP white-screen incident (HTTP 200, blank React tree)
- Skipping #4 → Session 12 implicit-any caught at deploy time
- Skipping #7 → Session 23 hreflang bug (would have been caught by `evaluate_script` Pattern A)

### 9.3 Worktree Considerations

When running tests in a parallel worktree (e.g. `sprint-3-tests`):
- Always run `npm install` after entering a fresh worktree (node_modules is per-worktree)
- Use a unique dev server port if the main worktree's dev server is running: `npm run dev -- -p 3001`
- Update `Visual URL(s)` in the ticket to reflect the worktree port

---

## 10. Commit Message Format

Every commit on the gate-protected workflow uses this format:

```
{type}({scope}): {description}

{optional body — what changed and why}

Approved-by: seo-specialist, marketing-smm-strategist
Tests: vitest 2949/2949, playwright 35/35
Ticket: RT-{sprint}-{seq}
```

### 10.1 Field Reference

| Field | Required? | Notes |
|---|---|---|
| `{type}` | yes | Conventional Commits: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `build`, `ci`, `style`, `revert` |
| `{scope}` | yes | Component or module: `megamenu`, `tools`, `content`, `seo`, `tracking`, `csp`, `i18n`, `e2e`, `ui`, `nav` |
| `{description}` | yes | ≤72 chars, imperative mood ("add", "fix", "remove" — not "added", "fixes", "removes") |
| Body | optional | When the "why" isn't obvious from the description |
| `Approved-by:` | **yes** | Comma-separated reviewer agent names. Both SEO + SMM names required. Order: SEO first, SMM second. |
| `Tests:` | yes | Test count summary from steps #1 + #3 of §9 |
| `Ticket:` | yes | Ticket number for traceability — links commit back to the review ticket and any injection-log entries |

### 10.2 Working Example (the Sprint 1 first commit)

```
feat(megamenu): convert desktop tools trigger from button to Link

Replace <button onClick={() => setOpen(true)}> with <Link href="/tools">.
Hover dropdown is preserved via parent onMouseEnter (lines 56-63).
Click now navigates to /tools instead of toggling dropdown only.
Mobile accordion (MobileToolsAccordion.tsx) is unchanged.

Approved-by: seo-specialist, marketing-smm-strategist
Tests: vitest 2950/2950, playwright 36/36
Ticket: RT-1-02
```

### 10.3 Commit With Injection Log Reference

If the commit ships an injected task alongside the main ticket, reference both:

```
feat(tools): add ai-image-upscaler with branded OG image

ToolTemplate-compliant new tool. Includes the SmmPro-injected OG image
fix (1200×630 brand template) per RT-5-03 cap counter 1/3.

Approved-by: seo-specialist, marketing-smm-strategist
Tests: vitest 2960/2960, playwright 38/38
Ticket: RT-5-03 (+ injected: see sprint-injection-log.md SPRINT-5 entry 1)
```

### 10.4 What NOT to Put in the Commit Message

- ❌ "Generated by Claude Code" attribution lines (the agent name in `Approved-by:` is the audit trail)
- ❌ Long copy-pastes of the review ticket (the ticket number suffices)
- ❌ Subjective language ("looks great", "should fix", "probably works")
- ❌ TODOs in the commit message body (open a backlog item instead)

### 10.5 Verification After Commit

After the commit lands, the implementer runs:
```bash
git log --oneline -1
git show --stat HEAD
```
And confirms:
- The `Approved-by:` trailer is present
- Both reviewer names are listed
- The ticket number matches the review thread

PO does spot-check verification at sprint end with:
```bash
git log --oneline {sprint-start-commit}..HEAD | wc -l       # commit count
git log {sprint-start-commit}..HEAD --grep="Approved-by:" | wc -l   # gated commits
```
The two numbers must match. Any commit without `Approved-by:` is a gate violation and gets called out in the sprint retrospective.

---

## Appendix A — Cross-Reference Index

| Reference | Location | Purpose |
|---|---|---|
| Plan §5 (Review Gate Workflow) | `/Users/raufabdullayev/.claude/plans/vast-tickling-thimble.md` | Authoritative source for §1–§7 |
| Plan §6 (Local Test Gate) | same | Authoritative source for §9–§10 |
| Plan §8 (Sprint 0 Deliverables) | same | Where this file is listed as deliverable #3 |
| SEO invariants | `docs/SEO_TRACKING_INVARIANTS.md` (authored by `seo-specialist`) | Cited in every SEO veto |
| SMM invariants | `docs/SMM_CONTENT_INVARIANTS.md` (authored by `marketing-smm-strategist`) | Cited in every SMM veto |
| Injection ledger | `docs/sprint-injection-log.md` | Append-only log of injected tasks |
| Visual review playbook | `docs/agent-reports/visual-review-playbook.md` (maintained by VisualTester) | Source of truth for §6 MCP snippets — §2.2 SEO primitive extraction, §2.6 tracking beacon test |
| Real-Chrome skill (GSC/login) | `~/.claude/skills/controlling-users-real-chrome/SKILL.md` | When reviewer needs to drive user's real Chrome (Google login blocked in MCP Chrome) |
| Event allowlist | `src/app/api/analytics/track/route.ts:29-40` | Source of truth for §5 check #1 |
| Tracking hook | `src/components/analytics/useTrackToolUse.ts` | Reference for §5 checks #2–#4 |
| Consent gate | `src/components/layout/CookieConsent.tsx` | Reference for §5 check #5 |
| Localized URL helper | `src/lib/utils/seo/metadata.ts` (Session 23 invariant) | Reference for §5 check #7 |
| CSP incident history | `next.config.js:142-168` | Why #6 build is a hard block |
| Project rules (PO) | `~/.claude/projects/-Users-raufabdullayev-ideyalar-claude-random/memory/MEMORY.md` | Qayda 1–18 + agent templates |
| Project layer rules | `/Users/raufabdullayev/ideyalar/claude/random/CLAUDE.md` | Qayda A–F + DİQQƏT bug list |

---

## Appendix B — Common Patterns Quick Reference

### Submitting a ticket
```
SendMessage to: seo-specialist
SendMessage to: marketing-smm-strategist
(both with the same REVIEW TICKET #RT-X-Y body — see §1.1)
```

### Sending a verdict
```
SendMessage to: {implementer-agent-name}
Body: "Verdict: APPROVE | APPROVE_WITH_FOLLOWUP | VETO | VETO_WITH_NEW_TASK"
       + cited rule (mandatory for VETO)
       + reasoning
```

### Logging an injection
1. Append entry to `docs/sprint-injection-log.md` (never edit existing entries)
2. Increment cap counter in the entry header
3. Reference in the commit message body if the injection ships in the same commit

### Escalating to PO
```
SendMessage to: team-lead (or "po")
Body: "Escalation needed on RT-X-Y. Reviewer X cited rule Y but ..."
```

### Requesting a second opinion
```
SendMessage to: team-lead
Body: "Requesting second-opinion on RT-X-Y from architecture-quality-tech-lead. Reason: ..."
(PO approves or denies; if approved, PO pings ArchPro)
```

---

**End of review-cowork.md** — Sprint 0 deliverable, ready for SEO/SMM cross-link from their invariant docs.
