import { Mail, MapPin, Phone } from 'lucide-react'

export function FooterContactInfo() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6 relative inline-block">
        İletişim
        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
      </h3>
      <ul className="space-y-4">
        <li className="group">
          <a
            href="tel:+905000000000"
            className="flex items-start gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="pt-1">
              <div>+90 500 000 00 00</div>
              <div>+90 500 000 00 01</div>
            </div>
          </a>
        </li>
        <li className="group">
          <a
            href="mailto:info@celikyapi.com"
            className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <span>info@celikyapi.com</span>
          </a>
        </li>
        <li className="group">
          <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="pt-1">Organize Sanayi Bölgesi, 1. Cadde No: 15, Ankara/Türkiye</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
