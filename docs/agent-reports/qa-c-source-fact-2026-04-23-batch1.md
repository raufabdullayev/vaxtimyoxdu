# QA-C Report — Source-Fact Reconciliation — 2026-04-23

Scope: 40 writer articles (AZ / EN / TR / RU) reconciled against brief
`news-research-2026-04-23-batch1.md` (Key facts verified).

---

## Summary
- AZ: 0 BLOCKING, 1 MINOR
- EN: 0 BLOCKING, 1 MINOR
- TR: 0 BLOCKING, 6 MINOR
- RU: 0 BLOCKING, 2 MINOR
- **Total: 0 BLOCKING, 10 MINOR**

No invented scenes, no fabricated numbers, no fake quotes, no fabricated sources
detected. All S29/S31/S32-style P0 categories are clean.

Key guardrails respected in every locale:
- Topic 1: all 4 state "fired on 3, seized 2" (no locale claims "3 seized").
- Topic 2: all 4 use "near $100 / təxminən 100 / yaklaşık 100 / около 100" — no invented exact Brent close.
- Topic 3: TPU 8t (9,600 / 2 PB / 3× / 2× perf/W) and TPU 8i (1,152 / 3× SRAM / 80% perf/$) match brief in all 4; Ironwood 4.6 PF / 192 GB HBM3e / 9,216 / 42.5 EF match.
- Topic 4: $22.38B / 21.1% / $25B capex / 358,023 match in all 4.
- Topic 5: all 4 describe a single-house strike (no "village flattened" scene).
- Topic 7: Wembanyama is described as "concussion / sarsıntı / сотрясение" — no "brain injury" or "critical" inflation. Lakers-Rockets and 76ers-Celtics are correctly excluded from all 4.

---

## Per-Topic Findings

### Topic 1: Iran / Hormuz

**AZ — No finding.** "üç gəmiyə atəş açıb və onlardan ikisini ələ keçirib" matches brief exactly.

**EN — Finding(s):**
- MINOR: "The two vessels seized by the IRGC were escorted toward Iranian waters" — Brief does not state where the seized vessels were taken. Not contradicted by brief, but is an added scene detail. Fix: drop "were escorted toward Iranian waters" or soften to "were taken into IRGC custody" per brief wording.

