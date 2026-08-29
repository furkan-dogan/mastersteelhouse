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
            className={`group rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/60 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="w-11 h-11 rounded-md border border-border flex items-center justify-center mb-4">
              <Icon className={`w-5 h-5 ${info.iconColorClass}`} />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1 group-hover:text-accent transition-colors">{info.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
            <div className="space-y-1">
              {info.lines.map((line) => (
                <p key={line} className="text-sm text-foreground/80">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
