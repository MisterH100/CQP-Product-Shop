/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'misterh-api-server.onrender.com',
        },
      ],
    },
  }