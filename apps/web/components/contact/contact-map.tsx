import { CONTACT_MAP_EMBED_URL } from '@/lib/contact-details'

type ContactMapProps = {
  isVisible: boolean
}

export function ContactMap({ isVisible }: ContactMapProps) {
  return (
    <div
      className={`max-w-6xl mx-auto mt-16 transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-xl font-bold text-foreground">Konumumuz</h3>
        </div>
        <iframe
          src={CONTACT_MAP_EMBED_URL}
          width="100%"
          height="420"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
          title="Master Steel House Harita"
        />
      </div>
    </div>
  )
}
