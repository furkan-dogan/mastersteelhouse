import { LegalPage } from '@/components/legal-page'

export const metadata = {
  title: 'Gizlilik Politikası | Çelik Yapı',
  description: 'Web sitesi gizlilik politikası.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Gizlilik Politikası">
      <p>
        Bu politika, web sitemizi kullanırken paylaştığınız bilgilerin toplanması, kullanılması ve korunmasına ilişkin esasları
        açıklar.
      </p>
      <h2 className="text-lg font-semibold text-foreground">1. Toplanan Bilgiler</h2>
      <p>İletişim formu verileri ve temel teknik erişim kayıtları.</p>
      <h2 className="text-lg font-semibold text-foreground">2. Kullanım Amaçları</h2>
      <p>İletişim taleplerine dönüş, hizmet geliştirme ve yasal yükümlülüklerin yerine getirilmesi.</p>
      <h2 className="text-lg font-semibold text-foreground">3. Güvenlik</h2>
      <p>Verileriniz yetkisiz erişime karşı makul teknik ve idari önlemlerle korunur.</p>
    </LegalPage>
  )
}
