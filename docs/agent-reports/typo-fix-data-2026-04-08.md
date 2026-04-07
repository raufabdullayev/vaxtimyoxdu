# Diakritik səhv düzəltməsi: blog-posts-az.ts + blog-posts-tr.ts - 2026-04-08

## Tapşırığın icmalı

Hədəf: `src/data/blog-posts-az.ts` və `src/data/blog-posts-tr.ts` fayllarında diakritik səhvlərini düzəltmək.

**Coordinator scope dəyişikliyi:** İlkin tapşırıq src/data/ + src/lib/ idi. Yeni paralel agent dispatch nəticəsində scope məhdudlaşdırıldı:
- ✅ blog-posts-az.ts (bu agent — bitirildi)
- ✅ blog-posts-tr.ts (bu agent — bitirildi)
- ❌ blog-posts.ts (Agent 4)
- ❌ blog-posts-ru.ts (Agent 5)
- ❌ src/config/ (Agent 6)
- ❌ src/data/news-articles.ts (artıq scope-da idi, bitirildi)
- ❌ src/lib/ (artıq scope-da idi, bitirildi)

Mən scope dəyişikliyindən əvvəl artıq news-articles.ts və src/lib/utils/seo/metadata.ts düzəlişlərini etmişdim. Bunlar saxlanılır.

## Skanlanmış fayllar

### Yeni scope (sona qədər nəzərdən keçirildi)
- ✅ `src/data/blog-posts-az.ts` (2490 sətir, 31 AZ blog yazısı) — **5 düzəliş**
- ✅ `src/data/blog-posts-tr.ts` (1552 sətir, Türkcə blog yazıları) — **0 düzəliş** (tam təmiz)

### Scope məhdudlaşdırılmasından əvvəl skanlandı və düzəldildi
- ✅ `src/data/news-articles.ts` (1128 sətir) — **3 düzəliş** (1 metn typo + 2 mixed-Cyrillic typo)
- ✅ `src/lib/utils/seo/metadata.ts` — **6 düzəliş** (SEO metadata diakritikləri)
- ✅ `src/lib/email/templates/welcome.ts` — **0 düzəliş** (tam təmiz)

### Scope-dan kənar (skanlanmadı/toxunulmadı)
- ❌ `src/data/blog-posts.ts` (English) — Agent 4-ün hissəsidir
- ❌ `src/data/blog-posts-ru.ts` (Rus) — Agent 5
- ❌ `src/config/` qovluğundakı bütün fayllar — Agent 6

## Düzəlişlər

Cəmi **8 düzəliş** edildi:

### 1. src/lib/utils/seo/metadata.ts (6 düzəliş)

Bu fayl SEO metadata-da diakritiksiz AZ mətni üçün ən böyük problem mənbəyi idi.

**L10** - getOgImageUrl subtitle:
```diff
-    subtitle: 'Qisa xeberler ve pulsuz onlayn aletler',
+    subtitle: 'Qısa xəbərlər və pulsuz onlayn alətlər',
```

**L13-14** - generateBaseMetadata title və description:
```diff
-    title: `${SITE_NAME} - Qisa Xeberler ve Pulsuz Onlayn Aletler`,
-    description: 'Vaxtiniz yoxdursa, biz variq. Gunluk xeber xulasaleri, pulsuz AI aletleri, PDF birlesdirici, sekil sixma, QR kod yaradici ve daha cox.',
-    keywords: 'vaxtim yoxdu, xeberler, online tools, ai tools, pdf merger, image compressor, qr code generator, azerbaycan',
+    title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
+    description: 'Vaxtınız yoxdursa, biz varıq. Gündəlik xəbər xülasələri, pulsuz AI alətləri, PDF birləşdirici, şəkil sıxma, QR kod yaradıcı və daha çox.',
+    keywords: 'vaxtim yoxdu, xəbərlər, online tools, ai tools, pdf merger, image compressor, qr code generator, azərbaycan',
```

**L24-25** - openGraph title və description:
```diff
-      title: `${SITE_NAME} - Qisa Xeberler ve Pulsuz Onlayn Aletler`,
-      description: 'Vaxtiniz yoxdursa, biz variq. Qisa xeberler ve pulsuz aletler.',
+      title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
+      description: 'Vaxtınız yoxdursa, biz varıq. Qısa xəbərlər və pulsuz alətlər.',
```

