'use client'

import { useEffect, useMemo, useState } from 'react'
import { Image as ImageIcon, Video, FileText, X } from 'lucide-react'
import type { MediaItem } from '@/lib/media-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'

type Props = {
  open: boolean
  title?: string
  onClose: () => void
  onSelect: (url: string) => void
  acceptTypes?: MediaItem['type'][]
}

export function MediaPickerModal({ open, title = 'Medyadan Sec', onClose, onSelect, acceptTypes }: Props) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return

    let active = true
    const load = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/media', { cache: 'no-store' })
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
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = acceptTypes?.length ? items.filter((item) => acceptTypes.includes(item.type)) : items
    if (!q) return base
    return base.filter((item) => item.name.toLowerCase().includes(q) || item.url.toLowerCase().includes(q))
  }, [items, query, acceptTypes])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="cms-card w-full max-w-5xl overflow-hidden" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button onClick={onClose} className="cms-btn-ghost h-8 px-2 py-1 text-xs">
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
          {loading ? (
            <p className="text-sm text-muted-foreground">Medya listesi yükleniyor...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">Medya bulunamadı.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => {
                const src = adminPreviewUrl(item.url)
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.url)}
                    className="overflow-hidden rounded-lg border text-left transition-colors hover:border-primary"
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
                        <span>{item.type === 'image' ? 'Gorsel' : item.type === 'document' ? 'PDF' : 'Video'}</span>
                      </div>
                      <p className="line-clamp-2 text-sm font-medium">{item.name}</p>
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
