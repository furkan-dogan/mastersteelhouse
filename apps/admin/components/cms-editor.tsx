'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Search,
} from 'lucide-react'
import type { ProductStore, ProductItem } from '@/lib/products-store'
import { AdminLayout } from '@/components/admin-layout'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { createEditorRowId } from '@/lib/editor-utils'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'

function splitLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

type TechnicalDetailRow = {
  id: string
  keyText: string
  valueText: string
}

type MediaTarget =
  | { type: 'cover' }
  | { type: 'gallery' }
  | { type: 'floorPlan'; index: number }

const DEFAULT_PRODUCT_FEATURES = {
  rooms: '2+1',
  bathrooms: '1',
  parking: '1 Araclik',
  height: '2.80m',
  deliveryTime: '6-8 Hafta',
  earthquakeResistance: 'Yuksek Dayanim',
  energyClass: 'A+',
  warranty: '20 Yil',
}

function createTechnicalDetailRow(keyText = '', valueText = ''): TechnicalDetailRow {
  return {
    id: createEditorRowId('td'),
    keyText,
    valueText,
  }
}

export function CmsEditor() {
  const searchParams = useSearchParams()
  const [store, setStore] = useState<ProductStore | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('')
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('')
  const [technicalDetailRows, setTechnicalDetailRows] = useState<TechnicalDetailRow[]>([])
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [mediaTarget, setMediaTarget] = useState<MediaTarget>({ type: 'cover' })
  const [search, setSearch] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; name: string } | null>(null)

  const selectedCategoryFromQuery = searchParams.get('category') ?? ''

  const categoryProducts = useMemo(() => {
    if (!store) return []
    return store.products.filter((item) => item.categorySlug === selectedCategorySlug)
  }, [store, selectedCategorySlug])

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return categoryProducts
    return categoryProducts.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.area.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    })
  }, [categoryProducts, search])

  useEffect(() => {
    if (!store || !selectedCategorySlug || !selectedProductSlug) {
      setTechnicalDetailRows([])
      return
    }

    const product = store.products.find(
      (item) => item.categorySlug === selectedCategorySlug && item.slug === selectedProductSlug
    )
    if (!product) {
      setTechnicalDetailRows([])
      return
    }

    const rows = Object.entries(product.technicalDetails ?? {}).map(([key, value]) =>
      createTechnicalDetailRow(key, value)
    )
    setTechnicalDetailRows(rows.length > 0 ? rows : [createTechnicalDetailRow()])
  }, [store, selectedCategorySlug, selectedProductSlug])

  const loadStore = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/products', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Veri alinamadi')
      }
      const rawStore = (await response.json()) as ProductStore
      const nextStore: ProductStore = {
        ...rawStore,
        products: rawStore.products.map((product) => ({
          ...product,
          features: {
            ...DEFAULT_PRODUCT_FEATURES,
            ...product.features,
          },
        })),
      }
      setStore(nextStore)

      const firstCategory = nextStore.categories[0]?.slug ?? ''
      const validCategoryFromQuery = nextStore.categories.some((category) => category.slug === selectedCategoryFromQuery)
        ? selectedCategoryFromQuery
        : firstCategory
      const firstProduct =
        nextStore.products.find((item) => item.categorySlug === validCategoryFromQuery)?.slug ?? ''

      setSelectedCategorySlug(validCategoryFromQuery)
      setSelectedProductSlug(firstProduct)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Beklenmeyen hata')
    } finally {
      setLoading(false)
    }
  }, [selectedCategoryFromQuery])

  useEffect(() => {
    void loadStore()
  }, [loadStore])

  useEffect(() => {
    if (!store) return
    if (!selectedCategoryFromQuery) return
    if (selectedCategoryFromQuery === selectedCategorySlug) return
    const exists = store.categories.some((category) => category.slug === selectedCategoryFromQuery)
    if (!exists) return

    setSelectedCategorySlug(selectedCategoryFromQuery)
    setSelectedProductSlug(
      store.products.find((item) => item.categorySlug === selectedCategoryFromQuery)?.slug ?? ''
    )
  }, [store, selectedCategoryFromQuery, selectedCategorySlug])

  const selectedProduct = useMemo(() => {
    return categoryProducts.find((item) => item.slug === selectedProductSlug) ?? null
  }, [categoryProducts, selectedProductSlug])

  const selectedCategory = useMemo(() => {
    return store?.categories.find((item) => item.slug === selectedCategorySlug) ?? null
  }, [store, selectedCategorySlug])

  function patchProduct(update: Partial<ProductItem>) {
    if (!store || !selectedProduct) return
    setStore({
      ...store,
      products: store.products.map((item) => {
        if (item.slug !== selectedProduct.slug || item.categorySlug !== selectedProduct.categorySlug) {
          return item
        }
        return { ...item, ...update }
      }),
    })
  }

  function openEditor(slug: string) {
    setSelectedProductSlug(slug)
    setEditorOpen(true)
  }

  function addProduct() {
    if (!store || !selectedCategorySlug) return

    const nextSlugBase = 'yeni-urun'
    let counter = 1
    let nextSlug = `${nextSlugBase}-${counter}`
    while (store.products.some((item) => item.slug === nextSlug && item.categorySlug === selectedCategorySlug)) {
      counter += 1
      nextSlug = `${nextSlugBase}-${counter}`
    }

    const newProduct: ProductItem = {
      categorySlug: selectedCategorySlug,
      slug: nextSlug,
      name: 'Yeni Urun',
      area: '100 m2',
      image: '',
      description: 'Urun aciklamasi',
      features: {
        ...DEFAULT_PRODUCT_FEATURES,
      },
      highlights: [],
      gallery: [],
      technicalDetails: {},
      floorPlans: [],
    }

    setStore({
      ...store,
      products: [...store.products, newProduct],
    })
    setSelectedProductSlug(newProduct.slug)
    setEditorOpen(true)
  }

  function deleteBySlug(slug: string) {
    if (!store) return
    const nextProducts = store.products.filter(
      (item) => !(item.slug === slug && item.categorySlug === selectedCategorySlug)
    )
    setStore({ ...store, products: nextProducts })

    if (selectedProductSlug === slug) {
      const nextSelected = nextProducts.find((item) => item.categorySlug === selectedCategorySlug)?.slug ?? ''
      setSelectedProductSlug(nextSelected)
      if (!nextSelected) setEditorOpen(false)
    }
  }

  function requestDelete(slug: string, name: string) {
    setDeleteTarget({ slug, name })
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteBySlug(deleteTarget.slug)
    setDeleteTarget(null)
  }

  function syncTechnicalDetails(rows: TechnicalDetailRow[]) {
    setTechnicalDetailRows(rows)
    if (!selectedProduct) return

    const nextDetails: Record<string, string> = {}
    for (const row of rows) {
      const key = row.keyText.trim()
      const value = row.valueText.trim()
      if (!key || !value) continue

      let finalKey = key
      let suffix = 2
      while (nextDetails[finalKey] !== undefined) {
        finalKey = `${key} (${suffix})`
        suffix += 1
      }
      nextDetails[finalKey] = value
    }

    patchProduct({ technicalDetails: nextDetails })
  }

  function addTechnicalDetailRow() {
    syncTechnicalDetails([...technicalDetailRows, createTechnicalDetailRow()])
  }

  function updateTechnicalDetailRow(rowId: string, patch: Partial<Omit<TechnicalDetailRow, 'id'>>) {
    const rows = technicalDetailRows.map((row) => (row.id === rowId ? { ...row, ...patch } : row))
    syncTechnicalDetails(rows)
  }

  function removeTechnicalDetailRow(rowId: string) {
    const rows = technicalDetailRows.filter((row) => row.id !== rowId)
    syncTechnicalDetails(rows.length > 0 ? rows : [createTechnicalDetailRow()])
  }

  function openMediaPicker(target: MediaTarget) {
    setMediaTarget(target)
    setShowMediaPicker(true)
  }

  function handleMediaPick(url: string) {
    if (!selectedProduct) return
    if (mediaTarget.type === 'cover') {
      patchProduct({ image: url })
    } else if (mediaTarget.type === 'gallery') {
      patchProduct({ gallery: [...(selectedProduct.gallery ?? []), url] })
    } else {
      const current = [...(selectedProduct.floorPlans ?? [])]
      if (!current[mediaTarget.index]) {
        current[mediaTarget.index] = { name: `Kat ${mediaTarget.index + 1}`, image: '' }
      }
      current[mediaTarget.index] = { ...current[mediaTarget.index], image: url }
      patchProduct({ floorPlans: current })
    }
    setShowMediaPicker(false)
  }

  function removeGalleryImage(index: number) {
    if (!selectedProduct) return
    patchProduct({
      gallery: (selectedProduct.gallery ?? []).filter((_, itemIndex) => itemIndex !== index),
    })
  }

  function addFloorPlan() {
    if (!selectedProduct) return
    patchProduct({
      floorPlans: [...(selectedProduct.floorPlans ?? []), { name: 'Yeni Kat', image: '' }],
    })
  }

  function updateFloorPlan(index: number, patch: Partial<{ name: string; image: string }>) {
    if (!selectedProduct) return
    const next = [...(selectedProduct.floorPlans ?? [])]
    if (!next[index]) return
    next[index] = { ...next[index], ...patch }
    patchProduct({ floorPlans: next })
  }

  function removeFloorPlan(index: number) {
    if (!selectedProduct) return
    patchProduct({
      floorPlans: (selectedProduct.floorPlans ?? []).filter((_, itemIndex) => itemIndex !== index),
    })
  }

  async function saveStore() {
    if (!store) return

    try {
      setSaving(true)
      setMessage(null)
      setError(null)

      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      })

      if (!response.ok) {
        throw new Error('Kaydetme basarisiz')
      }

      setMessage('Kayit tamamlandi.')
      setTimeout(() => setMessage(null), 3000)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Beklenmeyen hata')
      setTimeout(() => setError(null), 5000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">CMS yukleniyor...</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="rounded-xl border border-error/30 bg-error/5 px-8 py-6 text-center">
          <p className="font-medium text-error">Veri yuklenemedi.</p>
          <button onClick={() => void loadStore()} className="mt-4 cms-btn-primary text-sm">
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <AdminLayout
        title="Urun Icerik Yonetimi"
        subtitle={`${selectedCategory ? selectedCategory.title : 'Kategori yok'} · ${filteredProducts.length} urun`}
        actions={
          <>
            <button onClick={() => void loadStore()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
              <RefreshCw className="h-4 w-4" />
              Yenile
            </button>
            <button onClick={() => void saveStore()} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
              <Save className="h-4 w-4" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button onClick={addProduct} className="cms-btn-primary h-9 px-3 py-1.5 text-sm">
              <Plus className="h-4 w-4" />
              Yeni Urun
            </button>
          </>
        }
      >
        <section className="cms-card overflow-hidden">
          <div className="border-b px-4 py-3 space-y-3">
            {selectedCategory ? (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Kategori</p>
                <p className="mt-1 text-sm font-medium text-foreground">{selectedCategory.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{selectedCategory.description}</p>
              </div>
            ) : null}
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Urun ara..."
                className="cms-input !pl-10"
              />
            </label>
          </div>

          <div className="cms-scroll overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="hidden w-[140px] px-4 py-3 text-left font-medium md:table-cell">Onizleme</th>
                  <th className="w-[62%] px-4 py-3 text-left font-medium">Urun</th>
                  <th className="hidden w-[18%] px-4 py-3 text-left font-medium md:table-cell">Alan</th>
                  <th className="w-[120px] px-4 py-3 text-right font-medium">Islemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Urun bulunamadi.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={`${product.categorySlug}-${product.slug}`} className="border-t align-middle hover:bg-muted/30">
                      <td className="hidden px-4 py-3 md:table-cell">
                        <div className="h-16 w-24 overflow-hidden rounded-md border bg-muted/30">
                          {product.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={adminPreviewUrl(product.image)} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Gorsel yok</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">{product.name}</p>
                          <p className="hidden truncate text-xs text-muted-foreground md:block">{product.description || 'Aciklama yok'}</p>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{product.area || '-'}</td>
                      <td className="px-4 py-3">
                        <CmsRowActions
                          onPreview={() => openEditor(product.slug)}
                          onEdit={() => openEditor(product.slug)}
                          onDelete={() => requestDelete(product.slug, product.name)}
                          previewTitle="Onizle"
                          editTitle="Duzenle"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </AdminLayout>

      {editorOpen && selectedProduct && (
        <CmsEditorDrawer
          open={editorOpen}
          title={selectedProduct.name}
          subtitle="Urun Duzenle"
          widthClassName="max-w-4xl"
          saving={saving}
          onSave={() => void saveStore()}
          onClose={() => setEditorOpen(false)}
        >
          <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temel Bilgiler</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Urun Adi</label>
                        <input value={selectedProduct.name} onChange={(event) => patchProduct({ name: event.target.value })} className="cms-input" placeholder="Orn: Atlas Villa" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug</label>
                        <input
                          value={selectedProduct.slug}
                          onChange={(event) => {
                            const nextSlug = event.target.value
                            patchProduct({ slug: nextSlug })
                            setSelectedProductSlug(nextSlug)
                          }}
                          className="cms-input"
                          placeholder="url-yolu"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Alan</label>
                        <input value={selectedProduct.area} onChange={(event) => patchProduct({ area: event.target.value })} className="cms-input" placeholder="Orn: 100 m2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <label className="block text-xs font-medium text-muted-foreground">Kapak Gorseli</label>
                          {selectedProduct.image && (
                            <button onClick={() => patchProduct({ image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
                              Kaldir
                            </button>
                          )}
                        </div>
                        <MediaUploadDropzone
                          onUploaded={(urls) => {
                            const nextUrl = urls[0]
                            if (!nextUrl) return
                            patchProduct({ image: nextUrl })
                          }}
                          onPickFromMedia={() => openMediaPicker({ type: 'cover' })}
                          onError={(nextMessage) => setError(nextMessage)}
                        />
                        {selectedProduct.image ? (
                          <div className="mt-2 overflow-hidden rounded-xl border bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={adminPreviewUrl(selectedProduct.image)} alt="Kapak gorseli" className="aspect-[4/3] w-full object-cover" />
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">Kapak gorseli secilmedi.</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Aciklama</label>
                      <textarea value={selectedProduct.description} onChange={(event) => patchProduct({ description: event.target.value })} rows={4} className="cms-textarea" placeholder="Urun aciklamasi..." />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ozellikler</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Oda</label>
                        <input value={selectedProduct.features.rooms} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, rooms: event.target.value } })} className="cms-input" placeholder="2+1" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Banyo</label>
                        <input value={selectedProduct.features.bathrooms} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, bathrooms: event.target.value } })} className="cms-input" placeholder="1" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Otopark</label>
                        <input value={selectedProduct.features.parking} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, parking: event.target.value } })} className="cms-input" placeholder="1 Araclik" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Yukseklik</label>
                        <input value={selectedProduct.features.height} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, height: event.target.value } })} className="cms-input" placeholder="2.80m" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Teslim Suresi</label>
                        <input value={selectedProduct.features.deliveryTime ?? ''} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, deliveryTime: event.target.value } })} className="cms-input" placeholder="6-8 Hafta" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Deprem Dayanimi</label>
                        <input value={selectedProduct.features.earthquakeResistance ?? ''} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, earthquakeResistance: event.target.value } })} className="cms-input" placeholder="Yuksek Dayanim" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Enerji Sinifi</label>
                        <input value={selectedProduct.features.energyClass ?? ''} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, energyClass: event.target.value } })} className="cms-input" placeholder="A+" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Garanti</label>
                        <input value={selectedProduct.features.warranty ?? ''} onChange={(event) => patchProduct({ features: { ...selectedProduct.features, warranty: event.target.value } })} className="cms-input" placeholder="20 Yil" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ek Icerik</h3>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Highlights (satir satir)</label>
                        <textarea value={(selectedProduct.highlights ?? []).join('\n')} onChange={(event) => patchProduct({ highlights: splitLines(event.target.value) })} rows={5} className="cms-textarea" placeholder="Her satira bir madde" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <label className="block text-xs font-medium text-muted-foreground">Galeri Gorselleri</label>
                        </div>
                        <MediaUploadDropzone
                          multiple
                          helperText="PNG, JPG, GIF, WEBP (maks. 20MB)"
                          galleryButtonLabel="Medyadan ekle"
                          onUploaded={(urls) => patchProduct({ gallery: [...(selectedProduct.gallery ?? []), ...urls] })}
                          onPickFromMedia={() => openMediaPicker({ type: 'gallery' })}
                          onError={(nextMessage) => setError(nextMessage)}
                        />
                        {(selectedProduct.gallery ?? []).length > 0 ? (
                          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
                            {(selectedProduct.gallery ?? []).map((img, index) => (
                              <div key={`${img}-${index}`} className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={adminPreviewUrl(img)} alt={`Galeri ${index + 1}`} className="h-full w-full object-cover" />
                                <button onClick={() => removeGalleryImage(index)} className="absolute right-2 top-2 rounded-md bg-black/55 px-2 py-1 text-xs text-white hover:bg-black/70">Sil</button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">Galeri bos. Medyadan gorsel ekleyebilirsin.</p>
                        )}
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="block text-xs font-medium text-muted-foreground">Teknik Detaylar (anahtar + deger)</label>
                          <button onClick={addTechnicalDetailRow} className="cms-btn-ghost h-7 px-2 py-1 text-xs">
                            <Plus className="h-3.5 w-3.5" />
                            Satir Ekle
                          </button>
                        </div>
                        <div className="space-y-2">
                          {technicalDetailRows.map((row) => (
                            <div key={row.id} className="rounded-lg border p-2">
                              <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                                <input value={row.keyText} onChange={(event) => updateTechnicalDetailRow(row.id, { keyText: event.target.value })} className="cms-input" placeholder="Anahtar (orn: Kat Yuksekligi)" />
                                <input value={row.valueText} onChange={(event) => updateTechnicalDetailRow(row.id, { valueText: event.target.value })} className="cms-input" placeholder="Deger (orn: 2.80m)" />
                                <button onClick={() => removeTechnicalDetailRow(row.id)} className="cms-btn-ghost h-10 px-2 py-1 text-xs" title="Satiri sil">
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
                            <label className="block text-xs font-medium text-muted-foreground">Kat Planlari</label>
                            <button onClick={addFloorPlan} className="cms-btn-ghost h-7 px-2 py-1 text-xs">
                              <Plus className="h-3.5 w-3.5" />
                              Kat Ekle
                            </button>
                          </div>
                          <div className="space-y-2">
                            {(selectedProduct.floorPlans ?? []).map((plan, index) => (
                              <div key={`${plan.name}-${index}`} className="space-y-2 rounded-lg border p-2">
                                <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                                  <input value={plan.name} onChange={(event) => updateFloorPlan(index, { name: event.target.value })} className="cms-input" placeholder="Kat adi" />
                                  <button onClick={() => removeFloorPlan(index)} className="cms-btn-ghost h-10 px-2 py-1 text-xs text-error">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                                {plan.image ? (
                                  <div className="overflow-hidden rounded-lg border bg-muted">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={adminPreviewUrl(plan.image)} alt={plan.name} className="aspect-[16/10] w-full object-cover" />
                                  </div>
                                ) : (
                                  <p className="text-xs text-muted-foreground">Kat plani gorseli secilmedi.</p>
                                )}
                                <div className="space-y-2">
                                  <MediaUploadDropzone
                                    compact
                                    onUploaded={(urls) => {
                                      const nextUrl = urls[0]
                                      if (!nextUrl) return
                                      updateFloorPlan(index, { image: nextUrl })
                                    }}
                                    onPickFromMedia={() => openMediaPicker({ type: 'floorPlan', index })}
                                    onError={(nextMessage) => setError(nextMessage)}
                                  />
                                  {plan.image && (
                                    <button onClick={() => updateFloorPlan(index, { image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
                                      Kaldir
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
                    <button onClick={() => requestDelete(selectedProduct.slug, selectedProduct.name)} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
                      <Trash2 className="h-4 w-4" />
                      Bu Urunu Sil
                    </button>
                  </div>
          </div>
        </CmsEditorDrawer>
      )}

      <MediaPickerModal
        open={showMediaPicker}
        title={
          mediaTarget.type === 'cover'
            ? 'Kapak Gorseli Sec'
            : mediaTarget.type === 'gallery'
              ? 'Galeriye Medya Ekle'
              : 'Kat Plani Gorseli Sec'
        }
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaPick}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Ürün Silinsin mi?"
        description={
          <>
            <span className="font-medium text-foreground">{deleteTarget?.name}</span> adlı ürünü kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Ürünü Sil"
        cancelLabel="Vazgeç"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
