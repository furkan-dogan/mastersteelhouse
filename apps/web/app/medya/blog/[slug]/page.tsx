import { Calendar, User, Clock } from 'lucide-react'
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog-catalog'
import { ArticleDetailPage, ArticleNotFoundPage } from '@/components/article-detail/article-detail-page'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogPostBySlug(slug)
  const relatedPosts = await getRelatedBlogPosts(slug)

  if (!blog) {
    return <ArticleNotFoundPage message="Blog yazısı bulunamadı." />
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
