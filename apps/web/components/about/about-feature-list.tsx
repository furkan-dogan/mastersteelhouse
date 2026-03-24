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
    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
      <div className="space-y-6">
        {features.map((feature, index) => {
          const Icon = featureIconMap[feature.icon]
          const isHovered = activeFeature === index

          return (
            <div
              key={feature.title}
              onMouseEnter={() => onHoverFeature(index)}
              className={`group transition-all duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            >
              <div
                className={`flex items-start gap-4 p-8 rounded-3xl bg-card border-2 transition-all duration-500 ${
                  isHovered
                    ? 'border-accent/70 shadow-2xl shadow-accent/20'
                    : 'border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center transition-all duration-500 ${
                      isHovered ? 'scale-110 rotate-6 shadow-xl shadow-accent/30' : ''
                    }`}
                  >
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${isHovered ? 'text-accent' : 'text-foreground'}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>

                  <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-700 ${
                        isHovered ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
