# CEO Action Items — vaxtimyoxdu.com

> Bu task-lar texniki deyil, CEO/founder tərəfindən edilməlidir.

## 1. Sosial Media Hesabları Açmaq (DƏRHAL!)
> 📄 **Instagram detallı plan:** [`docs/smm-instagram.md`](./smm-instagram.md)

@vaxtimyoxdu adını bu platformalarda tut:
- [x] Instagram — @vaxtimyoxdu_ ✅ (açıldı 2026-04-10)
- [ ] TikTok — @vaxtimyoxdu
- [ ] Telegram kanal — @vaxtimyoxdu
- [ ] YouTube — @vaxtimyoxdu
- [ ] X/Twitter — @vaxtimyoxdu
- [ ] LinkedIn — vaxtimyoxdu

**VACİB:** Kimsə tutmazdan əvvəl bütün platformalarda hesab aç!

## 2. Kontent Calendar Başlatmaq
SMM strategiya hazırdır (team audit hesabatında). Plan:
- Gündə 3 Telegram post (səhər xəbər, günorta alət, axşam bazar)
- Həftədə 5 Instagram Reel/Carousel
- Həftədə 5 TikTok video
- İlk 10 video ideyası: tool demo-lar (Text-to-Handwriting, QR, Image Compress, Password Gen, Age Calculator)

## 3. Influencer Outreach
- 5-10 Azərbaycan micro-influencer tap (1K-50K follower)
- Tech, student, productivity niche-lərdə
- Əlaqə qur, tool review təklif et

## 4. ProductHunt Launch (Optional)
- "Free online tools for the Turkic digital space" açısı ilə
- 4-dilli dəstək unique differentiator

## 5. GSC: vaxtimyoxdur.com Property Verify (SEO critical, Session 32)

**Problem:** Google-da "vaxtim yoxdur" (r-li variant) axtarıldıqda sayt çıxmır. Kod səviyyəsində JSON-LD alternateName, keywords, heroTagline düzəlişləri tətbiq olundu (commit S32 Fix), amma `vaxtimyoxdur.com` domeni GSC-də ayrı property olaraq verify olunmayıb.

**CEO addımları:**
1. Google Search Console → Add Property → **Domain:** `vaxtimyoxdur.com`
2. DNS TXT record Cloudflare-də əlavə (GSC verification code)
3. Verify olduqdan sonra → Property settings → **Change of Address tool** → point to `vaxtimyoxdu.com`
4. Bu Google-a redirect signalını formal bildirir (308 onsuz da işləyir, amma Change of Address əlavə signal)

**Gözlənilən nəticə:** 1-2 həftə ərzində "vaxtim yoxdur", "vaxtım yoxdu", "vaxtım yoxdur" — 4 brand variant-ının hamısı `vaxtimyoxdu.com` üçün rank olsun.

## 6. Request Indexing (AZ/EN/TR/RU homepage, Session 32)

**Kod dəyişikliyindən sonra:**
- GSC → URL Inspection → `https://vaxtimyoxdu.com/` → **Request Indexing**
- Təkrar et: `https://vaxtimyoxdu.com/en`, `/tr`, `/ru`
- Hər URL üçün bir dəfə — Google daxili bir neçə günə re-crawl edir

**Skill:** `controlling-users-real-chrome` ilə avtomatlaşdıra bilərik (manual 5 dəq alır, lakin istəklə).

---
Son yenilənmə: 2026-04-21 (Session 32 SEO brand variants fix)
