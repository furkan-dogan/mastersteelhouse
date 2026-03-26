'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Section = {
  title: string
  items: string[]
}

const sections: Section[] = [
  {
    title: 'Master Steel House Sorumlulukları',
    items: [
      'Hafif çelik (S280 sertifikalı) karkas imalatı ve montajının, projede belirtilen ölçü ve teknik detaylara uygun şekilde yapılması,',
      'Dış duvar; İzolasyon + 11 mm OSB + Nem Bariyeri + Boardex + Fileli Akrilik Sıva + Silikonlu Dış Cephe Boyası,',
      'İç duvar; İzolasyon + 11 mm OSB + Beyaz Alçıpan + Fileli Alçı Sıva Saten + Saten İç Cephe Boyası,',
      'Tavan; Alçıpan + Saten Sıva + Tavan Boyası,',
      'Çatı; Hafif Çelik Karkas Üzeri + 11 mm OSB + İzolasyon Örtü + Kenet Çatı (Farklı çatı kaplama malzemeleri ayrıca fiyatlandırılacaktır.),',
      'Elektrik tesisatının sıva altı kablolama işlerinin yapılması,',
      'Sıhhi tesisat sıcak-soğuk su hatlarının döşenmesi (bina içi),',
      'Projede belirtilen ölçülerde dış kapı, iç kapılar (melamin),',
      'PVC doğramaların temini ve montajı (4+16+4 ısıcam),',
      'Mutfak dolapları ve granit tezgah temin ve montajı,',
      'Priz, anahtar ve benzeri elektrik ekipmanlarının temin edilmesi,',
      'Vitrifiye, batarya, duşakabin temin ve montaj edilmesi,',
      'Nakliye gideri,',
      'İşin, belirlenen iş programına uygun şekilde tamamlanması,',
      'Standart malzemeler ile uygulama yapılması; müşteri talepli değişikliklerin ayrıca fiyatlandırılması.',
    ],
  },
  {
    title: 'Müşteri Sorumlulukları',
    items: [
      'Tüm resmi işlemler; abonelikler, ruhsat, izinler, vergi, harç ve yasal yükümlülüklerin yerine getirilmesi,',
      'İnşaat sahasının hazırlanması (temel, beton, şap, zemin, altyapı ve çevre düzenlemesi dahil),',
      'Montaj sırasında ihtiyaç duyulabilecek vinç ve benzeri ekipmanların temin edilmesi,',
      'Bina dışı elektrik ve sıhhi tesisat ana bağlantılarının yapılması,',
      'Rampa, korkuluk ve benzeri özel imalatların temini ve yaptırılması,',
      'Montaj ekibinin organizasyonu, konaklama (ibate), yemek (iaşe) ve ulaşım giderlerinin karşılanması,',
      'Teklif kapsamında yer almayan tüm işlerin ayrıca organize edilmesi ve karşılanması,',
      'Malzeme seçimlerinde standart dışı tercihlerden doğacak fiyat farklarının karşılanması.',
    ],
  },
]

function AccordionItem({ section, index }: { section: Section; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-background hover:bg-muted/40 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-base md:text-lg">{section.title}</span>
        <ChevronDown
          className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ol className="px-6 py-5 space-y-3 border-t border-border bg-muted/20">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="text-accent font-bold shrink-0 w-5 text-right">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export function ResponsibilitiesAccordion() {
  return (
    <div className="space-y-3">
      {sections.map((section, i) => (
        <AccordionItem key={i} section={section} index={i} />
      ))}
    </div>
  )
}
