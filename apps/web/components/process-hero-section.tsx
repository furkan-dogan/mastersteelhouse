import Image from 'next/image'

type ProcessHeroSectionProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  sectionClassName?: string
}

export function ProcessHeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  sectionClassName = 'bg-background',
}: ProcessHeroSectionProps) {
  return (
    <section className={`py-20 ${sectionClassName}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">{title}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12">{description}</p>
          <div className="relative h-96 rounded-3xl overflow-hidden">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
