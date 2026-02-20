import { SitePageShell } from '@/components/site-page-shell'
import { Calendar, User, Clock } from 'lucide-react'
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog-catalog'
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

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogPostBySlug(slug)
  const relatedPosts = await getRelatedBlogPosts(slug)

  if (!blog) {
    return (
      <SitePageShell>
        <main className="min-h-screen pt-32">
          <div className="container mx-auto px-4">
            <p className="text-lg text-muted-foreground">Blog yazısı bulunamadı.</p>
          </div>
        </main>
      </SitePageShell>
    )
  }

  const sections = blog.sections.map((section, index) => ({
    ...section,
    id: section.id ?? `section-${index + 1}`,
  }))

  return (
    <SitePageShell>
      <main className="min-h-screen bg-background">
        <ArticleHero
          image={blog.image}
          imagePlacement={blog.imagePlacement}
          imagePosition={blog.imagePosition}
          title={blog.title}
          backHref="/medya/blog"
          backLabel="Bloga Dön"
          meta={[
            { icon: Calendar, label: blog.date },
            { icon: Clock, label: blog.readTime },
            { icon: User, label: blog.author },
          ]}
        />

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ArticleExcerptCard text={blog.excerpt} />
              <ArticleToc items={sections.map((section) => ({ id: section.id, title: section.title }))} />
              <ArticleSections sections={sections} />
              <ArticleSharePanel
                title="Bu yazıyı paylaş"
                description="Arkadaşlarınızla bu yazıyı paylaşabilirsiniz"
              />
            </div>
          </div>
        </article>

        <ArticleRelatedGrid
          title="İlgili Yazılar"
          description="Sizin için seçtiğimiz diğer yazılar"
          hrefPrefix="/medya/blog"
          items={relatedPosts}
        />
      </main>
    </SitePageShell>
  )
}
