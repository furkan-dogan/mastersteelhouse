import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { socialLinks } from '@/lib/site-settings'

const socialIconMap = {
  facebook: Facebook,
  instagram: Instagram,
  x: Twitter,
  youtube: Youtube,
} as const

const socialGradientMap = {
  facebook: 'from-blue-600 to-blue-700',
  instagram: 'from-pink-500 to-purple-600',
  x: 'from-sky-400 to-sky-600',
  youtube: 'from-red-600 to-red-700',
} as const

type SocialStripProps = {
  isPastHero: boolean
}

export function SocialStrip({ isPastHero }: SocialStripProps) {
  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
      <div className="relative group">
        <div
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-6 ${
            isPastHero
              ? 'bg-gradient-to-br from-accent to-accent/80 border-accent/40 shadow-xl shadow-accent/30'
              : 'bg-gradient-to-br from-accent/90 to-accent backdrop-blur-xl border-accent-foreground/20 shadow-2xl shadow-accent/50'
          }`}
        >
          <span className="text-[10px] font-bold text-primary tracking-wider [writing-mode:vertical-lr] rotate-180">TAKİP</span>
        </div>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="bg-accent text-primary px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl">Bizi Takip Edin!</div>
        </div>
      </div>

      <div className={`w-0.5 h-6 mx-auto transition-colors duration-300 ${
        isPastHero ? 'bg-gradient-to-b from-black/40 via-black/20 to-transparent' : 'bg-gradient-to-b from-accent/60 via-accent/30 to-transparent'
      }`} />

      {socialLinks.map((social, index) => {
        const Icon = socialIconMap[social.key]
        const gradient = socialGradientMap[social.key]
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl overflow-hidden ${
                isPastHero ? 'border border-black/20' : 'border border-white/25'
              }`}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-95`} />
              <div className="absolute inset-0 rounded-xl bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 transition-colors duration-300 group-hover:ring-white/45" />
              <Icon className="relative z-10 w-5 h-5 text-white transition-all duration-300 group-hover:scale-110" />
            </div>

            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl border ${isPastHero ? 'bg-card text-foreground border-border' : 'bg-background text-foreground border-border'}`}>
                {social.label}
              </div>
            </div>

            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${gradient} blur-md opacity-45 transition-all duration-500 group-hover:opacity-70 group-hover:blur-lg -z-10`} />
          </a>
        )
      })}

      <div className={`w-0.5 h-6 mx-auto transition-colors duration-300 ${
        isPastHero ? 'bg-gradient-to-t from-black/40 via-black/20 to-transparent' : 'bg-gradient-to-t from-accent/60 via-accent/30 to-transparent'
      }`} />

      <div className="flex flex-col gap-1.5 items-center">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-300 ${isPastHero ? 'bg-black/35' : 'bg-accent/40'}`}
            style={{ animationDelay: `${dot * 200}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
