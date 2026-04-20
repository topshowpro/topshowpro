import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { EventosClientPage } from './EventosClientPage';

export const metadata: Metadata = buildMetadata({
  title: 'Eventos',
  description: 'Portfolio de eventos realizados: corporativos, festivals, conciertos y más. Conocenos más de 500 proyectos con tecnología de primer nivel.',
  path: '/eventos',
});

export default function EventosPage() {
  return <EventosClientPage />;
}
