import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { readProductCatalog } from '@/lib/products'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const { categories, products } = await readProductCatalog()

  const currentCategory = categories.find((item) => item.slug === category)
  const product = products.find((item) => item.categorySlug === category && item.slug === slug)

  if (!currentCategory || !product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href={`/urunler/${currentCategory.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentCategory.name} Don
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-card shadow-xl">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  {currentCategory.name}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mt-2">{product.name}</h1>
                <p className="text-lg text-muted-foreground mt-4">{product.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.size && (
                  <div className="px-4 py-2 rounded-full bg-muted/60 text-sm font-semibold text-foreground">
                    {product.size}
                  </div>
                )}
                {product.rooms && (
                  <div className="px-4 py-2 rounded-full bg-muted/60 text-sm font-semibold text-foreground">
                    {product.rooms} Oda
                  </div>
                )}
                {product.bathrooms && (
                  <div className="px-4 py-2 rounded-full bg-muted/60 text-sm font-semibold text-foreground">
                    {product.bathrooms} Banyo
                  </div>
                )}
                {product.capacity && (
                  <div className="px-4 py-2 rounded-full bg-muted/60 text-sm font-semibold text-foreground">
                    Kapasite: {product.capacity}
                  </div>
                )}
                {product.usageType && (
                  <div className="px-4 py-2 rounded-full bg-muted/60 text-sm font-semibold text-foreground">
                    Kullanim: {product.usageType}
                  </div>
                )}
              </div>

              {product.highlights.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2 rounded-2xl border border-border/60 bg-card/60 p-4">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {product.specs.length > 0 && (
                <div className="rounded-3xl border border-border/60 bg-card/70 shadow-sm">
                  <div className="px-6 py-4 border-b border-border/60">
                    <h2 className="text-lg font-semibold">Teknik Detaylar</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Uygulama ve malzeme detaylarini satir bazinda inceleyin.
                    </p>
                  </div>
                  <div className="divide-y divide-border/60">
                    {product.specs.map((spec) => (
                      <div
                        key={`${spec.label}-${spec.value}`}
                        className="grid gap-2 px-6 py-4 sm:grid-cols-[220px_1fr]"
                      >
                        <span className="text-sm font-semibold text-foreground/80">{spec.label}</span>
                        <span className="text-sm text-foreground/70">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href="/#contact"
                  className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
                >
                  Teklif Al
                </Link>
                <Link
                  href="/#urunler"
                  className="px-6 py-3 rounded-full border border-border text-sm font-semibold text-foreground/80 hover:text-foreground hover:border-accent/50 transition-all duration-300"
                >
                  Tum Urunlere Don
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const dynamic = 'force-dynamic'
