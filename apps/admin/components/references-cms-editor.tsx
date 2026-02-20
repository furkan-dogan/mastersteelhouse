'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import type { ReferenceItem, ReferenceStore } from '@/lib/references-store'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

function splitByComma(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

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
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null)

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

  function requestDelete(id: string, title: string) {
    setDeleteTarget({ id, title })
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteById(deleteTarget.id)
    setDeleteTarget(null)
  }

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
          <>
            <button onClick={() => void loadStore()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
              <RefreshCw className="h-4 w-4" />
              Yenile
            </button>
            <button onClick={() => void saveStore()} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
              <Save className="h-4 w-4" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button onClick={addItem} className="cms-btn-primary h-9 px-3 py-1.5 text-sm">
              <Plus className="h-4 w-4" />
              Yeni Referans
            </button>
          </>
        }
      >
        <section className="cms-card overflow-hidden">
          <div className="border-b px-4 py-3">
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Referans ara..."
                  className="cms-input !pl-10"
                />
              </label>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="cms-input"
              >
                <option value="all">Tüm Kategoriler</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="cms-scroll overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="w-[58%] px-4 py-3 text-left font-medium">Proje</th>
                  <th className="hidden w-[16%] px-4 py-3 text-left font-medium md:table-cell">Konum</th>
                  <th className="hidden w-[16%] px-4 py-3 text-left font-medium lg:table-cell">Kategori</th>
                  <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Referans bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-t align-middle hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={adminPreviewUrl(item.image)} alt={item.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Yok</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">{item.title}</p>
                            <p className="hidden truncate text-xs text-muted-foreground md:block">{item.area || 'Alan bilgisi yok'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{item.location}</td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <span className="inline-flex rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground">
                          {item.categories[0] ?? 'Genel'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => openEditor(item.id)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-8 md:w-8"
                            title="Önizle"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openEditor(item.id)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-8 md:w-8"
                            title="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => requestDelete(item.id, item.title)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-red-300/60 bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 md:h-8 md:w-8"
                            title="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </AdminLayout>

      {editorOpen && selectedItem && (
        <>
          <button
            type="button"
            aria-label="Editörü kapat"
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setEditorOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl border-l bg-background shadow-2xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-5 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Referans Düzenle</p>
                  <h2 className="text-base font-semibold text-foreground">{selectedItem.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => void saveStore()} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
                    <Save className="h-4 w-4" />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                  <button onClick={() => setEditorOpen(false)} className="cms-btn-ghost h-9 w-9 p-0" aria-label="Kapat">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="cms-scroll flex-1 overflow-y-auto p-5">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Başlık</label>
                    <input value={selectedItem.title} onChange={(e) => patchItem({ title: e.target.value })} className="cms-input" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Konum</label>
                      <input value={selectedItem.location} onChange={(e) => patchItem({ location: e.target.value })} className="cms-input" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Alan / Ölçek</label>
                      <input value={selectedItem.area ?? ''} onChange={(e) => patchItem({ area: e.target.value })} className="cms-input" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategoriler (virgülle)</label>
                    <input
                      value={selectedItem.categories.join(', ')}
                      onChange={(e) => patchItem({ categories: splitByComma(e.target.value) })}
                      className="cms-input"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="block text-xs font-medium text-muted-foreground">Görsel</label>
                      {selectedItem.image && (
                        <button onClick={() => patchItem({ image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">Kaldır</button>
                      )}
                    </div>
                    <MediaUploadDropzone
                      onUploaded={(urls) => {
                        const nextUrl = urls[0]
                        if (!nextUrl) return
                        patchItem({ image: nextUrl })
                      }}
                      onPickFromMedia={() => setShowMediaPicker(true)}
                      onError={(nextMessage) => setError(nextMessage)}
                    />
                    {selectedItem.image && (
                      <div className="mt-3 max-w-[560px] overflow-hidden rounded-2xl border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={adminPreviewUrl(selectedItem.image)} alt="Referans görsel" className="aspect-[4/3] w-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <button onClick={() => requestDelete(selectedItem.id, selectedItem.title)} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
                      <Trash2 className="h-4 w-4" />
                      Bu Referansı Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

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
            <span className="font-medium text-foreground">{deleteTarget?.title}</span> adlı referansı kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Referansı Sil"
        cancelLabel="Vazgeç"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
