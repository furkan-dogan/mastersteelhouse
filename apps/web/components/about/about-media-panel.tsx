import type { RefObject } from 'react'
import Image from 'next/image'
import type { AboutFeature, AboutStat } from '@/lib/content/about-content'

type AboutMediaPanelProps = {
  isVisible: boolean
  features: AboutFeature[]
  stats: AboutStat[]
  displayedFeatureIndex: number
  countedStats: number[]
  videoRef: RefObject<HTMLVideoElement | null>
}

export function AboutMediaPanel({
  isVisible,
  features,
  stats,
  displayedFeatureIndex,
  countedStats,
  videoRef,
}: AboutMediaPanelProps) {
  const feature = features[displayedFeatureIndex]

  return (
    <div className={`lg:sticky lg:top-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
      <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-lg">
        {isVisible ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="https://cdn.coverr.co/videos/coverr-steel-construction-site-9893/1080p.mp4" type="video/mp4" />
          </video>
        ) : null}

        <div className="absolute inset-0 transition-opacity duration-700">
          <Image src={feature.image || '/placeholder.svg'} alt={feature.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-border bg-background/95 p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {stats.slice(0, 2).map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div
                  className={`mb-1 text-3xl font-semibold text-accent transition-opacity duration-500 md:text-4xl ${
                    countedStats.includes(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
