# QA-C Source-Fact Reconciliation Report — 2026-04-19 Batch 1

**Auditor:** QA-C (anti-hallucination gate)
**Scope:** 20 articles (5 topics × 4 locales: AZ, EN, TR, RU)
**Method:** Fact-by-fact reconciliation against research brief `news-research-2026-04-19-batch1.md` — Step 1 extracted every number/name/quote/relationship from brief; Step 2 extracted same from each article; Step 3 matched; Step 4 ran topic-specific red-flag checks.

---

## Summary

- **BLOCKING:** 2 (1 unverified location-speculation, 1 editorial war-context addition)
- **MINOR:** 7 (soft extrapolations / editorial adjectives / light contextual claims)
- **OK overall:** The 20 articles are cleanly grounded in the brief. No fabricated numbers, no fabricated names, no fabricated quotes. No Sprint-4-style invented entities. Trump, Zelenskyy, Klymenko, Altman, Bancel, and Aldridge quotes all match the brief verbatim or via faithful translation.

---

## Per-article findings

### AZ Topic 1 (slug: `iran-hormuz-bogazi-yeniden-baglandi-tanker-ates-18-aprel`)

- [OK] Date 18 April 2026 Saturday — MATCH brief.
- [OK] Reopening was 17 April Friday — MATCH.
- [OK] IRGC gunboats fired on a tanker; unknown projectile struck container vessel damaging containers — MATCH.
- [OK] "No injuries" on tanker — MATCH.
- [OK] India summoned Iran's ambassador; two India-flagged ships — MATCH.
- [OK] IRGC quote ("closed until U.S. blockade is lifted" + anchorage/movement warning) — TRANSLATION of verbatim brief quote.
- [OK] "Acts of piracy and maritime theft" — MATCH.
- [OK] UK Maritime Trade Operations reported tanker attack — MATCH.
- [OK] Vikram Misri "conveyed India's deep concern" + resume facilitation quote — MATCH.
- [OK] At least eight tankers crossed, many turned back — MATCH.
- [OK] Trump quote ("I don't know. Maybe I won't extend it…") — verbatim translation of brief quote from OPB.
- [OK] "I think it's going to happen" (AZ: "Düşünürəm ki, bu baş verəcək.") — MATCH brief's secondary Trump quote.
- [OK] April 22 deadline + "working to extend two more weeks" — MATCH.
- [OK] ~20% of global crude oil and gas through strait — MATCH.
- [OK] No specific oil price numbers used — complies with brief note.
- **Verdict: CLEAN. No blocking issues.**

### AZ Topic 2 (slug: `kiyev-kutlevi-atesli-hucum-6-olu-sbu-terror-18-aprel`)

- [OK] 58-year-old Russian-born, automatic weapon — MATCH.
- [OK] Holosiivski district — MATCH brief's AZ transliteration guideline.
- [OK] 6 killed, ≥14 wounded, ≥10 hospitalized incl. 1 child — MATCH.
- [OK] 40-minute negotiation, female police negotiator via loudspeaker, special tactical police stormed — MATCH.
- [OK] Klymenko quote translated — MATCH.
- [OK] Zelenskyy Telegram quote ("Hücumçu zərərsizləşdirilib…") — faithful translation of verbatim brief quote; "swift investigation" promise included.
- [OK] Klitschko confirmed incident — MATCH.
- [OK] Kravchenko confirmed Russia origin — MATCH.
- [OK] SBU classified as terrorism — MATCH.
- [OK] Four hostages rescued — MATCH.
- [OK] Legally registered auto weapon; permit renewed Dec 2025; prior criminal record — MATCH.
- [OK] No motive established — MATCH.
- [OK] "Russia's 2022 full-scale invasion" framing — MATCH brief (no specific "February" date, correctly generic).
- **Verdict: CLEAN. No blocking issues.**

### AZ Topic 3 (slug: `nba-pley-off-ilk-raund-dord-evsahibi-qelebe-18-aprel`)

