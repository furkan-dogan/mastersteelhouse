export type NavLinkItem = {
  label: string
  href: string
}

export const corporateLinks: NavLinkItem[] = [
  { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
  { label: 'Misyonumuz', href: '/kurumsal/misyonumuz' },
  { label: 'Vizyonumuz', href: '/kurumsal/vizyonumuz' },
]

export const productLinks: NavLinkItem[] = [
  { label: 'Alçıköşe Profili', href: '/urunler/alcikose-profili' },
  { label: 'Kaba Sıva Profili', href: '/urunler/kaba-siva-profili' },
  { label: 'Tavan U-C Profilleri', href: '/urunler/tavan-u-c-profili' },
]

export const mediaLinks: NavLinkItem[] = [
  { label: 'Haberler', href: '/medya/haberler' },
  { label: 'Videolar', href: '/medya/videolar' },
  { label: 'Blog', href: '/medya/blog' },
]

export const desktopPrimaryLinks: NavLinkItem[] = [
  { label: 'Referanslar', href: '/#referanslar' },
  { label: 'İletişim', href: '/#teklif' },
]
