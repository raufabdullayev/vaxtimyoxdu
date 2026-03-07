import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - ToolBox AI',
  description: 'About ToolBox AI - Free AI-powered online tools platform.',
}

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">About ToolBox AI</h1>
      <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground">
        <p>
          ToolBox AI is a collection of free online tools designed to help you work faster and
          smarter. From AI-powered text rewriting to PDF conversion, image editing, and developer
          utilities - we have everything you need in one place.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8">Our Mission</h2>
        <p>
          We believe essential tools should be free and accessible to everyone. No signup required,
          no hidden fees, no data collection. Just powerful tools that work.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8">Privacy First</h2>
        <p>
          Many of our tools run entirely in your browser - your data never leaves your device. For
          AI-powered tools, we process your text securely and never store it.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
        <p>
          Have feedback or suggestions? We&apos;d love to hear from you. Reach out at{' '}
          <a href="mailto:hello@toolbox-ai.com" className="text-primary hover:underline">
            hello@toolbox-ai.com
          </a>
        </p>
      </div>
    </div>
  )
}
