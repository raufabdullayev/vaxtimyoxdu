'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ToolTextarea, ToolRadioGroup, ToolAlert } from '@/components/ui'

export default function Base64Codec() {
  const t = useTranslations('toolUI')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  const process = () => {
    if (!input.trim()) {
      setError(t('pleaseEnterText'))
      setOutput('')
      return
    }
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
    } catch {
      setError(mode === 'encode' ? t('failedToEncode') : t('invalidBase64'))
      setOutput('')
    }
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setError('')
  }

  const copy = () => {
    if (output) navigator.clipboard.writeText(output)
  }

  return (
    <div className="space-y-4">
      <ToolRadioGroup
        label={t('encode') + ' / ' + t('decode')}
        options={[
          { value: 'encode', label: t('encode') },
          { value: 'decode', label: t('decode') },
        ]}
        value={mode}
        onChange={(val) => { setMode(val as 'encode' | 'decode'); setError('') }}
      />

      <ToolTextarea
        label={mode === 'encode' ? t('textToEncode') : t('base64ToDecode')}
        className="font-mono min-h-[150px]"
        placeholder={mode === 'encode' ? t('enterText') : t('enterBase64')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {error && (
        <ToolAlert variant="error">{error}</ToolAlert>
      )}

      <div className="flex gap-3">
        <button
          onClick={process}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          {mode === 'encode' ? t('encode') : t('decode')}
        </button>
        {output && (
          <button
            onClick={swap}
            className="px-4 py-2.5 border rounded-lg font-medium hover:bg-accent transition-colors"
          >
            {t('swap')}
          </button>
        )}
      </div>

      {output && (
        <ToolTextarea
          label={t('result')}
          className="font-mono min-h-[150px] bg-muted/50"
          value={output}
          readOnly
        />
      )}
    </div>
  )
}
