import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2, writeJsonToR2 } from '@/lib/r2-storage'

export type MediaItem = {
  id: string
  name: string
  type: 'image' | 'video' | 'document'
  mimeType: string
  size: number
  url: string
  createdAt: string
  thumbnailUrl?: string
  width?: number
  height?: number
}

export type MediaStore = {
  items: MediaItem[]
}

const WEB_MEDIA_INDEX_KEY = '_cms/media-cms.json'

function resolveStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'media-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'media-cms.json'),
    path.join(process.cwd(), '..', 'content', 'media-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('media-cms.json not found')
  }

  return found
}

function resolveUploadsDir() {
  const candidates = [
    path.join(process.cwd(), 'apps', 'web', 'public', 'uploads', 'media'),
    path.join(process.cwd(), '..', 'web', 'public', 'uploads', 'media'),
    path.join(process.cwd(), '..', '..', 'apps', 'web', 'public', 'uploads', 'media'),
  ]

  const found = candidates.find((candidate) => existsSync(path.dirname(path.dirname(candidate))))
  if (!found) {
    throw new Error('web public uploads directory not found')
  }

  return found
}

function resolveWebPublicDir() {
  const candidates = [
    path.join(process.cwd(), 'apps', 'web', 'public'),
    path.join(process.cwd(), '..', 'web', 'public'),
    path.join(process.cwd(), '..', '..', 'apps', 'web', 'public'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('web public directory not found')
  }

  return found
}

export function getUploadsDir() {
  return resolveUploadsDir()
}

export function getWebPublicDir() {
  return resolveWebPublicDir()
}

export async function ensureMediaStorage() {
  if (isR2Configured()) return

  const storePath = resolveStorePath()
  if (!existsSync(storePath)) {
    await fs.writeFile(storePath, '{\n  "items": []\n}\n', 'utf8')
  }
  await fs.mkdir(resolveUploadsDir(), { recursive: true })
}

export async function readMediaStore(): Promise<MediaStore> {
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<MediaStore>(WEB_MEDIA_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.items)) return r2Store

    try {
      const raw = await fs.readFile(resolveStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as MediaStore
      if (fallback && Array.isArray(fallback.items)) return fallback
    } catch {
      // ignore local fallback errors on serverless
    }

    return { items: [] }
  }

  await ensureMediaStorage()
  const raw = await fs.readFile(resolveStorePath(), 'utf8')
  return JSON.parse(raw) as MediaStore
}

export async function writeMediaStore(store: MediaStore) {
  if (isR2Configured()) {
    await writeJsonToR2(WEB_MEDIA_INDEX_KEY, store)
    return
  }

  await ensureMediaStorage()
  await fs.writeFile(resolveStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

export function safeFilename(input: string) {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function inferMediaType(mimeType: string, fileName = ''): MediaItem['type'] | null {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType === 'application/pdf') return 'document'

  const ext = path.extname(fileName).toLowerCase()
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.heif'].includes(ext)) return 'image'
  if (['.mp4', '.webm', '.mov'].includes(ext)) return 'video'
  if (ext === '.pdf') return 'document'

  return null
}
