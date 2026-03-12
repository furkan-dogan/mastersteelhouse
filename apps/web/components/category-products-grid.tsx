'use client'

import { useEffect, useState } from 'react'
import type { ProductItem } from '@/lib/product-catalog'
import { ProductCategoryCard } from '@/components/product-category-card'

type CategoryProductsGridProps = {
  categorySlug: string
  products: ProductItem[]
}

export function CategoryProductsGrid({ categorySlug, products }: CategoryProductsGridProps) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCategoryCard
          key={product.slug}
          href={`/urunler/${categorySlug}/${product.slug}`}
          name={product.name}
          area={product.area}
          image={product.image}
          entered={entered}
          delayMs={Math.min(index * 70, 280)}
        />
      ))}
    </div>
  )
}
