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
    webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        config.resolve.fallback = {fs: false};
        return config;
    },
}

module.exports = nextConfig
