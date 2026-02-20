'use client'

import type { VideoItem, VideosStore } from '@/lib/videos-store'

type VideosEditorFormProps = {
  store: VideosStore
  selectedItem: VideoItem
  onPatchStore: (updater: (prev: VideosStore) => VideosStore) => void
  onPatchItem: (update: Partial<VideoItem>) => void
  onRequestDelete: () => void
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

export function VideosEditorForm({
  store,
  selectedItem,
  onPatchStore,
  onPatchItem,
  onRequestDelete,
}: VideosEditorFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Üst Alan</h3>
        <input
          value={store.hero.title}
          onChange={(e) => onPatchStore((prev) => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
          className="cms-input"
          placeholder="Sayfa başlığı"
        />
        <textarea
          value={store.hero.description}
          onChange={(e) =>
            onPatchStore((prev) => ({
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
            onChange={(e) => onPatchItem({ title: e.target.value })}
            className="cms-input"
            placeholder="Başlık"
          />
          <input
            value={selectedItem.youtubeUrl}
            onChange={(e) => onPatchItem({ youtubeUrl: e.target.value })}
            className="cms-input"
            placeholder="YouTube Linki"
          />
        </div>

        <textarea
          value={selectedItem.description}
          onChange={(e) => onPatchItem({ description: e.target.value })}
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
        <button onClick={onRequestDelete} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
          Bu Videoyu Sil
        </button>
      </div>
    </div>
  )
}
