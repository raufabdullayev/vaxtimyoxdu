'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const MAX_TWEET = 280
const URL_LENGTH = 23

function countTweetLength(text: string): number {
  // Twitter counts URLs as 23 characters
  const urlRegex = /https?:\/\/\S+/g
  let length = text.length
  const urls = text.match(urlRegex) || []
  for (const url of urls) {
    length = length - url.length + URL_LENGTH
  }
  return length
}

export default function TwitterCharCounter() {
  const t = useTranslations('toolUI')
  const [text, setText] = useState('')

  const tweetLength = countTweetLength(text)
  const remaining = MAX_TWEET - tweetLength
  const isOver = remaining < 0
  const percent = Math.min((tweetLength / MAX_TWEET) * 100, 100)

  const hashtags = (text.match(/#\w+/g) || [])
  const mentions = (text.match(/@\w+/g) || [])
  const urls = (text.match(/https?:\/\/\S+/g) || [])

  const progressColor = isOver
    ? 'text-destructive'
    : remaining <= 20
    ? 'text-orange-500'
    : 'text-primary'

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What is happening?!"
          className={`w-full rounded-lg border bg-background px-3 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-2 ${
            isOver ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'
          }`}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" className={progressColor}>
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            <circle
              cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"
              strokeDasharray={`${(percent / 100) * 63} 63`}
              strokeLinecap="round"
              transform="rotate(-90 12 12)"
            />
          </svg>
          <span className={`text-sm font-mono font-bold ${progressColor}`}>
            {remaining}
          </span>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="text-sm font-medium mb-3">Tweet Preview</div>
        <div className="rounded-lg bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div>
              <div className="text-sm font-bold">User</div>
              <div className="text-xs text-muted-foreground">@username</div>
            </div>
          </div>
          <div className="text-sm whitespace-pre-wrap break-words">
            {text || <span className="text-muted-foreground italic">Your tweet preview...</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border p-3 text-center">
          <div className="text-xs text-muted-foreground">Characters</div>
          <div className={`text-lg font-bold ${isOver ? 'text-destructive' : ''}`}>{tweetLength}/{MAX_TWEET}</div>
        </div>
        <div className="rounded-lg border p-3 text-center">
          <div className="text-xs text-muted-foreground">Hashtags</div>
          <div className="text-lg font-bold">{hashtags.length}</div>
        </div>
        <div className="rounded-lg border p-3 text-center">
          <div className="text-xs text-muted-foreground">Mentions</div>
          <div className="text-lg font-bold">{mentions.length}</div>
        </div>
        <div className="rounded-lg border p-3 text-center">
          <div className="text-xs text-muted-foreground">Links</div>
          <div className="text-lg font-bold">{urls.length}</div>
        </div>
      </div>

      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, i) => (
            <span key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">{tag}</span>
          ))}
        </div>
      )}

      {isOver && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          Your tweet is {Math.abs(remaining)} characters over the limit.
        </div>
      )}
    </div>
  )
}
