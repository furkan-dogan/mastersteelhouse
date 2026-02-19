import { notFound } from 'next/navigation'
import { ProductDetailTemplate } from '@/components/product-detail-template'
import { getAllProductPaths, getCategoryBySlug, getProduct } from '@/lib/product-catalog'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return await getAllProductPaths()
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
