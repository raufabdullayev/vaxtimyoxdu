'use client'

import { useId, type SelectHTMLAttributes } from 'react'

export interface ToolSelectOption {
  value: string
  label: string
}

export interface ToolSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string
  options: ToolSelectOption[]
  helpText?: string
}

export default function ToolSelect({
  label,
  options,
  helpText,
  className = '',
  ...rest
}: ToolSelectProps) {
  const id = useId()
  const helpId = `${id}-help`

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        id={id}
        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
        aria-describedby={helpText ? helpId : undefined}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p id={helpId} className="text-xs text-muted-foreground mt-1">
          {helpText}
        </p>
      )}
    </div>
  )
}
