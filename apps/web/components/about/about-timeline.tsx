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
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Fikir&apos;den Teslim&apos;e <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">5 Adım</span>
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Projelerinizi profesyonel bir süreç yönetimiyle, en yüksek kalite standartlarında hayata geçiriyoruz
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={item.step}
              className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-accent/20 transition-all duration-500">
                    <Image src={item.image || '/placeholder.svg'} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>

                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative p-8 lg:p-12">
                    <div className="absolute -top-4 -left-4 text-9xl font-bold text-accent/5 select-none">{item.step}</div>

                    <div className="relative">
                      <h4 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{item.title}</h4>

                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">{item.description}</p>

                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all duration-1000 ease-out group-hover:w-full"
                          style={{ width: `${((index + 1) / items.length) * 100}%` }}
                        />
                      </div>

                      <div className="mt-3 text-sm font-semibold text-accent">
                        {Math.round(((index + 1) / items.length) * 100)}% Tamamlandı
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {index < items.length - 1 ? (
                <div className="flex justify-center my-8">
                  <div className="w-0.5 h-12 bg-gradient-to-b from-accent/50 to-accent/20" />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
          <p className="text-lg font-semibold text-foreground">Projeniz için detaylı bilgi almak ister misiniz?</p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
          >
            Hemen İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  )
}
