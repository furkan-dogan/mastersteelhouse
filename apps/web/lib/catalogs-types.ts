export type CatalogItem = {
  id: string
  title: string
  pdfUrl: string
}

export type CatalogsStore = {
  hero: {
    title: string
    description: string
  }
  items: CatalogItem[]
}