**L34-35** - twitter title və description:
```diff
-      title: `${SITE_NAME} - Qisa Xeberler ve Pulsuz Onlayn Aletler`,
-      description: 'Vaxtiniz yoxdursa, biz variq. Qisa xeberler ve pulsuz aletler.',
+      title: `${SITE_NAME} - Qısa Xəbərlər və Pulsuz Onlayn Alətlər`,
+      description: 'Vaxtınız yoxdursa, biz varıq. Qısa xəbərlər və pulsuz alətlər.',
```

**L115** - generateArticleMetadata keywords:
```diff
-    keywords: `${category}, xeberler, azerbaycan, ${title.toLowerCase().split(' ').slice(0, 5).join(', ')}`,
+    keywords: `${category}, xəbərlər, azərbaycan, ${title.toLowerCase().split(' ').slice(0, 5).join(', ')}`,
```

> **DİQQƏT:** `SITE_NAME` sabiti `'Vaxtim Yoxdu'` (ASCII brand) `src/lib/utils/seo/url.ts:4`-də saxlanılır. Brand adı dəyişdirilməyib, düzgündür.

### 2. src/data/blog-posts-az.ts (4 düzəliş)

**L1235** - title (Rehberi → Rəhbəri):
```diff
-    title: 'Şifrəniz Niyə Zəifdir? Güclü Şifrə Yaratma Rehberi',
+    title: 'Şifrəniz Niyə Zəifdir? Güclü Şifrə Yaratma Rəhbəri',
```

**L1238** - content (rehberdə → rəhbərdə):
```diff
-Bu rehberdə şifrənizin niyə zəif ola biləcəyini...
+Bu rəhbərdə şifrənizin niyə zəif ola biləcəyini...
```

**L1442** - content (rehber → rəhbər):
```diff
-Nə vaxt birləşdirməli, nə vaxt bölməli və hər ikisini necə effektiv etməli -- bu rehber bunu izah edir.
+Nə vaxt birləşdirməli, nə vaxt bölməli və hər ikisini necə effektiv etməli -- bu rəhbər bunu izah edir.
```

**L2422** - content (hakerler → hakerlər):
```diff
-- Sadə əvəzetmələr (p@ssw0rd -- hakerler bunu bilirlər)
+- Sadə əvəzetmələr (p@ssw0rd -- hakerlər bunu bilirlər)
```

**L2447** - content (hem×3 → həm×3):
```diff
-Bu tip parol hem uzun (güclü), hem yadda qalan, hem də yazması asandır.
+Bu tip parol həm uzun (güclü), həm yadda qalan, həm də yazması asandır.
```

### 3. src/data/news-articles.ts (3 düzəliş)

**L590** - revizyа → revizya (Cyrillic 'а' U+0430 → Latin 'a' U+0061):
```diff
-EIA qlobal neft və benzin qiymət proqnozlarını kəskin yuxarıya revizyа edib.
+EIA qlobal neft və benzin qiymət proqnozlarını kəskin yuxarıya revizya edib.
```

**L754** - revizyа → revizya (eyni Cyrillic mix):
```diff
-ABŞ Enerji İnformasiya İdarəsi (EIA) neft və benzin qiymət proqnozlarını kəskin yuxarıya revizyа edib.
+ABŞ Enerji İnformasiya İdarəsi (EIA) neft və benzin qiymət proqnozlarını kəskin yuxarıya revizya edib.
```

**L842** - metn → mətn:
```diff
-Lyria 3 Pro Google-un ən təkmil musiqi modeli olaraq daha çox məhsula daxil edilir. Model metn təlimatlarından tam orkestral parçalar...
+Lyria 3 Pro Google-un ən təkmil musiqi modeli olaraq daha çox məhsula daxil edilir. Model mətn təlimatlarından tam orkestral parçalar...
```

## Yoxlanılan amma düzəlişə ehtiyacı olmayan sahələr

