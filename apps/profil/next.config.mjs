/** @type {import('next').NextConfig} */
const configuredHost = process.env.R2_PUBLIC_BASE_URL
  ? new URL(process.env.R2_PUBLIC_BASE_URL).hostname
  : 'pub-d48ad607846349fc992b42968ced0d17.r2.dev'

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: configuredHost,
        pathname: '/**',
      },
    ],
    // Localde Next image optimizer R2 TLS handshake'inde hata veriyor.
    // Browser doğrudan R2'den alsın; production optimizasyonu açık kalır.
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig
