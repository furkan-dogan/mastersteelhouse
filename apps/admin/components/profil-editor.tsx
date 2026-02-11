"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type {
  ProfilContent,
  ProfilProduct,
  ProfilProductSpec,
  ProfilNavLink,
  ProfilSocialLink,
  ProfilHeroSlide,
  ProfilAboutFeature,
  ProfilAboutTimeline,
  ProfilProjectItem,
} from "@/lib/profil-content"
import MediaField from "@/components/media-field"

const createProduct = (): ProfilProduct => ({
  id: `product-${Date.now()}`,
  name: "Yeni Urun",
  subtitle: "",
  description: "",
  image: "/profil/kabasiva-placeholder.svg",
  highlights: [""],
  applications: [""],
  specs: [{ label: "", value: "" }],
})

const createNavLink = (): ProfilNavLink => ({ label: "Yeni Link", href: "#" })

const createSocialLink = (): ProfilSocialLink => ({
  name: "Instagram",
  href: "#",
  icon: "Instagram",
  color: "hover:bg-pink-500",
})

const createHeroSlide = (): ProfilHeroSlide => ({
  id: Date.now(),
  image: "/profil/photos/machinery.jpg",
  badge: "",
  title: [""],
  description: "",
  cta: "Teklif Al",
  highlight: "",
  features: [""],
})

const createAboutFeature = (): ProfilAboutFeature => ({
  icon: "CheckCircle2",
  title: "",
  description: "",
  image: "/profil/photos/drywall.jpg",
})

const createAboutTimeline = (): ProfilAboutTimeline => ({
  step: "01",
  title: "",
  description: "",
  image: "/profil/photos/machinery.jpg",
  icon: "A",
})

const createProjectItem = (): ProfilProjectItem => ({
  id: Date.now(),
  title: "Yeni Kalem",
  location: "",
  category: "",
  image: "/profil/photos/drywall.jpg",
  area: "",
  year: "",
})

type ProfilEditorProps = {
  initialContent: ProfilContent
  saveAction: (formData: FormData) => Promise<{ ok: boolean }>
}

