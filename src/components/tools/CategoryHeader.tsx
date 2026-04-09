interface CategoryHeaderProps {
  name: string
  description: string
  seoDescription: string
  toolCount: number
  toolCountLabel: string
}

export default function CategoryHeader({
  name,
  description,
  seoDescription,
  toolCount,
  toolCountLabel,
}: CategoryHeaderProps) {
  return (
    <section className="mb-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
          {description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          {toolCount} {toolCountLabel}
        </span>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-3xl mx-auto text-muted-foreground">
        <p>{seoDescription}</p>
      </div>
    </section>
  )
}