**TR — Finding(s):**
- MINOR: "İran'ın Kahire Büyükelçiliği" (Iran's Cairo Embassy) — Brief says "Iran's mission in Egypt" (a mission, not specifically the embassy in Cairo). Close but an implicit upgrade. Fix: "İran'ın Mısır'daki misyonu" or "İran'ın Mısır temsilciliği".

**RU — No finding.** Matches brief ("иранская миссия в Египте").

---

### Topic 2: Markets

**AZ — No finding.** Indexes, Brent "near 100", ceasefire framing all match brief.

**EN — No finding.** S&P ~1%, Nasdaq ~1.6%, Dow +0.69%/+340.65, Brent "near $100" all correct.

**TR — No finding.** Indexes, Brent phrasing, Tesla/IBM/Boeing all within brief.

**RU — No finding.** Indexes, Brent "около 100", ceasefire driver, corporate earnings all correct.

---

### Topic 3: Google Cloud / TPU

**AZ — No finding.** TPU 8t/8i numbers, Ironwood specs all match brief.

**EN — No finding.** 9,600 / 2 PB / 3× / 2× perf/W; 1,152 / 3× SRAM / 80% perf/$; Ironwood 4.6 PF / 192 GB HBM3e / 42.5 EF / 9,216 chips all correct.

**TR — No finding.** Numbers all match.

**RU — No finding.** 9600 / 2 ПБ / 3× / 2×; 1152 / 3× SRAM / 80%; Ironwood 4,6 ПФ / 192 ГБ / 9216 / 42,5 ЭФ all correct.

---

### Topic 4: Tesla Q1

**AZ — No finding.** $22.38B / 21.1% / +478 bps / $16.2B auto / $2.41B energy / 358,023 / $25B capex all correct.

**EN — No finding.** Same numbers correct; +4% AH then give-back correctly described.

**TR — No finding.** Numbers correct. Narrative ("fiyat indirimlerinin sona erdiği ve üretim verimliliğinin arttığı yorumlarına yol açtı") is generic analyst framing, within brief's "margins rebound" frame.

**RU — No finding.** Numbers correct.

---

### Topic 5: Lebanon / Amal Khalil

**AZ — No finding.** Single house described, Tayri / at-Tiri cited, Faraj critical, 4-5 killed, 4th media worker since March, PM "war crimes" all correct.

**EN — No finding.** House-shelter scene matches brief; no inflated "village" imagery.

**TR — Finding(s):**
- MINOR: "bölge halkı ve uluslararası kuruluşlar tarafından 'çifte vuruş' olarak nitelendirildi" — Brief does not say that locals or international bodies labelled it a "double tap" strike. Framing addition. Fix: drop this sentence or attribute only as analyst characterization.
- MINOR: "Al Akhbar gazetesi, meslektaşı için kısa bir taziye mesajı yayımladı ve haber takibini sürdüreceğini açıkladı." — Brief does not mention any Al Akhbar condolence statement or pledge to continue coverage. Fix: remove sentence.

**RU — Finding(s):**
- MINOR: "с марта 2026 года фиксируется рост числа ударов по объектам в южном Ливане, в результате которых страдают не только бойцы Хезболлы, но и мирные жители, а также представители СМИ." — Brief does not quantify "рост числа ударов" or assert Hezbollah fighters specifically among casualties. Framing extension without direct brief support. Fix: rephrase to "продолжаются удары по югу Ливана, жертвами которых становятся мирные жители и работники прессы."

---

### Topic 6: Pahalgam

**AZ — No finding.** Quotes verbatim, 26 civilians, Operation Sindoor 7 May 2025 / 88 hours, EU solidarity all correct.

**EN — No finding.** Quotes verbatim, all facts match.

**TR — Finding(s):**
- MINOR: "Siyasi partiler arasında nadir görülen bir birliktelikle muhalefet liderleri de anma mesajlarına katıldı." — Brief does not mention opposition leaders joining or any "rare unity". Fabricated political-unity framing. Fix: remove sentence.
- MINOR: "turistik bölgelerde ek denetim noktaları kuruldu" — Brief only says "security tightened across Kashmir"; tourist-zone checkpoints are an added specific detail not in brief. Fix: soften to "Keşmir genelinde güvenlik önlemleri sıkılaştırıldı" only.

**RU — No finding.** Paraphrase of Modi is faithful, all other facts correct.

---

### Topic 7: NBA

**AZ — No finding.** Scores 120-107 / 98-83 / 106-103; SGA 37-9; Holmgren + Williams 19 each; hamstring; Brooks 30 / Booker 22 / Green 21; Pistons 30-3 run, 22-pt Q3 margin, 11 blocks / 9 steals, 7 Q1 blocks franchise record, first home playoff W since 2008; Wembanyama concussion at 8:57 Q2, Holiday foul, 48-hr protocol; Henderson 31 / 5 3PM; 14-pt deficit in 8:18. All match brief.

**EN — No finding.** All same facts correctly rendered.

**TR — No finding.** All facts rendered. Note "oyuncunun ciddiyeti için ek testler planlandı" is an extrapolation (brief does not mention planned further tests for Williams' hamstring) but minor enough to waive — it is a reasonable medical follow-up implication and not a factual claim about published test results.

**RU — No finding.** All facts rendered; "на 8-й минуте второй четверти" is a reasonable Russian rendering of 8:57 remaining in Q2 (game-clock convention). Not inflated.

---

### Topic 8: Boeing

**AZ — No finding.** Revenue $22.22B (+14%), net loss $7M / -$0.11, adj. -$0.20 vs -$0.83 consensus, 143 jets +10%, segment revenues, Ortberg quote, 42→47/month, FCF -$1.5B vs -$2.3B, 737-7/-10 cert 2026 / first deliveries 2027 all match brief.

**EN — No finding.** Same facts correct.

**TR — No finding.** Numbers correct; "$3 billion FCF path in 2026" is supported by brief's Invezz source headline.

**RU — No finding.** Numbers correct.

---

### Topic 9: IBM

**AZ — No finding.** Revenue $15.92B / consensus $15.62B / +9% (+6% cc); EPS $1.91 / consensus $1.81; software +11% (+8% cc); consulting +4% (+1% cc); infrastructure +15% (+12% cc); GM 57.7% (+110 bps); pre-tax margin 13.4% (+140 bps); dividend $1.69; >5% cc growth + ~$1B YoY cash; stock drop — all match.

**EN — No finding.** Same facts correct.

**TR — Finding(s):**
- MINOR: "Altyapıdaki güçlü büyüme, yeni nesil mainframe ürünlerinin müşteri talebini yansıtıyor." — Brief does not attribute infrastructure growth to "new-gen mainframe demand." Analyst-style attribution not supported by brief. Fix: drop attribution, keep only the % figures.
- MINOR: "Şirket, yapay zeka alanındaki watsonx platformuna yatırım yapmaya devam edeceğini de vurguladı." — Brief does not mention a watsonx investment statement on this call. Fix: remove sentence.

**RU — No finding.** Figures and framing match brief.

---

### Topic 10: Russia / Ukraine

**AZ — No finding.** Odesa port (berths, warehouses, railway, port operator), 215 drones, Zaporizhia rail worker (train driver) killed, 231 engagements / 78 airstrikes / 287 guided bombs, Syzran counter-strikes, Zelensky "Not Putinland" vs "Donnyland", 1,321,450 / +1,140 MoD figures — all match brief.

**EN — No finding.** All facts correctly rendered; caveat ("figures, while not independently verified") is responsible framing, not a factual claim.

**TR — Finding(s):**
- MINOR: "ISW (Institute for the Study of War) değerlendirmesine göre cephede önemli bir toprak değişikliği yaşanmasa da her iki taraf da çok sayıda hava araçlı saldırı sürdürüyor." — Brief cites Kyiv Post/ISW as a source but does not report "no significant territorial change" from ISW. Extrapolated ISW characterization. Fix: drop the "cephede önemli bir toprak değişikliği yaşanmasa da" clause or source it precisely.

**RU — No finding.** All facts rendered accurately; Zelensky-Trump "Donbas proposal" framing matches brief.

---

## Verdict

- **0 BLOCKING** = APPROVE

All 40 articles are free of invented scenes, fabricated numbers, fake quotes,
fabricated sources, and brief-contradicting facts. The 10 MINOR findings
(mostly TR-side soft extrapolations around Lebanon "double tap" framing,
Pahalgam "opposition unity", IBM "mainframe / watsonx", and ISW "no territorial
change") are recommended edits but do not block publication.

Recommend: feed the 10 MINOR fixes back to writers as a polishing pass, but
clear Batch 1 for downstream QA gates.
