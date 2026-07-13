/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  async redirects() {
    return [
      // Legacy top-level pages
      { source: '/hakkimizda', destination: '/kurumsal/hakkimizda', permanent: true },
      { source: '/hizmetler', destination: '/uretim/celik-yapi-uretim', permanent: true },
      { source: '/sertifikalar', destination: '/kurumsal/belgelerimiz', permanent: true },
      { source: '/blog', destination: '/medya/blog', permanent: true },
      { source: '/projeler', destination: '/referanslar', permanent: true },
      { source: '/urunler', destination: '/urunler/tek-katli-celik-villalar', permanent: true },

      // Legacy detail patterns
      { source: '/blog/:slug', destination: '/medya/blog', permanent: true },
      { source: '/projeler/:slug', destination: '/referanslar', permanent: true },
      { source: '/urunler/alci-kose-profili', destination: '/uretim/celik-yapi-uretim', permanent: true },
      { source: '/urunler/kaba-siva-profili', destination: '/uretim/celik-yapi-uretim', permanent: true },
      { source: '/urunler/tavan-u-ve-c-profili', destination: '/uretim/celik-yapi-uretim', permanent: true },

      // Legacy hizmetler slugs
      { source: '/hizmetler/TekKatliYapilar', destination: '/urunler/tek-katli-celik-villalar', permanent: true },
      { source: '/hizmetler/IkiKatliYapilar', destination: '/urunler/cok-katli-celik-villalar', permanent: true },
      { source: '/hizmetler/tekkatliyapilar', destination: '/urunler/tek-katli-celik-villalar', permanent: true },
      { source: '/hizmetler/hafif-celik-profil', destination: '/uretim/celik-yapi-uretim', permanent: true },

      // Legacy catalog URL
      {
        source: '/Master%20Steel%20House%20Hafif%20%C3%87elik%20Sistemleri%20Katalog.pdf',
        destination: '/uploads/media/master-steel-house-hafif-celik-sistemleri-katalog-1771338462283-dbf97d.pdf',
        permanent: true,
      },
      {
        source: '/medya/kataloglar',
        destination: '/uploads/media/master-steel-house-hafif-celik-sistemleri-katalog-1771338462283-dbf97d.pdf',
        permanent: true,
      },

      // Remove test/onboarding page from index path history
      { source: '/sentry-example-page', destination: '/', permanent: true },
    ]
  },
  images: {
    // Keep dev flexible for local proxy/debug, optimize in production.
    unoptimized: isDev,
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 82, 88, 90],
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: 'cdn.mastersteelhouse.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
