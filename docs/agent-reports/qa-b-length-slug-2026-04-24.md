# QA-B: Length/Slug/Date/Category — 2026-04-24

**Auditor:** QA-B
**Scope:** 32 articles (8 AZ + 8 EN + 8 TR + 8 RU)
**Method:** Python `len()` for char counts; `grep -c` for slug uniqueness check against `src/data/news-articles.ts` (400 existing entries)

---

## Summary

| Check                                | PASS count | FAIL count |
|--------------------------------------|------------|------------|
| Title length                         | 32         | 0          |
| Content length (1500–2500)           | 32         | 0          |
| Slug format (ASCII, kebab-case)      | 32         | 0          |
| Slug uniqueness (vs 400 existing)    | 32         | 0          |
| Slug uniqueness (within batch)       | 32         | 0          |
| Date ISO (`2026-04-24`)              | 32         | 0          |
| Category enum match                  | 32         | 0          |
| locale field match                   | 32         | 0          |

**BLOCKING:** 0
**MINOR:** 1 (spec/codebase convention discrepancy — not a writer error; see notes)

---

## Detailed findings

### BLOCKING

None.

### MINOR

- **AZ slug convention — QA-B spec says `[slug]-az` suffix, actual codebase convention is no-prefix/no-suffix.** Verified by inspecting `src/data/news-articles.ts`: 0 AZ articles end in `-az`, all use plain kebab-case without any locale marker (e.g., `papa-leo-xiv-afrika-turu-malabo-sonuncu-messe-23-aprel`). Writer correctly followed the codebase convention (no suffix). This is a discrepancy in the QA-B prompt, not a writer defect. No action required on the writer; recommend updating the QA-B spec to reflect actual codebase convention.

### Per-article summary table

| ID     | Locale | Title chars | Content chars | Slug (prefix/suffix) | Unique vs existing | Unique in batch | Date | Category    | locale |
|--------|--------|-------------|---------------|---------------------|--------------------|-----------------|------|-------------|--------|
| T1-AZ  | az     | 72          | 1679          | plain (no prefix)   | PASS               | PASS            | PASS | Siyasət     | az     |
| T2-AZ  | az     | 75          | 1918          | plain (no prefix)   | PASS               | PASS            | PASS | Texnologiya | az     |
| T3-AZ  | az     | 73          | 1675          | plain (no prefix)   | PASS               | PASS            | PASS | Dünya       | az     |
| T4-AZ  | az     | 67          | 1645          | plain (no prefix)   | PASS               | PASS            | PASS | İqtisadiyyat| az     |
| T5-AZ  | az     | 67          | 1734          | plain (no prefix)   | PASS               | PASS            | PASS | Dünya       | az     |
| T6-AZ  | az     | 75          | 1647          | plain (no prefix)   | PASS               | PASS            | PASS | Dünya       | az     |
| T7-AZ  | az     | 66          | 1634          | plain (no prefix)   | PASS               | PASS            | PASS | Texnologiya | az     |
| T8-AZ  | az     | 71          | 1564          | plain (no prefix)   | PASS               | PASS            | PASS | İdman       | az     |
| T1-EN  | en     | 52          | 1947          | en- prefix          | PASS               | PASS            | PASS | Politics    | en     |
| T2-EN  | en     | 53          | 1953          | en- prefix          | PASS               | PASS            | PASS | Technology  | en     |
| T3-EN  | en     | 55          | 1956          | en- prefix          | PASS               | PASS            | PASS | World       | en     |
| T4-EN  | en     | 55          | 1898          | en- prefix          | PASS               | PASS            | PASS | Economy     | en     |
| T5-EN  | en     | 56          | 1890          | en- prefix          | PASS               | PASS            | PASS | World       | en     |
| T6-EN  | en     | 58          | 1847          | en- prefix          | PASS               | PASS            | PASS | World       | en     |
| T7-EN  | en     | 57          | 1952          | en- prefix          | PASS               | PASS            | PASS | Technology  | en     |
| T8-EN  | en     | 57          | 1746          | en- prefix          | PASS               | PASS            | PASS | Sports      | en     |
| T1-TR  | tr     | 53          | 1973          | tr- prefix          | PASS               | PASS            | PASS | Siyaset     | tr     |
| T2-TR  | tr     | 52          | 1991          | tr- prefix          | PASS               | PASS            | PASS | Teknoloji   | tr     |
| T3-TR  | tr     | 55          | 1921          | tr- prefix          | PASS               | PASS            | PASS | Dünya       | tr     |
| T4-TR  | tr     | 52          | 1786          | tr- prefix          | PASS               | PASS            | PASS | Ekonomi     | tr     |
| T5-TR  | tr     | 56          | 1775          | tr- prefix          | PASS               | PASS            | PASS | Dünya       | tr     |
| T6-TR  | tr     | 60          | 1910          | tr- prefix          | PASS               | PASS            | PASS | Dünya       | tr     |
| T7-TR  | tr     | 54          | 1925          | tr- prefix          | PASS               | PASS            | PASS | Teknoloji   | tr     |
| T8-TR  | tr     | 50          | 1841          | tr- prefix          | PASS               | PASS            | PASS | Spor        | tr     |
| T1-RU  | ru     | 57          | 1910          | ru- prefix          | PASS               | PASS            | PASS | Политика    | ru     |
| T2-RU  | ru     | 58          | 2061          | ru- prefix          | PASS               | PASS            | PASS | Технологии  | ru     |
| T3-RU  | ru     | 53          | 1756          | ru- prefix          | PASS               | PASS            | PASS | Мир         | ru     |
| T4-RU  | ru     | 51          | 1900          | ru- prefix          | PASS               | PASS            | PASS | Экономика   | ru     |
| T5-RU  | ru     | 51          | 1915          | ru- prefix          | PASS               | PASS            | PASS | Мир         | ru     |
| T6-RU  | ru     | 54          | 1860          | ru- prefix          | PASS               | PASS            | PASS | Мир         | ru     |
| T7-RU  | ru     | 55          | 1951          | ru- prefix          | PASS               | PASS            | PASS | Технологии  | ru     |
| T8-RU  | ru     | 56          | 1827          | ru- prefix          | PASS               | PASS            | PASS | Спорт       | ru     |

### Notes

- **Title char counts:** AZ range 66–75 (target 50–75, valid). EN range 52–58 (target 50–60, valid). TR range 50–60 (target 50–60, valid, T6-TR at exactly 60 = upper bound). RU range 51–58 (target 50–60, valid).
- **Content char counts:** 1564–2061 (all within 1500–2500). Note writer-reported counts in AZ file were reported differently in the summary block vs in-line (e.g., `T1-AZ: 1820 char` vs summary `1679 char`); QA-B used a precise re.findall extraction and trusts the extracted value. All land comfortably in band.
- **Slug uniqueness vs existing 400:** verified with `grep -c "'<slug>':" src/data/news-articles.ts` for each of the 32 new keys — all returned 0.
- **Slug uniqueness within batch:** 32 unique slugs, no duplicates.
- **Categories:** All AZ/EN/TR/RU categories match the exact enum (case-sensitive including diacritics for AZ/TR and Cyrillic for RU).
- **locale field:** Every article's `locale` field matches its source file (az/en/tr/ru respectively).

---

## Verdict

**0 BLOCKING → APPROVE**

All 32 articles pass length, slug, date, category, and locale checks. The single MINOR note is a spec/codebase convention mismatch, not a writer defect. Safe to proceed to ingestion.
