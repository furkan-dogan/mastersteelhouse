import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import {
  getUploadsDir,
  inferMediaType,
  readMediaStore,
  safeFilename,
  writeMediaStore,
  type MediaItem,
} from '@/lib/profile-media-store'
import { convertHeicToJpeg, isHeicLikeFile } from '@/lib/heic-conversion'
import { collectUsedMediaUrls } from '@/lib/media-usage'
import { generateThumbnailForImage, optimizeImageForWeb } from '@/lib/image-optimization'
import { deleteFromR2PublicUrl, uploadToR2 } from '@/lib/r2-storage'

export const runtime = 'nodejs'

const PROFILE_MEDIA_REFERENCES = [
  'profile-products-cms.json',
  'profile-blog-cms.json',
  'profile-faq-cms.json',
]

function getExtension(filename: string, mimeType: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext) return ext

  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/heic': '.heic',
    'image/heif': '.heif',
    'video/mp4': '.mp4',
    'video/webm': '.webm',
    'video/quicktime': '.mov',
    'application/pdf': '.pdf',
  }

  return map[mimeType] ?? ''
}

export async function GET() {
  try {
    const [store, usedUrls] = await Promise.all([
      readMediaStore(),
      collectUsedMediaUrls(PROFILE_MEDIA_REFERENCES),
    ])

    const items = [...store.items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    return NextResponse.json({ items, usedUrls: Array.from(usedUrls) })
  } catch (error) {
    console.error('Failed to read profile media store', error)
    return NextResponse.json({ message: 'Medya verisi okunamadı.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const entries = formData.getAll('files')
    const files = entries.filter((entry): entry is File => entry instanceof File)

    if (files.length === 0) {
      return NextResponse.json({ message: 'Yüklenecek dosya bulunamadı.' }, { status: 400 })
    }

    const store = await readMediaStore()
    const newItems: MediaItem[] = []

    for (const file of files) {
      const mediaType = inferMediaType(file.type, file.name)
      if (!mediaType) {
        return NextResponse.json(
          { message: `Desteklenmeyen dosya tipi: ${file.name}` },
          { status: 400 }
        )
      }

      const maxSizeBytes =
        mediaType === 'image' ? 20 * 1024 * 1024 : mediaType === 'video' ? 200 * 1024 * 1024 : 30 * 1024 * 1024
      if (file.size > maxSizeBytes) {
        return NextResponse.json(
          { message: `${file.name} boyutu limitin üzerinde.` },
          { status: 400 }
        )
      }

      let mimeType = file.type
      let extension = getExtension(file.name, file.type)
      const sourceBytes: Uint8Array = new Uint8Array(await file.arrayBuffer())
      let outputBytes: Uint8Array = sourceBytes

      if (mediaType === 'image' && isHeicLikeFile(file.name, file.type)) {
        try {
          outputBytes = await convertHeicToJpeg(sourceBytes)
          mimeType = 'image/jpeg'
          extension = '.jpg'
        } catch (error) {
          console.error('Failed to convert HEIC file', error)
          return NextResponse.json(
            { message: 'HEIC görsel dönüştürülemedi. Lütfen JPG/PNG/WebP deneyin.' },
            { status: 400 }
          )
        }
      }

      if (mediaType === 'image') {
        try {
          const optimized = await optimizeImageForWeb({
            source: outputBytes,
            mimeType,
            extension,
          })
          outputBytes = optimized.buffer
          mimeType = optimized.mimeType
          extension = optimized.extension
        } catch (error) {
          console.error('Failed to optimize image', error)
          return NextResponse.json(
            { message: 'Gorsel optimize edilemedi. Lutfen farkli bir dosya deneyin.' },
            { status: 400 }
          )
        }
      }

      const baseName = safeFilename(path.basename(file.name, path.extname(file.name))) || 'media'
      const uniqueSuffix = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
      const baseWithSuffix = `${baseName}-${uniqueSuffix}`
      const fileName = `${baseWithSuffix}${extension}`

      const uploaded = await uploadToR2({
        scope: 'profil',
        fileName,
        bytes: outputBytes,
        contentType: mimeType,
      })

      let thumbnailUrl: string | undefined
      if (mediaType === 'image') {
        try {
          const thumb = await generateThumbnailForImage(outputBytes)
          const thumbUploaded = await uploadToR2({
            scope: 'profil',
            fileName: `${baseWithSuffix}-thumb${thumb.extension}`,
            bytes: thumb.buffer,
            contentType: thumb.mimeType,
          })
          thumbnailUrl = thumbUploaded.url
        } catch (error) {
          console.error('Failed to create/upload profile media thumbnail', error)
        }
      }

      const item: MediaItem = {
        id: `media-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
        name: file.name,
        type: mediaType,
        mimeType,
        size: outputBytes.byteLength,
        url: uploaded.url,
        thumbnailUrl,
        createdAt: new Date().toISOString(),
      }
      newItems.push(item)
    }

    const nextStore = {
      ...store,
      items: [...newItems, ...store.items],
    }

    await writeMediaStore(nextStore)
    return NextResponse.json({ items: newItems })
  } catch (error) {
    console.error('Failed to upload profile media', error)
    return NextResponse.json({ message: 'Dosya yükleme başarısız.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as { id?: string }
    if (!body.id) {
      return NextResponse.json({ message: 'Medya id gerekli.' }, { status: 400 })
    }

    const store = await readMediaStore()
    const target = store.items.find((item) => item.id === body.id)
    if (!target) {
      return NextResponse.json({ message: 'Medya bulunamadı.' }, { status: 404 })
    }

    let deletedFromR2 = false
    try {
      deletedFromR2 = await deleteFromR2PublicUrl(target.url)
      if (target.thumbnailUrl) {
        await deleteFromR2PublicUrl(target.thumbnailUrl)
      }
    } catch (error) {
      console.error('Failed to delete profile media from R2', error)
    }

    if (!deletedFromR2 && target.url.startsWith('/uploads/media/')) {
      const uploadsDir = getUploadsDir()
      const filename = path.basename(target.url)
      const filePath = path.join(uploadsDir, filename)
      try {
        await fs.unlink(filePath)
      } catch {
        // ignore
      }
    }

    await writeMediaStore({
      ...store,
      items: store.items.filter((item) => item.id !== body.id),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to delete profile media', error)
    return NextResponse.json({ message: 'Medya silinemedi.' }, { status: 500 })
  }
}
