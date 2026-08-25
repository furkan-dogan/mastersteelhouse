import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-catalog'
import { getAllProductPaths } from '@/lib/product-catalog'
import { getSiteUrl } from '@/lib/seo'

export const revalidate = 300

const TURKISH_MONTHS: Record<string, number> = {
  ocak: 0,
  şubat: 1,
  subat: 1,
  mart: 2,
  nisan: 3,
  mayıs: 4,
  mayis: 4,
  haziran: 5,
  temmuz: 6,
  ağustos: 7,
  agustos: 7,
  eylül: 8,
  eylul: 8,
  ekim: 9,
  kasım: 10,
  kasim: 10,
  aralık: 11,
  aralik: 11,
}

/**
 * Blog `date` values are CMS-authored Turkish strings like "25 Ocak 2024",
 * not ISO timestamps. Parsed here so the sitemap can report a truthful
 * lastModified instead of the build/request time.
 */
function parseTurkishDate(value: string): Date | undefined {
  const match = value.trim().match(/^(\d{1,2})\s+([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+(\d{4})$/)
  if (!match) return undefined

  const [, day, monthName, year] = match
  const month = TURKISH_MONTHS[monthName.toLocaleLowerCase('tr-TR')]
  if (month === undefined) return undefined

  const parsed = new Date(Number(year), month, Number(day))
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

const staticRoutes = [
  '/',
  '/iletisim',
  '/kvkk',
  '/gizlilik-politikasi',
  '/referanslar',
  '/medya/blog',
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

  // No trustworthy per-page modification timestamp exists for static routes,
  // so lastModified is intentionally omitted rather than reporting the
  // sitemap's own generation time as if it were a content change.
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))

  const [products, blogPosts] = await Promise.all([
    getAllProductPaths(),
    getBlogPosts(),
  ])

  // Product/category records have no updatedAt field in the CMS schema
  // (see ProductItem/ProductCategory in lib/product-catalog.ts), so
  // lastModified is omitted here for the same reason.
  const productEntries: MetadataRoute.Sitemap = products.map((item) => ({
    url: `${siteUrl}/urunler/${item.category}/${item.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productCategoryEntries: MetadataRoute.Sitemap = Array.from(
    new Set(products.map((item) => item.category))
  ).map((category) => ({
    url: `${siteUrl}/urunler/${category}`,
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // Blog posts do carry a CMS-authored date ("25 Ocak 2024"); use it when
  // it parses cleanly, otherwise omit rather than fabricate one.
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const publishedAt = parseTurkishDate(post.date)
    return {
      url: `${siteUrl}/medya/blog/${post.slug}`,
      ...(publishedAt ? { lastModified: publishedAt } : {}),
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  })

  return [...staticEntries, ...productCategoryEntries, ...productEntries, ...blogEntries]
}
