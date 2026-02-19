import 'server-only'

import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import type { CatalogsStore } from '@/lib/catalogs-types'

function resolveStorePath() {
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

export async function getCatalogsContent(): Promise<CatalogsStore> {
  const raw = await fs.readFile(resolveStorePath(), 'utf8')
  return JSON.parse(raw) as CatalogsStore
}
