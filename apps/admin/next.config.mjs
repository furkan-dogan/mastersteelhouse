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

// Admin's theme bootstrap (apps/admin/app/layout.tsx head script) and Next's
// own inline RSC/hydration-runtime scripts (`self.__next_f.push(...)`) can't
// be pinned with a CSP hash: the hydration payload is unique per request/
// build, and adding a hash-source to script-src makes CSP2+ browsers ignore
// 'unsafe-inline' entirely, which would then block that framework-generated
// inline script on every route. Nonces are the standard fix but require
// per-request dynamic rendering, which this app avoids. 'unsafe-inline' is
// therefore the deliberate, load-bearing script-src policy here, not a
// leftover fallback; see CSP Enforcement result doc for the full trade-off.
//
// img-src allows i.ytimg.com because the video CMS table
// (components/videos-cms-table.tsx) renders YouTube thumbnails from it.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "script-src-elem 'self' 'unsafe-inline'",
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
}

export default nextConfig
