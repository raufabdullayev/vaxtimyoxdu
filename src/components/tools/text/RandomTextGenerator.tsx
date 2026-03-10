'use client'

import { useState, useCallback } from 'react'

type GenerateType = 'words' | 'sentences' | 'paragraphs' | 'names' | 'emails' | 'phones' | 'addresses'

const wordPool = [
  'ability', 'able', 'about', 'above', 'accept', 'according', 'account', 'across', 'action',
  'activity', 'actually', 'address', 'administration', 'admit', 'adult', 'affect', 'after',
  'again', 'against', 'agency', 'agent', 'agree', 'agreement', 'ahead', 'allow', 'almost',
  'alone', 'along', 'already', 'also', 'always', 'among', 'amount', 'analysis', 'animal',
  'another', 'answer', 'anyone', 'anything', 'appear', 'apply', 'approach', 'area', 'argue',
  'around', 'arrive', 'article', 'artist', 'assume', 'attack', 'attention', 'available',
  'away', 'baby', 'back', 'ball', 'bank', 'base', 'beat', 'beautiful', 'because', 'become',
  'before', 'begin', 'behavior', 'behind', 'believe', 'benefit', 'best', 'better', 'beyond',
  'billion', 'black', 'blood', 'blue', 'board', 'body', 'book', 'born', 'both', 'break',
  'bring', 'brother', 'budget', 'build', 'building', 'business', 'call', 'camera', 'campaign',
  'cancer', 'capital', 'card', 'care', 'career', 'carry', 'case', 'catch', 'cause', 'cell',
  'center', 'central', 'century', 'certain', 'chair', 'challenge', 'chance', 'change',
  'character', 'charge', 'check', 'child', 'choice', 'choose', 'church', 'citizen', 'city',
  'civil', 'claim', 'class', 'clear', 'close', 'coach', 'cold', 'collection', 'college',
  'color', 'come', 'commercial', 'common', 'community', 'company', 'compare', 'computer',
  'concern', 'condition', 'conference', 'consider', 'consumer', 'contain', 'continue',
  'control', 'cost', 'could', 'country', 'couple', 'course', 'court', 'cover', 'create',
  'crime', 'culture', 'current', 'customer', 'dark', 'data', 'daughter', 'dead', 'deal',
  'death', 'debate', 'decide', 'decision', 'deep', 'defense', 'degree', 'democrat',
  'democratic', 'department', 'depend', 'describe', 'design', 'despite', 'detail', 'develop',
  'development', 'difference', 'different', 'difficult', 'dinner', 'direction', 'director',
  'discover', 'discuss', 'discussion', 'disease', 'doctor', 'door', 'down', 'draw', 'dream',
  'drive', 'drug', 'during', 'each', 'early', 'east', 'easy', 'economic', 'economy', 'edge',
  'education', 'effect', 'effort', 'eight', 'either', 'election', 'else', 'employee', 'energy',
  'enjoy', 'enough', 'enter', 'entire', 'environment', 'especially', 'establish', 'even',
  'evening', 'event', 'ever', 'every', 'everybody', 'everyone', 'everything', 'evidence',
  'exactly', 'example', 'executive', 'exist', 'expect', 'experience', 'expert', 'explain',
  'face', 'fact', 'factor', 'fail', 'fall', 'family', 'fast', 'father', 'fear', 'federal',
  'feel', 'field', 'fight', 'figure', 'fill', 'film', 'final', 'finally', 'financial', 'find',
  'finger', 'finish', 'fire', 'firm', 'first', 'fish', 'five', 'floor', 'focus', 'follow',
  'food', 'foot', 'force', 'foreign', 'forget', 'form', 'former', 'forward', 'four', 'free',
  'friend', 'front', 'full', 'fund', 'future', 'game', 'garden', 'general', 'generation',
  'girl', 'give', 'glass', 'goal', 'good', 'government', 'great', 'green', 'ground', 'group',
  'grow', 'growth', 'guess', 'gun', 'guy', 'hair', 'half', 'hand', 'hang', 'happen', 'happy',
  'hard', 'have', 'head', 'health', 'hear', 'heart', 'heat', 'heavy', 'help', 'here', 'high',
  'history', 'hold', 'home', 'hope', 'hospital', 'hotel', 'hour', 'house', 'huge', 'human',
  'hundred', 'husband', 'idea', 'identify', 'image', 'imagine', 'impact', 'important',
]

const firstNames = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Daniel', 'Lisa', 'Matthew', 'Nancy',
  'Anthony', 'Betty', 'Mark', 'Margaret', 'Donald', 'Sandra', 'Steven', 'Ashley',
  'Paul', 'Dorothy', 'Andrew', 'Kimberly', 'Joshua', 'Emily', 'Kenneth', 'Donna',
  'Alex', 'Sophie', 'Oliver', 'Emma', 'Noah', 'Ava', 'Liam', 'Mia', 'Lucas', 'Ella',
]

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
]

