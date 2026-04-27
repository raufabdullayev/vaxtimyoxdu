# QA-B: Length / Slug / Date / Category audit

**Auditor:** Session 39 QA-B agent
**Audit timestamp:** 2026-04-27
**Files audited:** 4 writer outputs (8 topics x 4 langs = 32 articles)

Files:
- `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/docs/agent-reports/news-writer-output-az-2026-04-27.md`
- `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/docs/agent-reports/news-writer-output-en-2026-04-27.md`
- `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/docs/agent-reports/news-writer-output-tr-2026-04-27.md`
- `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/docs/agent-reports/news-writer-output-ru-2026-04-27.md`

Existing slug corpus: 468 entries extracted from `src/data/news-articles.ts` -> `/tmp/existing-slugs.txt`.

## Verdict summary
- Title length compliance: **32/32 PASS** (AZ 60-75; EN/TR/RU 51-60)
- Content length compliance: **32/32 PASS** (1500-2100 char body, frontmatter excluded)
- H2 heading count: **32/32 PASS** (AZ = 2 each; EN/TR/RU = 3 each; all within [2,3])
- Slug uniqueness (intra-batch, 32 vs 32): **PASS, 0 collisions**
- Slug uniqueness (vs existing 468): **PASS, 0 collisions**
- Slug character/format check: **PASS** (lowercase ASCII + hyphen only; no `$` or backtick; correct prefix per locale)
- Date ISO format: **32/32 PASS** (`2026-04-27` on every entry)
- Category enum: **32/32 PASS** (every category falls inside the language-specific enum)
- Locale field: **32/32 PASS** (matches file language for every entry)
- **Total BLOCKING: 0**
- **Total MINOR: 0**

## Findings (per topic, per locale, with exact char counts)

Title lengths use Python `len()` (codepoint count). Content lengths cover the markdown body only (Slug/Title/Date/Category/Locale frontmatter lines and the `### Content...` heading line are excluded; H2 sub-headings inside the body are counted). H2 count is based on `^## ` lines inside the content body.

### Topic 1 (Aliyev Gernika)
- AZ slug `aliyev-gernika-sulh-mukafati-aldi-ermenistan-azerbaycan-sulh` -- unique vs 468 existing + 31 sibling -- PASS
  - title 68 chars (60-75) PASS, content 1840 chars (1500-2100) PASS, H2=2 PASS, category `Siyasət` PASS, locale `az` PASS
- EN slug `en-aliyev-gernika-peace-award-armenia-azerbaijan-reconciliation` -- unique -- PASS
  - title 58 (51-60) PASS, content 1927 PASS, H2=3 PASS, category `Politics` PASS, locale `en` PASS
- TR slug `tr-aliyev-gernika-baris-odulu-ermenistan-azerbaycan-uzlasma` -- unique -- PASS
  - title 53 PASS, content 1979 PASS, H2=3 PASS, category `Siyaset` PASS, locale `tr` PASS
- RU slug `ru-aliyev-poluchil-premiyu-gernika-armeniya-azerbaydzhan-mir` -- unique -- PASS
  - title 51 PASS, content 1531 PASS, H2=2 PASS, category `Политика` PASS, locale `ru` PASS

### Topic 2 (Iran Araghchi - Putin)
- AZ slug `iran-arakci-putin-moskva-gorush-hormuz-tekliflari` -- unique -- PASS
  - title 64 PASS, content 1940 PASS, H2=2 PASS, category `Siyasət` PASS, locale `az` PASS
- EN slug `en-iran-araghchi-putin-moscow-meeting-hormuz-proposal` -- unique -- PASS
  - title 57 PASS, content 1970 PASS, H2=3 PASS, category `Politics` PASS, locale `en` PASS
- TR slug `tr-iran-arakci-putin-moskova-gorusmesi-hormuz-onerisi` -- unique -- PASS
  - title 57 PASS, content 1986 PASS, H2=3 PASS, category `Siyaset` PASS, locale `tr` PASS
- RU slug `ru-iran-arakhchi-vstrecha-s-putinym-v-moskve-predlozheniye-po-hormuzu` -- unique -- PASS
  - title 59 PASS, content 1781 PASS, H2=2 PASS, category `Политика` PASS, locale `ru` PASS

### Topic 3 (Mali defence minister Camara killed)
- AZ slug `mali-mudafie-naziri-sadio-kamara-olduruldu-kati-saldirisi` -- unique -- PASS
  - title 65 PASS, content 1827 PASS, H2=2 PASS, category `Dünya` PASS, locale `az` PASS
- EN slug `en-mali-defence-minister-sadio-camara-killed-kati-suicide-attack` -- unique -- PASS
  - title 51 PASS, content 1919 PASS, H2=3 PASS, category `World` PASS, locale `en` PASS
- TR slug `tr-mali-savunma-bakani-sadio-kamara-olduruldu-kati-saldirisi` -- unique -- PASS
  - title 54 PASS, content 1832 PASS, H2=3 PASS, category `Dünya` PASS, locale `tr` PASS
