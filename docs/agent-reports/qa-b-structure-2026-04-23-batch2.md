# QA-B Report — Length/Slug/Date/Category — 2026-04-23 Batch 2

## Summary
- Title length: **0 BLOCKING**, **5 MINOR** (all AZ 60-75, within heuristic)
- Slug format: 0 BLOCKING (all 32 regex-valid, prefixes correct, lowercase, ASCII+hyphen only)
- Slug uniqueness: 0 collisions vs existing 368, 0 duplicates within batch
- Date alignment: OK (all 32 = `'2026-04-23'`, cross-locale match per topic)
- Category whitelist: 0 BLOCKING (all categories valid, no `Tech`, no `İş`, all >=3 char)
- Content length: 0 BLOCKING, 0 MINOR (all 32 within 1500-2300 heuristic band, max 2107)
- locale field: OK all 32 articles include `locale` field
- Cosmetic: RU Topic 5 heading line has slug repeated twice (markdown-only, TS block OK)

## Title Length Findings

Limit: EN/TR/RU strict ≤60; AZ heuristic ≤75 (BLOCKING >75, MINOR 60-75).

| Locale | Topic | Title | Length | Limit | Status |
|---|---|---|---|---|---|
| AZ | 1 | Papa Leo XIV Afrika turunu Malaboda yağışlı messə ilə başa vurdu | 64 | 75 | MINOR |
| AZ | 2 | Rusiyanın Dneprə dron zərbəsi: 3 ölü, 10-dan çox yaralı | 55 | 75 | OK |
| AZ | 3 | Ukrayna dronları Rusiyanın Qorki neft stansiyasına zərbə vurdu | 62 | 75 | MINOR |
| AZ | 4 | Aİ 20-ci sanksiya paketini qəbul etdi, Ukraynaya 90 milyard avro kredit | 71 | 75 | MINOR |
| AZ | 5 | American Express rekord: 18,9 mlrd gəlir, 3 mlrd mənfəət | 56 | 75 | OK |
| AZ | 6 | Honeywell Q1 2026: EPS ötdü, gəlir aşağı, HONA ayrılacaq | 56 | 75 | OK |
| AZ | 7 | American Airlines: rekord gəlir, 267 mln dollar zərər yanacaqdan | 64 | 75 | MINOR |
| AZ | 8 | Dallas Stars Wild-ı 2OT-də uddu: Johnston-un qələbə qolu, 4-3 | 61 | 75 | MINOR |
| EN | 1 | Pope Leo XIV Ends Africa Tour With Rain-Soaked Malabo Mass | 58 | 60 | OK |
| EN | 2 | Russian Drone Strike on Dnipro Kills 3, Wounds 10+ | 50 | 60 | OK |
| EN | 3 | Ukraine Drones Hit Gorky Oil Station in Nizhny Novgorod | 55 | 60 | OK |
| EN | 4 | EU Adopts 20th Russia Sanctions Package, 90B Ukraine Loan | 57 | 60 | OK |
| EN | 5 | American Express Q1 2026: Record 18.9B Revenue, 3B Profit | 57 | 60 | OK |
| EN | 6 | Honeywell Q1: EPS Beat, Revenue Miss, HONA Spin-Off On Track | 60 | 60 | OK (exact limit) |
| EN | 7 | American Airlines Q1: Record Revenue, 267M Loss on Fuel | 55 | 60 | OK |
| EN | 8 | Stars Beat Wild 4-3 in 2OT as Johnston Wins Game 3 | 50 | 60 | OK |
| TR | 1 | Papa Leo XIV, tarihi Afrika turunu Malabo'da tamamladı | 54 | 60 | OK |
| TR | 2 | Rusya'nın Dnipro'ya dron saldırısında 3 ölü, 10 yaralı | 54 | 60 | OK |
| TR | 3 | Ukrayna dronları Rusya'nın Gorki petrol istasyonunu vurdu | 57 | 60 | OK |
| TR | 4 | AB'den 20. Rusya yaptırımı ve 90 milyar euro Ukrayna kredisi | 60 | 60 | OK (exact limit) |
| TR | 5 | American Express Q1 rekoru: 18,9 milyar dolar gelir | 51 | 60 | OK |
| TR | 6 | Honeywell Q1: Kâr beklentiyi aştı, gelir ıskaladı | 49 | 60 | OK |
| TR | 7 | American Airlines Q1: Rekor gelir ama yakıt zararı | 50 | 60 | OK |
| TR | 8 | Stars çift uzatmada Wild'ı devirdi: Johnston kahraman | 53 | 60 | OK |
| RU | 1 | Папа Лев XIV завершил африканское турне мессой в Малабо | 55 | 60 | OK |
| RU | 2 | Удар по Днепру: трое погибших, более десяти раненых | 51 | 60 | OK |
| RU | 3 | Украинские дроны ударили по Горьковской НПС под Нижним | 54 | 60 | OK |
| RU | 4 | ЕС принял 20-й пакет санкций и кредит Украине 90 млрд евро | 58 | 60 | OK |
| RU | 5 | Amex Q1 2026: выручка 18,9 млрд и прибыль 3 млрд долларов | 57 | 60 | OK |
| RU | 6 | Honeywell Q1 2026: выручка 9,1 млрд и выделение Aerospace | 57 | 60 | OK |
| RU | 7 | American Airlines Q1: рекорд выручки и убыток из-за топлива | 59 | 60 | OK |
| RU | 8 | Dallas Stars обыграли Wild в 2OT и повели в серии NHL | 53 | 60 | OK |

