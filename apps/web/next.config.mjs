/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

// YouTube embeds (/medya/videolar) request fullscreen via the iframe's own
// `allowFullScreen` attribute; the HTTP Permissions-Policy must explicitly
// allow that origin or the browser blocks fullscreen even though the iframe
// itself permits it.
const PERMISSIONS_POLICY = [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'payment=()',
  'usb=()',
  'magnetometer=()',
  'gyroscope=()',
  'accelerometer=()',
  'clipboard-read=()',
  'clipboard-write=()',
  'fullscreen=(self "https://www.youtube.com")',
  'autoplay=(self)',
].join(', ')

// GTM's inline bootstrap (apps/web/app/layout.tsx) and Next's own inline RSC/
// hydration-runtime scripts (`self.__next_f.push(...)`) can't be pinned with a
// CSP hash: the hydration payload is unique per request/build, and adding a
// hash-source to script-src makes CSP2+ browsers ignore 'unsafe-inline'
// entirely, which would then block that framework-generated inline script on
// every route. Nonces are the standard fix but require per-request dynamic
// rendering, which this app's static/ISR architecture avoids. 'unsafe-inline'
// is therefore the deliberate, load-bearing script-src policy here, not a
// leftover fallback; see CSP Enforcement result doc for the full trade-off.
//
// The GTM container itself (configured remotely in Google Tag Manager, not in
// this repo) runs Google Ads conversion/remarketing tags and a Facebook Pixel
// in addition to plain GA — found via a production console-error audit that
// showed live CSP violations for these hosts, not from reading the container.
// img-src's `data:` covers a small inline base64 fallback pixel one of those
// tags renders. Google's audience-list pixel calls a country-TLD domain
// (`www.google.com.tr` observed for this run) that varies by visitor locale;
// only the one actually observed is allowlisted — watch /api/csp-report for
// other ccTLD variants rather than guessing the full set up front.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://connect.facebook.net",
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "style-src-elem 'self' 'unsafe-inline'",
  "img-src 'self' data: https://pub-d48ad607846349fc992b42968ced0d17.r2.dev https://www.google.com https://www.google.com.tr https://googleads.g.doubleclick.net https://www.facebook.com",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://ad.doubleclick.net https://stats.g.doubleclick.net https://www.google.com",
  "media-src 'self' https://cdn.coverr.co",
  "frame-src 'self' https://www.youtube.com https://www.google.com https://www.googletagmanager.com",
  "worker-src 'self'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
  'report-uri /api/csp-report',
].join('; ')

const BASELINE_SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: PERMISSIONS_POLICY },
  { key: 'Content-Security-Policy', value: CSP },
]

const nextConfig = {
  poweredByHeader: false,
  experimental: {
    sri: {
      algorithm: 'sha256',
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: BASELINE_SECURITY_HEADERS,
      },
    ]
  },
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
