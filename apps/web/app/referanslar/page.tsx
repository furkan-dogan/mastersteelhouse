import { getReferenceItems } from '@/lib/references-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { ReferencesClient } from './references-client'

export default async function ReferencesPage() {
  const references = await getReferenceItems()

  return (
    <SitePageShell>
      <ReferencesClient references={references} />
    </SitePageShell>
  )
}
