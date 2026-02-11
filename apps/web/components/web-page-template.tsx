import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { readWebPage } from "@/lib/web-pages"

type WebPageTemplateProps = {
  slug: string
}

export default async function WebPageTemplate({ slug }: WebPageTemplateProps) {
  const content = await readWebPage(slug)

  if (content.template !== "info") {
    return null
  }

  const storySection = content.sections[0]
  const valuesSections = content.sections.slice(1)
  const gridImages = content.sections
    .map((section) => section.image)
    .filter(Boolean)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <Header />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-[0.3em] border border-accent/20">
              {content.hero.eyebrow}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-6 text-balance text-foreground">
              {content.hero.title} <span className="text-accent">{content.hero.titleAccent}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-4">
              {content.hero.description}
            </p>
          </div>

          <div className="relative h-[320px] md:h-[420px] mt-10 rounded-3xl overflow-hidden shadow-xl">
            <Image src={content.hero.image} alt={content.hero.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      {storySection ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold">
                  {storySection.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-accent">{storySection.title.split(" ").slice(-1)}</span>
                </h2>
                <div className="mt-6 space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <p>{storySection.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {gridImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className={`relative rounded-2xl overflow-hidden shadow-lg ${
                      index % 2 === 0 ? "h-40 md:h-44" : "h-52 md:h-56"
                    }`}
                  >
                    <Image src={image} alt={storySection.title} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {valuesSections.length > 0 ? (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Degerlerimiz</h2>
              <p className="text-muted-foreground mt-2">Basarimizin arkasindaki temel degerlerimiz</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {valuesSections.map((section) => (
                <div
                  key={section.title}
                  className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
                >
                  <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">{content.cta.label}</h2>
            <p className="text-white/80 mt-2">{content.cta.note}</p>
          </div>
          <a
            href={content.cta.href}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-primary font-semibold shadow-lg shadow-accent/30 hover:scale-[1.02] transition"
          >
            {content.cta.label}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
