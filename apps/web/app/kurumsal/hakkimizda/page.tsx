import WebPageTemplate from "@/components/web-page-template"
import { readWebPage } from "@/lib/web-pages"

export async function generateMetadata() {
  const content = await readWebPage("hakkimizda")
  return {
    title: `${content.hero.title} | Master Steel House`,
    description: content.hero.description,
  }
}

export default function HakkimizdaPage() {
  return <WebPageTemplate slug="hakkimizda" />
}
