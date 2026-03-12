import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/product-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { CategoryProductsGrid } from '@/components/category-products-grid'
import { trimForMeta } from '@/lib/seo'

export const dynamic = 'force-dynamic'

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

  const description = trimForMeta(categoryData.description, 160)
  const canonical = `/urunler/${categoryData.slug}`

  return {
    title: categoryData.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: categoryData.title,
      description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: categoryData.title,
      description,
    },
  }
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
