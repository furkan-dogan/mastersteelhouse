import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/product-catalog'

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
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                Urun Kategorisi
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{categoryData.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{categoryData.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Link
                key={product.slug}
                href={`/urunler/${category}/${product.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-accent">{product.area}</span>
                      <div className="w-10 h-10 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
