import path from 'path'

const HEIC_EXTENSIONS = new Set(['.heic', '.heif'])
const HEIC_MIME_TYPES = new Set(['image/heic', 'image/heif'])

export function isHeicLikeFile(fileName: string, mimeType?: string) {
  const ext = path.extname(fileName).toLowerCase()
  const byExtension = HEIC_EXTENSIONS.has(ext)
  const byMime = Boolean(mimeType && HEIC_MIME_TYPES.has(mimeType.toLowerCase()))
  return byExtension || byMime
}

export async function convertHeicToJpeg(input: Buffer) {
  const heicConvertModule = await import('heic-convert')
  const heicConvert = (heicConvertModule as { default?: unknown }).default ?? heicConvertModule

  const output = await (heicConvert as (params: {
    buffer: Buffer
    format: 'JPEG'
    quality: number
  }) => Promise<Buffer | Uint8Array>)({
    buffer: input,
    format: 'JPEG',
    quality: 0.92,
  })

  return Buffer.isBuffer(output) ? output : Buffer.from(output)
}
