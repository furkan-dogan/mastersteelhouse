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
} from '@/lib/media-store'

export const runtime = 'nodejs'

function getExtension(filename: string, mimeType: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext) return ext

  const map: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
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
    console.error('Failed to read media store', error)
    return NextResponse.json({ message: 'Medya verisi okunamadi.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const entries = formData.getAll('files')
    const files = entries.filter((entry): entry is File => entry instanceof File)

    if (files.length === 0) {
      return NextResponse.json({ message: 'Yuklenecek dosya bulunamadi.' }, { status: 400 })
    }

    const store = await readMediaStore()
    const uploadsDir = getUploadsDir()
    const newItems: MediaItem[] = []

    for (const file of files) {
      const mediaType = inferMediaType(file.type)
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
          { message: `${file.name} boyutu limitin uzerinde.` },
          { status: 400 }
        )
      }

      const extension = getExtension(file.name, file.type)
      const baseName = safeFilename(path.basename(file.name, extension)) || 'media'
      const uniqueSuffix = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
      const fileName = `${baseName}-${uniqueSuffix}${extension}`
      const targetPath = path.join(uploadsDir, fileName)

      const bytes = await file.arrayBuffer()
      await fs.writeFile(targetPath, Buffer.from(bytes))

      const item: MediaItem = {
        id: `media-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
        name: file.name,
        type: mediaType,
        mimeType: file.type,
        size: file.size,
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
    console.error('Failed to upload media', error)
    return NextResponse.json({ message: 'Dosya yukleme basarisiz.' }, { status: 500 })
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
      return NextResponse.json({ message: 'Medya bulunamadi.' }, { status: 404 })
    }

    const uploadsDir = getUploadsDir()
    const filename = path.basename(target.url)
    const filePath = path.join(uploadsDir, filename)
    try {
      await fs.unlink(filePath)
    } catch {
      // metadata cleanup should continue even if file is already missing
    }

    await writeMediaStore({
      ...store,
      items: store.items.filter((item) => item.id !== body.id),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to delete media', error)
    return NextResponse.json({ message: 'Medya silinemedi.' }, { status: 500 })
  }
}
