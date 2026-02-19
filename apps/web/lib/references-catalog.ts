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

export async function getReferenceItems(): Promise<ReferenceItem[]> {
  const raw = await fs.readFile(resolveStorePath(), 'utf8')
  const store = JSON.parse(raw) as ReferenceStore
  return store.items
}
