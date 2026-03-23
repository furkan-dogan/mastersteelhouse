import { getReferenceItems } from '@/lib/references-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { buildPageMetadata } from '@/lib/seo'
import { ReferencesClient } from './references-client'

export const metadata = buildPageMetadata({
  title: 'Referanslarımız',
  description: 'Tamamladığımız çelik yapı projelerimizi ve farklı ölçeklerdeki uygulama referanslarımızı inceleyin.',
  path: '/referanslar',
})

export default async function ReferencesPage() {
  const references = await getReferenceItems()

  return (
    <SitePageShell>
      <ReferencesClient references={references} />
    </SitePageShell>
  )
}
