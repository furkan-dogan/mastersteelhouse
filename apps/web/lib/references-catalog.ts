import 'server-only'

import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import type { ReferenceItem } from '@/lib/reference-types'

type ReferenceStore = {
  items: ReferenceItem[]
}

function resolveStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'references-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'references-cms.json'),
    path.join(process.cwd(), '..', 'content', 'references-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('references-cms.json not found')
  }

  return found
}

async function readStoreFromR2(): Promise<ReferenceStore | null> {
  const base = (process.env.R2_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ?? '').trim().replace(/\/$/, '')
  if (!base) return null

  try {
    const response = await fetch(`${base}/_cms/references-cms.json?ts=${Date.now()}`, {
      cache: 'no-store',
      next: { revalidate: 60 },
    })

    if (!response.ok) return null
    const json = (await response.json()) as ReferenceStore
    if (!Array.isArray(json.items)) return null
    return json
  } catch {
    return null
  }
}

async function readStoreFromAdminApi(): Promise<ReferenceStore | null> {
  if (process.env.NODE_ENV !== 'development') return null

  const base = (process.env.WEB_DEV_ADMIN_API_BASE ?? 'http://localhost:3002').trim().replace(/\/$/, '')
  try {
    const response = await fetch(`${base}/api/references?ts=${Date.now()}`, { cache: 'no-store' })
    if (!response.ok) return null
    const json = (await response.json()) as ReferenceStore
    if (!Array.isArray(json.items)) return null
    return json
  } catch {
    return null
  }
}

export async function getReferenceItems(): Promise<ReferenceItem[]> {
  const r2Store = await readStoreFromR2()
  if (r2Store) return r2Store.items

  const adminStore = await readStoreFromAdminApi()
  if (adminStore) return adminStore.items

  const raw = await fs.readFile(resolveStorePath(), 'utf8')
  const store = JSON.parse(raw) as ReferenceStore
  return store.items
}
