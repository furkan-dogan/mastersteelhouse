import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { SitePageShell } from '@/components/site-page-shell'
import { ArticleHero } from '@/components/article-detail/article-hero'
import { ArticleExcerptCard } from '@/components/article-detail/article-excerpt-card'
import { ArticleToc } from '@/components/article-detail/article-toc'
import { ArticleSections } from '@/components/article-detail/article-sections'
import { ArticleSharePanel } from '@/components/article-detail/article-share-panel'
import { ArticleRelatedGrid } from '@/components/article-detail/article-related-grid'
import type { MediaPlacement } from '@/lib/media-placement'

type DetailSection = {
  id?: string
  title: string
  content: string
  image?: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
}

type RelatedItem = {
  slug: string
  title: string
  date: string
  image: string
  category?: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
}

type MetaItem = {
  icon: LucideIcon
  label: string
}

type ArticleDetailPageProps = {
  title: string
  image: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
  excerpt: string
  sections: DetailSection[]
  backHref: string
  backLabel: string
  meta: MetaItem[]
  relatedItems: RelatedItem[]
  relatedTitle: string
  relatedDescription?: string
  relatedHrefPrefix: string
  relatedCompact?: boolean
  shareTitle: string
  shareDescription: string
  gallery?: ReactNode
}

export function ArticleDetailPage({
  title,
  image,
  imagePosition,
  imagePlacement,
  excerpt,
  sections,
  backHref,
  backLabel,
  meta,
  relatedItems,
  relatedTitle,
  relatedDescription,
  relatedHrefPrefix,
  relatedCompact,
  shareTitle,
  shareDescription,
  gallery,
}: ArticleDetailPageProps) {
  const normalizedSections = sections.map((section, index) => ({
    ...section,
    id: section.id ?? `section-${index + 1}`,
  }))

  return (
    <SitePageShell>
      <main className="min-h-screen bg-background">
        <ArticleHero
          image={image}
          imagePlacement={imagePlacement}
          imagePosition={imagePosition}
          title={title}
          backHref={backHref}
          backLabel={backLabel}
          meta={meta}
        />

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <ArticleExcerptCard text={excerpt} />
              <ArticleToc items={normalizedSections.map((section) => ({ id: section.id, title: section.title }))} />
              <ArticleSections sections={normalizedSections} />
              {gallery}
              <ArticleSharePanel title={shareTitle} description={shareDescription} />
            </div>
          </div>
        </article>

        <ArticleRelatedGrid
          title={relatedTitle}
          description={relatedDescription}
          hrefPrefix={relatedHrefPrefix}
          items={relatedItems}
          compact={relatedCompact}
        />
      </main>
    </SitePageShell>
  )
}

type ArticleNotFoundPageProps = {
  message: string
}

export function ArticleNotFoundPage({ message }: ArticleNotFoundPageProps) {
  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <div className="container mx-auto px-4">
          <p className="text-lg text-muted-foreground">{message}</p>
        </div>
      </main>
    </SitePageShell>
  )
}
