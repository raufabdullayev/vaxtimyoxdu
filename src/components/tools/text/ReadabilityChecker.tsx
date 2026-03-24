'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length <= 3) return 1
  let count = 0
  const vowels = 'aeiouy'
  let prevVowel = false
  for (const char of w) {
    const isVowel = vowels.includes(char)
    if (isVowel && !prevVowel) count++
    prevVowel = isVowel
  }
  if (w.endsWith('e') && count > 1) count--
  return Math.max(count, 1)
}

function analyze(text: string) {
  const words = text.split(/\s+/).filter((w) => w.length > 0)
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0)
  const wordCount = words.length
  const sentenceCount = Math.max(sentences.length, 1)

  const fleschKincaid = wordCount > 0
    ? 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount)
    : 0

  const gradeLevel = wordCount > 0
    ? 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59
    : 0

  const avgWordsPerSentence = wordCount / sentenceCount
  const avgSyllablesPerWord = syllables / wordCount

  const complexWords = words.filter((w) => countSyllables(w) >= 3).length
  const gunningFog = wordCount > 0
    ? 0.4 * ((wordCount / sentenceCount) + 100 * (complexWords / wordCount))
    : 0

  return {
    wordCount,
    sentenceCount,
    syllables,
    fleschKincaid: Math.round(fleschKincaid * 10) / 10,
    gradeLevel: Math.round(Math.max(gradeLevel, 0) * 10) / 10,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 10) / 10,
    gunningFog: Math.round(gunningFog * 10) / 10,
    complexWords,
  }
}

function getReadabilityLevel(score: number): { label: string; color: string; audience: string } {
  if (score >= 90) return { label: 'Very Easy', color: 'text-green-600 dark:text-green-400', audience: '5th grade' }
  if (score >= 80) return { label: 'Easy', color: 'text-green-600 dark:text-green-400', audience: '6th grade' }
  if (score >= 70) return { label: 'Fairly Easy', color: 'text-blue-600 dark:text-blue-400', audience: '7th grade' }
  if (score >= 60) return { label: 'Standard', color: 'text-blue-600 dark:text-blue-400', audience: '8th-9th grade' }
  if (score >= 50) return { label: 'Fairly Difficult', color: 'text-orange-600 dark:text-orange-400', audience: '10th-12th grade' }
  if (score >= 30) return { label: 'Difficult', color: 'text-red-600 dark:text-red-400', audience: 'College' }
  return { label: 'Very Difficult', color: 'text-red-600 dark:text-red-400', audience: 'Graduate' }
}

export default function ReadabilityChecker() {
  const t = useTranslations('toolUI')
  const [text, setText] = useState('')

  const stats = text.trim() ? analyze(text) : null
  const level = stats ? getReadabilityLevel(stats.fleschKincaid) : null

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('input')}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to check readability..."
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {stats && level && (
        <>
          <div className="rounded-lg border bg-primary/5 p-6 text-center">
            <div className="text-xs text-muted-foreground mb-1">Flesch-Kincaid Readability Score</div>
            <div className={`text-5xl font-bold mb-2 ${level.color}`}>{stats.fleschKincaid}</div>
            <div className={`text-lg font-semibold ${level.color}`}>{level.label}</div>
            <div className="text-sm text-muted-foreground mt-1">Target audience: {level.audience}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs text-muted-foreground">Words</div>
              <div className="text-lg font-bold">{stats.wordCount}</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs text-muted-foreground">Sentences</div>
              <div className="text-lg font-bold">{stats.sentenceCount}</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs text-muted-foreground">Avg Words/Sentence</div>
              <div className="text-lg font-bold">{stats.avgWordsPerSentence}</div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs text-muted-foreground">Complex Words</div>
              <div className="text-lg font-bold">{stats.complexWords}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground mb-1">Grade Level (FK)</div>
              <div className="text-xl font-bold text-primary">{stats.gradeLevel}</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground mb-1">Gunning Fog Index</div>
              <div className="text-xl font-bold text-primary">{stats.gunningFog}</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground mb-1">Avg Syllables/Word</div>
              <div className="text-xl font-bold text-primary">{stats.avgSyllablesPerWord}</div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="text-sm font-medium mb-2">Score Scale</div>
            <div className="h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative">
              <div
                className="absolute top-0 w-3 h-4 bg-foreground rounded-full border-2 border-background shadow-sm"
                style={{ left: `${Math.min(Math.max(stats.fleschKincaid, 0), 100)}%`, transform: 'translateX(-50%)' }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0 (Difficult)</span>
              <span>100 (Easy)</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
