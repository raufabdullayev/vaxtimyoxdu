# VaxtimYoxdu Launch Content

All copy-paste ready content for platform registrations, submissions, and social media.

---

## 1. Resend API Key

Page: https://resend.com/api-keys

1. Click "Create API Key"
2. Name: `vaxtimyoxdu-production`
3. Permission: Sending access
4. Domain: vaxtimyoxdu.com (or All Domains if domain not verified yet)
5. Copy the key and add to Vercel env vars as `RESEND_API_KEY`

---

## 2. Product Hunt

Page: https://www.producthunt.com/posts/new

**Product Name:**
```
VaxtimYoxdu
```

**Tagline (60 char max):**
```
60+ free online tools to save your time — in 4 languages
```

**Description (260 char):**
```
VaxtimYoxdu.com offers 60+ free tools (PDF, Image, AI, Developer, Text, Generators) plus news summaries in Azerbaijani. Available in AZ, EN, TR, RU. No login required, no ads (yet), fully open and fast.
```

**Topics:**
- Productivity
- Developer Tools
- Free
- Open Source

**Website:**
```
https://vaxtimyoxdu.com
```

**Maker Comment Draft:**
```
I built VaxtimYoxdu because I was tired of jumping between dozens of websites for simple tasks — converting a PDF, resizing an image, formatting JSON. So I put 60+ tools under one roof, made them free with no login required, and translated everything into 4 languages (Azerbaijani, English, Turkish, Russian). Built with Next.js and hosted on Vercel, the site loads fast and works offline as a PWA. I'd love to hear what tools you'd want added next!
```

---

## 3. Dev.to

Page: https://dev.to/enter

### Profile Info

**Name:**
```
VaxtimYoxdu
```

**Bio:**
```
Building free online tools for everyone. 60+ tools in 4 languages.
```

**Website URL:**
```
https://vaxtimyoxdu.com
```

### First Article Draft

Copy everything between the START and END markers below.

--- START DEV.TO ARTICLE ---

**Title:**
```
I Built 60+ Free Online Tools — Here's What I Learned
```

**Tags:**
```
webdev, nextjs, opensource, productivity
```

**Cover image alt text:**
```
VaxtimYoxdu — 60+ free online tools
```

**Body:**

