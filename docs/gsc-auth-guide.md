# Google Search Console MCP — Autentifikasiya Bərbad Getdi, Düzəltmə Bələdçisi

**Tarix:** 2026-03-12
**Problem:** `Authentication failed: Request had insufficient authentication scopes`
**Səbəb:** `search-console-mcp` paketinin daxili OAuth credentials-ı Google tərəfindən məhdud scope ilə konfigurasiya edilib. Həll: öz Google Cloud credentials-ını yaratmaq lazımdır.

---

## Hansı metodu seçmək lazımdır?

| Metod | Çətinlik | Tövsiyə |
|---|---|---|
| **Method 1: Service Account** | Orta | Bəli — token-siz, davamlı |
| **Method 2: OAuth2 Desktop App** | Asan | Alternativ — tez qurmaq üçün |

**Method 1 tövsiyə olunur** — Service Account bir dəfə qurulur, token vaxtı bitmir, server tərəfli işlər üçün etibarlıdır.

---

## Method 1: Service Account (Tövsiyə olunur)

### Addım 1 — Google Cloud Console-a girin

- [ ] Brauzerinizdə bu URL-i açın: **https://console.cloud.google.com/**
- [ ] `raufabdullayv@gmail.com` hesabı ilə daxil olun
- [ ] Qarşınızda "Welcome to Google Cloud" və ya əvvəlki layihənizin dashboard-u görünəcək

---

### Addım 2 — Layihə yaradın (və ya mövcud birini seçin)

- [ ] Yuxarı sol küncdəki layihə adının yanındakı açılan menyu düyməsinə klikləyin (adətən "My Project" və ya layihə adı yazır)
- [ ] Açılan pəncərədə **"New Project"** düyməsini klikləyin
- [ ] **Project name** sahəsinə yazın: `vaxtimyoxdu-seo` (və ya istədiyiniz ad)
- [ ] **"Create"** düyməsinə klikləyin
- [ ] Bir neçə saniyə gözləyin — yuxarı sağdakı zəng ikonundan bildiriş gəlincə layihə hazırdır
- [ ] Bildirişdəki **"Select Project"** linkinə klikləyin

> Əgər artıq uyğun layihəniz varsa, siyahıdan onu seçin — yeni yaratmağa ehtiyac yoxdur.

---

### Addım 3 — Google Search Console API-ni aktiv edin

- [ ] Sol menyudan **APIs & Services** → **Library** üzərinə klikləyin
  - URL belə görünəcək: `https://console.cloud.google.com/apis/library`
- [ ] Axtarış sahəsinə yazın: `Google Search Console API`
- [ ] Nəticələr arasında **"Google Search Console API"** kartına klikləyin
- [ ] Açılan səhifədə böyük mavi **"Enable"** düyməsini klikləyin
- [ ] Sayt sizi avtomatik olaraq API-nin dashboard-una aparacaq — bu normaldır

---

### Addım 4 — Service Account yaradın

- [ ] Sol menyudan **APIs & Services** → **Credentials** üzərinə klikləyin
  - URL: `https://console.cloud.google.com/apis/credentials`
- [ ] Yuxarıdakı **"+ Create Credentials"** düyməsinə klikləyin
- [ ] Açılan menyudan **"Service Account"** seçin
- [ ] Açılan formada doldurun:
  - **Service account name:** `search-console-mcp`
  - **Service account ID:** avtomatik doldurulacaq (`search-console-mcp@...`)
  - **Description:** `MCP server üçün GSC oxuma icazəsi` (istəyə bağlı)
- [ ] **"Create and Continue"** düyməsinə klikləyin
- [ ] Növbəti addımda ("Grant this service account access to project") heç nə seçməyin — **"Continue"** klikləyin
- [ ] Növbəti addımda ("Grant users access to this service account") heç nə doldurmayın — **"Done"** klikləyin

---

### Addım 5 — JSON key faylını endirin

- [ ] Credentials səhifəsindəki **"Service Accounts"** bölməsində yeni yaratdığınız service account-u görəcəksiniz
  - E-mail adresi belə görünür: `search-console-mcp@YOUR-PROJECT-ID.iam.gserviceaccount.com`
- [ ] O e-mail ünvanına klikləyin
- [ ] Açılan səhifədə yuxarıdakı **"Keys"** tabına klikləyin
- [ ] **"Add Key"** → **"Create new key"** klikləyin
- [ ] Key type: **JSON** seçin (artıq seçili olacaq)
- [ ] **"Create"** düyməsinə klikləyin
- [ ] JSON faylı avtomatik olaraq `Downloads` qovluğuna enəcək
  - Fayl adı belə görünür: `YOUR-PROJECT-ID-xxxxxxxxx.json`

---

### Addım 6 — Service Account-u Google Search Console-a əlavə edin

