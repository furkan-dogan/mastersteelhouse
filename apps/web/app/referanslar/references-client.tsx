'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { ReferenceItem } from '@/lib/reference-types'

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
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Referans <span className="text-accent">Projelerimiz</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Türkiye'nin dört bir yanında gerçekleştirdiğimiz başarılı projeler
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">Referansları Filtrele :</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card border border-border text-foreground hover:border-accent hover:text-accent hover:scale-105'
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
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20"
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold">
                    {reference.categories[0]}
                  </span>
                </div>

                {reference.area && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold">
                      {reference.area}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {reference.title}
                  </h3>
                  <p className="text-sm text-white/80">{reference.location}</p>
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
