import { BRAND_NAME, getSiteUrl, toAbsoluteUrl } from '@/lib/seo'
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONES } from '@/lib/contact-details'
import { socialLinks } from '@/lib/site-settings'

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
      item: toAbsoluteUrl(item.path),
    })),
  }
}

/**
 * Organization schema built only from facts already published elsewhere on
 * the site (footer/contact page phone+email, the address shown on the
 * contact page, and the social links already rendered in the hero social
 * strip). No rating, review, price, or founding-date fields are invented.
 */
export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: BRAND_NAME,
    url: siteUrl,
    logo: toAbsoluteUrl('/logoshortblack.png'),
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONES[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_ADDRESS,
      addressCountry: 'TR',
    },
    sameAs: socialLinks.map((social) => social.href),
  }
}

/**
 * Deliberately omits price, offers, availability, aggregateRating, and
 * review fields — none of that data is published anywhere on the site, and
 * Phase 2A's rules explicitly forbid inventing it. What remains (name,
 * description, image, category, brand) is still a valid, honest Product
 * entity per schema.org even without commerce fields.
 */
export function buildProductSchema({
  name,
  description,
  image,
  url,
  category,
}: {
  name: string
  description: string
  image: string
  url: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image.startsWith('http') ? image : toAbsoluteUrl(image),
    url: toAbsoluteUrl(url),
    category,
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
  }
}

export function buildWebsiteSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: BRAND_NAME,
    url: siteUrl,
  }
}
