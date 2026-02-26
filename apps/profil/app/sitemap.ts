import type { MetadataRoute } from 'next'
import { getProfileProducts, getProfileBlogPosts, getProfileNewsPosts } from '@/lib/profile-content'

const PROFILE_SITE_URL = process.env.NEXT_PUBLIC_PROFILE_SITE_URL ?? 'https://profil.mastersteelhouse.com'

const STATIC_ROUTES = [
  '/',
  '/kurumsal/hakkimizda',
  '/kurumsal/misyonumuz',
  '/kurumsal/vizyonumuz',
  '/urunler',
  '/medya/blog',
  '/medya/haberler',
  '/sss',
  '/iletisim',
  '/kvkk',
  '/gizlilik-politikasi',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const [products, blogPosts, newsPosts] = await Promise.all([
    getProfileProducts(),
    getProfileBlogPosts(),
    getProfileNewsPosts(),
  ])

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${PROFILE_SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${PROFILE_SITE_URL}/urunler/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${PROFILE_SITE_URL}/medya/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${PROFILE_SITE_URL}/medya/haberler/${post.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticEntries, ...productEntries, ...blogEntries, ...newsEntries]
}
