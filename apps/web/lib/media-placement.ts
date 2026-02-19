import type { CSSProperties } from 'react'

export type MediaPlacement = {
  fit?: 'cover' | 'contain'
  x?: number
  y?: number
  zoom?: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function parseObjectPosition(value?: string): { x: number; y: number } | null {
  if (!value) return null
  const parts = value.trim().split(/\s+/)
  if (parts.length < 2) return null

  const x = Number(parts[0].replace('%', ''))
  const y = Number(parts[1].replace('%', ''))
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null

  return {
    x: clamp(x, 0, 100),
    y: clamp(y, 0, 100),
  }
}

export function normalizeMediaPlacement(
  placement?: MediaPlacement,
  legacyObjectPosition?: string
): Required<MediaPlacement> {
  const legacy = parseObjectPosition(legacyObjectPosition)
  return {
    fit: placement?.fit === 'contain' ? 'contain' : 'cover',
    x: clamp(Number(placement?.x ?? legacy?.x ?? 50), 0, 100),
    y: clamp(Number(placement?.y ?? legacy?.y ?? 50), 0, 100),
    zoom: clamp(Number(placement?.zoom ?? 100), 100, 220),
  }
}

export function mediaPlacementImageStyle(
  placement?: MediaPlacement,
  legacyObjectPosition?: string
): CSSProperties {
  const normalized = normalizeMediaPlacement(placement, legacyObjectPosition)
  return {
    objectFit: normalized.fit,
    objectPosition: `${normalized.x}% ${normalized.y}%`,
    transform: `scale(${normalized.zoom / 100})`,
    transformOrigin: `${normalized.x}% ${normalized.y}%`,
  }
}
