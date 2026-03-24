'use client'

import Image from 'next/image'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

type Logo = {
  src: string
  alt: string
  label?: string
  width?: number
  height?: number
}

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[]
}

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  if (logos.length === 0) return null

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-muted/70 via-background to-muted/70 py-4 ${className ?? ''}`}
      {...props}
    >
      <InfiniteSlider
        gap={20}
        reverse
        duration={36}
        durationOnHover={120}
        className="marquee-mask px-5 md:px-7"
      >
        {logos.map((logo, index) => (
          <article
            key={`logo-${logo.alt}-${index}`}
            className="pointer-events-none select-none flex min-h-[70px] items-center gap-3 rounded-xl border border-border/65 bg-card/90 px-4 py-3 shadow-sm md:min-h-[76px] md:gap-4 md:px-5"
          >
            <div className="relative h-9 w-14 shrink-0 overflow-hidden rounded-md bg-muted/50 md:h-10 md:w-16">
              <Image
                src={logo.src || '/placeholder.svg'}
                alt={logo.alt}
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </div>
            <p className="line-clamp-1 text-sm font-semibold text-foreground md:text-base">
              {logo.label || logo.alt}
            </p>
          </article>
        ))}
      </InfiniteSlider>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-muted/95 via-muted/65 to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-muted/95 via-muted/65 to-transparent md:w-32" />

      <ProgressiveBlur
        blurIntensity={1.2}
        className="pointer-events-none absolute top-0 left-0 h-full w-20 md:w-32"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1.2}
        className="pointer-events-none absolute top-0 right-0 h-full w-20 md:w-32"
        direction="right"
      />
    </div>
  )
}
