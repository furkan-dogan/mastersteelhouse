import sharp from 'sharp'

export type OptimizedImageResult = {
  buffer: Uint8Array
  mimeType: string
  extension: string
  width: number
  height: number
}

type OptimizeParams = {
  source: Buffer | Uint8Array
  mimeType: string
  extension: string
}

// Product renders are commonly inspected on high-DPI displays and in a
// full-screen lightbox. Keep a sufficiently large delivery master while still
// bounding uploads for predictable storage and processing costs.
const IMAGE_MAX_WIDTH = 3200
const IMAGE_MAX_HEIGHT = 3200
const IMAGE_QUALITY = 88

const THUMB_MAX_WIDTH = 560
const THUMB_MAX_HEIGHT = 560
const THUMB_QUALITY = 76

function toUint8Array(input: Buffer | Uint8Array) {
  return input instanceof Uint8Array ? input : new Uint8Array(input)
}

export function meetsMinimumLongEdge(width: number, height: number, minimumLongEdge: number) {
  return minimumLongEdge <= 0 || Math.max(width, height) >= minimumLongEdge
}

export async function optimizeImageForWeb({ source, mimeType, extension }: OptimizeParams): Promise<OptimizedImageResult> {
  const isGif = mimeType === 'image/gif' || extension.toLowerCase() === '.gif'
  if (isGif) {
    const metadata = await sharp(source, { failOn: 'none', animated: true }).metadata()
    return {
      buffer: toUint8Array(source),
      mimeType,
      extension,
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
    }
  }

  const normalizedMimeType = mimeType.toLowerCase()
  const normalizedExtension = extension.toLowerCase()
  const isWebp = normalizedMimeType === 'image/webp' || normalizedExtension === '.webp'

  // Large files compressed in the browser are already high-quality WebP
  // masters. Passing compliant WebP through avoids a second lossy encode.
  if (isWebp) {
    const metadata = await sharp(source, { failOn: 'none' }).metadata()
    const width = metadata.width ?? 0
    const height = metadata.height ?? 0
    if (width > 0 && height > 0 && width <= IMAGE_MAX_WIDTH && height <= IMAGE_MAX_HEIGHT) {
      return {
        buffer: toUint8Array(source),
        mimeType: 'image/webp',
        extension: '.webp',
        width,
        height,
      }
    }
  }

  const pipeline = sharp(source, { failOn: 'none' }).rotate().resize({
    width: IMAGE_MAX_WIDTH,
    height: IMAGE_MAX_HEIGHT,
    fit: 'inside',
    withoutEnlargement: true,
  })

  const isPng = normalizedMimeType === 'image/png' || normalizedExtension === '.png'
  const output = await pipeline.webp({
    quality: isPng ? 92 : IMAGE_QUALITY,
    nearLossless: isPng,
    effort: 5,
  }).toBuffer()
  const metadata = await sharp(output, { failOn: 'none' }).metadata()

  return {
    buffer: new Uint8Array(output),
    mimeType: 'image/webp',
    extension: '.webp',
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
  }
}

export async function generateThumbnailForImage(source: Buffer | Uint8Array): Promise<OptimizedImageResult> {
  const output = await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({
      width: THUMB_MAX_WIDTH,
      height: THUMB_MAX_HEIGHT,
      fit: 'cover',
      position: 'centre',
      withoutEnlargement: true,
    })
    .webp({
      quality: THUMB_QUALITY,
      effort: 4,
    })
    .toBuffer()
  const metadata = await sharp(output, { failOn: 'none' }).metadata()

  return {
    buffer: new Uint8Array(output),
    mimeType: 'image/webp',
    extension: '.webp',
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
  }
}
