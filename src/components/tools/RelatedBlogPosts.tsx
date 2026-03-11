import { Link } from '@/i18n/navigation'
import { getBlogPostsForTool } from '@/lib/utils/cross-links'

interface RelatedBlogPostsProps {
  toolSlug: string
  title?: string
}

/**
 * Displays blog posts that mention the given tool, creating cross-links
 * from tool pages back to blog content. Helps SEO by building internal
 * link structure and keeps users engaged with related content.
 */
export default function RelatedBlogPosts({ toolSlug, title = 'Related Blog Posts' }: RelatedBlogPostsProps) {
  const posts = getBlogPostsForTool(toolSlug)

  if (posts.length === 0) return null

  return (
    <div className="mt-8 pt-6 border-t">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="p-3 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all group"
          >
            <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </p>
            <time className="text-xs text-muted-foreground mt-1.5 block">{post.date}</time>
          </Link>
        ))}
      </div>
    </div>
  )
}
