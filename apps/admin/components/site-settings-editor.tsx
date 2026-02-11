"use client"

import { useMemo, useState, useTransition } from "react"
import type { SiteSettings, SiteNavItem, SiteNavGroup, SiteLink } from "@/lib/site-settings"
import MediaField from "@/components/media-field"

const iconOptions = ["Facebook", "Instagram", "Linkedin", "Twitter"] as const
const contactIconOptions = ["Phone", "Mail", "MapPin", "Clock"] as const

type SiteSettingsEditorProps = {
  initialSettings: SiteSettings
  saveAction: (formData: FormData) => Promise<{ ok: boolean }>
}

export default function SiteSettingsEditor({ initialSettings, saveAction }: SiteSettingsEditorProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [status, setStatus] = useState<string>("")
  const [isPending, startTransition] = useTransition()

  const payload = useMemo(() => JSON.stringify(settings), [settings])

  const updateMeta = (key: keyof SiteSettings["meta"], value: string) => {
    setSettings((prev) => ({ ...prev, meta: { ...prev.meta, [key]: value } }))
  }

  const updateHeader = (key: keyof SiteSettings["header"], value: string) => {
    setSettings((prev) => ({ ...prev, header: { ...prev.header, [key]: value } }))
  }

  const updateHeaderCta = (key: "label" | "href", value: string) => {
    setSettings((prev) => ({ ...prev, header: { ...prev.header, cta: { ...prev.header.cta, [key]: value } } }))
  }

  const updateNavItem = (index: number, next: SiteNavItem) => {
    setSettings((prev) => {
      const nav = [...prev.header.nav]
      nav[index] = next
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const addNavItem = () => {
    setSettings((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        nav: [...prev.header.nav, { type: "link", label: "Yeni Link", href: "#" }],
      },
    }))
  }

  const removeNavItem = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      header: { ...prev.header, nav: prev.header.nav.filter((_, i) => i !== index) },
    }))
  }

  const updateNavGroup = (itemIndex: number, groupIndex: number, next: SiteNavGroup) => {
    setSettings((prev) => {
      const nav = [...prev.header.nav]
      const item = nav[itemIndex]
      if (item.type !== "dropdown") return prev
      const groups = [...item.groups]
      groups[groupIndex] = next
      nav[itemIndex] = { ...item, groups }
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const addNavGroup = (itemIndex: number) => {
    setSettings((prev) => {
      const nav = [...prev.header.nav]
      const item = nav[itemIndex]
      if (item.type !== "dropdown") return prev
      nav[itemIndex] = {
        ...item,
        groups: [...item.groups, { title: "Yeni Grup", items: [] }],
      }
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const removeNavGroup = (itemIndex: number, groupIndex: number) => {
    setSettings((prev) => {
      const nav = [...prev.header.nav]
      const item = nav[itemIndex]
      if (item.type !== "dropdown") return prev
      nav[itemIndex] = { ...item, groups: item.groups.filter((_, i) => i !== groupIndex) }
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const updateNavGroupItem = (itemIndex: number, groupIndex: number, linkIndex: number, next: SiteLink) => {
    setSettings((prev) => {
      const nav = [...prev.header.nav]
      const item = nav[itemIndex]
      if (item.type !== "dropdown") return prev
      const groups = [...item.groups]
      const group = groups[groupIndex]
      const items = [...group.items]
      items[linkIndex] = next
      groups[groupIndex] = { ...group, items }
      nav[itemIndex] = { ...item, groups }
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const addNavGroupItem = (itemIndex: number, groupIndex: number) => {
    setSettings((prev) => {
      const nav = [...prev.header.nav]
      const item = nav[itemIndex]
      if (item.type !== "dropdown") return prev
      const groups = [...item.groups]
      const group = groups[groupIndex]
      groups[groupIndex] = { ...group, items: [...group.items, { label: "Yeni Link", href: "#" }] }
      nav[itemIndex] = { ...item, groups }
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const removeNavGroupItem = (itemIndex: number, groupIndex: number, linkIndex: number) => {
    setSettings((prev) => {
      const nav = [...prev.header.nav]
      const item = nav[itemIndex]
      if (item.type !== "dropdown") return prev
      const groups = [...item.groups]
      const group = groups[groupIndex]
      groups[groupIndex] = { ...group, items: group.items.filter((_, i) => i !== linkIndex) }
      nav[itemIndex] = { ...item, groups }
      return { ...prev, header: { ...prev.header, nav } }
    })
  }

  const updateFooterBrand = (key: keyof SiteSettings["footer"]["brand"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      footer: { ...prev.footer, brand: { ...prev.footer.brand, [key]: value } },
    }))
  }

  const updateFooterSectionTitle = (
    key: keyof SiteSettings["footer"]["sectionTitles"],
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        sectionTitles: { ...prev.footer.sectionTitles, [key]: value },
      },
    }))
  }

  const updateFooterList = (key: "services" | "quickLinks" | "legalLinks", items: string[] | SiteLink[]) => {
    setSettings((prev) => ({ ...prev, footer: { ...prev.footer, [key]: items } }))
  }

  const updateFooterSocial = (index: number, key: "name" | "href" | "icon" | "color", value: string) => {
    setSettings((prev) => {
      const socials = [...prev.footer.socialLinks]
      socials[index] = { ...socials[index], [key]: value } as SiteSettings["footer"]["socialLinks"][number]
      return { ...prev, footer: { ...prev.footer, socialLinks: socials } }
    })
  }

  const addFooterSocial = () => {
    setSettings((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        socialLinks: [
          ...prev.footer.socialLinks,
          { name: "Instagram", href: "#", icon: "Instagram", color: "hover:bg-pink-500" },
        ],
      },
    }))
  }

  const removeFooterSocial = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      footer: { ...prev.footer, socialLinks: prev.footer.socialLinks.filter((_, i) => i !== index) },
    }))
  }

  const updateFooterContact = (key: "email" | "address", value: string) => {
    setSettings((prev) => ({
      ...prev,
      footer: { ...prev.footer, contact: { ...prev.footer.contact, [key]: value } },
    }))
  }

  const updateFooterPhone = (index: number, value: string) => {
    setSettings((prev) => {
      const phones = [...prev.footer.contact.phones]
      phones[index] = value
      return { ...prev, footer: { ...prev.footer, contact: { ...prev.footer.contact, phones } } }
    })
  }

  const addFooterPhone = () => {
    setSettings((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        contact: { ...prev.footer.contact, phones: [...prev.footer.contact.phones, ""] },
      },
    }))
  }

  const removeFooterPhone = (index: number) => {
    setSettings((prev) => {
      const phones = prev.footer.contact.phones.filter((_, i) => i !== index)
      return { ...prev, footer: { ...prev.footer, contact: { ...prev.footer.contact, phones } } }
    })
  }

  const updateFooterCopyright = (value: string) => {
    setSettings((prev) => ({ ...prev, footer: { ...prev.footer, copyright: value } }))
  }

  const updateContactSection = (key: keyof SiteSettings["contactSection"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      contactSection: { ...prev.contactSection, [key]: value },
    }))
  }

  const updateContactCard = (
    index: number,
    key: "icon" | "title" | "description",
    value: string
  ) => {
    setSettings((prev) => {
      const cards = [...prev.contactSection.cards]
      cards[index] = { ...cards[index], [key]: value } as SiteSettings["contactSection"]["cards"][number]
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const updateContactCardLine = (cardIndex: number, lineIndex: number, value: string) => {
    setSettings((prev) => {
      const cards = [...prev.contactSection.cards]
      const lines = [...cards[cardIndex].lines]
      lines[lineIndex] = value
      cards[cardIndex] = { ...cards[cardIndex], lines }
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const addContactCardLine = (cardIndex: number) => {
    setSettings((prev) => {
      const cards = [...prev.contactSection.cards]
      const lines = [...cards[cardIndex].lines, ""]
      cards[cardIndex] = { ...cards[cardIndex], lines }
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const removeContactCardLine = (cardIndex: number, lineIndex: number) => {
    setSettings((prev) => {
      const cards = [...prev.contactSection.cards]
      const lines = cards[cardIndex].lines.filter((_, i) => i !== lineIndex)
      cards[cardIndex] = { ...cards[cardIndex], lines }
      return { ...prev, contactSection: { ...prev.contactSection, cards } }
    })
  }

  const updateContactForm = (
    key: "heading" | "description" | "submitLabel" | "submittingLabel" | "successMessage" | "requiredMarker",
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      contactSection: { ...prev.contactSection, form: { ...prev.contactSection.form, [key]: value } },
    }))
  }

  const updateContactFormField = (
    key: keyof SiteSettings["contactSection"]["form"]["fields"],
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      contactSection: {
        ...prev.contactSection,
        form: {
          ...prev.contactSection.form,
          fields: { ...prev.contactSection.form.fields, [key]: value },
        },
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
        <header>
          <h2 style={{ margin: 0 }}>SEO Meta</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Başlık, açıklama ve Open Graph ayarları.</p>
        </header>

        <div className="admin-form-grid">
          <input value={settings.meta.title} onChange={(e) => updateMeta("title", e.target.value)} placeholder="Meta başlık" />
          <input value={settings.meta.ogTitle} onChange={(e) => updateMeta("ogTitle", e.target.value)} placeholder="Open Graph başlık" />
          <textarea value={settings.meta.description} onChange={(e) => updateMeta("description", e.target.value)} placeholder="Meta açıklama" rows={2} />
          <textarea value={settings.meta.ogDescription} onChange={(e) => updateMeta("ogDescription", e.target.value)} placeholder="Open Graph açıklama" rows={2} />
          <input value={settings.meta.keywords} onChange={(e) => updateMeta("keywords", e.target.value)} placeholder="Anahtar kelimeler" />
        </div>
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>Header Ayarları</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Logo, menü ve CTA düzenlemesi.</p>
        </header>

        <div className="admin-form-grid">
          <MediaField
            label="Logo"
            value={settings.header.logoSrc}
            onChange={(url) => updateHeader("logoSrc", url)}
            allowVideo={false}
            aspect={1}
            outputWidth={900}
            outputHeight={900}
          />
          <input value={settings.header.logoAlt} onChange={(e) => updateHeader("logoAlt", e.target.value)} placeholder="Logo alt" />
          <input value={settings.header.cta.label} onChange={(e) => updateHeaderCta("label", e.target.value)} placeholder="CTA Yazısı" />
          <input value={settings.header.cta.href} onChange={(e) => updateHeaderCta("href", e.target.value)} placeholder="CTA Link" />
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Menü Öğeleri</strong>
            <button type="button" onClick={addNavItem} className="admin-button admin-button-secondary">
              Yeni Menü
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {settings.header.nav.map((item, index) => (
              <div key={`${item.label}-${index}`} className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>Menü {index + 1}</strong>
                  <button type="button" onClick={() => removeNavItem(index)} className="admin-button-danger">
                    Sil
                  </button>
                </div>
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <select
                    value={item.type}
                    onChange={(e) =>
                      updateNavItem(
                        index,
                        e.target.value === "dropdown"
                          ? { type: "dropdown", label: item.label, groups: item.type === "dropdown" ? item.groups : [] }
                          : { type: "link", label: item.label, href: item.type === "link" ? item.href : "#" }
                      )
                    }
                  >
                    <option value="link">Link</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                  <input
                    value={item.label}
                    onChange={(e) =>
                      updateNavItem(
                        index,
                        item.type === "dropdown"
                          ? { ...item, label: e.target.value }
                          : { ...item, label: e.target.value }
                      )
                    }
                    placeholder="Menü Başlığı"
                  />
                  {item.type === "link" ? (
                    <input
                      value={item.href}
                      onChange={(e) => updateNavItem(index, { ...item, href: e.target.value })}
                      placeholder="Link"
                    />
                  ) : (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>Dropdown Grupları</strong>
                        <button
                          type="button"
                          className="admin-button admin-button-secondary"
                          onClick={() => addNavGroup(index)}
                        >
                          Yeni Grup
                        </button>
                      </div>
                      <div className="admin-form-grid" style={{ marginTop: 8 }}>
                        {item.groups.map((group, groupIndex) => (
                          <div key={`${group.title}-${groupIndex}`} className="admin-card">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <strong>Grup {groupIndex + 1}</strong>
                              <button
                                type="button"
                                className="admin-button-danger"
                                onClick={() => removeNavGroup(index, groupIndex)}
                              >
                                Sil
                              </button>
                            </div>
                            <div className="admin-form-grid" style={{ marginTop: 8 }}>
                              <input
                                value={group.title}
                                onChange={(e) =>
                                  updateNavGroup(index, groupIndex, { ...group, title: e.target.value })
                                }
                                placeholder="Grup Başlığı"
                              />
                            </div>
                            <div style={{ marginTop: 8 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <strong>Grup Linkleri</strong>
                                <button
                                  type="button"
                                  className="admin-button admin-button-secondary"
                                  onClick={() => addNavGroupItem(index, groupIndex)}
                                >
                                  Yeni Link
                                </button>
                              </div>
                              <div className="admin-form-grid" style={{ marginTop: 8 }}>
                                {group.items.map((link, linkIndex) => (
                                  <div key={`${link.label}-${linkIndex}`} className="admin-form-grid">
                                    <input
                                      value={link.label}
                                      onChange={(e) =>
                                        updateNavGroupItem(index, groupIndex, linkIndex, { ...link, label: e.target.value })
                                      }
                                      placeholder="Link adı"
                                    />
                                    <input
                                      value={link.href}
                                      onChange={(e) =>
                                        updateNavGroupItem(index, groupIndex, linkIndex, { ...link, href: e.target.value })
                                      }
                                      placeholder="Link"
                                    />
                                    <MediaField
                                      label="Görsel (opsiyonel)"
                                      value={link.image ?? ""}
                                      onChange={(url) =>
                                        updateNavGroupItem(index, groupIndex, linkIndex, { ...link, image: url })
                                      }
                                      allowVideo={false}
                                      aspect={4 / 3}
                                      outputWidth={1200}
                                      outputHeight={900}
                                    />
                                    <div className="admin-form-actions" style={{ justifyContent: "flex-end" }}>
                                      <button
                                        type="button"
                                        className="admin-button-danger"
                                        onClick={() => removeNavGroupItem(index, groupIndex, linkIndex)}
                                      >
                                        Sil
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>Footer Ayarları</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Marka, hizmetler ve iletişim bilgileri.</p>
        </header>

        <div className="admin-form-grid">
          <input value={settings.footer.brand.initials} onChange={(e) => updateFooterBrand("initials", e.target.value)} placeholder="Kısaltma" />
          <input value={settings.footer.brand.name} onChange={(e) => updateFooterBrand("name", e.target.value)} placeholder="Marka adı" />
          <textarea value={settings.footer.brand.description} onChange={(e) => updateFooterBrand("description", e.target.value)} placeholder="Açıklama" rows={2} />
        </div>

        <div className="admin-form-grid">
          <input
            value={settings.footer.sectionTitles.services}
            onChange={(e) => updateFooterSectionTitle("services", e.target.value)}
            placeholder="Hizmetler başlık"
          />
          <input
            value={settings.footer.sectionTitles.quickLinks}
            onChange={(e) => updateFooterSectionTitle("quickLinks", e.target.value)}
            placeholder="Hızlı linkler başlık"
          />
          <input
            value={settings.footer.sectionTitles.contact}
            onChange={(e) => updateFooterSectionTitle("contact", e.target.value)}
            placeholder="İletişim başlık"
          />
          <input
            value={settings.footer.sectionTitles.social}
            onChange={(e) => updateFooterSectionTitle("social", e.target.value)}
            placeholder="Sosyal başlık"
          />
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Hizmetler</strong>
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={() => updateFooterList("services", [...settings.footer.services, ""])}
            >
              Yeni Hizmet
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {settings.footer.services.map((service, index) => (
              <div key={`${service}-${index}`} className="admin-form-row">
                <input
                  value={service}
                  onChange={(e) => {
                    const next = [...settings.footer.services]
                    next[index] = e.target.value
                    updateFooterList("services", next)
                  }}
                  placeholder="Hizmet"
                />
                <button
                  type="button"
                  className="admin-button-danger"
                  onClick={() => updateFooterList("services", settings.footer.services.filter((_, i) => i !== index))}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Hızlı Linkler</strong>
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={() => updateFooterList("quickLinks", [...settings.footer.quickLinks, { label: "", href: "" }])}
            >
              Yeni Link
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {settings.footer.quickLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="admin-form-row">
                <input
                  value={link.label}
                  onChange={(e) => {
                    const next = [...settings.footer.quickLinks]
                    next[index] = { ...next[index], label: e.target.value }
                    updateFooterList("quickLinks", next)
                  }}
                  placeholder="Link adı"
                />
                <input
                  value={link.href}
                  onChange={(e) => {
                    const next = [...settings.footer.quickLinks]
                    next[index] = { ...next[index], href: e.target.value }
                    updateFooterList("quickLinks", next)
                  }}
                  placeholder="Link"
                />
                <button
                  type="button"
                  className="admin-button-danger"
                  onClick={() => updateFooterList("quickLinks", settings.footer.quickLinks.filter((_, i) => i !== index))}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Sosyal Linkler</strong>
            <button type="button" className="admin-button admin-button-secondary" onClick={addFooterSocial}>
              Yeni Sosyal
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {settings.footer.socialLinks.map((social, index) => (
              <div key={`${social.name}-${index}`} className="admin-card">
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <input value={social.name} onChange={(e) => updateFooterSocial(index, "name", e.target.value)} placeholder="Ad" />
                  <input value={social.href} onChange={(e) => updateFooterSocial(index, "href", e.target.value)} placeholder="Link" />
                  <select value={social.icon} onChange={(e) => updateFooterSocial(index, "icon", e.target.value)}>
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <input value={social.color} onChange={(e) => updateFooterSocial(index, "color", e.target.value)} placeholder="Hover class" />
                </div>
                <button type="button" className="admin-button-danger" onClick={() => removeFooterSocial(index)}>
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>İletişim</strong>
            <button type="button" className="admin-button admin-button-secondary" onClick={addFooterPhone}>
              Yeni Telefon
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {settings.footer.contact.phones.map((phone, index) => (
              <div key={`${phone}-${index}`} className="admin-form-row">
                <input value={phone} onChange={(e) => updateFooterPhone(index, e.target.value)} placeholder="Telefon" />
                <button type="button" className="admin-button-danger" onClick={() => removeFooterPhone(index)}>
                  Sil
                </button>
              </div>
            ))}
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            <input value={settings.footer.contact.email} onChange={(e) => updateFooterContact("email", e.target.value)} placeholder="E-posta" />
            <input value={settings.footer.contact.address} onChange={(e) => updateFooterContact("address", e.target.value)} placeholder="Adres" />
          </div>
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>Yasal Linkler</strong>
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={() => updateFooterList("legalLinks", [...settings.footer.legalLinks, { label: "", href: "" }])}
            >
              Yeni Link
            </button>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {settings.footer.legalLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="admin-form-row">
                <input
                  value={link.label}
                  onChange={(e) => {
                    const next = [...settings.footer.legalLinks]
                    next[index] = { ...next[index], label: e.target.value }
                    updateFooterList("legalLinks", next)
                  }}
                  placeholder="Link adı"
                />
                <input
                  value={link.href}
                  onChange={(e) => {
                    const next = [...settings.footer.legalLinks]
                    next[index] = { ...next[index], href: e.target.value }
                    updateFooterList("legalLinks", next)
                  }}
                  placeholder="Link"
                />
                <button
                  type="button"
                  className="admin-button-danger"
                  onClick={() => updateFooterList("legalLinks", settings.footer.legalLinks.filter((_, i) => i !== index))}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-form-grid">
          <input value={settings.footer.copyright} onChange={(e) => updateFooterCopyright(e.target.value)} placeholder="Copyright" />
        </div>
      </section>

      <section className="admin-section admin-form-section">
        <header>
          <h2 style={{ margin: 0 }}>İletişim Bölümü</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>İletişim kartları ve form alanı.</p>
        </header>

        <div className="admin-form-grid">
          <input value={settings.contactSection.eyebrow} onChange={(e) => updateContactSection("eyebrow", e.target.value)} placeholder="Etiket" />
          <input value={settings.contactSection.title} onChange={(e) => updateContactSection("title", e.target.value)} placeholder="Başlık" />
          <input value={settings.contactSection.titleAccent} onChange={(e) => updateContactSection("titleAccent", e.target.value)} placeholder="Vurgulu Başlık" />
          <textarea value={settings.contactSection.description} onChange={(e) => updateContactSection("description", e.target.value)} placeholder="Açıklama" rows={2} />
        </div>

        <div>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>İletişim Kartları</strong>
          </header>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {settings.contactSection.cards.map((card, index) => (
              <div key={`${card.title}-${index}`} className="admin-card">
                <div className="admin-form-grid" style={{ marginTop: 8 }}>
                  <select value={card.icon} onChange={(e) => updateContactCard(index, "icon", e.target.value)}>
                    {contactIconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <input value={card.title} onChange={(e) => updateContactCard(index, "title", e.target.value)} placeholder="Başlık" />
                  <input value={card.description} onChange={(e) => updateContactCard(index, "description", e.target.value)} placeholder="Açıklama" />
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>Satırlar</strong>
                    <button type="button" className="admin-button admin-button-secondary" onClick={() => addContactCardLine(index)}>
                      Yeni Satır
                    </button>
                  </div>
                  <div className="admin-form-grid" style={{ marginTop: 8 }}>
                    {card.lines.map((line, lineIndex) => (
                      <div key={`${line}-${lineIndex}`} className="admin-form-row">
                        <input value={line} onChange={(e) => updateContactCardLine(index, lineIndex, e.target.value)} />
                        <button type="button" className="admin-button-danger" onClick={() => removeContactCardLine(index, lineIndex)}>
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

        <div className="admin-form-grid">
          <input value={settings.contactSection.form.heading} onChange={(e) => updateContactForm("heading", e.target.value)} placeholder="Form başlığı" />
          <input value={settings.contactSection.form.description} onChange={(e) => updateContactForm("description", e.target.value)} placeholder="Form açıklaması" />
          <input value={settings.contactSection.form.submitLabel} onChange={(e) => updateContactForm("submitLabel", e.target.value)} placeholder="Buton metni" />
          <input value={settings.contactSection.form.submittingLabel} onChange={(e) => updateContactForm("submittingLabel", e.target.value)} placeholder="Gönderiliyor metni" />
          <input value={settings.contactSection.form.requiredMarker} onChange={(e) => updateContactForm("requiredMarker", e.target.value)} placeholder="Zorunlu işaret" />
          <textarea value={settings.contactSection.form.successMessage} onChange={(e) => updateContactForm("successMessage", e.target.value)} placeholder="Başarı mesajı" rows={2} />
        </div>

        <div className="admin-form-grid">
          <input value={settings.contactSection.form.fields.nameLabel} onChange={(e) => updateContactFormField("nameLabel", e.target.value)} placeholder="İsim etiketi" />
          <input value={settings.contactSection.form.fields.namePlaceholder} onChange={(e) => updateContactFormField("namePlaceholder", e.target.value)} placeholder="İsim placeholder" />
          <input value={settings.contactSection.form.fields.phoneLabel} onChange={(e) => updateContactFormField("phoneLabel", e.target.value)} placeholder="Telefon etiketi" />
          <input value={settings.contactSection.form.fields.phonePlaceholder} onChange={(e) => updateContactFormField("phonePlaceholder", e.target.value)} placeholder="Telefon placeholder" />
          <input value={settings.contactSection.form.fields.emailLabel} onChange={(e) => updateContactFormField("emailLabel", e.target.value)} placeholder="E-posta etiketi" />
          <input value={settings.contactSection.form.fields.emailPlaceholder} onChange={(e) => updateContactFormField("emailPlaceholder", e.target.value)} placeholder="E-posta placeholder" />
          <input value={settings.contactSection.form.fields.subjectLabel} onChange={(e) => updateContactFormField("subjectLabel", e.target.value)} placeholder="Konu etiketi" />
          <input value={settings.contactSection.form.fields.subjectPlaceholder} onChange={(e) => updateContactFormField("subjectPlaceholder", e.target.value)} placeholder="Konu placeholder" />
          <input value={settings.contactSection.form.fields.messageLabel} onChange={(e) => updateContactFormField("messageLabel", e.target.value)} placeholder="Mesaj etiketi" />
          <input value={settings.contactSection.form.fields.messagePlaceholder} onChange={(e) => updateContactFormField("messagePlaceholder", e.target.value)} placeholder="Mesaj placeholder" />
        </div>
      </section>

      <div className="admin-form-actions">
        <button type="submit" className="admin-button" disabled={isPending}>
          {isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {status && <span style={{ color: status === "Kaydedildi" ? "#16a34a" : "#b91c1c" }}>{status}</span>}
      </div>
    </form>
  )
}
