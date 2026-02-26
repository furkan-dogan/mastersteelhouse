import type { MetadataRoute } from 'next'
import { getProfileProducts } from '@/lib/profile-content'

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
  const products = await getProfileProducts()

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

  return [...staticEntries, ...productEntries]
}
