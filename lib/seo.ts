import type { Metadata } from 'next';

export function buildMetadata(opts: {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  path?: string;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app';
  const title = opts.title ? `${opts.title} | Top Show Pro` : 'Top Show Pro | Rental de tecnología para eventos';
  const description = opts.description ?? 'Rental de tecnología para eventos y espectáculos. Iluminación, sonido, pantallas LED, stages.';
  const ogImage = opts.ogImage ?? `${siteUrl}/opengraph-image.jpg`;
  const url = opts.path ? `${siteUrl}${opts.path}` : siteUrl;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : undefined,
    openGraph: { title, description, url, siteName: 'Top Show Pro', images: [ogImage], locale: 'es_AR', type: 'website' },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}
