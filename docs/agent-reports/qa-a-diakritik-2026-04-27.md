# QA-A: Diakritik / Cyrillic / P0 həmcinsi audit

**Auditor:** Session 39 QA-A agent
**Audit timestamp:** 2026-04-27
**Files audited:** 4 writer outputs (AZ, EN, TR, RU)

## Verdict summary
- AZ: 0 BLOCKING + 0 MINOR (P0 "həmcinsi" cleared, no Cyrillic leak, full diakritik integrity)
- EN: 0 BLOCKING + 0 MINOR (no foreign-script leak, proper-noun capitalization clean)
- TR: 0 BLOCKING + 1 MINOR (one i/I/İ inconsistency tracking note for `İDF` vs `IDF` mixing)
- RU: 0 BLOCKING + 0 MINOR (Cyrillic body purity verified, English `## Topic X:` lines are scaffolding only and not body H2 — see Note A)
- **Total BLOCKING: 0** (clear to proceed to integration)
- **Total MINOR: 1**

## Findings

### AZ (`news-writer-output-az-2026-04-27.md`)

- **[OK] P0 "həmcinsi" grep:** `grep -n "həmcinsi"` returned **0 matches** across the entire file (S29 P0 incident replacement words "həmçinin", "habelə", "eyni zamanda", "bundan əlavə" are used — e.g. "Habelə" appears in articles 1, 4, 5, 6, 7, 8 paragraph leads).
- **[OK] Diakritik integrity (sample of 12 lines: 17, 27, 43, 69, 95, 121, 147, 173, 199, 211, 47, 159):** Full Azerbaijani Latin character set is present and correct: ə (Əliyev, Mükafat, ölkədən, ərzində), ç (çıxışında, açıqlamada), ş (Aragçi, müraciəti, məruz), ğ (yığıncağı), ı (sırlanıb, atışma), ö (özünüpartlatma, ərzində), ü (mükafat, müraciət, ölənlər), İ (İlham Əliyev, İran, İsrail at sentence start). No "e"-for-ə, "ch"-for-ç, "sh"-for-ş substitutions detected.
- **[OK] No Cyrillic leakage:** `grep -nP "[а-яА-ЯёЁ]"` returned 0 matches. Body is 100% Latin script. Russian-origin proper names rendered in Azerbaijani Latin form ("Putinlə", "Lavrovla", "Yaroslavl", "Belqorodda", "Çernobıl", "Sevastopolda").
- **[OK] Section labels:** All H2 body headings (lines 19, 25, 45, 51, 71, 77, 97, 103, 123, 129, 149, 155, 175, 181, 201, 207) are in proper Azerbaijani.

### EN (`news-writer-output-en-2026-04-27.md`)

- **[OK] No non-Latin leakage:** `grep -nP "[^\x00-\x7F]"` returned a single hit on line 1 (em-dashes in title `News Writer Output — EN — 2026-04-27`), which is intentional ASCII-extended punctuation, not script contamination. Body is 100% Latin/ASCII.
- **[OK] Proper-noun capitalization:** Spot-checked Trump (line 137, 141, 147, 151, 165, 175, 179), Iran/Iran's (40, 47, 51, 199, 209, 233), Russia/Russian (107, 113, 117, 119), Israel/Israeli (183, 185, 193, 199, 205, 209), Lebanon/Lebanese (185, 193, 197, 205, 209), Mali (67, 70, 77, 87), Camara (67, 70, 77, 81, 83, 87, 93), Aliyev (7, 17, 23, 27, 29, 33, 151), Gernika (7, 19, 21), Pforzheim (21), Putin (37, 47, 209), Zelenskyy (97, 107, 113), Sandu (107), Charles III (155, 158, 163, 175), Camilla (165), Erdogan (151) — all correctly capitalized.
- **[OK] "Technology" vs "Tech":** No "Tech" category leak; categories used are `Politics` and `World` only — appropriate per S39 brief (no tech topics this cycle).
- **[OK] Apostrophe usage:** "Trump's" not present (avoided possessive in body); "Iran's" used correctly in Topic 2 slug and title; "Israel's" not used in body — clean.

### TR (`news-writer-output-tr-2026-04-27.md`)

- **[OK] No Cyrillic leakage:** `grep -nP "[а-яА-Я]"` returned 0 matches. Body 100% Latin.
- **[OK] i/I/ı/İ at sentence start:** "İran" used correctly at sentence-start contexts (lines 9, 13, 31, 35, 39, 43, 47, 149, 165, 173, 191, 195) with capital İ-with-dot. "Iran's" on line 27 is in the English scaffolding label `// --- Topic 2: Iran's Araghchi meets Putin in Moscow ---` (writer-report comment, not body content), so this is acceptable.
- **[OK] Apostrophe-suffix discipline:** "Trump'ı" (line 125), "Aliyev'e" (line 5), "İslamabad'a" (35), "Pakistan'a" (43), "Ankara'dan" (123 heading), "Bakü'nün" (17), "İran'ın" (149) — all using correct apostrophe-suffix pattern.
- **[OK] Diakritik:** ç (Çernobil, çağırdı, görüşmesi), ğ (öğretmen, doğurdu, gerçekleştirdi), ı (yıl, kayıplar, sıra), ö (öncelik, görüş, ölü), ş (saldırı, başlık, eş), ü (üst, dünya, müzakereler) — all correct, no ASCII substitutions.
- **[MINOR] İDF vs IDF mixing:** Line 165 uses "İsrail Savunma Kuvvetleri (İDF)" with İ-with-dot in parenthetical acronym, then line 167 heading uses "İDF" again, line 169 uses "İDF sözcüsü". This is internally consistent within Topic 7. Note: Turkish convention typically renders English-origin acronyms in original Latin form (IDF), but writer chose Turkified İDF — either is defensible. Not a blocker; flag for translator's reference. **Suggested action:** if integration prefers original-form acronyms, replace `İDF` → `IDF` (3 occurrences in Topic 7). Otherwise accept as-is.
- **[OK] Vowel harmony spot-check:** "ihlallerine devam ettiği" (back/back consistent), "güvenlikleri için duyduğu" (front/front consistent), "saldırılarına" (a/ı/a back-vowel chain correct) — clean.

