# QA-A Diacritic/Cyrillic Report — 2026-04-19 Batch 1

Auditor: QA-A
Files audited: 4 (AZ, EN, TR, RU news-writer outputs for batch 1, 2026-04-19)
Scope: diacritic purity, script purity (no cross-script leakage), ASCII fallback detection, brand-name check, mixed-script lookalike check.

## Summary
- BLOCKING issues: 0
- Minor issues: 0

Result: CLEAN across all four locales. No diacritic, Cyrillic, or Latin leakage issues detected. No `həmcinsi` trap triggered. No `Vaxtim Yoxdu` brand-name misspelling. No mixed-script (Cyrillic-Latin lookalike) words. All ASCII-only tokens that matched common fallback patterns were confined to URL slugs (where ASCII is intentional), not article body text.

## AZ file
File: `news-writer-output-az-2026-04-19-batch1.md` (5 articles)

Checks performed:
- Cyrillic range U+0400-U+04FF scan: **no matches** in body text. Russian/Ukrainian proper names correctly transliterated (`Vitali Kliçko`, `Volodımır Zelenski`, `Ruslan Kravçenko`, `İhor Klımenko`, `Vikram Misri`).
- ASCII fallback word list (`xeber`, `boyuk`, `kucuk`, `isci`, `ucun`, `Dunya`, `Turkiye`, `yuzde`, `sehid`, `Azerbaycan`, `olcu`, `gunu`, and case-insensitive variants): **no matches** in body text.
- `həmcinsi` (homosexual) vs `həmçinin` (also) trap: `həmçinin` is used correctly at line 39 ("Həmçinin küçədə dörd nəfəri qətlə yetirdi"). No `həmcinsi` anywhere. **Pass.**
- Brand name `Vaxtim Yoxdu` / `Vaxtım Yoxdu`: brand not mentioned in any of the 5 articles. Not applicable. **Pass.**
- TR-shared diacritics (`ş`, `ğ`, `ü`, `ö`, `ç`, `ı`): all used correctly in AZ context.
- AZ-specific `ə` usage: present and consistent throughout (`İnqilab`, `mərmi`, `gəmiləri`, `şənbə`, `bəyanatında`, `mərkəzində` etc.).

No issues to flag.

## EN file
File: `news-writer-output-en-2026-04-19-batch1.md` (5 articles)

Checks performed:
- Cyrillic range U+0400-U+04FF scan: **no matches**.
- AZ `ə` leakage scan: **no matches**.
- TR `ı`/`İ` leakage scan: **no matches** in body. Proper names use Latin equivalents (`Ihor Klymenko`, `Volodymyr Zelenskyy`, `Vitali Klitschko`) — correct Ukrainian/English transliterations, not TR forms.
- Accepted diacritics in use:
  - `Jokić` (line 54, 58) — Serbian proper name, accept per spec.
  - `Stéphane` (line 83) — French first name of Moderna CEO Bancel, accept per spec.
- `£` currency symbol (line 96) — used correctly for British pounds.
- Other potential Latin-diacritic leakage (`à`, `ñ`, `õ`, etc.) — **no matches**.

No issues to flag.

## TR file
File: `news-writer-output-tr-2026-04-19-batch1.md` (5 articles)

