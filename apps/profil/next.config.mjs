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

// GA/gtag bootstrap script hash (apps/profil/app/layout.tsx). Verified against
// the exact byte content Next.js's <Script strategy="afterInteractive"> sets on
// the script node it creates client-side (extracted from the built RSC
// payload). Next's own inline hydration-data scripts (`self.__next_f.push(...)`)
// are per-request/per-build and cannot be hashed the same way; script-src keeps
// 'unsafe-inline' as an observation-only fallback for that gap.
const GA_HASH = "'sha256-VskQHfw580Gz5zy1YllyPqsnnqZOtQep5ORIxSi00+8='"

const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' ${GA_HASH} https://www.googletagmanager.com`,
  `script-src-elem 'self' 'unsafe-inline' ${GA_HASH} https://www.googletagmanager.com`,
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
  { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
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
