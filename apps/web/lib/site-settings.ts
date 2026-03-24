import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_WORKING_HOURS,
} from '@/lib/contact-details'

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
    description: 'Telefon & Email',
    lines: [...CONTACT_PHONES],
    colorClass: 'from-blue-500/20 to-blue-600/20',
    iconColorClass: 'text-blue-500',
  },
  {
    icon: 'mail',
    title: 'E-posta',
    description: 'Hızlı İletişim',
    lines: [CONTACT_EMAIL],
    colorClass: 'from-green-500/20 to-green-600/20',
    iconColorClass: 'text-green-500',
  },
  {
    icon: 'map-pin',
    title: 'Adres',
    description: 'Merkez Ofis',
    lines: [CONTACT_ADDRESS],
    colorClass: 'from-purple-500/20 to-purple-600/20',
    iconColorClass: 'text-purple-500',
  },
  {
    icon: 'clock',
    title: 'Çalışma Saatleri',
    description: 'Haftaiçi & Cumartesi',
    lines: [...CONTACT_WORKING_HOURS],
    colorClass: 'from-orange-500/20 to-orange-600/20',
    iconColorClass: 'text-orange-500',
  },
]
