/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove swcMinify as it's no longer needed in Next.js 15
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  }

  module.exports = nextConfig

