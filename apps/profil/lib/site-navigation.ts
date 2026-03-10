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
  { label: 'Delikli Alçı Köşe Profili', href: '/urunler/delikli-alci-kose-profili' },
  { label: 'Kaba Sıva Profili', href: '/urunler/kaba-siva-profili' },
  { label: 'Tavan U-C Profilleri', href: '/urunler/tavan-u-c-profili' },
]

export const desktopPrimaryLinks: NavLinkItem[] = [
  { label: 'Blog', href: '/medya/blog' },
  { label: 'İletişim', href: '/iletisim' },
]
