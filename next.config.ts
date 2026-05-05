import type { NextConfig } from 'next';

const config: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'; img-src 'self' data: https:; font-src 'self' https: data:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https:; frame-src 'self' https:; upgrade-insecure-requests" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 1. Básicos
      { source: '/contactenos', destination: '/contacto', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/HOME', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },

      // 2. E-commerce antiguo (WooCommerce) a Equipamiento
      { source: '/tienda/:path*', destination: '/equipamiento', permanent: true },
      { source: '/shop/:path*', destination: '/equipamiento', permanent: true },
      { source: '/product-category/:path*', destination: '/equipamiento', permanent: true },

      // 3. Páginas de eventos/shows específicos a la galería de eventos
      { source: '/mandarine-park-tent', destination: '/eventos', permanent: true },
      { source: '/groove', destination: '/eventos', permanent: true },
      { source: '/tootsie', destination: '/eventos', permanent: true },
      { source: '/moldavski', destination: '/eventos', permanent: true },
      { source: '/esperando-la-carroza', destination: '/eventos', permanent: true },
      { source: '/felicidades', destination: '/eventos', permanent: true },
      { source: '/godspell-college', destination: '/eventos', permanent: true },
    ];
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
};

export default config;
