import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { readProductCatalog } from '@/lib/products'

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const { categories, products } = await readProductCatalog()
  const currentCategory = categories.find((item) => item.slug === category)

  if (!currentCategory) {
    notFound()
  }

  const categoryProducts = products.filter((item) => item.categorySlug === currentCategory.slug)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link href="/#urunler" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Urunlere Don
          </Link>

          <div className="text-center mb-16">
            {currentCategory.eyebrow && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
                {currentCategory.eyebrow}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentCategory.title}{' '}
              <span className="text-accent">{currentCategory.titleAccent}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product, index) => (
              <Link
                key={`${product.categorySlug}-${product.slug}`}
                href={`/urunler/${currentCategory.slug}/${product.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                    {product.size && <p className="text-accent text-xl font-bold">{product.size}</p>}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    {product.rooms && <span>{product.rooms} Oda</span>}
                    {product.rooms && product.bathrooms && <span>•</span>}
                    {product.bathrooms && <span>{product.bathrooms} Banyo</span>}
                    {(product.capacity || product.usageType) && <span>•</span>}
                    {product.capacity && <span>Kapasite: {product.capacity}</span>}
                    {!product.capacity && product.usageType && <span>Kullanim: {product.usageType}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const dynamic = 'force-dynamic'
