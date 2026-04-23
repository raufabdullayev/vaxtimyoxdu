# QA-A Report — Diakritik/Cyrillic Purity — Batch 2 — 2026-04-23

## Summary
- AZ: 0 BLOCKING, 2 MINOR
- EN: 0 BLOCKING, 0 MINOR
- TR: 0 BLOCKING, 1 MINOR
- RU: 0 BLOCKING, 2 MINOR
- **Total: 0 BLOCKING, 5 MINOR**

Scope: 8 topics per language (32 articles total). Topics cover Pope Leo XIV / Malabo Mass, Russian drone strike on Dnipro, Ukraine drones hit Gorky / Nizhny Novgorod, EU 20th sanctions package / Ukraine loan, American Express Q1 2026, Honeywell Q1 2026 / HONA spin-off, American Airlines Q1 2026 / fuel loss, Dallas Stars vs Minnesota Wild 2OT playoff game.

---

## AZ Findings

### BLOCKING
- None. All Azerbaijani diacritics (ə, ü, ö, ğ, ş, ç, ı, İ) preserved throughout 8 articles. No ASCII fallback ("hem", "ucun", "olunir", "sirket" etc.) detected. **S29 P0 bug AVOIDED:** "həmçinin" is used correctly in T2, T5, T6 — never confused with "həmcinsi" (homosexual). Grep on "həmcinsi" returns zero matches. Verb forms consistent.

### MINOR
- **Topic 1 (Papa Leo XIV Malabo), content:** "ata Fortunato Nsue Esono Ayíambeng-in" — contains "í" (i with acute accent), which is not part of the Azerbaijani alphabet. This is a preservation of Spanish/Equatorial Guinea orthography (original name spelled "Ayíambeng" in Spanish sources). Acceptable proper-noun fidelity, but inconsistent with the EN ("Ayiambeng") and TR ("Ayiambeng") versions. Stylistic.
- **Topic 1 (Papa Leo XIV), content:** "dördölkəli səfərinin" — compound form. The more standard Azerbaijani would be "dörd ölkəli" (separated) or "dörd-ölkəli" (hyphenated). Both forms are accepted in modern orthography. Minor stylistic.

---

## EN Findings

### BLOCKING
- None.

### MINOR
- None. All required proper nouns correctly capitalized and spelled: **Leo XIV** (T1), **Malabo** (T1), **Dnipro** (T2), **Gorky** (T3), **Nizhny Novgorod** (T3), **Transneft** (T3), **SBU** (T3), **Honeywell** (T6), **HONA** / **Nasdaq** (T6), **Dallas Stars** (T8), **American Airlines** (T7), **Southwest Airlines** (T7), **United Airlines** (T7), **Wyatt Johnston**, **Miro Heiskanen**, **Mikko Rantanen**, **Jason Robertson**, **Matt Duchene**, **Matt Boldy**, **Jesper Wallstedt** (T8), **Fortunato Nsue Esono Ayiambeng** (T1), **Kyiv Independent**, **Ukrainska Pravda**, **Glavnoe**, **RBC Ukraine**, **AP**, **AFP**, **Vatican News**, **Catholic World Report**, **Militarnyi**, **The New Voice of Ukraine**, **StockStory**, **TipRanks**, **Meyka**, **StockTitan**, **CNBC**, **GuruFocus**, **Quiver Quantitative**, **Centurion Lounges**, **Graphite Business Cash Unlimited Card**, **NFL**, **NBA**, **The Washington Post**, **Fox Sports**, **KSAT**, **Local10**. Subject-verb agreement clean. No typos detected. "Odesa" (T2) is the current Ukrainian-aligned transliteration — correct. "Druzhba" (T4) used for pipeline — correct. "Brussels" implied, consistent usage.

---

## TR Findings

### BLOCKING
- None. Turkish diacritics (ç, ğ, ı, İ, ö, ş, ü) consistently preserved in all 8 articles. Vowel harmony correct. **No S32 bugs:** grep on "prevalan", "duyurdusunu", "Volodımır Zelenskıy" returns zero matches. "duyurdu" appears in T6 (Honeywell) but this is the correct standard Turkish verb "announced" — NOT the S32 "duyurdusunu" error. Capitalization (İstanbul, İran, İsa, İsrail) correct. No Volodymyr Zelensky mentions in batch 2 (this topic not included), so that risk surface is absent.

### MINOR
- **Topic 7 (American Airlines), content:** "öldürücü etki yarattı" — the word "öldürücü" (deadly/lethal) is stylistically strong for describing an economic effect on an industry; a more neutral Turkish choice would be "ezici" (crushing) or "ağır" (heavy). Reads as slightly over-dramatic but not incorrect. Stylistic only.

---

## RU Findings

### BLOCKING
- None. Cyrillic purity maintained throughout all 8 articles. Latin characters only appear in acceptable brand/abbreviation exceptions:
  - **Brands/tickers:** American Express, Amex, Honeywell, HONA, American Airlines (AAL), Southwest, United Airlines, Dallas Stars, Minnesota Wild, Nasdaq, Brent, LNG, NFL, NBA, Graphite Business Cash Unlimited, Centurion, Aerospace Technologies, Building Automation, Industrial Automation, Process Automation and Technology.
  - **Abbreviations/acronyms:** SBU, NHL, GAAP, non-GAAP, EPS, OT (2OT).
  - All usages conform to standard Russian press convention (sports team names and U.S. corporate identifiers commonly kept in original Latin form). No Latin A/B/C/D paragraph labels. No stray Latin words used as Russian prose.

### MINOR
- **Topic 5 (Amex Q1 2026), heading line 111:** Topic-key string is accidentally duplicated in the markdown heading: `## Topic 5: ru-american-express-q1-2026-vyruchka-18-9-mlrd-pribyl-3-mlrd ru-american-express-q1-2026-vyruchka-18-9-mlrd-pribyl-3-mlrd`. This is a QA-report formatting artifact in the markdown, **not** inside the article content or the TS key. Does not affect the generated article; cosmetic only.
- **Topic 6 (Honeywell), content:** "Honeywell подтвердил" — gender/agreement of company name treated as masculine. Russian press commonly uses neutral ("компания Honeywell подтвердила") or simply masc. ("Honeywell подтвердил"); both accepted. Consistent within article. Stylistic.

---

## Verdict
- **0 BLOCKING** = APPROVE

All 32 batch-2 articles pass diacritic / Cyrillic purity checks. Azerbaijani preserves ə/ü/ö/ğ/ş/ç/ı/İ with 100% consistency — no ASCII fallback, no "həmcinsi" S29 P0 bug (verified by grep). English has no spelling or capitalization errors; all required proper nouns (Leo XIV, Malabo, Dnipro, Gorky, Nizhny Novgorod, Transneft, SBU, AmEx-adjacent, Honeywell, Dallas Stars) are correctly rendered. Turkish shows clean dotted-İ convention, correct vowel harmony, zero S32 bugs (prevalan / duyurdusunu / Volodımır Zelenskıy all absent). Russian maintains Cyrillic purity with Latin limited to brands and sports team names per standard convention; no Latin paragraph labels. The 5 minor items are stylistic or formatting-only and do not affect meaning or readability.

QA-A Batch 2 bitdi. 0 BLOCKING, 5 MINOR. Verdict: APPROVE
