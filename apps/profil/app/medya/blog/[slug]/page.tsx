import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { getProfileBlogPostBySlug, getProfileBlogPosts } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await getProfileBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getProfileBlogPostBySlug(slug)

  if (!post) {
    return buildProfileMetadata({
      title: 'Blog Yazısı Bulunamadı',
      description: 'Aradığınız blog yazısı bulunamadı.',
      path: `/medya/blog/${slug}`,
      robots: { index: false, follow: false },
    })
  }

  return buildProfileMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/medya/blog/${post.slug}`,
    type: 'article',
    image: post.image,
  })
}

export default async function ProfileBlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getProfileBlogPostBySlug(slug)

  if (!post) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : absoluteProfileUrl(post.image),
    url: absoluteProfileUrl(`/medya/blog/${post.slug}`),
  }

  return (
    <ProfilePageShell>
      <SeoJsonLd data={schema} />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-14 lg:px-8">
        <Link href="/medya/blog" className="text-sm font-medium text-[#b88700] hover:underline">Bloga Dön</Link>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={post.image} alt={`${post.title} görseli`} className="h-full w-full object-cover" />
        </div>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
          <p>
            Bu içerik, profil sistemleri uygulamalarında sahadan edinilen deneyimleri ve teknik yaklaşımı özetlemek amacıyla
            hazırlanmıştır.
          </p>
          <p>
            Projenize uygun ürün seçimi, uygulama detayları ve teklif süreci için ürün sayfalarımızı inceleyebilir veya iletişim
            sayfamızdan doğrudan ekibimize ulaşabilirsiniz.
          </p>
        </div>
      </article>
    </ProfilePageShell>
  )
}
