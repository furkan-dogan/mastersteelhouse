'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  UploadCloud,
  RefreshCw,
  Trash2,
  Image as ImageIcon,
  Video,
  FileText,
  X,
  Search,
} from 'lucide-react'
import type { MediaItem } from '@/lib/media-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { AdminLayout } from '@/components/admin-layout'

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [confirmDeleteItem, setConfirmDeleteItem] = useState<MediaItem | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => item.name.toLowerCase().includes(q) || item.url.toLowerCase().includes(q))
  }, [items, query])

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/media', { cache: 'no-store' })
      if (!response.ok) throw new Error('Medya listesi alınamadı')
      const data = (await response.json()) as { items: MediaItem[] }
      setItems(data.items)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Beklenmeyen hata')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files)
    if (list.length === 0) return

    const formData = new FormData()
    for (const file of list) {
      formData.append('files', file)
    }

    try {
      setUploading(true)
      setError(null)
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })
      const data = (await response.json()) as { items?: MediaItem[]; message?: string }
      if (!response.ok) {
        throw new Error(data.message || 'Yükleme başarısız')
      }
      setMessage(`${data.items?.length ?? list.length} dosya yüklendi.`)
      setTimeout(() => setMessage(null), 2500)
      await load()
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Yükleme hatası')
    } finally {
      setUploading(false)
    }
  }

  async function removeItem(id: string) {
    try {
      setDeletingId(id)
      setError(null)
      const response = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = (await response.json()) as { message?: string }
      if (!response.ok) {
        throw new Error(data.message || 'Silme başarısız')
      }
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Silme hatası')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <AdminLayout
      title="Medya Yönetimi"
      subtitle={`${items.length} dosya`}
      actions={
        <>
          <button onClick={() => void load()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
            <RefreshCw className="h-4 w-4" />
            Yenile
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="cms-btn-primary h-9 px-3 py-1.5 text-sm"
            disabled={uploading}
          >
            <UploadCloud className="h-4 w-4" />
            {uploading ? 'Yükleniyor...' : 'Dosya Yükle'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,application/pdf"
            className="hidden"
            onChange={(event) => {
              if (event.target.files) void uploadFiles(event.target.files)
              event.currentTarget.value = ''
            }}
          />
        </>
      }
    >
      <div className="space-y-4">
        <div
          onDragOver={(event) => {
            event.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragActive(false)
            if (event.dataTransfer.files?.length) {
              void uploadFiles(event.dataTransfer.files)
            }
          }}
          className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border bg-card'
          }`}
        >
          <UploadCloud className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          <p className="text-sm font-medium">Dosyaları buraya sürükleyip bırak</p>
          <p className="mt-1 text-xs text-muted-foreground">
            veya{' '}
            <button onClick={() => fileInputRef.current?.click()} className="underline text-primary">
              bilgisayardan seç
            </button>
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="cms-input !pl-10"
            placeholder="Dosya ara..."
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-lg border border-border bg-card py-16 text-center">
            <ImageIcon className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Henüz dosya yok.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredItems.map((item) => {
              const src = adminPreviewUrl(item.url)
              return (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="relative block aspect-square w-full bg-muted"
                    title="Tam boyut önizleme"
                  >
                    {item.type === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : item.type === 'document' ? (
                      <div className="flex h-full w-full items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Video className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </button>
                  <div className="p-2">
                    <p className="line-clamp-2 text-xs font-medium">{item.name}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">
                        {formatSize(item.size)}
                      </span>
                      <button
                        onClick={() => setConfirmDeleteItem(item)}
                        disabled={deletingId === item.id}
                        className="rounded p-1 text-muted-foreground hover:bg-error/10 hover:text-error group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setPreviewItem(null)}
        >
          <button
            onClick={() => setPreviewItem(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Önizlemeyi kapat"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-h-[90vh] max-w-[95vw]" onClick={(event) => event.stopPropagation()}>
            {previewItem.type === 'image' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={adminPreviewUrl(previewItem.url)}
                alt={previewItem.name}
                className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
              />
            ) : previewItem.type === 'document' ? (
              <iframe
                src={`${adminPreviewUrl(previewItem.url)}#toolbar=1&navpanes=0`}
                title={previewItem.name}
                className="h-[85vh] w-[85vw] rounded-lg bg-white"
              />
            ) : (
              <video
                src={adminPreviewUrl(previewItem.url)}
                controls
                autoPlay
                className="max-h-[90vh] max-w-[95vw] rounded-lg"
              />
            )}
          </div>
        </div>
      )}

      {confirmDeleteItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setConfirmDeleteItem(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-foreground">Dosyayı Sil</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{confirmDeleteItem.name}</span> dosyasını kalıcı olarak silmek istediğinize emin misiniz?
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteItem(null)}
                className="cms-btn-secondary h-9 px-3 py-1.5 text-sm"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={async () => {
                  const id = confirmDeleteItem.id
                  setConfirmDeleteItem(null)
                  await removeItem(id)
                }}
                className="cms-btn-primary h-9 px-3 py-1.5 text-sm !bg-error !text-white hover:!bg-error/90"
                disabled={deletingId === confirmDeleteItem.id}
              >
                {deletingId === confirmDeleteItem.id ? 'Siliniyor...' : 'Evet, Sil'}
              </button>
            </div>
          </div>
        </div>
      )}

      {(error || message) && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${
            error ? 'border-error/30 bg-error/10' : 'border-[var(--success)]/30 bg-[var(--success)]/10'
          }`}
        >
          {error ? (
            <p className="text-sm font-medium text-error">{error}</p>
          ) : (
            <p className="text-sm font-medium text-[var(--success)]">{message}</p>
          )}
        </div>
      )}
    </AdminLayout>
  )
}
