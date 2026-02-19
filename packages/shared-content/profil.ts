export type ProfilNavLink = { label: string; href: string }
export type ProfilSocialLink = { name: string; href: string; icon: string; color: string }

export type ProfilHeroSlide = {
  id: number
  image: string
  imagePosition?: string
  badge: string
  title: string[]
  description: string
  cta: string
  highlight: string
  features: string[]
}

export type ProfilHeroControls = {
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  followLabel: string
  followTooltip: string
  followLinks: ProfilSocialLink[]
}

export type ProfilHeader = {
  logoSrc: string
  logoAlt: string
  nav: ProfilNavLink[]
  cta: { label: string; href: string }
}

export type ProfilAboutFeature = { icon: string; title: string; description: string; image: string }
export type ProfilAboutTimeline = { step: string; title: string; description: string; image: string; icon: string }

export type ProfilProjectsSection = {
  eyebrow: string
  title: string
  titleAccent: string
  description: string
  areaLabel: string
  yearLabel: string
  ctaNote: string
  ctaLabel: string
  ctaHref: string
  items: Array<{
    id: number
    title: string
    location: string
    category: string
    image: string
    area: string
    year: string
  }>
}

export type ProfilFAQSection = {
  eyebrow: string
  title: string
  titleAccent: string
  description: string
  ctaNote: string
  ctaLabel: string
  ctaHref: string
  items: Array<{ question: string; answer: string }>
}

export type ProfilFaqSection = ProfilFAQSection

export type ProfilReferencesSection = {
  eyebrow: string
  title: string
  titleAccent: string
  description: string
  clients: Array<{ id: number; name: string; logo: string }>
  stats: Array<{ value: string; label: string }>
}

export type ProfilContactSection = {
  badge: string
  title: string
  titleAccent: string
  description: string
  cards: Array<{
    icon: "Phone" | "Mail" | "MapPin" | "Clock"
    title: string
    description: string
    lines: string[]
    color: string
    iconColor: string
  }>
  form: {
    title: string
    description: string
    submitLabel: string
    submittingLabel: string
    successMessage: string
    fields: {
      nameLabel: string
      namePlaceholder: string
      phoneLabel: string
      phonePlaceholder: string
      emailLabel: string
      emailPlaceholder: string
      subjectLabel: string
      subjectPlaceholder: string
      messageLabel: string
      messagePlaceholder: string
    }
  }
}

export type ProfilFooter = {
  brand: { initials: string; name: string; description: string }
  sectionTitles: { services: string; quickLinks: string; contact: string; social: string }
  services: string[]
  quickLinks: Array<{ label: string; href: string }>
  socialLinks: ProfilSocialLink[]
  legalLinks: Array<{ label: string; href: string }>
  copyright: string
}

export type ProfilProductSpec = { label: string; value: string }
export type ProfilProduct = {
  id: string
  name: string
  subtitle: string
  description: string
  image: string
  highlights: string[]
  applications: string[]
  specs: ProfilProductSpec[]
}

export type ProfilProjectItem = ProfilProjectsSection["items"][number]

export type ProfilContent = {
  meta: { title: string; description: string }
  header: ProfilHeader
  heroSlides: ProfilHeroSlide[]
  heroControls: ProfilHeroControls
  about: {
    badge: string
    title: string
    titleAccent: string
    description: string
    videoUrl: string
    features: ProfilAboutFeature[]
    stats: Array<{ value: string; label: string }>
    timelineBadge: string
    timelineTitle: string
    timelineTitleAccent: string
    timelineDescription: string
    timelineStepLabel: string
    timelineCompletionLabel: string
    timeline: ProfilAboutTimeline[]
    ctaText: string
    ctaButton: string
    ctaHref: string
  }
  projects: ProfilProjectsSection
  faq: ProfilFAQSection
  references: ProfilReferencesSection
  contact: { phone: string; email: string; address: string }
  contactSection: ProfilContactSection
  footer: ProfilFooter
  products: ProfilProduct[]
  production: { title: string; description: string; steps: Array<{ title: string; text: string }> }
  quality: { title: string; description: string; items: Array<{ title: string; text: string }> }
  cta: { title: string; description: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string }
  hero: { stats: Array<{ label: string; value: string }> }
  intro: { title: string; description: string; bullets: string[] }
}

