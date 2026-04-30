import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { EventosClientPage } from './EventosClientPage';

import { sanityFetch } from '@/sanity/lib/client';
import { Q_SITE_SETTINGS, Q_BRANDS } from '@/sanity/lib/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Eventos',
  description: 'Portfolio de eventos realizados: corporativos, festivals, conciertos y más. Conocenos más de 500 proyectos con tecnología de primer nivel.',
  path: '/eventos',
});

export default async function EventosPage() {
  const [settings, brands] = await Promise.all([
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, { tag: 'siteSettings', revalidate: 30 }),
    sanityFetch<any[]>(Q_BRANDS, undefined, { tag: 'brand', revalidate: 30 }),
  ]);
  
  return <EventosClientPage settings={settings} brands={brands} />;
}
