# QA-A Diacritic/Cyrillic Purity Report — Session 32

**Generated:** 2026-04-21
**Scope:** 36 articles (AZ/EN/TR/RU × 9 each)
**Reviewer:** QA-A agent
**Files audited:**
- `docs/agent-reports/news-writer-output-az-2026-04-21-batch1.md`
- `docs/agent-reports/news-writer-output-en-2026-04-21-batch1.md`
- `docs/agent-reports/news-writer-output-tr-2026-04-21-batch1.md`
- `docs/agent-reports/news-writer-output-ru-2026-04-21-batch1.md`

## Summary

| Locale | Articles | BLOCKING | MINOR | Status |
|--------|----------|----------|-------|--------|
| AZ     | 9        | 0/9      | 0/9   | PASS   |
| EN     | 9        | 0/9      | 0/9   | PASS   |
| TR     | 9        | 0/9      | 2/9   | PASS   |
| RU     | 9        | 0/9      | 0/9   | PASS   |

---

## AZ Issues

### BLOCKING
(none)

### MINOR
(none)

**Observations:**
- Full diacritic coverage: ə, ü, ğ, ı, ö, ş, ç consistently used throughout all 9 articles.
- No "həmcinsi" or homosexual-sense typo detected (Session 29 lesson satisfied).
- "həmçinin" / "həmin" usage is correct (e.g. line 122: "NBA.com həmçinin qeyd etdi…", "həmin bazar günü").
- Proper names correctly diakritik: "İran", "Yaponiya", "Azərbaycan", "İvate", "Bolqarıstan", "Kolumbiya", "Kaliforniya".
- "Ceyd Di Vans" is an acceptable AZ transliteration of "JD Vance" (consistent with earlier batches).
- Transliterated NBA names ("Seltiks", "Tander", "Seyson Teytum", "Ceylen Braun", "Şey Gilgeus-Aleksander", "Jalen Uilyams", "Tayriz Maksey") are internally consistent. Not flagged (these are transliteration style, not diacritic errors).
- No TR/RU leakage (no "deprem", "ekonomi", "kültür" in AZ text).
- No ASCII-fallback content body words (slug keys are legitimately ASCII-normalized by convention).

---

## EN Issues

### BLOCKING
(none)

### MINOR
(none)

**Observations:**
- Standard English orthography throughout.
- Apostrophes consistently straight ASCII `'` (90 occurrences) — no mixed straight/curly quotes.
- Double quotes consistently straight ASCII `"` — no smart quote leakage.
- Only non-ASCII characters are em-dash `—` (6) and en-dash `–` (1), both valid English punctuation.
- Proper names all correctly spelled: Jayson Tatum, Shai Gilgeous-Alexander, Karol G, J Balvin, Sabrina Carpenter, JD Vance, Rumen Radev, Touska, Anthropic, Trainium, Graviton, Coachella, Tropicoqueta, Tohoku (latin romanization, no macron — fine for US English journalism).
- No semantic-changing typos (there/their/they're, its/it's, loose/lose) detected.

---

## TR Issues

### BLOCKING
(none)

### MINOR

1. **Slug: `tr-japonya-iwate-7-7-deprem-megadeprem-uyarisi-20-nisan` (line 33)**
   - Quote: `"JMA prevalan rakam olarak 7,7 büyüklüğünü kaydetti"`
   - Problem: "prevalan" is not standard Turkish. Likely calque from English "prevalent" / Italian "prevalente".
   - Recommended fix: "JMA ise öne çıkan rakam olarak 7,7 büyüklüğünü kaydetti" or "JMA, hakim değer olarak 7,7 büyüklüğünü kaydetti".
   - Severity: MINOR — word choice awkwardness, does not break semantic meaning nor indicate category/AZ leakage.

2. **Slug: `tr-coachella-2026-karol-g-ilk-latina-headliner-19-nisan` (line 156)**
   - Quote: `"küresel bir turne duyurdusunu festival sahnesinden yaptı"`
   - Problem: "duyurdusunu" is an incorrect noun form. Standard Turkish is "duyurusunu" (from "duyuru" = announcement) or alternatively rephrase as "küresel bir turne duyurusunu/anonsunu festival sahnesinden yaptı" / "küresel bir turneyi duyurdu".
   - Recommended fix: Replace with "duyurusunu" or restructure as "…turneyi festival sahnesinden duyurdu".
   - Severity: MINOR — grammatical typo, reader still understands meaning.

**Observations:**
- ı/i distinction is correctly maintained: "İran", "İslamabad", "İwate" use capital İ; "istanbul" is not present but "Indio" is used as English proper name.
- Diacritics ğ, ü, ş, ç, ö all correct and consistent.
- No AZ category leakage: "Spor" (not "İdman"), "Kültür" (not "Mədəniyyət"), "Ekonomi" (not "İqtisadiyyat"), "Dünya" (shared with AZ but is correct TR spelling), "İş" (business).
- Proper names correctly TR-ified: "Bulgaristan", "Japonya", "Gazze", "Tokyo", "Coachella", "Medellín". "Tōhoku" keeps macron (acceptable Japanese romanization for precision).
- No "deprem" → "zəlzələ" reverse leakage; "deprem" is the correct Turkish word for earthquake.

---

## RU Issues

### BLOCKING
(none)

### MINOR
(none)

**Observations:**
- 100% Cyrillic purity in content body. Mixed-script word audit: **0 words** contain both Cyrillic and Latin letters.
- All Latin-only tokens in RU content are proper names (Amazon, Anthropic, AWS, Claude, Trainium, Graviton, Brent, WTI, Karol G, J Balvin, Sabrina Carpenter, Justin Bieber, Peso Pluma, Becky G, Ryan Castro, Tropicoqueta, Coachella, Empire Polo Club, USS Spruance, Al Jazeera, CNN, CNBC, NBC News, NPR, Rolling Stone, Complex, Billboard, ESPN, UN News, Bloomberg, CP24, France 24, MSN, Yahoo Sports, NBA.com, Balkan Insight, Engadget, GeekWire, Rappler, Scientific American, Japan Times, Timeout LA, Art Threat, Common Dreams, Investing, basketnews.com, Anchorage Daily News, 76ers, OpenAI, JMA, RDNA, WEO, ARM, GMT) or numerics. Acceptable per spec.
- Transliteration of JD Vance as "Джей Ди Вэнс" / short form "Вэнс" is consistent throughout — no mixed forms.
- Quotation marks use «» (45 pairs) for Russian convention, with ASCII `"` only around English-language titles ("Tropicoqueta") — acceptable dual convention.
- Proper use of Ё/ё (28 occurrences): "всё", "её", "ещё", "пошёл", "возобновлять", etc.
- Apostrophe-less Russian text throughout — no accidental Latin apostrophes in Cyrillic words.
- No confusable (visually similar but Latin) characters detected inside Cyrillic words via audit script.

---

## Overall verdict

- **Total BLOCKING:** 0
- **Total MINOR:** 2 (both TR)
- **Status:** PASS

Zero blocking issues across all 4 locales. Two minor TR typos ("prevalan", "duyurdusunu") identified — neither is a category/locale-leakage issue, neither is a critical ı/i confusion, neither semantically inverts meaning. These can ship as-is or be polished in a follow-up copyedit pass; they do not block integration.

Session 29 "həmcinsi" class of semantic-destroying diakritik bugs: **not found** in AZ batch1. AZ, EN, RU are clean. TR is clean on all category/locale/diacritic axes with only 2 word-choice imperfections.

**Recommendation:** PROCEED to integration. Optionally queue the 2 TR minor fixes for the next writer-polish cycle.