export const DEFAULT_CONTENT: ProfilContent = {
  meta: { title: "Master Profil", description: "Master Profil urun ve cozumleri" },
  header: {
    logoSrc: "/images/logo.png",
    logoAlt: "Master Profil",
    nav: [
      { label: "Anasayfa", href: "#" },
      { label: "Hakkimizda", href: "#about" },
      { label: "Projeler", href: "#projects" },
      { label: "Iletisim", href: "#contact" },
    ],
    cta: { label: "Teklif Al", href: "#contact" },
  },
  heroSlides: [
    {
      id: 1,
      image: "/images/carousel/ofis-1520-527.webp",
      imagePosition: "50% 50%",
      badge: "Master Profil",
      title: ["Yuksek Kalite", "Celik Profil", "Cozumleri"],
      description: "Projeleriniz icin guvenilir celik profil ve sistem cozumleri.",
      cta: "Teklif Al",
      highlight: "Uretim Guvencesi",
      features: ["Yuksek Dayanim", "Hizli Sevkiyat", "Standart Uretim"],
    },
  ],
  heroControls: {
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "Projeler",
    secondaryCtaHref: "#projects",
    followLabel: "Takip",
    followTooltip: "Bizi Takip Edin",
    followLinks: [
      { name: "Instagram", href: "#", icon: "Instagram", color: "hover:bg-pink-500" },
      { name: "Facebook", href: "#", icon: "Facebook", color: "hover:bg-blue-600" },
    ],
  },
  about: {
    badge: "Hakkimizda",
    title: "Master",
    titleAccent: "Profil",
    description: "Uretimden sevkiyata tum sureclerde kalite odakli calisiriz.",
    videoUrl: "",
    features: [{ icon: "CheckCircle2", title: "Kalite", description: "Standartlara uygun uretim.", image: "/images/services/blog-1-846-448.webp" }],
    stats: [{ value: "20+", label: "Yil" }, { value: "1000+", label: "Musteri" }],
    timelineBadge: "Surec",
    timelineTitle: "Planlama",
    timelineTitleAccent: "Teslim",
    timelineDescription: "Adim adim kontrollu uretim.",
    timelineStepLabel: "Adim",
    timelineCompletionLabel: "Tamamlandi",
    timeline: [{ step: "01", title: "Kesif", description: "Ihtiyac analizi", image: "/images/services/villa-hero.webp", icon: "1" }],
    ctaText: "Detayli bilgi icin iletisime gecin.",
    ctaButton: "Iletisim",
    ctaHref: "#contact",
  },
  projects: {
    eyebrow: "Projeler",
    title: "Tamamlanan",
    titleAccent: "Isler",
    description: "Sektorel uygulama ornekleri.",
    areaLabel: "Kalinlik",
    yearLabel: "Not",
    ctaNote: "Tum kalemler icin bizimle iletisime gecin.",
    ctaLabel: "Tum Projeler",
    ctaHref: "#projects",
    items: [],
  },
  faq: {
    eyebrow: "SSS",
    title: "Sik Sorulan",
    titleAccent: "Sorular",
    description: "En cok sorulan konular.",
    ctaNote: "Akliniza takilanlar icin bize yazin.",
    ctaLabel: "Iletisim",
    ctaHref: "#contact",
    items: [],
  },
  references: {
    eyebrow: "Referanslar",
    title: "Guvenilen",
    titleAccent: "Markalar",
    description: "Birlikte calistigimiz firmalar.",
    clients: [],
    stats: [],
  },
  contact: {
    phone: "+90 555 000 00 00",
    email: "info@mastersteelhouse.com",
    address: "Istanbul, Turkiye",
  },
  contactSection: {
    badge: "Iletisim",
    title: "Bizimle",
    titleAccent: "Iletisime Gecin",
    description: "Teklif ve bilgi talepleriniz icin formu doldurun.",
    cards: [
      {
        icon: "Phone",
        title: "Telefon",
        description: "Hemen arayin",
        lines: ["+90 555 000 00 00"],
        color: "from-blue-500/20 to-blue-600/20",
        iconColor: "text-blue-500",
      },
    ],
    form: {
      title: "Mesaj Gonder",
      description: "Ekibimiz size en kisa surede donus yapar.",
      submitLabel: "Gonder",
      submittingLabel: "Gonderiliyor",
      successMessage: "Mesajiniz alindi.",
      fields: {
        nameLabel: "Ad Soyad",
        namePlaceholder: "Adiniz",
        phoneLabel: "Telefon",
        phonePlaceholder: "Telefon numaraniz",
        emailLabel: "E-posta",
        emailPlaceholder: "E-posta adresiniz",
        subjectLabel: "Konu",
        subjectPlaceholder: "Konu",
        messageLabel: "Mesaj",
        messagePlaceholder: "Mesajinizi yazin",
      },
    },
  },
  footer: {
    brand: { initials: "MP", name: "Master Profil", description: "Kaliteli profil sistemleri" },
    sectionTitles: { services: "Hizmetler", quickLinks: "Baglantilar", contact: "Iletisim", social: "Sosyal" },
    services: ["Profil Uretimi", "Teknik Destek"],
    quickLinks: [{ label: "Anasayfa", href: "#" }, { label: "Iletisim", href: "#contact" }],
    socialLinks: [
      { name: "Instagram", href: "#", icon: "Instagram", color: "hover:bg-pink-500" },
      { name: "Facebook", href: "#", icon: "Facebook", color: "hover:bg-blue-600" },
    ],
    legalLinks: [{ label: "KVKK", href: "#" }],
    copyright: "© Master Profil",
  },
  products: [],
  production: { title: "Uretim", description: "Kontrollu uretim", steps: [] },
  quality: { title: "Kalite", description: "Standartlar", items: [] },
  cta: { title: "Teklif", description: "Projeni konusalim", primaryLabel: "Bize Ulasin", primaryHref: "#contact", secondaryLabel: "Projeler", secondaryHref: "#projects" },
  hero: { stats: [] },
  intro: { title: "Master Profil", description: "Kurumsal profil", bullets: [] },
}

