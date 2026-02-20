import { getBlogPosts } from '@/lib/blog-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { BlogListClient } from './blog-list-client'

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <SitePageShell>
      <main className="min-h-screen pt-32 bg-gradient-to-b from-background via-muted/20 to-background">
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Master Steel House{' '}
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Çelik yapı teknolojileri, proje hikayeleri ve sektör trendleri hakkında güncel içerikler
              </p>
            </div>
          </div>
        </section>

        <BlogListClient posts={posts} />
      </main>
    </SitePageShell>
  )
}
