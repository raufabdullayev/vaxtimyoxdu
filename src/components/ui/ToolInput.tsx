'use client'

import { useId, type InputHTMLAttributes } from 'react'

export interface ToolInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  helpText?: string
  error?: string
}

export default function ToolInput({
  label,
  helpText,
  error,
  className = '',
  ...rest
}: ToolInputProps) {
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
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? 'border-destructive' : ''
        } ${className}`}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
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
