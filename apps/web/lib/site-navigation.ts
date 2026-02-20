export type NavLinkItem = {
  label: string
  href: string
}

export type NavGroup = {
  title: string
  links: NavLinkItem[]
}

export type ProductFlowItem = {
  title: string
  href: string
  image: string
}

export const corporateLinks: NavLinkItem[] = [
  { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
  { label: 'Misyonumuz', href: '/kurumsal/misyonumuz' },
  { label: 'Vizyonumuz', href: '/kurumsal/vizyonumuz' },
  { label: 'Belgelerimiz', href: '/kurumsal/belgelerimiz' },
]

export const productNavGroups: NavGroup[] = [
  {
    title: 'Konut Çözümleri',
    links: [
      { label: 'Tek Katlı Villa Çözümleri', href: '/urunler/tek-katli-celik-villalar' },
      { label: 'Çok Katlı Villa Çözümleri', href: '/urunler/cok-katli-celik-villalar' },
      { label: 'Loft Konsept Villalar', href: '/urunler/teony-house' },
    ],
  },
  {
    title: 'Ticari & Kurumsal',
    links: [
      { label: 'Ofis ve Yönetim Binaları', href: '/urunler/ofis-yapilari' },
      { label: 'Mağaza ve Ticari Alanlar', href: '/urunler/ticari-yapilar' },
      { label: 'Eğitim ve Sosyal Tesisler', href: '/urunler/egitim-yapilari' },
    ],
  },
]

export const productFlowItems: ProductFlowItem[] = [
  {
    title: 'TEK KATLI VILLA ÇÖZÜMLERİ',
    href: '/urunler/tek-katli-celik-villalar',
    image: '/project-1.jpg',
  },
  {
    title: 'ÇOK KATLI VILLA ÇÖZÜMLERİ',
    href: '/urunler/cok-katli-celik-villalar',
    image: '/multi-story-villa.jpg',
  },
  {
    title: 'LOFT KONSEPT VILLALAR',
    href: '/urunler/teony-house',
    image: '/loft-villa.jpg',
  },
  {
    title: 'OFİS VE YÖNETİM BİNALARI',
    href: '/urunler/ofis-yapilari',
    image: '/office-building.jpg',
  },
  {
    title: 'MAĞAZA VE TİCARİ ALANLAR',
    href: '/urunler/ticari-yapilar',
    image: '/project-2.jpg',
  },
  {
    title: 'EĞİTİM VE SOSYAL TESİSLER',
    href: '/urunler/egitim-yapilari',
    image: '/project-6.jpg',
  },
]

export const mediaLinks: NavLinkItem[] = [
  { label: 'Kataloglar', href: '/medya/kataloglar' },
  { label: 'Haberler', href: '/medya/haberler' },
  { label: 'Videolar', href: '/medya/videolar' },
  { label: 'Blog', href: '/medya/blog' },
]

export const desktopPrimaryLinks: NavLinkItem[] = [
  { label: 'Referanslar', href: '/referanslar' },
  { label: 'İletişim', href: '/iletisim' },
]

export const mobilePrimaryLinks: NavLinkItem[] = [
  { label: 'Referanslar', href: '/referanslar' },
  { label: 'Üretim', href: '/uretim/celik-yapi-uretim' },
  { label: 'Proje Süreci', href: '/proje-sureci/tasarim-sureci' },
  { label: 'İletişim', href: '/iletisim' },
]
