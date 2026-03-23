import { ProcessHeroPage } from '@/components/process-hero-page'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Lojistik ve Sevkiyat',
  description: 'Yapı elemanlarının planlı lojistik yönetimi ve zamanında sevkiyat süreçleri.',
  path: '/proje-sureci/lojistik-ve-sevkiyat',
})

export default function LojistikVeSevkiyat() {
  return (
    <ProcessHeroPage
      title="Lojistik ve Sevkiyat"
      description="Güvenli taşıma ve zamanında teslimat garantisi"
      imageSrc="/process-logistics.jpg"
      imageAlt="Lojistik ve Sevkiyat"
    />
  )
}
