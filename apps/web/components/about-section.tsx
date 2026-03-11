'use client'

import { useEffect, useRef, useState } from 'react'
import { AboutFeatureList } from '@/components/about/about-feature-list'
import { AboutIntro } from '@/components/about/about-intro'
import { AboutMediaPanel } from '@/components/about/about-media-panel'
import { AboutTimeline } from '@/components/about/about-timeline'
import { aboutFeatures as features, aboutStats as stats, aboutTimeline as timeline } from '@/lib/content/about-content'
import { useRevealOnScroll } from '@/hooks/use-reveal-on-scroll'

export function AboutSection() {
  const [countedStats, setCountedStats] = useState<number[]>([])
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>()

  const displayedFeature = hoveredFeature !== null ? hoveredFeature : 0

  useEffect(() => {
    if (!isVisible) return
    stats.forEach((_, index) => {
      setTimeout(() => {
        setCountedStats((prev) => (prev.includes(index) ? prev : [...prev, index]))
      }, index * 200)
    })
  }, [isVisible])

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (isVideoPlaying) {
      videoRef.current.pause()
    } else {
      void videoRef.current.play()
    }
    setIsVideoPlaying((prev) => !prev)
  }

  return (
    <section id="about" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AboutIntro />

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <AboutMediaPanel
            isVisible={isVisible}
            features={features}
            stats={stats}
            displayedFeatureIndex={displayedFeature}
            countedStats={countedStats}
            isVideoPlaying={isVideoPlaying}
            videoRef={videoRef}
            onToggleVideo={toggleVideo}
          />

          <AboutFeatureList
            isVisible={isVisible}
            features={features}
            hoveredFeature={hoveredFeature}
            onHoverFeature={setHoveredFeature}
          />
        </div>

        <AboutTimeline isVisible={isVisible} items={timeline} />
      </div>
    </section>
  )
}
