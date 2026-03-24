# New Tool Ideas for vaxtimYoxdu.com
> Prepared by IdeaPro | 2026-03-24

## Research Summary

### Current State
- **60 tools** across 6 categories (AI: 3, PDF: 3, Image: 6, Dev: 22, Gen: 18, Text: 15)
- All client-side tools run in-browser (except 3 AI tools and Market Tracker)

### Competitor Analysis
| Competitor | Tools | Strength |
|---|---|---|
| TinyWow | 250+ | AI writing, PDF, image, video — freemium model |
| iLovePDF | 25+ | PDF specialization, clean UX |
| SmallDevTools | 30+ | Developer-focused, minimal UI |
| IT-Tools | 80+ | Open-source, self-hostable, dev-heavy |
| ToolWaves | 150+ | 100% client-side, privacy-first |

### Key Gaps Identified
1. **Finance/Calculator** — no calculator tools at all (competitors have 10+)
2. **CSS Generators** — only gradient generator; missing box-shadow, flexbox, etc.
3. **Social Media** — zero social media tools (high search volume category)
4. **PDF** — only 3 tools vs competitors' 15-25

---

## TOP 10 New Tool Proposals

### 1. CSS Box Shadow Generator
- **Category:** Dev
- **Slug:** `css-box-shadow-generator`
- **Why:** Extremely high search volume ("CSS box shadow generator" — one of top CSS tool searches). We have gradient generator but not this. Direct competitor to cssgenerator.org, cssmatic.com.
- **Implementation:** Visual sliders for offsetX, offsetY, blur, spread, color, inset. Multiple shadows support. Live preview on a card element. Copy CSS output.
- **Complexity:** Low (pure CSS manipulation + sliders)
- **Client-side:** Yes

### 2. Loan / EMI Calculator
- **Category:** Generators (or new "Finance" category)
- **Slug:** `loan-calculator`
- **Why:** "Loan calculator" has massive search volume globally. Zero finance tools currently. Opens a whole new user segment (non-tech users looking for practical tools).
- **Implementation:** Input: loan amount, interest rate, term (months/years). Output: monthly payment, total interest, total amount. Amortization table. Visual chart (pie or bar).
- **Complexity:** Low (math formulas, no API needed)
- **Client-side:** Yes

### 3. BMI Calculator
- **Category:** Generators (or new "Health" category)
- **Slug:** `bmi-calculator`
- **Why:** Evergreen search term. Attracts non-tech audience. TinyWow and calculator sites all have it. Simple to implement, high SEO value.
- **Implementation:** Input: height (cm/ft), weight (kg/lbs). Output: BMI value, category (underweight/normal/overweight/obese), visual gauge. Metric/Imperial toggle.
- **Complexity:** Very Low
- **Client-side:** Yes

### 4. Age Calculator
- **Category:** Generators
- **Slug:** `age-calculator`
- **Why:** "Age calculator" — one of the most searched calculator queries worldwide. Very simple to build, good for broadening audience beyond developers.
- **Implementation:** Input: date of birth. Output: exact age in years/months/days, next birthday countdown, day of birth (weekday), total days/hours/minutes lived.
- **Complexity:** Very Low
- **Client-side:** Yes

### 5. CSS Flexbox Generator
- **Category:** Dev
- **Slug:** `css-flexbox-generator`
- **Why:** Flexbox is the most-used CSS layout system. Visual generators are extremely popular among both junior and senior developers. IT-Tools has one.
- **Implementation:** Visual playground with container/items. Toggle direction, wrap, justify-content, align-items, gap. Add/remove flex items. Live preview + copy CSS.
- **Complexity:** Medium (interactive visual editor)
- **Client-side:** Yes

### 6. Hashtag Generator
- **Category:** Text (or new "Social" category)
- **Slug:** `hashtag-generator`
- **Why:** Instagram/TikTok creators constantly search for hashtag tools. Opens social media audience. No competitors in our dev-focused tool set — differentiation opportunity.
- **Implementation:** Input: topic/keyword. Output: categorized hashtags (popular, niche, trending patterns). Copy all or individual. Character count for platform limits (Instagram 30 max, Twitter 280 char). Preset categories (travel, food, tech, fitness).
- **Complexity:** Low (curated lists + keyword matching, no API needed)
- **Client-side:** Yes

