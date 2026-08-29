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
      className={`relative mx-auto w-full overflow-hidden border-y border-border bg-muted/30 py-8 ${className ?? ''}`}
      {...props}
    >
      <InfiniteSlider
        gap={56}
        reverse
        duration={36}
        durationOnHover={120}
        className="marquee-mask px-5 md:px-7"
      >
        {logos.map((logo, index) => (
          <div
            key={`logo-${logo.alt}-${index}`}
            className="pointer-events-none relative h-9 w-28 shrink-0 select-none opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32"
          >
            <Image
              src={logo.src || '/placeholder.svg'}
              alt={logo.alt}
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
        ))}
      </InfiniteSlider>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-muted/30 to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-muted/30 to-transparent md:w-32" />

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
