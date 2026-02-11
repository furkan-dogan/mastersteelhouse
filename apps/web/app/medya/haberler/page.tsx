import WebPageTemplate from "@/components/web-page-template"
import { readWebPage } from "@/lib/web-pages"

export async function generateMetadata() {
  const content = await readWebPage("medya-haberler")
  return {
    title: `${content.hero.title} | Master Steel House`,
    description: content.hero.description,
  }
}

export default function HaberlerPage() {
  return <WebPageTemplate slug="medya-haberler" />
}
