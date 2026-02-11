process.env.BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA = "true"
process.env.BROWSERSLIST_IGNORE_OLD_DATA = "true"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@mastersteelhouse/shared-content"],
}

export default nextConfig
