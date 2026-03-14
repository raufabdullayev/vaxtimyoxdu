'use client'

import { useCallback } from 'react'

export interface ToolRadioOption {
  value: string
  label: string
}

export interface ToolRadioGroupProps {
  label: string
  options: ToolRadioOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function ToolRadioGroup({
  label,
  options,
  value,
  onChange,
  className = '',
}: ToolRadioGroupProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextIndex = (index + 1) % options.length
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        nextIndex = (index - 1 + options.length) % options.length
      }
      if (nextIndex !== null) {
        onChange(options[nextIndex].value)
        const group = (e.currentTarget as HTMLElement).parentElement
        const buttons = group?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
        buttons?.[nextIndex]?.focus()
      }
    },
    [options, onChange],
  )

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {options.map((opt, index) => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'border hover:bg-accent'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
