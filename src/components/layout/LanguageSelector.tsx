'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { Globe } from 'lucide-react'

export default function LanguageSelector() {
  const locale = useLocale() as Locale
  const t = useTranslations('common')
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Close dropdown when clicking outside.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus the first option when opening, return focus to trigger when closing.
  useEffect(() => {
    if (open) {
      const currentIndex = locales.indexOf(locale)
      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0)
    }
  }, [open, locale])

  useEffect(() => {
    if (open && focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.focus()
    }
  }, [open, focusedIndex])

  const closeAndReturnFocus = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  // Keyboard navigation within the dropdown (focus trap + arrow keys).
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        closeAndReturnFocus()
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => (prev + 1) % locales.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => (prev - 1 + locales.length) % locales.length)
        break
      case 'Tab': {
        e.preventDefault()
        if (e.shiftKey) {
          setFocusedIndex((prev) => (prev - 1 + locales.length) % locales.length)
        } else {
          setFocusedIndex((prev) => (prev + 1) % locales.length)
        }
        break
      }
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(locales.length - 1)
        break
    }
  }, [closeAndReturnFocus])

  function switchLocale(nextLocale: Locale) {
    router.replace(pathname, { locale: nextLocale })
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault()
            setOpen(true)
          }
        }}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
        aria-label={t('selectLanguage')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{localeFlags[locale]} {localeNames[locale]}</span>
        <span className="sm:hidden">{localeNames[locale]}</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('selectLanguage')}
          aria-activedescendant={`lang-option-${locales[focusedIndex]}`}
          className="absolute right-0 top-full mt-1 w-40 rounded-lg border bg-background shadow-lg z-50 py-1"
          onKeyDown={handleDropdownKeyDown}
        >
          {locales.map((l, i) => (
            <button
              key={l}
              id={`lang-option-${l}`}
              ref={(el) => { optionRefs.current[i] = el }}
              role="option"
              aria-selected={l === locale}
              onClick={() => switchLocale(l)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent ${
                l === locale ? 'bg-accent/50 font-semibold text-primary' : ''
              }`}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
              {l === locale && (
                <span className="ml-auto text-xs text-primary" aria-hidden="true">
                  &#10003;
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
