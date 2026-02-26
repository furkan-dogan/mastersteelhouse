import { notFound } from 'next/navigation'
import { buildProfileMetadata } from '@/lib/seo'

export const metadata = buildProfileMetadata({
  title: 'Referanslar',
  description: 'Bu sayfa şu anda kullanılmıyor.',
  path: '/referanslar',
  robots: { index: false, follow: false },
})

export default function ReferanslarPage() {
  notFound()
}
