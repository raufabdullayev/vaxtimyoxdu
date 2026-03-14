'use client'

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
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            value === opt.value
              ? 'bg-primary text-primary-foreground'
              : 'border hover:bg-accent'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
