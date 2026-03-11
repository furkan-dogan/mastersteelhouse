const services = [
  'Hafif Çelik Yapı',
  'Çelik Villa',
  'Çelik Konstrüksiyon',
  'Ticari Yapılar',
  'Ofis Binaları',
  'Eğitim Yapıları',
]

export function FooterServicesLinks() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6 relative inline-block">
        Hizmetlerimiz
        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
      </h3>
      <ul className="space-y-3">
        {services.map((service) => (
          <li key={service} className="group">
            <a
              href="#services"
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-2 inline-flex items-center gap-2 transition-all"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              {service}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
