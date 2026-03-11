import Link from 'next/link'
import { X } from 'lucide-react'
import type { ProductFlowItem } from '@/lib/site-navigation'

type ProductsOverlayProps = {
  isOpen: boolean
  items: ProductFlowItem[]
  onClose: () => void
}

export function ProductsOverlay({ isOpen, items, onClose }: ProductsOverlayProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-primary/98 backdrop-blur-3xl z-40 overflow-y-auto animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        <button
          onClick={onClose}
          className="fixed top-8 right-8 p-4 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 group z-50"
        >
          <X className="w-6 h-6 text-primary-foreground" />
        </button>
        <div className="space-y-0">
          {items.map((product, index) => (
            <Link
              key={product.href}
              href={product.href}
              onClick={onClose}
              className="group relative flex items-center justify-center py-8 md:py-12 border-b border-primary-foreground/10 overflow-hidden transition-all duration-700 hover:bg-background/5 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute left-0 md:left-12 -translate-x-full md:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-100 scale-50">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image || '/placeholder.svg'} alt={product.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-primary-foreground tracking-tight transition-all duration-500 group-hover:text-accent group-hover:scale-105">
                {product.title}
              </h3>

              <div className="absolute right-0 md:right-12 translate-x-full md:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-100 scale-50">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image || '/placeholder.svg'} alt={product.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
