import type { Metadata } from 'next';

export function buildMetadata(opts: {
  title?: string;
  titlePattern?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  path?: string;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://topshowpro.vercel.app';
  const siteName = 'Top Show Pro';
  const defaultTitle = `${siteName} | Rental de tecnología para eventos`;
  const titlePattern = opts.titlePattern?.trim();
  const titleToken = '{page}';

  const title = (() => {
    const pageTitle = opts.title?.trim();
    if (!pageTitle) return defaultTitle;
    if (pageTitle.toLowerCase() === siteName.toLowerCase()) return siteName;

    if (titlePattern && titlePattern.includes(titleToken)) {
      return titlePattern.replace(titleToken, pageTitle);
    }

    return `${pageTitle} | ${siteName}`;
  })();
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
    icons: {
      icon: '/icon.png',
      shortcut: '/icon.png',
      apple: '/icon.png',
    },
  };
}
