import WebPageTemplate from "@/components/web-page-template"
import { readWebPage } from "@/lib/web-pages"

export async function generateMetadata() {
  const content = await readWebPage("uretim-dizayn-yazilimi")
  return {
    title: `${content.hero.title} | Master Steel House`,
    description: content.hero.description,
  }
}

export default function DizaynYazilimiPage() {
  return <WebPageTemplate slug="uretim-dizayn-yazilimi" />
}
