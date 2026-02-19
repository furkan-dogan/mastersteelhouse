import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getReferenceItems } from '@/lib/references-catalog'
import { ReferencesClient } from './references-client'

export default async function ReferencesPage() {
  const references = await getReferenceItems()

  return (
    <>
      <Header />
      <ReferencesClient references={references} />
      <Footer />
    </>
  )
}