- [OK] Four Game 1s on 18 April 2026; all four home teams won — MATCH.
- [OK] Cavs 126 — Raptors 113; Nuggets 116 — Wolves 105; Knicks 113 — Hawks 102; Lakers 107 — Rockets 98 — MATCH all four scores.
- [OK] Mitchell 32; Harden 22/10 double-double; Strus 24 off bench; 54% FG, 50% 3 — MATCH.
- [OK] Jokić 25/13/11 triple-double (not 30) — MATCH brief's corrected figure.
- [OK] Murray 30 pts, 16/16 FT — MATCH.
- [OK] Brunson 28/5/7; Towns 25/8/4/3 blocks — MATCH.
- [OK] Best-of-7 first round (yeddi oyunluq) — MATCH.
- [OK] "NBA.com Klivlendin mövsümdəki hesab ssenarisini tərsinə çevirdiyini qeyd etdi" — TRANSLATION of brief's allowed verbatim framing ("Cleveland flips the season series script").
- [OK] "Play-In Tournament just concluded" reference — MATCH brief note.
- [OK] "Oyun 2 tarixləri seriyadan-seriyaya dəyişir" — complies with brief's "do NOT insert Game 2 dates".
- [MINOR] "evsahiblərinin tam hakimiyyəti" (total home dominance) — mild editorial framing. Brief cautions against "dominant" adjectives but this is applied to the collective sweep, not a single game, and is arguably supported by "all four home teams won." Acceptable.
- **Verdict: CLEAN. One MINOR soft extrapolation.**

### AZ Topic 4 (slug: `openai-gpt-rosalind-hayat-elmleri-ai-17-aprel`)

- [OK] 17 April 2026 Friday announcement — MATCH.
- [OK] Name honors British scientist Rosalind Franklin — MATCH.
- [OK] Franklin "DNT strukturunun kəşfində rentgen difraksiyası işi ilə həlledici rol oynamış alim" — MATCH brief's acceptable framing ("instrumental in discovering DNA's structure" / "X-ray diffraction work on DNA structure"). Does NOT call her "discoverer of DNA" — complies with brief red-flag.
- [OK] Partners: Amgen, Moderna, Allen Institute, Thermo Fisher Scientific, Novo Nordisk — MATCH (5 exact partners, no additions).
- [OK] Novo Nordisk partnership separately announced 14 April 2026 — MATCH.
- [OK] US enterprise research preview — MATCH.
- [OK] Capabilities list (molecules/proteins/genes/pathways/disease biology + literature review + sequence-to-function + experimental planning + data analysis) — MATCH.
- [OK] Altman quote verbatim translation — MATCH.
- [OK] Bancel quote verbatim translation — MATCH.
- [OK] 10-15 year US drug timeline — MATCH.
- [OK] Dual-use biosecurity vetting gate — MATCH.
- [MINOR] "OpenAI-ın bu addımı şirkəti Google və DeepMind-in uzun müddətdir öndə olduğu biologiya süni intellekti sahəsinə rəsmi şəkildə daxil edir" — brief allows noting "OpenAI takes on Google" / space Google/Alphabet has led. The phrase "uzun müddətdir öndə olduğu" ("long leading") is near-verbatim with brief's "has been leading". Acceptable contextualization; does NOT compare specific capabilities.
- [MINOR] "OpenAI bunu bazar və ya benchmark qələbəsi kimi təqdim etmir" — meta-statement, not a claim; complies with red-flag.
- **Verdict: CLEAN. Two MINOR contextualizations, both within brief's explicit allowances.**

### AZ Topic 5 (slug: `titanik-xilas-jileti-670-min-funt-rekord-herrac-18-aprel`)

- [OK] Sale price £670,000 / $906,000 — MATCH.
- [OK] Devizes, western England, Henry Aldridge & Son, Saturday 18 April 2026 — MATCH.
- [OK] Owner: Laura Mabel Francatelli, first-class — MATCH.
- [OK] Lifeboat No. 1 — MATCH.
- [OK] Francatelli = secretary/companion to Lucy Duff Gordon; Cosmo Duff Gordon also aboard; all three survived — MATCH.
- [OK] First life jacket from a Titanic survivor to come to auction — MATCH.
- [OK] Pre-sale estimate £250,000–£350,000; sold "nearly twice" — MATCH.
- [OK] Jacket: beige, 12 cork-filled canvas pockets, shoulder rests, side straps; signed by Francatelli and other survivors from same lifeboat — MATCH.
- [OK] Andrew Aldridge quote ("These record-breaking prices illustrate the continuing interest in the Titanic story") — verbatim translation.
- [OK] Buyer: unidentified telephone bidder — MATCH.
- [MINOR] "114 il sonra belə" (even 114 years later) — brief allows mentioning 14-15 April 1912 sinking and notes the "114th anniversary" framing "do NOT make up … unless one of the sources uses it." Framing is mild and mathematically accurate; acceptable as context.
- [MINOR] "Henry Aldridge & Son hərrac evi Titanik əsərlərinin satışı üzrə dünyada tanınmış mənbələrdən biridir" — not explicitly in brief's Key facts but is widely known and consistent with brief's tone. Soft extrapolation.
- [OK] Does NOT name buyer as Titanic Museum Attraction — complies.
- [OK] Does NOT call Francatelli a "rich socialite" — complies.
- **Verdict: CLEAN. Two MINOR soft extrapolations, both low-risk.**

