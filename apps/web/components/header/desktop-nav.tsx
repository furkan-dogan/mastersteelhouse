import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type { NavLinkItem } from '@/lib/site-navigation'
import type { DropdownKey, NavGroup } from '@/components/header/types'

const desktopDropdownPanelClass =
  'absolute top-full left-0 mt-2 bg-background border border-border/60 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150'

const desktopDropdownLinkClass =
  'flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200'

function DropdownList({ links, onClickLink }: { links: NavLinkItem[]; onClickLink: () => void }) {
  return (
    <div className="p-2">
      {links.map((item) => (
        <Link key={item.href} href={item.href} onClick={onClickLink} className={desktopDropdownLinkClass}>
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}

type DesktopNavProps = {
  activeDropdown: DropdownKey | null
  isProductsMenuOpen: boolean
  onMouseEnter: (dropdown: DropdownKey) => void
  onMouseLeave: () => void
  onToggleProductsOverlay: () => void
  onCloseDropdown: () => void
  corporateLinks: NavLinkItem[]
  mediaLinks: NavLinkItem[]
  desktopPrimaryLinks: NavLinkItem[]
  productNavGroups: NavGroup[]
}

export function DesktopNav({
  activeDropdown,
  isProductsMenuOpen,
  onMouseEnter,
  onMouseLeave,
  onToggleProductsOverlay,
  onCloseDropdown,
  corporateLinks,
  mediaLinks,
  desktopPrimaryLinks,
  productNavGroups,
}: DesktopNavProps) {
  return (
    <nav className="hidden lg:flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-muted/40 p-1">
        <div className="relative group/nav" onMouseEnter={() => onMouseEnter('kurumsal')} onMouseLeave={onMouseLeave}>
          <button
            className={`relative px-5 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1.5 ${
              activeDropdown === 'kurumsal'
                ? 'bg-accent text-accent-foreground'
                : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
            }`}
          >
            <span>Kurumsal</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'kurumsal' ? 'rotate-180' : ''}`} />
          </button>
          {activeDropdown === 'kurumsal' ? (
            <div className={`${desktopDropdownPanelClass} w-56`}>
              <DropdownList links={corporateLinks} onClickLink={onCloseDropdown} />
            </div>
          ) : null}
        </div>

        <div className="relative group/nav" onMouseEnter={() => onMouseEnter('urunler')} onMouseLeave={onMouseLeave}>
          <button
            onClick={onToggleProductsOverlay}
            className={`relative px-5 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1.5 ${
              activeDropdown === 'urunler' || isProductsMenuOpen
                ? 'bg-accent text-accent-foreground'
                : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
            }`}
          >
            <span>Ürünler</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                activeDropdown === 'urunler' || isProductsMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {activeDropdown === 'urunler' ? (
            <div className={`${desktopDropdownPanelClass} w-[580px]`}>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {productNavGroups.map((group) => (
                    <div key={group.title} className="space-y-1">
                      <div className="px-3 py-2 text-xs font-bold text-accent uppercase tracking-wider">{group.title}</div>
                      {group.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onCloseDropdown}
                          className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200"
                        >
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {desktopPrimaryLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseDropdown}
            target={item.newTab ? '_blank' : undefined}
            rel={item.newTab ? 'noopener noreferrer' : undefined}
            prefetch={item.newTab ? false : undefined}
            className="relative px-5 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-foreground/70 hover:text-foreground hover:bg-background/80"
          >
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="relative group/nav" onMouseEnter={() => onMouseEnter('medya')} onMouseLeave={onMouseLeave}>
          <button
            className={`relative px-5 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-1.5 ${
              activeDropdown === 'medya'
                ? 'bg-accent text-accent-foreground'
                : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
            }`}
          >
            <span>Medya</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'medya' ? 'rotate-180' : ''}`} />
          </button>
          {activeDropdown === 'medya' ? (
            <div className={`${desktopDropdownPanelClass} w-56`}>
              <DropdownList links={mediaLinks} onClickLink={onCloseDropdown} />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
