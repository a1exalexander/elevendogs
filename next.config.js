/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Gallery and barber photos are proxied through same-origin /api routes whose
    // Cache-Control is `max-age=0, s-maxage=86400`. Without this the optimizer
    // would fall back to its 60s default and re-fetch them constantly.
    minimumCacheTTL: 86400,
  },
};

module.exports = nextConfig;
