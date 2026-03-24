import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2, writeJsonToR2 } from '@/lib/r2-storage'

export type ReferenceItem = {
  id: string
  title: string
  location: string
  categories: string[]
  image: string
  area?: string
}

export type ReferenceStore = {
  items: ReferenceItem[]
}

const WEB_REFERENCES_INDEX_KEY = '_cms/references-cms.json'

function getStorePath() {
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

export async function readReferenceStore(): Promise<ReferenceStore> {
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<ReferenceStore>(WEB_REFERENCES_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.items)) return r2Store

    try {
      const raw = await fs.readFile(getStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as ReferenceStore
      if (fallback && Array.isArray(fallback.items)) return fallback
    } catch {
      // ignore local fallback errors on serverless
    }

    return { items: [] }
  }

  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as ReferenceStore
}

export async function writeReferenceStore(store: ReferenceStore) {
  if (isR2Configured()) {
    await writeJsonToR2(WEB_REFERENCES_INDEX_KEY, store)
    return
  }

  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
