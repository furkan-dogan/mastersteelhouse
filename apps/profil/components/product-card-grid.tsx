import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { ProfileProduct } from '@/lib/profile-content'

type ProductCardGridProps = {
  products: ProfileProduct[]
}

export function ProductCardGrid({ products }: ProductCardGridProps) {
  if (products.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Ürün Kataloğu</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">3 Profil, Tüm İhtiyaçlar</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">Alçıpan köşe, kaba sıva ve tavan U-C profilleri. Galvanizli çelik, yüksek kalite.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.slug}>
            <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#eab308]/50 hover:shadow-lg hover:shadow-[#eab308]/10">
              <Link href={`/urunler/${product.slug}`} aria-label={`${product.name} ürün detayına git`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.cardImage || product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) 50vw, 33vw"
                    className="bg-slate-50 p-2 object-contain transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-lg bg-[#eab308] px-3 py-1 text-xs font-semibold text-black">{product.shortName}</span>
                </div>
              </Link>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  <Link href={`/urunler/${product.slug}`} className="hover:text-[#b88700] transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-slate-600">{product.subtitle}</p>
                <Link
                  href={`/urunler/${product.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#b88700] transition group-hover:underline"
                >
                  {product.name} detayları
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
