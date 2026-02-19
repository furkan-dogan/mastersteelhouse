export type SharedWebPageContent = {
  slug: string
  template: string
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    description: string
    image: string
  }
  sections?: Array<{
    title: string
    description: string
    image: string
    bullets: string[]
  }>
  cta?: { label: string; href: string; note: string }
  categories?: string[]
  items?: Array<{
    id: number
    title: string
    location: string
    categories: string[]
    image: string
    area: string
  }>
}

export function normalizeWebPage<T extends SharedWebPageContent>(content: T): T {
  if (content.template === "references") {
    return {
      ...content,
      categories: content.categories ?? ["Tumu"],
      items: content.items ?? [],
    } as T
  }

  return {
    ...content,
    sections: content.sections ?? [],
    cta: content.cta ?? { label: "Iletisim", href: "/iletisim", note: "" },
  } as T
}