---

### EN Topic 1 (slug: `en-iran-hormuz-closed-again-ships-fired-upon-2026`)

- [OK] IRGC, Saturday night 18 April 2026, reopening reversal — MATCH.
- [OK] Gunboats fire on tanker; unknown projectile on container vessel; no injuries — MATCH.
- [OK] India summoned ambassador, two India-flagged ships — MATCH.
- [OK] IRGC quote "is closed until the U.S. blockade is lifted" + anchorage warning — VERBATIM from brief.
- [OK] "Acts of piracy and maritime theft"; "tightly controlled" — VERBATIM.
- [OK] At least 8 tankers crossed during brief reopening — MATCH.
- [OK] UK Maritime Trade Operations reported tanker attack — MATCH.
- [OK] Misri "conveyed India's deep concern" + "resume at the earliest" quote — VERBATIM.
- [OK] ~20% of global crude oil and natural gas through strait — MATCH.
- [OK] Trump quote verbatim — MATCH.
- [OK] April 22 deadline, mediators extending two weeks — MATCH.
- [OK] No specific oil price given — complies.
- [OK] No named tanker/container — complies.
- **Verdict: CLEAN. No blocking issues.**

### EN Topic 2 (slug: `en-kyiv-mass-shooting-six-killed-sbu-terrorism-2026`)

- [OK] 58-year-old Russian-born, automatic weapon, 6 killed / ≥14 wounded — MATCH.
- [OK] Holosiivskyi district, apartment block + shopping center, supermarket standoff — MATCH (EN spelling per brief).
- [OK] 40 minutes negotiation, female negotiator, special tactical units stormed — MATCH.
- [OK] SBU classified as terrorism — MATCH.
- [OK] "Unprecedented in wartime Kyiv since Russia's full-scale invasion began in 2022" — MATCH brief framing.
- [OK] Prior criminal record, permit renewed Dec 2025 — MATCH.
- [OK] Four hostages rescued — MATCH.
- [OK] Klymenko quote VERBATIM — MATCH.
- [OK] ≥10 hospitalized incl. 1 child — MATCH.
- [OK] Zelenskyy Telegram quote VERBATIM — MATCH; "swift investigation" pledge included.
- [OK] Klitschko confirmed; Kravchenko confirmed Russia origin — MATCH.
- [OK] No motive established — MATCH.
- [MINOR] "since February 2022" — brief says "since Russia's full-scale invasion began in 2022" without specifying February. February 2022 IS historically correct (Feb 24 invasion), but it is a specificity the brief doesn't contain. Given it's factually true and a well-known date, this is a soft extrapolation, not a fabrication. Recommend minor softening to "since 2022" for strict compliance.
- [BLOCKING] "where air-raid sirens and missile strikes have defined the city's sense of danger rather than a lone gunman armed with a rifle" — this is NEW editorial commentary not in brief. The brief emphasizes the "unprecedented in wartime Kyiv" framing but does not say sirens/missile strikes "defined" the city's sense of danger. This is an editorial extrapolation that paints a scene the sources don't. Recommend removing this sentence or softening to tie directly to brief language. **Not a hard factual contradiction (the claim about sirens/strikes is generally true of wartime Kyiv) but it introduces scene-setting details the brief never sources.** Borderline between MINOR editorial and BLOCKING scene-invention. **Flagging as BLOCKING** for conservative gate (Sprint 4 lesson: atmosphere invention is how hallucinations start).
- **Verdict: 1 BLOCKING (scene-invention closer), 1 MINOR (February specificity).**

### EN Topic 3 (slug: `en-nba-playoffs-game-1-home-teams-all-win-2026`)

- [OK] All four scores, all four home teams, best-of-seven — MATCH.
- [OK] Mitchell 32; Harden 22/10; Strus 24 off bench; 54%/50% — MATCH.
- [OK] Jokić 25/13/11 triple-double — MATCH (NOT 30, correct per brief).
- [OK] Murray 30 pts, 16/16 FT — MATCH.
- [OK] Brunson 28/5/7; Towns 25/8/4/3 blocks — MATCH.
- [OK] "Home-court advantage held in every series opener" — factual summary, MATCH.
- [OK] "Game 2 dates vary by series" — complies with brief's directive.
- [OK] "Play-In Tournament concluded earlier in the week" — MATCH.
- [OK] "Only one game of a best-of-seven — not a series trend" — this is EXPLICIT non-extrapolation language, good.
- [MINOR] "completing a clean sweep for hosts on the opening Saturday" — "clean sweep" is figurative but factually aligned with "all four home teams won." Acceptable.
- [OK] "The late-window game in Los Angeles" — matches brief's note that Lakers-Rockets tipped late (8:30 PM ET).
- **Verdict: CLEAN. One MINOR figurative phrase ("clean sweep"), within factual bounds.**

