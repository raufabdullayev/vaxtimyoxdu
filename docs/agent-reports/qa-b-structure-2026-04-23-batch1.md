# QA-B Report — Length/Slug/Date/Category — 2026-04-23

## Summary
- Title length: **6 BLOCKING** (all AZ > 75), **3 MINOR** (AZ 60-75)
- Slug format: 0 BLOCKING (all 40 regex-valid, prefixes correct, lowercase, hyphens only)
- Slug uniqueness: 0 collisions vs existing 328, 0 duplicates within batch
- Date alignment: OK (all 40 = `'2026-04-22'`, cross-locale match per topic)
- Category whitelist: 0 BLOCKING (all categories valid, no `Tech`, no `İş`, all >=3 char)
- Content length: 0 BLOCKING, 1 MINOR (AZ Topic 5 = 1458 char, slightly <1500)
- locale field: OK all 40 articles include `locale` field

## Title Length Findings

Limit: EN/TR/RU strict ≤60; AZ heuristic ≤75 (BLOCKING >75, MINOR 60-75).

| Locale | Topic | Title | Length | Limit | Status |
|---|---|---|---|---|---|
| AZ | 1 | İran Hörmüzdə iki gəmini ələ keçirdi, atəşkəs uzadıldı | 54 | 75 | OK |
| AZ | 2 | ABŞ birjaları rekord vurdu — atəşkəs uzadıldı, Nasdaq tarixi zirvədə | 68 | 75 | MINOR |
| AZ | 3 | Google Cloud Next 2026: TPU 8-ci nəsil ikiyə ayrıldı, Gemini Enterprise təqdim olundu | 85 | 75 | **BLOCKING** |
| AZ | 4 | Tesla Q1 2026: gəlirlər gözləntiləri ötdü, kapex 25 milyard dollara qədər qaldırıldı | 84 | 75 | **BLOCKING** |
| AZ | 5 | Livanlı jurnalist Amal Xəlil İsrail zərbəsi nəticəsində həlak oldu | 66 | 75 | MINOR |
| AZ | 6 | Pəhəlgam terrorunun birinci ildönümü: Modi qurbanlara ehtiram ifadə etdi | 72 | 75 | MINOR |
| AZ | 7 | NBA pley-off 22 aprel: Thunder, Pistons və Blazers qalib, Vembanyama zərbə aldı | 79 | 75 | **BLOCKING** |
| AZ | 8 | Boeing Q1 2026: zərər azaldı, 143 təyyarə təslim edildi — 2019-dan bəri ən yaxşı rüb | 84 | 75 | **BLOCKING** |
| AZ | 9 | IBM Q1 2026: gəlir 15,92 milyard dollar, proqnozlar ötüldü, lakin səhmlər düşdü | 79 | 75 | **BLOCKING** |
| AZ | 10 | Rusiya Odessa limanına dron zərbəsi endirdi, Zaporijyada dəmiryolçu həlak oldu | 78 | 75 | **BLOCKING** |
| EN | 1 | Iran Seizes Two Ships in Hormuz as Ceasefire Extended | 53 | 60 | OK |
| EN | 2 | US Stocks Hit Record Highs on Ceasefire and Tech Beats | 54 | 60 | OK |
| EN | 3 | Google Unveils 8th-Gen TPUs and Gemini Enterprise | 49 | 60 | OK |
| EN | 4 | Tesla Q1 Beats Estimates, Raises Capex to $25 Billion | 53 | 60 | OK |
| EN | 5 | Lebanese Journalist Amal Khalil Killed in Israeli Strike | 56 | 60 | OK |
| EN | 6 | Modi Marks Pahalgam Attack Anniversary; Army Vows Response | 58 | 60 | OK |
| EN | 7 | NBA Playoffs April 22: Wembanyama Concussion, SGA Drops 37 | 58 | 60 | OK |
| EN | 8 | Boeing Narrows Q1 Loss on 143 Jet Deliveries | 44 | 60 | OK |
| EN | 9 | IBM Q1 Tops Estimates on Software Growth, Stock Slips | 53 | 60 | OK |
| EN | 10 | Russian Drones Hit Odesa Port, Kill Rail Worker | 47 | 60 | OK |
| TR | 1 | İran Hormuz'da iki gemiyi ele geçirdi, ateşkes uzatıldı | 55 | 60 | OK |
| TR | 2 | S&P 500 ve Nasdaq rekor kırdı, ateşkes piyasaları uçurdu | 56 | 60 | OK |
| TR | 3 | Google Cloud Next 2026: Yeni TPU çipleri tanıtıldı | 50 | 60 | OK |
| TR | 4 | Tesla Q1 2026'da beklentiyi aştı, yatırım 25 milyar | 51 | 60 | OK |
| TR | 5 | Lübnanlı gazeteci Amal Khalil İsrail saldırısında öldü | 54 | 60 | OK |
| TR | 6 | Pahalgam saldırısının yıldönümü: Modi'den anma mesajı | 53 | 60 | OK |
| TR | 7 | NBA play-off: Wembanyama sarsıntı geçirdi, OKC 2-0 önde | 55 | 60 | OK |
| TR | 8 | Boeing Q1 2026: Zarar daraldı, 143 uçak teslim edildi | 53 | 60 | OK |
| TR | 9 | IBM Q1 2026: 15,92 milyar dolar gelir, yazılım +11% | 51 | 60 | OK |
| TR | 10 | Rusya Odessa limanını vurdu, demiryolu işçisi öldü | 50 | 60 | OK |
| RU | 1 | Иран захватил два судна в Ормузском проливе | 43 | 60 | OK |
| RU | 2 | Рынки США обновили рекорды на фоне перемирия | 44 | 60 | OK |
| RU | 3 | Google Cloud Next 2026: новые TPU и Gemini Enterprise | 53 | 60 | OK |
| RU | 4 | Tesla Q1 2026: прибыль выше прогноза, капзатраты 25 млрд | 56 | 60 | OK |
| RU | 5 | Журналистка Амаль Халиль погибла при ударе Израиля | 50 | 60 | OK |
| RU | 6 | Пахалгам год спустя: Моди почтил память жертв терактов | 54 | 60 | OK |
| RU | 7 | Плей-офф NBA 22 апреля: сотрясение у Вембаньямы | 47 | 60 | OK |
| RU | 8 | Boeing Q1 2026: 143 самолёта, убытки сократились | 48 | 60 | OK |
| RU | 9 | IBM Q1 2026: выручка 15,92 млрд превысила прогнозы | 50 | 60 | OK |
| RU | 10 | Удары по порту Одессы: погиб железнодорожник | 44 | 60 | OK |

