import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { ProductCardGrid } from '@/components/product-card-grid'
import { getProfileProducts } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata } from '@/lib/seo'

export const revalidate = 300

export const metadata = buildProfileMetadata({
  title: 'Ürünler',
  description:
    'Delikli alçı köşe profili, kaba sıva profili ve tavan U-C profili ürünlerini teknik özellikleriyle inceleyin.',
  path: '/urunler',
  keywords: ['profil ürünleri', 'alçı köşe profili', 'kaba sıva profili', 'u-c profil'],
})

export default async function ProfilProductsPage() {
  const products = await getProfileProducts()

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
      <SeoJsonLd data={listSchema} />
      <SiteHeader />
      <main>
        <ProductCardGrid products={products} />
      </main>
      <SiteFooter />
    </div>
  )
}
