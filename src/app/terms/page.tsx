import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - ToolBox AI',
  description: 'Terms of Service for ToolBox AI online tools platform.',
}

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p className="text-sm">Last updated: March 2026</p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Acceptance of Terms</h2>
        <p>
          By using ToolBox AI, you agree to these Terms of Service. If you do not agree, please do
          not use our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Use of Services</h2>
        <p>
          Our tools are provided free of charge for personal and commercial use. You may not use our
          services for any illegal or unauthorized purpose.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Limitations</h2>
        <p>
          AI-powered tools have usage limits to ensure fair access for all users. We reserve the
          right to restrict access to users who abuse our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Disclaimer</h2>
        <p>
          Our tools are provided &quot;as is&quot; without warranties of any kind. We are not
          responsible for any data loss or damages resulting from the use of our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-8">Changes</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of our services
          constitutes acceptance of updated terms.
        </p>
      </div>
    </div>
  )
}
