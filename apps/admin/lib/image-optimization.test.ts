import assert from 'node:assert/strict'
import test from 'node:test'
import sharp from 'sharp'
import { generateThumbnailForImage, meetsMinimumLongEdge, optimizeImageForWeb } from './image-optimization.ts'

async function createImage(
  width: number,
  height: number,
  format: 'jpeg' | 'png' | 'webp'
) {
  const image = sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 47, g: 126, b: 181 },
    },
  })

  if (format === 'jpeg') return image.jpeg({ quality: 96 }).toBuffer()
  if (format === 'png') return image.png().toBuffer()
  return image.webp({ quality: 90 }).toBuffer()
}

test('keeps a compliant WebP master byte-for-byte to avoid a second lossy encode', async () => {
  const source = await createImage(2400, 1600, 'webp')
  const result = await optimizeImageForWeb({
    source,
    mimeType: 'image/webp',
    extension: '.webp',
  })

  assert.equal(result.mimeType, 'image/webp')
  assert.equal(result.extension, '.webp')
  assert.equal(result.width, 2400)
  assert.equal(result.height, 1600)
  assert.deepEqual(Buffer.from(result.buffer), source)
})

test('limits an oversized photo master to a 3200 px long edge without changing its ratio', async () => {
  const source = await createImage(4000, 2500, 'jpeg')
  const result = await optimizeImageForWeb({
    source,
    mimeType: 'image/jpeg',
    extension: '.jpg',
  })
  const metadata = await sharp(result.buffer).metadata()

  assert.equal(result.mimeType, 'image/webp')
  assert.equal(metadata.width, 3200)
  assert.equal(metadata.height, 2000)
  assert.equal(result.width, 3200)
  assert.equal(result.height, 2000)
})

test('does not enlarge an existing 1024 px product image', async () => {
  const source = await createImage(1024, 1024, 'jpeg')
  const result = await optimizeImageForWeb({
    source,
    mimeType: 'image/jpeg',
    extension: '.jpg',
  })
  const metadata = await sharp(result.buffer).metadata()

  assert.equal(metadata.width, 1024)
  assert.equal(metadata.height, 1024)
})

test('uses a detail-preserving WebP output for PNG plans', async () => {
  const source = await createImage(2200, 1400, 'png')
  const result = await optimizeImageForWeb({
    source,
    mimeType: 'image/png',
    extension: '.png',
  })
  const metadata = await sharp(result.buffer).metadata()

  assert.equal(result.mimeType, 'image/webp')
  assert.equal(metadata.format, 'webp')
  assert.equal(metadata.width, 2200)
  assert.equal(metadata.height, 1400)
})

test('creates a bounded square media-library thumbnail', async () => {
  const source = await createImage(1800, 1200, 'jpeg')
  const result = await generateThumbnailForImage(source)
  const metadata = await sharp(result.buffer).metadata()

  assert.equal(metadata.width, 560)
  assert.equal(metadata.height, 560)
  assert.equal(metadata.format, 'webp')
})

test('rejects undersized product photos using their long edge', () => {
  assert.equal(meetsMinimumLongEdge(1200, 800, 1600), false)
  assert.equal(meetsMinimumLongEdge(1600, 900, 1600), true)
  assert.equal(meetsMinimumLongEdge(1200, 2400, 1600), true)
})
