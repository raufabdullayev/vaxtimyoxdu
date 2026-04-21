# SEO Brand Variants Monitoring — vaxtimyoxdu.com

> **Məqsəd:** 4 brand variant üçün Google/Bing/Yandex ranking-ini izləmək.
> **Başlanğıc:** Session 32 (2026-04-21) — commit 53042c0 deploy + GSC Change of Address + Request Indexing (4 URL)

## Monitor edilməli sorğular (Target Keywords)

| # | Query | Yazılış | Status @ 2026-04-21 | Target |
|---|-------|---------|----------------------|--------|
| 1 | `vaxtim yoxdu` | ASCII, r yox | ✅ Google 1-ci sırada | Qoru |
| 2 | `vaxtım yoxdu` | AZ ı, r yox | ❌ Hələ yox | Top 3 |
| 3 | `vaxtim yoxdur` | ASCII + r | ❌ Hələ yox | Top 5 |
| 4 | `vaxtım yoxdur` | AZ ı + r | ❌ Hələ yox | Top 5 |
| 5 | `vaxtımız yoxdur` | 1st plural | ❌ Hələ yox | Top 10 |
| 6 | `vaxtımım yoxdur` | 1st singular | ❌ Hələ yox | Top 10 |

## Yoxlama Cədvəli (Weekly)

### Search Engines

- [ ] **Google** — https://www.google.com/search?q=vaxtim+yoxdur
- [ ] **Google AZ** — https://www.google.az/search?q=vaxtım+yoxdur
- [ ] **Bing** — https://www.bing.com/search?q=vaxtım+yoxdur
- [ ] **Yandex** — https://yandex.com/search/?text=vaxtım+yoxdur
- [ ] **DuckDuckGo** — https://duckduckgo.com/?q=vaxtım+yoxdur

### CLI Quick Check (Bash)

```bash
# Bütün 6 variant üçün Bing SERP-də vaxtimyoxdu.com var-yoxdur yoxla
for Q in "vaxtim yoxdu" "vaxtim yoxdur" "vaxtım yoxdu" "vaxtım yoxdur" "vaxtımız yoxdur" "vaxtımım yoxdur"; do
  QE=$(echo "$Q" | python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.stdin.read().strip()))")
  FOUND=$(curl -s -A "Mozilla/5.0" "https://www.bing.com/search?q=$QE" | grep -c "vaxtimyoxdu.com")
  printf '%-25s Bing: %s hit\n' "$Q" "$FOUND"
done
```

### GSC Performance API (Häftəlik)

```
mcp__search-console__analytics_query
  - siteUrl: "sc-domain:vaxtimyoxdu.com"
  - dimension: query
  - query filter: contains "vaxt"
  - last 7 days
```

Gözlənti:
- **Həftə 1 (2026-04-21 → 04-28):** 0-10 impression yeni variantlar üçün (re-crawl phase)
- **Həftə 2 (04-28 → 05-05):** 10-100 impression (indexation processed)
- **Həftə 3-4 (05-05 → 05-19):** 100-1000+ impression (SERP stabilized, clicks başlayır)

### Google Search Cache Check

```bash
# Googlebot son re-crawl-dan sonra alternateName görürmü
curl -s "https://webcache.googleusercontent.com/search?q=cache:vaxtimyoxdu.com" | grep -oE "Vaxtım Yoxdur|Vaxtımız Yoxdur" | head -3
```

- Əgər nəticə boşdur → Google hələ re-crawl etməyib
- Əgər nəticə var → Index-də yenilənib, SERP update 1-7 gün

## Yoxlama Qrafiki

### Gün 1 (2026-04-21 — bu gün)
- [x] Kod deploy (53042c0)
- [x] GSC Change of Address aktiv
- [x] Request Indexing (4 URL)
- [x] IndexNow ping (Bing/Yandex)
- **Result:** Hələ hər 3 engine-də yox (timing normal)

### Gün 2 (2026-04-22)
- [ ] Bing-də 6 query check (CLI script)
- [ ] Yandex-də eyni
- [ ] GSC URL Inspection — hər 4 URL-in "last crawled" tarixi
- [ ] Mövcud olsa — GSC Performance report

### Gün 7 (2026-04-28)
- [ ] Bütün 6 query × 3 engine (Google/Bing/Yandex) — Chrome incognito
- [ ] GSC Performance — yeni impressions count
- [ ] Rank-tracker-lə sabit sıra tap (hər query hansı səhifədə?)
- [ ] Əgər hələ yox → əlavə content boost lazımdır (blog post, backlinks)

### Gün 14 (2026-05-05)
- [ ] Full ranking check — 6 query × 4 engine
- [ ] Change of Address propagation status (GSC message)
- [ ] Əgər hələ >20 sıra → deeper SEO audit

## Əgər 2 hafta sonra hələ görünmürsə (escalation plan)

### Səbəb 1: Content density zəif
- Homepage H2/paragraph-larda "Vaxtımız yoxdur" natural phrase-i 3-5 dəfə əlavə et
- Blog post yaz: "Vaxtımız yoxdur? Bu 5 pulsuz alət sizi xilas edəcək" (target keyword)
- About page-ə brand alternate story əlavə et

### Səbəb 2: Backlink yox (domain authority)
- Influencer outreach (CEO action items #3)
- Product Hunt repost
- AZ tech forumlara (azertech və s.) link paylaşım

### Səbəb 3: Technical issue
- hreflang yoxla (AZ vs EN arasında)
- canonical URL-lər doğrumu
- Sitemap-da brand page-lər varmı

## Kim izləyəcək?

- **PO (Claude):** CEO "brand axtarışı" soruşanda bu faylı yoxla + agent göndər
- **CEO:** GSC email notifications aktiv et (Change of Address events)
- **Avtomatlaşdırma:** Gələcəkdə Daily SEO Check cron agent qur (plan: ~/.claude/plans/)

---
**Son yenilənmə:** 2026-04-21 (Session 32 — fayl yaradıldı)
**Növbəti review:** 2026-04-28 (Gün 7)
