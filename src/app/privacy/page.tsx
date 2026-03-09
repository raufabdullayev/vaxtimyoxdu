import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Məxfilik Siyasəti - Vaxtım Yoxdu',
  description: 'Vaxtım Yoxdu onlayn alətlər platforması üçün məxfilik siyasəti.',
  alternates: {
    canonical: 'https://vaxtimyoxdu.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p className="text-sm">Last updated: March 2026</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Information We Collect</h2>
        <p>
          We collect minimal information to provide our services. Client-side tools process data
          entirely in your browser - nothing is sent to our servers.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">AI-Powered Tools</h2>
        <p>
          For AI-powered tools, your input text is sent to our secure servers for processing. We do
          not store, log, or use your input data for training purposes. Data is deleted immediately
          after processing.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Analytics</h2>
        <p>
          We use Google Analytics to understand how visitors use our site. This collects anonymous
          usage data such as page views, browser type, and general location.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Advertising</h2>
        <p>
          We display advertisements through Google AdSense and other partners. These services may
          use cookies to serve relevant ads based on your browsing activity.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Cookies</h2>
        <p>
          We use essential cookies for site functionality and third-party cookies for analytics and
          advertising. You can manage cookie preferences in your browser settings.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{' '}
          <a href="mailto:privacy@vaxtimyoxdu.com" className="text-primary hover:underline">
            privacy@vaxtimyoxdu.com
          </a>
        </p>
      </div>
    </div>
  )
}
