'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { ProductItem } from '@/lib/products-store'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { adminPreviewUrl } from '@/lib/media-preview-url'

export type TechnicalDetailRow = {
  id: string
  keyText: string
  valueText: string
}

type ProductEditorFormProps = {
  showCoverField?: boolean

  selectedProduct: ProductItem
  technicalDetailRows: TechnicalDetailRow[]
  onPatchProduct: (update: Partial<ProductItem>) => void
  onSetSelectedProductSlug: (slug: string) => void
  onOpenCoverPicker: () => void
  onOpenGalleryPicker: () => void
  onOpenFloorPlanPicker: (index: number) => void
  onRemoveGalleryImage: (index: number) => void
  onAddTechnicalDetailRow: () => void
  onUpdateTechnicalDetailRow: (rowId: string, patch: Partial<Omit<TechnicalDetailRow, 'id'>>) => void
  onRemoveTechnicalDetailRow: (rowId: string) => void
  onAddFloorPlan: () => void
  onUpdateFloorPlan: (index: number, patch: Partial<{ name: string; image: string }>) => void
  onRemoveFloorPlan: (index: number) => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function ProductEditorForm({
  showCoverField = true,
  selectedProduct,
  technicalDetailRows,
  onPatchProduct,
  onSetSelectedProductSlug,
  onOpenCoverPicker,
  onOpenGalleryPicker,
  onOpenFloorPlanPicker,
  onRemoveGalleryImage,
  onAddTechnicalDetailRow,
  onUpdateTechnicalDetailRow,
  onRemoveTechnicalDetailRow,
  onAddFloorPlan,
  onUpdateFloorPlan,
  onRemoveFloorPlan,
  onRequestDelete,
  onError,
}: ProductEditorFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temel Bilgiler</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Ürün Adı</label>
            <input value={selectedProduct.name} onChange={(event) => onPatchProduct({ name: event.target.value })} className="cms-input" placeholder="Orn: Atlas Villa" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug</label>
            <input
              value={selectedProduct.slug}
              onChange={(event) => {
                const nextSlug = event.target.value
                onPatchProduct({ slug: nextSlug })
                onSetSelectedProductSlug(nextSlug)
              }}
              className="cms-input"
              placeholder="url-yolu"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Alan</label>
            <input value={selectedProduct.area} onChange={(event) => onPatchProduct({ area: event.target.value })} className="cms-input" placeholder="Orn: 100 m2" />
          </div>
          {showCoverField ? (
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-xs font-medium text-muted-foreground">Kapak Görseli</label>
              {selectedProduct.image && (
                <button onClick={() => onPatchProduct({ image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
                  Kaldır
                </button>
              )}
            </div>
            <MediaUploadDropzone
              onUploaded={(urls) => {
                const nextUrl = urls[0]
                if (!nextUrl) return
                onPatchProduct({ image: nextUrl })
              }}
              onPickFromMedia={onOpenCoverPicker}
              onError={onError}
            />
            {selectedProduct.image ? (
              <div className="mt-2 overflow-hidden rounded-xl border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={adminPreviewUrl(selectedProduct.image)} alt="Kapak görseli" className="aspect-[4/3] w-full object-cover" />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Kapak görseli seçilmedi.</p>
            )}
          </div>
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Açıklama</label>
          <textarea value={selectedProduct.description} onChange={(event) => onPatchProduct({ description: event.target.value })} rows={4} className="cms-textarea" placeholder="Ürün açıklaması..." />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Özellikler</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Oda</label>
            <input value={selectedProduct.features.rooms} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, rooms: event.target.value } })} className="cms-input" placeholder="2+1" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Banyo</label>
            <input value={selectedProduct.features.bathrooms} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, bathrooms: event.target.value } })} className="cms-input" placeholder="1" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Otopark</label>
            <input value={selectedProduct.features.parking} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, parking: event.target.value } })} className="cms-input" placeholder="1 Araçlık" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Yükseklik</label>
            <input value={selectedProduct.features.height} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, height: event.target.value } })} className="cms-input" placeholder="2.80m" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Teslim Suresi</label>
            <input value={selectedProduct.features.deliveryTime ?? ''} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, deliveryTime: event.target.value } })} className="cms-input" placeholder="6-8 Hafta" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Deprem Dayanimi</label>
            <input value={selectedProduct.features.earthquakeResistance ?? ''} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, earthquakeResistance: event.target.value } })} className="cms-input" placeholder="Yüksek Dayanım" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Enerji Sinifi</label>
            <input value={selectedProduct.features.energyClass ?? ''} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, energyClass: event.target.value } })} className="cms-input" placeholder="A+" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Garanti</label>
            <input value={selectedProduct.features.warranty ?? ''} onChange={(event) => onPatchProduct({ features: { ...selectedProduct.features, warranty: event.target.value } })} className="cms-input" placeholder="20 Yıl" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ek İçerik</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-xs font-medium text-muted-foreground">Galeri Görselleri</label>
            </div>
            <MediaUploadDropzone
              multiple
              helperText="PNG, JPG, GIF, WEBP, HEIC (maks. 20MB)"
              galleryButtonLabel="Medyadan ekle"
              onUploaded={(urls) => onPatchProduct({ gallery: [...(selectedProduct.gallery ?? []), ...urls] })}
              onPickFromMedia={onOpenGalleryPicker}
              onError={onError}
            />
            {(selectedProduct.gallery ?? []).length > 0 ? (
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
                {(selectedProduct.gallery ?? []).map((img, index) => (
                  <div key={`${img}-${index}`} className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={adminPreviewUrl(img)} alt={`Galeri ${index + 1}`} className="h-full w-full object-cover" />
                    <button onClick={() => onRemoveGalleryImage(index)} className="absolute right-2 top-2 rounded-md bg-black/55 px-2 py-1 text-xs text-white hover:bg-black/70">Sil</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Galeri boş. Medyadan görsel ekleyebilirsin.</p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-xs font-medium text-muted-foreground">Teknik Detaylar (anahtar + deger)</label>
              <button onClick={onAddTechnicalDetailRow} className="cms-btn-ghost h-7 px-2 py-1 text-xs">
                <Plus className="h-3.5 w-3.5" />
                Satir Ekle
              </button>
            </div>
            <div className="space-y-2">
              {technicalDetailRows.map((row) => (
                <div key={row.id} className="rounded-lg border p-2">
                  <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                    <input value={row.keyText} onChange={(event) => onUpdateTechnicalDetailRow(row.id, { keyText: event.target.value })} className="cms-input" placeholder="Anahtar (Örn: Kat Yüksekliği)" />
                    <input value={row.valueText} onChange={(event) => onUpdateTechnicalDetailRow(row.id, { valueText: event.target.value })} className="cms-input" placeholder="Değer (Örn: 2.80m)" />
                    <button onClick={() => onRemoveTechnicalDetailRow(row.id)} className="cms-btn-ghost h-10 px-2 py-1 text-xs" title="Satırı sil">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-xs font-medium text-muted-foreground">Kat Planları</label>
                <button onClick={onAddFloorPlan} className="cms-btn-ghost h-7 px-2 py-1 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Kat Ekle
                </button>
              </div>
              <div className="space-y-2">
                {(selectedProduct.floorPlans ?? []).map((plan, index) => (
                  <div key={`${plan.name}-${index}`} className="space-y-2 rounded-lg border p-2">
                    <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                      <input value={plan.name} onChange={(event) => onUpdateFloorPlan(index, { name: event.target.value })} className="cms-input" placeholder="Kat adı" />
                      <button onClick={() => onRemoveFloorPlan(index)} className="cms-btn-ghost h-10 px-2 py-1 text-xs text-error">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {plan.image ? (
                      <div className="overflow-hidden rounded-lg border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={adminPreviewUrl(plan.image)} alt={plan.name} className="aspect-[16/10] w-full object-cover" />
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Kat planı görseli seçilmedi.</p>
                    )}
                    <div className="space-y-2">
                      <MediaUploadDropzone
                        compact
                        onUploaded={(urls) => {
                          const nextUrl = urls[0]
                          if (!nextUrl) return
                          onUpdateFloorPlan(index, { image: nextUrl })
                        }}
                        onPickFromMedia={() => onOpenFloorPlanPicker(index)}
                        onError={onError}
                      />
                      {plan.image && (
                        <button onClick={() => onUpdateFloorPlan(index, { image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
                          Kaldır
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(selectedProduct.floorPlans ?? []).length === 0 && (
                  <p className="text-xs text-muted-foreground">Kat plani yok. Yeni kat ekleyebilirsin.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <button onClick={onRequestDelete} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
          <Trash2 className="h-4 w-4" />
          Bu Ürünü Sil
        </button>
      </div>
    </div>
  )
}
