import type { NextConfig } from 'next';

const permanentRedirect = (source: string, destination: string) => ({
  source,
  destination,
  permanent: true,
});

const withTrailingSlashVariants = (redirects: Array<{ source: string; destination: string }>) =>
  redirects.flatMap(({ source, destination }) => {
    const normalizedSource = source.endsWith('/') ? source.slice(0, -1) : source;

    return [
      { source: normalizedSource, destination },
      { source: `${normalizedSource}/`, destination },
    ];
  });

const LEGACY_REDIRECTS: Array<{ source: string; destination: string }> = [
  // Basicos
  { source: '/contactenos', destination: '/contacto' },
  { source: '/home', destination: '/' },
  { source: '/HOME', destination: '/' },
  { source: '/blog', destination: '/' },

  // E-commerce antiguo (WooCommerce) a Equipamiento
  { source: '/tienda/:path*', destination: '/equipamiento' },
  { source: '/shop/:path*', destination: '/equipamiento' },
  { source: '/product-category/:path*', destination: '/equipamiento' },

  // Paginas de eventos/shows especificos a la galeria de eventos
  { source: '/mandarine-park-tent', destination: '/eventos' },
  { source: '/groove', destination: '/eventos' },
  { source: '/tootsie', destination: '/eventos' },
  { source: '/moldavski', destination: '/eventos' },
  { source: '/esperando-la-carroza', destination: '/eventos' },
  { source: '/felicidades', destination: '/eventos' },
  { source: '/godspell-college', destination: '/eventos' },
];

const config: NextConfig = {
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'; img-src 'self' data: https:; media-src 'self' https: blob:; font-src 'self' https: data:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https:; frame-src 'self' https:; upgrade-insecure-requests" },
        ],
      },
    ];
  },
  async redirects() {
    return withTrailingSlashVariants(LEGACY_REDIRECTS).map(({ source, destination }) => permanentRedirect(source, destination));
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
