import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

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
  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as CatalogsStore
}

export async function writeCatalogsStore(store: CatalogsStore) {
  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
