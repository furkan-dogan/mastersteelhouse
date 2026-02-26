import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { getProfileNewsPostBySlug, getProfileNewsPosts } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await getProfileNewsPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getProfileNewsPostBySlug(slug)

  if (!post) {
    return buildProfileMetadata({
      title: 'Haber Bulunamadı',
      description: 'Aradığınız haber bulunamadı.',
      path: `/medya/haberler/${slug}`,
      robots: { index: false, follow: false },
    })
  }

  return buildProfileMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/medya/haberler/${post.slug}`,
    type: 'article',
    image: post.image,
  })
}

export default async function ProfileNewsDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getProfileNewsPostBySlug(slug)

  if (!post) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : absoluteProfileUrl(post.image),
    url: absoluteProfileUrl(`/medya/haberler/${post.slug}`),
  }

  return (
    <ProfilePageShell>
      <SeoJsonLd data={schema} />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-14 lg:px-8">
        <Link href="/medya/haberler" className="text-sm font-medium text-[#b88700] hover:underline">Haberlere Dön</Link>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={post.image} alt={`${post.title} görseli`} className="h-full w-full object-cover" />
        </div>
      </article>
    </ProfilePageShell>
  )
}
