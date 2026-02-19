import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'

export default function LojistikVeSevkiyat() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Lojistik ve Sevkiyat
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-12">
                Güvenli taşıma ve zamanında teslimat garantisi
              </p>
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <Image src="/process-logistics.jpg" alt="Lojistik ve Sevkiyat" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
