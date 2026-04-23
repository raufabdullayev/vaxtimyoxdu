# QA-A Report — Diakritik/Cyrillic Purity — 2026-04-23

## Summary
- AZ: 0 BLOCKING, 3 MINOR
- EN: 0 BLOCKING, 0 MINOR
- TR: 0 BLOCKING, 2 MINOR
- RU: 0 BLOCKING, 3 MINOR
- **Total: 0 BLOCKING, 8 MINOR**

---

## AZ Findings

### BLOCKING
- None. Azerbaijani diacritics (ə, ü, ö, ğ, ş, ç, ı, İ) are consistently preserved throughout all 10 topics. No ASCII fallback issues found. No "həmcinsi/həmçinin" confusion (Session 29 P0 bug avoided). No instances of "hem", "ucun", "olunır" typos.

### MINOR
- **Topic 2 (ABŞ birjaları rekord), content:** "Rallinin başlıca hərəkətverici qüvvəsi — Trampın İran atəşkəsini qeyri-müəyyən uzatması olub." — Stylistic: "hərəkətverici" could be written "hərəkət verici" (separated), but both forms are acceptable in modern Azerbaijani. Keep.
- **Topic 7 (NBA pley-off), content:** "Şai Gilgus-Aleksandr" — brand/name transliteration: correct Azerbaijani would be "Şai Gilgeous-Aleksandr" or leave as English "Shai Gilgeous-Alexander". Current "Gilgus" is a shortened transliteration. Minor stylistic inconsistency, not blocking.
- **Topic 7 (NBA pley-off), content:** "Crü Holidey" — transliteration of "Jrue Holiday". The form "Crü" is unusual in Azerbaijani (typically would be "Cru" or keep original "Jrue"). Minor.

---

## EN Findings

### BLOCKING
- None.

### MINOR
- None. All brand names correctly capitalized (Google Cloud Next, IRGC, TPU, Ironwood, Gemini Enterprise, Wembanyama, Gilgeous-Alexander, Kelly Ortberg, Narendra Modi, Volodymyr Zelensky, Esmail Baghaei, JD Vance, Jrue Holiday, Scoot Henderson, Dillon Brooks, Devin Booker, Jalen Green, Jalen Williams, Chet Holmgren, Vaibhav Taneja). Article usage correct throughout. Subject-verb agreement clean. No typos detected. "Technology" used (not "Tech") per Session 31 rule.

---

## TR Findings

### BLOCKING
- None. Turkish diacritics (ç, ğ, ı, İ, ö, ş, ü) consistently preserved. Vowel harmony correct in verb endings. "İstanbul" / "İran" / "İsrail" all correctly capitalized. No S32 word-choice bugs ("prevalan", "duyurdusunu") found.

### MINOR
- **Topic 10 (Rusya Odessa), content:** "Volodımır Zelenskıy" — Turkish transliteration of Ukrainian name. Standard Turkish press convention uses "Volodymyr Zelenskiy" or "Volodimir Zelenski". The form "Volodımır Zelenskıy" with dotless ı is unusual but not strictly wrong for Turkish phonetic adaptation. Minor stylistic.
- **Topic 7 (NBA play-off), content:** "Shai Gilgeous-Alexander" is used in English form while other NBA names are also in English form — consistent. "Scoot Henderson", "Jrue Holiday" preserved in English. Consistent treatment is fine.

---

## RU Findings

### BLOCKING
- None. Cyrillic purity is maintained throughout. Latin characters appear only in allowed brand names (Google, TechCrunch, Bloomberg, OpenAI, Anthropic, Nvidia, Vera Rubin, Tesla, IBM, Boeing, NBA, Portland Trail Blazers, San Antonio Spurs, Oklahoma City Thunder, Phoenix Suns, Detroit Pistons, Orlando Magic, Al Jazeera, Al Akhbar, Kyiv Independent, PBS NewsHour, CNN, CNBC, IRGC, MAX, GAAP, SRAM, HBM3e, TPU, Gemini Enterprise, The Resistance Front, Lashkar-e-Taiba, X) — all acceptable brand/abbreviation exceptions. No Latin A/B/C/D paragraph labels. Grammatical cases (nominative/genitive/dative) correctly applied. Verb aspects consistent.

### MINOR
- **Topic 7 (Плей-офф NBA), content:** Team names "Portland Trail Blazers", "San Antonio Spurs", "Oklahoma City Thunder", "Phoenix Suns", "Detroit Pistons", "Orlando Magic" kept in Latin — this is acceptable brand exception but Russian press sometimes transliterates ("Портленд Трэйл Блэйзерс"). Both conventions are valid; keep as-is.
- **Topic 5 (Журналистка Амаль Халиль), content:** "Al Akhbar" kept in Latin in body; could be "Аль-Ахбар" in strict Russian press style. Acceptable brand convention.
- **Topic 1 (Иран захватил), content:** "IRGC" Latin abbreviation used — acceptable since it's an acronym, but Russian press commonly uses "КСИР" (Корпус стражей исламской революции). The article does expand it once as "Корпус стражей исламской революции (IRGC)" which is a proper introduction. Minor stylistic.

---

## Verdict
- **0 BLOCKING** = APPROVE

All 40 articles pass diacritic/Cyrillic purity checks. Azerbaijani preserves ə/ü/ö/ğ/ş/ç/ı/İ throughout. English has no typos and proper nouns are correctly capitalized. Turkish vowel harmony and dotted-İ conventions are followed. Russian maintains Cyrillic purity with only justified Latin brand names. No critical meaning errors (e.g., həmcinsi/həmçinin mix-up), no Cyrillic-Latin paragraph labels, no diacritic stripping. The 8 minor items are stylistic transliteration variants that do not affect meaning or reading quality.
