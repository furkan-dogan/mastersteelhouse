export function FooterBottomBar() {
  return (
    <div className="border-t border-primary-foreground/10 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
        <p>© 2025 Çelik Yapı. Tüm hakları saklıdır.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary-foreground transition-colors relative group">
            Gizlilik Politikası
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
          </a>
          <a href="#" className="hover:text-primary-foreground transition-colors relative group">
            Kullanım Koşulları
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
          </a>
        </div>
      </div>
    </div>
  )
}
