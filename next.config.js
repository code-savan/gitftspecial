/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
      styledComponents: true,
    },
  };

  module.exports = nextConfig;




// module.exports = {
//     webpack: (config, { isServer }) => {
//         if (!isServer) {
//           // Ignore native modules in client bundles
//           config.externals = ["bcrypt"];
//         }
//         return config;
//       },
//   }
