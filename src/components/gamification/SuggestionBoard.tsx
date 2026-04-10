'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { ToolCategory } from '@/types/tool'

const SUGGESTIONS_KEY = 'tool-suggestions'
const VOTES_KEY = 'tool-suggestion-votes'

type SuggestionCategory = ToolCategory | 'other'

interface Suggestion {
  id: string
  name: string
  description: string
  category: SuggestionCategory
  votes: number
  createdAt: number
}

const CATEGORIES: SuggestionCategory[] = [
  'pdf',
  'image',
  'ai',
  'dev',
  'text',
  'generators',
  'other',
]

function loadSuggestions(): Suggestion[] {
  try {
    const stored = localStorage.getItem(SUGGESTIONS_KEY)
    if (stored) return JSON.parse(stored) as Suggestion[]
  } catch { /* corrupted */ }
  return []
}

function saveSuggestions(suggestions: Suggestion[]): void {
  try {
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(suggestions))
  } catch { /* storage full */ }
}

function loadVotes(): string[] {
  try {
    const stored = localStorage.getItem(VOTES_KEY)
    if (stored) return JSON.parse(stored) as string[]
  } catch { /* corrupted */ }
  return []
}

function saveVotes(votes: string[]): void {
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
  } catch { /* storage full */ }
}

export default function SuggestionBoard() {
  const t = useTranslations('suggest')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [votedIds, setVotedIds] = useState<string[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<SuggestionCategory>('ai')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    setSuggestions(loadSuggestions())
    setVotedIds(loadVotes())
  }, [])

  const sorted = useMemo(
    () => [...suggestions].sort((a, b) => b.votes - a.votes),
    [suggestions]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmedName = name.trim()
      const trimmedDesc = description.trim()
      if (!trimmedName || !trimmedDesc) return

      const newSuggestion: Suggestion = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: trimmedName,
        description: trimmedDesc,
        category,
        votes: 0,
        createdAt: Date.now(),
      }

      const updated = [...suggestions, newSuggestion]
      setSuggestions(updated)
      saveSuggestions(updated)
      setName('')
      setDescription('')
      setCategory('ai')
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
    },
    [name, description, category, suggestions]
  )

  const handleVote = useCallback(
    (id: string) => {
      if (votedIds.includes(id)) return
      const updated = suggestions.map((s) =>
        s.id === id ? { ...s, votes: s.votes + 1 } : s
      )
      const newVotedIds = [...votedIds, id]
      setSuggestions(updated)
      setVotedIds(newVotedIds)
      saveSuggestions(updated)
      saveVotes(newVotedIds)
    },
    [suggestions, votedIds]
  )

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border bg-card p-6"
      >
        <h2 className="text-lg font-semibold">{t('formTitle')}</h2>

        <div>
          <label
            htmlFor="suggest-name"
            className="block text-sm font-medium mb-1"
          >
            {t('nameLabel')}
          </label>
          <input
            id="suggest-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
            maxLength={100}
            required
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>

        <div>
          <label
            htmlFor="suggest-description"
            className="block text-sm font-medium mb-1"
          >
            {t('descriptionLabel')}
          </label>
          <textarea
            id="suggest-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('descriptionPlaceholder')}
            maxLength={500}
            required
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="suggest-category"
            className="block text-sm font-medium mb-1"
          >
            {t('categoryLabel')}
          </label>
          <select
            id="suggest-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as SuggestionCategory)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          >
            {CATEGORIES.map((cat) => {
              const catKey =
                `categories.${cat}` as Parameters<typeof t>[0]
              let label: string
              try {
                label = t(catKey)
              } catch {
                label = cat
              }
              return (
                <option key={cat} value={cat}>
                  {label}
                </option>
              )
            })}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {t('submitButton')}
        </button>

        {submitSuccess && (
          <p className="text-sm text-green-600 dark:text-green-400 text-center animate-in fade-in">
            {t('submitSuccess')}
          </p>
        )}
      </form>

      {sorted.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">{t('suggestionsTitle')}</h2>
          <div className="space-y-3">
            {sorted.map((suggestion) => {
              const hasVoted = votedIds.includes(suggestion.id)
              const catKey =
                `categories.${suggestion.category}` as Parameters<typeof t>[0]
              let categoryLabel: string
              try {
                categoryLabel = t(catKey)
              } catch {
                categoryLabel = suggestion.category
              }

              return (
                <div
                  key={suggestion.id}
                  className="flex items-start gap-4 rounded-xl border bg-card p-4"
                >
                  <button
                    onClick={() => handleVote(suggestion.id)}
                    disabled={hasVoted}
                    className={`flex flex-col items-center min-w-[48px] rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
                      hasVoted
                        ? 'bg-primary/10 text-primary cursor-default'
                        : 'bg-muted hover:bg-primary/10 hover:text-primary cursor-pointer'
                    }`}
                    aria-label={
                      hasVoted ? t('voted') : t('voteButton')
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={hasVoted ? 'text-primary' : 'text-muted-foreground'}
                    >
                      <path
                        d="M8 3L12 9H4L8 3Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{suggestion.votes}</span>
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">
                      {suggestion.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {suggestion.description}
                    </p>
                    <span className="inline-block mt-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                      {categoryLabel}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {sorted.length === 0 && (
        <p className="text-center text-muted-foreground text-sm">
          {t('noSuggestions')}
        </p>
      )}
    </div>
  )
}
