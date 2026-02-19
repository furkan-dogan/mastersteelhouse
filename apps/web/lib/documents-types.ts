export type DocumentItem = {
  id: string
  title: string
  subtitle: string
  description: string
  pdfUrl: string
}

export type DocumentsStore = {
  hero: {
    badge: string
    title: string
    titleAccent: string
    description: string
  }
  items: DocumentItem[]
  features: string[]
  footerNote: string
}
