/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Move this to the root level
    eslint: {
      ignoreDuringBuilds: true,
    },
  };

  module.exports = nextConfig;
