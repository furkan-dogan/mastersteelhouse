import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/product-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { CategoryProductsGrid } from '@/components/category-products-grid'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { buildPageMetadata, trimForMeta } from '@/lib/seo'
import { buildBreadcrumbList } from '@/lib/structured-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const categoryData = await getCategoryBySlug(category)

  if (!categoryData) {
    return {
      title: 'Kategori Bulunamadı',
      description: 'İstenen ürün kategorisi bulunamadı.',
      robots: { index: false, follow: false },
    }
  }

  return buildPageMetadata({
    title: categoryData.title,
    description: trimForMeta(categoryData.description, 160),
    path: `/urunler/${categoryData.slug}`,
  })
}

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

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Anasayfa', path: '/' },
    { name: categoryData.title, path: `/urunler/${categoryData.slug}` },
  ])

  return (
    <SitePageShell>
      <SeoJsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-background">
        <section className="page-top-offset pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
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
