type PageHeroProps = {
  title: string
  highlight?: string
  description: string
}

export function PageHero({ title, highlight, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent" />
      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:mb-6 sm:text-5xl md:text-6xl">
            {title}{' '}
            {highlight ? (
              <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                {highlight}
              </span>
            ) : null}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">{description}</p>
        </div>
      </div>
    </section>
  )
}