### 7. Barcode Generator
- **Category:** Generators
- **Slug:** `barcode-generator`
- **Why:** Complements our QR Code Generator. High business utility. TinyWow and IT-Tools have it. Supports multiple formats (Code128, EAN-13, UPC-A, etc.).
- **Implementation:** Use JsBarcode library (MIT, client-side). Input: value + format selection. Output: barcode image, download as PNG/SVG.
- **Complexity:** Very Low (library does heavy lifting)
- **Client-side:** Yes

### 8. JSON to TypeScript Interface Generator
- **Category:** Dev
- **Slug:** `json-to-typescript`
- **Why:** TypeScript adoption is at all-time high (2025-2026). Developers frequently need to convert API responses to TS interfaces. Unique tool that most competitors lack. High relevance to our developer audience.
- **Implementation:** Paste JSON, auto-generate TypeScript interfaces. Options: interface vs type, optional properties, readonly, nested interface naming. Copy output.
- **Complexity:** Medium (recursive type inference)
- **Client-side:** Yes

### 9. Percentage Calculator
- **Category:** Generators
- **Slug:** `percentage-calculator`
- **Why:** "Percentage calculator" is a top-10 calculator search query. Extremely simple, extremely high traffic potential. Students, business users, everyone needs it.
- **Implementation:** Three modes: "What is X% of Y?", "X is what % of Y?", "% change from X to Y". Instant results. Clean, focused UI.
- **Complexity:** Very Low
- **Client-side:** Yes

### 10. CSS Grid Generator
- **Category:** Dev
- **Slug:** `css-grid-generator`
- **Why:** CSS Grid is the second most important layout system after Flexbox. Visual grid builders are highly searched. Pairs perfectly with Flexbox Generator (tool #5). Few competitors have a good one.
- **Implementation:** Visual grid editor: set rows/columns (count + size), gap, place items by drag. Named areas support. Live preview + copy CSS. Template presets (Holy Grail, Sidebar, Dashboard).
- **Complexity:** Medium-High (drag-and-drop grid placement)
- **Client-side:** Yes

---

## Priority Matrix

| # | Tool | Complexity | SEO Value | Audience Broadening | Priority |
|---|---|---|---|---|---|
| 1 | CSS Box Shadow Generator | Low | High | Medium | P1 |
| 2 | Loan Calculator | Low | Very High | Very High | P1 |
| 3 | BMI Calculator | Very Low | Very High | Very High | P1 |
| 4 | Age Calculator | Very Low | Very High | Very High | P1 |
| 5 | CSS Flexbox Generator | Medium | High | Medium | P2 |
| 6 | Hashtag Generator | Low | High | Very High | P1 |
| 7 | Barcode Generator | Very Low | High | High | P1 |
| 8 | JSON to TypeScript | Medium | Medium | Low | P2 |
| 9 | Percentage Calculator | Very Low | Very High | Very High | P1 |
| 10 | CSS Grid Generator | Medium-High | High | Medium | P2 |

### Recommended Implementation Order
**Sprint A (fast wins — 6 tools):** Age Calculator, BMI Calculator, Percentage Calculator, Barcode Generator, CSS Box Shadow Generator, Hashtag Generator
**Sprint B (medium effort — 4 tools):** Loan Calculator, CSS Flexbox Generator, JSON to TypeScript, CSS Grid Generator

---

## Strategic Notes

1. **Audience Diversification:** Tools 2, 3, 4, 9 (calculators) target non-developer users — this is critical for growing beyond the dev niche. These tools have massive search volume and very low competition for Azerbaijani-language versions.

2. **New Category Potential:** If 3+ finance/health calculators are added, consider creating a "Calculator" or "Finance" category. This signals to users that vaxtimYoxdu is more than a dev tool site.

3. **SEO Advantage:** All proposed tools are client-side, which means fast load times, no server costs, and strong Core Web Vitals — Google rewards this.

4. **i18n Ready:** All tools should use the existing next-intl setup with translations in AZ/EN/TR/RU from day one.

5. **Competitor Differentiation:** JSON-to-TypeScript (tool #8) and the CSS generators (1, 5, 10) set us apart from generic tool aggregators like TinyWow that focus on non-dev tools.
