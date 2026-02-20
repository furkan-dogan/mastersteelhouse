import { getVideosContent } from '@/lib/videos-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { VideosGridClient } from './videos-grid-client'

export default async function Videolar() {
  const content = await getVideosContent()

  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
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
