# QA-C (Source-Fact Reconciliation) Report — 2026-04-25

## Summary
- Total articles: 36 (9 topics x 4 locales)
- BLOCKING fabrications: 4
- MINOR soft-framings: 11

---

## BLOCKING Fabrications

### EN-T9-NHL (Hurricanes-Senators)
**Article:** `en-nhl-stanley-cup-playoffs-april-25-hurricanes-stars-flyers`
**Fabricated claim:** "The 3-0 series lead means Ottawa came into the night needing wins in four straight games to advance, an exit-margin scenario teams have rarely escaped in the modern playoff era."
**Why fabricated:** The math itself is correct logic, but the qualitative editorial assertion "an exit-margin scenario teams have rarely escaped in the modern playoff era" is not in the brief and was not attributed to any source. This is a soft-extrapolation but borderline — it implies a statistical fact (rare comebacks from 0-3) that the brief never supplies.
**Severity reassessment:** This is closer to MINOR (general sports knowledge — true statement that 0-3 comebacks are rare) but no source is cited. Reclassifying as MINOR.

### TR-T9-NHL (Carolina sweep characterization)
**Article:** `tr-nhl-play-off-25-nisan-hurricanes-stars-flyers-1-tur`
**Fabricated claim:** "Carolina'nın bu galibiyetle ikinci tura yükselmesi, ilk turun en hızlı tamamlanan serisi olma özelliğini taşıyor olacak."
**Why fabricated:** The brief does not state Carolina's potential sweep would be "the fastest-completed series of the first round." This is invented context — other series may have already been swept earlier (and the brief explicitly notes Friday's slate had different matchups). Could mislead readers about facts not in the brief.
**Suggested fix:** Replace with brief-supported framing: "Eğer Hurricanes maçı kazanırsa seriyi 4-0 ile bitirerek ikinci tura yükselecek." Remove "ilk turun en hızlı tamamlanan serisi" claim.

### TR-T9-NHL (Stars-Wild qualitative claim)
**Article:** `tr-nhl-play-off-25-nisan-hurricanes-stars-flyers-1-tur`
**Fabricated claim:** "İki takım arasındaki seri play-off'ların en dengeli serilerinden biri olarak dikkat çekiyor; her iki takım da yüksek tempolu, fiziksel buz hokeyi sergiliyor."
**Why fabricated:** The brief contains zero qualitative description of the Stars-Wild series style of play. "En dengeli serilerinden biri," "yüksek tempolu, fiziksel buz hokeyi sergiliyor" is invented commentary not present in any source.
**Suggested fix:** Remove the sentence entirely or replace with: "Maç saat 17.30'da başlıyor; Stars seriyi 3-1'e taşımak için sahaya çıkıyor."

### TR-T9-NHL (Penguins-Flyers "Pennsylvania Derby")
**Article:** `tr-nhl-play-off-25-nisan-hurricanes-stars-flyers-1-tur`
**Fabricated claim:** "Bu, NHL'nin en eski rekabetlerinden biri olan 'Pennsylvania Derby'nin play-off versiyonunu temsil ediyor."
**Why fabricated:** The "Pennsylvania Derby" framing for Penguins-Flyers is NOT mentioned in the brief and is not attributed to any cited source. While the rivalry is real in general sports knowledge, characterizing it as "NHL'nin en eski rekabetlerinden biri" is also unsupported (the rivalry began in 1967 — far from one of the oldest in the NHL, which has Original Six rivalries from 1942).
**Suggested fix:** Remove the sentence. Replace with: "Flyers seride 3-0 önde, dördüncü maçı kazanırsa Penguins'i süpürerek ikinci tura yükselecek."

### TR-T9-NHL (Stars-Wild specbrigade detail)
**Article:** `tr-nhl-play-off-25-nisan-hurricanes-stars-flyers-1-tur`
**Fabricated claim:** "Komandalar göstərdiyi düzen sahip; özel takımlarda ayrılıyor" — actually written as "Takımlar sopostavimyy seviye gösteriyor ve ayrılıyor minimal detaylarla özel brigadalarda" — the line "Komandalar göstər... özel təşkilatlarda fərqlənir" claim about special teams.
**Re-examined:** The TR text says "Команды показывают сопоставимый уровень и расходятся минимальными деталями в спецбригадах" (in RU) and similar in TR. But this line was a different language. Let me re-confirm in TR: actual TR text reads: "İki takım arasındaki seri play-off'ların en dengeli serilerinden biri olarak dikkat çekiyor; her iki takım da yüksek tempolu, fiziksel buz hokeyi sergiliyor."
**Status:** Already covered in the prior block above.

