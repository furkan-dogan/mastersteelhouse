export type NavLinkItem = {
  label: string
  href: string
}

export const corporateLinks: NavLinkItem[] = [
  { label: 'Hakkımızda', href: '/#kurumsal' },
  { label: 'Üretim Yaklaşımı', href: '/#referanslar' },
  { label: 'Proje Süreci', href: '/#proje-sureci' },
  { label: 'Teklif', href: '/#teklif' },
]

export const productLinks: NavLinkItem[] = [
  { label: 'Alçıköşe Profili', href: '/urunler/alcikose-profili' },
  { label: 'Kaba Sıva Profili', href: '/urunler/kaba-siva-profili' },
  { label: 'Tavan U-C Profilleri', href: '/urunler/tavan-u-c-profili' },
]

export const mediaLinks: NavLinkItem[] = [
  { label: 'Uygulama Alanları', href: '/#referanslar' },
  { label: 'Proje Akışı', href: '/#proje-sureci' },
  { label: 'Teklif ve İletişim', href: '/#teklif' },
]

export const desktopPrimaryLinks: NavLinkItem[] = [
  { label: 'Referanslar', href: '/#referanslar' },
  { label: 'İletişim', href: '/#teklif' },
]
