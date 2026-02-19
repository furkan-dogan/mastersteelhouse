import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

export type MediaItem = {
  id: string
  name: string
  type: 'image' | 'video' | 'document'
  mimeType: string
  size: number
  url: string
  createdAt: string
}

export type MediaStore = {
  items: MediaItem[]
}

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
  const storePath = resolveStorePath()
  if (!existsSync(storePath)) {
    await fs.writeFile(storePath, '{\n  "items": []\n}\n', 'utf8')
  }
  await fs.mkdir(resolveUploadsDir(), { recursive: true })
}

export async function readMediaStore(): Promise<MediaStore> {
  await ensureMediaStorage()
  const raw = await fs.readFile(resolveStorePath(), 'utf8')
  return JSON.parse(raw) as MediaStore
}

export async function writeMediaStore(store: MediaStore) {
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

export function inferMediaType(mimeType: string): MediaItem['type'] | null {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType === 'application/pdf') return 'document'
  return null
}