### RU-T9-NHL (Stars-Wild specbrigade detail)
**Article:** `ru-nhl-pley-off-25-aprelya-hurricanes-stars-flyers-1-raund`
**Fabricated claim:** "Команды показывают сопоставимый уровень и расходятся минимальными деталями в спецбригадах."
**Why fabricated:** "В спецбригадах" (special teams — power play / penalty kill) detail is invented. The brief contains no analytical breakdown of the Stars-Wild series structure, special teams play, or qualitative parity assessment.
**Suggested fix:** Remove the sentence. The basic facts (Dallas leads 2-1, Game 4 in Minnesota, 5:30 ET) are sufficient.

### RU-T9-NHL (Caroline elimination scenario)
**Article:** `ru-nhl-pley-off-25-aprelya-hurricanes-stars-flyers-1-raund`
**Fabricated claim:** "«Оттаве», напротив, приходится играть на удержание сезона: четвёртое поражение подряд означает мгновенное прощание с плей-офф."
**Why fabricated:** The math is correct (a fourth straight loss = elimination), but characterizing it dramatically as "play on retention of the season" and "instant farewell" is editorial color not in the brief. This is a soft-extrapolation, not a fabricated fact.
**Severity reassessment:** MINOR (correct math, dramatic framing only).

---

## Re-classified BLOCKING (final list after triage)

After re-examination, only the following rise to true BLOCKING (invented facts/claims not derivable from the brief):

### BLOCKING #1 — TR-T9-NHL: Carolina "fastest-completed series" claim
**Article:** `tr-nhl-play-off-25-nisan-hurricanes-stars-flyers-1-tur`
**Fabricated claim:** "Carolina'nın bu galibiyetle ikinci tura yükselmesi, ilk turun en hızlı tamamlanan serisi olma özelliğini taşıyor olacak."
**Why fabricated:** Asserts a comparative ranking ("fastest-completed series of the first round") not supported by the brief. The brief notes two potential sweeps the same night (CAR-OTT and PHI-PIT) and a Friday slate with different matchups whose status (sweep or not) is not detailed for 04-25's frame. Cannot verify "fastest" claim from any cited source.
**Suggested fix:** Remove the comparative ranking. Use: "Eğer Hurricanes maçı kazanırsa seriyi 4-0 ile bitirerek ikinci tura yükselecek."

### BLOCKING #2 — TR-T9-NHL: "Pennsylvania Derby" + "one of NHL's oldest rivalries"
**Article:** `tr-nhl-play-off-25-nisan-hurricanes-stars-flyers-1-tur`
**Fabricated claim:** "Bu, NHL'nin en eski rekabetlerinden biri olan 'Pennsylvania Derby'nin play-off versiyonunu temsil ediyor."
**Why fabricated:** No source in the brief uses the phrase "Pennsylvania Derby" for Penguins-Flyers, and the descriptor "one of NHL's oldest rivalries" is factually questionable (Penguins joined NHL in 1967; Flyers in 1967). Both invented context and contestable claim.
**Suggested fix:** Remove the sentence entirely. Replace with: "Flyers seride 3-0 önde olduğu için galibiyet onları ikinci tura taşıyacak."

### BLOCKING #3 — TR-T9-NHL: Stars-Wild "high-tempo, physical hockey" qualitative description
**Article:** `tr-nhl-play-off-25-nisan-hurricanes-stars-flyers-1-tur`
**Fabricated claim:** "her iki takım da yüksek tempolu, fiziksel buz hokeyi sergiliyor."
**Why fabricated:** Brief contains no qualitative description of how either team plays. Pure invented commentary.
**Suggested fix:** Remove. Use only schedule + series state facts from brief.

### BLOCKING #4 — RU-T9-NHL: Stars-Wild "special teams" detail
**Article:** `ru-nhl-pley-off-25-aprelya-hurricanes-stars-flyers-1-raund`
**Fabricated claim:** "Команды показывают сопоставимый уровень и расходятся минимальными деталями в спецбригадах."
**Why fabricated:** "В спецбригадах" (power play/penalty kill nuance) is invented analytical color. The brief gives only schedule and series state, no special-teams data.
**Suggested fix:** Remove the sentence. Keep only: "Это четвёртый матч серии, в которой счёт 2:1 в пользу Далласа."

---

## MINOR Issues

