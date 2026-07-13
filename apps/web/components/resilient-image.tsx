'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

type ResilientImageProps = ImageProps & {
  fallbackSrc?: ImageProps['src']
}

export function ResilientImage({
  src,
  fallbackSrc = '/placeholder.svg',
  onError,
  ...props
}: ResilientImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps['src'] | null>(null)
  const currentSrc = !src || failedSrc === src ? fallbackSrc : src

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) setFailedSrc(src)
        onError?.(event)
      }}
    />
  )
}
