'use client'

import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import type { ProductDimension, ProductItem, ProductSpec } from '@/lib/products-store'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { adminPreviewUrl } from '@/lib/media-preview-url'

function deriveDimensionsFromSpecs(specs: ProductSpec[]): ProductDimension[] {
  const thicknessSpec = specs.find((item) => item.label.toLowerCase().includes('kalın'))
  if (!thicknessSpec?.value) return []

  const normalized = thicknessSpec.value.replace(',', '.')
  const matches = normalized.match(/\d+(?:\.\d+)?/g)
  if (!matches) return []

  const unique = Array.from(new Set(matches.map((v) => Number(v).toFixed(2).replace('.', ','))))
  return unique.slice(0, 6).map((thickness, index) => {
    const base = 20 + Math.min(index, 3)
    return { thickness, a: String(base), b: String(base), c: '86' }
  })
}

type ProfileProductEditorFormProps = {
  selectedProduct: ProductItem
  onPatchProduct: (update: Partial<ProductItem>) => void
  onOpenCardImagePicker: () => void
  onOpenGalleryPicker: () => void
  onRemoveGalleryImage: (index: number) => void
  onMoveGalleryImage: (index: number, direction: 'up' | 'down') => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function ProfileProductEditorForm({
  selectedProduct,
  onPatchProduct,
  onOpenCardImagePicker,
  onOpenGalleryPicker,
  onRemoveGalleryImage,
  onMoveGalleryImage,
  onRequestDelete,
  onError,
}: ProfileProductEditorFormProps) {
  const specs = selectedProduct.specs ?? []
  const dimensions =
    selectedProduct.dimensions && selectedProduct.dimensions.length > 0
      ? selectedProduct.dimensions
      : deriveDimensionsFromSpecs(specs)
  const advantages = selectedProduct.highlights ?? []

  function addSpec() {
    onPatchProduct({ specs: [...specs, { label: '', value: '', icon: 'Shield' }] })
  }

  function updateSpec(index: number, patch: Partial<ProductSpec>) {
    const next = [...specs]
    if (!next[index]) return
    next[index] = { ...next[index], ...patch }
    onPatchProduct({ specs: next })
  }

  function removeSpec(index: number) {
    onPatchProduct({ specs: specs.filter((_, i) => i !== index) })
  }

  function addDimension() {
    onPatchProduct({ dimensions: [...dimensions, { thickness: '', a: '', b: '', c: '' }] })
  }

  function updateDimension(index: number, patch: Partial<ProductDimension>) {
    const next = [...dimensions]
    if (!next[index]) return
    next[index] = { ...next[index], ...patch }
    onPatchProduct({ dimensions: next })
  }

  function removeDimension(index: number) {
    onPatchProduct({ dimensions: dimensions.filter((_, i) => i !== index) })
  }

  function addAdvantage() {
    onPatchProduct({ highlights: [...advantages, ''] })
  }

  function updateAdvantage(index: number, value: string) {
    const next = [...advantages]
    next[index] = value
    onPatchProduct({ highlights: next })
  }

  function removeAdvantage(index: number) {
    onPatchProduct({ highlights: advantages.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temel Bilgiler</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Ürün Adı</label>
            <input
              value={selectedProduct.name}
              onChange={(event) => {
                const nextName = event.target.value
                onPatchProduct({ name: nextName })
              }}
              className="cms-input"
              placeholder="Örn: Delikli Alçı Köşe Profili"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Anasayfa Kart Görseli</h3>
        <MediaUploadDropzone
          multiple={false}
          helperText="PNG, JPG, GIF, WEBP, HEIC (maks. 20MB)"
          galleryButtonLabel="Medyadan seç"
          onUploaded={(urls) => {
            if (!urls[0]) return
            onPatchProduct({ image: urls[0] })
          }}
          onPickFromMedia={onOpenCardImagePicker}
          onError={onError}
        />
        {selectedProduct.image ? (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => onPatchProduct({ image: '' })}
              className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error"
            >
              Kart görselini kaldır
            </button>
            <div className="overflow-hidden rounded-xl border border-border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={adminPreviewUrl(selectedProduct.image)}
                alt={`${selectedProduct.name} kart görseli`}
                className="aspect-[4/3] w-full object-contain bg-white p-2"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Kart görseli seçilmezse galerideki ilk görsel kullanılır.</p>
        )}
      </div>

      <div className="space-y-4 rounded-xl border border-border p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Slider İçeriği</h3>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Slider Başlık</label>
          <input
            value={selectedProduct.sliderTitle ?? ''}
            onChange={(event) => onPatchProduct({ sliderTitle: event.target.value })}
            className="cms-input"
            placeholder="Ana slider başlığı"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Slider Açıklama</label>
          <textarea
            value={selectedProduct.sliderDescription ?? ''}
            onChange={(event) => onPatchProduct({ sliderDescription: event.target.value })}
            rows={3}
            className="cms-textarea"
            placeholder="Slider altında gözüken kısa açıklama"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ürün Detay İçeriği</h3>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Detay Başlık</label>
          <input
            value={selectedProduct.detailTitle ?? ''}
            onChange={(event) => onPatchProduct({ detailTitle: event.target.value })}
            className="cms-input"
            placeholder="Ürün detay sayfası başlığı"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Detay Açıklama</label>
          <textarea
            value={selectedProduct.detailDescription ?? selectedProduct.description ?? ''}
            onChange={(event) => {
              const next = event.target.value
              onPatchProduct({ detailDescription: next, description: next })
            }}
            rows={4}
            className="cms-textarea"
            placeholder="Ürün detay sayfası açıklaması"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Foto Galeri</h3>
        <MediaUploadDropzone
          multiple
          helperText="PNG, JPG, GIF, WEBP, HEIC (maks. 20MB)"
          galleryButtonLabel="Medyadan ekle"
          onUploaded={(urls) => {
            const merged = [...(selectedProduct.gallery ?? []), ...urls]
            onPatchProduct({ gallery: Array.from(new Set(merged)) })
          }}
          onPickFromMedia={onOpenGalleryPicker}
          onError={onError}
        />
        {(selectedProduct.gallery ?? []).length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {(selectedProduct.gallery ?? []).map((img, index) => (
              <div key={`${img}-${index}`} className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={adminPreviewUrl(img)} alt={`Galeri ${index + 1}`} className="h-full w-full object-contain bg-white p-1" />
                <div className="absolute right-2 top-2 flex gap-1">
                  <button
                    onClick={() => onMoveGalleryImage(index, 'up')}
                    disabled={index === 0}
                    className="rounded-md bg-black/55 p-1 text-xs text-white hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Yukarı taşı"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onMoveGalleryImage(index, 'down')}
                    disabled={index === (selectedProduct.gallery?.length ?? 0) - 1}
                    className="rounded-md bg-black/55 p-1 text-xs text-white hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Aşağı taşı"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => onRemoveGalleryImage(index)} className="rounded-md bg-black/55 px-2 py-1 text-xs text-white hover:bg-black/70">Sil</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Galeri boş.</p>
        )}
      </div>

      <div className="rounded-xl border border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Sekme: Teknik Özellikler</h4>
          <button onClick={addSpec} className="cms-btn-ghost h-7 px-2 py-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Madde Ekle
          </button>
        </div>
        <div className="space-y-2">
          {specs.map((row, index) => (
            <div key={`spec-${index}`} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <input value={row.label} onChange={(event) => updateSpec(index, { label: event.target.value })} className="cms-input" placeholder="Örn: Malzeme" />
              <input value={row.value} onChange={(event) => updateSpec(index, { value: event.target.value })} className="cms-input" placeholder="Örn: Galvanizli Çelik" />
              <button onClick={() => removeSpec(index)} className="cms-btn-ghost h-10 px-2 py-1 text-xs" title="Satırı sil">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {specs.length === 0 && <p className="text-xs text-muted-foreground">Henüz madde yok.</p>}
        </div>
      </div>

      <div className="rounded-xl border border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Sekme: Ürün Ölçüleri</h4>
          <button onClick={addDimension} className="cms-btn-ghost h-7 px-2 py-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Satır Ekle
          </button>
        </div>
        <div className="space-y-2">
          {dimensions.map((row, index) => (
            <div key={`dim-${index}`} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <input value={row.thickness} onChange={(event) => updateDimension(index, { thickness: event.target.value })} className="cms-input" placeholder="Kalınlık (mm)" />
              <input value={row.a} onChange={(event) => updateDimension(index, { a: event.target.value })} className="cms-input" placeholder="a (mm)" />
              <input value={row.b} onChange={(event) => updateDimension(index, { b: event.target.value })} className="cms-input" placeholder="b (mm)" />
              <input value={row.c} onChange={(event) => updateDimension(index, { c: event.target.value })} className="cms-input" placeholder="c (°)" />
              <button onClick={() => removeDimension(index)} className="cms-btn-ghost h-10 px-2 py-1 text-xs" title="Satırı sil">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {dimensions.length === 0 && <p className="text-xs text-muted-foreground">Henüz ölçü satırı yok.</p>}
        </div>
      </div>

      <div className="rounded-xl border border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">Sekme: Avantajları</h4>
          <button onClick={addAdvantage} className="cms-btn-ghost h-7 px-2 py-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Madde Ekle
          </button>
        </div>
        <div className="space-y-2">
          {advantages.map((item, index) => (
            <div key={`adv-${index}`} className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input value={item} onChange={(event) => updateAdvantage(index, event.target.value)} className="cms-input" placeholder="Avantaj metni" />
              <button onClick={() => removeAdvantage(index)} className="cms-btn-ghost h-10 px-2 py-1 text-xs" title="Maddeyi sil">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {advantages.length === 0 && <p className="text-xs text-muted-foreground">Henüz avantaj maddesi yok.</p>}
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
