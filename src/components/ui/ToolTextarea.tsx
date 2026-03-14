'use client'

import { useId, type TextareaHTMLAttributes } from 'react'

export interface ToolTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string
  helpText?: string
  error?: string
  maxLength?: number
  showCount?: boolean
  value?: string
}

export default function ToolTextarea({
  label,
  helpText,
  error,
  maxLength,
  showCount,
  value = '',
  className = '',
  ...rest
}: ToolTextareaProps) {
  const id = useId()
  const helpId = `${id}-help`
  const errorId = `${id}-error`

  const describedBy = [
    helpText ? helpId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
        {maxLength && (
          <span className="text-muted-foreground"> (max {maxLength.toLocaleString()} chars)</span>
        )}
      </label>
      <textarea
        id={id}
        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[160px] focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? 'border-destructive' : ''
        } ${className}`}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        value={value}
        maxLength={maxLength}
        {...rest}
      />
      {showCount && maxLength && (
        <div className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength.toLocaleString()}
        </div>
      )}
      {helpText && (
        <p id={helpId} className="text-xs text-muted-foreground mt-1">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
