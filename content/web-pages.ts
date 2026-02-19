export type WebPageSection = {
  title: string
  description: string
  image: string
  bullets: string[]
}

export type WebPageHero = {
  eyebrow: string
  title: string
  titleAccent: string
  description: string
  image: string
}

export type WebReferenceItem = {
  id: number
  title: string
  location: string
  categories: string[]
  image: string
  area: string
}

export type WebPageContent =
  | {
      slug: string
      template: "info"
      hero: WebPageHero
      sections: WebPageSection[]
      cta: { label: string; href: string; note: string }
    }
  | {
      slug: "referanslar"
      template: "references"
      hero: WebPageHero
      categories: string[]
      items: WebReferenceItem[]
    }

const DEFAULT_INFO_CONTENT = (
  slug: string,
  title: string,
  titleAccent: string,
  description: string
): WebPageContent => ({
  slug,
  template: "info",
  hero: {
    eyebrow: "Master Steel House",
    title,
    titleAccent,
    description,
    image: "/hero-bg.jpg",
  },
  sections: [
    {
      title: "Öne Çıkan Yaklaşım",
      description: "Sayfanın temel mesajını, öne çıkan avantajları ve uygulama detaylarını buradan yönetin.",
      image: "/project-1.jpg",
      bullets: ["Net planlama", "Hızlı uygulama", "Uzun ömürlü çözümler"],
    },
  ],
  cta: {
    label: "Teklif Al",
    href: "/iletisim",
    note: "İçerik ve planlama detayları için bize ulaşın.",
  },
})

const DEFAULT_REFERENCES: WebPageContent = {
  slug: "referanslar",
  template: "references",
  hero: {
    eyebrow: "Referanslar",
    title: "Referans",
    titleAccent: "Projelerimiz",
    description: "Türkiye'nin dört bir yanında tamamlanan başarılı projeler.",
    image: "/ref-factory.jpg",
  },
  categories: [
    "Tümü",
    "Kamu Yapıları",
    "Eğitim Yapıları",
    "Sağlık Yapıları",
    "Çelik Çatılar",
    "Endüstriyel Yapılar",
    "Turizm Yapıları",
    "Ticari Yapılar",
    "Ofis Yapıları",
    "Çoklu Projeler",
    "Tek Katlı Çelik Villalar",
    "Çok Katlı Çelik Villalar",
    "Loftlu Çelik Villalar",
    "İkiz Villalar",
    "Tiny House",
  ],
  items: [
    {
      id: 1,
      title: "Prof. Dr. Murat Dilmener Acil Durum Hastanesi",
      location: "İstanbul",
      categories: ["Sağlık Yapıları", "Kamu Yapıları"],
      image: "/ref-hospital.jpg",
      area: "15.000 m²",
    },
    {
      id: 2,
      title: "TOKİ - AFAD Elazığ Hafif Çelik Köy Evleri",
      location: "Elazığ",
      categories: ["Kamu Yapıları", "Çoklu Projeler", "Tek Katlı Çelik Villalar"],
      image: "/project-1.jpg",
      area: "450 konut",
    },
  ],
}

export const DEFAULT_WEB_PAGES: WebPageContent[] = [
  DEFAULT_INFO_CONTENT("hakkimizda", "Hakkımızda", "Bizi Tanıyın", "Kurumsal hikaye ve uzmanlık alanlarımız."),
  DEFAULT_INFO_CONTENT("misyonumuz", "Misyonumuz", "Hedeflerimiz", "Müşteri odaklı üretim ve sürdürülebilir çözümler."),
  DEFAULT_INFO_CONTENT("vizyonumuz", "Vizyonumuz", "Gelecek", "Geleceğin çelik yapı standartlarını birlikte şekillendiriyoruz."),
  DEFAULT_INFO_CONTENT("belgelerimiz", "Belgelerimiz", "Sertifikalar", "Kalite ve uygunluk belgelerimizi yönetin."),
  DEFAULT_INFO_CONTENT("uretim-celik-yapi-uretim", "Çelik Yapı Üretim", "Süreç", "Üretim hattımız ve kapasite detaylarımız."),
  DEFAULT_INFO_CONTENT("uretim-dizayn-yazilimi", "Dizayn Yazılımı", "Teknoloji", "Dijital tasarım süreçlerimizi paylaşın."),
  DEFAULT_INFO_CONTENT("uretim-uretim-yazilimi", "Üretim Yazılımı", "Kontrol", "Üretim planlama ve izleme sistemleri."),
  DEFAULT_INFO_CONTENT("medya-blog", "Blog", "Haberler", "Sektörel içerikler ve teknik paylaşımlar."),
  DEFAULT_INFO_CONTENT("medya-haberler", "Haberler", "Duyurular", "Güncel duyurular ve basın bültenleri."),
  DEFAULT_INFO_CONTENT("medya-kataloglar", "Kataloglar", "Dokümanlar", "Ürün kataloglarını buradan yönetin."),
  DEFAULT_INFO_CONTENT("medya-videolar", "Videolar", "Görseller", "Video ve görsel içerikleri buradan yönetin."),
  DEFAULT_INFO_CONTENT("iletisim", "İletişim", "Bize Ulaşın", "İletişim bilgileri ve form detayları."),
  DEFAULT_REFERENCES,
]
