import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar, ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getNewsPosts } from '@/lib/news-catalog'
import { mediaPlacementImageStyle } from '@/lib/media-placement'

export default async function Haberler() {
  const news = await getNewsPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 bg-gradient-to-b from-background via-muted/20 to-background">
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Haberler &{' '}
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Duyurular
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Master Steel House'dan son gelişmeler, başarı hikayeleri ve kurumsal haberler
              </p>
            </div>
          </div>
        </section>

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
                    <Link key={item.slug} href={`/medya/haberler/${item.slug}`} className="group">
                      <article className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.title}
                            fill
                            className="object-cover"
                            style={mediaPlacementImageStyle(item.imagePlacementCard ?? item.imagePlacement, item.imagePosition)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-lg">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {item.location}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.excerpt}</p>

                          <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                            Detayları Gör
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
