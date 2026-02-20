'use client'

import { useEffect, useMemo, useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import type { ReferenceItem, ReferenceStore } from '@/lib/references-store'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsPageActions } from '@/components/ui/cms-page-actions'
import { CmsListToolbar } from '@/components/ui/cms-list-toolbar'
import { useConfirmDelete } from '@/lib/use-confirm-delete'
import { usePagination } from '@/lib/use-pagination'
import { ReferencesCmsTable } from '@/components/references-cms-table'
import { ReferencesEditorDrawer } from '@/components/references-editor-drawer'

const EMPTY_REFERENCE: ReferenceItem = {
  id: 'ref-yeni',
  title: 'Yeni Referans',
  location: 'Türkiye',
  categories: ['Kamu Yapıları'],
  image: '/project-1.jpg',
  area: '',
}

export function ReferencesCmsEditor() {
  const [store, setStore] = useState<ReferenceStore | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const [selectedId, setSelectedId] = useState('')
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editorOpen, setEditorOpen] = useState(false)

  useEffect(() => {
    void loadStore()
  }, [])

  const selectedItem = useMemo(() => {
    return store?.items.find((item) => item.id === selectedId) ?? null
  }, [store, selectedId])

  const availableCategories = useMemo(() => {
    if (!store) return []
    return Array.from(new Set(store.items.flatMap((item) => item.categories))).sort((a, b) =>
      a.localeCompare(b, 'tr')
    )
  }, [store])

  const filteredItems = useMemo(() => {
    if (!store) return []
    const q = search.trim().toLowerCase()
    return store.items.filter((item) => {
      if (categoryFilter !== 'all' && !item.categories.includes(categoryFilter)) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.categories.join(' ').toLowerCase().includes(q)
      )
    })
  }, [store, search, categoryFilter])

  const { page, totalPages, pagedItems, setPage, resetPage, pageSize } = usePagination(filteredItems, 10)

  async function loadStore() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/references', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Referans verisi alınamadı')
      }
      const nextStore = (await response.json()) as ReferenceStore
      setStore(nextStore)
      setSelectedId(nextStore.items[0]?.id ?? '')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Beklenmeyen hata')
    } finally {
      setLoading(false)
    }
  }

  function patchItem(update: Partial<ReferenceItem>) {
    if (!store || !selectedItem) return
    setStore({
      ...store,
      items: store.items.map((item) => (item.id === selectedItem.id ? { ...item, ...update } : item)),
    })
  }

  function openEditor(id: string) {
    setSelectedId(id)
    setEditorOpen(true)
  }

  function addItem() {
    if (!store) return
    const idBase = 'ref-yeni'
    let index = store.items.length + 1
    let id = `${idBase}-${index}`
    while (store.items.some((item) => item.id === id)) {
      index += 1
      id = `${idBase}-${index}`
    }

    const nextItem: ReferenceItem = {
      ...EMPTY_REFERENCE,
      id,
    }

    setStore({
      ...store,
      items: [...store.items, nextItem],
    })
    setSelectedId(id)
    setEditorOpen(true)
  }

  function deleteById(id: string) {
    if (!store) return
    const filtered = store.items.filter((item) => item.id !== id)
    setStore({ ...store, items: filtered })
    if (selectedId === id) {
      setSelectedId(filtered[0]?.id ?? '')
      if (filtered.length === 0) {
        setEditorOpen(false)
      }
    }
  }

  const { deleteTarget, requestDelete, closeDeleteDialog, confirmDelete } = useConfirmDelete<string>(deleteById)

  async function saveStore() {
    if (!store) return

    try {
      setSaving(true)
      setMessage(null)
      setError(null)
      const response = await fetch('/api/references', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      })
      if (!response.ok) {
        throw new Error('Kaydetme başarısız')
      }
      setMessage('Referans içerikleri kaydedildi.')
      setTimeout(() => setMessage(null), 3000)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Beklenmeyen hata')
      setTimeout(() => setError(null), 5000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <CmsLoadingState message="Referans CMS yükleniyor..." />
  }

  if (!store) {
    return <CmsErrorState onRetry={() => void loadStore()} />
  }

  return (
    <>
      <AdminLayout
        title="Referanslar"
        subtitle={`${filteredItems.length} referans bulundu`}
        actions={
          <CmsPageActions
            saving={saving}
            createLabel="Yeni Referans"
            onRefresh={() => void loadStore()}
            onSave={() => void saveStore()}
            onCreate={addItem}
          />
        }
      >
        <section className="cms-card overflow-hidden">
          <CmsListToolbar
            searchValue={search}
            searchPlaceholder="Referans ara..."
            onSearchChange={(value) => {
              setSearch(value)
              resetPage()
            }}
            filterValue={categoryFilter}
            onFilterChange={(value) => {
              setCategoryFilter(value)
              resetPage()
            }}
            filterOptions={[
              { value: 'all', label: 'Tüm Kategoriler' },
              ...availableCategories.map((category) => ({ value: category, label: category })),
            ]}
          />

          <ReferencesCmsTable
            filteredItems={filteredItems}
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

      <ReferencesEditorDrawer
        open={editorOpen}
        saving={saving}
        selectedItem={selectedItem}
        onSave={() => void saveStore()}
        onClose={() => setEditorOpen(false)}
        onPatchItem={patchItem}
        onOpenMediaPicker={() => setShowMediaPicker(true)}
        onRequestDelete={() => {
          if (!selectedItem) return
          requestDelete(selectedItem.id, selectedItem.title)
        }}
        onError={setError}
      />

      <MediaPickerModal
        open={showMediaPicker}
        title="Referans Görseli Seç"
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          patchItem({ image: url })
          setShowMediaPicker(false)
        }}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Referans Silinsin mi?"
        description={
          <>
            <span className="font-medium text-foreground">{deleteTarget?.label}</span> adlı referansı kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Referansı Sil"
        cancelLabel="Vazgeç"
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