**Title BLOCKING (6 total, all AZ, all >75):**
- AZ Topic 3 (85): needs cut ≥10 char — suggest: `Google Cloud Next 2026: TPU 8-ci nəsil və Gemini Enterprise` (59)
- AZ Topic 4 (84): needs cut ≥9 char — suggest: `Tesla Q1 2026: gəlirlər gözləntiləri ötdü, kapex 25 milyard` (60)
- AZ Topic 7 (79): needs cut ≥4 char — suggest: `NBA pley-off 22 aprel: Vembanyama zərbə aldı, Thunder 2-0`
- AZ Topic 8 (84): needs cut ≥9 char — suggest: `Boeing Q1 2026: zərər azaldı, 143 təyyarə təslim edildi`
- AZ Topic 9 (79): needs cut ≥4 char — suggest: `IBM Q1 2026: gəlir 15,92 milyard, proqnozlar ötüldü`
- AZ Topic 10 (78): needs cut ≥3 char — suggest: `Rusiya Odessa limanına dron zərbəsi, Zaporijyada həlak`

**Title MINOR (3 total):**
- AZ Topic 2 (68), AZ Topic 5 (66), AZ Topic 6 (72) — all 60-75, within heuristic threshold.

## Slug Findings

### BLOCKING
None. All 40 slugs pass regex `/^[a-z0-9à-ɏ]+([-][a-z0-9à-ɏ]+)*$/`, lowercase, hyphens only, no underscores.

### Prefix validation
- AZ (10): no prefix — OK
- EN (10): all `en-` prefix — OK
- TR (10): all `tr-` prefix — OK
- RU (10): all `ru-` prefix — OK

## Slug Uniqueness Check

