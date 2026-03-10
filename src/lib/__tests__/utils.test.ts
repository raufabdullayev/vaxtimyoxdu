import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn() - class name utility', () => {
  it('should return an empty string when called with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('should pass through a single class name', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('should merge multiple class names', () => {
    const result = cn('px-4', 'py-2')
    expect(result).toContain('px-4')
    expect(result).toContain('py-2')
  })

  it('should handle conditional classes via clsx syntax', () => {
    const isActive = true
    const isDisabled = false
    const result = cn('base', isActive && 'active', isDisabled && 'disabled')
    expect(result).toContain('base')
    expect(result).toContain('active')
    expect(result).not.toContain('disabled')
  })

  it('should resolve Tailwind conflicts by keeping the last conflicting class', () => {
    // tailwind-merge should keep the last conflicting utility
    const result = cn('px-4', 'px-8')
    expect(result).toBe('px-8')
  })

  it('should resolve color conflicts', () => {
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500')
  })

  it('should handle array inputs', () => {
    const result = cn(['px-4', 'py-2'])
    expect(result).toContain('px-4')
    expect(result).toContain('py-2')
  })

  it('should handle object inputs for conditional classes', () => {
    const result = cn({
      'bg-red-500': true,
      'bg-blue-500': false,
      'text-white': true,
    })
    expect(result).toContain('bg-red-500')
    expect(result).not.toContain('bg-blue-500')
    expect(result).toContain('text-white')
  })

  it('should filter out falsy values (null, undefined, false, 0, empty string)', () => {
    const result = cn('base', null, undefined, false, 0, '', 'end')
    expect(result).toContain('base')
    expect(result).toContain('end')
  })

  it('should merge complex Tailwind classes correctly', () => {
    const result = cn(
      'rounded-md bg-white px-4 py-2 text-sm font-medium',
      'bg-gray-100 px-6'
    )
    // bg-gray-100 should override bg-white, px-6 should override px-4
    expect(result).toContain('bg-gray-100')
    expect(result).not.toContain('bg-white')
    expect(result).toContain('px-6')
    expect(result).not.toContain('px-4')
    // Non-conflicting classes should remain
    expect(result).toContain('rounded-md')
    expect(result).toContain('py-2')
    expect(result).toContain('text-sm')
    expect(result).toContain('font-medium')
  })

  it('should handle mixed argument types', () => {
    const result = cn(
      'base',
      ['array-class'],
      { 'obj-class': true },
      undefined,
      'final'
    )
    expect(result).toContain('base')
    expect(result).toContain('array-class')
    expect(result).toContain('obj-class')
    expect(result).toContain('final')
  })

  it('should handle responsive variants without conflict', () => {
    const result = cn('text-sm', 'md:text-lg', 'lg:text-xl')
    expect(result).toContain('text-sm')
    expect(result).toContain('md:text-lg')
    expect(result).toContain('lg:text-xl')
  })

  it('should handle hover and focus state variants', () => {
    const result = cn('bg-white', 'hover:bg-gray-100', 'focus:ring-2')
    expect(result).toContain('bg-white')
    expect(result).toContain('hover:bg-gray-100')
    expect(result).toContain('focus:ring-2')
  })
})
