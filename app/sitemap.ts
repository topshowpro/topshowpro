import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EVENTS_LIST } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app';
  const events = await sanityFetch<any[]>(Q_EVENTS_LIST(), undefined, 'event');
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/servicios`, lastModified: new Date() },
    { url: `${base}/eventos`, lastModified: new Date() },
    { url: `${base}/equipamiento`, lastModified: new Date() },
    { url: `${base}/contacto`, lastModified: new Date() },
    ...events.map((e) => ({
      url: `${base}/eventos/${e.slug}`,
      lastModified: new Date(e.dateStart),
    })),
  ];
}
