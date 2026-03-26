import type { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type MediaBannerProps = {
  src: string
  alt: string
  heightClassName?: string
  className?: string
  imageClassName?: string
  overlayClassName?: string
  children?: ReactNode
}

export function MediaBanner({
  src,
  alt,
  heightClassName = 'h-[260px] sm:h-[320px] md:h-[400px]',
  className,
  imageClassName,
  overlayClassName,
  children,
}: MediaBannerProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-3xl', heightClassName, className)}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1180px) 100vw, 1180px" className={cn('object-cover', imageClassName)} />
      {overlayClassName ? <div className={cn('absolute inset-0', overlayClassName)} /> : null}
      {children}
    </div>
  )
}
