/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["backoffice.edithbredon.fr", "localhost"],
    minimumCacheTTL: 60,
  },
  env: {
    MODE_ENV: process.env.NODE_ENV,
    API_URL_PROD: process.env.API_URL_PROD,
    API_URL_DEV: process.env.API_URL_DEV,
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
};

module.exports = nextConfig;