import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, User, Clock } from 'lucide-react'
import { getBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog-catalog'
import { ArticleDetailPage } from '@/components/article-detail/article-detail-page'
import { buildArticleMetadata, trimForMeta } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogPostBySlug(slug)

  if (!blog) {
    return {
      title: 'Blog Yazısı Bulunamadı',
      description: 'İstenen blog yazısı bulunamadı.',
      robots: { index: false, follow: false },
    }
  }

  return buildArticleMetadata({
    title: blog.title,
    description: trimForMeta(blog.excerpt || blog.title, 160),
    path: `/medya/blog/${blog.slug}`,
    image: blog.image,
  })
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogPostBySlug(slug)
  const relatedPosts = await getRelatedBlogPosts(slug)

  if (!blog) {
    notFound()
  }

  return (
    <ArticleDetailPage
      title={blog.title}
      image={blog.image}
      imagePlacement={blog.imagePlacement}
      imagePosition={blog.imagePosition}
      excerpt={blog.excerpt}
      sections={blog.sections}
      backHref="/medya/blog"
      backLabel="Bloga Dön"
      meta={[
        { icon: Calendar, label: blog.date },
        { icon: Clock, label: blog.readTime },
        { icon: User, label: blog.author },
      ]}
      relatedItems={relatedPosts}
      relatedTitle="İlgili Yazılar"
      relatedDescription="Sizin için seçtiğimiz diğer yazılar"
      relatedHrefPrefix="/medya/blog"
      shareTitle="Bu yazıyı paylaş"
      shareDescription="Arkadaşlarınızla bu yazıyı paylaşabilirsiniz"
    />
  )
}
