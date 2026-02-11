"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import type { WebReferenceItem } from "../../../content/web-pages"

type ReferencesClientProps = {
  categories: string[]
  items: WebReferenceItem[]
}

export default function ReferencesClient({ categories, items }: ReferencesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? "Tümü")

  const filteredReferences = useMemo(() => {
    if (selectedCategory === "Tümü") return items
    return items.filter((ref) => ref.categories.includes(selectedCategory))
  }, [items, selectedCategory])

  return (
    <>
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
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card border border-border text-foreground hover:border-accent hover:text-accent hover:scale-105"
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

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReferences.map((reference) => (
          <div
            key={reference.id}
            className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-xl hover:shadow-accent/10 transition-all"
          >
            <div className="relative h-56 overflow-hidden">
              <Image src={reference.image} alt={reference.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm text-white/80">{reference.location}</p>
                <h3 className="text-lg font-semibold leading-snug">{reference.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {reference.categories.map((category) => (
                  <span key={`${reference.id}-${category}`} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {category}
                  </span>
                ))}
              </div>
              {reference.area ? (
                <p className="text-sm text-muted-foreground">Alan: {reference.area}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Detaylar için iletişime geçin.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
