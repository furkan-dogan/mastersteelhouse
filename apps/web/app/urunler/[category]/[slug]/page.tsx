import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetailTemplate } from '@/components/product-detail-template'
import { getAllProductPaths, getCategoryBySlug, getProduct } from '@/lib/product-catalog'
import { trimForMeta } from '@/lib/seo'

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

  const title = `${product.name} | ${categoryData.title}`
  const description = trimForMeta(product.description, 160)
  const canonical = `/urunler/${categoryData.slug}/${product.slug}`
  const image = product.image

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
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

  return <ProductDetailTemplate category={categoryData} product={product} />
}
