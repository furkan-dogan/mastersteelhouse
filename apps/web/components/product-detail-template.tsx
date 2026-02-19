'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Bath,
  Bed,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize2,
  X,
  ArrowLeft,
  Timer,
  ShieldCheck,
  Zap,
  BadgeCheck,
} from 'lucide-react'
import { useState } from 'react'
import type { ProductCategory, ProductItem } from '@/lib/product-catalog'

type Props = {
  product: ProductItem
  category: ProductCategory
}

export function ProductDetailTemplate({ product, category }: Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const pageContainer = 'mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8'

  const iconMap: Record<string, any> = {
    Home,
    Bed,
    Bath,
    Car,
  }

  const galleryImages = product.gallery.length > 0 ? product.gallery : [product.image]
  const floorPlans = product.floorPlans

  const openGallery = (index: number) => {
    setSelectedImage(index)
  }

  const closeGallery = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev === null ? 0 : (prev + 1) % galleryImages.length))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === null ? galleryImages.length - 1 : (prev - 1 + galleryImages.length) % galleryImages.length))
  }

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <section className="relative pt-30 pb-14 md:pt-32 md:pb-16">
          <div className={pageContainer}>
            <Link
              href={`/urunler/${category.slug}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{category.title} sayfasina don</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
              <div>
                <div className="relative h-[420px] sm:h-[480px] lg:h-[500px] rounded-3xl overflow-hidden group">
                  <Image
                    src={galleryImages[currentGalleryIndex]}
                    alt={`${product.name} - Gorsel ${currentGalleryIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <button
                    onClick={prevGalleryImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/90 text-accent-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
                    aria-label="Onceki fotografa git"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextGalleryImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/90 text-accent-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
                    aria-label="Sonraki fotografa git"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/70 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {currentGalleryIndex + 1} / {galleryImages.length}
                  </div>

                  <button
                    onClick={() => openGallery(currentGalleryIndex)}
                    className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-accent/90 text-accent-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
                  >
                    Tam Ekran Goruntule
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                  {galleryImages.map((img, index) => (
                    <button
                      key={img + index}
                      className="relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-accent transition-all duration-300 hover:scale-105 bg-muted"
                      onClick={() => openGallery(index)}
                      aria-label={`${index + 1}. gorseli ac`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - Gorsel ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 150px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] py-1 mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-accent text-2xl font-bold">
                      <Maximize2 className="w-6 h-6" />
                      {product.area}
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Bed, label: 'Oda Sayisi', value: product.features.rooms },
                    { icon: Bath, label: 'Banyo', value: product.features.bathrooms },
                    { icon: Car, label: 'Otopark', value: product.features.parking },
                    { icon: Home, label: 'Yapi Tipi', value: category.title },
                    { icon: Timer, label: 'Teslim Suresi', value: product.features.deliveryTime },
                    {
                      icon: ShieldCheck,
                      label: 'Deprem Dayanimi',
                      value: product.features.earthquakeResistance,
                    },
                    { icon: Zap, label: 'Enerji Sinifi', value: product.features.energyClass },
                    { icon: BadgeCheck, label: 'Garanti', value: product.features.warranty },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
                        <div className="p-2 rounded-xl bg-accent/10">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="font-semibold">{item.value}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-muted/30">
          <div className={pageContainer}>
            <h2 className="text-3xl font-bold mb-8">Teknik Ozellikler</h2>
            <div className="bg-card rounded-3xl border border-border overflow-hidden">
              <div className="divide-y divide-border">
                {Object.entries(product.technicalDetails).map(([key, value]) => (
                  <div key={key} className="grid md:grid-cols-2 gap-4 p-6 hover:bg-muted/50 transition-colors">
                    <div className="font-semibold text-foreground">{key}</div>
                    <div className="text-muted-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-gradient-to-br from-muted/30 to-background">
          <div className={pageContainer}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Kat Plani ve Kroki</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Urunun detayli kat planini ve olculerini inceleyerek mekanlari kesfedin.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="flex gap-2 mb-6 justify-center">
                {floorPlans.map((plan, index) => (
                  <button
                    key={plan.name}
                    onClick={() => setSelectedFloorPlan(index)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedFloorPlan === index
                        ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                        : 'bg-card border border-border hover:border-accent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {plan.name}
                  </button>
                ))}
              </div>

              <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-2xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={floorPlans[selectedFloorPlan]?.image ?? galleryImages[0]}
                    alt={`${product.name} - ${floorPlans[selectedFloorPlan]?.name ?? 'Kat Plani'}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => openGallery(currentGalleryIndex)}
                    className="absolute top-4 right-4 px-4 py-2 rounded-full bg-accent/90 text-accent-foreground text-sm font-medium hover:scale-105 transition-transform"
                  >
                    Buyut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className={pageContainer}>
            <h2 className="text-3xl font-bold mb-8">Öne Çıkan Özellikler</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors">
                  <div className="p-1 rounded-full bg-accent/10">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-muted/30">
          <div className={pageContainer}>
            <h2 className="text-3xl font-bold mb-8">Fiyat Teklifi İsteyin</h2>

            <form className="space-y-5">
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="İsim Soyisim *"
                  className="h-14 rounded-lg border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <input
                  type="email"
                  placeholder="E-Posta Adresi"
                  className="h-14 rounded-lg border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numarası *"
                  className="h-14 rounded-lg border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>

              <textarea
                rows={7}
                placeholder="Lütfen mesajınızı yazın..."
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />

              <div className="grid md:grid-cols-[148px_1fr] gap-4 items-center">
                <div
                  className="h-14 rounded-lg border border-border flex items-center justify-center text-2xl font-bold tracking-[0.14em] tabular-nums text-foreground"
                  style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(220,38,38,0.12) 0px, rgba(220,38,38,0.12) 2px, transparent 2px, transparent 6px)' }}
                >
                  45808
                </div>
                <input
                  type="text"
                  placeholder="Güvenlik kodunu giriniz. *"
                  className="h-14 rounded-lg border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border" />
                <span>
                  <strong className="text-foreground">KVKK ve Gizlilik Metni</strong>'ni okudum, anladım ve kabul ediyorum.
                </span>
              </label>

              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Gönder
              </Button>
            </form>
          </div>
        </section>

        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeGallery}>
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Galeriyi kapat"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Onceki gorsel"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Sonraki gorsel"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="relative w-full max-w-6xl h-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={galleryImages[selectedImage]}
                alt={`${product.name} - Gorsel ${selectedImage + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
