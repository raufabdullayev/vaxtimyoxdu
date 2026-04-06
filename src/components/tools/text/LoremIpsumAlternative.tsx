'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

type TextStyle = 'hipster' | 'office' | 'pirate' | 'space' | 'foodie' | 'tech'

const WORD_BANKS: Record<TextStyle, string[]> = {
  hipster: [
    'artisan', 'kombucha', 'vinyl', 'sustainable', 'avocado', 'toast', 'craft', 'organic',
    'aesthetic', 'minimalist', 'curated', 'handcrafted', 'vintage', 'ethical', 'conscious',
    'pour-over', 'cold-brew', 'sourdough', 'fermented', 'foraged', 'upcycled', 'bespoke',
    'locally-sourced', 'farm-to-table', 'plant-based', 'micro-batch', 'small-lot', 'single-origin',
    'gluten-free', 'meditation', 'mindful', 'intentional', 'biodegradable', 'kombucha-infused',
    'oat-milk', 'matcha', 'turmeric', 'adaptogenic', 'probiotic', 'raw', 'unprocessed',
  ],
  office: [
    'synergy', 'leverage', 'pivot', 'scalable', 'bandwidth', 'stakeholder', 'deliverable',
    'actionable', 'granular', 'ecosystem', 'paradigm', 'roadmap', 'milestone', 'vertical',
    'horizontal', 'holistic', 'proactive', 'streamline', 'optimize', 'incentivize', 'onboard',
    'deep-dive', 'low-hanging-fruit', 'move-the-needle', 'circle-back', 'touch-base',
    'bottom-line', 'KPI', 'ROI', 'value-add', 'best-practice', 'core-competency',
    'mission-critical', 'bleeding-edge', 'game-changer', 'disruptor', 'thought-leader',
  ],
  pirate: [
    'ahoy', 'matey', 'plunder', 'treasure', 'doubloons', 'scallywag', 'buccaneer', 'galleon',
    'cutlass', 'parrot', 'rum', 'grog', 'jolly-roger', 'barnacle', 'swashbuckle', 'crow-nest',
    'port', 'starboard', 'deck', 'cannon', 'anchor', 'compass', 'horizon', 'storm', 'voyage',
    'captain', 'crew', 'booty', 'island', 'ship', 'sail', 'mast', 'plank', 'skull', 'bones',
    'sea', 'ocean', 'wave', 'wind', 'tide', 'reef', 'cove', 'lagoon', 'shore', 'beach',
  ],
  space: [
    'nebula', 'quantum', 'asteroid', 'constellation', 'galactic', 'wormhole', 'supernova',
    'antimatter', 'photon', 'pulsar', 'quasar', 'cosmic', 'interstellar', 'astronaut',
    'spacecraft', 'orbit', 'gravity', 'telescope', 'satellite', 'comet', 'meteor', 'starship',
    'warp-drive', 'light-year', 'dark-matter', 'black-hole', 'singularity', 'terraform',
    'exoplanet', 'solar-wind', 'fusion', 'radiation', 'spectrum', 'frequency', 'wavelength',
  ],
  foodie: [
    'umami', 'artisanal', 'reduction', 'gastronomy', 'sommelier', 'terroir', 'braise',
    'sautee', 'julienne', 'deglaze', 'emulsify', 'caramelize', 'infuse', 'marinate',
    'sous-vide', 'flambee', 'blanch', 'ferment', 'cure', 'smoke', 'truffle', 'saffron',
    'vanilla', 'cardamom', 'cinnamon', 'rosemary', 'thyme', 'basil', 'oregano', 'aioli',
    'ganache', 'compote', 'coulis', 'bisque', 'veloute', 'bechamel', 'roux', 'consomme',
  ],
  tech: [
    'blockchain', 'algorithm', 'microservice', 'kubernetes', 'containerize', 'deploy',
    'serverless', 'agile', 'sprint', 'refactor', 'debug', 'compile', 'runtime', 'middleware',
    'API', 'endpoint', 'webhook', 'pipeline', 'repository', 'commit', 'merge', 'fork',
    'cache', 'latency', 'throughput', 'scalability', 'redundancy', 'failover', 'cluster',
    'shard', 'index', 'query', 'mutation', 'subscription', 'resolver', 'schema', 'migration',
  ],
}

function generateSentence(words: string[]): string {
  const len = 5 + Math.floor(Math.random() * 12)
  const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)])
  sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1)
  return sentence.join(' ') + '.'
}

function generateParagraph(words: string[]): string {
  const sentenceCount = 3 + Math.floor(Math.random() * 5)
  return Array.from({ length: sentenceCount }, () => generateSentence(words)).join(' ')
}

export default function LoremIpsumAlternative() {
  const t = useTranslations('toolUI.common')
  const [style, setStyle] = useState<TextStyle>('hipster')
  const [count, setCount] = useState(3)
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const words = WORD_BANKS[style]
    let result = ''
    if (unit === 'paragraphs') {
      result = Array.from({ length: count }, () => generateParagraph(words)).join('\n\n')
    } else if (unit === 'sentences') {
      result = Array.from({ length: count }, () => generateSentence(words)).join(' ')
    } else {
      const generated: string[] = []
      while (generated.length < count) {
        generated.push(words[Math.floor(Math.random() * words.length)])
      }
      result = generated.join(' ')
    }
    setOutput(result)
  }, [style, count, unit])

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const styles: { key: TextStyle; label: string; icon: string }[] = [
    { key: 'hipster', label: 'Hipster', icon: '\u2615' },
    { key: 'office', label: 'Corporate', icon: '\uD83D\uDCBC' },
    { key: 'pirate', label: 'Pirate', icon: '\uD83C\uDFF4\u200D\u2620\uFE0F' },
    { key: 'space', label: 'Space', icon: '\uD83D\uDE80' },
    { key: 'foodie', label: 'Foodie', icon: '\uD83C\uDF73' },
    { key: 'tech', label: 'Tech', icon: '\uD83D\uDCBB' },
  ]

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Text Style</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {styles.map((s) => (
            <button
              key={s.key}
              onClick={() => setStyle(s.key)}
              className={`px-3 py-2 rounded-lg text-sm text-center transition-colors ${
                style === s.key
                  ? 'bg-primary/10 ring-1 ring-primary'
                  : 'border hover:bg-accent'
              }`}
            >
              <div className="text-lg">{s.icon}</div>
              <div className="text-xs">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Count</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'paragraphs' | 'sentences' | 'words')}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {t('generate')}
      </button>

      {output && (
        <div className="rounded-lg border">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
            <span className="text-xs text-muted-foreground">{output.split(/\s+/).length} words</span>
            <button onClick={copy} className="text-xs text-primary hover:underline">
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
          <div className="p-3 text-sm whitespace-pre-wrap max-h-96 overflow-auto">{output}</div>
        </div>
      )}
    </div>
  )
}
