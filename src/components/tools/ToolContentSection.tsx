'use client'

interface ToolContentSectionProps {
  howToUseTitle: string
  howToUseSteps: string[]
  whyUseTitle: string
  whyUseReasons: string[]
  tipsTitle: string
  tips: string[]
}

export default function ToolContentSection({
  howToUseTitle,
  howToUseSteps,
  whyUseTitle,
  whyUseReasons,
  tipsTitle,
  tips,
}: ToolContentSectionProps) {
  return (
    <div className="mt-10 space-y-8">
      {/* How to Use Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
            ?
          </span>
          {howToUseTitle}
        </h2>
        <div className="rounded-xl border bg-card p-5 md:p-6">
          <ol className="space-y-3">
            {howToUseSteps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <p className="text-muted-foreground leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Use This Tool Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 text-sm font-bold">
            +
          </span>
          {whyUseTitle}
        </h2>
        <div className="rounded-xl border bg-card p-5 md:p-6">
          <ul className="space-y-3">
            {whyUseReasons.map((reason, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 text-green-600 text-xs flex items-center justify-center mt-0.5">
                  &#10003;
                </span>
                <p className="text-muted-foreground leading-relaxed">{reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tips & Tricks Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 text-sm font-bold">
            !
          </span>
          {tipsTitle}
        </h2>
        <div className="rounded-xl border bg-gradient-to-r from-amber-500/5 to-orange-500/5 p-5 md:p-6">
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 text-amber-500 mt-1">&#9679;</span>
                <p className="text-muted-foreground leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
