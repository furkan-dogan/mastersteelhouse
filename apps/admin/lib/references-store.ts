import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

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
  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as ReferenceStore
}

export async function writeReferenceStore(store: ReferenceStore) {
  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
