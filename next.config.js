/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Move this to the root level
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
        domains: ['i.postimg.cc'], // Add any other domains you're using for images
      },
  };

  module.exports = nextConfig;
