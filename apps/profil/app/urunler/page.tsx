import { SiteHeader } from '@/components/site-header'
import { ProductCardGrid } from '@/components/product-card-grid'
import { SiteFooter } from '@/components/site-footer'
import { getProfileProducts } from '@/lib/profile-content'

export const revalidate = 300

export default async function ProfilProductsPage() {
  const products = await getProfileProducts()

  return (
    <div className="min-h-screen bg-[#f3f4f1] pt-20">
      <SiteHeader />
      <main>
        <ProductCardGrid products={products} />
      </main>
      <SiteFooter />
    </div>
  )
}
