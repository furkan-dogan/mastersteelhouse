'use client'

import Link from 'next/link'
import { ArrowLeft, Bath, Bed, Car, Home, Maximize2, Timer, ShieldCheck, Zap } from 'lucide-react'
import { useState } from 'react'
import type { ProductCategory, ProductItem } from '@/lib/product-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { ProductGallery } from '@/components/product-detail/product-gallery'
import { ProductSpecsGrid, type ProductSpecItem } from '@/components/product-detail/product-specs-grid'
import { TechnicalDetailsTable } from '@/components/product-detail/technical-details-table'
import { FloorPlansSection } from '@/components/product-detail/floor-plans-section'
import { QuoteRequestForm } from '@/components/product-detail/quote-request-form'
import { GalleryLightbox } from '@/components/product-detail/gallery-lightbox'
import { ResponsibilitiesAccordion } from '@/components/product-detail/responsibilities-accordion'

type Props = {
  product: ProductItem
  category: ProductCategory
}

export function ProductDetailTemplate({ product, category }: Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(0)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const pageContainer = 'mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8'

  const galleryImages = product.gallery.length > 0 ? product.gallery : [product.image]
  const floorPlans = product.floorPlans
  const floorPlanImages = floorPlans.map((plan) => plan.image).filter(Boolean)
  const lightboxImages = Array.from(new Set([...galleryImages, ...floorPlanImages]))

  const specs: ProductSpecItem[] = [
    { icon: Bed, label: 'Oda Sayısı', value: product.features.rooms },
    { icon: Bath, label: 'Banyo', value: product.features.bathrooms },
    { icon: Car, label: 'Otopark', value: product.features.parking },
    { icon: Home, label: 'Yapı Tipi', value: category.title },
    { icon: Timer, label: 'Teslim Süresi', value: product.features.deliveryTime },
    { icon: ShieldCheck, label: 'Deprem Dayanımı', value: product.features.earthquakeResistance },
    { icon: Zap, label: 'Enerji Sınıfı', value: product.features.energyClass },
  ]

  const openGallery = (index: number) => setSelectedImage(index)
  const openGalleryByUrl = (imageUrl: string) => {
    const index = lightboxImages.findIndex((item) => item === imageUrl)
    setSelectedImage(index >= 0 ? index : 0)
  }
  const closeGallery = () => setSelectedImage(null)
  const nextImage = () =>
    setSelectedImage((prev) => (prev === null ? 0 : (prev + 1) % lightboxImages.length))
  const prevImage = () =>
    setSelectedImage((prev) => (prev === null ? lightboxImages.length - 1 : (prev - 1 + lightboxImages.length) % lightboxImages.length))
  const nextGalleryImage = () => setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  const prevGalleryImage = () => setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  return (
    <SitePageShell>
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <section className="page-top-offset relative pb-14 md:pb-16">
          <div className={pageContainer}>
            <Link
              href={`/urunler/${category.slug}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{category.title} sayfasına dön</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">
              <ProductGallery
                productName={product.name}
                images={galleryImages}
                currentIndex={currentGalleryIndex}
                onPrev={prevGalleryImage}
                onNext={nextGalleryImage}
                onOpen={openGallery}
              />

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

                <ProductSpecsGrid items={specs} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 bg-muted/30">
          <div className={pageContainer}>
            <h2 className="text-3xl font-bold mb-8">Teknik Özellikler</h2>
            <TechnicalDetailsTable details={product.technicalDetails} />
          </div>
        </section>

        <section className="py-14 md:py-16 bg-gradient-to-br from-muted/30 to-background">
          <div className={pageContainer}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Kat Planı ve Kroki</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ürünün detaylı kat planını ve ölçülerini inceleyerek mekanları keşfedin.
              </p>
            </div>

            <FloorPlansSection
              productName={product.name}
              plans={floorPlans}
              selectedIndex={selectedFloorPlan}
              fallbackImage={galleryImages[0]}
              onSelectPlan={setSelectedFloorPlan}
              onOpenImage={openGalleryByUrl}
            />
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className={pageContainer}>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Kapsam ve Sorumluluklar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Teklifimizin neyi kapsadığını ve süreçte karşılıklı sorumlulukları detaylıca inceleyebilirsiniz.
              </p>
            </div>
            <ResponsibilitiesAccordion />
          </div>
        </section>

        <section className="py-14 md:py-16 bg-muted/30">
          <div className={pageContainer}>
            <h2 className="text-3xl font-bold mb-8">Fiyat Teklifi İsteyin</h2>
            <QuoteRequestForm />
          </div>
        </section>

        <GalleryLightbox
          isOpen={selectedImage !== null}
          selectedIndex={selectedImage}
          productName={product.name}
          images={lightboxImages}
          onClose={closeGallery}
          onPrev={prevImage}
          onNext={nextImage}
        />
      </main>
    </SitePageShell>
  )
}
