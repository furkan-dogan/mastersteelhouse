import 'server-only'

import { normalizeCmsMediaUrl, readCmsJson } from '@/lib/cms-fetch'

export type ProductFeatures = {
  rooms: string
  bathrooms: string
  parking: string
  height: string
  deliveryTime: string
  earthquakeResistance: string
  energyClass: string
  warranty: string
}

export type ProductItem = {
  categorySlug: string
  slug: string
  name: string
  area: string
  image: string
  description: string
  features: ProductFeatures
  technicalDetails: Record<string, string>
  highlights: string[]
  gallery: string[]
  floorPlans: { name: string; image: string }[]
}

export type ProductCategory = {
  slug: string
  title: string
  description: string
}

type ProductStore = {
  categories: ProductCategory[]
  products: Array<{
    categorySlug: string
    slug: string
    name: string
    area: string
    image: string
    cardImage?: string
    sliderImage?: string
    description: string
    features?: Partial<ProductFeatures>
    technicalDetails?: Record<string, string>
    highlights?: string[]
    gallery?: string[]
    floorPlans?: { name: string; image: string }[]
  }>
}

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
]

const DEFAULT_FLOOR_PLANS = [
  { name: 'Zemin Kat', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80' },
  { name: '1. Kat', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80' },
]

const DEFAULT_TECHNICAL_DETAILS = {
  'Taşıyıcı Sistem': 'Galvanizli hafif çelik konstrüksiyon',
  'Dış Duvar': '14 cm çelik karkas + taş yünü izolasyon',
  'İç Duvar': '9 cm çelik karkas + taş yünü izolasyon',
  Çatı: 'Kumsuz metal kiremit',
  'Dış Cephe': 'Nem bariyeri + boardex + mineral sıva',
  'İç Cephe': 'OSB üzeri alçıpan + silikonlu boya',
}

const DEFAULT_HIGHLIGHTS = [
  'Depreme dayanıklı yapı',
  'Hızlı üretim ve montaj',
  'Enerji verimli tasarım',
  'Ses ve ısı yalıtımı',
  'Uzun ömürlü çelik sistem',
  'Modern mimari çizgiler',
]

const TECHNICAL_DETAIL_KEY_MAP: Record<string, string> = {
  TasiyiciSistem: 'Taşıyıcı Sistem',
  DisDuvar: 'Dış Duvar',
  IcDuvar: 'İç Duvar',
  Cati: 'Çatı',
  DisCephe: 'Dış Cephe',
  IcCephe: 'İç Cephe',
}

const TURKISH_TEXT_REPLACEMENTS: Array<[string, string]> = [
  ['Tasiyici', 'Taşıyıcı'],
  ['tasiyici', 'taşıyıcı'],
  ['Celik', 'Çelik'],
  ['celik', 'çelik'],
  ['konstruksiyon', 'konstrüksiyon'],
  ['Konstruksiyon', 'Konstrüksiyon'],
  ['Yapi', 'Yapı'],
  ['yapi', 'yapı'],
  ['Yapisi', 'Yapısı'],
  ['yapisi', 'yapısı'],
  ['Yapilari', 'Yapıları'],
  ['yapilari', 'yapıları'],
  ['Yuksek', 'Yüksek'],
  ['yuksek', 'yüksek'],
  ['Cok', 'Çok'],
  ['cok', 'çok'],
  ['Cozumleri', 'Çözümleri'],
  ['cozumleri', 'çözümleri'],
  ['Cozumu', 'Çözümü'],
  ['cozumu', 'çözümü'],
  ['Cozum', 'Çözüm'],
  ['cozum', 'çözüm'],
  ['Hizli', 'Hızlı'],
  ['hizli', 'hızlı'],
  ['Tasarim', 'Tasarım'],
  ['tasarim', 'tasarım'],
  ['tasarlanmis', 'tasarlanmış'],
  ['Tasarlanmis', 'Tasarlanmış'],
  ['cizgi', 'çizgi'],
  ['Cizgi', 'Çizgi'],
  ['detaylari', 'detayları'],
  ['Detaylari', 'Detayları'],
  ['plani', 'planı'],
  ['Plani', 'Planı'],
  ['olcekli', 'ölçekli'],
  ['Olcekli', 'Ölçekli'],
  ['olceginde', 'ölçeğinde'],
  ['Olceginde', 'Ölçeğinde'],
  ['olcekte', 'ölçekte'],
  ['Olcekte', 'Ölçekte'],
  ['buyuyen', 'büyüyen'],
  ['Buyuyen', 'Büyüyen'],
  ['buyuk', 'büyük'],
  ['Buyuk', 'Büyük'],
  ['guvenli', 'güvenli'],
  ['Guvenli', 'Güvenli'],
  ['guclu', 'güçlü'],
  ['Guclu', 'Güçlü'],
  ['moduler', 'modüler'],
  ['Moduler', 'Modüler'],
  ['kampusu', 'kampüsü'],
  ['Kampusu', 'Kampüsü'],
  ['ziyaretci', 'ziyaretçi'],
  ['Ziyaretci', 'Ziyaretçi'],
  ['sinif', 'sınıf'],
  ['Sinif', 'Sınıf'],
  ['calisma', 'çalışma'],
  ['Calisma', 'Çalışma'],
  ['toplanti', 'toplantı'],
  ['Toplanti', 'Toplantı'],
  ['acik', 'açık'],
  ['Acik', 'Açık'],
  ['kres', 'kreş'],
  ['Kres', 'Kreş'],
  ['yasamina', 'yaşamına'],
  ['Yasamina', 'Yaşamına'],
  ['gelistirilmis', 'geliştirilmiş'],
  ['Gelistirilmis', 'Geliştirilmiş'],
  ['one cikan', 'öne çıkan'],
  ['One cikan', 'Öne çıkan'],
  ['Uretim', 'Üretim'],
  ['uretim', 'üretim'],
  ['Araclik', 'Araçlık'],
  ['araclik', 'araçlık'],
  ['Dayanim', 'Dayanım'],
  ['dayanim', 'dayanım'],
  ['Yalitim', 'Yalıtım'],
  ['yalitim', 'yalıtım'],
  ['Omurlu', 'Ömürlü'],
  ['omurlu', 'ömürlü'],
  ['Yil', 'Yıl'],
  ['yil', 'yıl'],
  ['Katli', 'Katlı'],
  ['katli', 'katlı'],
  ['Icin', 'İçin'],
  ['icin', 'için'],
  ['Ahsap', 'Ahşap'],
  ['ahsap', 'ahşap'],
  ['tas yunu', 'taş yünü'],
  ['Siva', 'Sıva'],
  ['siva', 'sıva'],
  ['Uzeri', 'Üzeri'],
  ['uzeri', 'üzeri'],
  ['Alcipan', 'Alçıpan'],
  ['alcipan', 'alçıpan'],
  ['Guncel', 'Güncel'],
  ['guncel', 'güncel'],
  ['Yasam', 'Yaşam'],
  ['yasam', 'yaşam'],
  ['islevselligi', 'işlevselliği'],
]

function normalizeTurkishText(input: string | undefined): string {
  if (!input) return ''
  let next = input
  for (const [from, to] of TURKISH_TEXT_REPLACEMENTS) {
    next = next.replaceAll(from, to)
  }
  return next
}

function normalizeTechnicalDetails(details?: Record<string, string>): Record<string, string> {
  const source = details ?? DEFAULT_TECHNICAL_DETAILS
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [
      TECHNICAL_DETAIL_KEY_MAP[key] ?? normalizeTurkishText(key),
      normalizeTurkishText(value),
    ])
  )
}

