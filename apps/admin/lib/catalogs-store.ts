import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2, writeJsonToR2 } from '@/lib/r2-storage'

export type CatalogItem = {
  id: string
  title: string
  pdfUrl: string
}

export type CatalogsStore = {
  hero: {
    title: string
    description: string
  }
  items: CatalogItem[]
}

const WEB_CATALOGS_INDEX_KEY = '_cms/catalogs-cms.json'

function getStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'catalogs-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'catalogs-cms.json'),
    path.join(process.cwd(), '..', 'content', 'catalogs-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('catalogs-cms.json not found')
  }

  return found
}

export async function readCatalogsStore(): Promise<CatalogsStore> {
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<CatalogsStore>(WEB_CATALOGS_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.items) && r2Store.hero && typeof r2Store.hero.title === 'string') return r2Store

    try {
      const raw = await fs.readFile(getStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as CatalogsStore
      if (fallback && Array.isArray(fallback.items) && fallback.hero && typeof fallback.hero.title === 'string') return fallback
    } catch {
      // ignore local fallback errors on serverless
    }

    return {
      hero: { title: '', description: '' },
      items: [],
    }
  }

  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as CatalogsStore
}

export async function writeCatalogsStore(store: CatalogsStore) {
  if (isR2Configured()) {
    await writeJsonToR2(WEB_CATALOGS_INDEX_KEY, store)
  }

  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
