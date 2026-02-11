"use client"

import { useMemo, useState, useTransition } from "react"
import type { HomeContent } from "@/lib/home-content"
import MediaField from "@/components/media-field"

type SaveAction = (formData: FormData) => Promise<{ ok: boolean }>

type HomeEditorProps = {
  initialContent: HomeContent
  saveAction: SaveAction
}

const iconOptions = ["CheckCircle2", "TrendingUp", "Users2", "Lightbulb"] as const
const heroSocialIconOptions = ["Instagram", "Facebook", "Twitter", "Linkedin", "Youtube"] as const
const heroSocialToneOptions = ["instagram", "facebook", "twitter", "linkedin", "youtube", "accent"] as const

export default function HomeEditor({ initialContent, saveAction }: HomeEditorProps) {
  const [content, setContent] = useState<HomeContent>(initialContent)
  const [status, setStatus] = useState<string>("")
  const [isPending, startTransition] = useTransition()
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

  const updateHeroSlide = (
    index: number,
    key: keyof HomeContent["hero"]["slides"][number],
    value: string | string[]
  ) => {
    setContent((prev) => {
      const slides = [...prev.hero.slides]
      const slide = { ...slides[index], [key]: value }
      slides[index] = slide
      return { ...prev, hero: { ...prev.hero, slides } }
    })
  }

  const addHeroSlide = () => {
    setContent((prev) => {
      const nextId = prev.hero.slides.length + 1
      return {
        ...prev,
        hero: {
          ...prev.hero,
          slides: [
            ...prev.hero.slides,
            {
              id: nextId,
              image: "",
              badge: "",
              title: ["", "", ""],
              description: "",
              cta: "",
              highlight: "",
              features: [],
            },
          ],
        },
      }
    })
  }

  const removeHeroSlide = (index: number) => {
    setContent((prev) => {
      const slides = prev.hero.slides.filter((_, i) => i !== index)
      return { ...prev, hero: { ...prev.hero, slides } }
    })
  }

  const updateHeroControls = (
    key: keyof HomeContent["hero"]["controls"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, controls: { ...prev.hero.controls, [key]: value } },
    }))
  }

  const updateHeroSocial = (
    index: number,
    key: keyof HomeContent["hero"]["controls"]["followLinks"][number],
    value: string
  ) => {
    setContent((prev) => {
      const followLinks = [...prev.hero.controls.followLinks]
      followLinks[index] = { ...followLinks[index], [key]: value }
      return {
        ...prev,
        hero: {
          ...prev.hero,
          controls: { ...prev.hero.controls, followLinks },
        },
      }
    })
  }

  const addHeroSocial = () => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        controls: {
          ...prev.hero.controls,
          followLinks: [
            ...prev.hero.controls.followLinks,
            { name: "Instagram", href: "#", icon: "Instagram", color: "instagram" },
          ],
        },
      },
    }))
  }

  const removeHeroSocial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        controls: {
          ...prev.hero.controls,
          followLinks: prev.hero.controls.followLinks.filter((_, i) => i !== index),
        },
      },
    }))
  }

  const updateAbout = (key: keyof HomeContent["about"], value: string) => {
    setContent((prev) => ({ ...prev, about: { ...prev.about, [key]: value } }))
  }

  const updateAboutFeature = (
    index: number,
    key: keyof HomeContent["about"]["features"][number],
    value: string
  ) => {
    setContent((prev) => {
      const features = [...prev.about.features]
      const feature = { ...features[index], [key]: value }
      features[index] = feature
      return { ...prev, about: { ...prev.about, features } }
    })
  }

  const addAboutFeature = () => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        features: [
          ...prev.about.features,
          { icon: "CheckCircle2", title: "", description: "", image: "" },
        ],
      },
    }))
  }

  const removeAboutFeature = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        features: prev.about.features.filter((_, i) => i !== index),
      },
    }))
  }

  const updateAboutStat = (
    index: number,
    key: keyof HomeContent["about"]["stats"][number],
    value: string
  ) => {
    setContent((prev) => {
      const stats = [...prev.about.stats]
      const stat = { ...stats[index], [key]: value }
      stats[index] = stat
      return { ...prev, about: { ...prev.about, stats } }
    })
  }

  const addAboutStat = () => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: [...prev.about.stats, { value: "", label: "" }],
      },
    }))
  }

  const removeAboutStat = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: prev.about.stats.filter((_, i) => i !== index),
      },
    }))
  }

  const updateTimeline = (
    index: number,
    key: keyof HomeContent["about"]["timeline"][number],
    value: string
  ) => {
    setContent((prev) => {
      const timeline = [...prev.about.timeline]
      const item = { ...timeline[index], [key]: value }
      timeline[index] = item
      return { ...prev, about: { ...prev.about, timeline } }
    })
  }

  const addTimeline = () => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        timeline: [
          ...prev.about.timeline,
          { step: "", title: "", description: "", image: "", icon: "" },
        ],
      },
    }))
  }

  const updateProjectsSection = (key: keyof HomeContent["projects"], value: string) => {
    setContent((prev) => ({
      ...prev,
      projects: { ...prev.projects, [key]: value },
    }))
  }

  const updateProjectItem = (
    index: number,
    key: keyof HomeContent["projects"]["items"][number],
    value: string
  ) => {
    setContent((prev) => {
      const items = [...prev.projects.items]
      const nextValue = key === "id" ? Number.parseInt(value, 10) || 0 : value
      items[index] = { ...items[index], [key]: nextValue }
      return { ...prev, projects: { ...prev.projects, items } }
    })
  }

  const addProjectItem = () => {
    setContent((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: [
          ...prev.projects.items,
          {
            id: prev.projects.items.length + 1,
            title: "",
            location: "",
            category: "",
            image: "",
            area: "",
            year: "",
          },
        ],
      },
    }))
  }

  const removeProjectItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: prev.projects.items.filter((_, i) => i !== index),
      },
    }))
  }

  const updateFaqSection = (key: keyof HomeContent["faq"], value: string) => {
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

  const updateReferencesSection = (key: keyof HomeContent["references"], value: string) => {
    setContent((prev) => ({
      ...prev,
      references: { ...prev.references, [key]: value },
    }))
  }

  const updateReferenceClient = (
    index: number,
    key: keyof HomeContent["references"]["clients"][number],
    value: string
  ) => {
    setContent((prev) => {
      const clients = [...prev.references.clients]
      const nextValue = key === "id" ? Number.parseInt(value, 10) || 0 : value
      clients[index] = { ...clients[index], [key]: nextValue }
      return { ...prev, references: { ...prev.references, clients } }
    })
  }

  const addReferenceClient = () => {
    setContent((prev) => ({
      ...prev,
      references: {
        ...prev.references,
        clients: [
          ...prev.references.clients,
          { id: prev.references.clients.length + 1, name: "", logo: "" },
        ],
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

  const updateReferenceStat = (
    index: number,
    key: "value" | "label",
    value: string
  ) => {
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
        stats: [...prev.references.stats, { value: "", label: "" }],
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

  const removeTimeline = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        timeline: prev.about.timeline.filter((_, i) => i !== index),
      },
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setStatus("")

    startTransition(async () => {
      try {
        await saveAction(formData)
        setStatus("Kaydedildi")
      } catch {
        setStatus("Kaydetme sırasında hata oluştu")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input type="hidden" name="payload" value={payload} readOnly />

      <section className="admin-section admin-form-section">
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0 }}>Hero Alanı</h2>
            <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Slider içeriklerini düzenleyin.</p>
          </div>
          <button type="button" onClick={addHeroSlide} className="admin-button admin-button-secondary">
            Yeni Slide
          </button>
        </header>

        {content.hero.slides.map((slide, index) => (
          <div key={slide.id} className="admin-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Slide {index + 1}</strong>
              <button
                type="button"
                onClick={() => removeHeroSlide(index)}
                className="admin-button-danger"
              >
                Sil
              </button>
            </div>
            <div className="admin-form-grid" style={{ marginTop: 12 }}>
              <MediaField
                label="Görsel"
                description="Hero slide için görsel veya video yükleyin."
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
              <input
                value={slide.badge}
                onChange={(e) => updateHeroSlide(index, "badge", e.target.value)}
                placeholder="Badge"
              />
              <input
                value={slide.cta}
                onChange={(e) => updateHeroSlide(index, "cta", e.target.value)}
                placeholder="CTA"
              />
              <input
                value={slide.highlight}
                onChange={(e) => updateHeroSlide(index, "highlight", e.target.value)}
                placeholder="Highlight"
              />
              <textarea
                value={slide.description}
                onChange={(e) => updateHeroSlide(index, "description", e.target.value)}
                placeholder="Açıklama"
                rows={3}
              />
              <input
                value={slide.title.join(" | ")}
                onChange={(e) =>
                  updateHeroSlide(
                    index,
                    "title",
                    e.target.value.split("|").map((item) => item.trim())
                  )
                }
                placeholder="Başlık satırları (| ile ayır)"
              />
              <input
                value={slide.features.join(" | ")}
                onChange={(e) =>
                  updateHeroSlide(
                    index,
                    "features",
                    e.target.value.split("|").map((item) => item.trim())
                  )
                }
                placeholder="Öne çıkanlar (| ile ayır)"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>Hero Kontrolleri</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Buton bağlantıları ve takip şeridi.</p>
        </header>

        <div className="admin-form-grid">
          <input
            value={content.hero.controls.primaryCtaHref}
            onChange={(e) => updateHeroControls("primaryCtaHref", e.target.value)}
            placeholder="Ana CTA bağlantısı"
          />
          <input
            value={content.hero.controls.secondaryCtaLabel}
            onChange={(e) => updateHeroControls("secondaryCtaLabel", e.target.value)}
            placeholder="İkincil CTA etiketi"
          />
          <input
            value={content.hero.controls.secondaryCtaHref}
            onChange={(e) => updateHeroControls("secondaryCtaHref", e.target.value)}
            placeholder="İkincil CTA bağlantısı"
          />
          <input
            value={content.hero.controls.followLabel}
            onChange={(e) => updateHeroControls("followLabel", e.target.value)}
            placeholder="Takip etiketi"
          />
          <input
            value={content.hero.controls.followTooltip}
            onChange={(e) => updateHeroControls("followTooltip", e.target.value)}
            placeholder="Takip tooltip metni"
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Takip Linkleri</strong>
            <button type="button" onClick={addHeroSocial} className="admin-button admin-button-secondary">
              Yeni Link
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.hero.controls.followLinks.map((link, index) => (
              <div key={`${link.name}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{link.name || `Link ${index + 1}`}</strong>
                  <button
                    type="button"
                    onClick={() => removeHeroSocial(index)}
                    className="admin-button-danger"
                  >
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <input
                    value={link.name}
                    onChange={(e) => updateHeroSocial(index, "name", e.target.value)}
                    placeholder="Sosyal adı"
                  />
                  <input
                    value={link.href}
                    onChange={(e) => updateHeroSocial(index, "href", e.target.value)}
                    placeholder="Bağlantı"
                  />
                  <select
                    value={link.icon}
                    onChange={(e) => updateHeroSocial(index, "icon", e.target.value)}
                  >
                    {heroSocialIconOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select
                    value={link.color}
                    onChange={(e) => updateHeroSocial(index, "color", e.target.value)}
                  >
                    {heroSocialToneOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>Hakkımızda Bölümü</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Metin, özellikler ve süreç adımları.</p>
        </header>

        <div className="admin-form-grid">
          <input value={content.about.badge} onChange={(e) => updateAbout("badge", e.target.value)} placeholder="Badge" />
          <input value={content.about.title} onChange={(e) => updateAbout("title", e.target.value)} placeholder="Başlık" />
          <input value={content.about.titleAccent} onChange={(e) => updateAbout("titleAccent", e.target.value)} placeholder="Vurgulu Başlık" />
          <textarea value={content.about.description} onChange={(e) => updateAbout("description", e.target.value)} placeholder="Açıklama" rows={3} />
          <MediaField
            label="Tanıtım Videosu"
            description="MP4 video veya görsel yükleyin."
            value={content.about.videoUrl}
            onChange={(url) => updateAbout("videoUrl", url)}
            allowVideo
            aspect={16 / 9}
            outputWidth={1600}
            outputHeight={900}
          />
          <input value={content.about.ctaText} onChange={(e) => updateAbout("ctaText", e.target.value)} placeholder="CTA Metni" />
          <input value={content.about.ctaButton} onChange={(e) => updateAbout("ctaButton", e.target.value)} placeholder="CTA Buton" />
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Özellik Kartları</strong>
            <button type="button" onClick={addAboutFeature} className="admin-button admin-button-secondary">
              Yeni Kart
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.about.features.map((feature, index) => (
              <div key={`${feature.title}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Özellik {index + 1}</strong>
                  <button
                    type="button"
                    onClick={() => removeAboutFeature(index)}
                    className="admin-button-danger"
                  >
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <select value={feature.icon} onChange={(e) => updateAboutFeature(index, "icon", e.target.value)}>
                    {iconOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input value={feature.title} onChange={(e) => updateAboutFeature(index, "title", e.target.value)} placeholder="Başlık" />
                  <textarea value={feature.description} onChange={(e) => updateAboutFeature(index, "description", e.target.value)} placeholder="Açıklama" rows={2} />
                  <MediaField
                    label="Görsel"
                    value={feature.image}
                    onChange={(url) => updateAboutFeature(index, "image", url)}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>İstatistikler</strong>
            <button type="button" onClick={addAboutStat} className="admin-button admin-button-secondary">
              Yeni Stat
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.about.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={stat.value} onChange={(e) => updateAboutStat(index, "value", e.target.value)} placeholder="Değer" />
                <input value={stat.label} onChange={(e) => updateAboutStat(index, "label", e.target.value)} placeholder="Etiket" />
                <button type="button" onClick={() => removeAboutStat(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Süreç Adımları</strong>
            <button type="button" onClick={addTimeline} className="admin-button admin-button-secondary">
              Yeni Adım
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.about.timeline.map((item, index) => (
              <div key={`${item.step}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Adım {index + 1}</strong>
                  <button
                    type="button"
                    onClick={() => removeTimeline(index)}
                    className="admin-button-danger"
                  >
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <input value={item.step} onChange={(e) => updateTimeline(index, "step", e.target.value)} placeholder="Sıra" />
                  <input value={item.title} onChange={(e) => updateTimeline(index, "title", e.target.value)} placeholder="Başlık" />
                  <textarea value={item.description} onChange={(e) => updateTimeline(index, "description", e.target.value)} placeholder="Açıklama" rows={2} />
                  <MediaField
                    label="Görsel"
                    value={item.image}
                    onChange={(url) => updateTimeline(index, "image", url)}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                  <input value={item.icon} onChange={(e) => updateTimeline(index, "icon", e.target.value)} placeholder="Emoji" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>Projeler Bölümü</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Projeler ve kart içerikleri.</p>
        </header>

        <div className="admin-form-grid">
          <input value={content.projects.eyebrow} onChange={(e) => updateProjectsSection("eyebrow", e.target.value)} placeholder="Etiket" />
          <input value={content.projects.title} onChange={(e) => updateProjectsSection("title", e.target.value)} placeholder="Başlık" />
          <input value={content.projects.titleAccent} onChange={(e) => updateProjectsSection("titleAccent", e.target.value)} placeholder="Vurgulu Başlık" />
          <textarea value={content.projects.description} onChange={(e) => updateProjectsSection("description", e.target.value)} placeholder="Açıklama" rows={2} />
          <input value={content.projects.areaLabel} onChange={(e) => updateProjectsSection("areaLabel", e.target.value)} placeholder="Alan Etiketi" />
          <input value={content.projects.yearLabel} onChange={(e) => updateProjectsSection("yearLabel", e.target.value)} placeholder="Yıl Etiketi" />
          <input value={content.projects.ctaNote} onChange={(e) => updateProjectsSection("ctaNote", e.target.value)} placeholder="CTA Notu" />
          <input value={content.projects.ctaLabel} onChange={(e) => updateProjectsSection("ctaLabel", e.target.value)} placeholder="CTA Buton" />
          <input value={content.projects.ctaHref} onChange={(e) => updateProjectsSection("ctaHref", e.target.value)} placeholder="CTA Link" />
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Proje Kartları</strong>
            <button type="button" onClick={addProjectItem} className="admin-button admin-button-secondary">
              Yeni Proje
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.projects.items.map((project, index) => (
              <div key={`${project.title}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Proje {index + 1}</strong>
                  <button
                    type="button"
                    onClick={() => removeProjectItem(index)}
                    className="admin-button-danger"
                  >
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <input value={String(project.id)} onChange={(e) => updateProjectItem(index, "id", e.target.value)} placeholder="ID" />
                  <input value={project.title} onChange={(e) => updateProjectItem(index, "title", e.target.value)} placeholder="Başlık" />
                  <input value={project.location} onChange={(e) => updateProjectItem(index, "location", e.target.value)} placeholder="Lokasyon" />
                  <input value={project.category} onChange={(e) => updateProjectItem(index, "category", e.target.value)} placeholder="Kategori" />
                  <MediaField
                    label="Görsel"
                    value={project.image}
                    onChange={(url) => updateProjectItem(index, "image", url)}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                  <input value={project.area} onChange={(e) => updateProjectItem(index, "area", e.target.value)} placeholder="Alan/Ölçü" />
                  <input value={project.year} onChange={(e) => updateProjectItem(index, "year", e.target.value)} placeholder="Yıl/Not" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>SSS Bölümü</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Soru-cevap listesi.</p>
        </header>

        <div className="admin-form-grid">
          <input value={content.faq.eyebrow} onChange={(e) => updateFaqSection("eyebrow", e.target.value)} placeholder="Etiket" />
          <input value={content.faq.title} onChange={(e) => updateFaqSection("title", e.target.value)} placeholder="Başlık" />
          <input value={content.faq.titleAccent} onChange={(e) => updateFaqSection("titleAccent", e.target.value)} placeholder="Vurgulu Başlık" />
          <textarea value={content.faq.description} onChange={(e) => updateFaqSection("description", e.target.value)} placeholder="Açıklama" rows={2} />
          <input value={content.faq.ctaNote} onChange={(e) => updateFaqSection("ctaNote", e.target.value)} placeholder="CTA Notu" />
          <input value={content.faq.ctaLabel} onChange={(e) => updateFaqSection("ctaLabel", e.target.value)} placeholder="CTA Buton" />
          <input value={content.faq.ctaHref} onChange={(e) => updateFaqSection("ctaHref", e.target.value)} placeholder="CTA Link" />
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Soru ve Cevaplar</strong>
            <button type="button" onClick={addFaqItem} className="admin-button admin-button-secondary">
              Yeni Soru
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.faq.items.map((faq, index) => (
              <div key={`${faq.question}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Soru {index + 1}</strong>
                  <button type="button" onClick={() => removeFaqItem(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <input value={faq.question} onChange={(e) => updateFaqItem(index, "question", e.target.value)} placeholder="Soru" />
                  <textarea value={faq.answer} onChange={(e) => updateFaqItem(index, "answer", e.target.value)} placeholder="Cevap" rows={3} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>Referans Bölümü</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Logo listesi ve istatistikler.</p>
        </header>

        <div className="admin-form-grid">
          <input value={content.references.eyebrow} onChange={(e) => updateReferencesSection("eyebrow", e.target.value)} placeholder="Etiket" />
          <input value={content.references.title} onChange={(e) => updateReferencesSection("title", e.target.value)} placeholder="Başlık" />
          <input value={content.references.titleAccent} onChange={(e) => updateReferencesSection("titleAccent", e.target.value)} placeholder="Vurgulu Başlık" />
          <textarea value={content.references.description} onChange={(e) => updateReferencesSection("description", e.target.value)} placeholder="Açıklama" rows={2} />
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Referans Logoları</strong>
            <button type="button" onClick={addReferenceClient} className="admin-button admin-button-secondary">
              Yeni Logo
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.references.clients.map((client, index) => (
              <div key={`${client.name}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Logo {index + 1}</strong>
                  <button type="button" onClick={() => removeReferenceClient(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <input value={String(client.id)} onChange={(e) => updateReferenceClient(index, "id", e.target.value)} placeholder="ID" />
                  <input value={client.name} onChange={(e) => updateReferenceClient(index, "name", e.target.value)} placeholder="Ad" />
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

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>İstatistikler</strong>
            <button type="button" onClick={addReferenceStat} className="admin-button admin-button-secondary">
              Yeni Stat
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.references.stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="admin-form-row" style={{ alignItems: "center" }}>
                <input value={stat.value} onChange={(e) => updateReferenceStat(index, "value", e.target.value)} placeholder="Değer" />
                <input value={stat.label} onChange={(e) => updateReferenceStat(index, "label", e.target.value)} placeholder="Etiket" />
                <button type="button" onClick={() => removeReferenceStat(index)} className="admin-button-danger">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="admin-form-actions">
        <button type="submit" disabled={isPending} className="admin-button">
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {status && <span style={{ color: status === "Kaydedildi" ? "#16a34a" : "#b91c1c" }}>{status}</span>}
      </div>
    </form>
  )
}
