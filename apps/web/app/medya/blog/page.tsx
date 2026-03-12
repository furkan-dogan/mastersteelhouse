import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/blog-catalog'
import { PageHero } from '@/components/page-hero'
import { SitePageShell } from '@/components/site-page-shell'
import { BlogListClient } from './blog-list-client'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Çelik yapı teknolojileri, proje notları ve uygulama deneyimleri hakkında güncel blog içerikleri.',
  alternates: {
    canonical: '/medya/blog',
  },
  openGraph: {
    title: 'Master Steel House Blog',
    description: 'Çelik yapı teknolojileri, proje notları ve uygulama deneyimleri hakkında güncel blog içerikleri.',
    url: '/medya/blog',
    type: 'website',
  },
}

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <SitePageShell>
      <main className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pt-32">
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
