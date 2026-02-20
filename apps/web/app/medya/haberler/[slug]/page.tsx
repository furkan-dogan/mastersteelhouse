import { SitePageShell } from '@/components/site-page-shell'
import { Calendar, MapPin, ArrowLeft, Share2, Clock, User, List, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NewsGallery } from '@/components/news-gallery'
import { getNewsPostBySlug, getRelatedNewsPosts } from '@/lib/news-catalog'
import { mediaPlacementImageStyle } from '@/lib/media-placement'

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

  return (
    <SitePageShell>
      <main className="min-h-screen bg-background">
        <div className="relative h-[70vh] min-h-[500px]">
          <div className="absolute inset-0">
            <Image
              src={haber.image}
              alt={haber.title}
              fill
              className="object-cover"
              style={mediaPlacementImageStyle(haber.imagePlacementHero ?? haber.imagePlacement, haber.imagePosition)}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>

          <div className="relative h-full flex items-end">
            <div className="container mx-auto px-4 pb-16">
              <div className="max-w-4xl">
                <Link
                  href="/medya/haberler"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium mb-6 hover:gap-3 transition-all group"
                >
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  Haberlere Dön
                </Link>

                <h1
                  className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
                >
                  {haber.title}
                </h1>

                <div className="inline-flex flex-wrap gap-6 text-white px-6 py-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20">
                  <span className="flex items-center gap-2 font-medium">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <Calendar className="w-4 h-4" />
                    </div>
                    {haber.date}
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                    {haber.readTime}
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <MapPin className="w-4 h-4" />
                    </div>
                    {haber.location}
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <User className="w-4 h-4" />
                    </div>
                    {haber.author}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border-l-4 border-accent">
                <p className="text-xl leading-relaxed text-foreground font-medium">{haber.excerpt}</p>
              </div>

              {haber.sections.length > 0 && (
                <nav className="mb-12 rounded-2xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2 text-base font-semibold">
                    <List className="h-4 w-4 text-accent" />
                    İçerikler
                  </div>
                  <ol className="grid gap-2 sm:grid-cols-2">
                    {haber.sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {index + 1}. {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="space-y-12">
                {haber.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-32">
                    <h2 className="text-3xl font-bold mb-5 border-b border-border pb-3">{section.title}</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{section.content}</p>

                    {section.image && (
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
                    )}
                  </section>
                ))}
              </div>

              {haber.gallery && haber.gallery.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-bold mb-6">Fotoğraf Galerisi</h3>
                  <NewsGallery images={haber.gallery} />
                </div>
              )}

              <div className="mt-16 pt-8 border-t-2 border-border">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-br from-muted to-muted/50">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Bu haberi paylaş</h3>
                    <p className="text-muted-foreground">Sosyal medyada paylaşarak destek olun</p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Paylaş
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12">İlgili Haberler</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedNews.map((news) => (
                  <Link key={news.slug} href={`/medya/haberler/${news.slug}`} className="group">
                    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all hover:shadow-xl hover:shadow-accent/10">
                      <div className="relative h-48">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover"
                          style={mediaPlacementImageStyle(news.imagePlacementCard ?? news.imagePlacement, news.imagePosition)}
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {news.date}
                        </p>
                        <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{news.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