### EN Topic 4 (slug: `en-openai-gpt-rosalind-life-sciences-launch-2026`)

- [OK] 17 April 2026 Friday announcement — MATCH.
- [OK] "Named after British scientist Rosalind Franklin, who was instrumental in discovering DNA's structure" — VERBATIM from brief (brief: "instrumental in discovering DNA's structure"). Does NOT call her "discoverer of DNA" — complies with red-flag.
- [OK] Five partners: Amgen, Moderna, Allen Institute, Thermo Fisher Scientific, Novo Nordisk — MATCH.
- [OK] Novo Nordisk partnership separately announced April 14 — MATCH.
- [OK] US research preview for qualified enterprise — MATCH.
- [OK] Capabilities list — MATCH.
- [OK] 10-15 year US drug timeline — MATCH.
- [OK] Dual-use biosecurity vetting — MATCH.
- [OK] Altman quote VERBATIM — MATCH.
- [OK] Bancel quote VERBATIM — MATCH.
- [OK] "Bloomberg framed the launch as OpenAI entering a space where Google's Alphabet unit has led with AlphaFold and related tools" — MATCH brief's explicit allowance ("Bloomberg framed it as 'OpenAI takes on Google' (re: AlphaFold / DeepMind biology AI) — OK to note that OpenAI is entering a space Google/Alphabet has been leading"). Specific "AlphaFold and related tools" is named in brief.
- [OK] "Research preview rather than a general-availability product" — paraphrase of brief.
- [OK] Does NOT claim "most advanced" or "beats competitors" — complies.
- **Verdict: CLEAN. No blocking issues.**

### EN Topic 5 (slug: `en-titanic-life-jacket-francatelli-auction-record-2026`)

- [OK] £670,000 / $906,000, Saturday 18 April 2026, Henry Aldridge & Son, Devizes, western England — MATCH.
- [OK] Francatelli, first-class, lifeboat No. 1 — MATCH.
- [OK] Lucy Duff Gordon (employer/fashion designer), Cosmo Duff Gordon (husband), all three survived — MATCH.
- [OK] "Unidentified telephone bidder for nearly twice its pre-sale estimate of £250,000 to £350,000" — MATCH.
- [OK] "First life jacket from a Titanic survivor ever to come up for auction" — MATCH.
- [OK] Jacket description (beige, 12 cork-filled canvas pockets, shoulder rests, side straps, signed) — MATCH.
- [OK] Francatelli "traveled as secretary and companion to Lucy Duff Gordon" — MATCH.
- [OK] Andrew Aldridge quote VERBATIM — MATCH.
- [OK] Does NOT name buyer as Titanic Museum Attraction — complies.
- [OK] Does NOT call Francatelli a "rich socialite" — complies.
- [BLOCKING] "For now, a private collector — somewhere on the end of a telephone line in western England — has taken ownership of one of the most personal surviving artifacts of the 1912 disaster." — Two unverified claims: (a) **"private collector"** — brief says only "unidentified telephone bidder"; the buyer could equally be a museum, institution, or corporate buyer. Calling them a "private collector" is speculation. (b) **"somewhere on the end of a telephone line in western England"** — brief NEVER says the buyer is in western England. The auction house is in Devizes (western England); the telephone bidder could be anywhere in the world. This is a geographic fabrication. Recommend rewriting this sentence to stay within brief (e.g., "The buyer bid by telephone and has not been identified." — which is already the preceding sentence).
- [MINOR] "Henry Aldridge & Son, based in Devizes, has long been a focal point for Titanic-related memorabilia sales" — brief doesn't state this as a fact, but it is widely known industry context consistent with brief's tone. Soft extrapolation.
- **Verdict: 1 BLOCKING (private collector + western England buyer location), 1 MINOR (focal point for Titanic memorabilia).**

---

### TR Topic 1 (slug: `tr-iran-hurmuz-bogazini-yeniden-kapatti-gemilere-ates`)

