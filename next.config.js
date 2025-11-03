/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 15, no need for experimental flag
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Fix for multiple lockfiles warning
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
