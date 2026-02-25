'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProfileProduct } from '@/lib/profile-content'

export function ProductDetailTemplate({ product }: { product: ProfileProduct }) {
  const gallery = useMemo(() => {
    const base = (product.gallery ?? []).filter(Boolean)
    const unique = base.length > 0 ? Array.from(new Set(base)) : product.image ? [product.image] : []
    return unique
  }, [product.gallery, product.image])

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'specs' | 'dimensions' | 'advantages'>('specs')
  const activeImage = gallery[activeIndex] ?? ''

  const dimensionsRows = product.dimensions ?? []

  useEffect(() => {
    if (gallery.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [gallery])

  useEffect(() => {
    setActiveIndex(0)
  }, [gallery])

  function goPrev() {
    if (gallery.length <= 1) return
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  function goNext() {
    if (gallery.length <= 1) return
    setActiveIndex((prev) => (prev + 1) % gallery.length)
  }

  return (
    <main>
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[92px_minmax(0,1fr)_minmax(0,420px)] lg:items-center">
            <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
              {gallery.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-[92px] w-[92px] overflow-hidden rounded-2xl border-2 ${activeIndex === index ? 'border-[#f2a900]' : 'border-slate-200'}`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="order-1 relative lg:order-2">
              <div className="overflow-hidden rounded-2xl bg-[#f0f1ef]">
                <img src={activeImage} alt={product.name} className="aspect-[16/10] w-full object-cover" />
              </div>

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 text-[#0b2f57] shadow"
                    aria-label="Önceki"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 text-[#0b2f57] shadow"
                    aria-label="Sonraki"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <div className="order-3">
              <h3 className="mt-3 text-4xl font-black leading-tight text-[#0b2f57]">{product.name}</h3>
              <p className="mt-3 text-lg leading-8 text-slate-800">{product.description}</p>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div>
          <div className="grid grid-cols-3 gap-4 px-2 pb-5 pt-1 md:gap-6 md:px-6 md:pb-6">
            {[
              { key: 'specs' as const, label: 'Teknik Özellikler' },
              { key: 'dimensions' as const, label: 'Ürün Ölçüleri' },
              { key: 'advantages' as const, label: 'Avantajları' },
            ].map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2 text-center text-[14px] font-semibold transition md:text-[18px] lg:text-[20px] ${
                    isActive
                      ? 'border-b-2 border-[#f2a900] text-[#0b2f57]'
                      : 'border-b-2 border-transparent text-slate-500 hover:text-[#0b2f57]'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="h-[320px] overflow-y-auto border-t border-slate-300 px-2 pb-8 pt-5 md:h-[360px] md:px-6 md:pb-10">
            {activeTab === 'specs' && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-[16px] md:text-[17px] md:leading-[1.5]">
                  <tbody className="divide-y divide-slate-300">
                    {product.specs.map((spec) => (
                      <tr key={spec.key}>
                        <th className="py-3 pr-4 font-semibold text-[#0f172a]">{spec.key}</th>
                        <td className="py-3 text-[#0f172a]">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'dimensions' && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-[16px] md:text-[17px] md:leading-[1.5]">
                  <thead className="border-b border-slate-300">
                    <tr>
                      <th className="py-3 font-semibold text-[#0f172a]">Kalınlık (mm)</th>
                      <th className="py-3 font-semibold text-[#0f172a]">a (mm)</th>
                      <th className="py-3 font-semibold text-[#0f172a]">b (mm)</th>
                      <th className="py-3 font-semibold text-[#0f172a]">c (°)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {dimensionsRows.map((row, index) => (
                      <tr key={`${row.thickness}-${row.a}-${row.b}-${row.c}-${index}`}>
                        <td className="py-3 text-[#0f172a]">{row.thickness}</td>
                        <td className="py-3 text-[#0f172a]">{row.a}</td>
                        <td className="py-3 text-[#0f172a]">{row.b}</td>
                        <td className="py-3 text-[#0f172a]">{row.c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {dimensionsRows.length === 0 ? <p className="pt-3 text-sm text-slate-500">Ölçü satırı bulunmuyor.</p> : null}
              </div>
            )}

            {activeTab === 'advantages' && (
              <ul className="list-disc space-y-2.5 pl-6 text-[16px] leading-7 text-[#0f172a] md:text-[17px] md:leading-8">
                {product.useAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
