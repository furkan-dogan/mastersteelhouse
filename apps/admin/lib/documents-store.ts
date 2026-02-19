import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

export type DocumentItem = {
  id: string
  title: string
  subtitle: string
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
  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as DocumentsStore
}

export async function writeDocumentsStore(store: DocumentsStore) {
  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