**Title BLOCKING:** 0 — no title exceeds strict threshold (EN/TR/RU ≤60, AZ ≤75).

**Title MINOR (5 total, all AZ, all within 60-75 heuristic band):**
- AZ Topic 1 (64), AZ Topic 3 (62), AZ Topic 4 (71), AZ Topic 7 (64), AZ Topic 8 (61)
- All within AZ heuristic threshold; none require mandatory shortening. Writer improved AZ discipline vs Batch 1 (6 BLOCKING → 0 BLOCKING).

**EN/TR/RU at exact limit:**
- EN Topic 6 (60), TR Topic 4 (60) — at exact limit, OK but no margin for adjustment.

## Slug Findings

### BLOCKING
None. All 32 slugs pass regex `/^[a-z0-9]+([-][a-z0-9]+)*$/`, lowercase, hyphens only, ASCII-only, no underscores, no double hyphens, no leading/trailing hyphens.

### Prefix validation
- AZ (8): no prefix — OK
- EN (8): all `en-` prefix — OK
- TR (8): all `tr-` prefix — OK
- RU (8): all `ru-` prefix — OK

## Slug Uniqueness Check

Cross-check against existing 368 slugs in `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/data/news-articles.ts` via `grep -c "'$SLUG':"`:

All 32 slugs returned 0 collisions. Within-batch: 32 unique slugs (no duplicates).

