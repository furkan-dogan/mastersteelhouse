import 'server-only'

import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import type { DocumentsStore } from '@/lib/documents-types'

function resolveStorePath() {
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

async function readStore(): Promise<DocumentsStore> {
  const filePath = resolveStorePath()
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as DocumentsStore
}

export async function getDocumentsContent(): Promise<DocumentsStore> {
  return readStore()
}
