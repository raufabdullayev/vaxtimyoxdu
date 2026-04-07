# Typo Fix Report: Components (Azerbaijani Diacritics)

**Date:** 2026-04-08
**Agent:** general-purpose (typo-fix-components)
**Scope:** `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/components/**/*.tsx`

## Summary

| Metric | Count |
|--------|-------|
| Total `.tsx` files in `src/components` | 284 |
| Non-test `.tsx` files inspected | 143 |
| Files containing real Azerbaijani text (with or without diacritics) in non-test code | 1 |
| Files modified | 1 |
| Total fixes applied | 1 |

## Methodology

1. Globbed all `src/components/**/*.tsx` files (284 total, 143 excluding `__tests__`).
2. Scanned every non-test file for diacritic characters `ə ş ğ ç ö ü Ə Ş Ğ Ç Ö Ü` to find files that already contained Azerbaijani.
3. Built a typo lookup table (~110 common Azerbaijani words mapped to their diacritic-less variants: `Paylas/Paylaş`, `Oxsar/Oxşar`, `Aletler/Alətlər`, `Sehife/Səhifə`, `Cevir/Çevir`, `Yukle/Yüklə`, `Daxiletme/Daxiletmə`, `Sec/Seç`, `Hazirdir/Hazırdır`, `Xeber/Xəbər`, etc.).
4. Walked all string literals (single, double, backtick) and JSX text nodes in non-test files, matching them against the typo table with word-boundary regex.
5. Filtered out false positives: imports, CSS class names, route paths, variable/function names, English `sec` (used as "seconds" abbreviation in `WordCounter.tsx`, `MarketTracker.tsx`, `UnitConverter.tsx`), and the brand name "Vaxtim Yoxdu".

## Key Finding

The component layer is overwhelmingly English-only — all user-facing text comes from i18n message files (`src/messages/{az,en,tr,ru}.json`) via `useTranslations()`. Only **one** non-test component had a hardcoded Azerbaijani string, and it had two diacritic errors in the same string.

## Fixes Applied (1 file, 1 fix)

| # | File | Line | Old | New |
|---|------|------|-----|-----|
| 1 | `src/components/layout/RelatedArticles.tsx` | 15 | `title = 'Oxsar xerberler'` | `title = 'Oxşar xəbərlər'` |

This is the default value of the `title` prop on the `RelatedArticles` component. The fix corrects two diacritic errors in one string:
- `Oxsar` → `Oxşar` (missing `ş`)
- `xerberler` → `xəbərlər` (missing two `ə` and one consonant correction `r`→`b`)

## Files NOT Touched (Despite Containing Apparent Diacritics)

- **`src/components/tools/text/SlugGenerator.tsx`** (lines 17–22) — contains diacritic characters (`ç ş ğ ö ü ı` etc.) but they live inside an `ACCENT_MAP` constant that defines the input character classes for slug normalization. These are technical regex inputs, not display text. Modifying them would break the slug generator.

- **`src/components/__tests__/**`** — test files contain Azerbaijani test fixtures (e.g. `CookieConsent.test.tsx`, `Header.test.tsx`, `Newsletter.test.tsx`). These are test mocks, not user-facing UI strings. The task scoped only `src/components/`, and the user instruction was to fix component code; test fixtures already use correct diacritics anyway.

- **English UI strings** — the bulk of components (`PdfSplit`, `ImageResize`, `JwtDecoder`, `MarkdownToHtml`, `ChmodCalculator`, `GradientGenerator`, `TextDiff`, `TextRepeater`, `Sidebar`, `RelatedBlogPosts`, `NewsRelatedTools`, etc.) are written entirely in English (UI labels, button text, headings). Multi-language support is delivered via `next-intl`, not via hardcoded Azerbaijani in JSX. These strings were left untouched per task rules ("İngilis dilindəki mətnlər … qalmalıdır").

- **Brand name "Vaxtim Yoxdu"** in `Footer.tsx`, `Header.tsx`, `PomodoroTimer.tsx` — left untouched per task rules ("Brand adları").

- **English `sec` token** in `WordCounter.tsx` (lines 24, 25, 39), `MarketTracker.tsx` (line 309–310), `UnitConverter.tsx` (line 49) — these are the English abbreviation for "seconds", not the Azerbaijani word "seç". They are part of code logic / English UI labels and were correctly left alone.

## Conclusion

The codebase is in very good shape regarding hardcoded Azerbaijani text. Component text is properly externalized to i18n files. Only one residual hardcoded Azerbaijani default-prop value existed in the entire `src/components/` tree, and it has been corrected. No further typo fixes are warranted under the constraints of this task.