- RU slug `ru-ministr-oborony-mali-sadio-kamara-ubit-kati-vzryv` -- unique -- PASS
  - title 60 PASS, content 1782 PASS, H2=2 PASS, category `Мир` PASS, locale `ru` PASS

### Topic 4 (Chernobyl 40)
- AZ slug `chernobil-40-illik-ildonumu-zelenski-rusiya-nuvereyi-terror` -- unique -- PASS
  - title 70 PASS, content 1885 PASS, H2=2 PASS, category `Dünya` PASS, locale `az` PASS
- EN slug `en-chernobyl-40-anniversary-zelenskyy-russia-nuclear-terrorism-strikes` -- unique -- PASS
  - title 59 PASS, content 2029 PASS, H2=3 PASS, category `World` PASS, locale `en` PASS
- TR slug `tr-cernobil-40-yili-zelenski-rusya-nukleer-terorizm-saldirilar` -- unique -- PASS
  - title 57 PASS, content 1897 PASS, H2=3 PASS, category `Dünya` PASS, locale `tr` PASS
- RU slug `ru-chernobyl-40-let-zelenskiy-rossiya-yadernyy-terror-udary` -- unique -- PASS
  - title 51 PASS, content 1678 PASS, H2=2 PASS, category `Мир` PASS, locale `ru` PASS

### Topic 5 (WHCD shooting / Cole Allen)
- AZ slug `vasinqton-corxan-jurnalist-yemeyinde-atishma-tramp-tehlukesizlik` -- unique -- PASS
  - title 73 PASS, content 2100 PASS (boundary, equals upper limit), H2=2 PASS, category `Siyasət` PASS, locale `az` PASS
- EN slug `en-white-house-correspondents-dinner-shooting-trump-evacuated-allen` -- unique -- PASS
  - title 58 PASS, content 1847 PASS, H2=3 PASS, category `Politics` PASS, locale `en` PASS
- TR slug `tr-beyaz-saray-muhabirleri-yemegi-silahli-saldiri-trump` -- unique -- PASS
  - title 59 PASS, content 2042 PASS, H2=3 PASS, category `Siyaset` PASS, locale `tr` PASS
- RU slug `ru-strelba-na-ujine-korrespondentov-belogo-doma-tramp-evakuirovan` -- unique -- PASS
  - title 54 PASS, content 1787 PASS, H2=2 PASS, category `Политика` PASS, locale `ru` PASS

### Topic 6 (King Charles III state visit)
- AZ slug `kral-charles-abs-resmi-sefer-tramp-vasinqton-2026` -- unique -- PASS
  - title 63 PASS, content 1961 PASS, H2=2 PASS, category `Siyasət` PASS, locale `az` PASS
- EN slug `en-king-charles-iii-us-state-visit-trump-washington-2026` -- unique -- PASS
  - title 55 PASS, content 1826 PASS, H2=3 PASS, category `Politics` PASS, locale `en` PASS
- TR slug `tr-kral-charles-abd-resmi-ziyaret-trump-washington-2026` -- unique -- PASS
  - title 57 PASS, content 1904 PASS, H2=3 PASS, category `Siyaset` PASS, locale `tr` PASS
- RU slug `ru-korol-charles-tretiy-gosvizit-v-ssha-tramp-vashington-2026` -- unique -- PASS
  - title 51 PASS, content 1685 PASS, H2=2 PASS, category `Политика` PASS, locale `ru` PASS

### Topic 7 (Israeli strikes southern Lebanon)
- AZ slug `israil-livan-cenubu-aprel-26-vurusler-14-olen-aties-kes` -- unique -- PASS
  - title 69 PASS, content 1934 PASS, H2=2 PASS, category `Dünya` PASS, locale `az` PASS
- EN slug `en-israel-strikes-southern-lebanon-april-26-14-killed-ceasefire` -- unique -- PASS
  - title 52 PASS, content 1952 PASS, H2=3 PASS, category `World` PASS, locale `en` PASS
- TR slug `tr-israil-guney-lubnan-saldirilari-26-nisan-14-olu-ateskes` -- unique -- PASS
  - title 60 PASS (boundary, equals upper limit), content 1810 PASS, H2=3 PASS, category `Dünya` PASS, locale `tr` PASS
- RU slug `ru-izrail-udary-yug-livana-26-aprelya-14-pogibshikh-peremiriye` -- unique -- PASS
  - title 57 PASS, content 1751 PASS, H2=2 PASS, category `Мир` PASS, locale `ru` PASS

### Topic 8 (NPT 11th Review Conference)
- AZ slug `nyt-bm-nyu-york-nuvereyi-silahsizlasdirma-konfransi-iran-acilir` -- unique -- PASS
  - title 68 PASS, content 2065 PASS, H2=2 PASS, category `Siyasət` PASS, locale `az` PASS
- EN slug `en-npt-review-conference-opens-un-new-york-iran-nuclear` -- unique -- PASS
  - title 51 PASS, content 1862 PASS, H2=3 PASS, category `Politics` PASS, locale `en` PASS