- [ ] Yeni tabda bu URL-i açın: **https://search.google.com/search-console/**
- [ ] Sol menyunun altında **"Settings"** (Çarx ikonu) üzərinə klikləyin
- [ ] **"Users and permissions"** bölməsinə klikləyin
- [ ] Sağ yuxarıdakı **"Add user"** düyməsinə klikləyin
- [ ] **Email address** sahəsinə service account e-mailini yapışdırın
  - `search-console-mcp@YOUR-PROJECT-ID.iam.gserviceaccount.com`
  - Bu e-mail Google Cloud-da Credentials səhifəsindən kopyalaya bilərsiniz
- [ ] **Permission** sahəsini **"Full"** olaraq seçin
- [ ] **"Add"** düyməsinə klikləyin
- [ ] Yeni istifadəçi siyahıda görünəcək — bu qeydiyyatın qüvvəyə minməsi üçün 1-2 dəqiqə lazımdır

---

### Addım 7 — JSON faylını düzgün yerə qoyun

- [ ] Terminal-i açın (CEO bunu etmir — bu addımı texniki komandaya verin)

Texniki komandaya veriləcək tapşırıq:

```
Downloads qovluğundakı service account JSON faylını bu yerə köçürün:
~/.config/search-console-mcp/service-account.json

Əgər qovluq yoxdursa əvvəlcə yaradın:
mkdir -p ~/.config/search-console-mcp
mv ~/Downloads/YOUR-PROJECT-ID-*.json ~/.config/search-console-mcp/service-account.json
```

---

### Addım 8 — Setup-u yenidən işlədin

- [ ] Terminal-də işlədin:
  ```
  npx search-console-mcp setup
  ```
- [ ] Açılan menyudan uyğun seçimi seçin (Service Account seçimi, adətən option 2)
- [ ] JSON key faylının yolunu göstərin: `~/.config/search-console-mcp/service-account.json`
- [ ] Setup uğurlu olduqda belə bir mesaj görəcəksiniz:
  ```
  Service account configured successfully.
  ```

---

### Addım 9 — Yoxlayın

- [ ] Terminal-də işlədin:
  ```
  npx search-console-mcp accounts list
  ```
- [ ] Çıxışda `vaxtimyoxdu.com` saytını görməlisiniz
- [ ] Claude Code-u tam bağlayıb yenidən açın (MCP server-i yükləsin)

---

## Method 2: OAuth2 Desktop Application (Alternativ)

Bu metod daha sadədir amma OAuth token-inin vaxtı bitə bilər — onda yenidən autentifikasiya lazım olur.

### Addım 1 — Google Cloud Console-a girin

- [ ] Brauzerinizdə açın: **https://console.cloud.google.com/**
- [ ] Method 1-dəki eyni layihəni seçin (artıq Search Console API aktiv etmisinizsə keçin addım 3-ə)

---

### Addım 2 — Google Search Console API-ni aktiv edin

- [ ] **APIs & Services** → **Library** açın: **https://console.cloud.google.com/apis/library**
- [ ] `Google Search Console API` axtarın
- [ ] **"Enable"** düyməsinə klikləyin

---

### Addım 3 — OAuth Consent Screen konfiqurasiya edin

> Bu addım OAuth Client ID yaratmadan əvvəl mütləq lazımdır.

- [ ] Sol menyudan **APIs & Services** → **OAuth consent screen** üzərinə klikləyin
- [ ] User Type olaraq **"External"** seçin (şəxsi hesab üçün)
- [ ] **"Create"** düyməsinə klikləyin
- [ ] Formada doldurun:
  - **App name:** `vaxtimyoxdu-mcp`
  - **User support email:** `raufabdullayv@gmail.com` seçin
  - **Developer contact information:** `raufabdullayv@gmail.com`
- [ ] **"Save and Continue"** klikləyin
- [ ] **Scopes** addımında heç nə əlavə etməyin — **"Save and Continue"** klikləyin
- [ ] **Test users** addımında **"+ Add Users"** klikləyin → `raufabdullayv@gmail.com` əlavə edin
- [ ] **"Save and Continue"** klikləyin → **"Back to Dashboard"** klikləyin

---

### Addım 4 — OAuth Client ID yaradın

- [ ] Sol menyudan **APIs & Services** → **Credentials** açın
  - URL: `https://console.cloud.google.com/apis/credentials`
- [ ] **"+ Create Credentials"** → **"OAuth Client ID"** seçin
- [ ] **Application type** açılan menyusundan **"Desktop app"** seçin
  - (Məhz bunu seçmək lazımdır — əvvəlki xətanın səbəbi "Web application" seçilmişdi)
- [ ] **Name** sahəsinə yazın: `search-console-mcp-desktop`
- [ ] **"Create"** düyməsinə klikləyin
- [ ] Açılan popup-da görəcəksiniz:
  - **Your Client ID:** `xxxxxxxxxx.apps.googleusercontent.com`
  - **Your Client Secret:** `GOCSPX-xxxxxxxxxx`
