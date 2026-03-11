import 'server-only'

import type { DocumentsStore } from '@/lib/documents-types'
import { normalizeCmsMediaUrl, readCmsJson } from '@/lib/cms-fetch'

function isDocumentsStore(value: unknown): value is DocumentsStore {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as DocumentsStore).hero?.title === 'string' &&
      Array.isArray((value as DocumentsStore).items) &&
      Array.isArray((value as DocumentsStore).features)
  )
}

export async function getDocumentsContent(): Promise<DocumentsStore> {
  const store = await readCmsJson<DocumentsStore>({
    r2Key: '_cms/documents-cms.json',
    devApiPath: '/api/documents',
    localFileName: 'documents-cms.json',
    validate: isDocumentsStore,
  })

  return {
    ...store,
    items: store.items.map((item) => ({
      ...item,
      pdfUrl: normalizeCmsMediaUrl(item.pdfUrl),
    })),
  }
}