Cross-check against existing 328 slugs in `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/data/news-articles.ts` using `grep -c "'$SLUG':"`:

All 40 slugs returned 0 collisions. Within-batch check: 40 unique slugs (no duplicates).

| # | Slug | Collisions |
|---|---|---|
| AZ-1 | iran-hormuzda-iki-gemi-ele-kecirdi-truce-uzadildi | 0 |
| AZ-2 | bazarlar-rekord-atesh-kesilme-uzadildi-22-aprel | 0 |
| AZ-3 | google-cloud-next-2026-yeni-tpu-gemini-enterprise | 0 |
| AZ-4 | tesla-q1-2026-gelirler-kapex-25-milyard-dollar | 0 |
| AZ-5 | livan-jurnalisti-amal-khalil-israil-zerbesi-neticesinde-oldu | 0 |
| AZ-6 | pahalgam-hucumu-bir-il-modi-qurbanlara-ehtiram | 0 |
| AZ-7 | nba-pley-of-22-aprel-thunder-pistons-blazers-wembanyama-zerbe | 0 |
| AZ-8 | boeing-q1-2026-zerer-azaldi-143-teyyare-teslim-edildi | 0 |
| AZ-9 | ibm-q1-2026-gelirleri-15-92-mlrd-dollar-proqnozlari-oteli | 0 |
| AZ-10 | rusiya-odessa-limanina-hucum-zaporijiyada-bir-dener-oldu | 0 |
| EN-1 | en-iran-seizes-2-ships-hormuz-trump-extends-ceasefire | 0 |
| EN-2 | en-us-stocks-hit-record-highs-iran-ceasefire-tesla-ibm | 0 |
| EN-3 | en-google-cloud-next-2026-tpu-8-gemini-enterprise | 0 |
| EN-4 | en-tesla-q1-2026-earnings-beat-capex-25-billion | 0 |
| EN-5 | en-lebanese-journalist-amal-khalil-killed-israeli-airstrike | 0 |
| EN-6 | en-pahalgam-attack-one-year-modi-tribute-operation-sindoor | 0 |
| EN-7 | en-nba-playoffs-april-22-thunder-pistons-blazers-wembanyama-concussion | 0 |
| EN-8 | en-boeing-q1-2026-earnings-143-jet-deliveries-narrowed-loss | 0 |
| EN-9 | en-ibm-q1-2026-revenue-15-92b-beat-stock-drops | 0 |
| EN-10 | en-russia-drone-strike-odesa-port-zaporizhia-railway-worker-killed | 0 |
| TR-1 | tr-iran-hormuz-bogazinda-iki-gemiyi-ele-gecirdi-ateskes-uzatildi | 0 |
| TR-2 | tr-sp-500-nasdaq-rekor-kirdi-iran-ateskes-uzatildi | 0 |
| TR-3 | tr-google-cloud-next-2026-yeni-tpu-cipleri-gemini-enterprise | 0 |
| TR-4 | tr-tesla-q1-2026-kar-beklentiyi-asti-sermaye-harcamasi-25-milyar | 0 |
| TR-5 | tr-lubnanli-gazeteci-amal-khalil-israil-hava-saldirisinda-hayatini-kaybetti | 0 |
| TR-6 | tr-pahalgam-saldirisi-birinci-yildonumu-modi-anma-operasyon-sindoor | 0 |
| TR-7 | tr-nba-play-off-22-nisan-thunder-pistons-blazers-wembanyama-sarsinti | 0 |
| TR-8 | tr-boeing-q1-2026-zarar-azaldi-143-ucak-teslimati | 0 |
| TR-9 | tr-ibm-q1-2026-15-92-milyar-dolar-gelir-yazilim-artti | 0 |
| TR-10 | tr-rusya-odessa-limanina-drone-saldirisi-zaporijya-demiryolu-iscisi-hayatini-kaybetti | 0 |
| RU-1 | ru-iran-zakhvatil-dva-sudna-v-ormuzskom-prolive-peremirie-prodleno | 0 |
| RU-2 | ru-rynok-ssha-novye-rekordy-peremirie-s-iranom-prodleno | 0 |
| RU-3 | ru-google-cloud-next-2026-novye-tpu-gemini-enterprise | 0 |
| RU-4 | ru-tesla-q1-2026-pribyl-vyshe-prognoza-kapzatraty-25-mlrd | 0 |
| RU-5 | ru-livanskaya-zhurnalistka-amal-khalil-pogibla-pri-udare-izrailya | 0 |
| RU-6 | ru-pakhalgam-god-spustya-modi-pochtil-pamyat-zhertv-teraktov | 0 |
| RU-7 | ru-nba-pley-off-22-aprelya-thunder-pistons-blazers-sotryasenie-vembanyama | 0 |
| RU-8 | ru-boeing-q1-2026-ubytki-sokratilis-143-samoleta-postavleno | 0 |
| RU-9 | ru-ibm-q1-2026-vyruchka-15-92-mlrd-dollarov-prevysila-prognozy | 0 |
| RU-10 | ru-ukraina-rossiyskie-udary-po-portu-odessy-zheleznodorozhnik-pogib | 0 |

