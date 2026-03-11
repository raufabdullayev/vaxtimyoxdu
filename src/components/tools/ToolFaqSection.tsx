'use client'

import { useState } from 'react'

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

  if (faqs.length === 0) return null

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border bg-card overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-sm md:text-base leading-snug">
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                &#9660;
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
