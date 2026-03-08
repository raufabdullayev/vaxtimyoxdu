import { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '@/components/layout/AdBanner'

export const metadata: Metadata = {
  title: 'Blog - Vaxtim Yoxdu',
  description: 'Tips, tutorials, and guides about online tools, AI, and productivity. Free tools for developers, designers, and content creators.',
  openGraph: {
    title: 'Blog - Vaxtim Yoxdu',
    description: 'Tips, tutorials, and guides about online tools, AI, and productivity.',
    url: 'https://vaxtimyoxdu.com/blog',
    siteName: 'Vaxtim Yoxdu',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://vaxtimyoxdu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vaxtim Yoxdu Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Vaxtim Yoxdu',
    description: 'Tips, tutorials, and guides about online tools, AI, and productivity.',
    images: ['https://vaxtimyoxdu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://vaxtimyoxdu.com/blog',
    languages: {
      'az': 'https://vaxtimyoxdu.com/blog',
      'en': 'https://vaxtimyoxdu.com/blog',
    },
  },
}

const posts = [
  {
    slug: 'best-free-online-tools-2026',
    title: 'Best Free Online Tools in 2026',
    excerpt: 'Discover the most useful free online tools for productivity, development, and content creation.',
    date: '2026-03-07',
  },
  {
    slug: 'how-ai-text-rewriting-works',
    title: 'How AI Text Rewriting Works',
    excerpt: 'Learn how artificial intelligence can help you rewrite and improve your text content.',
    date: '2026-03-05',
  },
  {
    slug: 'compress-images-without-losing-quality',
    title: 'How to Compress Images Without Losing Quality',
    excerpt: 'Learn the best techniques for reducing image file sizes while keeping visual quality intact.',
    date: '2026-03-04',
  },
  {
    slug: 'regex-guide-for-beginners',
    title: 'Regular Expressions: A Beginner\'s Guide',
    excerpt: 'Master the basics of regex with practical examples you can test right in your browser.',
    date: '2026-03-03',
  },
  {
    slug: 'why-grammar-matters-in-professional-writing',
    title: 'Why Grammar Matters in Professional Writing',
    excerpt: 'How proper grammar and spelling can impact your career, business, and online presence.',
    date: '2026-03-02',
  },
]

export default function BlogPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post, index) => (
          <div key={post.slug}>
            <article className="border-b pb-8">
              <time className="text-sm text-muted-foreground">{post.date}</time>
              <h2 className="text-xl font-semibold mt-1 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground text-sm">{post.excerpt}</p>
            </article>
            {index === 1 && <AdBanner slot="blog-list-mid" format="in-article" className="my-6" />}
          </div>
        ))}
      </div>
    </div>
  )
}
