import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-catalog'
import { getNewsPosts } from '@/lib/news-catalog'
import { getAllProductPaths } from '@/lib/product-catalog'
import { getSiteUrl } from '@/lib/seo'

export const revalidate = 300

const staticRoutes = [
  '/',
  '/iletisim',
  '/kvkk',
  '/gizlilik-politikasi',
  '/referanslar',
  '/medya/blog',
  '/medya/haberler',
  '/medya/kataloglar',
  '/medya/videolar',
  '/kurumsal/hakkimizda',
  '/kurumsal/misyonumuz',
  '/kurumsal/vizyonumuz',
  '/kurumsal/belgelerimiz',
  '/uretim/celik-yapi-uretim',
  '/uretim/dizayn-yazilimi',
  '/uretim/uretim-yazilimi',
  '/proje-sureci/tasarim-sureci',
  '/proje-sureci/uretim-sureci',
  '/proje-sureci/santiye-ve-montaj',
  '/proje-sureci/lojistik-ve-sevkiyat',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))

  const [products, blogPosts, newsPosts] = await Promise.all([
    getAllProductPaths(),
    getBlogPosts(),
    getNewsPosts(),
  ])

  const productEntries: MetadataRoute.Sitemap = products.map((item) => ({
    url: `${siteUrl}/urunler/${item.category}/${item.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productCategoryEntries: MetadataRoute.Sitemap = Array.from(
    new Set(products.map((item) => item.category))
  ).map((category) => ({
    url: `${siteUrl}/urunler/${category}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/medya/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${siteUrl}/medya/haberler/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...productCategoryEntries, ...productEntries, ...blogEntries, ...newsEntries]
}
