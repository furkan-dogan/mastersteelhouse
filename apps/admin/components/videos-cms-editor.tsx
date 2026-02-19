'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Eye,
  FileVideo,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { createEditorRowId } from '@/lib/editor-utils'
import type { VideoItem, VideosStore } from '@/lib/videos-store'

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

function extractYouTubeId(input: string) {
  const value = input.trim()
  if (!value) return ''

  try {
    const url = new URL(value)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean)[0] ?? ''
    }
    if (url.hostname.includes('youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v') ?? ''
      if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2] ?? ''
      if (url.pathname.startsWith('/embed/')) return url.pathname.split('/')[2] ?? ''
    }
  } catch {
    return ''
  }

  return ''
}

function toYouTubeEmbedUrl(input: string) {
  const id = extractYouTubeId(input)
  if (!id) return ''
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
}

function toYouTubeThumbnailUrl(input: string) {
  const id = extractYouTubeId(input)
  if (!id) return ''
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function isYouTubeShortUrl(input: string) {
  const value = input.trim()
  if (!value) return false
  try {
    const url = new URL(value)
    return url.hostname.includes('youtube.com') && url.pathname.startsWith('/shorts/')
  } catch {
    return false
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

  function removeItem() {
    if (!selectedItem) return
    setStore((prev) => {
      const nextItems = prev.items.filter((item) => item.id !== selectedItem.id)
      setSelectedId(nextItems[0]?.id ?? '')
      if (nextItems.length === 0) {
        setEditorOpen(false)
      }
      return { ...prev, items: nextItems }
    })
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
              Yeni Video
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
                  placeholder="Video ara..."
                  className="cms-input !pl-10"
                />
              </label>
              <select
                value={formatFilter}
                onChange={(event) => setFormatFilter(event.target.value as 'all' | 'landscape' | 'portrait')}
                className="cms-input"
              >
                <option value="all">Tüm Formatlar</option>
                <option value="landscape">Yatay Video</option>
                <option value="portrait">Dikey / Shorts</option>
              </select>
            </div>
          </div>

          <div className="cms-scroll overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="w-[58%] px-4 py-3 text-left font-medium">Video</th>
                  <th className="hidden w-[14%] px-4 py-3 text-left font-medium md:table-cell">Format</th>
                  <th className="hidden w-[18%] px-4 py-3 text-left font-medium lg:table-cell">Link</th>
                  <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Video bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const thumbUrl = toYouTubeThumbnailUrl(item.youtubeUrl)
                    const isPortrait = isYouTubeShortUrl(item.youtubeUrl)
                    return (
                      <tr key={item.id} className="border-t align-middle hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                              {thumbUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={thumbUrl} alt={`${item.title} küçük önizleme`} className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Yok</div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">{item.title}</p>
                              <p className="hidden truncate text-xs text-muted-foreground md:block">
                                {item.description || 'Açıklama girilmemiş'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span className="inline-flex rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground">
                            {isPortrait ? 'Dikey' : 'Yatay'}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                          <span className="line-clamp-2 break-all">{item.youtubeUrl || '-'}</span>
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
                              onClick={() => deleteById(item.id)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-red-300/60 bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 md:h-8 md:w-8"
                              title="Sil"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
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
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Video Düzenle</p>
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
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Üst Alan</h3>
                    <input
                      value={store.hero.title}
                      onChange={(e) => setStore((prev) => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                      className="cms-input"
                      placeholder="Sayfa başlığı"
                    />
                    <textarea
                      value={store.hero.description}
                      onChange={(e) =>
                        setStore((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, description: e.target.value },
                        }))
                      }
                      rows={2}
                      className="cms-textarea"
                      placeholder="Sayfa açıklaması"
                    />
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Video Detayı</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        value={selectedItem.title}
                        onChange={(e) => patchItem({ title: e.target.value })}
                        className="cms-input"
                        placeholder="Başlık"
                      />
                      <input
                        value={selectedItem.youtubeUrl}
                        onChange={(e) => patchItem({ youtubeUrl: e.target.value })}
                        className="cms-input"
                        placeholder="YouTube Linki"
                      />
                    </div>

                    <textarea
                      value={selectedItem.description}
                      onChange={(e) => patchItem({ description: e.target.value })}
                      rows={3}
                      className="cms-textarea"
                      placeholder="Açıklama"
                    />

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">YouTube Önizleme</label>
                      <div className="rounded-xl border bg-card p-3">
                        {toYouTubeEmbedUrl(selectedItem.youtubeUrl) ? (
                          <iframe
                            src={toYouTubeEmbedUrl(selectedItem.youtubeUrl)}
                            title={`${selectedItem.title} YouTube önizleme`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className={`${
                              isYouTubeShortUrl(selectedItem.youtubeUrl)
                                ? 'mx-auto w-full max-w-[320px] aspect-[9/16]'
                                : 'w-full aspect-video'
                            } rounded-lg border bg-black`}
                          />
                        ) : (
                          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
                            Geçerli YouTube linki girin
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <button onClick={removeItem} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
                      <Trash2 className="h-4 w-4" />
                      Bu Videoyu Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      <CmsStatusToast error={error} message={message} icon={FileVideo} />
    </>
  )
}
