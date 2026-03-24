'use client'

import { cn } from '@/lib/utils'

const gradientByDirection: Record<'top' | 'right' | 'bottom' | 'left', string> = {
  top: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))',
  right: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
  bottom: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
  left: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))',
}

export type ProgressiveBlurProps = React.ComponentProps<'div'> & {
  direction?: 'top' | 'right' | 'bottom' | 'left'
  blurLayers?: number
  blurIntensity?: number
}

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  blurIntensity = 0.25,
  className,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2)

  return (
    <div className={cn('relative', className)} {...props}>
      {Array.from({ length: layers }).map((_, index) => {
        const alpha = (index + 1) / layers
        return (
          <div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              WebkitMaskImage: gradientByDirection[direction],
              maskImage: gradientByDirection[direction],
              backdropFilter: `blur(${(index + 1) * blurIntensity}px)`,
              opacity: alpha,
            }}
          />
        )
      })}
    </div>
  )
}
