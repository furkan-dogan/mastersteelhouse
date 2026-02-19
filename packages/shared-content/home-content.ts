export type HeroSlide = {
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

export type HeroControls = {
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  followLabel: string
  followTooltip: string
  followLinks: Array<{
    name: string
    href: string
    icon: string
    color: string
  }>
}

export type AboutContent = {
  badge: string
  title: string
  titleAccent: string
  description: string
  videoUrl: string
  features: Array<{
    icon: string
    title: string
    description: string
    image: string
  }>
  stats: Array<{ value: string; label: string }>
  timelineBadge: string
  timelineTitle: string
  timelineTitleAccent: string
  timelineDescription: string
  timelineStepLabel: string
  timelineCompletionLabel: string
  timeline: Array<{
    step: string
    title: string
    description: string
    image: string
    icon: string
  }>
  ctaText: string
  ctaButton: string
  ctaHref: string
}

export type HomeContent = {
  hero: {
    slides: HeroSlide[]
    controls: HeroControls
  }
  about: AboutContent
  projects: {
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
  faq: {
    eyebrow: string
    title: string
    titleAccent: string
    description: string
    ctaNote: string
    ctaLabel: string
    ctaHref: string
    items: Array<{ question: string; answer: string }>
  }
  references: {
    eyebrow: string
    title: string
    titleAccent: string
    description: string
    clients: Array<{ id: number; name: string; logo: string }>
    stats: Array<{ value: string; label: string }>
  }
}

const DEFAULT_HOME_CONTENT: HomeContent = {
  hero: {
    slides: [
      {
        id: 1,
        image: "/images/carousel/celik-iskelet.png",
        imagePosition: "50% 50%",
        badge: "Master Steel House",
        title: ["Modern", "Celik Yapi", "Cozumleri"],
        description: "Depreme dayanikli, hizli uretim ve estetik tasarimla projelerinizi guvenle hayata gecirin.",
        cta: "Teklif Al",
        highlight: "20+ Yil Tecrube",
        features: ["Depreme Dayanikli", "Hizli Teslim", "Yuksek Kalite"],
      },
    ],
    controls: {
      primaryCtaHref: "#contact",
      secondaryCtaLabel: "Projeler",
      secondaryCtaHref: "#about",
      followLabel: "Bizi Takip Et",
      followTooltip: "Sosyal Medya",
      followLinks: [
        { name: "Instagram", href: "#", icon: "Instagram", color: "instagram" },
        { name: "Facebook", href: "#", icon: "Facebook", color: "facebook" },
      ],
    },
  },
  about: {
    badge: "Hakkimizda",
    title: "Celik Yapi",
    titleAccent: "Uzmanligi",
    description: "Projeye ozel tasarim ve uretim gucuyle anahtar teslim cozumler sunuyoruz.",
    videoUrl: "",
    features: [
      {
        icon: "CheckCircle2",
        title: "Muhendislik",
        description: "Sahaya ve ihtiyaca uygun teknik cozumler.",
        image: "/images/hakkimizda-555-370.webp",
      },
    ],
    stats: [
      { value: "20+", label: "Yil" },
      { value: "1000+", label: "Proje" },
    ],
    timelineBadge: "Surec",
    timelineTitle: "Planlama",
    timelineTitleAccent: "Teslim",
    timelineDescription: "Tum asamalari kontrollu sekilde yonetiyoruz.",
    timelineStepLabel: "Adim",
    timelineCompletionLabel: "Tamamlandi",
    timeline: [
      {
        step: "01",
        title: "Kesif",
        description: "Ihtiyac analizi ve saha degerlendirmesi.",
        image: "/images/services/villa-hero.webp",
        icon: "1",
      },
    ],
    ctaText: "Projeniz icin hemen iletisime gecin.",
    ctaButton: "Bize Ulasin",
    ctaHref: "#contact",
  },
  projects: {
    eyebrow: "Projeler",
    title: "Tamamlanan",
    titleAccent: "Projeler",
    description: "Farkli olcekte celik yapi uygulamalarimiz.",
    areaLabel: "Alan",
    yearLabel: "Yil",
    ctaNote: "Daha fazlasi icin bizimle iletisime gecin.",
    ctaLabel: "Tum Projeler",
    ctaHref: "/referanslar",
    items: [],
  },
  faq: {
    eyebrow: "SSS",
    title: "Sik Sorulan",
    titleAccent: "Sorular",
    description: "Merak edilen basliklari derledik.",
    ctaNote: "Farkli sorulariniz varsa bize ulasin.",
    ctaLabel: "Iletisim",
    ctaHref: "/iletisim",
    items: [],
  },
  references: {
    eyebrow: "Referanslar",
    title: "Guvenilen",
    titleAccent: "Marka",
    description: "Birlikte calistigimiz kurum ve markalar.",
    clients: [],
    stats: [],
  },
}

export function normalizeHomeContent(content: Partial<HomeContent> | undefined): HomeContent {
  return {
    ...DEFAULT_HOME_CONTENT,
    ...content,
    hero: {
      ...DEFAULT_HOME_CONTENT.hero,
      ...content?.hero,
      slides: content?.hero?.slides?.length ? content.hero.slides : DEFAULT_HOME_CONTENT.hero.slides,
      controls: {
        ...DEFAULT_HOME_CONTENT.hero.controls,
        ...content?.hero?.controls,
        followLinks: content?.hero?.controls?.followLinks ?? DEFAULT_HOME_CONTENT.hero.controls.followLinks,
      },
    },
    about: {
      ...DEFAULT_HOME_CONTENT.about,
      ...content?.about,
      features: content?.about?.features ?? DEFAULT_HOME_CONTENT.about.features,
      stats: content?.about?.stats ?? DEFAULT_HOME_CONTENT.about.stats,
      timeline: content?.about?.timeline ?? DEFAULT_HOME_CONTENT.about.timeline,
    },
    projects: {
      ...DEFAULT_HOME_CONTENT.projects,
      ...content?.projects,
      items: content?.projects?.items ?? DEFAULT_HOME_CONTENT.projects.items,
    },
    faq: {
      ...DEFAULT_HOME_CONTENT.faq,
      ...content?.faq,
      items: content?.faq?.items ?? DEFAULT_HOME_CONTENT.faq.items,
    },
    references: {
      ...DEFAULT_HOME_CONTENT.references,
      ...content?.references,
      clients: content?.references?.clients ?? DEFAULT_HOME_CONTENT.references.clients,
      stats: content?.references?.stats ?? DEFAULT_HOME_CONTENT.references.stats,
    },
  }
}
