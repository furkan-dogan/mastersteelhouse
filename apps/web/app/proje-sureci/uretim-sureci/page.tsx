import { ProcessHeroPage } from '@/components/process-hero-page'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Üretim Süreci',
  description: 'Modern fabrikamızda planlı ve kontrollü üretim süreçlerimiz.',
  path: '/proje-sureci/uretim-sureci',
})

export default function UretimSureci() {
  return (
    <ProcessHeroPage
      title="Üretim Süreci"
      description="Modern fabrikamızda CNC teknolojisi ile hassas üretim"
      imageSrc="/process-production.jpg"
      imageAlt="Üretim Süreci"
    />
  )
}
