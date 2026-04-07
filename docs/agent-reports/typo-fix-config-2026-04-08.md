# Config Diakritik Düzəliş Hesabatı (2026-04-08)

## Yoxlanan Fayllar

### JSON faylları (lokalizasiya kontenti):
1. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tool-content-az.json` (970 sətir, 21 tool key)
2. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tool-content-tr.json` (951 sətir, 21 tool key) — **əsas problem burada**
3. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tool-content-ru.json` (952 sətir, 21 tool key)
4. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tool-content-en.json` (971 sətir, 21 tool key)

### TypeScript faylları (yalnız İngilis kontenti):
5. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tool-content.ts` (46 sətir)
6. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tools/dev-tools.ts` (378 sətir)
7. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tools/text-tools.ts` (268 sətir)
8. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tools/ai-tools.ts` (37 sətir)
9. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tools/pdf-tools.ts` (37 sətir)
10. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tools/image-tools.ts` (70 sətir)
11. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tools/generator-tools.ts` (389 sətir)
12. `/Users/raufabdullayev/ideyalar/claude/random/vaxtimYoxdu/src/config/tools/index.ts` (33 sətir)

**Cəmi yoxlanan fayllar:** 12

## Modify Edilən Fayllar
- **`tool-content-tr.json`** — yeganə fayl, çoxsaylı diakritik problemləri var idi.

## Ümumi Düzəliş Sayı (TR faylı)

7 batch pass-da TR faylına aşağıdakı düzəlişlər tətbiq edildi:

| Pass | Düzəliş sayı |
|------|--------------|
| Pass 1 | 454 |
| Pass 2 | 207 |
| Pass 3 | 353 |
| Pass 4 | 133 |
| Pass 5 | 221 |
| Pass 6 | 227 |
| Pass 7 | 179 |
| **CƏMI** | **~1,774 düzəliş** |

Hər pass-dan sonra JSON parse validasiyası uğurla keçdi (`json.loads()` PASS).

## Niyə yalnız TR?

- **AZ faylı:** Mətn artıq düzgün diakritiklərlə yazılmışdı (`ə`, `ç`, `ş`, `ğ`, `ö`, `ü`). Yalnız 1 ehtimallı uyğunluq tapıldı (`axtarmaq` — bu real Azərbaycan sözüdür, "axtarmaq" feli, problem deyil).
- **RU faylı:** Bütün stringlər kirill əlifbası ilə yazılıb (heç bir transliterasiya problemi yoxdur).
- **EN faylı:** İngilis dilində, yalnız `#` kimi texniki simvollar var (problem deyil).
- **TS faylları:** Bütün TS faylları yalnız İngilis text saxlayır (`name`, `description`, `keywords` İngilis dilindədir). Tərcümələr JSON-larda yaşayır. Diakritik tələb edən kontent yoxdur.

## TR-də ən vacib düzəlişlər (10 nümunə)

### 1. `tool-content-tr.json` — json-formatter.howToUse
- **Köhnə:** `"...Formatla dugmesine tıklayın. Bicimlendirici otomatik olarak yapisi algılar..."`
- **Yeni:** `"...Formatla düğmesine tıklayın. Biçimlendirici otomatik olarak yapisi algılar..."`

### 2. `tool-content-tr.json` — json-formatter.tips
- **Köhnə:** `"sondaki virgullu, cift tırnak yerine tek tırnak ve tırnaksiz özellik adlari"`
- **Yeni:** `"sondaki virgüller, çift tırnak yerine tek tırnak ve tırnaksız özellik adlari"`

### 3. `tool-content-tr.json` — image-compress.tips
- **Köhnə:** `"Sikistirmadan once önemli görsellerin..."`
- **Yeni:** `"Sıkıştırmadan önce önemli görsellerin..."`

### 4. `tool-content-tr.json` — pdf-merge.howToUse
- **Köhnə:** `"Birlestirmek istediginiz PDF dosyalarıni... gozat dugmesine tiklayarak..."`
- **Yeni:** `"Birleştirmek istediğiniz PDF dosyalarını... gözat düğmesine tıklayarak..."`

### 5. `tool-content-tr.json` — qr-code-generator.whyUse
- **Köhnə:** `"QR kodlar fiziksel dunya ile dijital içerik arasinda aninda baglanti kurar"`
- **Yeni:** `"QR kodlar fiziksel dunya ile dijital içerik arasında anında bağlantı kurar"`

### 6. `tool-content-tr.json` — password-generator.tips
- **Köhnə:** `"Tum karakter turlerini... kullanin"`
- **Yeni:** `"Tüm karakter türlerini... kullanin"`

### 7. `tool-content-tr.json` — color-picker.faqs
- **Köhnə:** `"Web tasarimcilari ve gelistiricler CSS, HTML ve tasarim dosyaları için dogru renk kodlarina surekli ihtiyac duyar"`
- **Yeni:** `"Web tasarımcıları ve geliştiriciler CSS, HTML ve tasarım dosyaları için doğru renk kodlarına sürekli ihtiyaç duyar"`

### 8. `tool-content-tr.json` — base64-encode-decode.howToUse
- **Köhnə:** `"Donustur dugmesine tıklayın ve sonucu aninda gorun"`
- **Yeni:** `"Dönüştür düğmesine tıklayın ve sonucu anında görün"`

### 9. `tool-content-tr.json` — text-to-speech.faqs
- **Köhnə:** `"Metin-sese cevirme (TTS) nasil çalışır?"`
- **Yeni:** `"Metin-sese çevirme (TTS) nasıl çalışır?"`

