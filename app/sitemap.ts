import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/client';

type SitemapEvent = {
  slug?: string;
  _updatedAt?: string;
  dateStart?: string;
};

const Q_SITEMAP_EVENTS = `*[_type == "event" && defined(slug.current) && coalesce(seo.noIndex, false) != true]{
  "slug": slug.current,
  _updatedAt,
  dateStart
}`;

function getBaseUrl(): string {
  const fallback = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://topshowpro.vercel.app';
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? fallback;

  return raw.replace(/\/+$/, '');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();
  const events =
    (await sanityFetch<SitemapEvent[] | null>(Q_SITEMAP_EVENTS, undefined, { tag: 'event', revalidate: 300 })) ?? [];

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/servicios`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/eventos`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/equipamiento`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...events
      .filter((event): event is SitemapEvent & { slug: string } => Boolean(event.slug))
      .map((event) => ({
        url: `${base}/eventos/${event.slug}`,
        lastModified: event._updatedAt ?? event.dateStart ?? now.toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
  ];
}
