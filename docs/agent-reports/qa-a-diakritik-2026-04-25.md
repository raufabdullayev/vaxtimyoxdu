# QA-A (Diakritik/Cyrillic) Report — 2026-04-25

## Summary
- AZ: 3 issues (0 BLOCKING, 3 MINOR)
- EN: 0 issues
- TR: 0 issues
- RU: 1 issue (0 BLOCKING, 1 MINOR)
- **Total BLOCKING: 0**
- **"həmcinsi" P0 check: PASS** (forbidden word NOT found in any AZ article content; only "həmçinin" and "habelə" used correctly)

## AZ Issues

### Issue 1 (MINOR) — Topic 2 (Mali), Line 50
**Location:** `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/docs/agent-reports/news-writer-output-az-2026-04-25.md` line 50
**Context:** "Aeroport bağlanıb, gediş və geliş reysləri ləğv edilib."
**Issue:** "geliş" missing diakritik. Standard Azerbaijani spelling is "gəliş" (with ə, not e).
**Suggested fix:** Replace "geliş" with "gəliş"

### Issue 2 (MINOR) — Topic 6 (Italy), Line 160
**Location:** Line 160
**Context:** "Prezident Sercio Mattarella Romada Vətən Səcdəgahında..."
**Issue:** "Sercio" is non-standard Azerbaijani transliteration of Italian name "Sergio". Standard transliterations would be "Sergio" (kept as-is) or "Serjio". The "c" letter in Azerbaijani is pronounced [dʒ] (like English "j"), so "Sercio" reads as "Serjio" — which is actually phonetically close. However, for proper noun consistency with Italian original, "Sergio" is preferred.
**Suggested fix:** Replace "Sercio" with "Sergio" (3 occurrences: lines 160, 164, 166 of full content; 1 unique location after deduplication)
**Note:** This is a stylistic choice, not a BLOCKING error. Some Azerbaijani sources do use "Sercio" for phonetic match.

### Issue 3 (MINOR) — Topic 2 (Mali), Lines 48 (twice)
**Location:** Line 48
**Context:** "general Assimi Goyitanın iqamətgahının..." and "Goyitanın hazırkı yeri məlum deyil"
**Issue:** "Goyita" is non-standard transliteration of "Goïta/Goita" (the Mali junta leader's name). EN file uses "Goita", TR uses "Goita", RU uses "Гойта". The added "y" in AZ is a phonetic insertion that isn't standard for this proper noun.
**Suggested fix:** Replace "Goyita" with "Goita" (consistent with other locales). This is a minor consistency issue, not orthographic.
**Note:** Acceptable as Azerbaijani phonetic transliteration; "Goyita" reads correctly in AZ phonology.

## EN Issues

No orthographic issues found.

**Verified:**
- All proper nouns spelled correctly (Trump, Powell — not present this batch, Witkoff, Kushner, Araghchi, Aliyev, Zelenskyy, Bamako, Kidal, Mattarella, Guardiola, Atatürk, etc.)
- Use of "Türkiye" alongside "Turkey" is intentional and follows current English-language editorial practice (UN-recognized name change)
- "Çanakkale" and "Atatürk" intentionally use Turkish diacritics (proper noun localization, standard practice in modern English)
- No accidental Cyrillic, Turkish ı, or Azerbaijani ə bleed-in
- Smart/straight quote consistency maintained (uses straight quotes throughout, consistent with rest of file)

## TR Issues

No orthographic issues found.

**Verified:**
- ı vs i distinction correct throughout (e.g., "İslamabad'da", "İran", "İslam", "Cumartesi" with correct case)
- ş, ç, ğ, ö, ü diacritics applied correctly
- No accidental Azerbaijani ə bleed-in
- Decimal comma used correctly: "91,6", "1,5 milyon" (Turkish convention)
- Time format uses period correctly: "06.00", "07.00", "17.00" (Turkish convention)
- Capital İ used correctly in "İstanbul" — actually "İslamabad", "İran", "İHA", "İlham", "İsrail", "İtalya"
- Proper nouns: "Sergio Mattarella" correct, "Çanakkale" correct, "Gelibolu" correct
- Numbers like "111'inci", "57'nci" use correct apostrophe-suffix Turkish style

## RU Issues

### Issue 1 (MINOR) — Topic 7 (Anzac Day), Line 161
**Location:** `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/docs/agent-reports/news-writer-output-ru-2026-04-25.md` line 161
**Context:** "...состоялась в рамках совместных американо-филиппинских учений «Балитакан 2026»."
**Issue:** "Балитакан" is a transposition typo. The correct exercise name is "Balikatan" (Tagalog: "shoulder-to-shoulder"). Russian transliteration should be "Баликатан" — order of "к" and "т" is swapped.
**Suggested fix:** Replace "Балитакан" with "Баликатан"
**Severity:** MINOR (proper noun typo; does not block publication but should be fixed)
**Cross-check:** EN/AZ/TR files all use correct "Balikatan" form.

**Other RU verifications (PASS):**
- All Cyrillic content; only intentional Latin retained for brand names (Fox News, Al Jazeera, AFP, Reuters, JNIM, ФЛА is correctly Cyrillic)
- ё usage is appropriate (e.g., "ещё", "Идёт", "пришёлся", "наёмников", "ёлки" not present)
- Proper transliterations: Trump→Трамп, Witkoff→Уиткофф, Kushner→Кушнер, Araghchi→Арагчи (acceptable variant; alternative "Аракчи" also used in some Russian sources), Aliyev→Алиев, Zelenskyy→Зеленский, Powell not present, Goita→Гойта, Mattarella→Маттарелла
- Decimal comma: "91,6%" correct
- Russian punctuation: «...» quotation marks used correctly, em-dashes properly used

## Verdict

**GO** — No BLOCKING issues. P0 "həmcinsi" check PASSES (forbidden word not present).

**Recommended fixes before publishing (optional, MINOR):**
1. AZ Topic 2 Line 50: "geliş" → "gəliş"
2. AZ Topic 6: "Sercio Mattarella" → "Sergio Mattarella" (3 occurrences in same article)
3. RU Topic 7 Line 161: "Балитакан" → "Баликатан"

These are minor orthographic and proper-noun consistency issues that do not block publication but should be addressed in next pass for editorial polish. AZ "Goyita" is acceptable phonetic transliteration; not flagged as a fix.

All 4 language outputs meet the orthographic quality bar for publication. The critical AZ P0 (forbidden word "həmcinsi") is clean — writer correctly used "həmçinin", "habelə", and "eyni zamanda" instead.
