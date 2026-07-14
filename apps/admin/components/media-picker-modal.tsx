'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Image as ImageIcon, Video, FileText, X } from 'lucide-react'
import type { MediaItem } from '@/lib/media-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'

type Props = {
  open: boolean
  title?: string
  onClose: () => void
  onSelect: (url: string) => void
  acceptTypes?: MediaItem['type'][]
  endpoint?: string
  minimumLongEdge?: number
}

export function MediaPickerModal({
  open,
  title = 'Medyadan Sec',
  onClose,
  onSelect,
  acceptTypes,
  endpoint,
  minimumLongEdge,
}: Props) {
  const pathname = usePathname()
  const resolvedEndpoint = endpoint ?? (pathname.startsWith('/profil-cms') ? '/api/profile/media' : '/api/media')

  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [pendingSelection, setPendingSelection] = useState<MediaItem | null>(null)

  useEffect(() => {
    if (!open) return

    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const response = await fetch(resolvedEndpoint, { cache: 'no-store' })
        if (!response.ok) return
        const data = (await response.json()) as { items: MediaItem[] }
        if (active) setItems(data.items)
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [open, resolvedEndpoint])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = acceptTypes?.length ? items.filter((item) => acceptTypes.includes(item.type)) : items
    if (!q) return base
    return base.filter((item) => item.name.toLowerCase().includes(q) || item.url.toLowerCase().includes(q))
  }, [items, query, acceptTypes])

  if (!open) return null

  function closeModal() {
    setPendingSelection(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
      <div className="cms-card w-full max-w-5xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button onClick={closeModal} className="cms-btn-ghost h-8 px-2 py-1 text-xs">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b p-4">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="cms-input"
            placeholder="Dosya ara..."
          />
        </div>

        <div className="cms-scroll max-h-[65vh] overflow-y-auto p-4">
          {pendingSelection && (
            <div className="mb-4 rounded-lg border border-warning/40 bg-warning/10 p-3">
              <p className="text-sm font-medium text-foreground">Görsel kalite uyarısı</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {pendingSelection.width && pendingSelection.height
                  ? `${pendingSelection.name} ${pendingSelection.width}×${pendingSelection.height} px. Büyük ekranlarda daha az net görünebilir.`
                  : `${pendingSelection.name} eski bir dosya olduğu için piksel ölçüsü doğrulanamıyor.`}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Dosya kendi doğal çözünürlüğüyle kullanılacak, yapay olarak büyütülmeyecek.</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelect(pendingSelection.url)
                    setPendingSelection(null)
                  }}
                  className="cms-btn-primary h-8 px-3 py-1 text-xs"
                >
                  Yine de kullan
                </button>
                <button type="button" onClick={() => setPendingSelection(null)} className="cms-btn-secondary h-8 px-3 py-1 text-xs">
                  Başka görsel seç
                </button>
              </div>
            </div>
          )}
          {loading ? (
            <p className="text-sm text-muted-foreground">Medya listesi yükleniyor...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">Medya bulunamadı.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => {
                const src = adminPreviewUrl(item.thumbnailUrl || item.url)
                const hasKnownDimensions = Boolean(item.width && item.height)
                const meetsMinimum = item.type !== 'image' || !minimumLongEdge || (
                  hasKnownDimensions && Math.max(item.width ?? 0, item.height ?? 0) >= minimumLongEdge
                )
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (meetsMinimum) onSelect(item.url)
                      else setPendingSelection(item)
                    }}
                    className={`overflow-hidden rounded-lg border text-left transition-colors hover:border-primary ${!meetsMinimum ? 'border-warning/40' : ''}`}
                  >
                    <div className="relative h-36 bg-muted">
                      {item.type === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={item.name} className="h-full w-full object-cover" />
                      ) : item.type === 'document' ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 p-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {item.type === 'image' ? (
                          <ImageIcon className="h-3.5 w-3.5" />
                        ) : item.type === 'document' ? (
                          <FileText className="h-3.5 w-3.5" />
                        ) : (
                          <Video className="h-3.5 w-3.5" />
                        )}
                        <span>{item.type === 'image' ? 'Görsel' : item.type === 'document' ? 'PDF' : 'Video'}</span>
                      </div>
                      <p className="line-clamp-2 text-sm font-medium">{item.name}</p>
                      {item.type === 'image' && hasKnownDimensions ? (
                        <p className={`text-xs ${meetsMinimum ? 'text-muted-foreground' : 'font-medium text-error'}`}>
                          {item.width}×{item.height} px
                          {!meetsMinimum ? ` · Önerilen en az ${minimumLongEdge} px` : ''}
                        </p>
                      ) : minimumLongEdge && item.type === 'image' ? (
                        <p className="text-xs font-medium text-warning">Ölçüsü bilinmeyen eski dosya · Onay gerekli</p>
                      ) : null}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
