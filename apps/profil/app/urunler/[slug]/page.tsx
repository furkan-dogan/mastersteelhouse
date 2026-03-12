import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { ProductDetailTemplate } from '@/components/product-detail-template'
import { getProfileProducts } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata, trimForMeta } from '@/lib/seo'
import { buildBreadcrumbList } from '@/lib/structured-data'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 300

function normalizeProductSlug(slug: string) {
  return slug === 'alcikose-profili' ? 'delikli-alci-kose-profili' : slug
}

function buildProductMetaDescription(name: string, subtitle: string, description: string) {
  return trimForMeta(`${name}: ${subtitle} ${description}`, 158)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const normalizedSlug = normalizeProductSlug(slug)
  const products = await getProfileProducts()
  const product = products.find((item) => item.slug === normalizedSlug)

  if (!product) {
    return buildProfileMetadata({
      title: 'Ürün Bulunamadı',
      description: 'Aradığınız profil ürünü bulunamadı.',
      path: `/urunler/${normalizedSlug}`,
      robots: { index: false, follow: false },
    })
  }

  return buildProfileMetadata({
    title: `${product.name} Teknik Özellikleri ve Ölçüleri`,
    description: buildProductMetaDescription(product.name, product.subtitle, product.description),
    path: `/urunler/${product.slug}`,
    keywords: [product.name, 'profil teknik özellikleri', 'galvanizli profil', 'ölçü tablosu', 'uygulama avantajları'],
    type: 'article',
    image: product.gallery[0] || product.image || '/logo-profil.png',
  })
}

export default async function ProfilProductDetailPage({ params }: Props) {
  const { slug } = await params
  const products = await getProfileProducts()
  const normalizedSlug = normalizeProductSlug(slug)

  if (slug === 'alcikose-profili') {
    redirect('/urunler/delikli-alci-kose-profili')
  }

  const product = products.find((item) => item.slug === normalizedSlug)

  if (!product) {
    notFound()
  }

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Anasayfa', path: '/' },
    { name: 'Ürünler', path: '/urunler' },
    { name: product.name, path: `/urunler/${product.slug}` },
  ])

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: (product.gallery.length ? product.gallery : [product.image]).map((img) =>
      img.startsWith('http') ? img : absoluteProfileUrl(img),
    ),
    category: 'Profil Sistemleri',
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Master Steel House',
    },
    url: absoluteProfileUrl(`/urunler/${product.slug}`),
    additionalProperty: product.specs.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.key,
      value: spec.value,
    })),
  }

  return (
    <div className="min-h-screen bg-[#f3f4f1] pt-20">
      <SeoJsonLd data={[breadcrumbSchema, productSchema]} />
      <SiteHeader />
      <ProductDetailTemplate product={product} />
      <SiteFooter />
    </div>
  )
}