export function getDefaultProfilContent(): ProfilContent {
  return structuredClone(DEFAULT_CONTENT)
}

export function normalizeProfilContent(content: Partial<ProfilContent> | undefined): ProfilContent {
  return {
    ...DEFAULT_CONTENT,
    ...content,
    header: { ...DEFAULT_CONTENT.header, ...content?.header, nav: content?.header?.nav ?? DEFAULT_CONTENT.header.nav, cta: { ...DEFAULT_CONTENT.header.cta, ...content?.header?.cta } },
    heroSlides: content?.heroSlides ?? DEFAULT_CONTENT.heroSlides,
    heroControls: { ...DEFAULT_CONTENT.heroControls, ...content?.heroControls, followLinks: content?.heroControls?.followLinks ?? DEFAULT_CONTENT.heroControls.followLinks },
    about: {
      ...DEFAULT_CONTENT.about,
      ...content?.about,
      features: content?.about?.features ?? DEFAULT_CONTENT.about.features,
      stats: content?.about?.stats ?? DEFAULT_CONTENT.about.stats,
      timeline: content?.about?.timeline ?? DEFAULT_CONTENT.about.timeline,
    },
    projects: { ...DEFAULT_CONTENT.projects, ...content?.projects, items: content?.projects?.items ?? DEFAULT_CONTENT.projects.items },
    faq: { ...DEFAULT_CONTENT.faq, ...content?.faq, items: content?.faq?.items ?? DEFAULT_CONTENT.faq.items },
    references: {
      ...DEFAULT_CONTENT.references,
      ...content?.references,
      clients: content?.references?.clients ?? DEFAULT_CONTENT.references.clients,
      stats: content?.references?.stats ?? DEFAULT_CONTENT.references.stats,
    },
    contact: { ...DEFAULT_CONTENT.contact, ...content?.contact },
    contactSection: {
      ...DEFAULT_CONTENT.contactSection,
      ...content?.contactSection,
      cards: content?.contactSection?.cards ?? DEFAULT_CONTENT.contactSection.cards,
      form: {
        ...DEFAULT_CONTENT.contactSection.form,
        ...content?.contactSection?.form,
        fields: {
          ...DEFAULT_CONTENT.contactSection.form.fields,
          ...content?.contactSection?.form?.fields,
        },
      },
    },
    footer: {
      ...DEFAULT_CONTENT.footer,
      ...content?.footer,
      brand: { ...DEFAULT_CONTENT.footer.brand, ...content?.footer?.brand },
      sectionTitles: { ...DEFAULT_CONTENT.footer.sectionTitles, ...content?.footer?.sectionTitles },
      services: content?.footer?.services ?? DEFAULT_CONTENT.footer.services,
      quickLinks: content?.footer?.quickLinks ?? DEFAULT_CONTENT.footer.quickLinks,
      socialLinks: content?.footer?.socialLinks ?? DEFAULT_CONTENT.footer.socialLinks,
      legalLinks: content?.footer?.legalLinks ?? DEFAULT_CONTENT.footer.legalLinks,
    },
    products: content?.products ?? DEFAULT_CONTENT.products,
    production: {
      ...DEFAULT_CONTENT.production,
      ...content?.production,
      steps: content?.production?.steps ?? DEFAULT_CONTENT.production.steps,
    },
    quality: {
      ...DEFAULT_CONTENT.quality,
      ...content?.quality,
      items: content?.quality?.items ?? DEFAULT_CONTENT.quality.items,
    },
    cta: { ...DEFAULT_CONTENT.cta, ...content?.cta },
    hero: { ...DEFAULT_CONTENT.hero, ...content?.hero, stats: content?.hero?.stats ?? DEFAULT_CONTENT.hero.stats },
    intro: { ...DEFAULT_CONTENT.intro, ...content?.intro, bullets: content?.intro?.bullets ?? DEFAULT_CONTENT.intro.bullets },
  }
}
