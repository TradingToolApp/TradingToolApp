/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        formats: [ "image/avif", "image/webp" ],
        domains: ['tradingtoolapp.s3.ap-southeast-1.amazonaws.com'],
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'tradingtoolapp.s3.ap-southeast-1.amazonaws.com',
        //         port: '',
        //         pathname: '/tradingtoolapp/**',
        //     },
        // ],
    },
    experimental: {
        forceSwcTransforms: true,
    },
    reactStrictMode: false,
    swcMinify: true,
    // basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
    webpack: ( config ) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
}

module.exports = nextConfig
