# QA-A: Diacritic & Cyrillic Purity — 2026-04-24

**Auditor:** QA-A
**Scope:** 32 articles (8 topics x 4 locales)
**Files audited:**
- `news-writer-output-az-2026-04-24.md`
- `news-writer-output-en-2026-04-24.md`
- `news-writer-output-tr-2026-04-24.md`
- `news-writer-output-ru-2026-04-24.md`

## Summary

- **Verdict:** APPROVE_WITH_MINOR
- **BLOCKING issues:** 0
- **MINOR issues:** 7

**P0 bug ("həmcinsi" instead of "həmçinin"):** NOT reproduced. All 7 occurrences of the word in AZ articles are the correct form "həmçinin" / "Həmçinin". Session 29 P0 avoided.

---

## AZ findings

Diacritics (ə/ü/ö/ğ/ş/ç/ı/İ) are applied consistently across all 8 AZ articles. Proper noun capitalization (İstanbul, İran, Azərbaycan, İsrail) is correct. No Turkish drift detected. The "həmçinin" vs "həmcinsi" P0 check: PASSED — only the correct form "həmçinin" appears (lines 27, 56, 85, 108, 143, 166, 193, 201, 230).

### BLOCKING

- None.

### MINOR

- **[T3 AZ — Iran/Pakistan]** Line 81 (section heading) and line 83 (body): `"breyk"` and `"çatalaq"` used as "breakthrough" substitutes. "Çatalaq" is not a standard Azerbaijani word (appears to be a coined/malformed term); "breyk" is an informal English transliteration. Neither causes misreading, but should be replaced with "irəliləyiş" or "çıxış". Exact quotes:
  - `## Pakistan vasitəçilik edir, breykdən söz gedir`
  - `"çatalaq ehtimalının yüksək olduğunu" bildirirlər`
  - **Current:** `breyk`, `çatalaq` → **Expected:** `irəliləyiş` or `açılış` / `sazişə qədər qısa yol`

- **[T4 AZ — Japan inflation]** Line 114: `"sıyasi"` used instead of `"siyasi"` (ı/i typo — dotted `i` required in "siyasi/political"). Exact quote: `BOJ-un sıyasi yol xəritəsini çətinləşdirir`. **Current:** `sıyasi` → **Expected:** `siyasi`.

- **[T5 AZ — Israel/Lebanon]** Line 141: `"düşmənçi"` used as adjective for "hostile". Standard AZ form is `"düşmən"` (as adjective) or `"düşmənçilik"` (noun — enmity). Not strictly incorrect but non-standard. Exact quote: `"İsrailin davam edən düşmənçi hərəkətləri fonunda..."`. **Current:** `düşmənçi` → **Expected:** `düşmənlik dolu` / `düşmən mövqeli`.

## EN findings

Proper nouns (U.S., UN, WFP, NHL, AI) correctly capitalized throughout. Category is "Technology" (not "Tech") — Session 31 rule respected. Article usage (a/an/the) correct. No em-dash URL issues.

### BLOCKING

- None.

### MINOR

- None. The mention of "The Tech Portal and TechStartups" on line 225 is NOT a Session 31 violation — these are publication proper nouns (tech news sites), not generic "tech" instead of "technology".

## TR findings

Diacritics (ç/ğ/ı/İ/ö/ş/ü) applied consistently across all 8 TR articles. Turkish circumflex ("hikâye", "Başhâkimi", "güzergâhı", "kâğıt", "yapay zekâ") preserved. Vowel harmony respected. Proper noun capitalization (İstanbul not spelled, İsrail, Lübnan, Avrupa, İslamabad) correct.

### BLOCKING

- None.

### MINOR

- **[T3 TR — Iran/Pakistan]** Line 65: `"Tehran'ın"` — Turkish standard is `"Tahran'ın"`. Exact quote: `Ziyaret, Tehran'ın 22 Nisan'da açıkladığı ... tutumunun tam tersine dönüş anlamına geliyor.` **Current:** `Tehran'ın` → **Expected:** `Tahran'ın`.

- **[T6 TR — WFP/UN report]** Lines 149 and 161 (3 occurrences): `"humanitarian"` (English word) instead of Turkish `"insani"` / `"insancıl"`. Exact quotes:
  - Line 149: `humanitarian finansman daralması üçlüsünün`
  - Line 161: `mevcut humanitarian finansman düşüşü nedeniyle` and `son on yılın en ağır humanitarian krizini`
  - **Current:** `humanitarian` → **Expected:** `insani` (as in `insani yardım`, `insani kriz`)

- **[T8 TR — NHL]** Lines 205 and 217: `"Baku saati"` — Turkish standard form for Azerbaijan's capital is `"Bakü"`. Inconsistent because line 217 also contains the correct `"Bakülü okurlara"`. Exact quotes:
  - Line 205: `Baku saati ile maçlar Cumartesi sabahı 6 ile 9.30 arasında`
  - Line 217: `Maçlar Baku saati ile sabahın erken saatlerinde`
  - **Current:** `Baku saati` → **Expected:** `Bakü saati`

## RU findings

Cyrillic purity is strong across all 8 RU articles. Body text is well above 90% Cyrillic; all Latin tokens are within the allowed brand/product whitelist (Intel, Nasdaq, Tesla, SpaceX, xAI, Google, TSMC, OpenAI, GPT-5.5, ChatGPT, Codex, Anthropic, TPU, Citi, Brent, API, NHL team names, broadcast network names). No English paragraph labels ("Key Points:", "Summary:") found. Institutional abbreviations use Cyrillic forms (ФРС, ООН, ВПП, МИД, США, ЕС). Case agreement (склонение) correct throughout (Тегерана, Хезболлы, Пирро, Уорша, Пауэлла declined correctly).

### BLOCKING

- None.

### MINOR

- **[T8 RU — NHL]** Lines 198, 202, 206, 210: NHL team names (`Tampa Bay Lightning`, `Montreal Canadiens`, `Vegas Golden Knights`, `Utah Mammoth`, `Edmonton Oilers`, `Anaheim Ducks`) kept entirely in Latin. This is ALLOWED per brand-name carve-out, but the RU style guide permits Cyrillic transliteration (e.g., `"Тампа-Бэй Лайтнинг"`, `"Монреаль Канадиенс"`). Not a defect — flagged for future consistency discussion only. No change required for this batch.

---

## Verdict

**0 BLOCKING → APPROVE_WITH_MINOR**

All 32 articles pass the critical P0/diacritic gate:
- AZ: P0 "həmcinsi" bug NOT reproduced; diacritics preserved throughout.
- EN: Proper caps and Session 31 "Technology" rule honored.
- TR: Turkish diacritics and circumflex preserved; vowel harmony respected.
- RU: Cyrillic purity >90% in body text; only allowed brand/tech Latin tokens present; standard Russian institutional abbreviations used.

The 7 MINOR issues listed above are all cosmetic/stylistic (non-standard lexical choices, one English loanword, one ı/i typo, Bakü spelling). They do NOT prevent publication and can be fixed post-publication in a quick patch pass.

**Recommended post-publication fixes (not blocking):**
1. AZ T3: replace `breyk`/`çatalaq` with `irəliləyiş`/`açılış`
2. AZ T4: `sıyasi` → `siyasi`
3. AZ T5: `düşmənçi` → `düşmən`
4. TR T3: `Tehran'ın` → `Tahran'ın`
5. TR T6: `humanitarian` (x3) → `insani`
6. TR T8: `Baku saati` (x2) → `Bakü saati`
