import { SiteHeader } from '@/components/site-header'
import { ProductCardGrid } from '@/components/product-card-grid'
import { SiteFooter } from '@/components/site-footer'

export default function ProfilProductsPage() {
  return (
    <div className="min-h-screen bg-[#0a0e14] pt-16">
      <SiteHeader />
      <main>
        <ProductCardGrid />
      </main>
      <SiteFooter />
    </div>
  )
}
