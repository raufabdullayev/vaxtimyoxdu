'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function OpenGraphGenerator() {
  const t = useTranslations('toolUI.common')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [siteName, setSiteName] = useState('')
  const [type, setType] = useState('website')
  const [locale, setLocale] = useState('en_US')
  const [twitterCard, setTwitterCard] = useState('summary_large_image')
  const [twitterSite, setTwitterSite] = useState('')
  const [copied, setCopied] = useState(false)

  const ogTags = [
    title && `<meta property="og:title" content="${title}" />`,
    description && `<meta property="og:description" content="${description}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    image && `<meta property="og:image" content="${image}" />`,
    siteName && `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    '',
    '<!-- Twitter Card -->',
    `<meta name="twitter:card" content="${twitterCard}" />`,
    title && `<meta name="twitter:title" content="${title}" />`,
    description && `<meta name="twitter:description" content="${description}" />`,
    image && `<meta name="twitter:image" content="${image}" />`,
    twitterSite && `<meta name="twitter:site" content="${twitterSite}" />`,
  ].filter(Boolean).join('\n')

  const copy = async () => {
    await navigator.clipboard.writeText(ogTags)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Page"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="text-xs text-muted-foreground mt-1">{title.length}/60 characters</div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of the page content"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="text-xs text-muted-foreground mt-1">{description.length}/160 characters</div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Site Name</label>
          <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="My Website" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="website">website</option>
            <option value="article">article</option>
            <option value="product">product</option>
            <option value="profile">profile</option>
            <option value="video.other">video</option>
            <option value="music.song">music</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Locale</label>
          <select value={locale} onChange={(e) => setLocale(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="en_US">English (US)</option>
            <option value="en_GB">English (GB)</option>
            <option value="az_AZ">Azerbaijani</option>
            <option value="tr_TR">Turkish</option>
            <option value="ru_RU">Russian</option>
            <option value="de_DE">German</option>
            <option value="fr_FR">French</option>
            <option value="es_ES">Spanish</option>
            <option value="ja_JP">Japanese</option>
            <option value="zh_CN">Chinese</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Twitter Card</label>
          <select value={twitterCard} onChange={(e) => setTwitterCard(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="summary_large_image">Summary Large Image</option>
            <option value="summary">Summary</option>
            <option value="player">Player</option>
            <option value="app">App</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Twitter @handle</label>
          <input type="text" value={twitterSite} onChange={(e) => setTwitterSite(e.target.value)} placeholder="@username" className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      {(title || image) && (
        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium mb-2">Preview</div>
          <div className="rounded-lg border overflow-hidden max-w-md">
            {image && (
              <div className="bg-muted h-40 flex items-center justify-center text-xs text-muted-foreground">
                Image: {image.length > 50 ? image.slice(0, 50) + '...' : image}
              </div>
            )}
            <div className="p-3">
              <div className="text-xs text-muted-foreground uppercase">{siteName || 'example.com'}</div>
              <div className="font-semibold text-sm mt-1">{title || 'Page Title'}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{description || 'Page description will appear here'}</div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border">
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
          <span className="text-xs font-medium">Open Graph Meta Tags</span>
          <button onClick={copy} className="text-xs text-primary hover:underline">
            {copied ? t('copied') : t('copy')}
          </button>
        </div>
        <pre className="p-3 text-xs font-mono whitespace-pre-wrap max-h-64 overflow-auto">{ogTags}</pre>
      </div>
    </div>
  )
}
