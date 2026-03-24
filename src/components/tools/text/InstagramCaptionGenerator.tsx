'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

const CATEGORIES: Record<string, string[]> = {
  Travel: ['#travel', '#wanderlust', '#adventure', '#explore', '#travelgram', '#instatravel', '#travelphotography', '#vacation', '#trip', '#holiday'],
  Food: ['#food', '#foodie', '#foodporn', '#yummy', '#delicious', '#instafood', '#foodphotography', '#cooking', '#homemade', '#restaurant'],
  Fitness: ['#fitness', '#gym', '#workout', '#motivation', '#health', '#fitnessmotivation', '#training', '#exercise', '#healthy', '#lifestyle'],
  Fashion: ['#fashion', '#style', '#ootd', '#outfit', '#fashionista', '#streetstyle', '#trendy', '#fashionblogger', '#instafashion', '#lookoftheday'],
  Nature: ['#nature', '#naturephotography', '#landscape', '#sunset', '#sunrise', '#mountains', '#ocean', '#wildlife', '#earth', '#outdoors'],
  Business: ['#business', '#entrepreneur', '#startup', '#success', '#marketing', '#motivation', '#leadership', '#growth', '#hustle', '#mindset'],
  Photography: ['#photography', '#photooftheday', '#photo', '#photographer', '#instagood', '#picoftheday', '#portrait', '#art', '#camera', '#composition'],
  Tech: ['#tech', '#technology', '#coding', '#developer', '#programming', '#ai', '#software', '#innovation', '#digital', '#startup'],
}

const EMOJIS: Record<string, string[]> = {
  Travel: ['\u2708\uFE0F', '\uD83C\uDF0D', '\uD83D\uDDFA\uFE0F', '\uD83C\uDFD6\uFE0F', '\u26F0\uFE0F', '\uD83C\uDF05', '\uD83E\uDDF3'],
  Food: ['\uD83C\uDF55', '\uD83C\uDF74', '\uD83D\uDE0B', '\uD83C\uDF1F', '\uD83C\uDF75', '\uD83C\uDF70', '\uD83E\uDD57'],
  Fitness: ['\uD83D\uDCAA', '\uD83C\uDFCB\uFE0F', '\uD83C\uDFC3', '\uD83D\uDD25', '\uD83E\uDDD8', '\uD83C\uDFAF', '\u2B50'],
  Fashion: ['\uD83D\uDC57', '\uD83D\uDC60', '\uD83D\uDC9C', '\u2728', '\uD83D\uDE0D', '\uD83D\uDC8E', '\uD83C\uDF1F'],
  Nature: ['\uD83C\uDF3F', '\uD83C\uDF05', '\uD83C\uDF3B', '\uD83C\uDF3A', '\uD83E\uDD8B', '\uD83C\uDF08', '\uD83C\uDF0A'],
  Business: ['\uD83D\uDCA1', '\uD83D\uDE80', '\uD83D\uDCBC', '\uD83D\uDCCA', '\uD83C\uDFAF', '\uD83D\uDD25', '\uD83D\uDCAA'],
  Photography: ['\uD83D\uDCF7', '\uD83C\uDFA8', '\uD83C\uDF1F', '\u2728', '\uD83D\uDDBC\uFE0F', '\uD83C\uDF05', '\uD83D\uDC41\uFE0F'],
  Tech: ['\uD83D\uDCBB', '\uD83D\uDE80', '\u2699\uFE0F', '\uD83E\uDD16', '\uD83D\uDCA1', '\uD83D\uDD27', '\u26A1'],
}

const TEMPLATES: Record<string, string[]> = {
  Travel: [
    'Exploring new horizons {emoji} Every journey starts with a single step.',
    'Lost in the beauty of {topic} {emoji} Who else loves discovering new places?',
    'Wanderlust mode: ON {emoji} Tag someone you want to travel with!',
  ],
  Food: [
    'Happiness is homemade {emoji} Nothing beats a good meal!',
    'Food is not just eating. It is about the experience {emoji}',
    'Cooking up something special today {emoji} Who wants the recipe?',
  ],
  Fitness: [
    'No shortcuts. Just hard work and dedication {emoji}',
    'Your body can stand almost anything. Train your mind {emoji}',
    'Progress, not perfection {emoji} Every rep counts!',
  ],
  Fashion: [
    'Style is a way to say who you are without speaking {emoji}',
    'Outfit of the day {emoji} What do you think?',
    'Fashion fades, style is eternal {emoji}',
  ],
  Nature: [
    'In every walk with nature, one receives far more than they seek {emoji}',
    'Nature never goes out of style {emoji}',
    'The earth has music for those who listen {emoji}',
  ],
  Business: [
    'Success is not the key to happiness. Happiness is the key to success {emoji}',
    'Dream big. Start small. Act now {emoji}',
    'Every expert was once a beginner {emoji} Keep going!',
  ],
  Photography: [
    'Every picture tells a story {emoji} What story do you see?',
    'Capturing moments that matter {emoji}',
    'Life is like a camera. Focus on what matters {emoji}',
  ],
  Tech: [
    'Building the future, one line of code at a time {emoji}',
    'Technology is best when it brings people together {emoji}',
    'Innovation distinguishes between a leader and a follower {emoji}',
  ],
}

export default function InstagramCaptionGenerator() {
  const t = useTranslations('toolUI')
  const [category, setCategory] = useState('Travel')
  const [topic, setTopic] = useState('')
  const [hashtagCount, setHashtagCount] = useState(10)
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [caption, setCaption] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const templates = TEMPLATES[category]
    const emojis = EMOJIS[category]
    const hashtags = CATEGORIES[category]

    const template = templates[Math.floor(Math.random() * templates.length)]
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]

    let text = template
      .replace('{emoji}', includeEmojis ? emoji : '')
      .replace('{topic}', topic || category.toLowerCase())

    const selectedHashtags = [...hashtags]
      .sort(() => Math.random() - 0.5)
      .slice(0, hashtagCount)

    const result = `${text}\n\n${includeEmojis ? emojis.slice(0, 3).join(' ') + '\n\n' : ''}${selectedHashtags.join(' ')}`
    setCaption(result)
  }, [category, topic, hashtagCount, includeEmojis])

  const copy = async () => {
    await navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.keys(CATEGORIES).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm text-center transition-colors ${
                category === cat
                  ? 'bg-primary/10 ring-1 ring-primary'
                  : 'border hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Topic (optional)</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Bali, pasta, morning run..."
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Hashtag Count: {hashtagCount}</label>
          <input
            type="range"
            min={5}
            max={30}
            value={hashtagCount}
            onChange={(e) => setHashtagCount(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeEmojis}
              onChange={(e) => setIncludeEmojis(e.target.checked)}
              className="rounded"
            />
            Include emojis
          </label>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {t('generate')} Caption
      </button>

      {caption && (
        <div className="rounded-lg border">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
            <span className="text-xs text-muted-foreground">{caption.length} characters</span>
            <button onClick={copy} className="text-xs text-primary hover:underline">
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
          <div className="p-3 text-sm whitespace-pre-wrap">{caption}</div>
        </div>
      )}
    </div>
  )
}
