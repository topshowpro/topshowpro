import type { MetadataRoute } from 'next';

function getBaseUrl(): string {
  const fallback = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://topshowpro.vercel.app';
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallback;

  return raw.replace(/\/+$/, '');
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio'] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
