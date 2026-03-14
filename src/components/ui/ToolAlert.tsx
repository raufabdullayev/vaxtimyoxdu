'use client'

import type { ReactNode } from 'react'

export interface ToolAlertProps {
  variant: 'error' | 'success'
  children: ReactNode
  className?: string
}

const variantStyles = {
  error: 'bg-destructive/10 text-destructive',
  success: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
}

export default function ToolAlert({
  variant,
  children,
  className = '',
}: ToolAlertProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={`p-3 rounded-lg text-sm ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
