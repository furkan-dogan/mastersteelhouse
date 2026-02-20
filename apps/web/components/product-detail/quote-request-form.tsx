import { Button } from '@/components/ui/button'

const inputClassName =
  'h-14 rounded-lg border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40'

export function QuoteRequestForm() {
  return (
    <form className="space-y-5">
      <div className="grid md:grid-cols-3 gap-4">
        <input type="text" placeholder="İsim Soyisim *" className={inputClassName} />
        <input type="email" placeholder="E-Posta Adresi" className={inputClassName} />
        <input type="tel" placeholder="Telefon Numarası *" className={inputClassName} />
      </div>

      <textarea
        rows={7}
        placeholder="Lütfen mesajınızı yazın..."
        className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
      />

      <div className="grid md:grid-cols-[148px_1fr] gap-4 items-center">
        <div
          className="h-14 rounded-lg border border-border flex items-center justify-center text-2xl font-bold tracking-[0.14em] tabular-nums text-foreground"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(220,38,38,0.12) 0px, rgba(220,38,38,0.12) 2px, transparent 2px, transparent 6px)',
          }}
        >
          45808
        </div>
        <input type="text" placeholder="Güvenlik kodunu giriniz. *" className={inputClassName} />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border" />
        <span>
          <strong className="text-foreground">KVKK ve Gizlilik Metni</strong>'ni okudum, anladım ve kabul ediyorum.
        </span>
      </label>

      <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
        Gönder
      </Button>
    </form>
  )
}
