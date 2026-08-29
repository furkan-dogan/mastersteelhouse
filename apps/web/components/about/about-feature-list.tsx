import { CheckCircle2, Lightbulb, TrendingUp, Users2 } from 'lucide-react'
import type { AboutFeature } from '@/lib/content/about-content'

const featureIconMap = {
  check: CheckCircle2,
  trend: TrendingUp,
  users: Users2,
  idea: Lightbulb,
} as const

type AboutFeatureListProps = {
  isVisible: boolean
  features: AboutFeature[]
  activeFeature: number
  onHoverFeature: (index: number) => void
}

export function AboutFeatureList({ isVisible, features, activeFeature, onHoverFeature }: AboutFeatureListProps) {
  return (
    <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
      <div className="divide-y divide-border/60 border-t border-border/60">
        {features.map((feature, index) => {
          const Icon = featureIconMap[feature.icon]
          const isHovered = activeFeature === index

          return (
            <div
              key={feature.title}
              onMouseEnter={() => onHoverFeature(index)}
              className="flex items-start gap-5 py-6"
            >
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
                  isHovered ? 'border-accent/50 text-accent' : 'border-border/60 text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <div className="mb-1 flex items-baseline gap-3">
                  <span className="text-xs font-medium text-muted-foreground/60">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className={`text-xl font-semibold transition-colors duration-300 ${isHovered ? 'text-accent' : 'text-foreground'}`}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
