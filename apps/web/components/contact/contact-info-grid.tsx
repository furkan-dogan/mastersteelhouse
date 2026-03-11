import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { contactInfoItems, type ContactInfoIconKey } from '@/lib/site-settings'

const iconMap: Record<ContactInfoIconKey, typeof Phone> = {
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
  clock: Clock,
}

type ContactInfoGridProps = {
  isVisible: boolean
}

export function ContactInfoGrid({ isVisible }: ContactInfoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {contactInfoItems.map((info, index) => {
        const Icon = iconMap[info.icon]
        return (
          <div
            key={info.title}
            className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-700 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${info.colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-7 h-7 ${info.iconColorClass}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{info.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
              <div className="space-y-1">
                {info.lines.map((line) => (
                  <p key={line} className="text-sm text-foreground/80">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          </div>
        )
      })}
    </div>
  )
}
