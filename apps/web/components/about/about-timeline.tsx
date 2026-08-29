import Image from 'next/image'
import Link from 'next/link'
import type { AboutTimelineItem } from '@/lib/content/about-content'

type AboutTimelineProps = {
  isVisible: boolean
  items: AboutTimelineItem[]
}

export function AboutTimeline({ isVisible, items }: AboutTimelineProps) {
  return (
    <div className="mt-32">
      <div className="text-center mb-20">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
          Fikir&apos;den Teslim&apos;e <span className="text-accent">5 Adım</span>
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Projelerinizi profesyonel bir süreç yönetimiyle, en yüksek kalite standartlarında hayata geçiriyoruz
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        {items.map((item, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={item.step}
              className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative h-80 rounded-xl overflow-hidden border border-border shadow-sm">
                    <Image src={item.image || '/placeholder.svg'} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  </div>
                </div>

                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="p-8 lg:p-12">
                    <span className="mb-3 block text-6xl font-semibold text-accent/15">{item.step}</span>
                    <h4 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{item.title}</h4>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>

              {index < items.length - 1 ? (
                <div className="flex justify-center my-4">
                  <div className="h-10 w-px bg-border" />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex flex-col items-center gap-4 rounded-xl border border-border p-8">
          <p className="text-lg font-semibold text-foreground">Projeniz için detaylı bilgi almak ister misiniz?</p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent/90"
          >
            Hemen İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  )
}
