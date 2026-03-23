import { ProcessHeroPage } from '@/components/process-hero-page'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Şantiye ve Montaj',
  description: 'Sahada hızlı, güvenli ve kontrollü montaj uygulama süreci.',
  path: '/proje-sureci/santiye-ve-montaj',
})

export default function SantiyeVeMontaj() {
  return (
    <ProcessHeroPage
      title="Şantiye ve Montaj"
      description="Profesyonel ekibimizle hızlı ve güvenli montaj"
      imageSrc="/process-assembly.jpg"
      imageAlt="Şantiye ve Montaj"
      sectionClassName="bg-muted/30"
    />
  )
}
