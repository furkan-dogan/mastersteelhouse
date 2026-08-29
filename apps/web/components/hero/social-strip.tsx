import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { socialLinks } from '@/lib/site-settings'

const socialIconMap = {
  facebook: Facebook,
  instagram: Instagram,
  x: Twitter,
  youtube: Youtube,
} as const

const socialHoverColorMap = {
  facebook: 'group-hover:text-[#1877F2]',
  instagram: 'group-hover:text-[#C13584]',
  x: 'group-hover:text-[#1DA1F2]',
  youtube: 'group-hover:text-[#FF0000]',
} as const

type SocialStripProps = {
  isPastHero: boolean
}

export function SocialStrip({ isPastHero }: SocialStripProps) {
  return (
    <div className="hero-social-strip fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
      {socialLinks.map((social) => {
        const Icon = socialIconMap[social.key]
        const hoverColor = socialHoverColorMap[social.key]
        return (
          <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-200 ${
                isPastHero
                  ? 'border-border bg-background text-foreground/60 hover:border-border'
                  : 'border-white/25 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              <Icon className={`h-4 w-4 transition-colors duration-200 ${hoverColor}`} />
            </div>

            <div className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                {social.label}
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
