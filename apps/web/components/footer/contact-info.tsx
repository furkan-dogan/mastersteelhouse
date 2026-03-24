import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_WORKING_HOURS,
  toTelHref,
} from '@/lib/contact-details'

export function FooterContactInfo() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6 relative inline-block">
        İletişim
        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
      </h3>
      <ul className="space-y-4">
        <li className="group">
          <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="pt-1 space-y-1">
              {CONTACT_PHONES.map((phone) => (
                <a
                  key={phone}
                  href={toTelHref(phone)}
                  className="block hover:text-primary-foreground transition-colors"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </li>
        <li className="group">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <span>{CONTACT_EMAIL}</span>
          </a>
        </li>
        <li className="group">
          <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="pt-1">{CONTACT_ADDRESS}</span>
          </div>
        </li>
        <li className="group">
          <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <div className="pt-1">
              {CONTACT_WORKING_HOURS.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