- TR slug `tr-npt-gozden-gecirme-konferansi-bm-new-york-acildi-iran-nukleer` -- unique -- PASS
  - title 58 PASS, content 1980 PASS, H2=3 PASS, category `Siyaset` PASS, locale `tr` PASS
- RU slug `ru-konferentsiya-dnyao-otkrylas-oon-nyu-york-iran-yadernaya` -- unique -- PASS
  - title 53 PASS, content 1707 PASS, H2=2 PASS, category `Политика` PASS, locale `ru` PASS

## Slug uniqueness summary

All 32 new slugs (verified ASCII lowercase + hyphen only; correct locale prefix; no `$` or backtick):

AZ (no prefix; 8):
1. `aliyev-gernika-sulh-mukafati-aldi-ermenistan-azerbaycan-sulh`
2. `iran-arakci-putin-moskva-gorush-hormuz-tekliflari`
3. `mali-mudafie-naziri-sadio-kamara-olduruldu-kati-saldirisi`
4. `chernobil-40-illik-ildonumu-zelenski-rusiya-nuvereyi-terror`
5. `vasinqton-corxan-jurnalist-yemeyinde-atishma-tramp-tehlukesizlik`
6. `kral-charles-abs-resmi-sefer-tramp-vasinqton-2026`
7. `israil-livan-cenubu-aprel-26-vurusler-14-olen-aties-kes`
8. `nyt-bm-nyu-york-nuvereyi-silahsizlasdirma-konfransi-iran-acilir`

EN (`en-` prefix; 8):
1. `en-aliyev-gernika-peace-award-armenia-azerbaijan-reconciliation`
2. `en-iran-araghchi-putin-moscow-meeting-hormuz-proposal`
3. `en-mali-defence-minister-sadio-camara-killed-kati-suicide-attack`
4. `en-chernobyl-40-anniversary-zelenskyy-russia-nuclear-terrorism-strikes`
5. `en-white-house-correspondents-dinner-shooting-trump-evacuated-allen`
6. `en-king-charles-iii-us-state-visit-trump-washington-2026`
7. `en-israel-strikes-southern-lebanon-april-26-14-killed-ceasefire`
8. `en-npt-review-conference-opens-un-new-york-iran-nuclear`

TR (`tr-` prefix; 8):
1. `tr-aliyev-gernika-baris-odulu-ermenistan-azerbaycan-uzlasma`
2. `tr-iran-arakci-putin-moskova-gorusmesi-hormuz-onerisi`
3. `tr-mali-savunma-bakani-sadio-kamara-olduruldu-kati-saldirisi`
4. `tr-cernobil-40-yili-zelenski-rusya-nukleer-terorizm-saldirilar`
5. `tr-beyaz-saray-muhabirleri-yemegi-silahli-saldiri-trump`
6. `tr-kral-charles-abd-resmi-ziyaret-trump-washington-2026`
7. `tr-israil-guney-lubnan-saldirilari-26-nisan-14-olu-ateskes`
8. `tr-npt-gozden-gecirme-konferansi-bm-new-york-acildi-iran-nukleer`

RU (`ru-` prefix; 8):
1. `ru-aliyev-poluchil-premiyu-gernika-armeniya-azerbaydzhan-mir`
2. `ru-iran-arakhchi-vstrecha-s-putinym-v-moskve-predlozheniye-po-hormuzu`
3. `ru-ministr-oborony-mali-sadio-kamara-ubit-kati-vzryv`
4. `ru-chernobyl-40-let-zelenskiy-rossiya-yadernyy-terror-udary`
5. `ru-strelba-na-ujine-korrespondentov-belogo-doma-tramp-evakuirovan`
6. `ru-korol-charles-tretiy-gosvizit-v-ssha-tramp-vashington-2026`
7. `ru-izrail-udary-yug-livana-26-aprelya-14-pogibshikh-peremiriye`
8. `ru-konferentsiya-dnyao-otkrylas-oon-nyu-york-iran-yadernaya`

Intra-batch collisions (all 32 cross-checked): NONE
Collisions vs existing 468 in `src/data/news-articles.ts`: NONE

## Boundary observations (informational, no action needed)

- AZ T5 content length is exactly 2100 characters -- on the upper boundary of the 1500-2100 window. Still PASS, but worth noting if any post-write edit adds even a single character it will break the bound.
- TR T7 title length is exactly 60 characters -- on the upper boundary of the 51-60 window. PASS but no further additions possible without exceeding.
- RU T1 content (1531) sits comfortably within 1500-2100 but is the shortest body in the batch; this is acceptable but reviewers may want to confirm it still satisfies the editorial depth target.
- All EN/TR articles use 3 H2 sub-headings; all AZ/RU articles use 2 H2 sub-headings. Both fall within the [2,3] permissible range.

## Recommendations

No BLOCKING or MINOR issues found. The 32 new article entries are clean for length, slug uniqueness, date, category, and locale. They can move forward to integration into `src/data/news-articles.ts` without changes from this auditor's perspective.