export default function ProfilEditor({ initialContent, saveAction }: ProfilEditorProps) {
  const [content, setContent] = useState<ProfilContent>(initialContent)
  const [isPending, startTransition] = useTransition()
  const [activeSectionId, setActiveSectionId] = useState("header")
  const searchParams = useSearchParams()

  useEffect(() => {
    const section = searchParams?.get("section")
    if (!section) return
    setActiveSectionId(section)
  }, [searchParams])

  const payload = useMemo(() => JSON.stringify(content), [content])

  const parsePosition = (value?: string) => {
    if (!value) return { x: 50, y: 50 }
    const [xRaw, yRaw] = value.split(" ")
    const x = Number.parseInt(xRaw, 10)
    const y = Number.parseInt(yRaw, 10)
    return {
      x: Number.isFinite(x) ? x : 50,
      y: Number.isFinite(y) ? y : 50,
    }
  }

  const formatPosition = (x: number, y: number) => `${x}% ${y}%`

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      await saveAction(formData)
    })
  }

  const updateMeta = (key: keyof ProfilContent["meta"], value: string) => {
    setContent((prev) => ({
      ...prev,
      meta: { ...prev.meta, [key]: value },
    }))
  }

  const updateHeader = (key: keyof ProfilContent["header"], value: string | ProfilNavLink[] | ProfilContent["header"]["cta"]) => {
    setContent((prev) => ({
      ...prev,
      header: { ...prev.header, [key]: value },
    }))
  }

  const updateHeaderNav = (index: number, key: keyof ProfilNavLink, value: string) => {
    setContent((prev) => {
      const nav = [...prev.header.nav]
      nav[index] = { ...nav[index], [key]: value }
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const addHeaderNav = () => {
    setContent((prev) => ({
      ...prev,
      header: { ...prev.header, nav: [...prev.header.nav, createNavLink()] },
    }))
  }

  const removeHeaderNav = (index: number) => {
    setContent((prev) => ({
      ...prev,
      header: { ...prev.header, nav: prev.header.nav.filter((_, i) => i !== index) },
    }))
  }

  const updateHeaderCta = (key: keyof ProfilContent["header"]["cta"], value: string) => {
    setContent((prev) => ({
      ...prev,
      header: { ...prev.header, cta: { ...prev.header.cta, [key]: value } },
    }))
  }

  const updateHeroControls = (key: keyof ProfilContent["heroControls"], value: string) => {
    setContent((prev) => ({
      ...prev,
      heroControls: { ...prev.heroControls, [key]: value },
    }))
  }

  const updateHeroControlsSocial = (
    index: number,
    key: keyof ProfilSocialLink,
    value: string
  ) => {
    setContent((prev) => {
      const followLinks = [...prev.heroControls.followLinks]
      followLinks[index] = { ...followLinks[index], [key]: value }
      return { ...prev, heroControls: { ...prev.heroControls, followLinks } }
    })
  }

  const addHeroControlsSocial = () => {
    setContent((prev) => ({
      ...prev,
      heroControls: {
        ...prev.heroControls,
        followLinks: [...prev.heroControls.followLinks, createSocialLink()],
      },
    }))
  }

  const removeHeroControlsSocial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      heroControls: {
        ...prev.heroControls,
        followLinks: prev.heroControls.followLinks.filter((_, i) => i !== index),
      },
    }))
  }

  const updateHeroSlide = (
    index: number,
    key: keyof ProfilHeroSlide,
    value: string | string[] | number
  ) => {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides]
      heroSlides[index] = { ...heroSlides[index], [key]: value }
      return { ...prev, heroSlides }
    })
  }

  const updateHeroSlideTitleLine = (slideIndex: number, lineIndex: number, value: string) => {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides]
      const title = [...heroSlides[slideIndex].title]
      title[lineIndex] = value
      heroSlides[slideIndex] = { ...heroSlides[slideIndex], title }
      return { ...prev, heroSlides }
    })
  }

  const addHeroSlideTitleLine = (slideIndex: number) => {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides]
      heroSlides[slideIndex] = {
        ...heroSlides[slideIndex],
        title: [...heroSlides[slideIndex].title, ""],
      }
      return { ...prev, heroSlides }
    })
  }

  const removeHeroSlideTitleLine = (slideIndex: number, lineIndex: number) => {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides]
      heroSlides[slideIndex] = {
        ...heroSlides[slideIndex],
        title: heroSlides[slideIndex].title.filter((_, i) => i !== lineIndex),
      }
      return { ...prev, heroSlides }
    })
  }

  const updateHeroSlideFeature = (slideIndex: number, featureIndex: number, value: string) => {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides]
      const features = [...heroSlides[slideIndex].features]
      features[featureIndex] = value
      heroSlides[slideIndex] = { ...heroSlides[slideIndex], features }
      return { ...prev, heroSlides }
    })
  }

  const addHeroSlideFeature = (slideIndex: number) => {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides]
      heroSlides[slideIndex] = {
        ...heroSlides[slideIndex],
        features: [...heroSlides[slideIndex].features, ""],
      }
      return { ...prev, heroSlides }
    })
  }

  const removeHeroSlideFeature = (slideIndex: number, featureIndex: number) => {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides]
      heroSlides[slideIndex] = {
        ...heroSlides[slideIndex],
        features: heroSlides[slideIndex].features.filter((_, i) => i !== featureIndex),
      }
      return { ...prev, heroSlides }
    })
  }

  const addHeroSlide = () => {
    setContent((prev) => ({
      ...prev,
      heroSlides: [...prev.heroSlides, createHeroSlide()],
    }))
  }

  const removeHeroSlide = (index: number) => {
    setContent((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.filter((_, i) => i !== index),
    }))
  }

  const updateHero = (key: keyof ProfilContent["hero"], value: string) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [key]: value },
    }))
  }

  const updateHeroStat = (index: number, key: "label" | "value", value: string) => {
    setContent((prev) => {
      const stats = [...prev.hero.stats]
      stats[index] = { ...stats[index], [key]: value }
      return { ...prev, hero: { ...prev.hero, stats } }
    })
  }

  const addHeroStat = () => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, stats: [...prev.hero.stats, { label: "", value: "" }] },
    }))
  }

  const removeHeroStat = (index: number) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, stats: prev.hero.stats.filter((_, i) => i !== index) },
    }))
  }

  const updateIntro = (key: keyof ProfilContent["intro"], value: string | string[]) => {
    setContent((prev) => ({
      ...prev,
      intro: { ...prev.intro, [key]: value },
    }))
  }

  const updateIntroBullet = (index: number, value: string) => {
    setContent((prev) => {
      const bullets = [...prev.intro.bullets]
      bullets[index] = value
      return { ...prev, intro: { ...prev.intro, bullets } }
    })
  }

  const addIntroBullet = () => {
    setContent((prev) => ({
      ...prev,
      intro: { ...prev.intro, bullets: [...prev.intro.bullets, ""] },
    }))
  }

  const removeIntroBullet = (index: number) => {
    setContent((prev) => ({
      ...prev,
      intro: { ...prev.intro, bullets: prev.intro.bullets.filter((_, i) => i !== index) },
    }))
  }

  const updateAbout = (key: keyof ProfilContent["about"], value: string) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, [key]: value },
    }))
  }

  const updateAboutFeature = (
    index: number,
    key: keyof ProfilAboutFeature,
    value: string
  ) => {
    setContent((prev) => {
      const features = [...prev.about.features]
      features[index] = { ...features[index], [key]: value }
      return { ...prev, about: { ...prev.about, features } }
    })
  }

  const addAboutFeature = () => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, features: [...prev.about.features, createAboutFeature()] },
    }))
  }

  const removeAboutFeature = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, features: prev.about.features.filter((_, i) => i !== index) },
    }))
  }

  const updateAboutStat = (index: number, key: "label" | "value", value: string) => {
    setContent((prev) => {
      const stats = [...prev.about.stats]
      stats[index] = { ...stats[index], [key]: value }
      return { ...prev, about: { ...prev.about, stats } }
    })
  }

  const addAboutStat = () => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, stats: [...prev.about.stats, { label: "", value: "" }] },
    }))
  }

  const removeAboutStat = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, stats: prev.about.stats.filter((_, i) => i !== index) },
    }))
  }

  const updateAboutTimeline = (
    index: number,
    key: keyof ProfilAboutTimeline,
    value: string
  ) => {
    setContent((prev) => {
      const timeline = [...prev.about.timeline]
      timeline[index] = { ...timeline[index], [key]: value }
      return { ...prev, about: { ...prev.about, timeline } }
    })
  }

  const addAboutTimeline = () => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, timeline: [...prev.about.timeline, createAboutTimeline()] },
    }))
  }

  const removeAboutTimeline = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, timeline: prev.about.timeline.filter((_, i) => i !== index) },
    }))
  }

  const updateProduct = (index: number, key: keyof ProfilProduct, value: string) => {
    setContent((prev) => {
      const products = [...prev.products]
      products[index] = { ...products[index], [key]: value }
      return { ...prev, products }
    })
  }

  const updateProductHighlight = (productIndex: number, index: number, value: string) => {
    setContent((prev) => {
      const products = [...prev.products]
      const highlights = [...products[productIndex].highlights]
      highlights[index] = value
      products[productIndex] = { ...products[productIndex], highlights }
      return { ...prev, products }
    })
  }

  const addProductHighlight = (productIndex: number) => {
    setContent((prev) => {
      const products = [...prev.products]
      products[productIndex] = {
        ...products[productIndex],
        highlights: [...products[productIndex].highlights, ""],
      }
      return { ...prev, products }
    })
  }

  const removeProductHighlight = (productIndex: number, index: number) => {
    setContent((prev) => {
      const products = [...prev.products]
      products[productIndex] = {
        ...products[productIndex],
        highlights: products[productIndex].highlights.filter((_, i) => i !== index),
      }
      return { ...prev, products }
    })
  }

  const updateProductApplication = (productIndex: number, index: number, value: string) => {
    setContent((prev) => {
      const products = [...prev.products]
      const applications = [...products[productIndex].applications]
      applications[index] = value
      products[productIndex] = { ...products[productIndex], applications }
      return { ...prev, products }
    })
  }

  const addProductApplication = (productIndex: number) => {
    setContent((prev) => {
      const products = [...prev.products]
      products[productIndex] = {
        ...products[productIndex],
        applications: [...products[productIndex].applications, ""],
      }
      return { ...prev, products }
    })
  }

  const removeProductApplication = (productIndex: number, index: number) => {
    setContent((prev) => {
      const products = [...prev.products]
      products[productIndex] = {
        ...products[productIndex],
        applications: products[productIndex].applications.filter((_, i) => i !== index),
      }
      return { ...prev, products }
    })
  }

  const updateProductSpec = (
    productIndex: number,
    index: number,
    key: keyof ProfilProductSpec,
    value: string
  ) => {
    setContent((prev) => {
      const products = [...prev.products]
      const specs = [...products[productIndex].specs]
      specs[index] = { ...specs[index], [key]: value }
      products[productIndex] = { ...products[productIndex], specs }
      return { ...prev, products }
    })
  }

  const addProductSpec = (productIndex: number) => {
    setContent((prev) => {
      const products = [...prev.products]
      products[productIndex] = {
        ...products[productIndex],
        specs: [...products[productIndex].specs, { label: "", value: "" }],
      }
      return { ...prev, products }
    })
  }

  const removeProductSpec = (productIndex: number, index: number) => {
    setContent((prev) => {
      const products = [...prev.products]
      products[productIndex] = {
        ...products[productIndex],
        specs: products[productIndex].specs.filter((_, i) => i !== index),
      }
      return { ...prev, products }
    })
  }

  const addProduct = () => {
    setContent((prev) => ({
      ...prev,
      products: [...prev.products, createProduct()],
    }))
  }

  const removeProduct = (index: number) => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }))
  }

  const updateProduction = (key: keyof ProfilContent["production"], value: string) => {
    setContent((prev) => ({
      ...prev,
      production: { ...prev.production, [key]: value },
    }))
  }

  const updateProductionStep = (index: number, key: "title" | "text", value: string) => {
    setContent((prev) => {
      const steps = [...prev.production.steps]
      steps[index] = { ...steps[index], [key]: value }
      return { ...prev, production: { ...prev.production, steps } }
    })
  }

  const addProductionStep = () => {
    setContent((prev) => ({
      ...prev,
      production: {
        ...prev.production,
        steps: [...prev.production.steps, { title: "", text: "" }],
      },
    }))
  }

  const removeProductionStep = (index: number) => {
    setContent((prev) => ({
      ...prev,
      production: { ...prev.production, steps: prev.production.steps.filter((_, i) => i !== index) },
    }))
  }

  const updateQuality = (key: keyof ProfilContent["quality"], value: string) => {
    setContent((prev) => ({
      ...prev,
      quality: { ...prev.quality, [key]: value },
    }))
  }

  const updateQualityItem = (index: number, key: "title" | "text", value: string) => {
    setContent((prev) => {
      const items = [...prev.quality.items]
      items[index] = { ...items[index], [key]: value }
      return { ...prev, quality: { ...prev.quality, items } }
    })
  }

  const addQualityItem = () => {
    setContent((prev) => ({
      ...prev,
      quality: { ...prev.quality, items: [...prev.quality.items, { title: "", text: "" }] },
    }))
  }

  const removeQualityItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      quality: { ...prev.quality, items: prev.quality.items.filter((_, i) => i !== index) },
    }))
  }

  const updateCta = (key: keyof ProfilContent["cta"], value: string) => {
    setContent((prev) => ({
      ...prev,
      cta: { ...prev.cta, [key]: value },
    }))
  }

  const updateProjects = (key: keyof ProfilContent["projects"], value: string) => {
    setContent((prev) => ({
      ...prev,
      projects: { ...prev.projects, [key]: value },
    }))
  }

  const updateProjectItem = (
    index: number,
    key: keyof ProfilProjectItem,
    value: string
  ) => {
    setContent((prev) => {
      const items = [...prev.projects.items]
      items[index] = { ...items[index], [key]: value }
      return { ...prev, projects: { ...prev.projects, items } }
    })
  }

  const addProjectItem = () => {
    setContent((prev) => ({
      ...prev,
      projects: { ...prev.projects, items: [...prev.projects.items, createProjectItem()] },
    }))
  }

  const removeProjectItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      projects: { ...prev.projects, items: prev.projects.items.filter((_, i) => i !== index) },
    }))
  }

  const updateFaq = (key: keyof ProfilContent["faq"], value: string) => {
    setContent((prev) => ({
      ...prev,
      faq: { ...prev.faq, [key]: value },
    }))
  }

  const updateFaqItem = (index: number, key: "question" | "answer", value: string) => {
    setContent((prev) => {
      const items = [...prev.faq.items]
      items[index] = { ...items[index], [key]: value }
      return { ...prev, faq: { ...prev.faq, items } }
    })
  }

  const addFaqItem = () => {
    setContent((prev) => ({
      ...prev,
      faq: { ...prev.faq, items: [...prev.faq.items, { question: "", answer: "" }] },
    }))
  }

  const removeFaqItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      faq: { ...prev.faq, items: prev.faq.items.filter((_, i) => i !== index) },
    }))
  }

  const updateReferences = (key: keyof ProfilContent["references"], value: string) => {
    setContent((prev) => ({
      ...prev,
      references: { ...prev.references, [key]: value },
    }))
  }

  const updateReferenceClient = (index: number, key: "name" | "logo", value: string) => {
    setContent((prev) => {
      const clients = [...prev.references.clients]
      clients[index] = { ...clients[index], [key]: value, id: clients[index].id ?? index + 1 }
      return { ...prev, references: { ...prev.references, clients } }
    })
  }

  const addReferenceClient = () => {
    setContent((prev) => ({
      ...prev,
      references: {
        ...prev.references,
        clients: [...prev.references.clients, { id: Date.now(), name: "", logo: "" }],
      },
    }))
  }

  const removeReferenceClient = (index: number) => {
    setContent((prev) => ({
      ...prev,
      references: {
        ...prev.references,
        clients: prev.references.clients.filter((_, i) => i !== index),
      },
    }))
  }

  const updateReferenceStat = (index: number, key: "label" | "value", value: string) => {
    setContent((prev) => {
      const stats = [...prev.references.stats]
      stats[index] = { ...stats[index], [key]: value }
      return { ...prev, references: { ...prev.references, stats } }
    })
  }

  const addReferenceStat = () => {
    setContent((prev) => ({
      ...prev,
      references: {
        ...prev.references,
        stats: [...prev.references.stats, { label: "", value: "" }],
      },
    }))
  }

  const removeReferenceStat = (index: number) => {
    setContent((prev) => ({
      ...prev,
      references: {
        ...prev.references,
        stats: prev.references.stats.filter((_, i) => i !== index),
      },
    }))
  }

  const updateContact = (key: keyof ProfilContent["contact"], value: string) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }))
  }

  const updateContactSection = (key: keyof ProfilContent["contactSection"], value: string) => {
    setContent((prev) => ({
      ...prev,
      contactSection: { ...prev.contactSection, [key]: value },
    }))
  }

  const updateContactCard = (
    index: number,
    key: keyof ProfilContent["contactSection"]["cards"][number],
    value: string | string[]
  ) => {
    setContent((prev) => {
      const cards = [...prev.contactSection.cards]
      cards[index] = { ...cards[index], [key]: value }
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const updateContactCardLine = (cardIndex: number, lineIndex: number, value: string) => {
    setContent((prev) => {
      const cards = [...prev.contactSection.cards]
      const lines = [...cards[cardIndex].lines]
      lines[lineIndex] = value
      cards[cardIndex] = { ...cards[cardIndex], lines }
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const addContactCardLine = (cardIndex: number) => {
    setContent((prev) => {
      const cards = [...prev.contactSection.cards]
      cards[cardIndex] = { ...cards[cardIndex], lines: [...cards[cardIndex].lines, ""] }
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const removeContactCardLine = (cardIndex: number, lineIndex: number) => {
    setContent((prev) => {
      const cards = [...prev.contactSection.cards]
      cards[cardIndex] = {
        ...cards[cardIndex],
        lines: cards[cardIndex].lines.filter((_, i) => i !== lineIndex),
      }
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const addContactCard = () => {
    setContent((prev) => ({
      ...prev,
      contactSection: {
        ...prev.contactSection,
        cards: [
          ...prev.contactSection.cards,
          {
            icon: "Phone",
            title: "",
            description: "",
            lines: [""],
            color: "from-blue-500/20 to-blue-600/20",
            iconColor: "text-blue-500",
          },
        ],
      },
    }))
  }

  const removeContactCard = (index: number) => {
    setContent((prev) => ({
      ...prev,
      contactSection: {
        ...prev.contactSection,
        cards: prev.contactSection.cards.filter((_, i) => i !== index),
      },
    }))
  }

  const updateContactForm = (key: keyof ProfilContent["contactSection"]["form"], value: string) => {
    setContent((prev) => ({
      ...prev,
      contactSection: { ...prev.contactSection, form: { ...prev.contactSection.form, [key]: value } },
    }))
  }

  const updateContactFormField = (
    key: keyof ProfilContent["contactSection"]["form"]["fields"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      contactSection: {
        ...prev.contactSection,
        form: { ...prev.contactSection.form, fields: { ...prev.contactSection.form.fields, [key]: value } },
      },
    }))
  }

  const updateFooter = (key: keyof ProfilContent["footer"], value: string | string[] | ProfilNavLink[] | ProfilSocialLink[]) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, [key]: value },
    }))
  }

  const updateFooterBrand = (key: keyof ProfilContent["footer"]["brand"], value: string) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, brand: { ...prev.footer.brand, [key]: value } },
    }))
  }

  const updateFooterSectionTitle = (key: keyof ProfilContent["footer"]["sectionTitles"], value: string) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, sectionTitles: { ...prev.footer.sectionTitles, [key]: value } },
    }))
  }

  const updateFooterService = (index: number, value: string) => {
    setContent((prev) => {
      const services = [...prev.footer.services]
      services[index] = value
      return { ...prev, footer: { ...prev.footer, services } }
    })
  }

  const addFooterService = () => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, services: [...prev.footer.services, ""] },
    }))
  }

  const removeFooterService = (index: number) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, services: prev.footer.services.filter((_, i) => i !== index) },
    }))
  }

  const updateFooterQuickLink = (index: number, key: keyof ProfilNavLink, value: string) => {
    setContent((prev) => {
      const quickLinks = [...prev.footer.quickLinks]
      quickLinks[index] = { ...quickLinks[index], [key]: value }
      return { ...prev, footer: { ...prev.footer, quickLinks } }
    })
  }

  const addFooterQuickLink = () => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, quickLinks: [...prev.footer.quickLinks, createNavLink()] },
    }))
  }

  const removeFooterQuickLink = (index: number) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, quickLinks: prev.footer.quickLinks.filter((_, i) => i !== index) },
    }))
  }

  const updateFooterSocial = (index: number, key: keyof ProfilSocialLink, value: string) => {
    setContent((prev) => {
      const socialLinks = [...prev.footer.socialLinks]
      socialLinks[index] = { ...socialLinks[index], [key]: value }
      return { ...prev, footer: { ...prev.footer, socialLinks } }
    })
  }

  const addFooterSocial = () => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, socialLinks: [...prev.footer.socialLinks, createSocialLink()] },
    }))
  }

  const removeFooterSocial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, socialLinks: prev.footer.socialLinks.filter((_, i) => i !== index) },
    }))
  }

  const updateFooterLegal = (index: number, key: keyof ProfilNavLink, value: string) => {
    setContent((prev) => {
      const legalLinks = [...prev.footer.legalLinks]
      legalLinks[index] = { ...legalLinks[index], [key]: value }
      return { ...prev, footer: { ...prev.footer, legalLinks } }
    })
  }

  const addFooterLegal = () => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, legalLinks: [...prev.footer.legalLinks, createNavLink()] },
    }))
  }

  const removeFooterLegal = (index: number) => {
    setContent((prev) => ({
      ...prev,
      footer: { ...prev.footer, legalLinks: prev.footer.legalLinks.filter((_, i) => i !== index) },
    }))
  }

  const sectionItems = useMemo(
    () => [
      { id: "header", title: "Header", description: "Logo, menü ve CTA", count: `${content.header.nav.length} link` },
      {
        id: "hero",
        title: "Hero Slider",
        description: "Slide görselleri ve metinler",
        count: `${content.heroSlides.length} slide`,
      },
      {
        id: "hero-controls",
        title: "Hero Kontrolleri",
        description: "CTA ve sosyal bağlantılar",
        count: `${content.heroControls.followLinks.length} sosyal`,
      },
      { id: "about", title: "Hakkımızda", description: "Video, özellikler ve süreç", count: `${content.about.features.length} özellik` },
      { id: "projects", title: "Projeler", description: "Kartlar ve CTA", count: `${content.projects.items.length} kart` },
      { id: "faq", title: "SSS", description: "Sık sorulan sorular", count: `${content.faq.items.length} soru` },
      { id: "references", title: "Referanslar", description: "Logolar ve istatistikler", count: `${content.references.clients.length} logo` },
      { id: "contact", title: "İletişim Bilgileri", description: "Telefon, e-posta, adres", count: "3 alan" },
      {
        id: "contact-section",
        title: "İletişim Bölümü",
        description: "Kartlar ve form metinleri",
        count: `${content.contactSection.cards.length} kart`,
      },
      { id: "footer", title: "Footer", description: "Linkler ve sosyal medya", count: `${content.footer.socialLinks.length} sosyal` },
    ],
    [content]
  )

  const activeSection = sectionItems.find((section) => section.id === activeSectionId) ?? sectionItems[0]
  const activeIndex = sectionItems.findIndex((section) => section.id === activeSection?.id)
  const prevSection = activeIndex > 0 ? sectionItems[activeIndex - 1] : null
  const nextSection = activeIndex >= 0 && activeIndex < sectionItems.length - 1 ? sectionItems[activeIndex + 1] : null

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input type="hidden" name="payload" value={payload} readOnly />

      <div className="admin-form">
        <section className="admin-section admin-form-section">
          <div className="admin-toolbar">
            <div className="admin-toolbar-row">
              <div className="admin-toolbar-meta">
                <p>Bölüm Seç</p>
                <select
                  className="admin-select"
                  value={activeSectionId}
                  onChange={(event) => setActiveSectionId(event.target.value)}
                >
                  {sectionItems.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-form-row" style={{ gridTemplateColumns: "auto auto", justifyContent: "end" }}>
                <button
                  type="button"
                  className="admin-button admin-button-secondary"
                  disabled={!prevSection}
                  onClick={() => prevSection && setActiveSectionId(prevSection.id)}
                >
                  Önceki
                </button>
                <button
                  type="button"
                  className="admin-button admin-button-secondary"
                  disabled={!nextSection}
                  onClick={() => nextSection && setActiveSectionId(nextSection.id)}
                >
                  Sonraki
                </button>
              </div>
            </div>
            <div className="admin-toolbar-meta">
              <p>Düzenlenen Bölüm</p>
              <h2>{activeSection?.title}</h2>
              <span>{activeSection?.description}</span>
            </div>
          </div>
        </section>

          <section
            className="admin-section admin-form-section"
            id="profil-header"
            style={{ display: activeSectionId === "header" ? "grid" : "none" }}
          >
        <h2 style={{ margin: 0 }}>Header</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <MediaField
            label="Logo"
            value={content.header.logoSrc}
            onChange={(url) => updateHeader("logoSrc", url)}
            allowVideo={false}
            aspect={1}
            outputWidth={900}
            outputHeight={900}
          />
          <input value={content.header.logoAlt} onChange={(e) => updateHeader("logoAlt", e.target.value)} placeholder="Logo alt" />
          <div className="admin-form-row">
            <input value={content.header.cta.label} onChange={(e) => updateHeaderCta("label", e.target.value)} placeholder="CTA metni" />
            <input value={content.header.cta.href} onChange={(e) => updateHeaderCta("href", e.target.value)} placeholder="CTA link" />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Menu Linkleri</h3>
            <button type="button" onClick={addHeaderNav} className="admin-button admin-button-secondary">
              Yeni Link
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.header.nav.map((link, index) => (
              <div key={`${link.label}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={link.label} onChange={(e) => updateHeaderNav(index, "label", e.target.value)} placeholder="Baslik" />
                <input value={link.href} onChange={(e) => updateHeaderNav(index, "href", e.target.value)} placeholder="Link" />
                <button type="button" onClick={() => removeHeaderNav(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section
        className="admin-section admin-form-section"
        id="profil-hero"
        style={{ display: activeSectionId === "hero" ? "grid" : "none" }}
      >
        <div className="admin-form-row" style={{ alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Hero Slider</h2>
          <button type="button" onClick={addHeroSlide} className="admin-button admin-button-secondary">
            Yeni Slide
          </button>
        </div>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          {content.heroSlides.map((slide, index) => (
            <div key={slide.id} className="admin-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>Slide {index + 1}</strong>
                <button type="button" onClick={() => removeHeroSlide(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
              <div className="admin-form-grid" style={{ marginTop: 12 }}>
                <MediaField
                  label="Görsel"
                  value={slide.image}
                  onChange={(url) => updateHeroSlide(index, "image", url)}
                  allowVideo
                  aspect={16 / 9}
                  outputWidth={1600}
                  outputHeight={900}
                />
                {(() => {
                  const { x, y } = parsePosition(slide.imagePosition)
                  return (
                    <div className="admin-card" style={{ padding: 12 }}>
                      <strong>Görsel Odak</strong>
                      <div className="admin-form-grid" style={{ marginTop: 8 }}>
                        <div className="admin-form-row" style={{ alignItems: "center" }}>
                          <span style={{ width: 90 }}>Yatay</span>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={x}
                            onChange={(event) =>
                              updateHeroSlide(index, "imagePosition", formatPosition(Number(event.target.value), y))
                            }
                          />
                          <span style={{ width: 48, textAlign: "right" }}>{x}%</span>
                        </div>
                        <div className="admin-form-row" style={{ alignItems: "center" }}>
                          <span style={{ width: 90 }}>Dikey</span>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={y}
                            onChange={(event) =>
                              updateHeroSlide(index, "imagePosition", formatPosition(x, Number(event.target.value)))
                            }
                          />
                          <span style={{ width: 48, textAlign: "right" }}>{y}%</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}
                <input value={slide.badge} onChange={(e) => updateHeroSlide(index, "badge", e.target.value)} placeholder="Badge" />
                <input value={slide.cta} onChange={(e) => updateHeroSlide(index, "cta", e.target.value)} placeholder="CTA" />
                <input value={slide.highlight} onChange={(e) => updateHeroSlide(index, "highlight", e.target.value)} placeholder="Highlight" />
                <textarea value={slide.description} onChange={(e) => updateHeroSlide(index, "description", e.target.value)} rows={2} placeholder="Aciklama" />
              </div>
              <div style={{ marginTop: 12 }}>
                <div className="admin-form-row" style={{ alignItems: "center" }}>
                  <h4 style={{ margin: 0 }}>Baslik Satirlari</h4>
                  <button type="button" onClick={() => addHeroSlideTitleLine(index)} className="admin-button admin-button-secondary">
                    Yeni Satir
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  {slide.title.map((line, lineIndex) => (
                    <div key={`${slide.id}-title-${lineIndex}`} className="admin-form-row" style={{ alignItems: "center" }}>
                      <input value={line} onChange={(e) => updateHeroSlideTitleLine(index, lineIndex, e.target.value)} placeholder="Baslik" />
                      <button type="button" onClick={() => removeHeroSlideTitleLine(index, lineIndex)} className="admin-button-danger">
                        Sil
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div className="admin-form-row" style={{ alignItems: "center" }}>
                  <h4 style={{ margin: 0 }}>Ozellikler</h4>
                  <button type="button" onClick={() => addHeroSlideFeature(index)} className="admin-button admin-button-secondary">
                    Yeni Ozellik
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  {slide.features.map((feature, featureIndex) => (
                    <div key={`${slide.id}-feature-${featureIndex}`} className="admin-form-row" style={{ alignItems: "center" }}>
                      <input value={feature} onChange={(e) => updateHeroSlideFeature(index, featureIndex, e.target.value)} placeholder="Ozellik" />
                      <button type="button" onClick={() => removeHeroSlideFeature(index, featureIndex)} className="admin-button-danger">
                        Sil
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="admin-section admin-form-section"
        id="profil-hero-controls"
        style={{ display: activeSectionId === "hero-controls" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>Hero Kontrolleri</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input
            value={content.heroControls.primaryCtaHref}
            onChange={(e) => updateHeroControls("primaryCtaHref", e.target.value)}
            placeholder="Birincil CTA link"
          />
          <div className="admin-form-row">
            <input
              value={content.heroControls.secondaryCtaLabel}
              onChange={(e) => updateHeroControls("secondaryCtaLabel", e.target.value)}
              placeholder="Ikincil CTA metni"
            />
            <input
              value={content.heroControls.secondaryCtaHref}
              onChange={(e) => updateHeroControls("secondaryCtaHref", e.target.value)}
              placeholder="Ikincil CTA link"
            />
          </div>
          <div className="admin-form-row">
            <input
              value={content.heroControls.followLabel}
              onChange={(e) => updateHeroControls("followLabel", e.target.value)}
              placeholder="Takip etiketi"
            />
            <input
              value={content.heroControls.followTooltip}
              onChange={(e) => updateHeroControls("followTooltip", e.target.value)}
              placeholder="Tooltip"
            />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Takip Linkleri</h3>
            <button type="button" onClick={addHeroControlsSocial} className="admin-button admin-button-secondary">
              Yeni Link
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.heroControls.followLinks.map((link, index) => (
              <div key={`${link.name}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{link.name || `Link ${index + 1}`}</strong>
                  <button type="button" onClick={() => removeHeroControlsSocial(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={link.name} onChange={(e) => updateHeroControlsSocial(index, "name", e.target.value)} placeholder="Baslik" />
                  <input value={link.href} onChange={(e) => updateHeroControlsSocial(index, "href", e.target.value)} placeholder="Link" />
                  <input value={link.color} onChange={(e) => updateHeroControlsSocial(index, "color", e.target.value)} placeholder="Renk sinifi" />
                  <select value={link.icon} onChange={(e) => updateHeroControlsSocial(index, "icon", e.target.value)}>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Linkedin">Linkedin</option>
                    <option value="Twitter">Twitter</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section
        className="admin-section admin-form-section"
        id="profil-about"
        style={{ display: activeSectionId === "about" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>Hakkimizda</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.about.badge} onChange={(e) => updateAbout("badge", e.target.value)} placeholder="Badge" />
          <div className="admin-form-row">
            <input value={content.about.title} onChange={(e) => updateAbout("title", e.target.value)} placeholder="Baslik" />
            <input value={content.about.titleAccent} onChange={(e) => updateAbout("titleAccent", e.target.value)} placeholder="Vurgu" />
          </div>
          <textarea value={content.about.description} onChange={(e) => updateAbout("description", e.target.value)} placeholder="Aciklama" rows={3} />
          <MediaField
            label="Tanıtım Videosu"
            value={content.about.videoUrl}
            onChange={(url) => updateAbout("videoUrl", url)}
            allowVideo
            aspect={16 / 9}
            outputWidth={1600}
            outputHeight={900}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Ozellikler</h3>
            <button type="button" onClick={addAboutFeature} className="admin-button admin-button-secondary">
              Yeni Ozellik
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.about.features.map((feature, index) => (
              <div key={`${feature.title}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{feature.title || `Ozellik ${index + 1}`}</strong>
                  <button type="button" onClick={() => removeAboutFeature(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={feature.title} onChange={(e) => updateAboutFeature(index, "title", e.target.value)} placeholder="Baslik" />
                  <textarea value={feature.description} onChange={(e) => updateAboutFeature(index, "description", e.target.value)} placeholder="Aciklama" rows={2} />
                  <MediaField
                    label="Görsel"
                    value={feature.image}
                    onChange={(url) => updateAboutFeature(index, "image", url)}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                  <select value={feature.icon} onChange={(e) => updateAboutFeature(index, "icon", e.target.value)}>
                    <option value="CheckCircle2">CheckCircle2</option>
                    <option value="TrendingUp">TrendingUp</option>
                    <option value="Users2">Users2</option>
                    <option value="Lightbulb">Lightbulb</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Istatistikler</h3>
            <button type="button" onClick={addAboutStat} className="admin-button admin-button-secondary">
              Yeni Stat
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.about.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={stat.label} onChange={(e) => updateAboutStat(index, "label", e.target.value)} placeholder="Etiket" />
                <input value={stat.value} onChange={(e) => updateAboutStat(index, "value", e.target.value)} placeholder="Deger" />
                <button type="button" onClick={() => removeAboutStat(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Surec Adimlari</h3>
            <button type="button" onClick={addAboutTimeline} className="admin-button admin-button-secondary">
              Yeni Adim
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.about.timeline.map((item, index) => (
              <div key={`${item.step}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Adim {index + 1}</strong>
                  <button type="button" onClick={() => removeAboutTimeline(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={item.step} onChange={(e) => updateAboutTimeline(index, "step", e.target.value)} placeholder="Adim" />
                  <input value={item.title} onChange={(e) => updateAboutTimeline(index, "title", e.target.value)} placeholder="Baslik" />
                  <textarea value={item.description} onChange={(e) => updateAboutTimeline(index, "description", e.target.value)} placeholder="Aciklama" rows={2} />
                  <MediaField
                    label="Görsel"
                    value={item.image}
                    onChange={(url) => updateAboutTimeline(index, "image", url)}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                  <input value={item.icon} onChange={(e) => updateAboutTimeline(index, "icon", e.target.value)} placeholder="Icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.about.timelineBadge} onChange={(e) => updateAbout("timelineBadge", e.target.value)} placeholder="Surec badge" />
          <div className="admin-form-row">
            <input value={content.about.timelineTitle} onChange={(e) => updateAbout("timelineTitle", e.target.value)} placeholder="Surec basligi" />
            <input value={content.about.timelineTitleAccent} onChange={(e) => updateAbout("timelineTitleAccent", e.target.value)} placeholder="Surec vurgu" />
          </div>
          <textarea value={content.about.timelineDescription} onChange={(e) => updateAbout("timelineDescription", e.target.value)} placeholder="Surec aciklama" rows={2} />
          <div className="admin-form-row">
            <input value={content.about.timelineStepLabel} onChange={(e) => updateAbout("timelineStepLabel", e.target.value)} placeholder="Adim etiketi" />
            <input value={content.about.timelineCompletionLabel} onChange={(e) => updateAbout("timelineCompletionLabel", e.target.value)} placeholder="Tamamlandi etiketi" />
          </div>
          <div className="admin-form-row">
            <input value={content.about.ctaText} onChange={(e) => updateAbout("ctaText", e.target.value)} placeholder="CTA metni" />
            <input value={content.about.ctaButton} onChange={(e) => updateAbout("ctaButton", e.target.value)} placeholder="CTA buton" />
            <input value={content.about.ctaHref} onChange={(e) => updateAbout("ctaHref", e.target.value)} placeholder="CTA link" />
          </div>
        </div>
      </section>





      <section
        className="admin-section admin-form-section"
        id="profil-projects"
        style={{ display: activeSectionId === "projects" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>Projeler</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.projects.eyebrow} onChange={(e) => updateProjects("eyebrow", e.target.value)} placeholder="Eyebrow" />
          <div className="admin-form-row">
            <input value={content.projects.title} onChange={(e) => updateProjects("title", e.target.value)} placeholder="Baslik" />
            <input value={content.projects.titleAccent} onChange={(e) => updateProjects("titleAccent", e.target.value)} placeholder="Vurgu" />
          </div>
          <textarea value={content.projects.description} onChange={(e) => updateProjects("description", e.target.value)} placeholder="Aciklama" rows={3} />
          <div className="admin-form-row">
            <input value={content.projects.ctaNote} onChange={(e) => updateProjects("ctaNote", e.target.value)} placeholder="CTA not" />
            <input value={content.projects.ctaLabel} onChange={(e) => updateProjects("ctaLabel", e.target.value)} placeholder="CTA metin" />
            <input value={content.projects.ctaHref} onChange={(e) => updateProjects("ctaHref", e.target.value)} placeholder="CTA link" />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Kartlar</h3>
            <button type="button" onClick={addProjectItem} className="admin-button admin-button-secondary">
              Yeni Kart
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.projects.items.map((item, index) => (
              <div key={`${item.title}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{item.title || `Kart ${index + 1}`}</strong>
                  <button type="button" onClick={() => removeProjectItem(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={item.title} onChange={(e) => updateProjectItem(index, "title", e.target.value)} placeholder="Baslik" />
                  <input value={item.location} onChange={(e) => updateProjectItem(index, "location", e.target.value)} placeholder="Lokasyon" />
                  <input value={item.category} onChange={(e) => updateProjectItem(index, "category", e.target.value)} placeholder="Kategori" />
                  <MediaField
                    label="Görsel"
                    value={item.image}
                    onChange={(url) => updateProjectItem(index, "image", url)}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                  <input value={item.area} onChange={(e) => updateProjectItem(index, "area", e.target.value)} placeholder="Kalinlik" />
                  <input value={item.year} onChange={(e) => updateProjectItem(index, "year", e.target.value)} placeholder="Not" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="admin-section admin-form-section"
        id="profil-faq"
        style={{ display: activeSectionId === "faq" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>SSS</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.faq.eyebrow} onChange={(e) => updateFaq("eyebrow", e.target.value)} placeholder="Eyebrow" />
          <div className="admin-form-row">
            <input value={content.faq.title} onChange={(e) => updateFaq("title", e.target.value)} placeholder="Baslik" />
            <input value={content.faq.titleAccent} onChange={(e) => updateFaq("titleAccent", e.target.value)} placeholder="Vurgu" />
          </div>
          <textarea value={content.faq.description} onChange={(e) => updateFaq("description", e.target.value)} placeholder="Aciklama" rows={3} />
          <div className="admin-form-row">
            <input value={content.faq.ctaNote} onChange={(e) => updateFaq("ctaNote", e.target.value)} placeholder="CTA not" />
            <input value={content.faq.ctaLabel} onChange={(e) => updateFaq("ctaLabel", e.target.value)} placeholder="CTA metin" />
            <input value={content.faq.ctaHref} onChange={(e) => updateFaq("ctaHref", e.target.value)} placeholder="CTA link" />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Sorular</h3>
            <button type="button" onClick={addFaqItem} className="admin-button admin-button-secondary">
              Yeni Soru
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.faq.items.map((item, index) => (
              <div key={`${item.question}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Soru {index + 1}</strong>
                  <button type="button" onClick={() => removeFaqItem(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={item.question} onChange={(e) => updateFaqItem(index, "question", e.target.value)} placeholder="Soru" />
                  <textarea value={item.answer} onChange={(e) => updateFaqItem(index, "answer", e.target.value)} placeholder="Cevap" rows={3} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="admin-section admin-form-section"
        id="profil-references"
        style={{ display: activeSectionId === "references" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>Referanslar</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.references.eyebrow} onChange={(e) => updateReferences("eyebrow", e.target.value)} placeholder="Eyebrow" />
          <div className="admin-form-row">
            <input value={content.references.title} onChange={(e) => updateReferences("title", e.target.value)} placeholder="Baslik" />
            <input value={content.references.titleAccent} onChange={(e) => updateReferences("titleAccent", e.target.value)} placeholder="Vurgu" />
          </div>
          <textarea value={content.references.description} onChange={(e) => updateReferences("description", e.target.value)} placeholder="Aciklama" rows={3} />
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Logolar</h3>
            <button type="button" onClick={addReferenceClient} className="admin-button admin-button-secondary">
              Yeni Logo
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.references.clients.map((client, index) => (
              <div key={`${client.name}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{client.name || `Logo ${index + 1}`}</strong>
                  <button type="button" onClick={() => removeReferenceClient(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={client.name} onChange={(e) => updateReferenceClient(index, "name", e.target.value)} placeholder="Isim" />
                  <MediaField
                    label="Logo"
                    value={client.logo}
                    onChange={(url) => updateReferenceClient(index, "logo", url)}
                    allowVideo={false}
                    aspect={1}
                    outputWidth={900}
                    outputHeight={900}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Istatistikler</h3>
            <button type="button" onClick={addReferenceStat} className="admin-button admin-button-secondary">
              Yeni Stat
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.references.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={stat.value} onChange={(e) => updateReferenceStat(index, "value", e.target.value)} placeholder="Deger" />
                <input value={stat.label} onChange={(e) => updateReferenceStat(index, "label", e.target.value)} placeholder="Etiket" />
                <button type="button" onClick={() => removeReferenceStat(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="admin-section admin-form-section"
        id="profil-contact"
        style={{ display: activeSectionId === "contact" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>Iletisim Bilgileri</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.contact.phone} onChange={(e) => updateContact("phone", e.target.value)} placeholder="Telefon" />
          <input value={content.contact.email} onChange={(e) => updateContact("email", e.target.value)} placeholder="E-posta" />
          <textarea value={content.contact.address} onChange={(e) => updateContact("address", e.target.value)} placeholder="Adres" rows={2} />
        </div>
      </section>

      <section
        className="admin-section admin-form-section"
        id="profil-contact-section"
        style={{ display: activeSectionId === "contact-section" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>Iletisim Bolumu</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.contactSection.badge} onChange={(e) => updateContactSection("badge", e.target.value)} placeholder="Badge" />
          <div className="admin-form-row">
            <input value={content.contactSection.title} onChange={(e) => updateContactSection("title", e.target.value)} placeholder="Baslik" />
            <input value={content.contactSection.titleAccent} onChange={(e) => updateContactSection("titleAccent", e.target.value)} placeholder="Vurgu" />
          </div>
          <textarea value={content.contactSection.description} onChange={(e) => updateContactSection("description", e.target.value)} placeholder="Aciklama" rows={3} />
        </div>
        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Kartlar</h3>
            <button type="button" onClick={addContactCard} className="admin-button admin-button-secondary">
              Yeni Kart
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.contactSection.cards.map((card, index) => (
              <div key={`${card.title}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{card.title || `Kart ${index + 1}`}</strong>
                  <button type="button" onClick={() => removeContactCard(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={card.title} onChange={(e) => updateContactCard(index, "title", e.target.value)} placeholder="Baslik" />
                  <input value={card.description} onChange={(e) => updateContactCard(index, "description", e.target.value)} placeholder="Aciklama" />
                  <input value={card.color} onChange={(e) => updateContactCard(index, "color", e.target.value)} placeholder="Renk" />
                  <input value={card.iconColor} onChange={(e) => updateContactCard(index, "iconColor", e.target.value)} placeholder="Icon renk" />
                  <select value={card.icon} onChange={(e) => updateContactCard(index, "icon", e.target.value)}>
                    <option value="Phone">Phone</option>
                    <option value="Mail">Mail</option>
                    <option value="MapPin">MapPin</option>
                    <option value="Clock">Clock</option>
                  </select>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div className="admin-form-row" style={{ alignItems: "center" }}>
                    <h4 style={{ margin: 0 }}>Satirlar</h4>
                    <button type="button" onClick={() => addContactCardLine(index)} className="admin-button admin-button-secondary">
                      Yeni Satir
                    </button>
                  </div>
                  <div className="admin-form-grid" style={{ marginTop: 8 }}>
                    {card.lines.map((line, lineIndex) => (
                      <div key={`${card.title}-${lineIndex}`} className="admin-form-row" style={{ alignItems: "center" }}>
                        <input value={line} onChange={(e) => updateContactCardLine(index, lineIndex, e.target.value)} placeholder="Satir" />
                        <button type="button" onClick={() => removeContactCardLine(index, lineIndex)} className="admin-button-danger">
                          Sil
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3 style={{ margin: 0 }}>Form Metinleri</h3>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            <input value={content.contactSection.form.title} onChange={(e) => updateContactForm("title", e.target.value)} placeholder="Form baslik" />
            <textarea value={content.contactSection.form.description} onChange={(e) => updateContactForm("description", e.target.value)} placeholder="Form aciklama" rows={2} />
            <input value={content.contactSection.form.submitLabel} onChange={(e) => updateContactForm("submitLabel", e.target.value)} placeholder="Gonder metni" />
            <input value={content.contactSection.form.submittingLabel} onChange={(e) => updateContactForm("submittingLabel", e.target.value)} placeholder="Gonderiliyor metni" />
            <input value={content.contactSection.form.successMessage} onChange={(e) => updateContactForm("successMessage", e.target.value)} placeholder="Basari mesaji" />
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            <input value={content.contactSection.form.fields.nameLabel} onChange={(e) => updateContactFormField("nameLabel", e.target.value)} placeholder="Ad label" />
            <input value={content.contactSection.form.fields.namePlaceholder} onChange={(e) => updateContactFormField("namePlaceholder", e.target.value)} placeholder="Ad placeholder" />
            <input value={content.contactSection.form.fields.phoneLabel} onChange={(e) => updateContactFormField("phoneLabel", e.target.value)} placeholder="Telefon label" />
            <input value={content.contactSection.form.fields.phonePlaceholder} onChange={(e) => updateContactFormField("phonePlaceholder", e.target.value)} placeholder="Telefon placeholder" />
            <input value={content.contactSection.form.fields.emailLabel} onChange={(e) => updateContactFormField("emailLabel", e.target.value)} placeholder="Email label" />
            <input value={content.contactSection.form.fields.emailPlaceholder} onChange={(e) => updateContactFormField("emailPlaceholder", e.target.value)} placeholder="Email placeholder" />
            <input value={content.contactSection.form.fields.subjectLabel} onChange={(e) => updateContactFormField("subjectLabel", e.target.value)} placeholder="Urun label" />
            <input value={content.contactSection.form.fields.subjectPlaceholder} onChange={(e) => updateContactFormField("subjectPlaceholder", e.target.value)} placeholder="Urun placeholder" />
            <input value={content.contactSection.form.fields.messageLabel} onChange={(e) => updateContactFormField("messageLabel", e.target.value)} placeholder="Mesaj label" />
            <input value={content.contactSection.form.fields.messagePlaceholder} onChange={(e) => updateContactFormField("messagePlaceholder", e.target.value)} placeholder="Mesaj placeholder" />
          </div>
        </div>
      </section>

      <section
        className="admin-section admin-form-section"
        id="profil-footer"
        style={{ display: activeSectionId === "footer" ? "grid" : "none" }}
      >
        <h2 style={{ margin: 0 }}>Footer</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.footer.brand.initials} onChange={(e) => updateFooterBrand("initials", e.target.value)} placeholder="Bas harf" />
          <input value={content.footer.brand.name} onChange={(e) => updateFooterBrand("name", e.target.value)} placeholder="Marka" />
          <textarea value={content.footer.brand.description} onChange={(e) => updateFooterBrand("description", e.target.value)} placeholder="Aciklama" rows={3} />
        </div>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.footer.sectionTitles.services} onChange={(e) => updateFooterSectionTitle("services", e.target.value)} placeholder="Hizmetler baslik" />
          <input value={content.footer.sectionTitles.quickLinks} onChange={(e) => updateFooterSectionTitle("quickLinks", e.target.value)} placeholder="Linkler baslik" />
          <input value={content.footer.sectionTitles.contact} onChange={(e) => updateFooterSectionTitle("contact", e.target.value)} placeholder="Iletisim baslik" />
          <input value={content.footer.sectionTitles.social} onChange={(e) => updateFooterSectionTitle("social", e.target.value)} placeholder="Sosyal baslik" />
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Hizmetler</h3>
            <button type="button" onClick={addFooterService} className="admin-button admin-button-secondary">
              Yeni Hizmet
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.footer.services.map((service, index) => (
              <div key={`${service}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={service} onChange={(e) => updateFooterService(index, e.target.value)} placeholder="Hizmet" />
                <button type="button" onClick={() => removeFooterService(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Hizli Linkler</h3>
            <button type="button" onClick={addFooterQuickLink} className="admin-button admin-button-secondary">
              Yeni Link
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.footer.quickLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={link.label} onChange={(e) => updateFooterQuickLink(index, "label", e.target.value)} placeholder="Baslik" />
                <input value={link.href} onChange={(e) => updateFooterQuickLink(index, "href", e.target.value)} placeholder="Link" />
                <button type="button" onClick={() => removeFooterQuickLink(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Sosyal Linkler</h3>
            <button type="button" onClick={addFooterSocial} className="admin-button admin-button-secondary">
              Yeni Sosyal
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.footer.socialLinks.map((link, index) => (
              <div key={`${link.name}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{link.name || `Sosyal ${index + 1}`}</strong>
                  <button type="button" onClick={() => removeFooterSocial(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 12 }}>
                  <input value={link.name} onChange={(e) => updateFooterSocial(index, "name", e.target.value)} placeholder="Baslik" />
                  <input value={link.href} onChange={(e) => updateFooterSocial(index, "href", e.target.value)} placeholder="Link" />
                  <input value={link.color} onChange={(e) => updateFooterSocial(index, "color", e.target.value)} placeholder="Renk" />
                  <select value={link.icon} onChange={(e) => updateFooterSocial(index, "icon", e.target.value)}>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Linkedin">Linkedin</option>
                    <option value="Twitter">Twitter</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Yasal Linkler</h3>
            <button type="button" onClick={addFooterLegal} className="admin-button admin-button-secondary">
              Yeni Link
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.footer.legalLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={link.label} onChange={(e) => updateFooterLegal(index, "label", e.target.value)} placeholder="Baslik" />
                <input value={link.href} onChange={(e) => updateFooterLegal(index, "href", e.target.value)} placeholder="Link" />
                <button type="button" onClick={() => removeFooterLegal(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.footer.copyright} onChange={(e) => updateFooter("copyright", e.target.value)} placeholder="Copyright" />
        </div>
      </section>

      <div className="admin-form-actions">
        <button type="submit" disabled={isPending} className="admin-button">
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
      </div>
    </form>
  )
}
