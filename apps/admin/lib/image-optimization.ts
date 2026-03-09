import sharp from 'sharp'

export type OptimizedImageResult = {
  buffer: Uint8Array
  mimeType: string
  extension: string
}

type OptimizeParams = {
  source: Buffer | Uint8Array
  mimeType: string
  extension: string
}

const IMAGE_MAX_WIDTH = 1920
const IMAGE_MAX_HEIGHT = 1920
const IMAGE_QUALITY = 78

const THUMB_MAX_WIDTH = 560
const THUMB_MAX_HEIGHT = 560
const THUMB_QUALITY = 68

function toUint8Array(input: Buffer | Uint8Array) {
  return input instanceof Uint8Array ? input : new Uint8Array(input)
}

export async function optimizeImageForWeb({ source, mimeType, extension }: OptimizeParams): Promise<OptimizedImageResult> {
  const isGif = mimeType === 'image/gif' || extension.toLowerCase() === '.gif'
  if (isGif) {
    return {
      buffer: toUint8Array(source),
      mimeType,
      extension,
    }
  }

  const pipeline = sharp(source, { failOn: 'none' }).rotate().resize({
    width: IMAGE_MAX_WIDTH,
    height: IMAGE_MAX_HEIGHT,
    fit: 'inside',
    withoutEnlargement: true,
  })

  const output = await pipeline
    .webp({
      quality: IMAGE_QUALITY,
      effort: 4,
    })
    .toBuffer()

  return {
    buffer: new Uint8Array(output),
    mimeType: 'image/webp',
    extension: '.webp',
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

  return {
    buffer: new Uint8Array(output),
    mimeType: 'image/webp',
    extension: '.webp',
  }
}