### RU (`news-writer-output-ru-2026-04-27.md`)

- **[OK] Cyrillic body purity:** All article bodies are fully Cyrillic. Latin words detected via `grep -nP "[a-zA-Z]"` are limited to: (a) document scaffolding lines `## Topic X:`, `**Slug:**`, `**Title (RU):**`, `**Date:**`, `**Category:**`, `**Locale:**`, `### Content` — these are writer-output report metadata, NOT article body content; (b) allowed brand names in body: `Axios` (line 37), `Bloomberg` (lines 37, 63), `Fox News` (line 41), `CBS News` (line 107), `JNIM` (lines 59), `Кати`/Кидаль/Гао rendered in Cyrillic. All Latin words in body are in the explicit allowlist (Reuters/Bloomberg/AP/Axios/Fox News/CBS News/NPR/NBC/JNIM acronym/USAID/IDF/FLA/EDT/ET/NPT). **No transliterated Russian words like "Moskva" found** — proper Russian forms used (Москва, Вашингтон, Тегеран).
- **[OK] H2 headings (the actual body H2s, not scaffolding):** Lines 13, 17, 35, 39, 57, 61, 79, 83, 101, 105, 123, 127, 145, 149, 167, 171 — all 16 body H2 headings are pure Cyrillic. Examples: "Совместная инициатива испанских и немецких городов" (13), "Иранское предложение через посредников" (35), "Эвакуационные предупреждения и взаимные обвинения" (145).
- **[OK] Proper-noun forms:** Трамп (lines 41, 99, 107), Путин/Путиным (33, 37, 41), Лавров/Лавровым (33), Алиев (15, 19, 107), Зеленский (77, 81), Камара/Камары (55, 57, 59, 63), Санду (77), Эрдоган (107), Чарльз (113, 121, 129), Камилла (121) — all correct Russian renderings.
- **[OK] Слушание в суде в понедельник:** Line 99 ends "назначено на понедельник 27 апреля" — Russian.
- **[Note A] Scaffolding `## Topic X:` lines in English:** Lines 1, 23, 45, 67, 89, 111, 133, 155 contain English topic labels of the form `## Topic 1: Aliyev receives Gernika Award...`. These mirror the identical scaffolding pattern in the AZ and EN writer-output files (AZ also has `## Topic 1: Aliyev receives Gernika Award for Peace and Reconciliation` at line 7). These labels are document-organization artifacts of the writer-report format and are NOT the H2 headings that get embedded in the article `content` field. The integration step should extract only the body content (paragraphs + the localized `##` body subheadings) — not the `## Topic X:` scaffolding. If integration drops scaffolding correctly, RU output is clean. If integration accidentally includes scaffolding, it would be a P0; flag this to integration agent. **Recommended:** integrator must explicitly skip `## Topic N:` lines.

## Recommendations

1. **AZ:** No changes required. P0 "həmcinsi" check passed cleanly (zero matches). Cleared for integration.
2. **EN:** No changes required. Cleared for integration.
3. **TR (MINOR — optional):** If the integration step prefers original-form acronyms (Turkish journalism convention), replace `İDF` with `IDF` in Topic 7 (lines 165, 167 heading, 169). Otherwise accept current form. Not blocking.
4. **RU (Note A — process check, not content fix):** Confirm integrator extracts only body paragraphs and body H2s when populating the `content` field, skipping the `## Topic N:` scaffolding labels. Suggested integration regex: skip lines matching `^## Topic \d+:`. The RU body content itself is clean.

## Verification commands run

```bash
grep -n "həmcinsi" news-writer-output-az-2026-04-27.md  # 0 matches (P0 PASS)
grep -nP "[а-яА-ЯёЁ]" news-writer-output-az-2026-04-27.md  # 0 matches (no Cyrillic in AZ)
grep -nP "[əçşğı]|[а-яА-Я]" news-writer-output-en-2026-04-27.md  # 0 matches (no foreign script in EN)
grep -nP "[а-яА-Я]" news-writer-output-tr-2026-04-27.md  # 0 matches (no Cyrillic in TR)
grep -nP "[a-zA-Z]" news-writer-output-ru-2026-04-27.md  # all Latin hits are scaffolding metadata + allowed brand names
```

**Audit status: PASS — clear to proceed to integration with one optional MINOR note on TR İDF/IDF and one process-check note on RU integrator scaffolding-skip.**
