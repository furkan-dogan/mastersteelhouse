'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { ProductStore, ProductItem } from '@/lib/products-store'
import { AdminLayout } from '@/components/admin-layout'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { createEditorRowId } from '@/lib/editor-utils'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsPageActions } from '@/components/ui/cms-page-actions'
import { CmsListToolbar } from '@/components/ui/cms-list-toolbar'
import type { TechnicalDetailRow } from '@/components/product-editor-form'
import { useConfirmDelete } from '@/lib/use-confirm-delete'
import { usePagination } from '@/lib/use-pagination'
import { ProductsCmsTable } from '@/components/products-cms-table'
import { ProductsEditorDrawer } from '@/components/products-editor-drawer'

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

  const { page, totalPages, pagedItems, setPage, resetPage, pageSize } = usePagination(filteredProducts, 10)

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

  const { deleteTarget, requestDelete, closeDeleteDialog, confirmDelete } = useConfirmDelete<string>(deleteBySlug)

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
          <CmsPageActions
            saving={saving}
            createLabel="Yeni Urun"
            onRefresh={() => void loadStore()}
            onSave={() => void saveStore()}
            onCreate={addProduct}
          />
        }
      >
        <section className="cms-card overflow-hidden">
          <CmsListToolbar
            className="space-y-3"
            searchValue={search}
            searchPlaceholder="Urun ara..."
            onSearchChange={(value) => {
              setSearch(value)
              resetPage()
            }}
          >
            {selectedCategory ? (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Kategori</p>
                <p className="mt-1 text-sm font-medium text-foreground">{selectedCategory.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{selectedCategory.description}</p>
              </div>
            ) : null}
          </CmsListToolbar>

          <ProductsCmsTable
            filteredProducts={filteredProducts}
            pagedItems={pagedItems}
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onOpenEditor={openEditor}
            onRequestDelete={requestDelete}
          />
        </section>
      </AdminLayout>

      <ProductsEditorDrawer
        open={editorOpen}
        saving={saving}
        selectedProduct={selectedProduct}
        technicalDetailRows={technicalDetailRows}
        onSave={() => void saveStore()}
        onClose={() => setEditorOpen(false)}
        onPatchProduct={patchProduct}
        onSetSelectedProductSlug={setSelectedProductSlug}
        onOpenCoverPicker={() => openMediaPicker({ type: 'cover' })}
        onOpenGalleryPicker={() => openMediaPicker({ type: 'gallery' })}
        onOpenFloorPlanPicker={(index) => openMediaPicker({ type: 'floorPlan', index })}
        onRemoveGalleryImage={removeGalleryImage}
        onAddTechnicalDetailRow={addTechnicalDetailRow}
        onUpdateTechnicalDetailRow={updateTechnicalDetailRow}
        onRemoveTechnicalDetailRow={removeTechnicalDetailRow}
        onAddFloorPlan={addFloorPlan}
        onUpdateFloorPlan={updateFloorPlan}
        onRemoveFloorPlan={removeFloorPlan}
        onRequestDelete={() => {
          if (!selectedProduct) return
          requestDelete(selectedProduct.slug, selectedProduct.name)
        }}
        onError={setError}
      />

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
            <span className="font-medium text-foreground">{deleteTarget?.label}</span> adlı ürünü kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Ürünü Sil"
        cancelLabel="Vazgeç"
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
