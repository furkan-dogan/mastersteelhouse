import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog-catalog'
import { PageHero } from '@/components/page-hero'
import { SitePageShell } from '@/components/site-page-shell'
import { BlogListClient } from './blog-list-client'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Blog',
  description: 'Çelik yapı teknolojileri, proje notları ve uygulama deneyimleri hakkında güncel blog içerikleri.',
  path: '/medya/blog',
})

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <SitePageShell>
      <main className="page-top-offset min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
        <PageHero
          title="Master Steel House"
          highlight="Blog"
          description="Çelik yapı teknolojileri, proje hikayeleri ve sektör trendleri hakkında güncel içerikler"
        />

        <BlogListClient posts={posts} />
      </main>
    </SitePageShell>
  )
}
