/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  env: {
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
  },
  // basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
  webpack: (config, {isServer}) => {
    // if (!isServer) {
    //   config.node = {
    //     fs: 'empty'
    //   }
    // }
    config.resolve.fallback = { fs: false };
    return config;
  },
}

module.exports = nextConfig
