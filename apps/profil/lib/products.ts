export type ProfileProduct = {
  slug: string
  name: string
  shortName: string
  heroTitle: string
  subtitle: string
  image: string
  description: string
  useAreas: string[]
  specs: Array<{ key: string; value: string }>
}

export const profileProducts: ProfileProduct[] = [
  {
    slug: 'delikli-alci-kose-profili',
    name: 'Alçıpan Köşe Profili',
    shortName: 'AKP-01',
    heroTitle: 'Kusursuz Köşe Hatları',
    subtitle:
      'Alçı sıva ve alçıpan uygulamalarında köşe dayanımını artıran delikli alçı köşe profili; düzgün hat, çatlak azaltma ve uzun ömürlü yüzey performansı sağlar.',
    image: '/profil-alcikose.jpg',
    description:
      'Alçıpan köşe profili, alçı levha köşe noktalarında düzgün hat oluşturur, çatlama riskini azaltır ve uzun ömürlü bir bitiş sunar.',
    useAreas: ['İç mekan duvar köşeleri', 'Koridor ve giriş alanları', 'Darbe riski yüksek noktaları'],
    specs: [
      { key: 'Malzeme', value: 'Galvanizli Çelik' },
      { key: 'Et Kalınlığı', value: '0.35 - 0.50 mm' },
      { key: 'Standart Boy', value: '3000 mm' },
      { key: 'Kaplama', value: 'Korozyona dayanıklı galvaniz' },
    ],
  },
  {
    slug: 'kaba-siva-profili',
    name: 'Kaba Sıva Profili',
    shortName: 'KSP-02',
    heroTitle: 'Profesyonel Sıva Geçiş Çözümü',
    subtitle:
      'İç ve dış cephe kaba sıva uygulamalarında düzgün kot ve temiz bitiş için geliştirilmiş profil çözümü; işçilik hızını artırır, yüzey kalitesini standartlaştırır.',
    image: '/profil-kabasiva.jpg',
    description:
      'Kaba sıva profili, duvar yüzeylerinde düzgün kot oluşturur. Uygulama süresini kısaltır, hata payını düşürür ve homojen yüzey kalitesi sağlar.',
    useAreas: ['İç ve dış sıva uygulamaları', 'Yüksek metrajlı projeler', 'Hızlı teslim hedefli şantiyeler'],
    specs: [
      { key: 'Malzeme', value: 'Galvanizli Çelik' },
      { key: 'Et Kalınlığı', value: '0.40 - 0.60 mm' },
      { key: 'Standart Boy', value: '3000 mm' },
      { key: 'Avantaj', value: 'Sabit kalınlık, hızlı montaj' },
    ],
  },
  {
    slug: 'tavan-u-c-profili',
    name: 'Tavan U-C Profili',
    shortName: 'TUC-03',
    heroTitle: 'Stabil İskelet, Güvenli Montaj',
    subtitle:
      'Asma tavan sistemlerinde güvenli taşıyıcı iskelet oluşturan Tavan U-C profili; ölçü kararlılığı, montaj kolaylığı ve uzun süreli yapısal performans sunar.',
    image: '/profil-tavan-uc.jpg',
    description:
      'U ve C profil kombinasyonu, asma tavan sistemlerinde rijit ve dengeli taşıyıcı altyapı sunar. Düzenli aks aralıkları ile temiz montaj sağlar.',
    useAreas: ['Asma tavan sistemleri', 'Ticari ve ofis mekanları', 'Modüler iç mimari uygulamaları'],
    specs: [
      { key: 'Malzeme', value: 'Galvanizli Çelik' },
      { key: 'Et Kalınlığı', value: '0.35 - 0.55 mm' },
      { key: 'Standart Boy', value: '3000 / 4000 mm' },
      { key: 'Sistem Tipi', value: 'U kanal + C taşıyıcı profil' },
    ],
  },
]

export const profileProductMap = Object.fromEntries(profileProducts.map((item) => [item.slug, item]))
