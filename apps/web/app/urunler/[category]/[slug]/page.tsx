import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetailTemplate } from '@/components/product-detail-template'
import { getAllProductPaths, getCategoryBySlug, getProduct } from '@/lib/product-catalog'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { buildPageMetadata, trimForMeta } from '@/lib/seo'
import { buildBreadcrumbList, buildProductSchema } from '@/lib/structured-data'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return await getAllProductPaths()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}): Promise<Metadata> {
  const { category, slug } = await params
  const categoryData = await getCategoryBySlug(category)
  const product = await getProduct(category, slug)

  if (!categoryData || !product) {
    return {
      title: 'Ürün Bulunamadı',
      description: 'İstenen ürün bulunamadı.',
      robots: { index: false, follow: false },
    }
  }

  return buildPageMetadata({
    title: `${product.name} | ${categoryData.title}`,
    description: trimForMeta(product.description, 160),
    path: `/urunler/${categoryData.slug}/${product.slug}`,
    image: product.image,
    type: 'article',
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const categoryData = await getCategoryBySlug(category)
  const product = await getProduct(category, slug)

  if (!categoryData || !product) {
    notFound()
  }

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Anasayfa', path: '/' },
    { name: categoryData.title, path: `/urunler/${categoryData.slug}` },
    { name: product.name, path: `/urunler/${categoryData.slug}/${product.slug}` },
  ])

  const productSchema = buildProductSchema({
    name: product.name,
    description: product.description,
    image: product.image,
    url: `/urunler/${categoryData.slug}/${product.slug}`,
    category: categoryData.title,
  })

  return (
    <>
      <SeoJsonLd data={breadcrumbSchema} />
      <SeoJsonLd data={productSchema} />
      <ProductDetailTemplate category={categoryData} product={product} />
    </>
  )
}
