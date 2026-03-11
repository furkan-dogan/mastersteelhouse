export type SocialIconKey = 'facebook' | 'instagram' | 'x' | 'youtube'

export type SocialLink = {
  key: SocialIconKey
  label: string
  href: string
  hoverColorClass: string
}

export const socialLinks: SocialLink[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/mastersteelhous/',
    hoverColorClass: 'hover:bg-blue-500',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/mastersteelhouse',
    hoverColorClass: 'hover:bg-pink-500',
  },
  {
    key: 'x',
    label: 'X',
    href: 'https://x.com/mastersteelhous',
    hoverColorClass: 'hover:bg-sky-500',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@mastersteelhouse',
    hoverColorClass: 'hover:bg-red-600',
  },
]

export type ContactInfoIconKey = 'phone' | 'mail' | 'map-pin' | 'clock'

export type ContactInfoItem = {
  icon: ContactInfoIconKey
  title: string
  description: string
  lines: string[]
  colorClass: string
  iconColorClass: string
}

export const contactInfoItems: ContactInfoItem[] = [
  {
    icon: 'phone',
    title: 'Telefon',
    description: '7/24 Destek Hattı',
    lines: ['+90 500 000 00 00', '+90 500 000 00 01'],
    colorClass: 'from-blue-500/20 to-blue-600/20',
    iconColorClass: 'text-blue-500',
  },
  {
    icon: 'mail',
    title: 'E-posta',
    description: 'Hızlı İletişim',
    lines: ['info@celikyapi.com', 'proje@celikyapi.com'],
    colorClass: 'from-green-500/20 to-green-600/20',
    iconColorClass: 'text-green-500',
  },
  {
    icon: 'map-pin',
    title: 'Adres',
    description: 'Merkez Ofis',
    lines: ['Organize Sanayi Bölgesi', '1. Cadde No: 15, Ankara/Türkiye'],
    colorClass: 'from-purple-500/20 to-purple-600/20',
    iconColorClass: 'text-purple-500',
  },
  {
    icon: 'clock',
    title: 'Çalışma Saatleri',
    description: 'Hafta İçi',
    lines: ['Pazartesi - Cuma: 08:00 - 18:00', 'Cumartesi: 09:00 - 14:00'],
    colorClass: 'from-orange-500/20 to-orange-600/20',
    iconColorClass: 'text-orange-500',
  },
]
