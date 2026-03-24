'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

type InfiniteSliderProps = {
  children: React.ReactNode
  gap?: number
  duration?: number
  durationOnHover?: number
  direction?: 'horizontal' | 'vertical'
  reverse?: boolean
  className?: string
}

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 28,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const isHorizontal = direction === 'horizontal'
  const hasHoverDuration = typeof durationOnHover === 'number'

  const trackStyle = useMemo(
    () =>
      ({
        gap: `${gap}px`,
        flexDirection: isHorizontal ? 'row' : 'column',
        animationName: reverse ? 'marquee-right' : 'marquee-left',
        animationDuration: 'var(--marquee-duration)',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        ['--marquee-gap' as string]: `${gap}px`,
      }) as React.CSSProperties,
    [gap, isHorizontal, reverse]
  )

  const rowStyle = useMemo(
    () =>
      ({
        gap: `${gap}px`,
        flexDirection: isHorizontal ? 'row' : 'column',
      }) as React.CSSProperties,
    [gap, isHorizontal]
  )

  return (
    <div
      className={cn('marquee-hover-zone overflow-hidden', hasHoverDuration && 'marquee-hover-enabled', className)}
      style={
        {
          ['--marquee-duration' as string]: `${duration}s`,
          ...(hasHoverDuration ? { ['--marquee-duration-hover' as string]: `${durationOnHover}s` } : {}),
        } as React.CSSProperties
      }
    >
      <div className="marquee-track flex w-max will-change-transform" style={trackStyle}>
        <div className="flex shrink-0" style={rowStyle}>
          {children}
        </div>
        <div className="flex shrink-0" style={rowStyle} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
