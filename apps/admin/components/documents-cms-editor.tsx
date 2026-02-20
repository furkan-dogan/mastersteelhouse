'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Eye,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { createEditorRowId } from '@/lib/editor-utils'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import type { DocumentsStore, DocumentItem } from '@/lib/documents-store'

function splitLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function isPdfUrl(url: string) {
  const value = url.split('?')[0].toLowerCase()
  return value.endsWith('.pdf')
}

const EMPTY_STORE: DocumentsStore = {
  hero: {
    badge: 'Belgelerimiz',
    title: 'Kalite ve',
    titleAccent: 'Guven',
    description:
      'Sahip oldugumuz uluslararasi sertifikalar ve kalite belgelerimiz ile musterilerimize guven veriyoruz.',
  },
  items: [],
  features: [],
  footerNote: '',
}

function createDocument(): DocumentItem {
  return {
    id: createEditorRowId('doc'),
    title: 'Yeni Belge',
    subtitle: 'Belge Alt Başlığı',
    description: 'Belge açıklaması',
    pdfUrl: '',
  }
}

export function DocumentsCmsEditor() {
  const [store, setStore] = useState<DocumentsStore>(EMPTY_STORE)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState('')
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [search, setSearch] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const selectedItem = useMemo(
    () => store.items.find((item) => item.id === selectedId) ?? null,
    [store.items, selectedId]
  )

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    return store.items.filter((item) => {
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    })
  }, [store.items, search])

  useEffect(() => {
    void loadStore()
  }, [])

  async function loadStore() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/documents', { cache: 'no-store' })
      if (!response.ok) throw new Error('Belgeler verisi alınamadı')
      const nextStore = (await response.json()) as DocumentsStore
      setStore(nextStore)
      setSelectedId(nextStore.items[0]?.id ?? '')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Beklenmeyen hata')
    } finally {
      setLoading(false)
    }
  }

  function patchStore(update: Partial<DocumentsStore>) {
    setStore((prev) => ({ ...prev, ...update }))
  }

  function patchItem(update: Partial<DocumentItem>) {
    if (!selectedItem) return
    setStore((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === selectedItem.id ? { ...item, ...update } : item)),
    }))
  }

  function openEditor(id: string) {
    setSelectedId(id)
    setEditorOpen(true)
  }

  function addItem() {
    const nextItem = createDocument()
    setStore((prev) => ({ ...prev, items: [...prev.items, nextItem] }))
    setSelectedId(nextItem.id)
    setEditorOpen(true)
  }

  function deleteById(id: string) {
    setStore((prev) => {
      const nextItems = prev.items.filter((item) => item.id !== id)
      if (selectedId === id) {
        setSelectedId(nextItems[0]?.id ?? '')
        if (nextItems.length === 0) setEditorOpen(false)
      }
      return { ...prev, items: nextItems }
    })
  }

  function requestDelete(id: string, title: string) {
    setDeleteTarget({ id, title })
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteById(deleteTarget.id)
    setDeleteTarget(null)
  }

  async function uploadFile(files: FileList | File[]) {
    const file = Array.from(files)[0]
    if (!file) return
    const name = file.name.toLowerCase()
    const isPdf = file.type === 'application/pdf' || name.endsWith('.pdf')
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif)$/i.test(name)
    if (!isPdf && !isImage) {
      setError('Sadece PDF veya görsel dosyası yükleyebilirsiniz.')
      return
    }

    const formData = new FormData()
    formData.append('files', file)

    try {
      setUploadingPdf(true)
      setError(null)
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })
      const data = (await response.json()) as { items?: Array<{ url: string }>; message?: string }
      if (!response.ok) throw new Error(data.message || 'Dosya yüklenemedi')
      const nextUrl = data.items?.[0]?.url
      if (nextUrl) patchItem({ pdfUrl: nextUrl })
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Dosya yüklenemedi')
    } finally {
      setUploadingPdf(false)
    }
  }

  async function saveStore() {
    try {
      setSaving(true)
      setError(null)
      setMessage(null)
      const response = await fetch('/api/documents', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      })
      if (!response.ok) throw new Error('Kaydetme başarısız')
      setMessage('Belgeler kaydedildi.')
      setTimeout(() => setMessage(null), 2500)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Kaydetme başarısız')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <CmsLoadingState message="Belgeler CMS yükleniyor..." />
  }

  if (!store) {
    return <CmsErrorState onRetry={() => void loadStore()} />
  }

  return (
    <>
      <AdminLayout
        title="Belgeler"
        subtitle={`${filteredItems.length} belge bulundu`}
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
              Yeni Belge
            </button>
          </>
        }
      >
        <section className="cms-card overflow-hidden">
          <div className="border-b px-4 py-3">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Belge ara..."
                className="cms-input !pl-10"
              />
            </label>
          </div>

          <div className="cms-scroll overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="hidden w-[140px] px-4 py-3 text-left font-medium md:table-cell">Önizleme</th>
                  <th className="w-[52%] px-4 py-3 text-left font-medium">Belge</th>
                  <th className="hidden w-[20%] px-4 py-3 text-left font-medium md:table-cell">Alt Başlık</th>
                  <th className="hidden w-[12%] px-4 py-3 text-left font-medium lg:table-cell">Durum</th>
                  <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Belge bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-t align-middle hover:bg-muted/30">
                      <td className="hidden px-4 py-3 md:table-cell">
                        <div className="h-16 w-24 overflow-hidden rounded-md border bg-card">
                          {item.pdfUrl ? (
                            isPdfUrl(item.pdfUrl) ? (
                              <iframe
                                src={`${adminPreviewUrl(item.pdfUrl)}#toolbar=0&navpanes=0&page=1`}
                                title={`${item.title} mini önizleme`}
                                className="h-full w-full"
                              />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={adminPreviewUrl(item.pdfUrl)} alt={`${item.title} mini önizleme`} className="h-full w-full object-cover" />
                            )
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                              Dosya yok
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">{item.title}</p>
                          <p className="hidden truncate text-xs text-muted-foreground md:block">{item.description || 'Açıklama girilmemiş'}</p>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{item.subtitle || '-'}</td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${item.pdfUrl ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'}`}>
                          {item.pdfUrl ? 'Hazır' : 'Eksik'}
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
          <button type="button" aria-label="Editörü kapat" className="fixed inset-0 z-40 bg-black/40" onClick={() => setEditorOpen(false)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl border-l bg-background shadow-2xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-5 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Belge Düzenle</p>
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
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sayfa Ayarları</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input value={store.hero.badge} onChange={(e) => patchStore({ hero: { ...store.hero, badge: e.target.value } })} className="cms-input" placeholder="Badge" />
                      <input value={store.hero.title} onChange={(e) => patchStore({ hero: { ...store.hero, title: e.target.value } })} className="cms-input" placeholder="Başlık" />
                      <input value={store.hero.titleAccent} onChange={(e) => patchStore({ hero: { ...store.hero, titleAccent: e.target.value } })} className="cms-input" placeholder="Vurgulu Başlık" />
                    </div>
                    <textarea value={store.hero.description} onChange={(e) => patchStore({ hero: { ...store.hero, description: e.target.value } })} rows={3} className="cms-textarea" placeholder="Açıklama" />
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Belge Detayı</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input value={selectedItem.title} onChange={(e) => patchItem({ title: e.target.value })} className="cms-input" placeholder="Belge adı" />
                      <input value={selectedItem.subtitle} onChange={(e) => patchItem({ subtitle: e.target.value })} className="cms-input" placeholder="Alt başlık" />
                    </div>
                    <textarea value={selectedItem.description} onChange={(e) => patchItem({ description: e.target.value })} rows={3} className="cms-textarea" placeholder="Belge açıklaması" />

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Dosya (PDF / Görsel)</label>
                      <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 p-4 text-center" onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
                        event.preventDefault()
                        if (event.dataTransfer.files?.length) {
                          void uploadFile(event.dataTransfer.files)
                        }
                      }}>
                        <FileText className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                        <p className="text-sm font-medium">{uploadingPdf ? 'Dosya yükleniyor...' : 'PDF veya görsel sürükleyip bırak / seç'}</p>
                        <div className="mt-3 flex justify-center gap-2">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">Bilgisayardan Seç</button>
                          <button type="button" onClick={() => setShowMediaPicker(true)} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm">Medyadan Seç</button>
                        </div>
                        <input ref={fileInputRef} type="file" accept="application/pdf,image/*" className="hidden" onChange={(event) => {
                          if (event.target.files) void uploadFile(event.target.files)
                          event.currentTarget.value = ''
                        }} />
                      </div>

                      {selectedItem.pdfUrl ? (
                        <div className="overflow-hidden rounded-xl border bg-card">
                          {isPdfUrl(selectedItem.pdfUrl) ? (
                            <iframe src={`${adminPreviewUrl(selectedItem.pdfUrl)}#toolbar=0&navpanes=0&page=1`} title={`${selectedItem.title} önizleme`} className="h-72 w-full" />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={adminPreviewUrl(selectedItem.pdfUrl)} alt={`${selectedItem.title} önizleme`} className="h-72 w-full object-cover" />
                          )}
                          <div className="flex items-center justify-between border-t px-3 py-2 text-xs">
                            <span className="truncate text-muted-foreground">{selectedItem.pdfUrl}</span>
                            <a href={adminPreviewUrl(selectedItem.pdfUrl)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary">
                              Aç
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Henüz dosya seçilmedi.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alt Bilgi</h3>
                    <textarea value={store.features.join('\n')} onChange={(e) => patchStore({ features: splitLines(e.target.value) })} rows={6} className="cms-textarea" placeholder="Özellikler (satır satır)" />
                    <textarea value={store.footerNote} onChange={(e) => patchStore({ footerNote: e.target.value })} rows={2} className="cms-textarea" placeholder="Alt not" />
                  </div>

                  <div className="border-t pt-4">
                    <button onClick={() => requestDelete(selectedItem.id, selectedItem.title)} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
                      <Trash2 className="h-4 w-4" />
                      Bu Belgeyi Sil
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
        title="Dosya Seç"
        acceptTypes={['document', 'image']}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          patchItem({ pdfUrl: url })
          setShowMediaPicker(false)
        }}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Belge Silinsin mi?"
        description={
          <>
            <span className="font-medium text-foreground">{deleteTarget?.title}</span> adlı belgeyi kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Belgeyi Sil"
        cancelLabel="Vazgeç"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
