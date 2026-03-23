import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { NewsGallery } from '@/components/news-gallery'
import { getNewsPostBySlug, getRelatedNewsPosts } from '@/lib/news-catalog'
import { ArticleDetailPage } from '@/components/article-detail/article-detail-page'
import { buildArticleMetadata, trimForMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const haber = await getNewsPostBySlug(slug)

  if (!haber) {
    return {
      title: 'Haber Bulunamadı',
      description: 'İstenen haber bulunamadı.',
      robots: { index: false, follow: false },
    }
  }

  return buildArticleMetadata({
    title: haber.title,
    description: trimForMeta(haber.excerpt || haber.title, 160),
    path: `/medya/haberler/${haber.slug}`,
    image: haber.image,
  })
}

export default async function HaberDetay({ params }: Props) {
  const { slug } = await params
  const haber = await getNewsPostBySlug(slug)
  const relatedNews = await getRelatedNewsPosts(slug)

  if (!haber) {
    notFound()
  }

  return (
    <ArticleDetailPage
      title={haber.title}
      image={haber.image}
      imagePlacement={haber.imagePlacementHero ?? haber.imagePlacement}
      imagePosition={haber.imagePosition}
      excerpt={haber.excerpt}
      sections={haber.sections}
      backHref="/medya/haberler"
      backLabel="Haberlere Dön"
      meta={[
        { icon: Calendar, label: haber.date },
        { icon: Clock, label: haber.readTime },
        { icon: MapPin, label: haber.location },
        { icon: User, label: haber.author },
      ]}
      relatedItems={relatedNews}
      relatedTitle="İlgili Haberler"
      relatedHrefPrefix="/medya/haberler"
      relatedCompact
      shareTitle="Bu haberi paylaş"
      shareDescription="Sosyal medyada paylaşarak destek olun"
      gallery={
        haber.gallery && haber.gallery.length > 0 ? (
          <div className="mt-16">
            <h3 className="mb-6 text-2xl font-bold">Fotoğraf Galerisi</h3>
            <NewsGallery images={haber.gallery} />
          </div>
        ) : undefined
      }
    />
  )
}
