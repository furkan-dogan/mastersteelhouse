import type { Metadata } from 'next'
import { Calendar, MapPin } from 'lucide-react'
import { getNewsPosts } from '@/lib/news-catalog'
import { mediaPlacementImageStyle } from '@/lib/media-placement'
import { PageHero } from '@/components/page-hero'
import { SitePageShell } from '@/components/site-page-shell'
import { buildPageMetadata } from '@/lib/seo'
import { ArticleListCard } from '@/components/article-list-card'
import { ArticleFeaturedCard } from '@/components/article-featured-card'

export const metadata: Metadata = buildPageMetadata({
  title: 'Haberler ve Duyurular',
  description: "Master Steel House'dan son gelişmeler, proje haberleri ve kurumsal duyurular.",
  path: '/medya/haberler',
})

export default async function Haberler() {
  const news = await getNewsPosts()

  return (
    <SitePageShell>
      <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-32">
        <PageHero
          title="Haberler &"
          highlight="Duyurular"
          description="Master Steel House'dan son gelişmeler, başarı hikayeleri ve kurumsal haberler"
        />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {news
                .filter((item) => item.featured)
                .map((item) => (
                  <ArticleFeaturedCard
                    key={item.slug}
                    href={`/medya/haberler/${item.slug}`}
                    title={item.title}
                    excerpt={item.excerpt}
                    image={item.image || '/placeholder.svg'}
                    category={item.category}
                    badgeText="ÖNE ÇIKAN HABER"
                    imageStyle={mediaPlacementImageStyle(item.imagePlacementCard ?? item.imagePlacement, item.imagePosition)}
                    meta={[
                      { icon: Calendar, label: item.date },
                      { icon: MapPin, label: item.location },
                    ]}
                    ctaLabel="Haberi Oku"
                  />
                ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {news
                  .filter((item) => !item.featured)
                  .map((item) => (
                    <ArticleListCard
                      key={item.slug}
                      href={`/medya/haberler/${item.slug}`}
                      title={item.title}
                      excerpt={item.excerpt}
                      image={item.image || '/placeholder.svg'}
                      category={item.category}
                      imageStyle={mediaPlacementImageStyle(item.imagePlacementCard ?? item.imagePlacement, item.imagePosition)}
                      meta={[
                        { icon: Calendar, label: item.date },
                        { icon: MapPin, label: item.location },
                      ]}
                      ctaLabel="Detayları Gör"
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