## Date Cross-Locale Alignment

All dates = `'2026-04-22'`. Cross-locale topic alignment verified:

| Topic | AZ | EN | TR | RU | Match |
|---|---|---|---|---|---|
| 1 (Iran Hormuz) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 2 (US stocks record) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 3 (Google Cloud Next) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 4 (Tesla Q1) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 5 (Amal Khalil) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 6 (Pahalgam anniv.) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 7 (NBA playoffs) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 8 (Boeing Q1) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 9 (IBM Q1) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |
| 10 (Odesa/Ukraine) | 2026-04-22 | 2026-04-22 | 2026-04-22 | 2026-04-22 | OK |

## Category Validation

Whitelist checks — `Tech`, `İş` banned (Session 31/32 lessons). Category length ≥3 char.

| Locale | Topic | Category | Length | Whitelist | Status |
|---|---|---|---|---|---|
| AZ | 1 | Dünya | 5 | OK | OK |
| AZ | 2 | İqtisadiyyat | 12 | OK | OK |
| AZ | 3 | Texnologiya | 11 | OK | OK |
| AZ | 4 | İqtisadiyyat | 12 | OK | OK |
| AZ | 5 | Dünya | 5 | OK | OK |
| AZ | 6 | Dünya | 5 | OK | OK |
| AZ | 7 | İdman | 5 | OK | OK |
| AZ | 8 | İqtisadiyyat | 12 | OK | OK |
| AZ | 9 | İqtisadiyyat | 12 | OK | OK |
| AZ | 10 | Dünya | 5 | OK | OK |
| EN | 1 | World | 5 | OK | OK |
| EN | 2 | Economy | 7 | OK | OK |
| EN | 3 | Technology | 10 | OK | OK (not `Tech`) |
| EN | 4 | Business | 8 | OK | OK |
| EN | 5 | World | 5 | OK | OK |
| EN | 6 | World | 5 | OK | OK |
| EN | 7 | Sports | 6 | OK | OK |
| EN | 8 | Business | 8 | OK | OK |
| EN | 9 | Business | 8 | OK | OK |
| EN | 10 | World | 5 | OK | OK |
| TR | 1 | Dünya | 5 | OK | OK |
| TR | 2 | Ekonomi | 7 | OK | OK |
| TR | 3 | Teknoloji | 9 | OK | OK |
| TR | 4 | Ekonomi | 7 | OK | OK |
| TR | 5 | Dünya | 5 | OK | OK |
| TR | 6 | Dünya | 5 | OK | OK |
| TR | 7 | Spor | 4 | OK | OK (not `İş`) |
| TR | 8 | Ekonomi | 7 | OK | OK |
| TR | 9 | Ekonomi | 7 | OK | OK |
| TR | 10 | Dünya | 5 | OK | OK |
| RU | 1 | Мир | 3 | OK | OK (min 3-char met) |
| RU | 2 | Экономика | 9 | OK | OK |
| RU | 3 | Технологии | 10 | OK | OK |
| RU | 4 | Экономика | 9 | OK | OK |
| RU | 5 | Мир | 3 | OK | OK |
| RU | 6 | Мир | 3 | OK | OK |
| RU | 7 | Спорт | 5 | OK | OK |
| RU | 8 | Экономика | 9 | OK | OK |
| RU | 9 | Экономика | 9 | OK | OK |
| RU | 10 | Мир | 3 | OK | OK |

