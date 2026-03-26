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
    <div className={`lg:sticky lg:top-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
      <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="https://cdn.coverr.co/videos/coverr-steel-construction-site-9893/1080p.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 transition-opacity duration-700">
          <Image src={feature.image || '/placeholder.svg'} alt={feature.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl">
          <div className="grid grid-cols-2 gap-4">
            {stats.slice(0, 2).map((stat, index) => (
              <div key={stat.label} className="text-center transition-all duration-700">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-1 font-mono">{countedStats.includes(index) ? stat.value : '0'}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-accent/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
    </div>
  )
}
