export type MediaFitMode = 'cover' | 'contain'

export type MediaPlacement = {
  fit: MediaFitMode
  x: number
  y: number
  zoom: number
}

const DEFAULT_PLACEMENT: MediaPlacement = {
  fit: 'cover',
  x: 50,
  y: 50,
  zoom: 100,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function parseObjectPosition(value?: string): { x: number; y: number } | null {
  if (!value) return null
  const tokens = value.trim().split(/\s+/)
  if (tokens.length < 2) return null

  const xRaw = Number(tokens[0].replace('%', ''))
  const yRaw = Number(tokens[1].replace('%', ''))
  if (!Number.isFinite(xRaw) || !Number.isFinite(yRaw)) return null

  return {
    x: clamp(xRaw, 0, 100),
    y: clamp(yRaw, 0, 100),
  }
}

export function normalizeMediaPlacement(
  value?: Partial<MediaPlacement> | null,
  legacyObjectPosition?: string
): MediaPlacement {
  const parsed = parseObjectPosition(legacyObjectPosition)
  return {
    fit: value?.fit === 'contain' ? 'contain' : 'cover',
    x: clamp(Number(value?.x ?? parsed?.x ?? DEFAULT_PLACEMENT.x), 0, 100),
    y: clamp(Number(value?.y ?? parsed?.y ?? DEFAULT_PLACEMENT.y), 0, 100),
    zoom: clamp(Number(value?.zoom ?? DEFAULT_PLACEMENT.zoom), 100, 220),
  }
}

export function placementToObjectPosition(value?: Partial<MediaPlacement> | null) {
  const placement = normalizeMediaPlacement(value)
  return `${placement.x}% ${placement.y}%`
}
