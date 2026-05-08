import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { EventosClientPage } from './EventosClientPage';

import { sanityFetch } from '@/sanity/lib/client';
import { Q_SITE_SETTINGS, Q_BRANDS, Q_EVENTS_AND_CATS } from '@/sanity/lib/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Eventos',
  description: 'Portfolio de eventos realizados: corporativos, festivals, conciertos y más. Conocenos más de 500 proyectos con tecnología de primer nivel.',
  path: '/eventos',
});

export default async function EventosPage() {
  const [settings, brands, eventsAndCats] = await Promise.all([
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, { tag: 'siteSettings', revalidate: 60 }),
    sanityFetch<any[]>(Q_BRANDS, undefined, { tag: 'brand', revalidate: 60 }),
    sanityFetch<{ events: any[]; categories: any[] }>(
      Q_EVENTS_AND_CATS,
      { category: null },
      { tags: ['event', 'eventCategory'], revalidate: 60 },
    ),
  ]);

  return (
    <EventosClientPage
      settings={settings}
      brands={brands}
      initialEvents={eventsAndCats?.events ?? []}
      initialCategories={eventsAndCats?.categories ?? []}
    />
  );
}
