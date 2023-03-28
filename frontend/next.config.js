/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    appDir: false, // Required:
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/styles')],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(__dirname, '/styles'),
    };

    return config;
  },
};

module.exports = nextConfig;
