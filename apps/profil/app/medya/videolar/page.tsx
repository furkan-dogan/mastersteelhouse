import { notFound } from 'next/navigation'
import { buildProfileMetadata } from '@/lib/seo'

export const metadata = buildProfileMetadata({
  title: 'Videolar',
  description: 'Bu sayfa şu anda kullanılmıyor.',
  path: '/medya/videolar',
  robots: { index: false, follow: false },
})

export default function RemovedProfileVideosPage() {
  notFound()
}
