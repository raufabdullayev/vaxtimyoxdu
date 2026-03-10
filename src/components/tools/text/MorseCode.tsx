'use client'

import { useState, useCallback, useRef } from 'react'

const charToMorse: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '$': '...-..-', '@': '.--.-.', ' ': '/',
}

const morseToChar: Record<string, string> = {}
for (const [char, morse] of Object.entries(charToMorse)) {
  if (char !== ' ') {
    morseToChar[morse] = char
  }
}

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map((ch) => {
      if (ch === ' ') return '/'
      return charToMorse[ch] || ''
    })
    .filter(Boolean)
    .join(' ')
}

function morseToText(morse: string): string {
  return morse
    .trim()
    .split(/\s+/)
    .map((code) => {
      if (code === '/' || code === '|') return ' '
      return morseToChar[code] || '?'
    })
    .join('')
}

const DOT_DURATION = 80 // ms
const DASH_DURATION = DOT_DURATION * 3
const SYMBOL_GAP = DOT_DURATION
const LETTER_GAP = DOT_DURATION * 3
const WORD_GAP = DOT_DURATION * 7
const FREQUENCY = 600 // Hz

export default function MorseCode() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [direction, setDirection] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const abortRef = useRef(false)

  const convert = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter text to convert')
      setOutput('')
      return
    }
    setError('')

    if (direction === 'text-to-morse') {
      const result = textToMorse(input)
      if (!result) {
        setError('No convertible characters found')
        setOutput('')
        return
      }
      setOutput(result)
    } else {
      try {
        const result = morseToText(input)
        setOutput(result)
      } catch {
        setError('Invalid Morse code format')
        setOutput('')
      }
    }
  }, [input, direction])

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setError('')
    setDirection((d) =>
      d === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse'
    )
  }

  const playMorse = async () => {
    const morseCode = direction === 'text-to-morse' ? output : textToMorse(output)
    if (!morseCode) return

    abortRef.current = false
    setIsPlaying(true)

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
      const ctx = audioContextRef.current

      const playTone = (duration: number): Promise<void> => {
        return new Promise((resolve) => {
          if (abortRef.current) {
            resolve()
            return
          }
          const oscillator = ctx.createOscillator()
          const gain = ctx.createGain()
          oscillator.connect(gain)
          gain.connect(ctx.destination)
          oscillator.frequency.value = FREQUENCY
          oscillator.type = 'sine'
          gain.gain.value = 0.3
          oscillator.start()
          oscillator.stop(ctx.currentTime + duration / 1000)
          setTimeout(resolve, duration)
        })
      }

      const wait = (duration: number): Promise<void> => {
        return new Promise((resolve) => {
          if (abortRef.current) {
            resolve()
            return
          }
          setTimeout(resolve, duration)
        })
      }

      const symbols = morseCode.split('')

      for (let i = 0; i < symbols.length; i++) {
        if (abortRef.current) break

        const sym = symbols[i]
        if (sym === '.') {
          await playTone(DOT_DURATION)
          await wait(SYMBOL_GAP)
        } else if (sym === '-') {
          await playTone(DASH_DURATION)
          await wait(SYMBOL_GAP)
        } else if (sym === ' ') {
          // Check if it's a word separator
          if (symbols[i + 1] === '/' || symbols[i - 1] === '/') {
            // Part of word gap - handled by '/'
          } else {
            await wait(LETTER_GAP)
          }
        } else if (sym === '/') {
          await wait(WORD_GAP)
        }
      }
    } catch {
      // Audio API not available
    } finally {
      setIsPlaying(false)
    }
  }

  const stopAudio = () => {
    abortRef.current = true
    setIsPlaying(false)
  }

  const clear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-4">
      {/* Direction toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setDirection('text-to-morse')
            setInput('')
            setOutput('')
            setError('')
          }}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
            direction === 'text-to-morse'
              ? 'bg-primary text-primary-foreground'
              : 'border hover:bg-accent'
          }`}
          aria-pressed={direction === 'text-to-morse'}
        >
          Text to Morse
        </button>
        <button
          onClick={() => {
            setDirection('morse-to-text')
            setInput('')
            setOutput('')
            setError('')
          }}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
            direction === 'morse-to-text'
              ? 'bg-primary text-primary-foreground'
              : 'border hover:bg-accent'
          }`}
          aria-pressed={direction === 'morse-to-text'}
        >
          Morse to Text
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {direction === 'text-to-morse' ? 'Text Input' : 'Morse Code Input'}
          </label>
          <textarea
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono min-h-[180px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={
              direction === 'text-to-morse'
                ? 'Enter text to convert to Morse code...'
                : 'Enter Morse code (use . and - separated by spaces, / for word gaps)...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label={direction === 'text-to-morse' ? 'Text input' : 'Morse code input'}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">
              {direction === 'text-to-morse' ? 'Morse Code Output' : 'Text Output'}
            </label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-primary hover:underline"
                aria-label="Copy output"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            className="w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm font-mono min-h-[180px] focus:outline-none"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            aria-label="Conversion output"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={convert}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          Convert
        </button>
        {output && (
          <>
            <button
              onClick={swap}
              className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Swap
            </button>
            {!isPlaying ? (
              <button
                onClick={playMorse}
                className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
                aria-label="Play Morse code audio"
              >
                Play Audio
              </button>
            ) : (
              <button
                onClick={stopAudio}
                className="px-4 py-2.5 border border-destructive text-destructive rounded-lg font-medium hover:bg-destructive/10 transition-colors"
                aria-label="Stop audio"
              >
                Stop
              </button>
            )}
          </>
        )}
        <button
          onClick={clear}
          className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Reference chart */}
      <div className="p-4 rounded-lg bg-muted/50">
        <p className="text-sm font-medium text-foreground mb-3">Morse Code Reference</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs font-mono">
          {Object.entries(charToMorse)
            .filter(([ch]) => ch !== ' ')
            .map(([char, morse]) => (
              <div key={char} className="flex justify-between border rounded px-2 py-1">
                <span className="font-bold">{char}</span>
                <span className="text-muted-foreground">{morse}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
