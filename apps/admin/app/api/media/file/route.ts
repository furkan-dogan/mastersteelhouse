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

function contentTypeFromExt(filePath: string) {
  const extension = path.extname(filePath).toLowerCase()
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
  return contentTypeMap[extension] ?? 'application/octet-stream'
}

function isAllowedExternalUrl(input: string) {
  const base = (process.env.R2_PUBLIC_BASE_URL ?? '').trim().replace(/\/$/, '')
  if (!base) return false
  return input.startsWith(base + '/') || input === base
}

async function proxyExternalUrl(url: string) {
  if (!isAllowedExternalUrl(url)) {
    return NextResponse.json({ message: 'Yetkisiz uzak URL.' }, { status: 403 })
  }

  try {
    const upstream = await fetch(url, { cache: 'no-store' })
    if (!upstream.ok) {
      return NextResponse.json({ message: 'Uzak dosya okunamadı.' }, { status: upstream.status })
    }

    const bytes = new Uint8Array(await upstream.arrayBuffer())
    const contentType = upstream.headers.get('content-type') || contentTypeFromExt(url)

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Failed to proxy media url', error)
    return NextResponse.json({ message: 'Uzak dosya okunamadı.' }, { status: 502 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const externalUrl = searchParams.get('url')?.trim() ?? ''
    if (externalUrl) {
      return await proxyExternalUrl(externalUrl)
    }

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

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentTypeFromExt(absolutePath),
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json({ message: 'Dosya bulunamadı.' }, { status: 404 })
  }
}
