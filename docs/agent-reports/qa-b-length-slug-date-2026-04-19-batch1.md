# QA-B Length/Slug/Date Report — 2026-04-19 Batch 1

**Audit date:** 2026-04-19
**Auditor:** QA-B (length, slug, date, cross-locale alignment)
**Files audited:**
- `docs/agent-reports/news-writer-output-az-2026-04-19-batch1.md`
- `docs/agent-reports/news-writer-output-en-2026-04-19-batch1.md`
- `docs/agent-reports/news-writer-output-tr-2026-04-19-batch1.md`
- `docs/agent-reports/news-writer-output-ru-2026-04-19-batch1.md`
**Reference:** `docs/agent-reports/news-research-2026-04-19-batch1.md`
**Existing data:** `src/data/news-articles.ts` — 272 existing slugs confirmed.

---

## Summary

- **BLOCKING: 10** — All ten TR and RU articles are dated `2026-04-19` instead of the research brief's event dates (`2026-04-17` or `2026-04-18`). This breaks cross-locale date alignment (topic parity across locales) and misrepresents the news date.
- **MINOR: 0**
- **OK checks:** title lengths (20/20), content lengths (20/20), slug format (20/20), slug uniqueness in batch (20/20), slug collisions with 272 existing (0), schema (20/20), categories (20/20), cross-locale topic-category alignment (5/5).

Other than the date issue, the batch is clean.

---

## A. Title lengths

Unicode code points (len(str) in Python). Target bands per locale.

| Locale | Slug | Title chars | Target | Status |
| --- | --- | --- | --- | --- |
| az | iran-hormuz-bogazi-yeniden-baglandi-tanker-ates-18-aprel | 58 | 45-80 | OK |
| az | kiyev-kutlevi-atesli-hucum-6-olu-sbu-terror-18-aprel | 61 | 45-80 | OK |
| az | nba-pley-off-ilk-raund-dord-evsahibi-qelebe-18-aprel | 62 | 45-80 | OK |
| az | openai-gpt-rosalind-hayat-elmleri-ai-17-aprel | 62 | 45-80 | OK |
| az | titanik-xilas-jileti-670-min-funt-rekord-herrac-18-aprel | 56 | 45-80 | OK |
| en | en-iran-hormuz-closed-again-ships-fired-upon-2026 | 53 | 40-65 | OK |
| en | en-kyiv-mass-shooting-six-killed-sbu-terrorism-2026 | 53 | 40-65 | OK |
| en | en-nba-playoffs-game-1-home-teams-all-win-2026 | 63 | 40-65 | OK |
| en | en-openai-gpt-rosalind-life-sciences-launch-2026 | 59 | 40-65 | OK |
| en | en-titanic-life-jacket-francatelli-auction-record-2026 | 60 | 40-65 | OK |
| tr | tr-iran-hurmuz-bogazini-yeniden-kapatti-gemilere-ates | 51 | 40-60 | OK |
| tr | tr-kiev-silahli-saldiri-6-olu-sbu-terorizm-sinifladi | 49 | 40-60 | OK |
| tr | tr-nba-playoffs-1-tur-oyun-1-ev-sahipleri-dort-dortluk | 52 | 40-60 | OK |
| tr | tr-openai-gpt-rosalind-yasam-bilimleri-ilac-kesfi | 54 | 40-60 | OK |
| tr | tr-titanik-can-yelegi-906-bin-dolara-satildi-rekor | 54 | 40-60 | OK |
| ru | ru-iran-zakryl-ormuz-snova-ogon-po-tankeru | 52 | 40-60 | OK |
| ru | ru-kiev-massovaya-strelba-shest-pogibshih-sbu-terakt | 48 | 40-60 | OK |
| ru | ru-nba-pley-off-2026-igra-1-vse-hozyaeva-vyigrali | 43 | 40-60 | OK |
| ru | ru-openai-gpt-rosalind-biologiya-preparaty | 55 | 40-60 | OK |
| ru | ru-titanik-spasatelnyy-zhilet-prodan-za-906-tysyach | 55 | 40-60 | OK |

**Result:** All 20 titles within target bands. No MINOR, no BLOCKING.

---

## B. Content lengths

All 500 < length < 3000. Soft target 1000-1500 is informational; soft-target hits flagged for info only.