```markdown
When I started building VaxtimYoxdu, I had one simple frustration: every time I needed to convert a PDF, resize an image, or format a JSON file, I had to visit a different website. Most of them were slow, cluttered with ads, or required sign-up for basic functionality.

So I decided to build something better — a single platform with every everyday tool a person might need, completely free, with no registration required.

Today, VaxtimYoxdu.com has over 60 tools and serves users in four languages. Here is what the journey taught me.

## The Tech Stack

I chose a modern stack optimized for speed and developer experience:

- **Next.js 14 (App Router)** — Server components, static generation, and edge runtime for OG images
- **TypeScript** — Type safety across the entire codebase
- **Tailwind CSS** — Rapid UI development with consistent design
- **Vercel** — Hosting with automatic deployments from GitLab CI/CD
- **Upstash Redis** — Rate limiting for AI-powered tools
- **next-intl** — Internationalization for 4 languages (Azerbaijani, English, Turkish, Russian)
- **Vitest + React Testing Library** — 1600+ tests across 70+ files

The site is also a Progressive Web App (PWA) with offline support, so users can install it and use certain tools without an internet connection.

## What Tools Are Available

The 60+ tools are organized into six categories:

### AI-Powered (3 tools)
Text rewriting, summarization, and grammar checking — powered by Groq for fast inference.

### PDF Tools (3 tools)
Merge, split, and compress PDFs right in the browser. No file uploads to external servers.

### Image Tools (4 tools)
Resize, crop, convert formats, and compress images. All processing happens client-side.

### Developer Tools (22 tools)
This is the largest category, built for developers who need quick utilities:
- JSON Formatter, Validator, and JSON-to-YAML converter
- Base64 Encode/Decode
- URL Encode/Decode
- Hash Generator (MD5, SHA-1, SHA-256)
- Regex Tester
- SQL Formatter
- HTML/JS Minifier
- Markdown to HTML converter
- XML Formatter
- Color Converter
- Diff Checker
- and more

### Generators (14 tools)
- Password, UUID, Lorem Ipsum generators
- QR Code and Barcode generators
- Favicon and Placeholder Image generators
- Gradient generator
- SVG to PNG converter
- Emoji picker
- and more

### Text Tools (14 tools)
- Word and Character Counter
- Case Converter
- Text to Speech
- Find and Replace
- Text-to-Binary and ROT13 encoders
- Slug Generator
- and more

## Why Free? Why No Login?

Three reasons:

**1. Friction kills utility tools.** If someone needs to decode a Base64 string, they need it now. A sign-up form is a wall, not a welcome mat.

**2. Privacy matters.** Most tools run entirely in the browser. Your files and data never leave your device. For AI tools that do require server processing, we use rate limiting instead of accounts.

**3. I built this for myself first.** I needed these tools daily. Making them free was the natural choice.

The plan is to eventually introduce non-intrusive ads (AdSense is already integrated and waiting for approval) to cover hosting costs. But the tools will always remain free.

## The Multilingual Challenge

Supporting four languages — Azerbaijani, English, Turkish, and Russian — was one of the most complex parts of the project.

Using `next-intl`, every page, tool description, error message, and UI element is translated. The site generates 384 static pages (96 pages times 4 languages). Azerbaijani is the default language with no URL prefix, while English, Turkish, and Russian use `/en`, `/tr`, and `/ru` prefixes respectively.

The hardest part was not the technical setup but ensuring translation quality. Automated translations often produce awkward phrasing, especially for Azerbaijani and Turkish, which have very different grammatical structures from English.

## SEO and Performance

Every tool page includes:
- Dynamic Open Graph images generated at the edge
- JSON-LD structured data (FAQ, BreadcrumbList, Organization)
- Proper hreflang tags across all four languages
- A dynamic sitemap with 500+ URLs

Performance optimizations include:
- Lazy loading for non-critical components (cookie consent, install prompt, ad banners)
- Code splitting per tool
- Service worker caching with stale-while-revalidate strategy
- DNS prefetching for external resources

## Testing

The project has over 1,600 tests across 70+ files using Vitest and React Testing Library. Every API route, utility function, and critical UI component has test coverage. Tests run in GitLab CI before every deployment.

## What I Would Do Differently

**Start with i18n from day one.** Retrofitting internationalization into an existing codebase is painful. If you know your app will be multilingual, set up the translation infrastructure before writing your first component.

**Define tool data structure early.** With 60 tools, the data model matters. I refactored the tool registry twice before settling on a structure that scales well.

**Automate OG image testing.** Dynamic OG images are great for social sharing, but they are hard to test visually. I wish I had set up visual regression tests earlier.

## What Is Next

- More tools based on user feedback
- A proper newsletter system (Resend integration is in progress)
- Community-requested tool voting
- API access for developers who want to use the tools programmatically

## Try It Out

Visit [vaxtimyoxdu.com](https://vaxtimyoxdu.com) and let me know what you think. If there is a tool you wish existed, I would love to hear about it.

The site is fast, free, and works in your language. Give it a try.

---

*Built with Next.js, TypeScript, and a lot of late nights. Available in Azerbaijani, English, Turkish, and Russian.*
```

--- END DEV.TO ARTICLE ---

---

## 4. Medium

Page: https://medium.com/new-story

Use the same article content as Dev.to above with these Medium-specific adjustments:

**Title:**
```
I Built 60+ Free Online Tools — Here's What I Learned
```

**Subtitle:**
```
How Next.js, TypeScript, and stubbornness helped me create a multilingual toolkit used in 4 languages
```

**Tags (up to 5):**
```
Web Development, Next.js, Productivity, Open Source, Developer Tools
```

**Formatting notes for Medium:**
- Use Medium's heading styles (H2 for main sections)
- Add a horizontal rule between major sections
- Bold key phrases for scannability
- The body content is identical to the Dev.to article above — copy the full body text

---

## 5. Tool Catalogs

### AlternativeTo

Page: https://alternativeto.net/submit/

**App Name:**
```
VaxtimYoxdu
```

**URL:**
```
https://vaxtimyoxdu.com
```

**Short Description:**
```
Free online toolkit with 60+ tools for PDF, Image, Developer, AI, Text, and Generator tasks. Works in 4 languages, no login required.
```

**Long Description:**
```
VaxtimYoxdu is a free, fast, multilingual online toolkit offering 60+ tools across six categories: AI-powered text tools, PDF utilities (merge, split, compress), Image tools (resize, crop, convert), Developer tools (JSON formatter, Base64, Regex tester, Hash generator, and 18 more), Generators (QR code, password, UUID, Lorem Ipsum, and more), and Text utilities (word counter, case converter, text-to-speech, and more). Built with Next.js and hosted on Vercel, the site supports Azerbaijani, English, Turkish, and Russian. All tools are free, require no registration, and most run entirely in the browser for maximum privacy. Available as a PWA for offline use.
```

**Category:**
```
Online Tools / Productivity
```

**Tags:**
```
Free, Online Tools, PDF Tools, Developer Tools, Image Tools, AI Tools, Multilingual, PWA, No Registration, Privacy
```

