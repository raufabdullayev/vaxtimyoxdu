'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import ToolInput from '@/components/ui/ToolInput'
import ToolSelect from '@/components/ui/ToolSelect'
import ToolTextarea from '@/components/ui/ToolTextarea'

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

const POPULAR_TOPICS_KEYS = ['socialMedia', 'business', 'tech', 'travel', 'fitness', 'food'] as const

const POPULAR_TOPICS: Record<string, string[]> = {
  socialMedia: ['love', 'instagood', 'photooftheday', 'fashion', 'beautiful', 'happy', 'cute', 'tbt', 'followme', 'picoftheday'],
  business: ['entrepreneur', 'business', 'motivation', 'success', 'marketing', 'startup', 'hustle', 'branding', 'smallbusiness', 'leadership'],
  tech: ['technology', 'programming', 'coding', 'developer', 'webdev', 'javascript', 'python', 'ai', 'machinelearning', 'opensource'],
  travel: ['travel', 'wanderlust', 'adventure', 'explore', 'vacation', 'travelphotography', 'travelgram', 'trip', 'nature', 'sunset'],
  fitness: ['fitness', 'gym', 'workout', 'fitnessmotivation', 'bodybuilding', 'training', 'health', 'fitfam', 'exercise', 'healthy'],
  food: ['food', 'foodie', 'foodporn', 'instafood', 'yummy', 'delicious', 'homemade', 'cooking', 'recipe', 'healthyfood'],
}

export default function HashtagGenerator() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.textTools')
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
    return (POPULAR_TOPICS[selectedCategory] || []).map((tag) => `#${tag}`)
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
        label={t('enterTopics')}
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={t('enterKeywordsSeparated')}
        helpText={t('separateWithCommas')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ToolSelect
          label={t('hashtagStyle')}
          value={style}
          onChange={(e) => setStyle(e.target.value as HashtagStyle)}
          options={[
            { value: 'lowercase', label: t('lowercaseExample') },
            { value: 'camelCase', label: t('camelCaseExample') },
            { value: 'uppercase', label: t('uppercaseExample') },
          ]}
        />
        <ToolInput
          label={t('prefix')}
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="e.g., my"
          helpText={t('prependedToEach')}
        />
      </div>

      {/* Popular topic categories */}
      <div>
        <label className="text-sm font-medium mb-2 block">{t('popularTopicPresets')}</label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TOPICS_KEYS.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? '' : cat)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'border hover:bg-accent'
                }`}
                aria-label={isSelected
                  ? t('deselectTopic', { topic: t(cat as Parameters<typeof t>[0]) })
                  : t('selectTopic', { topic: t(cat as Parameters<typeof t>[0]) })
                }
                aria-pressed={isSelected}
              >
                {t(cat as Parameters<typeof t>[0])}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results */}
      {allHashtags.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              {t('generatedHashtags')}
              <span className="text-xs text-muted-foreground ml-2">
                ({t('hashtagCount', { count: allHashtags.length })})
              </span>
            </label>
            <button
              onClick={copyAll}
              className="text-xs text-primary hover:underline"
            >
              {copied ? tc('copied') : t('copyAll')}
            </button>
          </div>
          <div className="rounded-lg border p-4 flex flex-wrap gap-2">
            {allHashtags.map((tag, i) => (
              <button
                key={`${tag}-${i}`}
                onClick={() => copySingle(tag)}
                className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                aria-label={t('copyHashtag', { tag })}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Copy all output */}
      {allHashtags.length > 0 && (
        <ToolTextarea
          label={t('copyReadyText')}
          value={allHashtags.join(' ')}
          readOnly
          className="min-h-[80px] font-mono bg-muted/50"
        />
      )}
    </div>
  )
}
