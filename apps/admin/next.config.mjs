/** @type {import('next').NextConfig} */

// The video-editor form (components/videos-editor-form.tsx) embeds a live
// YouTube preview iframe with `allowFullScreen`, same as the public site's
// /medya/videolar page, so the fullscreen allowlist matches web's.
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

// Theme bootstrap script hash (apps/admin/app/layout.tsx head script). It is a
// literal server-rendered <script>, unlike the RSC-delivered GTM/GA scripts on
// web/profil, so its hash is exact and stable across builds. Admin's own
// `self.__next_f.push(...)` hydration-data scripts remain unhashable for the
// same framework reason described in web's next.config.mjs; script-src keeps
// 'unsafe-inline' as an observation-only fallback for that gap.
const ADMIN_THEME_HASH = "'sha256-bBW88U/TNGWto0opQgfj+MnRXYMbJyagFpgXbZqvxqE='"

// The video CMS table (components/videos-cms-table.tsx) renders YouTube
// thumbnails directly from i.ytimg.com, discovered via fresh inspection.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' ${ADMIN_THEME_HASH}`,
  `script-src-elem 'self' 'unsafe-inline' ${ADMIN_THEME_HASH}`,
  "style-src 'self' 'unsafe-inline'",
  "style-src-elem 'self' 'unsafe-inline'",
  "img-src 'self' https://i.ytimg.com",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "frame-src 'self' https://www.youtube.com",
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
}

export default nextConfig
