import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MarkdownRenderer from '../MarkdownRenderer'

describe('MarkdownRenderer', () => {
  describe('basic rendering', () => {
    it('renders a paragraph', () => {
      render(<MarkdownRenderer content="Hello world" />)
      expect(screen.getByText('Hello world')).toBeInTheDocument()
    })

    it('applies default prose classes to wrapper', () => {
      const { container } = render(<MarkdownRenderer content="Test" />)
      const wrapper = container.firstElementChild as HTMLElement
      expect(wrapper).toHaveClass('prose', 'prose-sm', 'max-w-none')
    })

    it('applies custom className', () => {
      const { container } = render(
        <MarkdownRenderer content="Test" className="my-custom-class" />
      )
      const wrapper = container.firstElementChild as HTMLElement
      expect(wrapper).toHaveClass('my-custom-class')
    })

    it('renders empty content without crashing', () => {
      const { container } = render(<MarkdownRenderer content="" />)
      expect(container.firstElementChild).toBeInTheDocument()
    })
  })

  describe('headings', () => {
    it('renders h1', () => {
      render(<MarkdownRenderer content="# Heading 1" />)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('Heading 1')
      expect(h1).toHaveClass('text-2xl', 'font-bold')
    })

    it('renders h2', () => {
      render(<MarkdownRenderer content="## Heading 2" />)
      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toHaveTextContent('Heading 2')
      expect(h2).toHaveClass('text-xl', 'font-semibold')
    })

    it('renders h3', () => {
      render(<MarkdownRenderer content="### Heading 3" />)
      const h3 = screen.getByRole('heading', { level: 3 })
      expect(h3).toHaveTextContent('Heading 3')
      expect(h3).toHaveClass('text-lg', 'font-semibold')
    })

    it('renders h4', () => {
      render(<MarkdownRenderer content="#### Heading 4" />)
      const h4 = screen.getByRole('heading', { level: 4 })
      expect(h4).toHaveTextContent('Heading 4')
      expect(h4).toHaveClass('font-semibold')
    })
  })

  describe('text formatting', () => {
    it('renders bold text', () => {
      render(<MarkdownRenderer content="**bold text**" />)
      const strong = screen.getByText('bold text')
      expect(strong.tagName).toBe('STRONG')
      expect(strong).toHaveClass('font-bold')
    })

    it('renders italic text', () => {
      render(<MarkdownRenderer content="*italic text*" />)
      const em = screen.getByText('italic text')
      expect(em.tagName).toBe('EM')
      expect(em).toHaveClass('italic')
    })

    it('renders strikethrough text (GFM)', () => {
      render(<MarkdownRenderer content="~~deleted text~~" />)
      const del = screen.getByText('deleted text')
      expect(del.tagName).toBe('DEL')
      expect(del).toHaveClass('line-through')
    })
  })

  describe('lists', () => {
    it('renders unordered list', () => {
      render(<MarkdownRenderer content={'- item 1\n\n- item 2\n\n- item 3'} />)
      const list = screen.getByRole('list')
      expect(list.tagName).toBe('UL')
      expect(list).toHaveClass('list-disc')
      const items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(3)
    })

    it('renders ordered list', () => {
      render(<MarkdownRenderer content="1. first\n2. second\n3. third" />)
      const list = screen.getByRole('list')
      expect(list.tagName).toBe('OL')
      expect(list).toHaveClass('list-decimal')
    })
  })

  describe('code', () => {
    it('renders inline code', () => {
      render(<MarkdownRenderer content="Use `console.log`" />)
      const code = screen.getByText('console.log')
      expect(code.tagName).toBe('CODE')
      expect(code).toHaveClass('font-mono')
    })

    it('renders code block inside pre', () => {
      render(<MarkdownRenderer content={'```\nconst x = 1\n```'} />)
      const pre = document.querySelector('pre')
      expect(pre).toBeInTheDocument()
      expect(pre).toHaveClass('bg-muted', 'rounded-lg')
    })
  })

  describe('blockquote', () => {
    it('renders blockquote', () => {
      render(<MarkdownRenderer content="> A quote" />)
      const blockquote = document.querySelector('blockquote')
      expect(blockquote).toBeInTheDocument()
      expect(blockquote).toHaveClass('border-l-4', 'italic')
    })
  })

  describe('images', () => {
    it('renders image with alt text', () => {
      render(<MarkdownRenderer content="![Alt text](https://example.com/img.png)" />)
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('alt', 'Alt text')
      expect(img).toHaveAttribute('src', 'https://example.com/img.png')
      expect(img).toHaveClass('max-w-full', 'rounded-lg')
    })

    it('uses empty string for missing alt', () => {
      const { container } = render(<MarkdownRenderer content="![](https://example.com/img.png)" />)
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('alt', '')
    })
  })

  describe('links and XSS prevention', () => {
    it('renders a normal external link with target=_blank', () => {
      render(<MarkdownRenderer content="[Click](https://example.com)" />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders an internal link without target=_blank', () => {
      render(<MarkdownRenderer content="[Home](/)" />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/')
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    })

    it('blocks javascript: protocol XSS', () => {
      render(<MarkdownRenderer content='[XSS](javascript:alert(1))' />)
      const link = screen.queryByRole('link')
      expect(link).not.toBeInTheDocument()
      // Should render as span instead
      const span = screen.getByText('XSS')
      expect(span.tagName).toBe('SPAN')
    })

    it('blocks javascript: with mixed case', () => {
      render(<MarkdownRenderer content='[XSS](JaVaScRiPt:alert(1))' />)
      const link = screen.queryByRole('link')
      expect(link).not.toBeInTheDocument()
      expect(screen.getByText('XSS').tagName).toBe('SPAN')
    })

    it('blocks javascript: with whitespace obfuscation', () => {
      render(<MarkdownRenderer content='[XSS](java\tscript:alert(1))' />)
      const link = screen.queryByRole('link')
      expect(link).not.toBeInTheDocument()
    })

    it('blocks javascript: with leading spaces', () => {
      render(<MarkdownRenderer content='[XSS](  javascript:alert(1))' />)
      const link = screen.queryByRole('link')
      expect(link).not.toBeInTheDocument()
    })

    it('allows mailto: links', () => {
      render(<MarkdownRenderer content="[Email](mailto:test@example.com)" />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'mailto:test@example.com')
    })

    it('allows https: links', () => {
      render(<MarkdownRenderer content="[Safe](https://safe.com)" />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://safe.com')
    })

    it('allows http: links', () => {
      render(<MarkdownRenderer content="[HTTP](http://example.com)" />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'http://example.com')
    })
  })

  describe('GFM tables', () => {
    it('renders a table', () => {
      const tableMarkdown = `| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |`
      render(<MarkdownRenderer content={tableMarkdown} />)
      const table = document.querySelector('table')
      expect(table).toBeInTheDocument()
      expect(table).toHaveClass('w-full', 'border-collapse')
    })

    it('renders table headers in thead', () => {
      const tableMarkdown = `| Name | Value |\n| --- | --- |\n| A | 1 |`
      render(<MarkdownRenderer content={tableMarkdown} />)
      const thead = document.querySelector('thead')
      expect(thead).toBeInTheDocument()
      expect(thead).toHaveClass('bg-muted')
    })

    it('renders table cells with proper styling', () => {
      const tableMarkdown = `| H1 | H2 |\n| --- | --- |\n| data | value |`
      render(<MarkdownRenderer content={tableMarkdown} />)
      const th = document.querySelector('th')
      expect(th).toHaveClass('font-semibold', 'text-left')
      const td = document.querySelector('td')
      expect(td).toHaveClass('border', 'px-4', 'py-2')
    })
  })
})
