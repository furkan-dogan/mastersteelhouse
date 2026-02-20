export type AboutFeature = {
  icon: 'check' | 'trend' | 'users' | 'idea'
  title: string
  description: string
  image: string
}

export type AboutStat = {
  value: string
  label: string
}

export type AboutTimelineItem = {
  step: string
  title: string
  description: string
  image: string
  icon: string
}

export const aboutFeatures: AboutFeature[] = [
  {
    icon: 'check',
    title: 'Kalite Garantisi',
    description: 'Avrupa standartlarında malzeme ve işçilik garantisi sunuyoruz.',
    image: '/quality-assurance.jpg',
  },
  {
    icon: 'trend',
    title: 'Sürekli Gelişim',
    description: 'Sektördeki yenilikleri takip ediyor, teknolojiye yatırım yapıyoruz.',
    image: '/development.jpg',
  },
  {
    icon: 'users',
    title: 'Uzman Ekip',
    description: 'Alanında uzman mühendis ve teknik ekibimizle hizmetinizdeyiz.',
    image: '/expert-team.jpg',
  },
  {
    icon: 'idea',
    title: 'Yenilikçi Çözümler',
    description: 'Her projeye özel, yaratıcı ve modern çözümler üretiyoruz.',
    image: '/innovation.jpg',
  },
]

export const aboutStats: AboutStat[] = [
  { value: '20+', label: 'Yıllık Deneyim' },
  { value: '500+', label: 'Tamamlanan Proje' },
  { value: '50+', label: 'Uzman Personel' },
  { value: '%100', label: 'Müşteri Memnuniyeti' },
]

export const aboutTimeline: AboutTimelineItem[] = [
  {
    step: '01',
    title: 'Danışmanlık',
    description: 'Projenizi dinliyor, ihtiyaçlarınızı analiz ediyor ve size en uygun çözümü sunuyoruz.',
    image: '/process-consulting.jpg',
    icon: '🎯',
  },
  {
    step: '02',
    title: 'Tasarım Süreci',
    description: '3D modelleme ile mimari tasarım ve statik hesaplamalarınızı yapıyoruz.',
    image: '/process-design.jpg',
    icon: '📐',
  },
  {
    step: '03',
    title: 'Üretim Süreci',
    description: 'Modern fabrikamızda CNC teknolojisi ile hassas üretim gerçekleştiriyoruz.',
    image: '/process-production.jpg',
    icon: '⚙️',
  },
  {
    step: '04',
    title: 'Şantiye Ve Montaj Aşaması',
    description: 'Deneyimli montaj ekibimiz ile sahada hızlı ve güvenli kurulum yapıyoruz.',
    image: '/process-assembly.jpg',
    icon: '🏗️',
  },
  {
    step: '05',
    title: 'Lojistik Ve Sevkiyat Süreci',
    description: 'Özel araçlarımızla güvenli taşıma ve zamanında teslimat garantisi veriyoruz.',
    image: '/process-logistics.jpg',
    icon: '🚚',
  },
]
