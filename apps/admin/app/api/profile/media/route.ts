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

export const runtime = 'nodejs'

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
    const store = await readMediaStore()
    const items = [...store.items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    return NextResponse.json({ items })
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
    const uploadsDir = getUploadsDir()
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
      const sourceBytes = Buffer.from(await file.arrayBuffer())
      let outputBytes = sourceBytes

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

      const baseName = safeFilename(path.basename(file.name, path.extname(file.name))) || 'media'
      const uniqueSuffix = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
      const fileName = `${baseName}-${uniqueSuffix}${extension}`
      const targetPath = path.join(uploadsDir, fileName)

      await fs.writeFile(targetPath, outputBytes)

      const item: MediaItem = {
        id: `media-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
        name: file.name,
        type: mediaType,
        mimeType,
        size: outputBytes.byteLength,
        url: `/uploads/media/${fileName}`,
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

    const uploadsDir = getUploadsDir()
    const filename = path.basename(target.url)
    const filePath = path.join(uploadsDir, filename)
    try {
      await fs.unlink(filePath)
    } catch {
      // ignore
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
