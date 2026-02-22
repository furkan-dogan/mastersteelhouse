import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductDetailTemplate } from '@/components/product-detail-template'
import { profileProducts, profileProductMap } from '@/lib/products'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return profileProducts.map((item) => ({ slug: item.slug }))
}

export default async function ProfilProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = profileProductMap[slug]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] pt-16">
      <SiteHeader />
      <ProductDetailTemplate product={product} />
      <SiteFooter />
    </div>
  )
}
