import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { buildProfileMetadata } from '@/lib/seo'

export const metadata = buildProfileMetadata({
  title: 'Gizlilik Politikası',
  description: 'Master Steel House Profil Sistemleri gizlilik politikası.',
  path: '/gizlilik-politikasi',
  robots: { index: true, follow: true },
})

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f1] pt-20">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-6 py-12 outline-none lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Gizlilik Politikası</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
          <p>
            Bu politika, web sitemizi ziyaret ettiğinizde ve iletişim formunu kullandığınızda paylaştığınız bilgilerin nasıl toplandığını,
            kullanıldığını ve korunduğunu açıklar.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">1. Toplanan Bilgiler</h2>
          <p>İletişim formunda paylaştığınız bilgiler ve temel teknik erişim kayıtları (IP, tarih/saat gibi).</p>
          <h2 className="text-lg font-semibold text-slate-900">2. Kullanım Amaçları</h2>
          <p>
            Taleplerinize dönüş yapmak, hizmet süreçlerini geliştirmek, operasyonel güvenliği sağlamak ve yasal yükümlülükleri yerine getirmek.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">3. Veri Güvenliği</h2>
          <p>
            Verileriniz yetkisiz erişime karşı makul teknik ve idari önlemlerle korunur. Üçüncü taraf servisler (ör. form altyapısı) yalnızca
            hizmetin sağlanması amacıyla kullanılır.
          </p>
          <h2 className="text-lg font-semibold text-slate-900">4. İletişim</h2>
          <p>Gizlilikle ilgili sorularınız için iletişim sayfasındaki kanallardan bize ulaşabilirsiniz.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