const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.com', 'example.com', 'company.org', 'test.net']

const streetNames = [
  'Main St', 'Oak Ave', 'Cedar Ln', 'Pine Dr', 'Elm St', 'Washington Ave', 'Park Rd',
  'Lake Blvd', 'River St', 'Hill Dr', 'Forest Ave', 'Maple Ct', 'Broadway', '5th Ave',
  'Market St', 'Church Rd', 'School Ln', 'Union Ave', 'Spring St', 'Sunset Blvd',
]

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio',
  'San Diego', 'Dallas', 'Austin', 'Jacksonville', 'San Jose', 'Fort Worth', 'Columbus',
  'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Portland',
]

const states = [
  'CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI',
  'NJ', 'VA', 'WA', 'AZ', 'MA', 'CO', 'MN', 'WI', 'MD', 'OR',
]

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateSentence(): string {
  const length = randomInt(6, 15)
  const words: string[] = []
  for (let i = 0; i < length; i++) {
    words.push(random(wordPool))
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generateParagraph(): string {
  const sentenceCount = randomInt(3, 7)
  const sentences: string[] = []
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence())
  }
  return sentences.join(' ')
}

function generateName(): string {
  return `${random(firstNames)} ${random(lastNames)}`
}

function generateEmail(): string {
  const first = random(firstNames).toLowerCase()
  const last = random(lastNames).toLowerCase()
  const separator = random(['.', '_', ''])
  const suffix = randomInt(0, 1) ? String(randomInt(1, 999)) : ''
  return `${first}${separator}${last}${suffix}@${random(domains)}`
}

function generatePhone(): string {
  const area = randomInt(200, 999)
  const mid = randomInt(100, 999)
  const last = randomInt(1000, 9999)
  return `(${area}) ${mid}-${last}`
}

function generateAddress(): string {
  const num = randomInt(1, 9999)
  const street = random(streetNames)
  const city = random(cities)
  const state = random(states)
  const zip = String(randomInt(10000, 99999))
  return `${num} ${street}, ${city}, ${state} ${zip}`
}

export default function RandomTextGenerator() {
  const [type, setType] = useState<GenerateType>('sentences')
  const [count, setCount] = useState(5)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const safeCount = Math.max(1, Math.min(100, count))
    const items: string[] = []

    for (let i = 0; i < safeCount; i++) {
      switch (type) {
        case 'words':
          items.push(random(wordPool))
          break
        case 'sentences':
          items.push(generateSentence())
          break
        case 'paragraphs':
          items.push(generateParagraph())
          break
        case 'names':
          items.push(generateName())
          break
        case 'emails':
          items.push(generateEmail())
          break
        case 'phones':
          items.push(generatePhone())
          break
        case 'addresses':
          items.push(generateAddress())
          break
      }
    }

    if (type === 'words') {
      setOutput(items.join(' '))
    } else if (type === 'paragraphs') {
      setOutput(items.join('\n\n'))
    } else {
      setOutput(items.join('\n'))
    }
  }, [type, count])

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const typeOptions: { value: GenerateType; label: string }[] = [
    { value: 'words', label: 'Words' },
    { value: 'sentences', label: 'Sentences' },
    { value: 'paragraphs', label: 'Paragraphs' },
    { value: 'names', label: 'Names' },
    { value: 'emails', label: 'Emails' },
    { value: 'phones', label: 'Phone Numbers' },
    { value: 'addresses', label: 'Addresses' },
  ]

  return (
    <div className="space-y-4">
      {/* Type selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Type</label>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setType(opt.value)
                setOutput('')
              }}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                type === opt.value
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              }`}
              aria-pressed={type === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="max-w-xs">
        <label className="block text-sm font-medium mb-1">
          Count (1-100)
        </label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Number of items to generate"
        />
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Generate
      </button>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Generated Output</label>
            <button
              onClick={copy}
              className="text-xs text-primary hover:underline"
              aria-label="Copy generated text"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm min-h-[250px] focus:outline-none"
            value={output}
            readOnly
            aria-label="Generated output"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {output.split(/\s+/).filter(Boolean).length} words,{' '}
            {output.length} characters
          </p>
        </div>
      )}

      <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">About Random Text Generator</p>
        <p>
          Generate random words, sentences, paragraphs, names, email addresses, phone numbers,
          and street addresses for testing, mockups, and development purposes. All data is
          randomly generated client-side and is not real personal information.
        </p>
      </div>
    </div>
  )
}