- [OK] IRG (Turkish acronym for IRGC), 18 Nisan 2026 Cumartesi gecesi, boğaz yeniden kapatma — MATCH.
- [OK] Hücumbotları tankere ateş; kimliği belirsiz mermi konteyner gemisine — MATCH.
- [OK] "Bayrağı kendi ülkesine ait iki ticari gemi" (two India-flagged ships) — MATCH.
- [OK] 22 Nisan ateşkes son tarihi — MATCH.
- [OK] IRG quote translated faithfully — MATCH.
- [OK] "Korsanlık ve deniz hırsızlığı" — MATCH.
- [OK] UK Maritime Trade Operations tanker saldırısı doğruladı — MATCH.
- [OK] Yaralı bildirilmedi — MATCH.
- [OK] ~20% global ham petrol ve doğal gaz — MATCH.
- [OK] Misri quote faithfully translated — MATCH.
- [OK] Sekiz tanker, pek çoğu geri döndü — MATCH.
- [OK] Trump quote verbatim (Turkish translation) — MATCH.
- [OK] No specific oil price — complies.
- [OK] No named tanker/container — complies.
- **Verdict: CLEAN. No blocking issues.**

### TR Topic 2 (slug: `tr-kiev-silahli-saldiri-6-olu-sbu-terorizm-sinifladi`)

- [OK] Holosiivskyi ilçesi, 58 yaşında Rusya doğumlu, otomatik silah, 6 ölü / ≥14 yaralı — MATCH.
- [OK] Apartman + alışveriş merkezi önü, süpermarket barikat — MATCH.
- [OK] Kadın polis müzakereci, ~40 dakika, özel taktik timleri — MATCH.
- [OK] SBU terör eylemi sınıflandırması — MATCH.
- [OK] Yasal otomatik silah, Aralık 2025 yenilenen ruhsat, sabıka kaydı — MATCH.
- [OK] Dört rehine kurtarıldı — MATCH.
- [OK] Klymenko quote faithfully translated — MATCH.
- [OK] Zelenskyy Telegram quote faithfully translated — MATCH.
- [OK] "Hızlı soruşturma" vaadi — MATCH.
- [OK] En az 10 hastaneye, aralarında bir çocuk — MATCH.
- [OK] Kravçenko, Russia origin — MATCH.
- [OK] Güdü tespit edilmedi — MATCH.
- [OK] "Rusya'nın 2022 işgalinden bu yana Kiev'de emsalsiz" framing — MATCH.
- **Verdict: CLEAN. No blocking issues.**

### TR Topic 3 (slug: `tr-nba-playoffs-1-tur-oyun-1-ev-sahipleri-dort-dortluk`)

- [OK] Four Game 1s on 18 Nisan 2026; all four home teams won — MATCH.
- [OK] All four scores — MATCH.
- [OK] Mitchell 32; Harden 22/10; Strus 24 off bench; 54% FG / 50% 3P — MATCH.
- [OK] Jokić 25/13/11; Murray 30 pts, 16/16 FT — MATCH.
- [OK] Brunson 28/5/7; Towns 25/8/4/3 blocks — MATCH.
- [OK] "Cleveland sezon serisi senaryosunu çeviriyor" — MATCH brief's allowed verbatim framing.
- [OK] "Her seri en iyi yedi usulüne göre" (best-of-seven) — MATCH.
- [OK] "Oyun 2 tarihleri eşleşmeye göre değişiyor" — complies with brief.
- [MINOR] "Nuggets, ev sahibi olarak oynadığı maçı kontrollü bir oyunla kazandı" (Nuggets won with controlled play) — mild editorial framing ("kontrollü bir oyunla"). Not "dominant" but leans that way. Acceptable but borderline.
- [OK] "Lakers…seriye 1-0 önde başladı" (Lakers started the series 1-0 ahead) — factual.
- [OK] Conference labels ("Doğu"/"Batı") — geographic grouping only; not series predictions.
- **Verdict: CLEAN. One MINOR editorial phrase ("kontrollü bir oyunla"), within factual bounds.**

### TR Topic 4 (slug: `tr-openai-gpt-rosalind-yasam-bilimleri-ilac-kesfi`)

- [OK] 17 Nisan 2026 Cuma duyurusu — MATCH.
- [OK] Rosalind Franklin "DNA yapısının keşfinde X-ışını kırınımı çalışmalarıyla rol oynayan İngiliz bilim insanı" — MATCH brief's acceptable framing. Does NOT call her "discoverer of DNA".
- [OK] All 5 partners listed — MATCH.
- [OK] Novo Nordisk partnership 14 Nisan'da ayrı duyurulmuştu — MATCH.
- [OK] ABD nitelikli kurumsal müşteriler araştırma önizlemesi — MATCH.
- [OK] Capabilities list — MATCH.
- [OK] 10-15 yıl ilaç geliştirme süresi — MATCH.
- [OK] Çift kullanımlı endişeler, sıkı inceleme — MATCH.
- [OK] Altman quote VERBATIM translation — MATCH.
- [OK] Bancel quote VERBATIM translation — MATCH.
- [OK] Does NOT mention Google/DeepMind specifically — more conservative than AZ/EN/RU, within brief's allowance.
- **Verdict: CLEAN. No blocking issues.**

