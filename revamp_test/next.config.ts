import type { NextConfig } from "next";
console.log(">>> Running Next.js from:", __dirname);

// Optional: uncomment to verify workspace path
// console.log(">>> Running Next.js from:", __dirname);

const nextConfig: NextConfig = {
  // ✅ Explicitly define the project root to fix workspace issues
  turbopack: {
    root: __dirname,
  },

  // ✅ Enable latest Next.js 16+ experimental optimizations
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "@gsap/react"],
  },

  // ✅ Component-level caching (replaces PPR)
  cacheComponents: true,

  // ✅ Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
        pathname: "/**",
      },
    ],
  },

  // ✅ Custom cache headers
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ✅ React strict mode for better debugging
  reactStrictMode: true,
};

export default nextConfig;
