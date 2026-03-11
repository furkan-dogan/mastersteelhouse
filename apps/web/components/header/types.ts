import type { NavLinkItem } from '@/lib/site-navigation'

export type DropdownKey = 'kurumsal' | 'urunler' | 'medya'

export type NavGroup = {
  title: string
  links: NavLinkItem[]
}
