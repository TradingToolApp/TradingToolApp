/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    experimental: {
        forceSwcTransforms: true,
    },
    reactStrictMode: false,
    // swcMinify: true,
    // basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "/",
    webpack: (config, {dev}) => {
        config.externals = [...config.externals, "bcrypt"];
        config.resolve.fallback = {fs: false};
        // Use memory cache for production builds to avoid Windows file-locking
        // when a server process already holds .next/cache/webpack pack files open
        if (!dev) {
            config.cache = {type: 'memory'};
        }
        return config;
    },
}

module.exports = nextConfig