### AZ-T1: Trump cancels Pakistan trip
- "Vaşinqtonun sıxışdırılmaq əvəzinə gözləməyə üstünlük verdiyini göstərir" — soft framing/editorial extrapolation. Brief says "US is comfortable with status quo" — equivalent but rephrased.
- MINOR.

### AZ-T2: Mali
- "Bu, hərbi cuntanın 2020-ci ildə hakimiyyəti ələ aldığı vaxtdan bəri ölkəyə qarşı ən mürəkkəb hücum hesab olunur." — Brief says "potentially the most complex assault since the junta seized power" — date "2020" is correct historical context (Goita's first coup) but the brief itself does not give the year. MINOR (factually accurate but year detail extrapolated from external knowledge).

### AZ-T3: Russia 666
- "yaralananlar arasında 9 yaşında uşaq və iki polis əməkdaşı var" — accurate per brief; correctly attributed.
- "91 faizlik tutma göstəricisi isə Ukrayna hava müdafiəsinin keyfiyyət dinamikasını ortaya qoyur" — soft editorial framing. MINOR.

### AZ-T4: Zelenskyy Aliyev
- "Bakı Pakistan trekinin uğursuzluğu fonunda özünü potensial sülh vasitəçisi kimi mövqeləndirir" — direct rephrasing of brief's editorial angle. OK, not fabrication.

### AZ-T7: Anzac Day
- "Atatürk tərəfindən deyilmiş" — Brief says "Atatürk's 1934 tribute," writer says "1934-cü ildə Mustafa Kamal Atatürk tərəfindən deyilmiş" — date matches brief. OK.
- "90 il ərzində" — soft editorial flourish (1934 to 2026 = 92 years; close enough for editorial color but mild imprecision). MINOR.

### AZ-T8: Manchester City
- "oyun uzun müddət darıxdırıcı keçib" ("the match was boring for long stretches") — editorial color/intensification not in brief. MINOR.

### EN-T6: Italy Liberation Day
- "remarks read as a pointed reference amid the ongoing Iran war" — paraphrases brief's editorial angle. OK.

### EN-T7: Anzac Day
- "the founder of modern Turkey" — descriptor for Atatürk added by writer; not in brief but factually accurate context. MINOR.
- "wartime adversaries became, in Atatürk's words, sons of the same soil" — paraphrased extension of the Atatürk quote. The brief gives the actual partial quote ("there is no difference between the Johnnies and the Mehmets"); "sons of the same soil" is a writer-added paraphrase. MINOR — rhetorical extension.

### TR-T1: Trump-Pakistan
- "Bu, Washington'un mevcut abluka ve ateşkes statükosundan rahatsız olmadığını ortaya koyuyor" — direct rendering of brief's editorial angle. OK.

### TR-T6: Italy Liberation Day
- "Açıklama, sürmekte olan İran savaşına dolaylı bir gönderme olarak yorumlandı" — paraphrases brief's editorial framing. OK.
- "Mattarella'nın söylemi, kutlamanın yalnızca tarihi bir anma değil, güncel dünya çatışmaları üzerine bir politik mesaj da içerdiğini gösterdi" — editorial extrapolation. MINOR.

### TR-T7: Anzac Day
- Atatürk quote rendered as: "Bizim için Mehmetçik ile Johnny arasında hiçbir fark yoktur" — Brief gives English version: "there is no difference between the Johnnies and the Mehmets". The TR rendering matches the spirit but uses singular "Mehmetçik" + "Johnny" (vs. plural "Johnnies and Mehmets" in the original). This is a translation choice, not a fabrication.
- "Atatürk'ün anma sözleri, ANZAC kuşağının yıllardır en güçlü uzlaşma sembollerinden biri olmaya devam ediyor" — editorial color. MINOR.

### TR-T7: Anzac Day - "Balikatan 2026" spelling
- TR text: "Balikatan 2026" → correct. (Note: RU writes "Балитакан" — likely a transliteration variation but acceptable.)

### TR-T8: Manchester City
- "City'nin Wembley'deki son dakika klasiğine yeni bir bölüm ekledi" — editorial color. MINOR.
- "Cuma günü Premier Lig'de Newcastle'ı 1-0 yenen Arsenal" — brief's "dropped topics" section says Arsenal beat Newcastle 1-0; whether the match was Friday is in the brief. OK.

### RU-T1: Trump-Pakistan
- "продолжение блокады и параллельные удары на ливанском фронте создают высокий риск повторной эскалации в любой момент" — Brief mentions Lebanon ceasefire violations as a dropped topic but does NOT say current Lebanon strikes create "high risk of re-escalation." This is editorial extrapolation tying two topics together.
- BORDERLINE: While both events (Lebanon strikes + Iran blockade) are individually in the brief/dropped topics, asserting their combination "creates high risk of re-escalation in any moment" is the writer's analysis. MINOR (analytical extrapolation, not a fabricated fact).

### RU-T3: Russia 666
- "что свидетельствует о повторном переходе России к стратегии массированных воздушных кампаний" — editorial extrapolation. MINOR.

### RU-T6: Italy Liberation Day
- "пакистанский трек срывается в субботу утром, Россия проводит массированный удар по Украине. На таком фоне формула Маттареллы..." — links three news stories, all individually in brief. OK.

### RU-T7: Anzac Day
- "несмотря на то, что для войск союзников это сражение завершилось тяжёлым поражением" ("even though for the Allied forces this battle ended in a heavy defeat") — Brief contains no characterization of the Gallipoli outcome. While historically accurate, this is added context not in brief.
- MINOR (historically true, but technically added context).

### RU-T7: Anzac Day - "Балитакан 2026"
- Spelling "Балитакан" — should be "Баликатан" (Balikatan). Minor transliteration error, not a fabrication. MINOR.

### RU-T9-NHL: Carolina + "instant farewell"
- "«Оттаве», напротив, приходится играть на удержание сезона: четвёртое поражение подряд означает мгновенное прощание с плей-офф" — dramatic framing, but factually correct logic. MINOR.

---

## Per-Topic Comparison

### Topic 1: Trump cancels Pakistan trip
- AZ: 0 BLOCKING / 1 MINOR
- EN: 0 / 0
- TR: 0 / 0
- RU: 0 / 1

### Topic 2: Mali coordinated attacks
- AZ: 0 / 1
- EN: 0 / 0
- TR: 0 / 0
- RU: 0 / 0

### Topic 3: Russia 666 weapons
- AZ: 0 / 1
- EN: 0 / 0
- TR: 0 / 0
- RU: 0 / 1

### Topic 4: Zelenskyy in Azerbaijan
- AZ: 0 / 0
- EN: 0 / 0
- TR: 0 / 0
- RU: 0 / 0

### Topic 5: Gaza/West Bank elections
- AZ: 0 / 0
- EN: 0 / 0
- TR: 0 / 0
- RU: 0 / 0

### Topic 6: Italy Liberation Day
- AZ: 0 / 0
- EN: 0 / 0
- TR: 0 / 1
- RU: 0 / 0

### Topic 7: Anzac Day
- AZ: 0 / 1
- EN: 0 / 2
- TR: 0 / 1
- RU: 0 / 2

### Topic 8: Manchester City FA Cup
- AZ: 0 / 1
- EN: 0 / 0
- TR: 0 / 1
- RU: 0 / 0

### Topic 9: NHL Playoffs Saturday slate
- AZ: 0 / 0
- EN: 0 / 1
- TR: **3 BLOCKING** / 0
- RU: **1 BLOCKING** / 1

---

## Verdict

**4 BLOCKING fabrications** detected — all in Topic 9 (NHL Playoffs):
1. TR-T9 — Carolina "fastest-completed series of the first round" — invented comparative claim
2. TR-T9 — "Pennsylvania Derby... one of NHL's oldest rivalries" — invented framing + dubious factual assertion
3. TR-T9 — Stars-Wild "high-tempo, physical hockey" — invented qualitative analysis
4. RU-T9 — Stars-Wild "минимальными деталями в спецбригадах" — invented special-teams analysis

**11 MINOR soft-framings** spread across 8 articles — primarily editorial extrapolations and rhetorical color that don't fabricate facts but go slightly beyond brief content.

**Verdict:** **BLOCK** — The 4 BLOCKING fabrications in TR/RU NHL articles must be removed before integration. All fabrications are concentrated in Topic 9, where the writer added invented analytical color (special teams, rivalry framing, qualitative parity claims) to fill the article. Other 35 articles are clean of true fabrications.

**Recommendation for fix:** Topic 9 (TR + RU) writers should rewrite the qualitative/analytical sentences using only brief-supported facts: schedule (3pm/5:30pm/8pm ET), series states (3-0, 2-1, 3-0), basic team locations, and the "two potential sweeps in one night" headline framing already in the brief. All editorial color about playing styles, rivalry naming, and historical comparisons must be removed.

**Topics 1-8 across all four locales:** GO (0 BLOCKING fabrications, only minor editorial framing).
**Topic 9 TR + RU:** BLOCK until fabricated sentences removed.
**Topic 9 AZ + EN:** GO.
