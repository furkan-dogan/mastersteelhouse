import { LegalPage } from '@/components/legal-page'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'KVKK',
  description: 'Kişisel verilerin korunmasına ilişkin aydınlatma metni.',
  path: '/kvkk',
})

export default function KvkkPage() {
  return (
    <LegalPage title="KVKK Aydınlatma Metni">
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
        KVKK kapsamında verilerinize erişme, düzeltme, silme ve itiraz etme haklarına sahipsiniz. Taleplerinizi iletişim
        kanallarımızdan iletebilirsiniz.
      </p>
    </LegalPage>
  )
}
