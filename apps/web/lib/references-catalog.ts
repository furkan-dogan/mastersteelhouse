import 'server-only'

import type { ReferenceItem } from '@/lib/reference-types'
import { readCmsJson } from '@/lib/cms-fetch'

type ReferenceStore = {
  items: ReferenceItem[]
}

function isReferenceStore(value: unknown): value is ReferenceStore {
  return Boolean(
    value &&
      typeof value === 'object' &&
      Array.isArray((value as ReferenceStore).items)
  )
}

export async function getReferenceItems(): Promise<ReferenceItem[]> {
  const store = await readCmsJson<ReferenceStore>({
    r2Key: '_cms/references-cms.json',
    devApiPath: '/api/references',
    localFileName: 'references-cms.json',
    validate: isReferenceStore,
  })

  return store.items
}
