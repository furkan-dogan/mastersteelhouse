const quickLinks = [
  { name: 'Hakkımızda', href: '#about' },
  { name: 'Hizmetlerimiz', href: '#services' },
  { name: 'Projelerimiz', href: '#projects' },
  { name: 'İletişim', href: '#contact' },
]

export function FooterQuickLinks() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6 relative inline-block">
        Hızlı Linkler
        <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
      </h3>
      <ul className="space-y-3">
        {quickLinks.map((link) => (
          <li key={link.name} className="group">
            <a
              href={link.href}
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-2 inline-flex items-center gap-2 transition-all"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
