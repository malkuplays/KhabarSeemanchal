/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip/brotli compression
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600, // 1 hour image cache
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wyyzqlokcnceptntlyko.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // HTTP Cache-Control headers for static assets and pages
  async headers() {
    return [
      {
        // Cache static assets aggressively (JS, CSS, fonts, images)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public folder assets (images, icons, etc.)
        source: '/(:path*\.(?:jpg|jpeg|png|gif|webp|avif|svg|ico|woff2|woff|ttf))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
        ],
      },
      {
        // Light caching on HTML pages — allow revalidation
        source: '/((?!api|admin).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // No caching on admin routes
        source: '/admin/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
