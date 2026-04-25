# QA-B (Length/Slug/Date/Category) Report — 2026-04-25

**Auditor:** QA-B (Senior QA Engineer)
**Scope:** Structural compliance check on 4 writer outputs (AZ, EN, TR, RU) — 9 articles each = 36 total.
**Reference data file:** `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/data/news-articles.ts` (existing 432 slugs).

---

## Summary Table

| Locale | Articles | Title OK | Content OK | Slug OK | Date OK | Category OK | Locale OK |
|--------|----------|----------|------------|---------|---------|-------------|-----------|
| AZ     | 9        | 9/9      | 9/9        | 9/9     | 9/9     | 9/9         | 9/9       |
| EN     | 9        | 9/9      | 9/9        | 9/9     | 9/9     | 9/9         | 9/9       |
| TR     | 9        | 9/9      | 9/9        | 9/9     | 9/9     | 9/9         | 9/9       |
| RU     | 9        | 9/9      | 9/9        | 9/9     | 9/9     | 9/9         | 9/9       |
| **Total** | **36** | **36/36** | **36/36** | **36/36** | **36/36** | **36/36** | **36/36** |

---

## Title Length Check (code-point counted via Python `len()`)

### AZ — required range 60-75

| # | Length | Range | Status | Title |
|---|--------|-------|--------|-------|
| T1 | 70 | 60-75 | OK | Tramp İran danışıqlarını ləğv etdi: Vitkof və Kuşner Pakistana getmədi |
| T2 | 65 | 60-75 | OK | Malidə əlaqələndirilmiş hücum: JNIM və FLA Bamako və Kidalı vurdu |
| T3 | 65 | 60-75 | OK | Rusiya Ukraynaya 666 raket və dronla zərbə: Dnipro vuruldu, 7 ölü |
| T4 | 71 | 60-75 | OK | Zelenski Qəbələdə Əliyevlə görüşdü: 6 saziş, müdafiə və enerji daxildir |
| T5 | 64 | 60-75 | OK | Qəzzədə 20 ildən sonra ilk yerli seçki: Deyr əl-Bələhdə səsvermə |
| T6 | 66 | 60-75 | OK | İtaliyada Azadlıq Günü: Mattarella "İndi və həmişə Müqavimət" dedi |
| T7 | 65 | 60-75 | OK | Anzak Günü 2026: Çanaqqalada Qallipoli desantının 111-ci ildönümü |
| T8 | 70 | 60-75 | OK | Manchester City FA Kubokunda finala çıxdı: Qonsales Sauthemptonu yıxdı |
| T9 | 70 | 60-75 | OK | NHL pley-off 25 aprel: Hurricanes, Stars və Flyers seriyaları bağlayır |

### EN — required range 51-60 (hard 60 ceiling)

| # | Length | Range | Status |
|---|--------|-------|--------|
| T1 | 53 | 51-60 | OK |
| T2 | 54 | 51-60 | OK |
| T3 | 54 | 51-60 | OK |
| T4 | 51 | 51-60 | OK |
| T5 | 51 | 51-60 | OK |
| T6 | 55 | 51-60 | OK |
| T7 | 56 | 51-60 | OK |
| T8 | 55 | 51-60 | OK |
| T9 | 53 | 51-60 | OK |

### TR — required range 51-60 (hard 60 ceiling)

| # | Length | Range | Status |
|---|--------|-------|--------|
| T1 | 58 | 51-60 | OK |
| T2 | 58 | 51-60 | OK |
| T3 | 51 | 51-60 | OK |
| T4 | 55 | 51-60 | OK |
| T5 | 55 | 51-60 | OK |
| T6 | 60 | 51-60 | OK (at ceiling) |
| T7 | 54 | 51-60 | OK |
| T8 | 53 | 51-60 | OK |
| T9 | 58 | 51-60 | OK |

### RU — required range 51-60 (hard 60 ceiling)

