'use client'

import { useEffect, useMemo, useState } from 'react'
import { FileVideo } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsPageActions } from '@/components/ui/cms-page-actions'
import { CmsListToolbar } from '@/components/ui/cms-list-toolbar'
import { createEditorRowId } from '@/lib/editor-utils'
import type { VideoItem, VideosStore } from '@/lib/videos-store'
import { useConfirmDelete } from '@/lib/use-confirm-delete'
import { usePagination } from '@/lib/use-pagination'
import { isYouTubeShortUrl } from '@/lib/youtube-utils'
import { VideosCmsTable } from '@/components/videos-cms-table'
import { VideosEditorDrawer } from '@/components/videos-editor-drawer'

const EMPTY_STORE: VideosStore = {
  hero: {
    title: 'Videolar',
    description: 'Master Steel House projelerinden videolar',
  },
  items: [],
}

function createVideoItem(): VideoItem {
  return {
    id: createEditorRowId('video'),
    title: 'Yeni Video',
    description: '',
    youtubeUrl: '',
  }
}

export function VideosCmsEditor() {
  const [store, setStore] = useState<VideosStore>(EMPTY_STORE)
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [formatFilter, setFormatFilter] = useState<'all' | 'landscape' | 'portrait'>('all')
  const [editorOpen, setEditorOpen] = useState(false)

  const selectedItem = useMemo(
    () => store.items.find((item) => item.id === selectedId) ?? null,
    [store.items, selectedId]
  )

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    return store.items.filter((item) => {
      const isPortrait = isYouTubeShortUrl(item.youtubeUrl)
      const format = isPortrait ? 'portrait' : 'landscape'
      if (formatFilter !== 'all' && format !== formatFilter) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.youtubeUrl.toLowerCase().includes(q)
      )
    })
  }, [store.items, search, formatFilter])

  const { page, totalPages, pagedItems, setPage, resetPage, pageSize } = usePagination(filteredItems, 10)

  useEffect(() => {
    void loadStore()
  }, [])

  async function loadStore() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/videos', { cache: 'no-store' })
      if (!response.ok) throw new Error('Video verisi alınamadı')
      const rawStore = (await response.json()) as VideosStore
      const nextStore: VideosStore = {
        ...rawStore,
        items: rawStore.items.map((item) => {
          const legacyUrl = item.videoUrl ?? ''
          return {
            ...item,
            youtubeUrl: item.youtubeUrl ?? item.videoFileUrl ?? legacyUrl,
          }
        }),
      }
      setStore(nextStore)
      setSelectedId(nextStore.items[0]?.id ?? '')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Beklenmeyen hata')
    } finally {
      setLoading(false)
    }
  }

  function patchItem(update: Partial<VideoItem>) {
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
    const next = createVideoItem()
    setStore((prev) => ({ ...prev, items: [...prev.items, next] }))
    setSelectedId(next.id)
    setEditorOpen(true)
  }

  function deleteById(id: string) {
    setStore((prev) => {
      const nextItems = prev.items.filter((item) => item.id !== id)
      if (selectedId === id) {
        setSelectedId(nextItems[0]?.id ?? '')
        if (nextItems.length === 0) {
          setEditorOpen(false)
        }
      }
      return { ...prev, items: nextItems }
    })
  }

  const { deleteTarget, requestDelete, closeDeleteDialog, confirmDelete } = useConfirmDelete<string>(deleteById)

  async function saveStore() {
    try {
      setSaving(true)
      setError(null)
      setMessage(null)
      const response = await fetch('/api/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      })
      if (!response.ok) throw new Error('Kaydetme başarısız')
      setMessage('Videolar kaydedildi.')
      setTimeout(() => setMessage(null), 2500)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Kaydetme başarısız')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <CmsLoadingState message="Videolar CMS yükleniyor..." />
  }

  if (!store) {
    return <CmsErrorState onRetry={() => void loadStore()} />
  }

  return (
    <>
      <AdminLayout
        title="Videolar"
        subtitle={`${filteredItems.length} video bulundu`}
        actions={
          <CmsPageActions
            saving={saving}
            createLabel="Yeni Video"
            onRefresh={() => void loadStore()}
            onSave={() => void saveStore()}
            onCreate={addItem}
          />
        }
      >
        <section className="cms-card overflow-hidden">
          <CmsListToolbar
            searchValue={search}
            searchPlaceholder="Video ara..."
            onSearchChange={(value) => {
              setSearch(value)
              resetPage()
            }}
            filterValue={formatFilter}
            onFilterChange={(value) => {
              setFormatFilter(value as 'all' | 'landscape' | 'portrait')
              resetPage()
            }}
            filterOptions={[
              { value: 'all', label: 'Tüm Formatlar' },
              { value: 'landscape', label: 'Yatay Video' },
              { value: 'portrait', label: 'Dikey / Shorts' },
            ]}
          />

          <VideosCmsTable
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

      <VideosEditorDrawer
        open={editorOpen}
        saving={saving}
        store={store}
        selectedItem={selectedItem}
        onSave={() => void saveStore()}
        onClose={() => setEditorOpen(false)}
        onPatchStore={(updater) => setStore((prev) => updater(prev))}
        onPatchItem={patchItem}
        onRequestDelete={() => {
          if (!selectedItem) return
          requestDelete(selectedItem.id, selectedItem.title)
        }}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Video Silinsin mi?"
        description={
          <>
            <span className="font-medium text-foreground">{deleteTarget?.label}</span> adlı videoyu kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Videoyu Sil"
        cancelLabel="Vazgeç"
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} icon={FileVideo} />
    </>
  )
}