| Locale | Slug | Content chars | Status |
| --- | --- | --- | --- |
| az | iran-hormuz-bogazi-yeniden-baglandi-tanker-ates-18-aprel | 2235 | OK |
| az | kiyev-kutlevi-atesli-hucum-6-olu-sbu-terror-18-aprel | 2100 | OK |
| az | nba-pley-off-ilk-raund-dord-evsahibi-qelebe-18-aprel | 1807 | OK |
| az | openai-gpt-rosalind-hayat-elmleri-ai-17-aprel | 2262 | OK |
| az | titanik-xilas-jileti-670-min-funt-rekord-herrac-18-aprel | 1976 | OK |
| en | en-iran-hormuz-closed-again-ships-fired-upon-2026 | 2050 | OK |
| en | en-kyiv-mass-shooting-six-killed-sbu-terrorism-2026 | 1916 | OK |
| en | en-nba-playoffs-game-1-home-teams-all-win-2026 | 1539 | OK |
| en | en-openai-gpt-rosalind-life-sciences-launch-2026 | 1998 | OK |
| en | en-titanic-life-jacket-francatelli-auction-record-2026 | 1788 | OK |
| tr | tr-iran-hurmuz-bogazini-yeniden-kapatti-gemilere-ates | 1433 | OK (soft-target) |
| tr | tr-kiev-silahli-saldiri-6-olu-sbu-terorizm-sinifladi | 1492 | OK (soft-target) |
| tr | tr-nba-playoffs-1-tur-oyun-1-ev-sahipleri-dort-dortluk | 1400 | OK (soft-target) |
| tr | tr-openai-gpt-rosalind-yasam-bilimleri-ilac-kesfi | 1486 | OK (soft-target) |
| tr | tr-titanik-can-yelegi-906-bin-dolara-satildi-rekor | 1387 | OK (soft-target) |
| ru | ru-iran-zakryl-ormuz-snova-ogon-po-tankeru | 1442 | OK (soft-target) |
| ru | ru-kiev-massovaya-strelba-shest-pogibshih-sbu-terakt | 1497 | OK (soft-target) |
| ru | ru-nba-pley-off-2026-igra-1-vse-hozyaeva-vyigrali | 1490 | OK (soft-target) |
| ru | ru-openai-gpt-rosalind-biologiya-preparaty | 1487 | OK (soft-target) |
| ru | ru-titanik-spasatelnyy-zhilet-prodan-za-906-tysyach | 1424 | OK (soft-target) |

**Range:** min 1387, max 2262. Observation: TR/RU are consistently ~1400-1500 (tighter), AZ/EN are 1539-2262 (more verbose). All within the 500-3000 hard window. No BLOCKING.

---

## C. Slug uniqueness

### Within batch (20 new slugs)
- Total new slugs: 20
- Unique: 20
- **Within-batch duplicates: none.**

### Against existing 272 slugs (`src/data/news-articles.ts`)
Cross-checked each of the 20 new slugs against the full set of 272 existing article keys extracted via pattern `^\s*'[a-z0-9][a-z0-9-]+':\s*\{`.
- **Collisions: 0.**

### Slug format sanity
All 20 slugs pass kebab-case check `/^[a-z0-9]+(-[a-z0-9]+)*$/`, all lengths 42-56 chars (within 20-70 requirement). No spaces, no special chars, no uppercase.

Slug lengths: az 45-56, en 46-54, tr 49-54, ru 42-52.

---

## D. Date format

All 20 dates parse as ISO `'YYYY-MM-DD'` with single quotes. Year 2026 (in range). Month/day valid. No malformed dates.

However, see Section E — format is valid, but the DATE VALUE for TR/RU is wrong vs. the research brief.

---

## E. CROSS-LOCALE DATE ALIGNMENT (CRITICAL)

Per research brief `news-research-2026-04-19-batch1.md`, each topic has a canonical event date that all four locales must share.

| Topic | AZ date | EN date | TR date | RU date | Expected | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 — Iran Hormuz | 2026-04-18 | 2026-04-18 | **2026-04-19** | **2026-04-19** | 2026-04-18 | **BLOCKING (TR, RU)** |
| 2 — Kyiv shooting | 2026-04-18 | 2026-04-18 | **2026-04-19** | **2026-04-19** | 2026-04-18 | **BLOCKING (TR, RU)** |
| 3 — NBA Playoffs | 2026-04-18 | 2026-04-18 | **2026-04-19** | **2026-04-19** | 2026-04-18 | **BLOCKING (TR, RU)** |
| 4 — GPT-Rosalind | 2026-04-17 | 2026-04-17 | **2026-04-19** | **2026-04-19** | 2026-04-17 | **BLOCKING (TR, RU)** |
| 5 — Titanic auction | 2026-04-18 | 2026-04-18 | **2026-04-19** | **2026-04-19** | 2026-04-18 | **BLOCKING (TR, RU)** |

**Root cause:** Both TR and RU writer files declared in their header comments that they used publication-day (`2026-04-19`) as the date for all 5 articles. AZ and EN correctly used the event dates from the research brief. This is a repeat of the Session 30 blocking issue where writers defaulted to the run-day instead of the event date.

**Scope of fix:** 10 articles — all 5 TR + all 5 RU.