**Alternative to:**
```
SmallPDF, iLovePDF, TinyPNG, DevTools, CyberChef
```

---

### SaaSHub

Page: https://saashub.com/submit

**Product Name:**
```
VaxtimYoxdu
```

**Website:**
```
https://vaxtimyoxdu.com
```

**One-liner:**
```
60+ free online tools in 4 languages — no login, no ads, fast.
```

**Description:**
```
VaxtimYoxdu is a free, fast, multilingual online toolkit offering 60+ tools across six categories: AI-powered text tools, PDF utilities (merge, split, compress), Image tools (resize, crop, convert), Developer tools (JSON formatter, Base64, Regex tester, Hash generator, and 18 more), Generators (QR code, password, UUID, Lorem Ipsum, and more), and Text utilities (word counter, case converter, text-to-speech, and more). Built with Next.js and hosted on Vercel, the site supports Azerbaijani, English, Turkish, and Russian. All tools are free, require no registration, and most run entirely in the browser for maximum privacy. Available as a PWA for offline use.
```

**Category:**
```
Developer Tools / Productivity
```

**Tags:**
```
free, online-tools, pdf, developer-tools, image-tools, ai, multilingual, pwa
```

---

### BetaList

Page: https://betalist.com/submit

**Startup Name:**
```
VaxtimYoxdu
```

**URL:**
```
https://vaxtimyoxdu.com
```

**Tagline:**
```
60+ free online tools to save your time — in 4 languages
```

**Description:**
```
VaxtimYoxdu is a free, fast, multilingual online toolkit offering 60+ tools across six categories: AI-powered text tools, PDF utilities, Image tools, Developer tools, Generators, and Text utilities. Built with Next.js, hosted on Vercel, and available in Azerbaijani, English, Turkish, and Russian. No login required, no ads, and most tools run entirely in the browser.
```

**Category:**
```
Productivity
```

**Tags:**
```
developer-tools, productivity, free, open-source
```

---

## 6. Social Media Profiles

### Instagram

Page: https://www.instagram.com/accounts/emailsignup/

**Username:**
```
vaxtimyoxdu
```

**Full Name:**
```
VaxtimYoxdu | Free Online Tools
```

**Bio (150 char max):**
```
60+ free online tools | PDF, Image, AI, Dev, Text
No login needed | AZ EN TR RU
Save your time, seriously.
```

**Website:**
```
https://vaxtimyoxdu.com
```

---

### TikTok

Page: https://www.tiktok.com/signup

**Username:**
```
vaxtimyoxdu
```

**Name:**
```
VaxtimYoxdu
```

**Bio (80 char max):**
```
60+ free online tools. No login. No ads. 4 languages.
```

**Website:**
```
https://vaxtimyoxdu.com
```

---

### Telegram Channel

Page: https://web.telegram.org/a/#/create-channel

**Channel Name:**
```
VaxtimYoxdu
```

**Description:**
```
Vaxtina qenaet et! 60+ pulsuz onlayn alet: PDF, Image, AI, Developer, Text, Generators. Yeni aletler, yenilikler ve meqaleler burada paylashilir. vaxtimyoxdu.com
```

**Channel Link:**
```
t.me/vaxtimyoxdu
```

**Channel Type:** Public

---

## Quick Reference — All Accounts

| Platform       | Username/Handle   | URL                                      |
|----------------|-------------------|------------------------------------------|
| Product Hunt   | VaxtimYoxdu       | producthunt.com/posts/vaxtimyoxdu        |
| Dev.to         | vaxtimyoxdu       | dev.to/vaxtimyoxdu                       |
| Medium         | vaxtimyoxdu       | medium.com/@vaxtimyoxdu                  |
| AlternativeTo  | VaxtimYoxdu       | alternativeto.net/software/vaxtimyoxdu   |
| SaaSHub        | VaxtimYoxdu       | saashub.com/vaxtimyoxdu                  |
| BetaList       | VaxtimYoxdu       | betalist.com/startups/vaxtimyoxdu        |
| Instagram      | @vaxtimyoxdu      | instagram.com/vaxtimyoxdu               |
| TikTok         | @vaxtimyoxdu      | tiktok.com/@vaxtimyoxdu                 |
| Telegram       | @vaxtimyoxdu      | t.me/vaxtimyoxdu                        |

---

## CEO Action Checklist

- [ ] Resend: Create API key, add to Vercel env
- [ ] Product Hunt: Create post with content above
- [ ] Dev.to: Register, set profile, publish article
- [ ] Medium: Register, publish article
- [ ] AlternativeTo: Submit app
- [ ] SaaSHub: Submit product
- [ ] BetaList: Submit startup
- [ ] Instagram: Create account
- [ ] TikTok: Create account
- [ ] Telegram: Create channel