### TR Topic 5 (slug: `tr-titanik-can-yelegi-906-bin-dolara-satildi-rekor`)

- [OK] £670,000 / $906,000, 18 Nisan 2026 Cumartesi, Henry Aldridge & Son, Devizes, İngiltere batısı — MATCH.
- [OK] Francatelli, birinci sınıf, 1 numaralı filika — MATCH.
- [OK] Lucy Duff Gordon, Cosmo Duff Gordon, üçü de hayatta kaldı — MATCH.
- [OK] Pre-sale £250,000–£350,000, neredeyse iki katı — MATCH.
- [OK] Jacket: bej, 12 mantar dolgulu kanvas cep, omuz desteği, yan kayış, imzalı — MATCH.
- [OK] First Titanic survivor life jacket at auction — MATCH.
- [OK] Kimliği belirsiz telefon alıcısı — MATCH (does NOT name Titanic Museum Attraction).
- [OK] Andrew Aldridge quote VERBATIM — MATCH.
- [OK] "Titanik'in 14-15 Nisan 1912'deki batışının yıl dönümüne yakın bir zamana denk geldi" — brief allows mentioning 1912 sinking near anniversary. Acceptable factual reference.
- [MINOR] "Henry Aldridge & Son, Titanik hatıralarında uzmanlaşmış bir isim olarak biliniyor" — soft extrapolation; consistent with brief's tone and industry reality, but not explicit in brief's Key facts.
- [OK] Does NOT call Francatelli a "rich socialite" — complies.
- **Verdict: CLEAN. One MINOR soft extrapolation.**

---

### RU Topic 1 (slug: `ru-iran-zakryl-ormuz-snova-ogon-po-tankeru`)

