import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { ProductCardGrid } from '@/components/product-card-grid'
import { getProfileProducts } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata } from '@/lib/seo'
import { buildBreadcrumbList } from '@/lib/structured-data'

export const revalidate = 300

export const metadata = buildProfileMetadata({
  title: 'Profil Ürünleri: Delikli Alçı Köşe, Kaba Sıva ve Tavan U-C Profilleri',
  description:
    'Profil ürün kataloğunda delikli alçı köşe, kaba sıva ve tavan U-C profili modellerini teknik detaylar, ölçüler ve kullanım senaryolarıyla karşılaştırın.',
  path: '/urunler',
  keywords: ['profil ürünleri', 'alçı köşe profili', 'kaba sıva profili', 'u-c profil'],
})

export default async function ProfilProductsPage() {
  const products = await getProfileProducts()

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Anasayfa', path: '/' },
    { name: 'Ürünler', path: '/urunler' },
  ])

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Profil Ürünleri',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: absoluteProfileUrl(`/urunler/${product.slug}`),
      })),
    },
  }

  return (
    <div className="min-h-screen bg-[#f3f4f1] pt-20">
      <SeoJsonLd data={[breadcrumbSchema, listSchema]} />
      <SiteHeader />
      <main>
        <ProductCardGrid products={products} />
      </main>
      <SiteFooter />
    </div>
  )
}
