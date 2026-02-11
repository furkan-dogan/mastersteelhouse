import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { readWebPage } from "@/lib/web-pages"
import ReferencesClient from "@/components/references-client"

export async function generateMetadata() {
  const content = await readWebPage("referanslar")
  return {
    title: `${content.hero.title} | Master Steel House`,
    description: content.hero.description,
  }
}

export default async function ReferencesPage() {
  const content = await readWebPage("referanslar")

  if (content.template !== "references") {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">{content.hero.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {content.hero.title} <span className="text-accent">{content.hero.titleAccent}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.hero.description}</p>
          </div>

          <ReferencesClient categories={content.categories} items={content.items} />
        </div>
      </main>
      <Footer />
    </>
  )
}