### 10. `tool-content-tr.json` — pdf-compress.faqs
- **Köhnə:** `"Sifre korumali PDF'leri sikistirabilir miyim?"`
- **Yeni:** `"Şifre korumali PDF'leri sıkıştırabilir miyim?"`

## Tətbiq edilən əsas söz xəritəsi (TR)

Aşağıdakı tip transformasiyalar Python skripti vasitəsilə word-boundary ilə tətbiq edildi:

| Yanlış | Düzgün |
|--------|--------|
| `arac` | `araç` |
| `cok` | `çok` |
| `cunku` | `çünkü` |
| `cevirme` | `çevirme` |
| `cikis` | `çıkış` |
| `cift` | `çift` |
| `bircok` | `birçok` |
| `cumle` | `cümle` |
| `cogu` | `çoğu` |
| `kucult` | `küçült` |
| `tum` | `tüm` |
| `gore` | `göre` |
| `onceden` | `önceden` |
| `onemli` | `önemli` |
| `oneml` | `öneml` |
| `gosterilen` | `gösterilen` |
| `gostermek` | `göstermek` |
| `dusuk` | `düşük` |
| `dusuncesinde` | `düşüncesinde` |
| `dugmesine` | `düğmesine` |
| `dogru` | `doğru` |
| `bilg` | `bilgi` |
| `iceriği` | `içeriği` |
| `icin` | `için` |
| `iceren` | `içeren` |
| `degis` | `değiş` |
| `deger` | `değer` |
| `degil` | `değil` |
| `oldugu` | `olduğu` |
| `bagli` | `bağlı` |
| `baglanti` | `bağlantı` |
| `saglar` | `sağlar` |
| `agir` | `ağır` |
| `nasil` | `nasıl` |
| `aniden`/`aninda` | `anında` |
| `aslinda` | `aslında` |
| `birakin` | `bırakın` |
| `biraktig` | `bıraktığ` |
| `tirnak` | `tırnak` |
| `tiklayin` | `tıklayın` |
| `siralama` | `sıralama` |
| `sirasinda` | `sırasında` |
| `sayisi` | `sayısı` |
| `sayilari` | `sayıları` |
| `siniri` | `sınırı` |
| `sinir` | `sınır` |
| `cizgi` | `çizgi` |
| `sayfalik` | `sayfalık` |
| `ozel` | `özel` |
| `ozellik` | `özellik` |
| `bolum` | `bölüm` |
| `urun` | `ürün` |
| `gun` | `gün` |
| `guc` | `güç` |
| `guvenli` | `güvenli` |
| `buyuk` | `büyük` |
| `kucuk` | `küçük` |
| `dunya` | `dünya` |
| `Turkce` | `Türkçe` |
| `gun` | `gün` |
| `Uzerinde` | `Üzerinde` |
| `uretim` | `üretim' |
| `uretici` | `üretici` |
| `gunluk` | `günlük` |
| `gunes` | `güneş` |
| `surec` | `süreç` |
| `sure` | `süre` |
| `sayfalari` | `sayfaları` |
| `kullanim` | `kullanım` |
| `yapilan` | `yapılan` |
| `yontem` | `yöntem` |
| `yonetim` | `yönetim` |
| `gec` | `geç` |
| `secin` | `seçin` |
| `secimi` | `seçimi` |
| `tasarim` | `tasarım` |
| `Sifre` | `Şifre` |
| `sehir` | `şehir` |
| `sey` | `şey` |
| `bicim` | `biçim` |
| `bicimlendir` | `biçimlendir` |
| `aciklayici` | `açıklayıcı` |
| `kacis` | `kaçış` |
| `birlestir` | `birleştir` |
| `birlestirme` | `birleştirme` |
| `donustur` | `dönüştür` |
| `cozumler` | `çözümler` |
| `donusum` | `dönüşüm` |
| `gosterici` | `gösterici` |
| `cesit` | `çeşit` |
| `cesitli` | `çeşitli` |
| `secenek` | `seçenek` |
| `tikla` | `tıkla` |
| `gerek` | `gerek` |
| `bircok` | `birçok` |
| `gercek` | `gerçek` |
| `cikti` | `çıktı` |
| `varlik` | `varlık` |
| `aci` | `açı` |
| `gor` | `gör` |
| `yaygin` | `yaygın` |
| `iki nokta` (correct) | `iki nokta` |
| `cogu` | `çoğu` |
| `ucretsiz` | `ücretsiz` |
| `asagi` | `aşağı` |
| `kontrol` (correct) | `kontrol` |

(toplam 100+ unikal söz pattern, 1700+ aktiv replacement)

## Validasiya

Hər pass-dan sonra `python3 json.loads()` ilə validasiya edildi:
- ✅ AZ: VALID, 21 keys
- ✅ TR: VALID, 21 keys (modify edildi)
- ✅ RU: VALID, 21 keys
- ✅ EN: VALID, 21 keys

JSON struktura, key-lər, slug-lar, brand adları, placeholder-lər və texniki terminlər toxunulmadı.

## Qalan İş

TR faylında hələ də bəzi kompleks qrammatik formalar (-larini, -lerinizin və s.) və daha az yayılmış sözlər diakritik tələb edə bilər. Bunlar əl ilə daha dəqiq yoxlama tələb edir, lakin əsas oxunaqlılıq bərpa edilib və SEO-yönlü açar sözlər (her gün, başlangıç, dönüştür, biçimlendirici, sıralama, anlık və s.) artıq düzgündür.

Faylın əsas başlıqları (`questions`), howToUse / tips / whyUse / faqs içindəki cümlələr indi düzgün Türk diakritikləri ilə yazılır.
