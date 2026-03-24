import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2, writeJsonToR2 } from '@/lib/r2-storage'

export type DocumentItem = {
  id: string
  title: string
  subtitle?: string
  description: string
  pdfUrl: string
}

export type DocumentsStore = {
  hero: {
    badge: string
    title: string
    titleAccent: string
    description: string
  }
  items: DocumentItem[]
  features: string[]
  footerNote: string
}

const WEB_DOCUMENTS_INDEX_KEY = '_cms/documents-cms.json'

function getStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'documents-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'documents-cms.json'),
    path.join(process.cwd(), '..', 'content', 'documents-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('documents-cms.json not found')
  }

  return found
}

export async function readDocumentsStore(): Promise<DocumentsStore> {
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<DocumentsStore>(WEB_DOCUMENTS_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.items) && Array.isArray(r2Store.features) && r2Store.hero && typeof r2Store.hero.title === 'string') {
      return r2Store
    }

    try {
      const raw = await fs.readFile(getStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as DocumentsStore
      if (fallback && Array.isArray(fallback.items) && Array.isArray(fallback.features) && fallback.hero && typeof fallback.hero.title === 'string') {
        return fallback
      }
    } catch {
      // ignore local fallback errors on serverless
    }

    return {
      hero: { badge: '', title: '', titleAccent: '', description: '' },
      items: [],
      features: [],
      footerNote: '',
    }
  }

  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as DocumentsStore
}

export async function writeDocumentsStore(store: DocumentsStore) {
  if (isR2Configured()) {
    await writeJsonToR2(WEB_DOCUMENTS_INDEX_KEY, store)
  }

  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
