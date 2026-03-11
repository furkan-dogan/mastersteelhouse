import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/product-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { CategoryProductsGrid } from '@/components/category-products-grid'

export const dynamic = 'force-dynamic'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const categoryData = await getCategoryBySlug(category)
  const products = await getProductsByCategory(category)

  if (!categoryData) {
    notFound()
  }

  return (
    <SitePageShell>
      <main className="min-h-screen bg-background">
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <SectionIntro
              badge="Ürün Kategorisi"
              title={categoryData.title}
              description={categoryData.description}
              className="px-0"
              containerClassName="max-w-3xl"
            />

            <CategoryProductsGrid categorySlug={category} products={products} />
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
