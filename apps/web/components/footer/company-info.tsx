'use client'

import { useState } from 'react'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { socialLinks } from '@/lib/site-settings'

const socialIconMap = {
  facebook: Facebook,
  instagram: Instagram,
  x: Twitter,
  youtube: Youtube,
} as const

export function FooterCompanyInfo() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="group">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform">
            <span className="text-accent-foreground font-bold text-xl">ÇY</span>
          </div>
          <span className="text-2xl font-bold font-mono">ÇELİK YAPI</span>
        </div>
        <p className="text-primary-foreground/80 text-sm leading-relaxed">
          20+ yıllık tecrübemizle çelik yapı sektöründe güvenilir çözümler sunuyoruz. Kalite, güvenlik ve müşteri
          memnuniyeti önceliğimizdir.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-primary-foreground/90">Bizi Takip Edin</h4>
        <div className="flex gap-3">
          {socialLinks.map((social) => {
            const Icon = socialIconMap[social.key]
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative w-11 h-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center transition-all duration-300 ${social.hoverColorClass} hover:scale-110 hover:shadow-lg group`}
                aria-label={social.label}
                onMouseEnter={() => setHoveredSocial(social.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Icon className="w-5 h-5 relative z-10" />
                {hoveredSocial === social.label ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                ) : null}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
