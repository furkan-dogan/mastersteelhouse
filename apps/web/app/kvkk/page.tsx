import { SitePageShell } from '@/components/site-page-shell'

export const metadata = {
  title: 'KVKK | Çelik Yapı',
  description: 'Kişisel verilerin korunmasına ilişkin aydınlatma metni.',
}

export default function KvkkPage() {
  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <section className="container mx-auto px-4 pb-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-8">
            <h1 className="text-3xl font-bold text-foreground">KVKK Aydınlatma Metni</h1>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında; iletişim formu üzerinden paylaştığınız verilerin
                işlenme süreçleri hakkında bilgi vermek amacıyla hazırlanmıştır.
              </p>
              <h2 className="text-lg font-semibold text-foreground">1. İşlenen Veriler</h2>
              <p>Ad soyad, telefon, e-posta (opsiyonel), konu ve mesaj içerikleri.</p>
              <h2 className="text-lg font-semibold text-foreground">2. İşleme Amaçları</h2>
              <p>Talebinize dönüş yapılması, teklif süreçlerinin yürütülmesi ve operasyonel iletişimin sağlanması.</p>
              <h2 className="text-lg font-semibold text-foreground">3. Haklarınız</h2>
              <p>
                KVKK kapsamında verilerinize erişme, düzeltme, silme ve itiraz etme haklarına sahipsiniz. Taleplerinizi iletişim kanallarımızdan
                iletebilirsiniz.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
