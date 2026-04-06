'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicyGenerator() {
  const t = useTranslations('toolUI.common')
  const [companyName, setCompanyName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [email, setEmail] = useState('')
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0])
  const [features, setFeatures] = useState({
    cookies: true,
    analytics: true,
    thirdParty: false,
    newsletter: false,
    userAccounts: false,
    payments: false,
    childrenData: false,
  })
  const [copied, setCopied] = useState(false)

  const name = companyName || '[Company Name]'
  const url = websiteUrl || '[Website URL]'
  const mail = email || '[email@example.com]'

  const policy = `Privacy Policy

Effective Date: ${effectiveDate}

${name} ("we", "us", or "our") operates ${url} (the "Website"). This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Website.

1. Information We Collect

We may collect the following types of information:
- Usage data (pages visited, time spent, browser type, IP address)${features.userAccounts ? '\n- Account information (name, email address, password)' : ''}${features.payments ? '\n- Payment information (processed securely through third-party providers)' : ''}${features.newsletter ? '\n- Email address (when subscribing to our newsletter)' : ''}

2. How We Use Your Information

We use the collected information to:
- Provide and maintain our Website
- Improve user experience
- Analyze usage patterns${features.newsletter ? '\n- Send periodic newsletters (with your consent)' : ''}${features.userAccounts ? '\n- Manage your account' : ''}${features.payments ? '\n- Process transactions' : ''}

${features.cookies ? `3. Cookies

We use cookies and similar tracking technologies to track activity on our Website. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our Website may not function properly.

` : ''}${features.analytics ? `${features.cookies ? '4' : '3'}. Analytics

We may use third-party analytics services (such as Google Analytics) to monitor and analyze the use of our Website. These services may collect information about your use of the Website and share it with other services.

` : ''}${features.thirdParty ? `${features.cookies && features.analytics ? '5' : features.cookies || features.analytics ? '4' : '3'}. Third-Party Services

We may employ third-party companies and individuals to facilitate our Website, provide services on our behalf, or assist us in analyzing how our Website is used. These third parties have access to your personal data only to perform these tasks and are obligated not to disclose or use it for any other purpose.

` : ''}${features.childrenData ? `Children's Privacy

Our Website is not intended for use by children under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that a child under 13 has provided us with personal data, we will take steps to delete such information.

` : ''}Data Security

The security of your personal data is important to us. We use commercially acceptable means to protect your personal data, but no method of transmission over the Internet or electronic storage is 100% secure.

Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Object to processing of your data
- Request data portability

Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.

Contact Us

If you have any questions about this Privacy Policy, please contact us at: ${mail}

---
This privacy policy was generated using ${name}'s Privacy Policy Generator tool.`

  const copy = async () => {
    await navigator.clipboard.writeText(policy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Inc."
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Website URL</label>
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Contact Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="privacy@example.com"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Effective Date</label>
          <input
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Features</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(features).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFeatures({ ...features, [key]: e.target.checked })}
                className="rounded"
              />
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">Generated Privacy Policy</span>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="p-3 text-sm whitespace-pre-wrap max-h-96 overflow-auto">{policy}</pre>
      </div>
    </div>
  )
}