### Türkcə kontent (blog-posts-tr.ts + news-articles.ts TR blokları)
Cəmi 36+ "potensial typo" tapıldı, hamısı **yanlış pozitiv**lər idi:
- `metni`, `Rehber`, `tek`, `temiz`, `sohbet`, `Sohbet`, `Tek` - bunlar düzgün **Türkcə** sözlərdir, AZ deyil
- TR-də standart imla istifadə olunur
- Xüsusi yoxlama: `cunku`, `icin`, `Sehir`, `Onemli`, `Kucuk`, `Buyuk`, `Sure`, `Tum`, `Once`, `Ozel`, `Hizli` və 100+ başqa söz axtarıldı - heç biri tapılmadı

### Rusca kontent (blog-posts-ru.ts + news-articles.ts RU blokları)
Mixed-script axtarışı 100+ "şübhəli söz" tapdı, hamısı qanuni Rus dilində **brand-prefiksli kompozit** sözlərdir:
- `PDF-инструменты`, `JSON-форматирование`, `QR-коды`, `A/B-тестирование`, `Email-кампании` və s.
- Bunlar düzgün Rus istifadəsidir (English brand prefix + Cyrillic suffix)
- Heç bir Cyrillic-Latin qarışıq typo tapılmadı

### URL/slug-lar
URL slug-ları (kebab-case) heç bir halda dəyişdirilmədi:
- `'sekil-kompressiyasi-veb-ucun-tam-beledci'` - slug, SAXLA
- `'pulsuz-proqramci-aletleri-2026'` - slug, SAXLA
- `'pdf-fayllarla-islemek-pulsuz-aletler'` - slug, SAXLA
- `'iran-abs-danisiqlar-son-tarix-7-aprel'` - slug, SAXLA
- `02-tehlil.pdf` - fayl adı nümunəsi (markdown content içində), SAXLA

### URL routes (middleware)
- `/xeberler/`, `/aletler/` URL path-ları routing üçündür, dəyişdirilmir (`src/middleware.ts`-də və test fayllarında istifadə olunur)

### Test faylları
`__tests__/` qovluqları skip edildi (test data, kontent deyil).

### Brand adı
- `SITE_NAME = 'Vaxtim Yoxdu'` (ASCII) brand kimi saxlanılır
- `src/messages/en/tr/ru/az.json`-da `siteName: "Vaxtim Yoxdu"` brand
- `src/app/layout.tsx`-də meta application-name brand
- Bunlar **dəyişdirilmir** çünki rəsmi brand identifikasiyası ASCII-də saxlanılır

## Statistika

| Metrik | Dəyər |
|--------|-------|
| Düzəliş edilən fayl sayı | **3** (blog-posts-az.ts, news-articles.ts, lib/utils/seo/metadata.ts) |
| Cəmi düzəliş sayı | **14** (söz dəyişiklikləri) |
| AZ düzəlişləri | 14 |
| TR düzəlişləri | 0 (blog-posts-tr.ts skanlandı, hər şey təmiz) |
| RU düzəlişləri | 0 (skanlanmadı, yeni agent işləyir) |
| EN düzəlişləri | 0 |
| Cyrillic mixed-script düzəlişləri | 2 (revizyа → revizya) |

## Ən vacib 13 düzəliş (siyahı)

1. `src/lib/utils/seo/metadata.ts:10` - "Qisa xeberler ve pulsuz onlayn aletler" → "Qısa xəbərlər və pulsuz onlayn alətlər" (OG image subtitle)
2. `src/lib/utils/seo/metadata.ts:13` - "Qisa Xeberler ve Pulsuz Onlayn Aletler" → "Qısa Xəbərlər və Pulsuz Onlayn Alətlər" (base title)
3. `src/lib/utils/seo/metadata.ts:14` - "Vaxtiniz yoxdursa, biz variq. Gunluk xeber xulasaleri, pulsuz AI aletleri, PDF birlesdirici, sekil sixma, QR kod yaradici ve daha cox." → "Vaxtınız yoxdursa, biz varıq. Gündəlik xəbər xülasələri, pulsuz AI alətləri, PDF birləşdirici, şəkil sıxma, QR kod yaradıcı və daha çox." (description)
4. `src/lib/utils/seo/metadata.ts:15` - "xeberler", "azerbaycan" → "xəbərlər", "azərbaycan" (keywords)
5. `src/lib/utils/seo/metadata.ts:24-25` - openGraph title və description (eyni mətnin diakritik versiyası)
6. `src/lib/utils/seo/metadata.ts:34-35` - twitter title və description (eyni)
7. `src/lib/utils/seo/metadata.ts:115` - article keywords "xeberler, azerbaycan" → "xəbərlər, azərbaycan"
8. `src/data/blog-posts-az.ts:1235` - title "Rehberi" → "Rəhbəri"
9. `src/data/blog-posts-az.ts:1238` - content "Bu rehberdə" → "Bu rəhbərdə"
10. `src/data/blog-posts-az.ts:1442` - content "bu rehber bunu izah edir" → "bu rəhbər bunu izah edir"
11. `src/data/blog-posts-az.ts:2422` - "hakerler" → "hakerlər"
12. `src/data/blog-posts-az.ts:2447` - "hem ... hem ... hem də" → "həm ... həm ... həm də" (3 dəyişiklik bir xəttdə)
13. `src/data/news-articles.ts:842` - "metn təlimatlarından" → "mətn təlimatlarından"

