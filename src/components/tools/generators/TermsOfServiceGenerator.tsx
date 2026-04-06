'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function TermsOfServiceGenerator() {
  const t = useTranslations('toolUI.common')
  const [companyName, setCompanyName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [email, setEmail] = useState('')
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0])
  const [jurisdiction, setJurisdiction] = useState('')
  const [features, setFeatures] = useState({
    userAccounts: false,
    payments: false,
    userContent: false,
    intellectualProperty: true,
    termination: true,
    disclaimer: true,
  })
  const [copied, setCopied] = useState(false)

  const name = companyName || '[Company Name]'
  const url = websiteUrl || '[Website URL]'
  const mail = email || '[email@example.com]'
  const jur = jurisdiction || '[Jurisdiction]'

  const tos = `Terms of Service

Effective Date: ${effectiveDate}

Please read these Terms of Service ("Terms") carefully before using ${url} (the "Website") operated by ${name} ("we", "us", or "our").

1. Acceptance of Terms

By accessing or using our Website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Website.

2. Use of the Website

You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
- Use the Website in any way that violates any applicable law or regulation
- Attempt to interfere with or disrupt the Website or servers
- Use automated systems to access the Website without our permission
- Impersonate any person or entity

${features.userAccounts ? `3. User Accounts

When you create an account, you must provide accurate and complete information. You are responsible for safeguarding your password and for any activities under your account. You must notify us immediately of any unauthorized use.

` : ''}${features.payments ? `${features.userAccounts ? '4' : '3'}. Payments and Refunds

Certain services may require payment. All payments are processed through secure third-party payment processors. Prices are subject to change with notice. Refund requests will be handled on a case-by-case basis.

` : ''}${features.userContent ? `User-Generated Content

You retain ownership of content you submit. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the Website. You are solely responsible for your content and must not post content that is illegal, offensive, or infringes on others' rights.

` : ''}${features.intellectualProperty ? `Intellectual Property

The Website and its original content (excluding user-generated content) are the exclusive property of ${name}. Our trademarks and trade dress may not be used without prior written consent.

` : ''}${features.disclaimer ? `Disclaimer of Warranties

The Website is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, secure, or error-free.

Limitation of Liability

In no event shall ${name}, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website.

` : ''}${features.termination ? `Termination

We may terminate or suspend your access to the Website immediately, without prior notice, for any reason, including breach of these Terms.

` : ''}Governing Law

These Terms shall be governed by the laws of ${jur}, without regard to its conflict of law provisions.

Changes to Terms

We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on this page.

Contact Us

If you have any questions about these Terms, please contact us at: ${mail}

---
This Terms of Service document was generated using an online tool and should be reviewed by a legal professional before use.`

  const copy = async () => {
    await navigator.clipboard.writeText(tos)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Company Name</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Inc." className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Website URL</label>
          <input type="text" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Contact Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="legal@example.com" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Effective Date</label>
          <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium mb-1">Governing Jurisdiction</label>
          <input type="text" value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} placeholder="State of California, USA" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Include Sections</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(features).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={value} onChange={(e) => setFeatures({ ...features, [key]: e.target.checked })} className="rounded" />
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">Generated Terms of Service</span>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="p-3 text-sm whitespace-pre-wrap max-h-96 overflow-auto">{tos}</pre>
      </div>
    </div>
  )
}
