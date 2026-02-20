import Image from 'next/image'
import { mediaPlacementImageStyle, type MediaPlacement } from '@/lib/media-placement'

type ArticleSection = {
  id: string
  title: string
  content: string
  image?: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
}

type ArticleSectionsProps = {
  sections: ArticleSection[]
}

export function ArticleSections({ sections }: ArticleSectionsProps) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-32">
          <h2 className="text-3xl font-bold mb-5 border-b border-border pb-3">{section.title}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{section.content}</p>

          {section.image ? (
            <div className="relative mt-8 h-[340px] overflow-hidden rounded-2xl border">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
                style={mediaPlacementImageStyle(section.imagePlacement, section.imagePosition)}
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}