Checks performed:
- AZ `ə` leakage scan: **no matches**. (Critical check — Turkish does not use `ə`.)
- Cyrillic range U+0400-U+04FF scan: **no matches**.
- Turkish ASCII fallback word list (`sehid`, `olu`, `ozel`, `dort`, `kucuk`, `buyuk`, `uzerine`, `yuzde`, `gunu`, etc.): matches found only in URL slug identifiers on lines 8, 25, 42, 59, 76 (e.g., `tr-kiev-silahli-saldiri-6-olu-sbu-terorizm-sinifladi`, `tr-nba-playoffs-1-tur-oyun-1-ev-sahipleri-dort-dortluk`). Slugs are intentionally ASCII-only for URL routing; body text is fully diacritic'd. **No body-text fallback matches. Pass.**
- Turkish circumflex check: `kâr`/`hikâye`/`zekâ` class — found `zekâ` (line 72) and `Hikâyesi`/`hikâyesine` (lines 83, 89). Both are contextually correct Turkish usage (circumflex on `â` here marks long vowel/Arabic-origin word). **Pass.**
- Accepted diacritics in use: `Jokić` (line 53, 55) and `Stéphane` (line 72) — foreign proper names, acceptable in TR.
- TR-specific diacritics (`ş`, `ğ`, `ü`, `ö`, `ç`, `ı`, `İ`) used correctly throughout (`Müzayede`, `Açık`, `İstihlatlı`, `şunları`, `söyledi`, `üretti`, etc.).

No issues to flag.

## RU file
File: `news-writer-output-ru-2026-04-19-batch1.md` (5 articles)

Checks performed:
- Latin-in-title scan: 2 titles contain Latin tokens, both justified brand names:
  - Line 47: `'NBA плей-офф: в игре 1 победили все хозяева'` — `NBA` is allowed brand per spec.
  - Line 68: `'OpenAI представила GPT-Rosalind для биологии и лекарств'` — `OpenAI`, `GPT-Rosalind` are allowed brand/product names per spec.
  - Lines 5, 26, 89: all-Cyrillic titles. **Pass.**
- Latin-in-body scan: all Latin tokens in body are legitimate brand/proper names:
  - `NBA`, `NBA.com`, `ESPN` (article 3, line 59)
  - `OpenAI`, `GPT-Rosalind`, `Amgen`, `Moderna`, `Allen Institute`, `Thermo Fisher Scientific`, `Novo Nordisk`, `Alphabet`, `DeepMind` (article 4, lines 72, 76, 80, 84)
  - `Henry Aldridge & Son` (article 5, line 93)
  - All match the task's allow-list for Latin-script proper nouns/brands in Russian body text. **Pass.**
- Mixed-script (Cyrillic-Latin lookalike) scan using regex `[А-Яа-яЁё][A-Za-z]|[A-Za-z][А-Яа-яЁё]`: **no matches**. No `Тrump`-style script-mixing bugs.
- AZ/TR diacritic leakage (`ə`, `ı`, `ş`, `ğ`, `ü`, `ö`, `ç`): **no matches**. Cyrillic transliterations used correctly (`Альтман`, `Бансел`, `Розалинд`, `Лора Мэйбл Франкателли`, `Люси Дафф Гордон`, `Космо`, `Эндрю Олдридж`, `Девизес`, `Викрам Мисри`, `Голосеевском`, `Клименко`, `Кравченко`).

No issues to flag.

## Cross-file sanity
- `Jokić` (Serbian name with ć) appears in EN (lines 54, 58) and TR (lines 53, 55). Consistent spelling across both. `Никола Йокич` in RU (line 55) — correct Russian transliteration. **Consistent.**
- `Stéphane Bancel` appears in EN (line 83) and TR (line 72). Russian uses `Стефан Бансел` (line 80) — correct Russian transliteration without French diacritic. **Consistent.**
- `Henry Aldridge & Son` appears unchanged (Latin) across EN, TR, RU (proper-noun brand — intentionally not transliterated). **Consistent.**
- No suspicious token appearing suspiciously in 2+ files. Locale-appropriate variants of place names used: `Kiyev` (AZ), `Kyiv` (EN), `Kiev` (TR, RU) — each correct for its locale.
- Dates match across files: all Game-1 playoff, Hormuz reversal, and Kyiv shooting events dated 2026-04-18; GPT-Rosalind dated 2026-04-17. **Consistent.**

## Verdict
All four writer outputs pass QA-A diacritic/script-purity checks with zero BLOCKING and zero MINOR issues. Clear for downstream processing.
