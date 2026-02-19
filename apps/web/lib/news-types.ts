export type MediaPlacement = {
  fit?: 'cover' | 'contain'
  x?: number
  y?: number
  zoom?: number
}

export type NewsSection = {
  id?: string
  title: string
  content: string
  image?: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
}

export type NewsPost = {
  slug: string
  title: string
  date: string
  location: string
  author: string
  category: string
  readTime: string
  excerpt: string
  image: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
  imagePlacementCard?: MediaPlacement
  imagePlacementHero?: MediaPlacement
  featured: boolean
  sections: NewsSection[]
  gallery?: string[]
}
