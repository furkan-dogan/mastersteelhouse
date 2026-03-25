import 'server-only'

import type { DocumentsStore } from '@/lib/documents-types'
import { normalizeCmsMediaUrl } from '@/lib/cms-fetch'
import { createCmsStoreValidator, mapStoreItems, readCmsStore } from '@/lib/cms-store'

const isDocumentsStore = createCmsStoreValidator({
  stringPaths: ['hero.title'],
  arrayPaths: ['items', 'features'],
}) as (value: unknown) => value is DocumentsStore

export async function getDocumentsContent(): Promise<DocumentsStore> {
  const store = await readCmsStore<DocumentsStore>({
    r2Key: '_cms/documents-cms.json',
    devApiPath: '/api/public/documents',
    localFileName: 'documents-cms.json',
    validate: isDocumentsStore,
  })

  return mapStoreItems<DocumentsStore, DocumentsStore['items'][number]>(store, (item) => ({
    ...item,
    pdfUrl: normalizeCmsMediaUrl(item.pdfUrl),
  }))
}