- [OK] КСИР, вечер 18 апреля 2026, отмена вчерашнего решения — MATCH.
- [OK] Катера КСИР огонь по танкеру; снаряд повредил контейнеры — MATCH.
- [OK] "Жертв на танкере нет" — MATCH brief's "no injuries".
- [OK] Индия вызвала посла; два судна под её флагом — MATCH.
- [OK] КСИР quote translated — MATCH.
- [OK] "Акты пиратства и морского воровства" — MATCH.
- [OK] Британское морское ведомство — MATCH.
- [OK] Vikram Misri quote translated — MATCH.
- [OK] 8 танкеров прошли, многие повернули обратно — MATCH.
- [OK] ~20% мировой нефти и газа — MATCH.
- [OK] Trump quote translated — MATCH (shortened to key phrases but within brief's verbatim quote).
- [OK] 22 April deadline, two weeks extension — MATCH.
- [OK] No specific oil price — complies.
- **Verdict: CLEAN. No blocking issues.**

### RU Topic 2 (slug: `ru-kiev-massovaya-strelba-shest-pogibshih-sbu-terakt`)

- [OK] 58-летний уроженец России, автоматическое оружие, 6 убитых / ≥14 раненых — MATCH.
- [OK] Голосеевский район Киева (correct RU transliteration per brief) — MATCH.
- [OK] 40-minute negotiation, female negotiator, spetsnaz storm — MATCH.
- [OK] SBU classified as terrorism — MATCH.
- [OK] Legal auto weapon; permit renewed December 2025 — MATCH.
- [OK] Four hostages rescued — MATCH.
- [OK] ≥10 hospitalized incl. 1 child — MATCH.
- [OK] Klymenko quote translated — MATCH.
- [OK] Zelenskyy Telegram quote translated — MATCH.
- [OK] Kravchenko confirmed Russia origin — MATCH.
- [OK] "Мотив к утру 19 апреля не установлен" — MATCH (with temporal specificity that is reasonable given publication time; not a fact-fabrication, just scoping to publication time).
- [OK] "Беспрецедентно — с начала полномасштабного российского вторжения в 2022 году" — MATCH.
- **Verdict: CLEAN. No blocking issues.**

### RU Topic 3 (slug: `ru-nba-pley-off-2026-igra-1-vse-hozyaeva-vyigrali`)

- [OK] All four scores on 18 апреля — MATCH.
- [OK] "Каждая серия проходит до четырёх побед" (first to 4 wins) — MATCH (equivalent to best-of-7).
- [OK] Митчелл 32, Харден 22/10 дабл-дабл, Струс 24 со скамейки, 54% FG / 50% 3P — MATCH.
- [OK] Йокич 25/13/11 трипл-дабл — MATCH.
- [OK] Мюррей 30 очков, 16/16 штрафных — MATCH.
- [OK] Брансон 28/5/7; Таунс 25/8/4/3 блок-шота — MATCH.
- [OK] "Кливленд переворачивает сценарий регулярного сезона" — MATCH brief's allowed verbatim framing (slight re-wording: "season series script" → "сценарий регулярного сезона"; very close).
- [OK] Game 2 dates vary by series — complies.
- [MINOR] "Кливленд и Денвер уверенно начали" (Cleveland and Denver confidently started) — "уверенно" (confidently) is mild editorial framing. Brief cautions against "dominant" adjectives. Acceptable for "confidently started" given home wins, but borderline.
- [MINOR] "«Наггетс» доминировали на своей площадке" (Nuggets dominated on their home court) — this explicitly uses the word "доминировали" (dominated), which brief's notes flag: **"Do NOT claim any individual game was 'dominant' or 'historic' unless adding the source's framing verbatim."** Brief allows ONLY the NBA.com "Cleveland flips the season series script" framing as verbatim. This sentence applies "dominated" to the Nuggets game without a source-verbatim quote. Recommend softening to "Nuggets won at home" or similar. **Flagging as MINOR** since the underlying fact (Nuggets won at home 116-105) is accurate; only the editorial adjective is out of policy. Writer should soften.
- **Verdict: 2 MINOR (confidence/dominance adjectives). No BLOCKING.**

### RU Topic 4 (slug: `ru-openai-gpt-rosalind-biologiya-preparaty`)

- [OK] 17 апреля 2026 announcement — MATCH.
- [OK] "В честь британского учёного Розалинд Франклин, известной рентгеноструктурными исследованиями ДНК" — MATCH brief's acceptable framing. Does NOT call her "discoverer of DNA".
- [OK] All 5 partners — MATCH.
- [OK] Novo Nordisk partnership 14 апреля — MATCH.
- [OK] Research preview, US enterprise — MATCH.
- [OK] Capabilities list — MATCH.
- [OK] 10-15 year US drug timeline — MATCH.
- [OK] Dual-use bioengineering vetting — MATCH.
- [OK] Altman quote translated VERBATIM — MATCH.
- [OK] Bancel quote translated VERBATIM — MATCH.
- [OK] "Выход OpenAI обостряет конкуренцию с Alphabet, где в этой нише работает DeepMind" — MATCH brief's explicit allowance ("Google/Alphabet has been leading", DeepMind named in brief). No specific capability comparison.
- **Verdict: CLEAN. No blocking issues.**

### RU Topic 5 (slug: `ru-titanik-spasatelnyy-zhilet-prodan-za-906-tysyach`)

- [OK] £670,000 / $906,000, 18 апреля 2026, Henry Aldridge & Son, Девизес, запад Англии — MATCH.
- [OK] Франкателли, первый класс, шлюпка №1 — MATCH.
- [OK] Люси Дафф Гордон (модельер), Космо Дафф Гордон (муж), все трое выжили — MATCH.
- [OK] Pre-sale 250,000–350,000 фунтов, почти вдвое превысила — MATCH.
- [OK] Бежевый, 12 пробковых карманов из холста, плечевые упоры, боковые ремни, подписи — MATCH.
- [OK] First survivor life jacket at auction — MATCH.
- [OK] Неизвестный участник по телефону — MATCH (no Titanic Museum Attraction naming).
- [OK] Aldridge quote translated VERBATIM — MATCH.
- [OK] "14-15 апреля 1912 года" — MATCH brief (allowed reference to sinking date).
- [OK] Does NOT call Francatelli a "rich socialite" — complies.
- **Verdict: CLEAN. No blocking issues.**

---

## Cross-article patterns

- **Google/DeepMind/Alphabet context (Topic 4):** AZ, EN, and RU all include this contextualization; TR omits it. All included versions stay within brief's explicit allowance (brief says OK to note). No fabrication.
- **"since 2022" framing (Topic 2):** EN uniquely specifies "February 2022"; AZ, TR, RU stay with the generic "2022" from brief. This is a MINOR single-locale specificity, historically accurate but not in brief.
- **Home-team sweep narrative (Topic 3):** All 4 locales report the sweep correctly. RU is the one locale that uses "доминировали" for the Nuggets; AZ/EN/TR avoid direct "dominant" language. Single-locale MINOR.
- **No named tanker/container/victims:** All 4 locales comply (Topic 1 and Topic 2 red flags clean).
- **Jokić 25/13/11 (not 30):** All 4 locales correctly use the brief's clarified line. No one wrote 30 for Jokić. Zero contamination from the search-snippet confusion.
- **Francatelli characterization:** No locale calls her a "rich socialite". All 4 correctly say "secretary/companion to Lucy Duff Gordon". Compliant.
- **Titanic Museum Attraction NOT named as buyer in any locale:** All 4 comply.
- **Quote fidelity (Trump, Zelenskyy, Klymenko, Altman, Bancel, Aldridge):** Every direct quote in every locale matches the brief verbatim (translated). No invented quotes. Zero quote-mismatch.
- **EN uniquely adds scene-setting:** Only EN invents "air-raid sirens and missile strikes" scene detail (Topic 2) and "private collector in western England" speculation (Topic 5). These are isolated to EN — no cross-locale hallucination.

---

## Action items for fix agent

### BLOCKING — must fix before publishing

1. **[BLOCKING] EN Topic 2** — remove or rewrite the final sentence fragment: *"where air-raid sirens and missile strikes have defined the city's sense of danger rather than a lone gunman armed with a rifle."* This is invented scene-setting not in the brief. Suggested replacement (keeping tone): cut the "where…" clause and end with "unheard of in wartime Kyiv since February 2022." Or tie directly to brief: "an incident unheard of in wartime Kyiv since Russia's full-scale invasion began in 2022."

2. **[BLOCKING] EN Topic 5** — remove or rewrite the final sentence: *"For now, a private collector — somewhere on the end of a telephone line in western England — has taken ownership of one of the most personal surviving artifacts of the 1912 disaster."* Two unverified claims: (a) "private collector" — brief says only "unidentified telephone bidder"; (b) "in western England" — the auction house is in western England, but the bidder could be anywhere. Suggested replacement: *"The buyer's identity has not been disclosed."* Or delete the sentence entirely — the preceding paragraph already handles the disclosure status.

### MINOR — consider softening (non-blocking, optional polish)

3. **[MINOR] RU Topic 3** — replace "«Наггетс» доминировали на своей площадке" with "«Наггетс» выиграли домашний матч" or similar. Brief explicitly cautions against "dominant" without verbatim source framing.
4. **[MINOR] RU Topic 3** — "Кливленд и Денвер уверенно начали" — consider replacing "уверенно" with neutral "начали с побед".
5. **[MINOR] EN Topic 2** — "since February 2022" → "since 2022" (match brief's generic phrasing).
6. **[MINOR] TR Topic 3** — "Nuggets, ev sahibi olarak oynadığı maçı kontrollü bir oyunla kazandı" — consider softening "kontrollü bir oyunla" to neutral phrasing.
7. **[MINOR] AZ Topic 3** — "evsahiblərinin tam hakimiyyəti" ("total home dominance") — consider softening to "dörd ev sahibinin qalibiyyəti" (four home teams' victory).
8. **[MINOR] AZ Topic 5 / TR Topic 5** — "Henry Aldridge & Son is a world-renowned Titanic memorabilia specialist" — this industry framing is not in brief's Key facts. Consider removing or citing brief-sourced framing only.
9. **[MINOR] AZ Topic 5** — "114 il sonra belə" anniversary framing — brief allows mentioning 1912 sinking but not explicitly the "114 years later" editorial; consider softening or tying to a source.

---

## QA-C Confidence Assessment

**Confidence that NO Sprint-4-style hallucination slipped through: HIGH.**

- No invented entities (no "Claude Mythos 5" or "GPT-5.4" analogues).
- No invented people, brands, or organizations.
- No invented numbers, scores, prices, or dates.
- No invented quotes — every direct quotation tracks back verbatim to the brief's quoted Trump, Zelenskyy, Klymenko, Altman, Bancel, or Aldridge lines.
- No contradictions with brief (Jokić stat line is correct across all 4 locales; no tanker casualties claimed; no Titanic Museum Attraction buyer; no Francatelli socialite framing).

**The two BLOCKING items are editorial scene-invention (EN only), not fact-fabrication.** Removing them takes ~2 minutes and makes the batch fully compliant.

**Overall verdict:** The 20-article batch is in significantly better shape than Sprint 4's contaminated output. After the 2 BLOCKING EN fixes (both in the same locale), the batch is safe to publish. The 7 MINOR items are polish-tier and do not require gating.

---
*QA-C report generated 2026-04-19 against brief news-research-2026-04-19-batch1.md.*