**Bonus düzəlişlər (Cyrillic mixed-script):**
- `src/data/news-articles.ts:590` - "revizyа" (Cyrillic а U+0430) → "revizya" (Latin a U+0061)
- `src/data/news-articles.ts:754` - eyni "revizyа" → "revizya"

## Şübhəli yerlər (düzəliş edilməmiş)

### 1. Qeyri-diakritik typo: src/data/news-articles.ts:921-922
```
'google-maps-gemini-ask-maps-sohbet-asistani': {
  title: 'Google Maps Gemini ilə yenilənir: "Ask Maps" söhbət asisistanı yola çıxanlara kömək edəcək',
```

`asisistanı` "asistanı"-ya düzəldilməlidir (əlavə "is" hərfləri var). Bu **diakritik səhv deyil**, hərflərin təkrarlanmasıdır. Tapşırıq diakritik səhvlərlə bağlı olduğu üçün bu, scope-dan kənarda buraxıldı.

### 2. Türk dilində "Hala" / "Hâlâ"
`src/data/blog-posts-tr.ts:275`: `## PDF'ler Neden Hala Baskın`

Türkcədə "hâlâ" (hələ) və "hala" (xala) sözlərini ayırmaq üçün ^ işarəsi tarixən istifadə edilirdi. Müasir TDK-da hər ikisi qəbul edilir. Boundary case kimi buraxıldı.

### 3. src/app/api/og/route.tsx (scope-dan kənar)
Bu fayl scope-da (src/data/, src/lib/) deyil, amma eyni "Qisa xeberler ve pulsuz onlayn aletler" mətnini istifadə edir. Düzəltmə üçün ayrıca tapşırıq lazımdır.

### 4. siteName "Vaxtim Yoxdu" (i18n message-lar)
`src/messages/{az,en,tr,ru}.json`-da `siteName: "Vaxtim Yoxdu"` brand olaraq saxlanılır. Bu **scope-dan kənardır** (json fayllar deyil .ts), və brand kimi qəsdən ASCII-də saxlanır.

## Verifikasiya

Bütün dəyişdirilən fayllar TypeScript ilə uğurla parse olunur:
- `src/data/blog-posts-az.ts`: parses OK
- `src/data/news-articles.ts`: parses OK
- `src/lib/utils/seo/metadata.ts`: parses OK

## Texnik qeydlər

- **Python re.IGNORECASE diqqət:** Skanlama zamanı erkən mərhələdə Python-un `re.IGNORECASE` flag-ının `i ↔ ı` (Turkish dotless i) qarışdırması böyük yanlış pozitivlər doğurdu. Düzəliş: explicit case variants və IGNORECASE-siz axtarış.
- **AZ vs TR vs RU ayrı-seçkiliyi:** AZ-ə xas "ə" hərfi (U+0259) AZ kontent mətnlərini Türkcədən ayırmaq üçün marker kimi istifadə edildi.
- **Word boundary:** AZ diakritik hərfləri (`əıçşğöü`) word boundary-ə daxil edildi ki, "Yuxarı" kimi sözlər "yuxari" tipli typo kimi yanlış flag olmasın.

---
**Tarix:** 2026-04-08
**Agent:** Content/data typo specialist
**Status:** Tamamlandı
