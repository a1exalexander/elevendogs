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
    // Every cache expiry re-bills a transformation per image × width, so keep
    // optimised images for 31 days. Notion photos stay fresh because their src
    // carries `?v=<last_edited_time>` (see ApiService), which changes the key.
    minimumCacheTTL: 2678400,
    // Fewer widths = fewer transformations. Sources are ≤2400px, so 2048/3840
    // only cost transformations without adding detail.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [128, 256, 384],
  },
};

module.exports = nextConfig;
