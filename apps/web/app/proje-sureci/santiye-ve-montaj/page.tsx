import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'

export default function SantiyeVeMontaj() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Şantiye ve Montaj
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-12">
                Profesyonel ekibimizle hızlı ve güvenli montaj
              </p>
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <Image src="/process-assembly.jpg" alt="Şantiye ve Montaj" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
