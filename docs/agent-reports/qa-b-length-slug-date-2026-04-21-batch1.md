# QA-B Length/Slug/Date/Category Report — Session 32

**Date:** 2026-04-21
**Batch:** batch1
**Agent:** QA-B (length / slug / date / category structural validation)
**Scope:** 36 articles (9 × 4 locales) from news-writer-output-{az,en,tr,ru}-2026-04-21-batch1.md
**Test auth source:** `src/data/__tests__/news-articles.test.ts`
**Slug conflict corpus:** `src/data/news-articles.ts` (5693 lines, 292 articles)

## Summary Matrix

| Check | AZ | EN | TR | RU | Overall |
|-------|-----|-----|-----|-----|---------|
| Title ≤75 char (soft) | 6/9 | 7/9 | 9/9 | 9/9 | MINOR issues (5 titles >75) |
| Title ≤90 char (BLOCKING) | 7/9 | 9/9 | 9/9 | 9/9 | 2 BLOCKING (AZ #4, #7b) |
| Content >500 char (test:289-293) | 9/9 | 9/9 | 9/9 | 9/9 | PASS |
| Slug format `/^[a-z0-9à-ɏ]+([-][a-z0-9à-ɏ]+)*$/` | 9/9 | 9/9 | 9/9 | 9/9 | PASS |
| Slug unique among 36 new | — | — | — | — | 36/36 PASS |
| Slug conflict with existing 292 | 0 | 0 | 0 | 0 | PASS |
| AZ no-prefix rule | 9/9 | — | — | — | PASS |
| EN `en-` prefix | — | 9/9 | — | — | PASS |
| TR `tr-` prefix | — | — | 9/9 | — | PASS |
| RU `ru-` prefix | — | — | — | 9/9 | PASS |
| Date format YYYY-MM-DD (test:244-248) | 9/9 | 9/9 | 9/9 | 9/9 | PASS |
| Year 2020–2030 (test:258-262) | 9/9 | 9/9 | 9/9 | 9/9 | PASS |
| Cross-locale date align (test:265-273) | — | PASS | PASS | PASS | PASS |
| EN category whitelist (test:316-327) | — | 9/9 | — | — | PASS |
| Locale-appropriate category | 9/9 | 9/9 | 9/9 | 9/9 | PASS |

## Detailed findings

### Content length (all PASS — test BLOCKING line 289-293: content.length > 500)

| Locale | Min chars | Max chars | All > 500 |
|--------|-----------|-----------|-----------|
| AZ     | 1454      | 2069      | ✅         |
| EN     | 1438      | 2183      | ✅         |
| TR     | 1536      | 1895      | ✅         |
| RU     | 1278      | 1870      | ✅         |

Every one of the 36 articles is substantially above the 500-char hard minimum. No BLOCKING issues.

### Slug format (all PASS)

All 36 slugs match the regex `/^[a-z0-9à-ɏ]+([-][a-z0-9à-ɏ]+)*$/` (kebab-case, lowercase, with hyphens, unicode letter range allowed). No spaces. No underscores. No uppercase.

### Slug uniqueness (all PASS)

- Among 36 new slugs: all unique (36/36)
- Against existing 292 slugs in `src/data/news-articles.ts`: 0 conflicts for every new slug (verified via `grep -c` on each)

### Locale prefix rules (all PASS)

- **AZ** (test does not require prefix): 0/9 slugs have any locale prefix ✅
- **EN** (test:181-186 requires `en-`): 9/9 ✅
- **TR** (test:188-193 requires `tr-`): 9/9 ✅
- **RU** (test:195-200 requires `ru-`): 9/9 ✅

### Dates — format, range, cross-locale alignment

All 36 dates match `/^\d{4}-\d{2}-\d{2}$/`, year 2026 (in 2020–2030 range).

**Date set per locale:**
- AZ: {2026-04-19, 2026-04-20, 2026-04-21}
- EN: {2026-04-19, 2026-04-20, 2026-04-21}
- TR: {2026-04-19, 2026-04-20, 2026-04-21}
- RU: {2026-04-19, 2026-04-20, 2026-04-21}

**Cross-locale alignment (test:265-273):** every EN date is present in the AZ date set. Same property holds for TR and RU via transitive equality. Topic-by-topic date alignment:

| Topic | AZ | EN | TR | RU | Aligned? |
|-------|-----|-----|-----|-----|---------|
| Bulgaria Radev | 2026-04-19 | 2026-04-19 | 2026-04-19 | 2026-04-19 | ✅ |
| Japan 7.7 quake | 2026-04-20 | 2026-04-20 | 2026-04-20 | 2026-04-20 | ✅ |
| Iran ceasefire / Vance | 2026-04-21 | 2026-04-21 | 2026-04-21 | 2026-04-21 | ✅ |
| Amazon-Anthropic | 2026-04-20 | 2026-04-20 | 2026-04-20 | 2026-04-20 | ✅ |
| IMF WEO | 2026-04-19 | 2026-04-19 | 2026-04-19 | 2026-04-19 | ✅ |
| Gaza RDNA | 2026-04-20 | 2026-04-20 | 2026-04-20 | 2026-04-20 | ✅ |
| NBA Game 1 (Sun) | 2026-04-19 | 2026-04-19 | 2026-04-19 | 2026-04-19 | ✅ |
| NBA Game 2 (Mon) | 2026-04-20 | 2026-04-20 | 2026-04-20 | 2026-04-20 | ✅ |
| Coachella Karol G | 2026-04-19 | 2026-04-19 | 2026-04-19 | 2026-04-19 | ✅ |

No Session 31 date bug reappearance.

### Categories

**EN whitelist (test:316-327, strict):** All 9 EN articles use values from `['Technology', 'Economy', 'Sports', 'Education', 'Health', 'Science', 'Culture', 'Travel', 'Business', 'World']`.

Distribution (EN): 4 × World, 2 × Sports, 1 × Business, 1 × Economy, 1 × Culture — no `Tech`, no combined strings.

**AZ / TR / RU locale-appropriate:** all use language-native strings from the expected vocabulary sets (Dünya / Dünya / Мир, İqtisadiyyat / Ekonomi / Экономика, İdman / Spor / Спорт, Mədəniyyət / Kültür / Культура, İş / Biznes / Бизнес).

One cross-locale categorization note (not blocking): for topic 4 (Amazon–Anthropic), EN = `Business` while AZ = `İqtisadiyyat`, TR = `İş`, RU = `Бизнес`. EN passes whitelist; AZ matches its allowed vocabulary. This is a translation/angle choice, not a test failure.

### Title length

The test file has **no title-length assertion** beyond `length > 0` (test:207-213), so no hard BLOCKING test exists for title chars. Per QA-B heuristic (≤75 OK, >75 MINOR, >90 BLOCKING):

| Status | Count | Details |
|--------|-------|---------|
| OK (≤75) | 31 | — |
| MINOR (76–90) | 3 | AZ #9 (83), EN #3 (80), EN #6 (79) |
| BLOCKING (>90) | 2 | AZ #4 (100), AZ #7b (91) |

See issues list below for specifics.

## Issues by severity

### BLOCKING

No test-level BLOCKING issues. (Content length, slug format, slug uniqueness, slug conflict with existing data, date format, date range, cross-locale date alignment, EN category whitelist — all pass the Vitest suite.)

The two title-length flags below are QA-B heuristic BLOCKING (our internal standard), NOT test failures. They can be shipped as-is without the test suite failing. If the PO wants them shortened, propose:

1. **[AZ heuristic BLOCKING, title 100 char]** `amazon-anthropic-25-milyard-dollar-investisiya-100-milyard-aws-20-aprel`
   - Current: `Amazon Anthropic-ə 25 milyard dollaradək investisiya yatırır; 100 milyard dollarlıq AWS sövdələşməsi` (100 char)
   - Suggested: `Amazon Anthropic-ə 25 mlrd dollar yatırır; 100 mlrd dollarlıq AWS sövdələşməsi` (79 char — MINOR)
   - Or tighter: `Amazon Anthropic-ə 25 mlrd dollar yatırır, AWS ilə 100 mlrd dollar saziş` (~72 char — OK)

2. **[AZ heuristic BLOCKING, title 91 char]** `nba-pley-off-timbervulvz-houks-sok-geri-donusler-20-aprel`
   - Current: `NBA pley-off: Timbervulvz və Houks şok geri dönüş qələbələri ilə seriyaları bərabərləşdirdi` (91 char)
   - Suggested: `NBA pley-off: Timbervulvz və Houks şok geri dönüşlə seriyaları 1-1 etdi` (~71 char — OK)

### MINOR

3. **[AZ, title 83 char]** `coachella-karol-g-ilk-latina-hedlayneri-tropicoqueta-turu-19-aprel`
   - Current: `Coachella 2026: Karol G tarixi ilk Latina hedlaynerlik çıxışı ilə festivalı bağladı` (83 char)
   - Suggested: `Coachella 2026: Karol G ilk Latina hedlayneri olaraq festivalı bağladı` (~70 char)

4. **[EN, title 80 char]** `en-iran-ceasefire-brink-vance-islamabad-april-21`
   - Current: `Iran Ceasefire on the Brink: Vance Flies to Islamabad as Hormuz Standoff Deepens` (80 char)
   - Suggested: `Iran Ceasefire on the Brink: Vance Flies to Islamabad, Hormuz Tense` (67 char)

5. **[EN, title 79 char]** `en-gaza-rdna-71b-reconstruction-april-20`
   - Current: `UN, EU, World Bank: Gaza Needs $71.4B to Rebuild; Development Set Back 77 Years` (79 char)
   - Suggested: `UN, EU, World Bank: Gaza Needs $71.4B; Development Set Back 77 Years` (68 char)

(None of 5 MINOR flags are test-breakers; they are SEO / display-quality polish suggestions.)

## Verdict

- **Overall status: PASS** (for the Vitest suite — all hard assertions clear)
- **BLOCKING count (test):** 0
- **BLOCKING count (QA-B heuristic, title > 90 char):** 2
- **MINOR count (title 76–90 char):** 3
- **Recommendation:** ship as-is is test-safe. For editorial polish, PO may choose to trim the 2 heuristic-BLOCKING AZ titles and optionally the 3 MINOR titles before commit. Everything else (content, slugs, dates, categories, cross-locale alignment) is clean.

**Report file:** `docs/agent-reports/qa-b-length-slug-date-2026-04-21-batch1.md`