| # | Length | Range | Status |
|---|--------|-------|--------|
| T1 | 52 | 51-60 | OK |
| T2 | 55 | 51-60 | OK |
| T3 | 55 | 51-60 | OK |
| T4 | 58 | 51-60 | OK |
| T5 | 55 | 51-60 | OK |
| T6 | 56 | 51-60 | OK |
| T7 | 53 | 51-60 | OK |
| T8 | 53 | 51-60 | OK |
| T9 | 56 | 51-60 | OK |

---

## Content Length Check (1500-2100 chars) and H2 Heading Count (>=2)

| Locale | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 |
|--------|----|----|----|----|----|----|----|----|----|
| AZ len | 1739 | 1971 | 1787 | 1805 | 1881 | 1851 | 1777 | 1802 | 1674 |
| AZ H2  | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| EN len | 2032 | 2075 | 2007 | 2094 | 2073 | 2007 | 1980 | 1836 | 1863 |
| EN H2  | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 4 |
| TR len | 2027 | 1969 | 1991 | 2031 | 1969 | 2085 | 1992 | 1920 | 1972 |
| TR H2  | 3 | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 3 |
| RU len | 1953 | 2084 | 1947 | 2092 | 2012 | 2085 | 2095 | 1996 | 1852 |
| RU H2  | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 |

All 36 articles within 1500-2100 character range. All articles have at least 2 H2 headings.

---

## Slug Format Check

- **Format pattern:** `^[a-z0-9\-]+$` (lowercase ASCII letters/digits/hyphens only) — 36/36 PASS
- **Prefix rules:**
  - AZ: no prefix — 9/9 PASS
  - EN: starts with `en-` — 9/9 PASS
  - TR: starts with `tr-` — 9/9 PASS
  - RU: starts with `ru-` — 9/9 PASS (Cyrillic transliterated to ASCII correctly)

---

## Slug Uniqueness Check

- **Existing slugs in `news-articles.ts`:** 432 (verified via `grep -E "^  '[a-z]" | wc -l`)
- **New proposed slugs:** 36 (9 AZ + 9 EN + 9 TR + 9 RU)
- **Internal duplicates within new set:** 0
- **Collisions with existing 432 slugs:** **0**

Method: Programmatic comparison of all 36 proposed slug keys against extracted slug list from `src/data/news-articles.ts` using regex `\n  '([a-z0-9\-]+)':\s*\{` — no overlap detected.

Cross-verified via individual `grep -c` lookups on each of the 36 candidate slugs — all returned 0 hits.

---

## Date Check

All 36 articles have `date: '2026-04-25'`. — PASS

---

## Locale Check

- AZ file: all 9 articles have `locale: 'az'` — PASS
- EN file: all 9 articles have `locale: 'en'` — PASS
- TR file: all 9 articles have `locale: 'tr'` — PASS
- RU file: all 9 articles have `locale: 'ru'` — PASS

---

## Category Check (against allowed enums)

| Locale | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | Valid? |
|--------|----|----|----|----|----|----|----|----|----|--------|
| AZ | Siyasət | Dünya | Dünya | Siyasət | Siyasət | Siyasət | Mədəniyyət | İdman | İdman | All in allowed AZ enum |
| EN | Politics | World | World | Politics | Politics | Politics | Culture | Sports | Sports | All in allowed EN enum |
| TR | Siyaset | Dünya | Dünya | Siyaset | Siyaset | Siyaset | Kültür | Spor | Spor | All in allowed TR enum |
| RU | Политика | Мир | Мир | Политика | Политика | Политика | Культура | Спорт | Спорт | All in allowed RU enum |

All 36 categories valid. — PASS

---

## Issues Detail

**No BLOCKING issues found.**
**No MINOR issues found.**

(Note: TR T6 title is exactly at the 60-character hard ceiling — within spec but no margin. This is informational only, not a finding.)

---

## Verdict

**GO**

All structural compliance checks for length, slug format/prefix/uniqueness, date, category, and locale pass for all 36 articles across AZ, EN, TR, RU.

The writer outputs are ready to be merged into `src/data/news-articles.ts` from a structural standpoint.

Final database state will be 432 + 36 = **468 articles**.

---

**QA-B sign-off:** Structural pass. Forward to QA-A (content quality) and Editor for final integration.