- [ ] **Hər ikisini kopyalayın** — bu pəncərəni bağladıqdan sonra Secret-i yenidən görə bilməzsiniz
  - (Görmək üçün: Credentials siyahısında qələm ikonuna klikləyin)
- [ ] **"OK"** klikləyin

---

### Addım 5 — Setup-u yenidən işlədin

- [ ] Terminal-də işlədin:
  ```
  npx search-console-mcp setup
  ```
- [ ] Paket öz OAuth credentials-ı yerinə sizin Client ID və Client Secret-i soruşacaq
- [ ] Kopyaladığınız dəyərləri yapışdırın
- [ ] Brauzerdə Google avtorizasiya səhifəsi açılacaq — `raufabdullayv@gmail.com` ilə daxil olun
- [ ] İcazə verin — uğurlu olduqda terminal-də belə bir mesaj görəcəksiniz:
  ```
  Authentication successful! Account: raufabdullayv@gmail.com
  ```

---

### Addım 6 — Yoxlayın

- [ ] Terminal-də işlədin:
  ```
  npx search-console-mcp accounts list
  ```
- [ ] `vaxtimyoxdu.com` siyahıda görünməlidir
- [ ] Claude Code-u tam bağlayıb yenidən açın

---

## Troubleshooting (Problem Həll)

### "Authentication failed: insufficient authentication scopes"

**Səbəb:** Paket daxili credentials-ın scope-u yetərsizdir.
**Həll:** Yuxarıdakı Method 1 və ya Method 2-dən birini izləyin — öz credentials-ınızı yaradın.

---

### "Service account JSON file not found"

**Səbəb:** JSON faylı yanlış yerdədir və ya fərqli adla saxlanılıb.
**Həll:** Terminal-də yoxlayın:
```
ls ~/.config/search-console-mcp/
```
Fayl `service-account.json` adı ilə görünməlidir. Əgər yoxdursa, Downloads-dan köçürün.

---

### "Permission denied" və ya "403 Forbidden"

**Səbəb:** Service account Google Search Console-a əlavə edilməyib.
**Həll:** Method 1-in Addım 6-sını yenidən yoxlayın. Service account e-mailinin Search Console → Settings → Users and permissions siyahısında olduğundan əmin olun.

---

### "The OAuth client was not found" və ya "invalid_client"

**Səbəb:** Yanlış Client ID / Client Secret daxil edilib, və ya Client ID silinib.
**Həll:** Google Cloud Console → APIs & Services → Credentials-a qayıdın. OAuth 2.0 Client IDs siyahısında `search-console-mcp-desktop`-u tapın, qələm ikonuna klikləyin, dəyərləri yenidən kopyalayın.

---

### "This app isn't verified" (Brauzerdə xəbərdarlıq)

**Səbəb:** OAuth consent screen hələ Google tərəfindən yoxlanılmayıb — bu normaldır.
**Həll:** Xəbərdarlıq ekranında **"Advanced"** (Ətraflı) linkinə klikləyin → **"Go to vaxtimyoxdu-mcp (unsafe)"** klikləyin. Şəxsi istifadə üçün bu tamamilə etibarlıdır.

---

### Setup tamamlandı amma Claude Code-da tool-lar görünmür

**Həll:**
1. Claude Code-u tam bağlayın (CMD+Q)
2. Yenidən açın
3. Hər hansı söhbəti açın, `/mcp` yazın — `search-console` siyahıda görünməlidir

---

## Faydalı Linklər

| Məqsəd | URL |
|---|---|
| Google Cloud Console | https://console.cloud.google.com/ |
| API Library | https://console.cloud.google.com/apis/library |
| Credentials | https://console.cloud.google.com/apis/credentials |
| OAuth Consent Screen | https://console.cloud.google.com/apis/credentials/consent |
| Google Search Console | https://search.google.com/search-console/ |
| GSC Users & Permissions | https://search.google.com/search-console/users |

---

## Qısa Xülasə

```
Method 1 (Service Account):
Cloud Console → API aktiv → Service Account yarat → JSON key endir
→ GSC-yə service account e-mail əlavə et (Full access)
→ JSON faylı ~/.config/search-console-mcp/service-account.json
→ npx search-console-mcp setup → Service Account seçimi

Method 2 (OAuth Desktop App):
Cloud Console → API aktiv → OAuth Consent Screen → OAuth Client ID yarat
→ Application type: Desktop app (MÜTLƏQ!)
→ Client ID + Secret kopyala
→ npx search-console-mcp setup → credentials daxil et → brauzerdə icazə ver
```

**Vacib qeyd:** Method 2-də "Desktop app" seçilməsi məcburidir. "Web application" seçilsə orijinal xəta yenidən baş verəcək.