- TR: 4 articles need `2026-04-19` → `2026-04-18` (Topics 1, 2, 3, 5)
- TR: 1 article needs `2026-04-19` → `2026-04-17` (Topic 4 — GPT-Rosalind)
- RU: 4 articles need `2026-04-19` → `2026-04-18` (Topics 1, 2, 3, 5)
- RU: 1 article needs `2026-04-19` → `2026-04-17` (Topic 4 — GPT-Rosalind)

---

## F. Category validity

Allowed buckets per locale matched against declared categories:

| Locale | Categories used | Allowed? |
| --- | --- | --- |
| az | Dünya, Dünya, İdman, Texnologiya, Mədəniyyət | All valid |
| en | World, World, Sports, Tech, Culture | All valid |
| tr | Dünya, Dünya, Spor, Teknoloji, Kültür | All valid |
| ru | Мир, Мир, Спорт, Технологии, Культура | All valid |

**Result:** 20/20 valid. No BLOCKING, no MINOR.

---

## G. Cross-locale topic-category alignment

Per QA spec, topics should map consistently to the same category bucket across locales.

| Topic | AZ | EN | TR | RU | Expected bucket | Aligned? |
| --- | --- | --- | --- | --- | --- | --- |
| 1 Iran Hormuz | Dünya | World | Dünya | Мир | World | YES |
| 2 Kyiv shooting | Dünya | World | Dünya | Мир | World | YES |
| 3 NBA Playoffs | İdman | Sports | Spor | Спорт | Sports | YES |
| 4 GPT-Rosalind | Texnologiya | Tech | Teknoloji | Технологии | Tech | YES |
| 5 Titanic auction | Mədəniyyət | Culture | Kültür | Культура | Culture | YES |

**Result:** 5/5 topic-category groups perfectly aligned across 4 locales. No MINOR.

---

## H. Structural schema

Required fields: `title`, `date`, `category`, `locale`, `content`.

All 20 articles have all 5 required fields populated (verified by regex extraction + non-null check).
`locale` field value matches the file locale for every article (az→'az', en→'en', tr→'tr', ru→'ru').

**Result:** 20/20 pass schema. No BLOCKING.

---

## Action items for fix agent

### BLOCKING (must fix before merge)

Cross-locale date alignment — 10 articles total:

**TR file (`news-writer-output-tr-2026-04-19-batch1.md`):**
- [BLOCKING] `tr-iran-hurmuz-bogazini-yeniden-kapatti-gemilere-ates` — change `date: '2026-04-19'` → `'2026-04-18'`
- [BLOCKING] `tr-kiev-silahli-saldiri-6-olu-sbu-terorizm-sinifladi` — change `date: '2026-04-19'` → `'2026-04-18'`
- [BLOCKING] `tr-nba-playoffs-1-tur-oyun-1-ev-sahipleri-dort-dortluk` — change `date: '2026-04-19'` → `'2026-04-18'`
- [BLOCKING] `tr-openai-gpt-rosalind-yasam-bilimleri-ilac-kesfi` — change `date: '2026-04-19'` → `'2026-04-17'`
- [BLOCKING] `tr-titanik-can-yelegi-906-bin-dolara-satildi-rekor` — change `date: '2026-04-19'` → `'2026-04-18'`

**RU file (`news-writer-output-ru-2026-04-19-batch1.md`):**
- [BLOCKING] `ru-iran-zakryl-ormuz-snova-ogon-po-tankeru` — change `date: '2026-04-19'` → `'2026-04-18'`
- [BLOCKING] `ru-kiev-massovaya-strelba-shest-pogibshih-sbu-terakt` — change `date: '2026-04-19'` → `'2026-04-18'`
- [BLOCKING] `ru-nba-pley-off-2026-igra-1-vse-hozyaeva-vyigrali` — change `date: '2026-04-19'` → `'2026-04-18'`
- [BLOCKING] `ru-openai-gpt-rosalind-biologiya-preparaty` — change `date: '2026-04-19'` → `'2026-04-17'`
- [BLOCKING] `ru-titanik-spasatelnyy-zhilet-prodan-za-906-tysyach` — change `date: '2026-04-19'` → `'2026-04-18'`

### MINOR

None.

### Notes for fixer

- Only the `date:` field line needs changing in each object. Titles, slugs, content bodies already cite the correct event dates internally (e.g. RU Iran article says "вечером 18 апреля 2026 года…") — so the `date` field is the only mismatch.
- After the date fix, re-run any pre-merge integrity check that requires same-topic dates across locales. No further title/length/slug work required on this batch.
- Also consider removing the stale header comment in the TR writer output that says "All 5 articles dated 2026-04-19 (publication day…)" — this comment would mislead any future agent that reads the file.