Cross-locale category mapping (consistent per topic):
- Topic 1: Dünya / World / Dünya / Мир — consistent
- Topic 2: İqtisadiyyat / Economy / Ekonomi / Экономика — consistent
- Topic 3: Texnologiya / Technology / Teknoloji / Технологии — consistent
- Topic 4: İqtisadiyyat / **Business** / Ekonomi / Экономика — EN uses Business while AZ/TR/RU use Economy; whitelist-valid but slight inconsistency (not BLOCKING per rules)
- Topic 5: Dünya / World / Dünya / Мир — consistent
- Topic 6: Dünya / World / Dünya / Мир — consistent
- Topic 7: İdman / Sports / Spor / Спорт — consistent
- Topic 8: İqtisadiyyat / **Business** / Ekonomi / Экономика — same EN-only deviation
- Topic 9: İqtisadiyyat / **Business** / Ekonomi / Экономика — same
- Topic 10: Dünya / World / Dünya / Мир — consistent

Note: Topics 4/8/9 EN uses `Business` (valid whitelist) while sibling locales use Economy-equivalent. Not BLOCKING per spec (both whitelist-valid), but flagged as potential cross-locale category consistency MINOR if taxonomy requires strict mapping.

## Content Length

Threshold: 1500-2300 heuristic; <500 BLOCKING, <1500 MINOR, >2500 MINOR. Measured on extracted `content: \`...\`` blocks.

| Locale | Topic | Chars | Status |
|---|---|---|---|
| AZ | 1 | 1653 | OK |
| AZ | 2 | 1507 | OK |
| AZ | 3 | 1540 | OK |
| AZ | 4 | 1535 | OK |
| AZ | 5 | 1458 | **MINOR (<1500)** |
| AZ | 6 | 1579 | OK |
| AZ | 7 | 1548 | OK |
| AZ | 8 | 1576 | OK |
| AZ | 9 | 1545 | OK |
| AZ | 10 | 1601 | OK |
| EN | 1 | 1934 | OK |
| EN | 2 | 1790 | OK |
| EN | 3 | 1981 | OK |
| EN | 4 | 1774 | OK |
| EN | 5 | 1863 | OK |
| EN | 6 | 1772 | OK |
| EN | 7 | 1810 | OK |
| EN | 8 | 1732 | OK |
| EN | 9 | 1828 | OK |
| EN | 10 | 1913 | OK |
| TR | 1 | 1728 | OK |
| TR | 2 | 1736 | OK |
| TR | 3 | 1828 | OK |
| TR | 4 | 1739 | OK |
| TR | 5 | 1631 | OK |
| TR | 6 | 1730 | OK |
| TR | 7 | 1715 | OK |
| TR | 8 | 1703 | OK |
| TR | 9 | 1727 | OK |
| TR | 10 | 1709 | OK |
| RU | 1 | 1580 | OK |
| RU | 2 | 1693 | OK |
| RU | 3 | 1586 | OK |
| RU | 4 | 1829 | OK |
| RU | 5 | 1799 | OK |
| RU | 6 | 1872 | OK |
| RU | 7 | 1562 | OK |
| RU | 8 | 1901 | OK |
| RU | 9 | 1523 | OK |
| RU | 10 | 1525 | OK |

## locale Field

Verified every article includes explicit `locale: 'az'|'en'|'tr'|'ru'` field:
- AZ 10/10 — all `locale: 'az'` OK
- EN 10/10 — all `locale: 'en'` OK
- TR 10/10 — all `locale: 'tr'` OK
- RU 10/10 — all `locale: 'ru'` OK

## Verdict

**6 BLOCKING** (all AZ title >75), **4 MINOR** (AZ title 60-75 × 3, AZ content <1500 × 1).

Status: **FIX REQUIRED** — AZ titles for Topics 3, 4, 7, 8, 9, 10 must be shortened to ≤75 characters before integration. All other structure checks pass: slugs unique and regex-valid, dates aligned, categories whitelisted (no `Tech`/`İş`), locale fields present, content mostly within range.
