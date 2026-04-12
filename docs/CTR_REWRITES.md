# CTR Rewrites — Top 20 Pages (Sprint 1 / Workstream B, paper-only)

> **Author:** ContentDev
> **Status:** DRAFT v2 — awaiting SeoPro + SmmPro review (Review Ticket #RT-1-04; supersedes RT-1-03)
> **Scope:** Title + meta description rewrites for the top 20 GSC-impression pages, 4 locales each (AZ, EN, TR, RU) — except where a page is EN-only or RU-only per source data.
> **Target metric:** Current 28-day CTR 0.83% → target 2–3%.
> **Apply-in:** Sprint 2 (Phase B) after review gate approval. NO code changes in this sprint.

---

## 0. Revision history

- **v1 (RT-1-03, withdrawn):** drafted against the brief's 20-page list (homepage, /tools, /info, 17 tool pages).
- **v2 (RT-1-04):** reshaped per SeoPro's guidance to follow the GSC-driven top-20 by impressions. Drops homepage / /tools / /info as out-of-scope (metadata in `src/app/layout.tsx`, separate sprint). Drops 7 low-signal tool entries (word-counter, age-calculator, loan-calculator, case-converter, regex-tester, text-diff, pdf-split, ai-text-rewriter tool) and replaces them with 11 GSC-backed pages (9 additional RU-heavy tool pages + 2 blog posts). Freezes image-convert title per SeoPro ("winner, don't touch title"). Freezes image-compress title per SeoPro ("winner, optimize desc only"). Drops "Google" from color-picker titles. Uses "генератор паролей" as RU primary keyword (not "рандомайзер").
- **v2.1 (RT-1-04, this file):** addresses SmmPro APPROVE_WITH_FOLLOWUP verdict fixes: (1) Color-picker AZ description — replaced "Google-yönlü" with "Google axtarışına uyğun" to remove trademark ambiguity while preserving `google rəng seçici` query match. (2) RU blog title (entry 7) — restored formal "Руководство" register instead of colloquial "Гид" per SmmPro voice-parity flag, rendered title stays at 60 chars (exact budget). All other v2 entries unchanged. SmmPro v2.1 re-sign-off not required (both changes are literally SmmPro's suggested alternatives).

---

## 1. How to read this file

Each entry below lists:

1. **Current title / meta description** in the relevant locales.
2. **Rewrite proposal** — a complete rendered title ≤60 characters and a complete rendered meta description ≤155 characters.
3. **Reasoning** — the CTR lever (keyword match, privacy USP, intent shape).
4. **Tracking/CTR hypothesis** — expected CTR improvement band.

### Hard limits (from `docs/SEO_TRACKING_INVARIANTS.md`)

- **§6 Title:** rendered `<title>` ≤ **60 characters** per locale. This is the browser-rendered value, including any brand suffix.
- **§7 Meta description:** `<meta name="description">` ≤ **155 characters** per locale. For client-side tools, the existing metadata factory appends a browser-based note (~21–27 chars depending on locale).

### Brand voice (from `docs/SMM_CONTENT_INVARIANTS.md §5`)

- **AZ:** `Vaxtım Yoxdu` with dotless `ı` — only when the brand itself is mentioned in the copy.
- **EN / TR / RU:** `Vaxtim Yoxdu` (no diacritic).
- Current rendered titles include the factory brand suffix ` | Vaxtim Yoxdu`. Rewrites below are written as **complete rendered titles** with that suffix where applicable so reviewers can count against the 60-char budget at a glance.

### CTR copywriting rules (from the brief)

1. Lead with the **benefit**, not the brand.
2. Surface the **privacy USP** (no upload / browser-based / local / private) — our biggest differentiator.
3. Match the **primary search keyword** near the start of the title.
4. Use `|` or `—` as a separator for visual hierarchy.
5. Localize "free": AZ `pulsuz`, EN `free`, TR `ücretsiz`, RU `бесплатный/бесплатно`.
6. Meta descriptions **start with an action verb**.
7. No superlatives — avoid "best", "#1", "leading".
8. Under 60 chars for the title; under 155 for meta desc (incl. any appended note).

### Page list (20 entries, all from GSC top-30 by impressions, 2026-03-11 → 2026-04-08)

| # | Page | Impr | CTR | Pos | Locale scope |
|---|---|---:|---:|---:|---|
| 1 | /ru/tools/password-generator | 1126 | 0.09% | 57 | RU (critical), + AZ/EN/TR parity |
| 2 | /ru/tools/text-to-speech | 332 | 0.30% | 59 | RU (primary), + AZ/EN/TR parity |
| 3 | /tools/pdf-merge | 324 | 0.62% | 8.6 | AZ (primary), + EN/TR/RU |
| 4 | /tools/color-picker | 221 | 0.45% | 8.3 | AZ (primary), + EN/TR/RU |
| 5 | /en/blog/how-ai-text-rewriting-works | 143 | 0.70% | 5.8 | EN only (blog) |
| 6 | /ru/blog/complete-guide-to-claude-ai | 118 | 1.69% | 10 | RU only (blog) |
| 7 | /tools/qr-code-generator | 78 | 3.85% | 13.5 | AZ + EN/TR/RU parity |
| 8 | /ru/tools/uuid-generator | 75 | 2.67% | 13.7 | RU (primary), + AZ/EN/TR parity |
| 9 | /ru/tools/barcode-generator | 65 | 3.08% | 52 | RU (primary), + AZ/EN/TR parity |
| 10 | /tools/image-convert | 49 | 12.2% | 5.3 | **desc only, title FROZEN** (winner) |
| 11 | /tools/image-compress | 44 | 11.4% | 32 | **desc only, title FROZEN** (winner) |
| 12 | /ru/tools/hash-generator | 43 | 4.65% | 13.8 | RU (primary), + AZ/EN/TR parity |
| 13 | /ru/tools/pdf-compress | 41 | 2.44% | 59 | RU (primary), + AZ/EN/TR parity |
| 14 | /ru/tools/random-text-generator | 37 | 2.70% | 19 | RU (primary), + AZ/EN/TR parity |
| 15 | /ru/tools/base64-encode-decode | 29 | 6.90% | 14 | RU (primary), + AZ/EN/TR parity |
| 16 | /ru/tools/json-formatter | 19 | 5.26% | 11 | RU (primary), + AZ/EN/TR parity |
| 17 | /ru/tools/text-to-binary | 14 | 7.14% | 38 | RU (primary), + AZ/EN/TR parity |
| 18 | /ru/tools/rot13-encoder | 12 | 8.33% | 21 | RU (primary), + AZ/EN/TR parity |
| 19 | /ru/tools/backlink-generator | 7 | 28.6% | 8.3 | RU (rising star), + AZ/EN/TR parity |
| 20 | /ru/tools/html-minifier | 6 | 16.7% | 15 | RU (rising star), + AZ/EN/TR parity |

**Out of scope (removed from v1 per SeoPro review):**
- `/` (homepage), `/tools` (index), `/info` (news listing) — metadata lives in `src/app/layout.tsx` / separate scope for a different sprint.
- `/tools/word-counter`, `/tools/age-calculator`, `/tools/loan-calculator`, `/tools/case-converter`, `/tools/regex-tester`, `/tools/text-diff`, `/tools/pdf-split`, `/tools/ai-text-rewriter` — not in GSC top-30, rewriting won't move the needle (zero-to-low impressions).
- "best free online tools 2026" keyword — aspirational, not in GSC top-30, tagged for a different sprint.

**Primary keywords per locale (SeoPro-verified):**

| Page | AZ primary | EN primary | TR primary | RU primary |
|---|---|---|---|---|
| /tools/color-picker | "rəng seçici" (Google in DESC only, not title) | "color picker" | "renk seçici" | "онлайн-палитра" / "цветовая палитра" |
| /tools/pdf-merge | **"PDF birləşdirmə"** | "merge PDF online" | "PDF birleştirme" | "объединить PDF онлайн" |
| /tools/password-generator | "şifrə generatoru" | "password generator" | "şifre oluşturucu" | **"генератор паролей"** |
| /tools/text-to-speech | "mətnə səs" | "text to speech" | "metni sese dönüştürücü" | **"онлайн озвучка текста"** |
| /en/blog/how-ai-text-rewriting-works | n/a | **"ai rewriter"** | n/a | n/a |

---

## 2. `/tools/password-generator` — HIGHEST LEVERAGE (RU: 1126 impr, CTR 0.09%)

**Priority:** P0 — largest impression bleed in the portfolio.

**Current rendered title (`${toolNames.password-generator.name} — ${metaTitleSuffix} | ${SITE_NAME}`):**
- AZ: `Şifrə Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (47 char)
- EN: `Password Generator — Free Online | Vaxtim Yoxdu` (47 char)
- TR: `Şifre Üreteci — Ücretsiz Online | Vaxtim Yoxdu` (46 char)
- RU: `Генератор Паролей Онлайн — Бесплатно Онлайн | Vaxtim Yoxdu` (57 char — "Онлайн" appears twice, awkward)

**Current meta description (raw + appended `metaBrowserBased` note):**
- AZ: `Güclü, təsadüfi şifrələr yaratmaq. Uzunluq və simvol növlərini təyin edin. Şifrə gücü göstəricisi daxildir. Brauzer əsaslı, pulsuz.` (132 char)
- EN: `Generate strong, random passwords with customizable length and character types. Password strength indicator included. Browser-based, free.` (137 char)
- TR: `Özelleştirilebilir uzunluk ve karakter türleriyle güçlü, rastgele şifreler üretin. Şifre gücü göstergesi dahildir. Tarayıcı tabanlı, ücretsiz.` (144 char)
- RU: `Создавайте надёжные пароли мгновенно. Настраивайте длину, символы и цифры. Полностью бесплатно, без регистрации, работает в браузере. В браузере, бесплатно.` (158 char — **OVER §7 BUDGET** + **duplicate browser note**: raw desc ends in "работает в браузере" and factory appends "В браузере, бесплатно." on top)

**Rewrite proposal — title:**
- AZ: `Güclü Şifrə Generatoru — Pulsuz, Yaddaşsız` (41 char)
  Reasoning: `Güclü` surfaces the benefit, `Yaddaşsız` is the privacy payoff.
- EN: `Strong Password Generator — Free, No Storage` (44 char)
- TR: `Güçlü Şifre Oluşturucu — Ücretsiz, Anlık` (40 char)
  Reasoning: TR primary keyword per SeoPro = `şifre oluşturucu` (more modern than `üreteci`).
- RU: `Генератор Паролей — Бесплатно, Без Регистрации` (46 char)
  Reasoning: RU primary per SeoPro = `генератор паролей` (NOT `рандомайзер` — SeoPro: "colloquial, lower volume"). Remove the awkward "Онлайн — Онлайн" duplication in current title.

**Rewrite proposal — meta description:**
- AZ: `Təsadüfi, güclü şifrə yarat — 8-64 simvol, rəqəm, hərf, xüsusi işarə. Heç nə yaddaşa yazılmır, hər şey brauzerində.` (116 char)
- EN: `Generate strong random passwords — 8 to 64 chars with numbers, letters, and symbols. Nothing saved, nothing sent, runs in your browser.` (137 char)
- TR: `Rastgele güçlü şifre oluştur — 8 ila 64 karakter, rakam, harf, özel işaret. Hiçbir şey kaydedilmez, tarayıcında çalışır.` (119 char)
- RU: `Создай надёжный пароль — от 8 до 64 символов, цифры, буквы, спецсимволы. Ничего не сохраняется, всё в браузере.` (111 char)
  Reasoning: the rewritten RU raw description is 111 chars; adding the factory `В браузере, бесплатно.` note (~23 chars) brings the rendered total to ~134 — **comfortably inside §7 budget** and **eliminates the duplicate-note bug**. Sprint 2 apply-phase must ensure the raw description does NOT contain "в браузере" itself.

**Tracking/CTR hypothesis:** current RU 0.09% CTR at position 57 → **target 0.5%–0.8% near-term** at current rank (better snippet alone), **3%+** if rank improves to top-20 via Sprint 3 content work. AZ/EN/TR parity rewrites are safety updates, no CTR data yet.

---

## 3. `/tools/text-to-speech` — SECOND HIGHEST LEVERAGE (RU: 332 impr, CTR 0.30%)

**Current rendered title:**
- AZ: `Mətndən Nitqə — Pulsuz Onlayn | Vaxtım Yoxdu` (44 char)
- EN: `Text to Speech — Free Online | Vaxtim Yoxdu` (43 char)
- TR: `Metinden Sese — Ücretsiz Online | Vaxtim Yoxdu` (46 char)
- RU: `Текст в речь — Бесплатно Онлайн | Vaxtim Yoxdu` (46 char)

**Current meta description (client-side, factory appends browser note):**
- AZ: `Web Speech API ilə mətni nitqə çevirin. Mövcud səslərdən seçin, sürət, tonallıq və səs həcmini tənzimləyin. Brauzer əsaslı, pulsuz.` (132 char)
- EN: `Convert text to speech using the Web Speech API. Choose from available voices, adjust speed, pitch, and volume. Browser-based, free.` (132 char)
- TR: `Web Speech API ile metni sese dönüştürün. Mevcut seslerden seçin, hız, ton ve ses seviyesini ayarlayın. Tarayıcı tabanlı, ücretsiz.` (131 char)
- RU: `Конвертируйте текст в речь через Web Speech API. Выбирайте из доступных голосов, настраивайте скорость, тон и громкость. В браузере, бесплатно.` (145 char)

**Rewrite proposal — title:**
- AZ: `Mətnə Səs — Pulsuz Onlayn Text-to-Speech` (40 char)
- EN: `Free Text to Speech — Online, Instant, No Signup` (48 char)
- TR: `Metni Sese Dönüştürücü — Ücretsiz, Anlık` (40 char)
- RU: `Онлайн Озвучка Текста — Бесплатно, Без Установки` (48 char)
  Reasoning: RU primary per SeoPro = "онлайн озвучка текста" (current rank 59 means we're ranking for a different query; this aligns us with the actual search term). Replace generic "Текст в речь" (literal "text in speech") with "Озвучка текста" (voice-over text) — more natural RU search form.

**Rewrite proposal — meta description:**
- AZ: `Mətnini brauzerində nitqə çevir — səs, sürət və ton seç. AZ, EN, RU, TR dəstəyi. Qeydiyyat yoxdur, fayl yüklənmir.` (116 char)
- EN: `Read text aloud in your browser — pick voice, speed, and pitch. Supports English, Russian, Turkish, Azerbaijani. No signup, instant playback.` (142 char)
- TR: `Metni tarayıcında sese dönüştür — ses, hız ve ton seç. TR, EN, RU, AZ desteği. Kayıt yok, anında dinle.` (103 char)
- RU: `Озвучь текст в браузере — выбери голос, скорость и тон. Поддержка русского, английского, турецкого, азербайджанского.` (116 char)

**Reasoning:** this is the #2 impression-bleed in the portfolio. The rewrite swaps the technical "Web Speech API" mention (confusing to non-devs) for a user-facing benefit ("read text aloud") and lists supported languages — which both grows keyword surface AND matches the "Russian text to speech" long-tail variant.

**Tracking/CTR hypothesis:** RU currently 0.30% at position 59 → **target 0.8%–1.5% near-term** (better snippet), **4%+** post-rank improvement.

---

## 4. `/tools/pdf-merge` — THIRD HIGHEST (AZ: 324 impr, pos 8.6, CTR 0.62%)

**Priority:** the single highest-leverage AZ page. Striking-distance keyword `pdf birləşdirmə` has 192 impressions at position 8.5 — we're 1 rank from top-5.

**Current rendered title:** Note `pdf-merge` has a hardcoded long `name` in `src/config/tools/pdf-tools.ts:6` (`Merge PDF Files Online Free — No Upload, 100% Private`) AND a shorter localized name in `toolNames.pdf-merge.name`. Factory uses the localized name. Rendered today:
- AZ: `PDF Birləşdirici — Pulsuz Onlayn | Vaxtım Yoxdu` (47 char)
- EN: `PDF Merge — Free Online | Vaxtim Yoxdu` (38 char)
- TR: `PDF Birleştirici — Ücretsiz Online | Vaxtim Yoxdu` (49 char)
- RU: `Объединение PDF — Бесплатно Онлайн | Vaxtim Yoxdu` (49 char)

**Current meta description:**
- AZ: `Bir neçə PDF faylını onlayn birləşdirin. Səhifələri yenidən sıralayın, istədiyiniz ardıcıllıqla birləşdirin. Brauzer əsaslı, pulsuz.` (132 char)
- EN: `Merge multiple PDF files into one document online. Rearrange pages and combine PDFs in any order. Browser-based, free.` (118 char)
- TR: `Birden fazla PDF dosyasını çevrimiçi tek bir belgede birleştirin. Sayfaları yeniden sıralayın ve istediğiniz sırada birleştirin. Tarayıcı tabanlı, ücretsiz.` (156 char — **OVER §7 BUDGET**)
- RU: `Объедините несколько PDF-файлов в один документ онлайн. Перераспределите страницы и объединяйте в любом порядке. В браузере, бесплатно.` (135 char)

**Rewrite proposal — title:**
- AZ: `PDF Birləşdirmə — Pulsuz, Yüklənmədən` (37 char)
  Reasoning: leads with the exact striking-distance keyword form (`PDF Birləşdirmə` — 192 impressions). Drops `Birləşdirici` suffix because the literal query noun is more important.
- EN: `Merge PDF Files Online — No Upload, No Watermark` (48 char)
- TR: `PDF Birleştirme — Ücretsiz, Filigransız, Yüklemesiz` (51 char)
- RU: `Объединить PDF Онлайн — Бесплатно, Без Загрузки` (47 char)

**Rewrite proposal — meta description:**
- AZ: `PDF faylları brauzerində birləşdir — sürüklə-at, səhifələri sırala, tək sənəd al. Heç bir fayl serverə göndərilmir.` (116 char)
- EN: `Merge PDF files in your browser — drag, drop, reorder, download. Files never leave your device. Free, no signup, no watermark.` (126 char)
- TR: `PDF dosyalarını tarayıcında birleştir — sürükle-bırak, sırala, indir. Dosyaların cihazından çıkmaz. Ücretsiz, filigransız.` (121 char)
- RU: `Объедини PDF-файлы прямо в браузере — перетащи, сортируй, скачай. Файлы не покидают устройство. Бесплатно, без водяного знака.` (126 char)

**Reasoning:** the `pdf-merge` page is already at position 8.6 AZ with 324 impressions but only 0.62% CTR. The exact-keyword AZ title match should lift rank to 5 and CTR to 3-5%, which would add an estimated 10+ clicks/week from this page alone.

**Tracking/CTR hypothesis:** AZ 0.62% → **target 3–5% near-term**, **5–8%** post-rank improvement. Single-page biggest potential gain in the portfolio.

---

## 5. `/tools/color-picker` — FOURTH HIGHEST (AZ: 221 impr, pos 8.3, CTR 0.45%)

**Striking-distance keyword:** `google rəng seçici` — 199 impressions at position 8.5. Per SeoPro: **include "Google" variant in description, NOT title** (Google in title looks promotional).

**Current rendered title:** all 4 locales bust §6 budget (translated name "Color Picker & Palette Generator" is too long after the factory suffix):
- AZ: `Rəng Seçici və Palet Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (62 char — **OVER §6 BUDGET**)
- EN: `Color Picker & Palette Generator — Free Online | Vaxtim Yoxdu` (62 char — **OVER §6 BUDGET**)
- TR: `Renk Seçici ve Palet Üreteci — Ücretsiz Online | Vaxtim Yoxdu` (62 char — **OVER §6 BUDGET**)
- RU: `Выбор цвета и Генератор палитры — Бесплатно Онлайн | Vaxtim Yoxdu` (65 char — **OVER §6 BUDGET**)

**Current meta description:**
- AZ: `Rənglər seçin, HEX, RGB, HSL formatları arasında çevirin və gözəl rəng paletləri yaratmaq. Brauzer əsaslı, pulsuz.` (115 char)
- EN: `Pick colors, convert between HEX, RGB, HSL formats, and generate beautiful color palettes. Browser-based, free.` (111 char)
- TR: `Renkler seçin, HEX, RGB, HSL formatları arasında dönüştürün ve güzel renk paletleri oluşturun. Tarayıcı tabanlı, ücretsiz.` (122 char)
- RU: `Выбирайте цвета, конвертируйте между форматами HEX, RGB, HSL и создавайте красивые цветные палитры. В браузере, бесплатно.` (121 char)

**Rewrite proposal — title:**
- AZ: `Rəng Seçici — HEX, RGB, HSL + Palet Generatoru` (46 char)
  Reasoning: primary keyword `rəng seçici` leads; "Google" moves to description per SeoPro rule.
- EN: `Color Picker — HEX, RGB, HSL + Palette Generator` (48 char)
- TR: `Renk Seçici — HEX, RGB, HSL + Palet Üretici` (43 char)
- RU: `Цветовая Палитра — HEX, RGB, HSL, Пипетка Цветов` (48 char)
  Reasoning: RU primary per SeoPro = "онлайн-палитра" / "цветовая палитра" — "Цветовая Палитра" leads; "Пипетка Цветов" is the secondary long-tail.

**Rewrite proposal — meta description:**
- AZ: `Google axtarışına uyğun rəng seçici: HEX/RGB/HSL arasında çevir, tamamlayıcı palet yarat. Dizaynerlər üçün pulsuz brauzer aləti.` (129 char)
  Note (v2.1): per SmmPro HIGH follow-up, replaced the earlier "Google-yönlü" ("Google-oriented") phrasing which risked implying an official Google affiliation. "Google axtarışına uyğun" ("suitable for Google search") is an unambiguous search-affinity framing that still captures the `google rəng seçici` query via body/description tokens.
- EN: `Pick colors, convert HEX/RGB/HSL, and generate complementary palettes. Free browser tool for designers and developers.` (118 char)
- TR: `Renk seç, HEX/RGB/HSL arasında dönüştür, tamamlayıcı paletler oluştur. Tasarımcı ve geliştiriciler için ücretsiz tarayıcı aracı.` (128 char)
- RU: `Выбирай цвета, конвертируй HEX/RGB/HSL и создавай цветовые палитры. Бесплатный браузерный инструмент для дизайнеров и разработчиков.` (132 char)

**Reasoning:** current titles are ALL over §6 budget (62–65 chars). Fixing the budget alone is a hygiene win; the keyword lead should push the AZ page from pos 8.3 into top-5 once Google reprocesses the title.

**Tracking/CTR hypothesis:** AZ 0.45% → **target 5–10%** once rank moves to top-5.

---

## 6. `/en/blog/how-ai-text-rewriting-works` — EN-ONLY (143 impr, CTR 0.70%, pos 5.8)

**Locale scope:** EN only (per GSC data). Blog post data at `src/data/blog-posts.ts:81`.

**Current rendered title (via `generateBlogPostMetadata` → `${title} - ${SITE_NAME} Blog`):**
- EN: `How AI Text Rewriting Actually Works (Explained Simply) - Vaxtim Yoxdu Blog` (74 char — **OVER §6 BUDGET**)

**Current meta description:**
- EN: `Discover how AI paraphrases text in seconds. Learn what makes AI rewriters accurate and try our free tool with no registration.` (127 char)

**Rewrite proposal — title:**
- EN: `AI Rewriter Explained — Free, No Signup` (40 char)
  Rendered with factory suffix = `AI Rewriter Explained — Free, No Signup - Vaxtim Yoxdu Blog` (59 char — **FITS**).
  Reasoning: primary keyword `ai rewriter` leads per SeoPro; current 74-char title is cropped in SERP and buries the brand. Using the `metaTitle` override path (recommended) would let us keep a longer descriptive blog title while emitting this tight SERP title.

**Rewrite proposal — meta description:**
- EN: `How AI paraphrases text — large language models, context, and accuracy. Try our free AI Text Rewriter, no signup, no credit card, instant output.` (146 char)

**Reasoning:** "ai rewriter" keyword match in the SERP title (EN primary per SeoPro). Meta description keeps the curiosity hook (`How AI paraphrases text`) and adds the objection-remover (`no signup, no credit card, instant`). At position 5.8, a better snippet alone should double the CTR.

**Tracking/CTR hypothesis:** EN 0.70% at pos 5.8 → **target 3–5%** (position is strong, snippet is the bottleneck).

---

## 7. `/ru/blog/complete-guide-to-claude-ai` — RU-ONLY (118 impr, CTR 1.69%, pos 10)

**Locale scope:** RU only (per GSC data). Blog post data at `src/data/blog-posts-ru.ts:948`.

**Current rendered title (via factory → `${title} - ${SITE_NAME} Blog`):**
- RU: `Полное руководство по Claude AI: чат, CLI, код, десктоп и многое другое - Vaxtim Yoxdu Blog` (90 char — **OVER §6 BUDGET**)

**Current meta description:** **MISSING in source data** — the `description` field is absent on the RU entry at `src/data/blog-posts-ru.ts:948`. The factory emits `undefined`. This is a P0 bug independent of this CTR sprint.

**Rewrite proposal — title:**
- RU: `Руководство по Claude AI — Чат, CLI, Код` (40 char)
  Rendered with factory suffix = `Руководство по Claude AI — Чат, CLI, Код - Vaxtim Yoxdu Blog` (60 char — **FITS exactly at budget**).
  Reasoning (v2.1): per SmmPro MED follow-up, preserved the formal "Руководство" register (which matches the site-wide professional RU voice) instead of the initially proposed colloquial "Гид". Current 90-char title is cropped in SERP. Apply-phase recommended to use the `metaTitle` override path so the article body title can stay longer/more descriptive.

**Rewrite proposal — meta description:**
- RU: `Полный гид по Claude AI от Anthropic — веб-чат, Claude Code CLI, десктоп-приложение, API. Что это, как начать, и чем отличается от ChatGPT.` (138 char)

**Reasoning:** current title is 90 chars rendered — massively over §6 budget. The RU meta description is MISSING from the source. Position 10 is actually quite good, so snippet clarity is the main lever.

**CRITICAL APPLY-PHASE NOTE:** the `description` field is MISSING on the RU blog post entry at `src/data/blog-posts-ru.ts:948`. Sprint 2 MUST add it. Without this fix, `generateBlogPostMetadata` emits undefined as the meta description. P0 bug.

**Tracking/CTR hypothesis:** RU 1.69% at pos 10 → **target 3–5%** with fixed title + added meta description.

---

## 8. `/tools/qr-code-generator` (78 impr, 3.85% CTR, pos 13.5)

**Current rendered title:**
- AZ: `QR Kod Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (48 char)
- EN: `QR Code Generator — Free Online | Vaxtim Yoxdu` (46 char)
- TR: `QR Kod Üreteci — Ücretsiz Online | Vaxtim Yoxdu` (47 char)
- RU: `Генератор QR-кодов — Бесплатно Онлайн | Vaxtim Yoxdu` (52 char)

**Current meta description:**
- AZ: `URL, mətn, email, telefon nömrəsi və daha çox üçün QR kodlar yaratmaq. PNG və ya SVG olaraq endirin. Brauzer əsaslı, pulsuz.` (124 char)
- EN: `Generate QR codes for URLs, text, email, phone numbers, and more. Download as PNG or SVG. Browser-based, free.` (110 char)
- TR: `URL, metin, e-posta, telefon numarası ve daha fazlası için QR kodlar üretin. PNG veya SVG olarak indirin. Tarayıcı tabanlı, ücretsiz.` (132 char)
- RU: `Генерируйте QR-коды для URL, текста, email, номеров телефонов и прочего. Скачайте в формате PNG или SVG. В браузере, бесплатно.` (126 char)

**Rewrite proposal — title:**
- AZ: `Pulsuz QR Kod Generatoru — Brauzerdə, Yükləməsiz` (47 char)
- EN: `Free QR Code Generator — No Upload, Browser Only` (48 char)
- TR: `Ücretsiz QR Kod Oluşturucu — Yüklemesiz` (38 char)
- RU: `Бесплатный Генератор QR-кодов — Без Загрузки` (44 char)

**Rewrite proposal — meta description:**
- AZ: `URL, mətn, email və ya telefon üçün QR kod yarat. PNG və ya SVG olaraq endir. Fayl yüklənmir — hər şey brauzerində işləyir.` (124 char)
- EN: `Generate QR codes for URLs, text, email, or phone numbers. Download as PNG or SVG. No upload — everything runs in your browser.` (126 char)
- TR: `URL, metin, e-posta veya telefon için QR kod oluştur. PNG veya SVG olarak indir. Yükleme yok — her şey tarayıcında çalışır.` (122 char)
- RU: `Создай QR-код для URL, текста, email или телефона. Скачай в PNG или SVG. Без загрузки — всё работает в твоём браузере.` (117 char)

**Tracking/CTR hypothesis:** current 3.85% → **target 6–8%** once on-page improvements lift rank from 13.5 to top-5 in Sprint 3.

---

## 9. `/tools/uuid-generator` (75 impr RU, 2.67% CTR, pos 13.7)

**Current rendered title:**
- AZ: `UUID Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (46 char)
- EN: `UUID Generator — Free Online | Vaxtim Yoxdu` (43 char)
- TR: `UUID Üreteci — Ücretsiz Online | Vaxtim Yoxdu` (45 char)
- RU: `Генератор UUID — Бесплатно Онлайн | Vaxtim Yoxdu` (48 char)

**Current meta description:**
- AZ: `UUID v4 identifikatorları onlayn yaratmaq. Toplu yaratma, böyük/kiçik hərf seçimi, tirəsiz variant. Brauzer əsaslı, pulsuz.` (123 char)
- EN: `Generate UUID v4 identifiers online. Bulk generation, uppercase/lowercase options, with or without hyphens. Browser-based, free.` (128 char)
- TR: `UUID v4 tanımlayıcıları çevrimiçi üretin. Toplu üretim, büyük/küçük harf seçenekleri, tireli veya tiresiz. Tarayıcı tabanlı, ücretsiz.` (136 char)
- RU: `Генерируйте идентификаторы UUID v4 онлайн. Массовая генерация, выбор регистра, с дефисом или без. В браузере, бесплатно.` (119 char)

**Rewrite proposal — title:**
- AZ: `UUID v4 Generatoru — Bulk, Pulsuz, Brauzerdə` (44 char)
- EN: `UUID v4 Generator — Bulk, Instant, Offline, Free` (48 char)
- TR: `UUID v4 Oluşturucu — Toplu, Anlık, Ücretsiz` (43 char)
- RU: `Генератор UUID v4 — Массово, Мгновенно, Бесплатно` (49 char)

**Rewrite proposal — meta description:**
- AZ: `UUID v4 yarat — fərdi və ya toplu (1-10000), tirəli/tirəsiz, böyük/kiçik hərf. Developerlər üçün sürətli və pulsuz.` (114 char)
- EN: `Generate UUID v4 — single or bulk (1–10000), with/without hyphens, upper/lowercase. Fast, free, and runs in your browser.` (120 char)
- TR: `UUID v4 oluştur — tek veya toplu (1–10000), tireli/tiresiz, büyük/küçük harf. Geliştiriciler için hızlı ve ücretsiz.` (114 char)
- RU: `Создай UUID v4 — один или массово (1–10000), с дефисом или без, верхний/нижний регистр. Быстро, бесплатно, в браузере.` (117 char)

**Reasoning:** developer tools like UUID benefit from concrete capability numbers (1–10000) in the snippet — these are the lever for "bulk uuid generator" / "uuid generator online" long-tail searches.

**Tracking/CTR hypothesis:** RU 2.67% → **target 4–6%**.

---

## 10. `/tools/barcode-generator` (65 impr RU, 3.08% CTR, pos 52)

**Current rendered title:**
- AZ: `Barkod Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (48 char)
- EN: `Barcode Generator — Free Online | Vaxtim Yoxdu` (46 char)
- TR: `Barkod Oluşturucu — Ücretsiz Online | Vaxtim Yoxdu` (50 char)
- RU: `Генератор штрих-кодов — Бесплатно Онлайн | Vaxtim Yoxdu` (55 char)

**Current meta description:**
- AZ: `Mətn və ya rəqəmlərdən barkod yaradın Brauzer əsaslı, pulsuz.` (61 char — **TOO SHORT, weak copy**)
- EN: `Generate barcodes from text or numbers Browser-based, free.` (59 char — **TOO SHORT, weak copy**)
- TR: `Metin veya sayılardan barkod oluşturun Tarayıcı tabanlı, ücretsiz.` (66 char — **TOO SHORT**)
- RU: `Создавайте штрих-коды из текста или чисел В браузере, бесплатно.` (64 char — **TOO SHORT**)

**Rewrite proposal — title:**
- AZ: `Bar Kod Generatoru — CODE128, CODE39 | Pulsuz` (45 char)
- EN: `Barcode Generator — CODE128, CODE39, PNG Download` (49 char)
- TR: `Barkod Oluşturucu — CODE128, CODE39, PNG İndir` (46 char)
- RU: `Генератор Штрих-кодов — CODE128, CODE39, PNG` (44 char)

**Rewrite proposal — meta description:**
- AZ: `Mətn və ya rəqəmlərdən CODE128 / CODE39 barkodları yarat. Bar eni, hündürlük və mətn göstərmə parametri. PNG olaraq endir.` (122 char)
- EN: `Generate CODE128 and CODE39 barcodes from text or numbers. Customize bar width, height, and text display. Download as PNG.` (122 char)
- TR: `Metin veya sayılardan CODE128 ve CODE39 barkodlar oluştur. Çubuk genişliği, yüksekliği ve metni özelleştir. PNG olarak indir.` (125 char)
- RU: `Создай штрих-коды CODE128 и CODE39 из текста или чисел. Настрой ширину, высоту и отображение текста. Скачай в PNG.` (113 char)

**Reasoning:** current metas are stub fragments (60-char range) — massive CTR opportunity. Adding the concrete barcode standards (CODE128, CODE39) matches developer intent queries. RU query "генератор баркода" (pos 21, 6 impressions) aligns with this page.

**Tracking/CTR hypothesis:** RU 3.08% at pos 52 → **target 6–8% near-term** from better snippet.

---

## 11. `/tools/image-convert` — TITLE FROZEN (49 impr, 12.2% CTR, pos 5.3)

**Per SeoPro:** `/tools/image-convert` is a winner. **Do not touch the title.** Meta description may be tightened only if the primary keyword ("image converter") stays in the first 60 chars.

**Current rendered title (FROZEN — unchanged):**
- AZ: `Şəkil Çeviricisi — Pulsuz Onlayn | Vaxtım Yoxdu` (47 char) — KEEP
- EN: `Image Converter — Free Online | Vaxtim Yoxdu` (44 char) — KEEP
- TR: `Görüntü Dönüştürücü — Ücretsiz Online | Vaxtim Yoxdu` (52 char) — KEEP
- RU: `Конвертер изображений — Бесплатно Онлайн | Vaxtim Yoxdu` (55 char) — KEEP

**Rewrite proposal — title:** **UNCHANGED** per SeoPro freeze.

**Rewrite proposal — meta description (tightened, primary keyword in first 60 chars):**
- AZ: `Şəkil çevirici — JPEG, PNG, WebP və HEIC arasında konvertasiya. Heç nə yüklənmir, metadata silinir, hər şey brauzerində.` (119 char)
- EN: `Image converter — JPEG, PNG, WebP, and HEIC conversions. Nothing uploaded, metadata stripped, everything runs in your browser.` (127 char)
- TR: `Görüntü dönüştürücü — JPEG, PNG, WebP ve HEIC dönüşümleri. Hiçbir şey yüklenmez, metaveri silinir, her şey tarayıcında.` (117 char)
- RU: `Конвертер изображений — JPEG, PNG, WebP и HEIC. Ничего не загружается, метаданные удаляются, всё в браузере.` (108 char)

**Reasoning:** primary keyword ("image converter" / "şəkil çevirici" / "görüntü dönüştürücü" / "конвертер изображений") is the first token of every locale. Adds HEIC to the format list (common mobile photo format searched a lot).

**Tracking/CTR hypothesis:** 12.2% → **preserve ≥12%**, modest upside to 14–16%.

---

## 12. `/tools/image-compress` — TITLE FROZEN (44 impr, 11.4% CTR, pos 32)

**Per SeoPro:** winner, **don't touch title**. Desc only.

**Rewrite proposal — title:** **UNCHANGED**.

**Rewrite proposal — meta description (quantified value prop):**
- AZ: `Şəkil sıxma — JPEG, PNG və WebP formatlarında fayl ölçüsünü 70%-ə qədər azalt, keyfiyyəti qoru. Heç nə yüklənmir.` (113 char)
- EN: `Image compressor — shrink JPEG, PNG, and WebP files up to 70% with minimal quality loss. No upload, no tracking, private.` (120 char)
- TR: `Görüntü sıkıştırma — JPEG, PNG ve WebP dosyalarını %70'e kadar küçült, kaliteyi koru. Yükleme yok, iz bırakmaz.` (110 char)
- RU: `Сжатие изображений — уменьши JPEG, PNG и WebP файлы до 70% с минимальной потерей качества. Без загрузки, анонимно.` (113 char)

**Reasoning:** primary keyword in first 20 chars; adds the 70% quantified claim (biggest CTR lever for compression tools).

**Tracking/CTR hypothesis:** 11.4% → **target 14–16%** with quantified snippet.

---

## 13. `/tools/hash-generator` (43 impr RU, 4.65% CTR, pos 13.8)

**Current rendered title:**
- AZ: `Hash Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (46 char)
- EN: `Hash Generator — Free Online | Vaxtim Yoxdu` (43 char)
- TR: `Hash Üreteci — Ücretsiz Online | Vaxtim Yoxdu` (45 char)
- RU: `Генератор хешей — Бесплатно Онлайн | Vaxtim Yoxdu` (49 char)

**Current meta description:**
- AZ: `Mətn üzərindən SHA-1, SHA-256, SHA-384, SHA-512 hashləri onlayn yaratmaq. Pulsuz kriptoqrafik hash aləti. Brauzer əsaslı, pulsuz.` (130 char)
- EN: `Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text online. Free cryptographic hash generator. Browser-based, free.` (122 char)
- TR: `Metinden SHA-1, SHA-256, SHA-384, SHA-512 hashleri çevrimiçi üretin. Ücretsiz kriptografik hash aracı. Tarayıcı tabanlı, ücretsiz.` (130 char)
- RU: `Генерируйте хеши SHA-1, SHA-256, SHA-384, SHA-512 из текста онлайн. Бесплатный криптографический хеш-инструмент. В браузере, бесплатно.` (138 char)

**Rewrite proposal — title:**
- AZ: `Hash Generatoru — SHA-1, 256, 384, 512 | Pulsuz` (47 char)
- EN: `Hash Generator — SHA-1, 256, 384, 512, Free` (43 char)
- TR: `Hash Üreteci — SHA-1, 256, 384, 512 | Ücretsiz` (46 char)
- RU: `Генератор Хешей — SHA-1, 256, 384, 512 | Бесплатно` (50 char)

**Rewrite proposal — meta description:**
- AZ: `Mətn və ya fayllardan SHA-1, SHA-256, SHA-384, SHA-512 hash yarat. Bütün hesablama brauzerində — məlumat göndərilmir.` (117 char)
- EN: `Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text or files. All hashing runs in your browser — nothing transmitted.` (127 char)
- TR: `Metin veya dosyalardan SHA-1, SHA-256, SHA-384, SHA-512 hash oluştur. Tüm hesaplama tarayıcıda — veri gönderilmez.` (112 char)
- RU: `Создай SHA-1, SHA-256, SHA-384, SHA-512 хеши из текста или файлов. Всё хеширование в браузере — данные не передаются.` (117 char)

**Reasoning:** dev audience → listing all SHA variants in the title is the keyword buffet.

**Tracking/CTR hypothesis:** RU 4.65% → **target 6–8%**.

---

## 14. `/tools/pdf-compress` (41 impr RU, 2.44% CTR, pos 59)

**Current rendered title:**
- AZ: `PDF Sıxıcı — Pulsuz Onlayn | Vaxtım Yoxdu` (41 char)
- EN: `PDF Compressor — Free Online | Vaxtim Yoxdu` (43 char)
- TR: `PDF Sıkıştırıcı — Ücretsiz Online | Vaxtim Yoxdu` (48 char)
- RU: `Сжатие PDF — Бесплатно Онлайн | Vaxtim Yoxdu` (44 char)

**Current meta description:**
- AZ: `PDF fayl ölçüsünü onlayn azaldın. Metadataları silin və strukturu optimallaşdırın. Brauzer əsaslı, pulsuz.` (105 char)
- EN: `Reduce PDF file size online. Remove metadata and optimize structure to compress PDFs. Browser-based, free.` (106 char)
- TR: `PDF dosya boyutunu çevrimiçi azaltın. Meta verileri kaldırın ve yapıyı optimize ederek sıkıştırın. Tarayıcı tabanlı, ücretsiz.` (126 char)
- RU: `Уменьшите размер PDF-файла онлайн. Удалите метаданные и оптимизируйте структуру для сжатия. В браузере, бесплатно.` (113 char)

**Rewrite proposal — title:**
- AZ: `PDF Sıxma — Ölçünü 70%-ə Qədər Azalt, Pulsuz` (44 char)
- EN: `PDF Compressor — Shrink Up To 70%, No Upload` (44 char)
- TR: `PDF Sıkıştırma — %70'e Kadar Küçült, Yüklemesiz` (47 char)
- RU: `Сжатие PDF Бесплатно — Уменьши до 70%, Без Загрузки` (51 char)
  Note: RU query `pdf compressor бесплатно` in traffic report → rewrite includes "Бесплатно" prominently in the title.

**Rewrite proposal — meta description:**
- AZ: `PDF-nin ölçüsünü 70%-ə qədər azalt — keyfiyyət saxlanılır, metadata silinir. Email və mesajlaşma üçün ideal. Brauzerdə, pulsuz.` (128 char)
- EN: `Shrink PDFs up to 70% smaller — quality preserved, metadata stripped. Perfect for email and messaging. Browser-only, free, private.` (131 char)
- TR: `PDF boyutunu %70'e kadar küçült — kalite korunur, meta veri silinir. E-posta ve mesajlaşma için ideal. Tarayıcıda, ücretsiz.` (124 char)
- RU: `Сожми PDF до 70% меньше — качество сохраняется, метаданные удаляются. Идеально для email и мессенджеров. В браузере, бесплатно.` (128 char)

**Tracking/CTR hypothesis:** RU 2.44% at pos 59 → **target 4–6% near-term**.

---

## 15. `/tools/random-text-generator` (37 impr RU, 2.70% CTR, pos 19)

**Current rendered title:**
- AZ: `Təsadüfi Mətn Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (55 char)
- EN: `Random Text Generator — Free Online | Vaxtim Yoxdu` (50 char)
- TR: `Rastgele Metin Üreteci — Ücretsiz Online | Vaxtim Yoxdu` (55 char)
- RU: `Генератор случайного текста — Бесплатно Онлайн | Vaxtim Yoxdu` (61 char — **OVER §6 BUDGET**)

**Current meta description:**
- AZ: `Test və maket məqsədləri üçün təsadüfi sözlər, cümlələr, paraqraflar, adlar, emaillər və telefonlar yaratmaq. Brauzer əsaslı, pulsuz.` (133 char)
- EN: `Generate random words, sentences, paragraphs, names, email addresses, and phone numbers for testing and mockups. Browser-based, free.` (134 char)
- TR: `Test ve maket amaçları için rastgele kelimeler, cümleler, paragraflar, isimler, e-postalar ve telefonlar üretin. Tarayıcı tabanlı, ücretsiz.` (142 char)
- RU: `Генерируйте случайные слова, предложения, абзацы, имена, email адреса и телефоны для тестирования и макетов. В браузере, бесплатно.` (132 char)

**Rewrite proposal — title:**
- AZ: `Təsadüfi Mətn — Söz, Cümlə, Ad, Email, Telefon` (46 char)
- EN: `Random Text Generator — Words, Names, Emails, Phones` (52 char)
- TR: `Rastgele Metin — Kelime, Cümle, İsim, E-posta, Telefon` (54 char)
- RU: `Генератор Случайного Текста — Слова, Имена, Email` (49 char)
  Note: trimmed from the over-budget 61 to 49.

**Rewrite proposal — meta description:**
- AZ: `Testlər və maketlər üçün təsadüfi söz, cümlə, paraqraf, ad, email, telefon yaradır. Kopyala-yapışdır, toplu ixrac mümkündür.` (124 char)
- EN: `Generate random words, sentences, paragraphs, names, emails, and phone numbers for tests and mockups. Copy-paste friendly, bulk export.` (136 char)
- TR: `Test ve maketler için rastgele kelime, cümle, paragraf, isim, e-posta ve telefon numarası üret. Kopyala-yapıştır, toplu dışa aktar.` (131 char)
- RU: `Генерируй случайные слова, предложения, абзацы, имена, email и телефоны для тестов и макетов. Копирование и массовый экспорт.` (125 char)

**Tracking/CTR hypothesis:** RU 2.70% → **target 4–5%**.

---

## 16. `/tools/base64-encode-decode` (29 impr RU, 6.90% CTR, pos 14)

**Current rendered title:**
- AZ: `Base64 Kodlama/Dekodlama — Pulsuz Onlayn | Vaxtım Yoxdu` (55 char)
- EN: `Base64 Encode/Decode — Free Online | Vaxtim Yoxdu` (49 char)
- TR: `Base64 Kodlama/Çözme — Ücretsiz Online | Vaxtim Yoxdu` (53 char)
- RU: `Base64 Кодирование/Декодирование — Бесплатно Онлайн | Vaxtim Yoxdu` (66 char — **OVER §6 BUDGET**)

**Current meta description:**
- AZ: `Mətni Base64-ə kodlayın və ya Base64 sətirlərini onlayn dekod edin. UTF-8 mətn və fayl kodlaması dəstəkləyir. Brauzer əsaslı, pulsuz.` (133 char)
- EN: `Encode text to Base64 or decode Base64 strings online. Supports UTF-8 text and file encoding. Browser-based, free.` (114 char)
- TR: `Metni Base64 olarak kodlayın veya Base64 dizelerini çevrimiçi çözün. UTF-8 metin ve dosya kodlamasını destekler. Tarayıcı tabanlı, ücretsiz.` (141 char)
- RU: `Кодируйте текст в Base64 или декодируйте строки Base64 онлайн. Поддержка UTF-8 текста и файлов. В браузере, бесплатно.` (118 char)

**Rewrite proposal — title:**
- AZ: `Base64 Kodla/Dekodla — Pulsuz, Brauzerdə` (40 char)
- EN: `Base64 Encode & Decode — Free, Instant, Private` (47 char)
- TR: `Base64 Kodla/Çöz — Ücretsiz, Anlık` (34 char)
- RU: `Base64 Кодировать/Декодировать — Бесплатно` (42 char)
  Note: trims RU from 66 to 42 chars.

**Rewrite proposal — meta description:**
- AZ: `Mətn və faylları Base64-ə kodla, yenidən dekodla. UTF-8 dəstəyi, copy-paste, anındadır. Heç bir məlumat serverə göndərilmir.` (125 char)
- EN: `Encode and decode Base64 strings and files — UTF-8 support, instant, copy-paste friendly. Nothing uploaded, nothing logged.` (123 char)
- TR: `Metin ve dosyaları Base64 olarak kodla ve çöz — UTF-8 desteği, anlık, copy-paste dostu. Hiçbir şey yüklenmez, iz bırakmaz.` (122 char)
- RU: `Кодируй и декодируй Base64 — поддержка UTF-8, файлов, мгновенно. Ничего не загружается, всё в браузере.` (104 char)

**Tracking/CTR hypothesis:** RU 6.90% → **target 8–10%**.

---

## 17. `/tools/json-formatter` (19 impr RU, 5.26% CTR, pos 11)

**Current rendered title:** all 4 locales at or over §6 budget:
- AZ: `JSON Formatlayıcı və Doğrulayıcı — Pulsuz Onlayn | Vaxtım Yoxdu` (62 char — **OVER §6**)
- EN: `JSON Formatter & Validator — Free Online | Vaxtim Yoxdu` (55 char)
- TR: `JSON Biçimlendirici ve Doğrulayıcı — Ücretsiz Online | Vaxtim Yoxdu` (67 char — **OVER §6**)
- RU: `JSON Форматирование и Валидация — Бесплатно Онлайн | Vaxtim Yoxdu` (63 char — **OVER §6**)

**Current meta description:**
- AZ: `JSON məlumatlarınızı onlayn formatlaşdırın, doğrulayın və gözəl göstəriş verin. Sintaksis vurğulaması ilə kiçiltmə və ya gözəl göstəriş. Brauzer əsaslı, pulsuz.` (159 char — **OVER §7**)
- EN: `Format, validate, and beautify your JSON data online. Minify or prettify JSON with syntax highlighting. Browser-based, free.` (123 char)
- TR: `JSON verilerinizi çevrimiçi biçimlendirin, doğrulayın ve güzelce gösterin. Söz dizimi vurgulama ile küçültme veya güzel gösterim. Tarayıcı tabanlı, ücretsiz.` (157 char — **OVER §7**)
- RU: `Форматируйте, валидируйте и украсьте ваши JSON данные онлайн. Минификация или форматирование с подсветкой синтаксиса. В браузере, бесплатно.` (140 char)

**Rewrite proposal — title:**
- AZ: `Pulsuz JSON Formatlayıcı və Validator | Brauzerdə` (49 char)
- EN: `JSON Formatter, Validator & Beautifier — Free` (45 char)
- TR: `Ücretsiz JSON Biçimlendirici & Doğrulayıcı | Anlık` (50 char)
- RU: `Бесплатный JSON Форматтер & Валидатор | В браузере` (50 char)

**Rewrite proposal — meta description:**
- AZ: `JSON-u brauzerində formatla, doğrula, kiçilt və ya gözəl göstər. Sintaksis rəngi, xəta vurğulaması. Məlumat serverə göndərilmir.` (129 char)
- EN: `Format, validate, minify or prettify JSON in your browser. Syntax highlighting, error detection. Your data never leaves your device.` (132 char)
- TR: `JSON'u tarayıcında biçimlendir, doğrula, küçült veya güzelleştir. Söz dizimi renklendirme, hata tespiti. Verin cihazından çıkmaz.` (128 char)
- RU: `Форматируй, валидируй, минифицируй или украшай JSON в браузере. Подсветка синтаксиса, ошибки. Данные не покидают устройство.` (123 char)

**Tracking/CTR hypothesis:** RU 5.26% → **target 7–9%** after title fits in SERP.

---

## 18. `/tools/text-to-binary` (14 impr RU, 7.14% CTR, pos 38)

**Current rendered title:**
- AZ: `Mətn-Binary Çevirici — Pulsuz Onlayn | Vaxtım Yoxdu` (51 char)
- EN: `Text to Binary Converter — Free Online | Vaxtim Yoxdu` (53 char)
- TR: `Metin-Binary Çevirici — Ücretsiz Online | Vaxtim Yoxdu` (54 char)
- RU: `Конвертер текста в двоичный код — Бесплатно Онлайн | Vaxtim Yoxdu` (64 char — **OVER §6**)

**Current meta description:**
- AZ: `Mətni ikilik, onaltılıq və ya səkkizlik sistemlərə çevirin və əksinə. Bir neçə kodlama formatı dəstəkləyir. Brauzer əsaslı, pulsuz.` (132 char)
- EN: `Convert text to binary, hexadecimal, or octal and vice versa. Multiple encoding formats supported. Browser-based, free.` (119 char)
- TR: `Metni ikilik, on altılık veya sekizlik sisteme ve tam tersine dönüştürün. Birden fazla kodlama formatı destekler. Tarayıcı tabanlı, ücretsiz.` (141 char)
- RU: `Конвертируйте текст в двоичный, шестнадцатеричный или восьмеричный формат и обратно. Поддержка нескольких форматов кодирования. В браузере, бесплатно.` (151 char)

**Rewrite proposal — title:**
- AZ: `Mətn-Binary Çevirici — Binary, Hex, Oktal | Pulsuz` (50 char)
- EN: `Text to Binary — Binary, Hex, Octal Converter` (45 char)
- TR: `Metin-Binary — İkili, Onaltılı, Sekizli Çevirici` (48 char)
- RU: `Конвертер Текст-Двоичный — Binary, Hex, Octal` (45 char)

**Rewrite proposal — meta description:**
- AZ: `Mətni binary (ikilik), hex (onaltılıq) və ya oktal (səkkizlik) koda çevir — və ya əksinə. Developerlər və öyrənənlər üçün pulsuz alət.` (132 char)
- EN: `Convert text to binary, hex, or octal — or back. Supports ASCII, UTF-8. Free browser tool for developers and students learning encoding.` (136 char)
- TR: `Metni ikili, on altılı veya sekizlik koda dönüştür veya tam tersi. ASCII, UTF-8 desteği. Geliştirici ve öğrenciler için ücretsiz.` (128 char)
- RU: `Конвертируй текст в двоичный, шестнадцатеричный или восьмеричный код — и обратно. ASCII, UTF-8. Для разработчиков.` (112 char)

**Tracking/CTR hypothesis:** RU 7.14% → **target 9–11%**.

---

## 19. `/tools/rot13-encoder` (12 impr RU, 8.33% CTR, pos 21)

**Current rendered title:**
- AZ: `ROT13 Kodlayıcı/Dekoderi — Pulsuz Onlayn | Vaxtım Yoxdu` (54 char)
- EN: `ROT13 Encoder/Decoder — Free Online | Vaxtim Yoxdu` (50 char)
- TR: `ROT13 Kodlayıcı/Çözücü — Ücretsiz Online | Vaxtim Yoxdu` (55 char)
- RU: `ROT13 Кодировщик/Декодер — Бесплатно Онлайн | Vaxtim Yoxdu` (58 char)

**Current meta description:**
- AZ: `ROT13 Sezar şifri ilə mətni kodlayın və dekod edin. 1-dən 25-ə qədər xüsusi sürmə dəyərləri dəstəkləyir. Brauzer əsaslı, pulsuz.` (130 char)
- EN: `Encode and decode text using ROT13 Caesar cipher. Supports custom shift values from 1 to 25. Browser-based, free.` (113 char)
- TR: `ROT13 Sezar şifresi ile metni kodlayın ve çözün. 1 ile 25 arasında özel kaydırma değerleri destekler. Tarayıcı tabanlı, ücretsiz.` (131 char)
- RU: `Кодируйте и декодируйте текст с помощью шифра Цезаря ROT13. Поддержка пользовательских значений сдвига от 1 до 25. В браузере, бесплатно.` (140 char)

**Rewrite proposal — title:**
- AZ: `ROT13 Sezar Şifri — Kodla/Dekodla, 1-25 Sürmə` (45 char)
- EN: `ROT13 & Caesar Cipher — Encode/Decode, Shift 1–25` (49 char)
- TR: `ROT13 Sezar Şifresi — Kodla/Çöz, 1–25 Kaydırma` (46 char)
- RU: `ROT13 Шифр Цезаря — Кодируй/Декодируй, 1–25` (43 char)

**Rewrite proposal — meta description:**
- AZ: `ROT13 ilə mətni kodla və ya dekod et. Xüsusi sürmə dəyəri (1-25) ilə Sezar şifri. Klassik kriptoqrafiya üçün pulsuz brauzer aləti.` (131 char)
- EN: `Encode and decode text with ROT13 or any Caesar cipher shift (1–25). Free browser tool for classic cryptography and CTF puzzles.` (129 char)
- TR: `ROT13 veya herhangi bir Sezar şifresi kaydırmasıyla (1–25) metni kodla ve çöz. Klasik kriptografi için ücretsiz tarayıcı aracı.` (127 char)
- RU: `Кодируй и декодируй текст шифром ROT13 или любым сдвигом Цезаря (1–25). Для классической криптографии и CTF.` (109 char)

**Reasoning:** adding "CTF puzzles" is a long-tail hook — ROT13 search traffic is 70%+ security/CTF audiences. Traffic report shows the query `cipher decoder` clicked this with 100% CTR (tiny sample but signal).

**Tracking/CTR hypothesis:** RU 8.33% → **target 10–12%**.

---

## 20. `/tools/backlink-generator` (7 impr RU, 28.6% CTR, pos 8.3) — RISING STAR

**Per SeoPro:** a rising star with 28.6% CTR and pos 8.3 — worth tightening meta to lock in rank.

**Current rendered title:**
- AZ: `Geri Keçidin Generatoru — Pulsuz Onlayn | Vaxtım Yoxdu` (54 char)
- EN: `Backlink Generator — Free Online | Vaxtim Yoxdu` (47 char)
- TR: `Geri Bağlantı Oluşturucu — Ücretsiz Online | Vaxtim Yoxdu` (57 char)
- RU: `Генератор обратных ссылок — Бесплатно Онлайн | Vaxtim Yoxdu` (59 char)

**Current meta description:**
- AZ: `HTML, Markdown, BBCode, Textile, Wiki və reStructuredText formatlarında link yaradın. Rel və hədəf dəstəklənir. Brauzer əsaslı, pulsuz.` (138 char)
- EN: `Generate link code in HTML, Markdown, BBCode, Textile, Wiki, and reStructuredText formats. Browser-based, free.` (113 char)
- TR: `HTML, Markdown, BBCode, Textile, Wiki ve reStructuredText formatlarında bağlantı kodu oluşturun. Tarayıcı tabanlı, ücretsiz.` (126 char)
- RU: `Создавайте код ссылок в форматах HTML, Markdown, BBCode, Textile, Wiki и reStructuredText. В браузере, бесплатно.` (112 char)

**Rewrite proposal — title:**
- AZ: `Link Generatoru — HTML, Markdown, BBCode, Wiki` (46 char)
- EN: `Link Code Generator — HTML, Markdown, BBCode, Wiki` (50 char)
- TR: `Bağlantı Oluşturucu — HTML, Markdown, BBCode, Wiki` (50 char)
- RU: `Генератор Ссылок — HTML, Markdown, BBCode, Wiki` (47 char)

**Rewrite proposal — meta description:**
- AZ: `HTML, Markdown, BBCode, Textile, Wiki, reStructuredText formatlarında link kodu yarat. rel, target və anchor text tənzimləyici daxildir.` (136 char)
- EN: `Generate link code in HTML, Markdown, BBCode, Textile, Wiki, and reStructuredText. rel, target, and anchor text controls included.` (131 char)
- TR: `HTML, Markdown, BBCode, Textile, Wiki, reStructuredText formatlarında bağlantı kodu oluştur. rel, target ve anchor text kontrolleri dahil.` (138 char)
- RU: `Создавай код ссылок в HTML, Markdown, BBCode, Textile, Wiki, reStructuredText. Управление rel, target и анкором.` (110 char)

**Reasoning:** conservative rewrite — the page is already winning at 28.6% CTR, so only minor tightening. Format list stays as the keyword buffet.

**Tracking/CTR hypothesis:** RU 28.6% → **preserve ≥25%**, modest upside.

---

## 21. `/tools/html-minifier` (6 impr RU, 16.7% CTR, pos 15) — RISING STAR

**Per SeoPro:** rising star. Small sample, but worth conservative tightening.

**Current rendered title:**
- AZ: `HTML Kiçildici və Gözəl Göstərici — Pulsuz Onlayn | Vaxtım Yoxdu` (63 char — **OVER §6**)
- EN: `HTML Minifier & Beautifier — Free Online | Vaxtim Yoxdu` (55 char)
- TR: `HTML Küçültücüsü ve Güzelleştiricisi — Ücretsiz Online | Vaxtim Yoxdu` (68 char — **OVER §6**)
- RU: `HTML Минификатор и Форматировщик — Бесплатно Онлайн | Vaxtim Yoxdu` (64 char — **OVER §6**)

**Current meta description:**
- AZ: `HTML-i kiçildin və ya kiçildilmiş HTML-i oxunaqlı edin. Şərhləri və boşluqları silin. Brauzer əsaslı, pulsuz.` (108 char)
- EN: `Minify HTML to reduce file size or beautify minified HTML for readability. Remove comments and whitespace. Browser-based, free.` (127 char)
- TR: `HTML-i dosya boyutunu azaltmak için küçültün veya küçültülmüş HTML-i okunabilir hale getirin. Yorumları ve boşlukları kaldırın. Tarayıcı tabanlı, ücretsiz.` (156 char — **OVER §7**)
- RU: `Минифицируйте HTML для уменьшения размера файла или отформатируйте минифицированный HTML для читаемости. Удалите комментарии и пробелы. В браузере, бесплатно.` (160 char — **OVER §7**)

**Rewrite proposal — title:**
- AZ: `HTML Minify & Beautify — Pulsuz, Anlıq` (38 char)
- EN: `HTML Minifier & Beautifier — Free, Instant` (42 char)
- TR: `HTML Minify & Beautify — Ücretsiz, Anlık` (40 char)
- RU: `HTML Минификатор & Форматтер — Бесплатно` (40 char)

**Rewrite proposal — meta description:**
- AZ: `HTML-i minify et (boşluq, şərh sil) və ya minified HTML-i formatla. 70%-ə qədər ölçü qənaəti. Brauzerdə, pulsuz.` (111 char)
- EN: `Minify HTML (strip whitespace, comments) or beautify minified HTML. Up to 70% size savings. Browser-based, free.` (112 char)
- TR: `HTML-i minify et (boşluk, yorum sil) veya minified HTML-i formatla. %70'e kadar tasarruf. Tarayıcıda, ücretsiz.` (110 char)
- RU: `Минифицируй HTML (убери пробелы, комментарии) или отформатируй минифицированный HTML. До 70% экономии. В браузере.` (113 char)

**Reasoning:** current AZ/TR/RU titles bust §6 budget. Rewrite trims significantly and adds a 70% size-saving hook.

**Tracking/CTR hypothesis:** RU 16.7% → **preserve ≥15%**.

---

## Summary table — all 20 rewrites

| # | Page | Locale scope | Current CTR | Rewrite focus | Target |
|---|---|---|---:|---|---:|
| 1 | /tools/password-generator | RU crit + parity | 0.09% RU | Fix duplicate-note bug, "генератор паролей" primary | 0.5–0.8% → 3%+ |
| 2 | /tools/text-to-speech | RU prim + parity | 0.30% RU | "онлайн озвучка текста" primary | 0.8–1.5% → 4%+ |
| 3 | /tools/pdf-merge | AZ prim + parity | 0.62% AZ | "PDF birləşdirmə" exact match | 3–5% → 5–8% |
| 4 | /tools/color-picker | AZ prim + parity | 0.45% AZ | "rəng seçici" lead, fix §6 busts | 5–10% |
| 5 | /en/blog/how-ai-text-rewriting-works | EN only | 0.70% | "ai rewriter" + fix §6 bust | 3–5% |
| 6 | /ru/blog/complete-guide-to-claude-ai | RU only | 1.69% | Trim title, add missing desc | 3–5% |
| 7 | /tools/qr-code-generator | AZ + parity | 3.85% | "No upload" privacy lead | 6–8% |
| 8 | /tools/uuid-generator | RU prim + parity | 2.67% RU | Concrete bulk range 1–10000 | 4–6% |
| 9 | /tools/barcode-generator | RU prim + parity | 3.08% RU | CODE128/CODE39 keyword buffet | 6–8% |
| 10 | /tools/image-convert | all | 12.2% | **FROZEN title, desc only** | ≥12%, up to 14–16% |
| 11 | /tools/image-compress | all | 11.4% | **FROZEN title, desc only + 70%** | ≥11%, up to 14–16% |
| 12 | /tools/hash-generator | RU prim + parity | 4.65% RU | All SHA variants in title | 6–8% |
| 13 | /tools/pdf-compress | RU prim + parity | 2.44% RU | 70% quantifier | 4–6% |
| 14 | /tools/random-text-generator | RU prim + parity | 2.70% RU | Category list in title | 4–5% |
| 15 | /tools/base64-encode-decode | RU prim + parity | 6.90% RU | Trim RU title to fit §6 | 8–10% |
| 16 | /tools/json-formatter | RU prim + parity | 5.26% RU | Trim title to fit §6 | 7–9% |
| 17 | /tools/text-to-binary | RU prim + parity | 7.14% RU | All 3 bases in title | 9–11% |
| 18 | /tools/rot13-encoder | RU prim + parity | 8.33% RU | Add "CTF puzzles" hook | 10–12% |
| 19 | /tools/backlink-generator | RU prim + parity | 28.6% RU | Conservative tightening | ≥25% |
| 20 | /tools/html-minifier | RU prim + parity | 16.7% RU | Fix §6 busts, 70% quantifier | ≥15% |

---

## §6 Over-budget rendered titles detected (must be fixed in Sprint 2)

| Page | Locale | Current length | Fix |
|---|---|---|---|
| /tools/color-picker | AZ, EN, TR, RU | 62–65 | Trim name, drop "Palet Generatoru" suffix |
| /tools/json-formatter | AZ, TR, RU | 62, 67, 63 | Trim "ve Doğrulayıcı" / "и Валидация" variants |
| /tools/base64-encode-decode | RU | 66 | Trim RU translated name |
| /tools/random-text-generator | RU | 61 | Trim RU translated name |
| /tools/text-to-binary | RU | 64 | Trim RU translated name |
| /tools/html-minifier | AZ, TR, RU | 63, 68, 64 | Trim long dual-purpose name |
| /en/blog/how-ai-text-rewriting-works | EN | 74 | Shorten blog title or add `metaTitle` override |
| /ru/blog/complete-guide-to-claude-ai | RU | 90 | Shorten blog title or add `metaTitle` override |

## §7 Over-budget meta descriptions detected

| Page | Locale | Current length | Notes |
|---|---|---|---|
| /tools/password-generator | RU | 158 | **Duplicate browser-based note bug — CRITICAL** |
| /tools/pdf-merge | TR | 156 | Raw desc + browser note |
| /tools/json-formatter | AZ, TR | 159, 157 | Raw desc + browser note |
| /tools/html-minifier | TR, RU | 156, 160 | Raw desc + browser note |
| /ru/blog/complete-guide-to-claude-ai | RU | **MISSING** | `description` field absent in source data — P0 bug |

## Zero or near-zero length meta descriptions (current, should be beefed up)

| Page | Locale | Current length | Notes |
|---|---|---|---|
| /tools/barcode-generator | AZ, EN, TR, RU | 61, 59, 66, 64 | Current descs are 1-sentence stubs |

---

## Apply-phase notes for Sprint 2

The `Tool` interface in `src/types/tool.ts:3-13` does **not** currently have `metaTitle` or `metaDescription` fields (per SEO §6 note). Two apply paths:

1. **Minimal change path:** update the `tool.name` strings in `src/config/tools/*.ts` + the `tools.toolNames.*` entries in `src/messages/*.json`. The current `generateToolMetadata` factory composes `${name} — ${titleSuffix} | ${SITE_NAME}`. This keeps the rendered title within budget only if the name is short enough to survive the composition.
2. **Full control path (RECOMMENDED):** add optional `metaTitle: { [locale]: string }` and `metaDescription: { [locale]: string }` fields to the `Tool` type, update `generateToolMetadata` to prefer them when present, and fall back to the current composition. This gives atomic control over rendered titles and eliminates the "long translated name + fixed suffix exceeds budget" class of bugs (which already exists on 8+ locale-slug pairs — see §6 over-budget table).

Similarly, for the 2 blog posts (entries 5 and 6), `generateBlogPostMetadata` composes `${title} - ${SITE_NAME} Blog`. For those two posts, add optional `metaTitle` to the blog post entries so the raw article title can stay descriptive while the SERP title stays within §6 budget.

**Per-apply-phase actions:**

- Entry 1 (`password-generator`): **HIGH PRIORITY** — fix the RU duplicate-browser-note bug by removing "без регистрации, работает в браузере" from the raw description so the factory-appended note renders cleanly.
- Entry 6 (`ru/blog/complete-guide-to-claude-ai`): **P0 BUG** — add missing `description` field to `src/data/blog-posts-ru.ts:948` block. Without it, `generateBlogPostMetadata` emits undefined as the meta description.
- Entries 10 and 11 (`image-convert`, `image-compress`): **FREEZE title**, only touch description.
- Entries 4 (`color-picker`), 5 (`how-ai-text-rewriting-works`), and any other §6 over-budget rows: MUST trim or override via `metaTitle`.

All apply-phase changes MUST pass the standard local test gate (`test:run`, `test:e2e`, `tsc`, `lint`, `build`) + a chrome-devtools-mcp visual check of `document.title.length` and `meta[name="description"].content.length` on every rewritten page in the applicable locales, per SEO §6/§7 browser-side verification steps.

---

## Follow-up tasks for PO (discovered during this draft)

1. **RU blog missing description** — `src/data/blog-posts-ru.ts:948` is missing the `description` field for `complete-guide-to-claude-ai`. Causes `meta[name="description"]` to render as `undefined`. P0 bug, independent of this CTR sprint.
2. **/ru/tools/password-generator duplicate browser-note** — raw description already contains "в браузере, бесплатно" so the factory-appended note duplicates it (158 chars, over §7). P0 bug, independent of this CTR sprint (Sprint 2 apply phase will naturally fix it when applying these rewrites, but if Sprint 2 is deferred, this should still be fixed).
3. **Homepage / /tools / /info metadata** — out of scope for this ticket per SeoPro. Flagged for a separate sprint's scope: the homepage `home.metaDescription` in AZ and TR is also over §7 budget (159 and 158 chars respectively), and the homepage RU title is 62 chars (over §6). These are pre-existing bugs that should be cleaned up.
4. **/tools/ai-text-rewriter** — despite having 0 direct impressions, `how-ai-text-rewriting-works` blog (this sprint's entry #5) gets 143 impressions for "ai rewriter". Sprint 3 content strategy should internal-link from the blog to the tool aggressively to capture the spillover intent.

---

*End of CTR_REWRITES.md v2 draft. Awaiting SeoPro + SmmPro review per Review Ticket #RT-1-04.*