| # | Slug | Collisions |
|---|---|---|
| AZ-1 | papa-leo-xiv-afrika-turu-malabo-sonuncu-messe-23-aprel | 0 |
| AZ-2 | rusiya-dnepr-shehrine-dron-zerbesi-3-olu-10-yarali | 0 |
| AZ-3 | ukrayna-dronlari-rusiya-qorki-neft-stansiyasina-zerbe-vurdu | 0 |
| AZ-4 | aib-rusiyaya-qarshi-20-ci-sanksiya-paketi-ukraynaya-90-milyard-kredit | 0 |
| AZ-5 | amex-q1-2026-net-menfeet-3-mlrd-dollar-gelirler-18-9-mlrd | 0 |
| AZ-6 | honeywell-q1-2026-gelirler-91-mlrd-dollar-aerospace-hona-ayrilacaq | 0 |
| AZ-7 | american-airlines-q1-2026-rekord-gelir-zerer-yanacaq-iran-muharibesi | 0 |
| AZ-8 | dallas-stars-minnesota-wild-2ot-johnston-4-3-nhl-23-aprel | 0 |
| EN-1 | en-pope-leo-xiv-ends-africa-tour-malabo-mass-equatorial-guinea | 0 |
| EN-2 | en-russian-drone-strike-dnipro-kills-three-wounds-ten | 0 |
| EN-3 | en-ukraine-drones-hit-gorky-oil-pumping-station-nizhny-novgorod | 0 |
| EN-4 | en-eu-adopts-20th-russia-sanctions-package-90bn-ukraine-loan | 0 |
| EN-5 | en-american-express-q1-2026-beat-18-9b-revenue-3b-profit | 0 |
| EN-6 | en-honeywell-q1-2026-eps-beat-revenue-miss-aerospace-spinoff-q3 | 0 |
| EN-7 | en-american-airlines-q1-2026-record-revenue-loss-fuel-iran | 0 |
| EN-8 | en-dallas-stars-beat-wild-2ot-johnston-game-3-nhl-playoffs | 0 |
| TR-1 | tr-papa-leo-xiv-afrika-turu-malabo-son-ayin | 0 |
| TR-2 | tr-rusya-dnipro-saldirisi-uc-olu-on-yarali | 0 |
| TR-3 | tr-ukrayna-dronlari-gorki-petrol-istasyonunu-vurdu | 0 |
| TR-4 | tr-ab-rusyaya-karsi-20-yaptirim-paketi | 0 |
| TR-5 | tr-american-express-q1-2026-rekor-gelir | 0 |
| TR-6 | tr-honeywell-q1-2026-gelirler-kacirdi | 0 |
| TR-7 | tr-american-airlines-q1-2026-zarar-yakit-iran | 0 |
| TR-8 | tr-dallas-stars-wild-uzatmada-johnston-galibi | 0 |
| RU-1 | ru-papa-lev-xiv-zavershil-afrikanskoe-turne-messoy-v-malabo | 0 |
| RU-2 | ru-rossiyskiy-udar-po-dnepru-tri-pogibshih-desyat-ranenyh | 0 |
| RU-3 | ru-ukrainskie-drony-udarili-po-gorkovskoy-nps-nizhegorodskaya | 0 |
| RU-4 | ru-es-utverdil-20-y-paket-sanktsiy-protiv-rossii-kredit-ukraine-90-mlrd | 0 |
| RU-5 | ru-american-express-q1-2026-vyruchka-18-9-mlrd-pribyl-3-mlrd | 0 |
| RU-6 | ru-honeywell-q1-2026-vyruchka-91-mlrd-spinoff-aerospace-hona | 0 |
| RU-7 | ru-american-airlines-q1-2026-rekord-vyruchka-ubytok-toplivo-iran | 0 |
| RU-8 | ru-dallas-stars-oderzhali-pobedu-v-ot-dzhonston-nhl-3-match | 0 |

## Date Cross-Locale Alignment

All dates = `'2026-04-23'`. Cross-locale topic alignment verified (per locale order):

| Topic | AZ | EN | TR | RU | Match |
|---|---|---|---|---|---|
| 1 (Pope Leo Africa) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |
| 2 (Dnipro drone) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |
| 3 (Gorky oil hit) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |
| 4 (EU sanctions/Ukraine loan) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |
| 5 (Amex Q1) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |
| 6 (Honeywell Q1/HONA) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |
| 7 (American Airlines Q1) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |
| 8 (Dallas Stars NHL) | 2026-04-23 | 2026-04-23 | 2026-04-23 | 2026-04-23 | OK |

Zero stray dates detected in any file.

## Category Validation

Whitelist checks — `Tech`, `İş` banned (Session 31/32 lessons). Category length ≥3 char.

| Locale | Topic | Category | Length | Whitelist | Status |
|---|---|---|---|---|---|
| AZ | 1 | Dünya | 5 | OK | OK |
| AZ | 2 | Dünya | 5 | OK | OK |
| AZ | 3 | Dünya | 5 | OK | OK |
| AZ | 4 | Dünya | 5 | OK | OK |
| AZ | 5 | İqtisadiyyat | 12 | OK | OK |
| AZ | 6 | İqtisadiyyat | 12 | OK | OK |
| AZ | 7 | İqtisadiyyat | 12 | OK | OK |
| AZ | 8 | İdman | 5 | OK | OK |
| EN | 1 | World | 5 | OK | OK |
| EN | 2 | World | 5 | OK | OK |
| EN | 3 | World | 5 | OK | OK |
| EN | 4 | World | 5 | OK | OK |
| EN | 5 | Business | 8 | OK | OK |
| EN | 6 | Business | 8 | OK | OK |
| EN | 7 | Business | 8 | OK | OK |
| EN | 8 | Sports | 6 | OK | OK |
| TR | 1 | Dünya | 5 | OK | OK |
| TR | 2 | Dünya | 5 | OK | OK |
| TR | 3 | Dünya | 5 | OK | OK |
| TR | 4 | Dünya | 5 | OK | OK |
| TR | 5 | Ekonomi | 7 | OK | OK |
| TR | 6 | Ekonomi | 7 | OK | OK |
| TR | 7 | Ekonomi | 7 | OK | OK |
| TR | 8 | Spor | 4 | OK | OK (not `İş`) |
| RU | 1 | Мир | 3 | OK | OK (min 3-char met) |
| RU | 2 | Мир | 3 | OK | OK |
| RU | 3 | Мир | 3 | OK | OK |
| RU | 4 | Мир | 3 | OK | OK |
| RU | 5 | Экономика | 9 | OK | OK |
| RU | 6 | Экономика | 9 | OK | OK |
| RU | 7 | Экономика | 9 | OK | OK |
| RU | 8 | Спорт | 5 | OK | OK |

