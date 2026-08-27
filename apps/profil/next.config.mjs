/** @type {import('next').NextConfig} */
const configuredHost = process.env.R2_PUBLIC_BASE_URL
  ? new URL(process.env.R2_PUBLIC_BASE_URL).hostname
  : 'pub-d48ad607846349fc992b42968ced0d17.r2.dev'

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
  'fullscreen=(self)',
  'autoplay=(self)',
].join(', ')

// GA/gtag's inline bootstrap (apps/profil/app/layout.tsx) and Next's own
// inline RSC/hydration-runtime scripts (`self.__next_f.push(...)`) can't be
// pinned with a CSP hash: the hydration payload is unique per request/build,
// and adding a hash-source to script-src makes CSP2+ browsers ignore
// 'unsafe-inline' entirely, which would then block that framework-generated
// inline script on every route. Nonces are the standard fix but require
// per-request dynamic rendering, which this app's static/ISR architecture
// avoids. 'unsafe-inline' is therefore the deliberate, load-bearing
// script-src policy here, not a leftover fallback; see CSP Enforcement
// result doc for the full trade-off.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "style-src-elem 'self' 'unsafe-inline'",
  `img-src 'self' https://${configuredHost}`,
  "font-src 'self'",
  "connect-src 'self' https://formspree.io https://www.googletagmanager.com https://www.google-analytics.com",
  "media-src 'self'",
  "frame-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: configuredHost,
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'profil.mastersteelhouse.com',
        pathname: '/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig
