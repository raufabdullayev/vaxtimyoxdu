'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
]

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function generateSentence(minWords = 6, maxWords = 15): string {
  const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
  const words = Array.from({ length: count }, randomWord)
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generateParagraph(sentences = 4): string {
  return Array.from({ length: sentences }, () => generateSentence()).join(' ')
}

function generate(type: string, count: number, startWithLorem: boolean): string {
  let result = ''
  if (type === 'paragraphs') {
    result = Array.from({ length: count }, () => generateParagraph()).join('\n\n')
  } else if (type === 'sentences') {
    result = Array.from({ length: count }, () => generateSentence()).join(' ')
  } else {
    result = Array.from({ length: count }, randomWord).join(' ')
  }
  if (startWithLorem) {
    result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + result
  }
  return result
}

export default function LoremIpsum() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.genTools')
  const [type, setType] = useState('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')

  const handleGenerate = () => {
    setOutput(generate(type, count, startWithLorem))
  }

  const copy = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="paragraphs">{tc('paragraphs')}</option>
            <option value="sentences">{tc('sentences')}</option>
            <option value="words">{tc('words')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('count')}</label>
          <input
            type="number"
            min={1}
            max={500}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(500, Number(e.target.value))))}
            className="w-24 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            className="rounded"
          />
          Start with &quot;Lorem ipsum...&quot;
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {tc('generate')}
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">{tc('result')}</label>
            <button onClick={copy} className="text-xs text-primary hover:underline">{tc('copy')}</button>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
