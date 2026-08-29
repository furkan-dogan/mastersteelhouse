import { getVideosContent } from '@/lib/videos-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { buildPageMetadata } from '@/lib/seo'
import { VideosGridClient } from './videos-grid-client'

export const metadata = buildPageMetadata({
  title: 'Videolar',
  description: 'Master Steel House üretim, montaj ve proje süreçlerinden video içerikler.',
  path: '/medya/videolar',
})

export default async function Videolar() {
  const content = await getVideosContent()

  return (
    <SitePageShell>
      <main className="page-top-offset min-h-screen">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
                <span className="text-accent">
                  {content.hero.title}
                </span>
              </h1>
              <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-muted-foreground">
                {content.hero.description}
              </p>

              <VideosGridClient items={content.items} />
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
