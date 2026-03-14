'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

interface Stats {
  characters: number
  charactersNoSpaces: number
  words: number
  sentences: number
  paragraphs: number
  readingTime: string
  speakingTime: string
}

function analyze(text: string): Stats {
  if (!text.trim()) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '0 sec',
      speakingTime: '0 sec',
    }
  }

  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length

  const readingMinutes = words / 200
  const speakingMinutes = words / 130

  const formatTime = (minutes: number) => {
    if (minutes < 1) return `${Math.ceil(minutes * 60)} sec`
    if (minutes < 60) return `${Math.round(minutes)} min`
    return `${Math.floor(minutes / 60)} hr ${Math.round(minutes % 60)} min`
  }

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTime: formatTime(readingMinutes),
    speakingTime: formatTime(speakingMinutes),
  }
}

export default function WordCounter() {
  const t = useTranslations('toolUI')
  const [text, setText] = useState('')
  const stats = useMemo(() => analyze(text), [text])

  const statItems = [
    { label: t('words'), value: stats.words },
    { label: t('characters'), value: stats.characters },
    { label: t('characters') + ' (no spaces)', value: stats.charactersNoSpaces },
    { label: t('sentences'), value: stats.sentences },
    { label: t('paragraphs'), value: stats.paragraphs },
    { label: t('readingTime'), value: stats.readingTime },
    { label: t('speakingTime'), value: stats.speakingTime },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.slice(0, 4).map((item) => (
          <div key={item.label} className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-2xl font-bold text-primary">{item.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {statItems.slice(4).map((item) => (
          <div key={item.label} className="rounded-lg bg-muted/50 p-3 text-center">
            <div className="text-lg font-bold">{item.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Enter your text</label>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[250px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {text.trim() && (
        <button
          onClick={() => setText('')}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-accent transition-colors"
        >
          {t('clear')}
        </button>
      )}
    </div>
  )
}
