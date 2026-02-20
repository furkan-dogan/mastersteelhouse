import { SitePageShell } from '@/components/site-page-shell'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { NewsGallery } from '@/components/news-gallery'
import { getNewsPostBySlug, getRelatedNewsPosts } from '@/lib/news-catalog'
import { ArticleHero } from '@/components/article-detail/article-hero'
import { ArticleExcerptCard } from '@/components/article-detail/article-excerpt-card'
import { ArticleToc } from '@/components/article-detail/article-toc'
import { ArticleSections } from '@/components/article-detail/article-sections'
import { ArticleSharePanel } from '@/components/article-detail/article-share-panel'
import { ArticleRelatedGrid } from '@/components/article-detail/article-related-grid'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function HaberDetay({ params }: Props) {
  const { slug } = await params
  const haber = await getNewsPostBySlug(slug)
  const relatedNews = await getRelatedNewsPosts(slug)

  if (!haber) {
    return (
      <SitePageShell>
        <main className="min-h-screen pt-32">
          <div className="container mx-auto px-4">
            <p className="text-lg text-muted-foreground">Haber bulunamadı.</p>
          </div>
        </main>
      </SitePageShell>
    )
  }

  const sections = haber.sections.map((section, index) => ({
    ...section,
    id: section.id ?? `section-${index + 1}`,
  }))

  return (
    <SitePageShell>
      <main className="min-h-screen bg-background">
        <ArticleHero
          image={haber.image}
          imagePlacement={haber.imagePlacementHero ?? haber.imagePlacement}
          imagePosition={haber.imagePosition}
          title={haber.title}
          backHref="/medya/haberler"
          backLabel="Haberlere Dön"
          meta={[
            { icon: Calendar, label: haber.date },
            { icon: Clock, label: haber.readTime },
            { icon: MapPin, label: haber.location },
            { icon: User, label: haber.author },
          ]}
        />

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ArticleExcerptCard text={haber.excerpt} />
              <ArticleToc items={sections.map((section) => ({ id: section.id, title: section.title }))} />
              <ArticleSections sections={sections} />

              {haber.gallery && haber.gallery.length > 0 ? (
                <div className="mt-16">
                  <h3 className="text-2xl font-bold mb-6">Fotoğraf Galerisi</h3>
                  <NewsGallery images={haber.gallery} />
                </div>
              ) : null}

              <ArticleSharePanel
                title="Bu haberi paylaş"
                description="Sosyal medyada paylaşarak destek olun"
              />
            </div>
          </div>
        </article>

        <ArticleRelatedGrid
          title="İlgili Haberler"
          hrefPrefix="/medya/haberler"
          items={relatedNews}
          compact
        />
      </main>
    </SitePageShell>
  )
}
