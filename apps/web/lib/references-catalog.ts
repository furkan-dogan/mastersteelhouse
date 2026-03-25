import 'server-only'

import type { ReferenceItem } from '@/lib/reference-types'
import { createCmsStoreValidator, readCmsStore } from '@/lib/cms-store'

type ReferenceStore = {
  items: ReferenceItem[]
}

const isReferenceStore = createCmsStoreValidator({
  arrayPaths: ['items'],
}) as (value: unknown) => value is ReferenceStore

export async function getReferenceItems(): Promise<ReferenceItem[]> {
  const store = await readCmsStore<ReferenceStore>({
    r2Key: '_cms/references-cms.json',
    devApiPath: '/api/public/references',
    localFileName: 'references-cms.json',
    validate: isReferenceStore,
  })

  return store.items
}
