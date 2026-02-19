import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { getWebPublicDir } from '@/lib/media-store'

export const runtime = 'nodejs'

function isAllowedPath(input: string) {
  if (!input.startsWith('/')) return false
  if (input.includes('..')) return false
  return true
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const requestedPath = searchParams.get('path') ?? ''

    if (!isAllowedPath(requestedPath)) {
      return NextResponse.json({ message: 'Gecersiz dosya yolu.' }, { status: 400 })
    }

    const webPublicDir = getWebPublicDir()
    const normalized = requestedPath.replace(/^\/+/, '')
    const absolutePath = path.resolve(webPublicDir, normalized)

    if (!absolutePath.startsWith(path.resolve(webPublicDir))) {
      return NextResponse.json({ message: 'Erisim engellendi.' }, { status: 403 })
    }

    const buffer = await fs.readFile(absolutePath)
    const extension = path.extname(absolutePath).toLowerCase()
    const contentTypeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.mov': 'video/quicktime',
      '.pdf': 'application/pdf',
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentTypeMap[extension] ?? 'application/octet-stream',
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json({ message: 'Dosya bulunamadi.' }, { status: 404 })
  }
}
