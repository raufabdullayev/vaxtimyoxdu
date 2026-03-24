import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RelatedBlogPosts from '../RelatedBlogPosts'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/lib/utils/cross-links', () => ({
  getBlogPostsForTool: (slug: string) => {
    if (slug === 'word-counter') {
      return [
        { slug: 'post-1', title: 'Post about word counting', date: '2024-01-01' },
        { slug: 'post-2', title: 'Text analysis tips', date: '2024-02-15' },
      ]
    }
    return []
  },
}))

describe('RelatedBlogPosts', () => {
  it('renders related blog posts for a tool', () => {
    render(<RelatedBlogPosts toolSlug="word-counter" />)

    expect(screen.getByText('Related Blog Posts')).toBeInTheDocument()
    expect(screen.getByText('Post about word counting')).toBeInTheDocument()
    expect(screen.getByText('Text analysis tips')).toBeInTheDocument()
  })

  it('renders correct links to blog posts', () => {
    render(<RelatedBlogPosts toolSlug="word-counter" />)

    const link = screen.getByText('Post about word counting').closest('a')
    expect(link).toHaveAttribute('href', '/blog/post-1')
  })

  it('renders dates for each post', () => {
    render(<RelatedBlogPosts toolSlug="word-counter" />)

    expect(screen.getByText('2024-01-01')).toBeInTheDocument()
    expect(screen.getByText('2024-02-15')).toBeInTheDocument()
  })

  it('renders nothing when no related posts exist', () => {
    const { container } = render(<RelatedBlogPosts toolSlug="unknown-tool" />)

    expect(container.innerHTML).toBe('')
  })

  it('uses custom title when provided', () => {
    render(<RelatedBlogPosts toolSlug="word-counter" title="Blog Yazilari" />)

    expect(screen.getByText('Blog Yazilari')).toBeInTheDocument()
    expect(screen.queryByText('Related Blog Posts')).not.toBeInTheDocument()
  })
})
