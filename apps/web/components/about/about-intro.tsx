export function AboutIntro() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-20">
      <div className="inline-block mb-4">
        <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 animate-pulse">
          Hakkımızda
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
        Çelik Yapıda{' '}
        <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">20 Yılın Tecrübesi</span>
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
        Yıllardır çelik yapı sektöründe lider konumdayız. Modern teknoloji ve uzman ekibimizle projelerinizi hayata
        geçiriyoruz.
      </p>
    </div>
  )
}
