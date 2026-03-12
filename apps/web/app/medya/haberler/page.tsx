import type { Metadata } from 'next'
import { Calendar, ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getNewsPosts } from '@/lib/news-catalog'
import { mediaPlacementImageStyle } from '@/lib/media-placement'
import { PageHero } from '@/components/page-hero'
import { SitePageShell } from '@/components/site-page-shell'
import { buildPageMetadata } from '@/lib/seo'
import { ArticleListCard } from '@/components/article-list-card'

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
                  <Link key={item.slug} href={`/medya/haberler/${item.slug}`} className="block mb-12 group">
                    <div className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl bg-card border-2 border-accent/20 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500">
                      <div className="relative h-80 rounded-2xl overflow-hidden">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.title}
                          fill
                          className="object-cover"
                          style={mediaPlacementImageStyle(item.imagePlacementCard ?? item.imagePlacement, item.imagePosition)}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-lg">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-bold shadow-xl">
                            ÖNE ÇIKAN HABER
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{item.excerpt}</p>
                        <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                          Haberi Oku
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
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
