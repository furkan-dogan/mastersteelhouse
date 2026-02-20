'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { createEditorRowId } from '@/lib/editor-utils'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { CmsPageActions } from '@/components/ui/cms-page-actions'
import { CmsListToolbar } from '@/components/ui/cms-list-toolbar'
import { TablePagination } from '@/components/ui/table'
import { DocumentsEditorForm } from '@/components/documents-editor-form'
import type { DocumentsStore, DocumentItem } from '@/lib/documents-store'
import { useConfirmDelete } from '@/lib/use-confirm-delete'
import { usePagination } from '@/lib/use-pagination'

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

function isPdfUrl(url: string) {
  const value = url.split('?')[0].toLowerCase()
  return value.endsWith('.pdf')
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

  const { page, totalPages, pagedItems, setPage, resetPage, pageSize } = usePagination(filteredItems, 10)

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

  const { deleteTarget, requestDelete, closeDeleteDialog, confirmDelete } = useConfirmDelete<string>(deleteById)

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
          <CmsPageActions
            saving={saving}
            createLabel="Yeni Belge"
            onRefresh={() => void loadStore()}
            onSave={() => void saveStore()}
            onCreate={addItem}
          />
        }
      >
        <section className="cms-card overflow-hidden">
          <CmsListToolbar
            searchValue={search}
            searchPlaceholder="Belge ara..."
            onSearchChange={(value) => {
              setSearch(value)
              resetPage()
            }}
          />

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
                  pagedItems.map((item) => (
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
                        <CmsRowActions
                          onPreview={() => openEditor(item.id)}
                          onEdit={() => openEditor(item.id)}
                          onDelete={() => requestDelete(item.id, item.title)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <TablePagination
            page={page}
            totalPages={totalPages}
            totalItems={filteredItems.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </section>
      </AdminLayout>

      {editorOpen && selectedItem && (
        <CmsEditorDrawer
          open={editorOpen}
          title={selectedItem.title}
          subtitle="Belge Düzenle"
          saving={saving}
          onSave={() => void saveStore()}
          onClose={() => setEditorOpen(false)}
        >
          <DocumentsEditorForm
            store={store}
            selectedItem={selectedItem}
            uploadingFile={uploadingPdf}
            fileInputRef={fileInputRef}
            onPatchStore={patchStore}
            onPatchItem={patchItem}
            onUploadFile={uploadFile}
            onOpenMediaPicker={() => setShowMediaPicker(true)}
            onRequestDelete={() => requestDelete(selectedItem.id, selectedItem.title)}
          />
        </CmsEditorDrawer>
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
            <span className="font-medium text-foreground">{deleteTarget?.label}</span> adlı belgeyi kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Belgeyi Sil"
        cancelLabel="Vazgeç"
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
