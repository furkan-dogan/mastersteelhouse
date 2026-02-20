export type HeroSlide = {
  id: number
  image: string
  badge: string
  title: [string, string, string]
  description: string
  cta: string
  highlight: string
  features: string[]
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: '/hero-slide-1.jpg',
    badge: '20+ Yıllık Deneyim',
    title: ['Gücü ve Estetiği', 'Buluşturan', 'Çelik Yapılar'],
    description:
      'Modern mimari ve çelik konstrüksiyonun mükemmel birleşimi. Hayalinizdeki lüks villayı depreme dayanıklı çelik yapı ile inşa edin.',
    cta: 'Villa Projelerimiz',
    highlight: 'Konut Projeleri',
    features: ['Lüks Tasarım', 'Deprem Güvenli', 'Hızlı Teslim'],
  },
  {
    id: 2,
    image: '/hero-slide-2.jpg',
    badge: 'Profesyonel Montaj',
    title: ['Güvenilir ve Hızlı', 'Çelik Yapı', 'Çözümleri'],
    description:
      'ISO standartlarında üretim ve profesyonel montaj hizmetleri. Projelerinizi zamanında ve kaliteli şekilde teslim ediyoruz.',
    cta: 'Hizmetlerimizi Keşfedin',
    highlight: 'Kurumsal Çözümler',
    features: ['ISO 9001', 'Uzman Ekip', '7/24 Destek'],
  },
  {
    id: 3,
    image: '/hero-slide-3.jpg',
    badge: 'Ticari Yapılar',
    title: ['Modern ve Fonksiyonel', 'Ticari', 'Binalar'],
    description:
      'Ofis binaları, showroom ve ticari tesisler için özel çelik konstrüksiyon çözümleri. Enerji verimliliği ve estetik bir arada.',
    cta: 'Ticari Projeler',
    highlight: 'İş Dünyasına Özel',
    features: ['Enerji Tasarrufu', 'Geniş Açıklık', 'Esnek Tasarım'],
  },
  {
    id: 4,
    image: '/hero-slide-4.jpg',
    badge: 'Kalite ve Güvenilirlik',
    title: ['Mükemmel İşçilik', 'En Kaliteli', 'Malzemeler'],
    description:
      'Her detayda mükemmellik. Galvanizli çelik, sertifikalı malzemeler ve uzman işçilikle 50 yıl garanti veriyoruz.',
    cta: 'Kalitemizi Görün',
    highlight: '50 Yıl Garanti',
    features: ['TSE Belgeli', 'CE Sertifikalı', 'Kalite Kontrol'],
  },
]
