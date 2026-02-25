import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata = {
  title: 'KVKK | Master Steel House Profil',
}

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f1] pt-20">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">KVKK Aydınlatma Metni</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
          <p>
            Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında; iletişim formu üzerinden ilettiğiniz kişisel verilerin
            hangi amaçlarla işlendiği, kimlere aktarılabileceği ve haklarınız hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">1. İşlenen Veriler</h2>
          <p>Ad soyad, telefon numarası, e-posta (opsiyonel), konu ve mesaj içeriği.</p>
          <h2 className="text-lg font-semibold text-slate-900">2. İşleme Amaçları</h2>
          <p>
            Teklif talebinizin değerlendirilmesi, sizinle iletişim kurulması, ürün/hizmet süreçlerinin yürütülmesi ve yasal yükümlülüklerin
            yerine getirilmesi.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">3. Hukuki Sebep</h2>
          <p>
            Açık rızanız, bir sözleşmenin kurulması/ifa edilmesiyle doğrudan ilgili olması ve veri sorumlusunun meşru menfaatleri kapsamında
            veriler işlenebilir.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">4. Haklarınız</h2>
          <p>
            KVKK madde 11 kapsamında verilerinizle ilgili bilgi talep etme, düzeltme, silme, işleme itiraz etme ve zararın giderilmesini talep
            etme haklarına sahipsiniz.
          </p>
          <p>
            Başvuru ve talepleriniz için iletişim sayfasındaki kanallar üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
