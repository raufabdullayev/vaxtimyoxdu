'use client'

import { useId, useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface ToolFaqSectionProps {
  title: string
  faqs: FaqItem[]
}

export default function ToolFaqSection({ title, faqs }: ToolFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  if (faqs.length === 0) return null

  return (
    <section className="mt-10" aria-label={title}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          const buttonId = `${baseId}-faq-btn-${index}`
          const panelId = `${baseId}-faq-panel-${index}`

          return (
            <div
              key={index}
              className="rounded-xl border bg-card overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                id={buttonId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-medium text-sm md:text-base leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                >
                  &#9660;
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
