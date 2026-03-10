'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface VoiceOption {
  voice: SpeechSynthesisVoice
  label: string
}

export default function TextToSpeech() {
  const [text, setText] = useState('')
  const [voices, setVoices] = useState<VoiceOption[]>([])
  const [selectedVoiceUri, setSelectedVoiceUri] = useState('')
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [error, setError] = useState('')
  const [supported, setSupported] = useState(true)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    const available = window.speechSynthesis.getVoices()
    if (available.length === 0) return

    const voiceOptions: VoiceOption[] = available.map((voice) => ({
      voice,
      label: `${voice.name} (${voice.lang})${voice.default ? ' - Default' : ''}`,
    }))

    // Sort: default first, then by language, then by name
    voiceOptions.sort((a, b) => {
      if (a.voice.default && !b.voice.default) return -1
      if (!a.voice.default && b.voice.default) return 1
      if (a.voice.lang < b.voice.lang) return -1
      if (a.voice.lang > b.voice.lang) return 1
      return a.voice.name.localeCompare(b.voice.name)
    })

    setVoices(voiceOptions)

    if (!selectedVoiceUri && voiceOptions.length > 0) {
      const defaultVoice = voiceOptions.find((v) => v.voice.default)
      setSelectedVoiceUri(defaultVoice?.voice.voiceURI || voiceOptions[0].voice.voiceURI)
    }
  }, [selectedVoiceUri])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false)
      return
    }

    loadVoices()

    // Chrome fires voiceschanged asynchronously
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      window.speechSynthesis.cancel()
    }
  }, [loadVoices])

  const speak = () => {
    if (!text.trim()) {
      setError('Please enter some text to read aloud')
      return
    }

    if (!window.speechSynthesis) {
      setError('Speech synthesis is not supported in this browser')
      return
    }

    setError('')
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utteranceRef.current = utterance

    const selectedVoice = voices.find((v) => v.voice.voiceURI === selectedVoiceUri)
    if (selectedVoice) {
      utterance.voice = selectedVoice.voice
    }

    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume

    utterance.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    utterance.onerror = (event) => {
      if (event.error !== 'canceled') {
        setError(`Speech error: ${event.error}`)
      }
      setIsSpeaking(false)
      setIsPaused(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
  }

  const resume = () => {
    window.speechSynthesis.resume()
    setIsPaused(false)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  const estimatedDuration = () => {
    if (!text.trim()) return '0s'
    const words = text.trim().split(/\s+/).length
    const wpm = 150 * rate // average WPM adjusted by rate
    const seconds = Math.round((words / wpm) * 60)
    if (seconds < 60) return `~${seconds}s`
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `~${mins}m ${secs}s`
  }

  const loadSample = () => {
    setText(
      'Welcome to the Text to Speech tool. This tool uses the Web Speech API to convert your text into spoken words. You can adjust the voice, speed, pitch, and volume to customize the output. Try typing your own text and pressing the Speak button to hear it read aloud.'
    )
  }

  if (!supported) {
    return (
      <div className="p-6 rounded-lg bg-destructive/10 text-destructive text-center">
        <p className="font-medium">Speech Synthesis Not Supported</p>
        <p className="text-sm mt-2">
          Your browser does not support the Web Speech API. Please try a modern browser like Chrome, Edge, or Safari.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">
            {text.trim() ? text.trim().split(/\s+/).length : 0}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Words</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{text.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Characters</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{estimatedDuration()}</div>
          <div className="text-xs text-muted-foreground mt-1">Est. Duration</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <div className="text-2xl font-bold text-primary">{voices.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Voices</div>
        </div>
      </div>

      {/* Text input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Text to Read</label>
          <button
            onClick={loadSample}
            className="text-xs text-primary hover:underline"
          >
            Load Sample
          </button>
        </div>
        <textarea
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter the text you want to hear spoken aloud..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text to speak"
        />
      </div>

      {/* Voice selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Voice</label>
        <select
          value={selectedVoiceUri}
          onChange={(e) => setSelectedVoiceUri(e.target.value)}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Select voice"
        >
          {voices.map((v) => (
            <option key={v.voice.voiceURI} value={v.voice.voiceURI}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Speed: {rate.toFixed(1)}x
          </label>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="Speech rate"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5x</span>
            <span>2x</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Pitch: {pitch.toFixed(1)}
          </label>
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="Speech pitch"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Volume: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="Speech volume"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Mute</span>
            <span>Max</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {!isSpeaking ? (
          <button
            onClick={speak}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Speak
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={resume}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Pause
              </button>
            )}
            <button
              onClick={stop}
              className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors text-destructive"
            >
              Stop
            </button>
          </>
        )}
        {text.trim() && !isSpeaking && (
          <button
            onClick={() => setText('')}
            className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {isSpeaking && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          {isPaused ? 'Paused' : 'Speaking...'}
        </div>
      )}
    </div>
  )
}
