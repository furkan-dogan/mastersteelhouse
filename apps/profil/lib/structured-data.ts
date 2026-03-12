import { absoluteProfileUrl } from '@/lib/seo'

export type BreadcrumbItem = {
  name: string
  path: string
}

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteProfileUrl(item.path),
    })),
  }
}