Cross-locale category mapping (per topic):
- Topic 1–4: Dünya / World / Dünya / Мир — consistent
- Topic 5–7: İqtisadiyyat / **Business** / Ekonomi / Экономика — same EN-only `Business` vs sibling-locale `Economy` pattern observed in Batch 1 (whitelist-valid, not BLOCKING per spec, but noted as MINOR cross-locale consistency if strict mapping required)
- Topic 8: İdman / Sports / Spor / Спорт — consistent

No `Tech`, no `İş`, no <3-char categories. All whitelist-valid.

## Content Length

Threshold: 1500-2300 heuristic; <500 BLOCKING, <1500 MINOR, >2500 MINOR. Measured on extracted `content: \`...\`` blocks.

| Locale | Topic | Chars | Status |
|---|---|---|---|
| AZ | 1 | 1620 | OK |
| AZ | 2 | 1609 | OK |
| AZ | 3 | 1717 | OK |
| AZ | 4 | 1699 | OK |
| AZ | 5 | 1693 | OK |
| AZ | 6 | 1777 | OK |
| AZ | 7 | 1712 | OK |
| AZ | 8 | 1695 | OK |
| EN | 1 | 1911 | OK |
| EN | 2 | 2043 | OK |
| EN | 3 | 2097 | OK |
| EN | 4 | 2073 | OK |
| EN | 5 | 2090 | OK |
| EN | 6 | 2107 | OK |
| EN | 7 | 2064 | OK |
| EN | 8 | 2045 | OK |
| TR | 1 | 1647 | OK |
| TR | 2 | 1819 | OK |
| TR | 3 | 1894 | OK |
| TR | 4 | 1920 | OK |
| TR | 5 | 1858 | OK |
| TR | 6 | 1800 | OK |
| TR | 7 | 1821 | OK |
| TR | 8 | 1885 | OK |
| RU | 1 | 1895 | OK |
| RU | 2 | 1699 | OK |
| RU | 3 | 1763 | OK |
| RU | 4 | 1840 | OK |
| RU | 5 | 2000 | OK |
| RU | 6 | 1948 | OK |
| RU | 7 | 1974 | OK |
| RU | 8 | 1868 | OK |

All 32 articles comfortably within 1500-2300 target band. Min 1609 (AZ-2), max 2107 (EN-6). No MINOR flags on length.

## locale Field

Verified every article includes explicit `locale: 'az'|'en'|'tr'|'ru'` field:
- AZ 8/8 — all `locale: 'az'` OK
- EN 8/8 — all `locale: 'en'` OK
- TR 8/8 — all `locale: 'tr'` OK
- RU 8/8 — all `locale: 'ru'` OK

## Cosmetic / Markdown Observations (non-blocking)

- **RU Topic 5 heading (line 111)** duplicates the slug:
  `## Topic 5: ru-american-express-q1-2026-vyruchka-18-9-mlrd-pribyl-3-mlrd ru-american-express-q1-2026-vyruchka-18-9-mlrd-pribyl-3-mlrd`
  The TypeScript block below it has a single, unique key. Markdown-only cosmetic issue; does not affect article data.
- **AZ file** includes extra commentary block after Topic 8 ("Summary" section with character counts, diacritics notes). Not part of typescript data — markdown report meta. No impact.

## Verdict

**0 BLOCKING**, **5 MINOR** (AZ titles 60-75 heuristic band only).

Status: **APPROVE** — all 32 articles pass strict length/slug/date/category/content/locale checks. Zero title BLOCKING (major improvement vs Batch 1 which had 6 AZ BLOCKING). All slugs unique and regex-valid, dates aligned across locales, categories whitelisted with no `Tech`/`İş` violations, content lengths within 1500-2300 target band, all `locale` fields present. The sole deviations are 5 AZ titles in the 60-75 range (all within heuristic threshold) and the known EN-uses-Business-vs-sibling-Economy pattern (whitelist-valid). No fixes required for integration.
