'use client'

import { useState, useMemo } from 'react'
import ToolInput from '@/components/ui/ToolInput'
import ToolSelect from '@/components/ui/ToolSelect'

type HashtagStyle = 'camelCase' | 'lowercase' | 'uppercase'

function toHashtag(word: string, style: HashtagStyle): string {
  const cleaned = word.replace(/[^a-zA-Z0-9\s]/g, '').trim()
  if (!cleaned) return ''

  switch (style) {
    case 'lowercase':
      return `#${cleaned.replace(/\s+/g, '').toLowerCase()}`
    case 'uppercase':
      return `#${cleaned.replace(/\s+/g, '').toUpperCase()}`
    case 'camelCase': {
      const words = cleaned.split(/\s+/)
      const camel = words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join('')
      return `#${camel}`
    }
  }
}

const POPULAR_TOPICS: Record<string, string[]> = {
  'Social Media': ['love', 'instagood', 'photooftheday', 'fashion', 'beautiful', 'happy', 'cute', 'tbt', 'followme', 'picoftheday'],
  'Business': ['entrepreneur', 'business', 'motivation', 'success', 'marketing', 'startup', 'hustle', 'branding', 'smallbusiness', 'leadership'],
  'Tech': ['technology', 'programming', 'coding', 'developer', 'webdev', 'javascript', 'python', 'ai', 'machinelearning', 'opensource'],
  'Travel': ['travel', 'wanderlust', 'adventure', 'explore', 'vacation', 'travelphotography', 'travelgram', 'trip', 'nature', 'sunset'],
  'Fitness': ['fitness', 'gym', 'workout', 'fitnessmotivation', 'bodybuilding', 'training', 'health', 'fitfam', 'exercise', 'healthy'],
  'Food': ['food', 'foodie', 'foodporn', 'instafood', 'yummy', 'delicious', 'homemade', 'cooking', 'recipe', 'healthyfood'],
}

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState<HashtagStyle>('lowercase')
  const [prefix, setPrefix] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  const generatedHashtags = useMemo(() => {
    if (!topic.trim()) return []
    const words = topic.split(/[,\n]+/).map((w) => w.trim()).filter(Boolean)
    const hashtags = words.map((w) => toHashtag(w, style)).filter(Boolean)

    if (prefix.trim()) {
      const prefixTag = toHashtag(prefix.trim(), style)
      if (prefixTag) {
        return hashtags.map((h) => `${prefixTag}${h.slice(1)}`)
      }
    }

    return [...new Set(hashtags)]
  }, [topic, style, prefix])

  const popularHashtags = useMemo(() => {
    if (!selectedCategory) return []
    return (POPULAR_TOPICS[selectedCategory] || []).map((t) => `#${t}`)
  }, [selectedCategory])

  const allHashtags = [...generatedHashtags, ...popularHashtags]

  const copyAll = async () => {
    if (allHashtags.length === 0) return
    await navigator.clipboard.writeText(allHashtags.join(' '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copySingle = async (tag: string) => {
    await navigator.clipboard.writeText(tag)
  }

  return (
    <div className="space-y-4">
      <ToolInput
        label="Enter Topics"
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter keywords separated by commas (e.g., web design, coding, tech)"
        helpText="Separate multiple keywords with commas"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolSelect
          label="Hashtag Style"
          value={style}
          onChange={(e) => setStyle(e.target.value as HashtagStyle)}
          options={[
            { value: 'lowercase', label: 'lowercase (#webdesign)' },
            { value: 'camelCase', label: 'camelCase (#webDesign)' },
            { value: 'uppercase', label: 'UPPERCASE (#WEBDESIGN)' },
          ]}
        />
        <ToolInput
          label="Prefix (optional)"
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="e.g., my"
          helpText="Prepended to each hashtag"
        />
      </div>

      {/* Popular topic categories */}
      <div>
        <label className="text-sm font-medium mb-2 block">Popular Topic Presets</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(POPULAR_TOPICS).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {allHashtags.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              Generated Hashtags
              <span className="text-xs text-muted-foreground ml-2">
                ({allHashtags.length} hashtags)
              </span>
            </label>
            <button
              onClick={copyAll}
              className="text-xs text-primary hover:underline"
            >
              {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          <div className="rounded-lg border p-4 flex flex-wrap gap-2">
            {allHashtags.map((tag, i) => (
              <button
                key={`${tag}-${i}`}
                onClick={() => copySingle(tag)}
                className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                title="Click to copy"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Copy all output */}
      {allHashtags.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-1 block">Copy-Ready Text</label>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[80px] focus:outline-none"
            value={allHashtags.join(' ')}
            readOnly
            aria-label="Copy-ready hashtags"
          />
        </div>
      )}
    </div>
  )
}
