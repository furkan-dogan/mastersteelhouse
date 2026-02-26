import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Master Steel House Profil Sistemleri',
    short_name: 'MSH Profil',
    description: 'Galvanizli profil sistemleri: delikli alçı köşe, kaba sıva ve tavan U-C profilleri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f4f1',
    theme_color: '#eab308',
    icons: [
      {
        src: '/logoprofil.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logoprofil.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