function isProductStore(value: unknown): value is ProductStore {
  if (!value || typeof value !== 'object') return false
  const candidate = value as ProductStore
  return Array.isArray(candidate.categories) && Array.isArray(candidate.products)
}

async function readStore(): Promise<ProductStore> {
  return readCmsJson<ProductStore>({
    r2Key: '_cms/products-cms.json',
    devApiPath: '/api/products',
    localFileName: 'products-cms.json',
    validate: isProductStore,
  })
}

function normalizeProduct(product: ProductStore['products'][number]): ProductItem {
  return {
    categorySlug: product.categorySlug,
    slug: product.slug,
    name: normalizeTurkishText(product.name),
    area: product.area,
    image: normalizeCmsMediaUrl(product.image || product.cardImage || product.sliderImage || product.gallery?.[0]),
    description: normalizeTurkishText(product.description),
    features: {
      rooms: normalizeTurkishText(product.features?.rooms ?? '2+1'),
      bathrooms: normalizeTurkishText(product.features?.bathrooms ?? '1'),
      parking: normalizeTurkishText(product.features?.parking ?? '1 Araçlık'),
      height: normalizeTurkishText(product.features?.height ?? '2.80m'),
      deliveryTime: normalizeTurkishText(product.features?.deliveryTime ?? '6-8 Hafta'),
      earthquakeResistance: normalizeTurkishText(product.features?.earthquakeResistance ?? 'Yüksek Dayanım'),
      energyClass: normalizeTurkishText(product.features?.energyClass ?? 'A+'),
      warranty: normalizeTurkishText(product.features?.warranty ?? '20 Yıl'),
    },
    technicalDetails: normalizeTechnicalDetails(product.technicalDetails),
    highlights: (product.highlights ?? DEFAULT_HIGHLIGHTS).map((value) => normalizeTurkishText(value)),
    gallery: (product.gallery ?? DEFAULT_GALLERY).map((url) => normalizeCmsMediaUrl(url)),
    floorPlans: (product.floorPlans ?? DEFAULT_FLOOR_PLANS).map((plan) => ({
      ...plan,
      name: normalizeTurkishText(plan.name),
      image: normalizeCmsMediaUrl(plan.image),
    })),
  }
}

export async function getCategories(): Promise<ProductCategory[]> {
  const store = await readStore()
  return store.categories.map((category) => ({
    ...category,
    title: normalizeTurkishText(category.title),
    description: normalizeTurkishText(category.description),
  }))
}

export async function getCategoryBySlug(categorySlug: string): Promise<ProductCategory | undefined> {
  const categories = await getCategories()
  return categories.find((category) => category.slug === categorySlug)
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductItem[]> {
  const store = await readStore()
  return store.products.filter((item) => item.categorySlug === categorySlug).map(normalizeProduct)
}

export async function getProduct(categorySlug: string, slug: string): Promise<ProductItem | undefined> {
  const products = await getProductsByCategory(categorySlug)
  return products.find((product) => product.slug === slug)
}

export async function getAllProductPaths(): Promise<{ category: string; slug: string }[]> {
  const store = await readStore()
  return store.products.map((product) => ({ category: product.categorySlug, slug: product.slug }))
}
