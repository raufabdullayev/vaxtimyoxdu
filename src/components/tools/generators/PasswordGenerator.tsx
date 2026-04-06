'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { ToolAlert } from '@/components/ui'

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

type StrengthLevel = 'weak' | 'medium' | 'strong' | 'very strong'

function evaluateStrength(password: string, length: number, charsetSize: number): { level: StrengthLevel; percent: number } {
  if (!password) return { level: 'weak', percent: 0 }
  const entropy = length * Math.log2(charsetSize || 1)
  if (entropy < 36) return { level: 'weak', percent: 20 }
  if (entropy < 60) return { level: 'medium', percent: 45 }
  if (entropy < 80) return { level: 'strong', percent: 70 }
  return { level: 'very strong', percent: 100 }
}

const STRENGTH_COLORS: Record<StrengthLevel, string> = {
  'weak': 'bg-red-500',
  'medium': 'bg-yellow-500',
  'strong': 'bg-blue-500',
  'very strong': 'bg-green-500',
}

export default function PasswordGenerator() {
  const tc = useTranslations('toolUI.common')
  const t = useTranslations('toolUI.genTools')
  const [length, setLength] = useState(16)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useDigits, setUseDigits] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let charset = ''
    if (useUppercase) charset += CHARSETS.uppercase
    if (useLowercase) charset += CHARSETS.lowercase
    if (useDigits) charset += CHARSETS.digits
    if (useSymbols) charset += CHARSETS.symbols

    if (!charset) {
      setPassword('')
      return
    }

    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    const result = Array.from(array, (v) => charset[v % charset.length]).join('')
    setPassword(result)
  }, [length, useUppercase, useLowercase, useDigits, useSymbols])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const charsetSize =
    (useUppercase ? CHARSETS.uppercase.length : 0) +
    (useLowercase ? CHARSETS.lowercase.length : 0) +
    (useDigits ? CHARSETS.digits.length : 0) +
    (useSymbols ? CHARSETS.symbols.length : 0)

  const strength = evaluateStrength(password, length, charsetSize)

  const copy = useCallback(() => {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [password])

  const noCharsetSelected = !useUppercase && !useLowercase && !useDigits && !useSymbols

  return (
    <div className="space-y-6">
      {/* Password display */}
      <div className="relative rounded-lg border bg-muted/50 p-4">
        <p
          className="text-lg font-mono break-all pr-16 min-h-[1.75rem]"
          aria-label="Generated password"
        >
          {password || (noCharsetSelected ? t('selectAtLeastOne') : '')}
        </p>
        <button
          onClick={copy}
          disabled={!password}
          className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          aria-label="Copy password to clipboard"
        >
          {copied ? tc('copied') : tc('copy')}
        </button>
      </div>

      {/* Strength indicator */}
      {password && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t('strength')}</span>
            <span className="font-medium capitalize">{strength.level}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${STRENGTH_COLORS[strength.level]}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Length slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="pw-length" className="text-sm font-medium">
            {t('length')}
          </label>
          <span className="text-sm font-mono bg-muted/50 px-2 py-0.5 rounded">{length}</span>
        </div>
        <input
          id="pw-length"
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-primary"
          aria-label={`Password length: ${length}`}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      {/* Character sets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: t('uppercase'), checked: useUppercase, setter: setUseUppercase },
          { label: t('lowercase'), checked: useLowercase, setter: setUseLowercase },
          { label: t('digits'), checked: useDigits, setter: setUseDigits },
          { label: t('symbols'), checked: useSymbols, setter: setUseSymbols },
        ].map((opt) => (
          <label
            key={opt.label}
            className="flex items-center gap-2 text-sm cursor-pointer rounded-lg border p-3 hover:bg-accent transition-colors"
          >
            <input
              type="checkbox"
              checked={opt.checked}
              onChange={(e) => opt.setter(e.target.checked)}
              className="rounded accent-primary"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={generatePassword}
        disabled={noCharsetSelected}
        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        aria-label="Regenerate password"
      >
        {t('regenerate')}
      </button>
    </div>
  )
}
