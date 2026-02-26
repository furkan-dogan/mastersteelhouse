import { ProfilePageShell } from '@/components/profile-page-shell'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { ProfileBlogList } from '@/components/profile-blog-list'
import { getProfileBlogPosts } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata } from '@/lib/seo'

export const metadata = buildProfileMetadata({
  title: 'Blog',
  description: 'Profil sistemleri hakkında teknik blog yazıları, uygulama notları ve saha deneyimleri.',
  path: '/medya/blog',
  keywords: ['profil blog', 'teknik içerik', 'uygulama notları'],
})

export default async function BlogPage() {
  const posts = await getProfileBlogPosts()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Master Steel House Profil Blog',
    url: absoluteProfileUrl('/medya/blog'),
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.image.startsWith('http') ? post.image : absoluteProfileUrl(post.image),
      url: absoluteProfileUrl('/medya/blog'),
    })),
  }

  return (
    <ProfilePageShell>
      <SeoJsonLd data={blogSchema} />
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#eab308]/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold text-slate-900 md:text-6xl">
              Profil Sistemleri <span className="bg-gradient-to-r from-[#b88700] to-[#eab308] bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-slate-600">Teknik bilgi, uygulama notları ve saha deneyimlerine dayalı güncel içerikler.</p>
          </div>
        </div>
      </section>
      <ProfileBlogList posts={posts} />
    </ProfilePageShell>
  )
}
