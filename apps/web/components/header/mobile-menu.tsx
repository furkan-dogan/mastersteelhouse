import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type { NavLinkItem } from '@/lib/site-navigation'
import type { DropdownKey, NavGroup } from '@/components/header/types'

const mobileMenuLinkClass =
  'block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all'

type MobileMenuProps = {
  isOpen: boolean
  mobileOpenSection: DropdownKey | null
  onToggleSection: (section: DropdownKey) => void
  onCloseAll: () => void
  corporateLinks: NavLinkItem[]
  productNavGroups: NavGroup[]
  mobilePrimaryLinks: NavLinkItem[]
  mediaLinks: NavLinkItem[]
}

export function MobileMenu({
  isOpen,
  mobileOpenSection,
  onToggleSection,
  onCloseAll,
  corporateLinks,
  productNavGroups,
  mobilePrimaryLinks,
  mediaLinks,
}: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="lg:hidden border-t border-border/50 bg-background/98 backdrop-blur-2xl">
      <div className="container mx-auto px-4 py-6 space-y-2">
        {(
          [
            { key: 'kurumsal' as const, label: 'Kurumsal', links: corporateLinks },
            {
              key: 'urunler' as const,
              label: 'Ürünler',
              links: productNavGroups.flatMap((group) => group.links),
            },
          ] as const
        ).map((group) => (
          <div key={group.key}>
            <button
              onClick={() => onToggleSection(group.key)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
            >
              <span>{group.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenSection === group.key ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpenSection === group.key ? (
              <div className="pl-4 pr-2 space-y-1">
                {group.links.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onCloseAll} className={mobileMenuLinkClass}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        {mobilePrimaryLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseAll}
            target={item.newTab ? '_blank' : undefined}
            rel={item.newTab ? 'noopener noreferrer' : undefined}
            className="block px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
          >
            {item.label}
          </Link>
        ))}

        <button
          onClick={() => onToggleSection('medya')}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
        >
          <span>Medya</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenSection === 'medya' ? 'rotate-180' : ''}`} />
        </button>
        {mobileOpenSection === 'medya' ? (
          <div className="pl-4 pr-2 space-y-1">
            {mediaLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={onCloseAll} className={mobileMenuLinkClass}>
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
