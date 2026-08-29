'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { ReferenceItem } from '@/lib/reference-types'
import { PageHero } from '@/components/page-hero'

type Props = {
  references: ReferenceItem[]
}

export function ReferencesClient({ references }: Props) {
  const categories = useMemo(() => {
    const unique = new Set<string>()
    for (const item of references) {
      for (const category of item.categories) unique.add(category)
    }
    return ['Tümü', ...Array.from(unique)]
  }, [references])

  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')

  const filteredReferences =
    selectedCategory === 'Tümü'
      ? references
      : references.filter((reference) => reference.categories.includes(selectedCategory))

  return (
    <main className="page-top-offset min-h-screen bg-background pb-20">
      <PageHero
        title="Referans"
        highlight="Projelerimiz"
        description="Türkiye'nin dört bir yanında gerçekleştirdiğimiz başarılı projeler"
      />

      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="whitespace-nowrap text-sm font-semibold text-foreground">Referansları Filtrele :</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground hover:border-accent/50 hover:text-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">{filteredReferences.length} proje bulundu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReferences.map((reference, index) => (
            <div
              key={reference.id}
              className="group relative overflow-hidden rounded-xl border border-border hover:border-accent/60 transition-colors duration-300"
              style={{
                animation: 'fadeIn 0.5s ease-out',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={reference.image || '/placeholder.svg'}
                  alt={reference.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                <div className="absolute left-4 top-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/90">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                  {reference.categories[0]}
                  {reference.area ? <span className="text-white/60">· {reference.area}</span> : null}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-white mb-1.5">{reference.title}</h3>
                  <p className="text-sm text-white/75">{reference.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReferences.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Sonuç Bulunamadı</h3>
            <p className="text-muted-foreground">Bu kategoride henüz proje bulunmamaktadır.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
