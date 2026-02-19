'use client'

import { useMemo, useRef, useState } from 'react'
import { normalizeMediaPlacement, type MediaPlacement } from '@/lib/media-placement'
import { adminPreviewUrl } from '@/lib/media-preview-url'

type PreviewVariant = {
  label: string
  aspect: string
}

type Props = {
  src: string
  value?: Partial<MediaPlacement> | null
  onChange: (next: MediaPlacement) => void
  variants: PreviewVariant[]
}

function placementStyle(placement: MediaPlacement) {
  return {
    objectFit: placement.fit,
    objectPosition: `${placement.x}% ${placement.y}%`,
    transform: `scale(${placement.zoom / 100})`,
    transformOrigin: `${placement.x}% ${placement.y}%`,
  } as const
}

export function MediaPlacementEditor({ src, value, onChange, variants }: Props) {
  const [dragging, setDragging] = useState(false)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const placement = useMemo(() => normalizeMediaPlacement(value), [value])

  function updateFromPointer(clientX: number, clientY: number) {
    const rect = editorRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    onChange(
      normalizeMediaPlacement({
        ...placement,
        x,
        y,
      })
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-3 rounded-xl border border-border bg-card p-3">
      <div
        ref={editorRef}
        className="relative max-h-[360px] overflow-hidden rounded-lg border border-border bg-muted/20"
        style={{ aspectRatio: variants[0]?.aspect || '16 / 9', cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={(event) => {
          setDragging(true)
          ;(event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId)
          updateFromPointer(event.clientX, event.clientY)
        }}
        onPointerMove={(event) => {
          if (!dragging) return
          updateFromPointer(event.clientX, event.clientY)
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={adminPreviewUrl(src)}
          alt="Görsel yerleşim editörü"
          className="absolute inset-0 block h-full w-full"
          style={placementStyle(placement)}
        />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-black/50 shadow"
            style={{ left: `${placement.x}%`, top: `${placement.y}%` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.2))]" />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-[120px_1fr_auto]">
        <select
          value={placement.fit}
          onChange={(event) => onChange(normalizeMediaPlacement({ ...placement, fit: event.target.value as MediaPlacement['fit'] }))}
          className="cms-input h-9"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
        </select>
        <div className="flex items-center gap-2 rounded-lg border bg-card px-2">
          <span className="text-xs text-muted-foreground">Zoom</span>
          <input
            type="range"
            min={100}
            max={220}
            step={1}
            value={placement.zoom}
            onChange={(event) =>
              onChange(normalizeMediaPlacement({ ...placement, zoom: Number(event.target.value) }))
            }
            className="w-full"
          />
          <span className="w-10 text-right text-xs font-medium">{placement.zoom}%</span>
        </div>
        <button
          type="button"
          onClick={() => onChange(normalizeMediaPlacement(undefined))}
          className="cms-btn-ghost h-9 px-3 py-1 text-xs"
        >
          Sıfırla
        </button>
      </div>

      {variants.length > 1 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {variants.map((variant) => (
            <div key={variant.label} className="rounded-lg border border-border bg-muted/10 p-2">
              <p className="mb-1 text-[11px] font-medium text-muted-foreground">{variant.label}</p>
              <div className="overflow-hidden rounded border border-border bg-muted/20" style={{ aspectRatio: variant.aspect }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={adminPreviewUrl(src)}
                  alt={variant.label}
                  className="block h-full w-full"
                  style={placementStyle(placement)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
