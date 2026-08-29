'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
        <Link href="/" className="mb-4 inline-flex items-center">
          <Image
            src="/logolongwhite.png"
            alt="Master Steel House Logo"
            width={280}
            height={70}
            className="h-12 w-auto transition-transform group-hover:scale-[1.02]"
            priority={false}
          />
        </Link>
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
                className={`relative w-10 h-10 rounded-md border border-primary-foreground/15 flex items-center justify-center transition-colors duration-200 ${social.hoverColorClass} group`}
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
