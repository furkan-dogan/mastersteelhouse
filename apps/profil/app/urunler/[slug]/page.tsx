import { notFound, redirect } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductDetailTemplate } from '@/components/product-detail-template'
import { getProfileProducts } from '@/lib/profile-content'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 300

export default async function ProfilProductDetailPage({ params }: Props) {
  const { slug } = await params
  const products = await getProfileProducts()
  const normalizedSlug = slug === 'alcikose-profili' ? 'delikli-alci-kose-profili' : slug

  if (slug === 'alcikose-profili') {
    redirect('/urunler/delikli-alci-kose-profili')
  }

  const product = products.find((item) => item.slug === normalizedSlug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#f3f4f1] pt-20">
      <SiteHeader />
      <ProductDetailTemplate product={product} />
      <SiteFooter />
    </div>
  )
}
