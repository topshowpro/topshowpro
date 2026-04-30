'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { EventFilter } from '@/components/events/EventFilter';
import { EventGrid } from '@/components/events/EventGrid';
import { EventSkeleton } from '@/components/events/EventSkeleton';
import { FadeIn } from '@/components/motion/FadeIn';
import { SectionHeader } from '@/components/ui/section-header';

interface EventosClientPageProps {
  settings?: any;
}

export function EventosClientPage({ settings }: EventosClientPageProps) {
  const [cats, setCats] = useState<{ label: string; slug: string; icon?: string }[]>([]);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/events?cats=1', { cache: 'no-store' }).then((r) => r.json()),
      fetch('/api/events', { cache: 'no-store' }).then((r) => r.json()),
    ]).then(([cats, events]) => {
      setCats(cats);
      setAllEvents(events);
      setLoading(false);
    });
  }, []);

  const events = useMemo(
    () => (active ? allEvents.filter((e) => e.categorySlug === active) : allEvents),
    [allEvents, active],
  );

  // Filtrar categorías que no tienen eventos asociados
  const availableCats = useMemo(() => {
    return cats.filter((cat) => allEvents.some((event) => event.categorySlug === cat.slug));
  }, [cats, allEvents]);

  // Imagen dummy mientras el cliente no carga una en el CMS
  const heroSrc = settings?.eventosHero || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop';

  const fontSizeMap: Record<string, string> = {
    '14': 'text-sm',
    '16': 'text-base',
    '18': 'text-lg',
    '24': 'text-xl md:text-2xl',
  };

  const descSizeClass = fontSizeMap[settings?.eventosFontSize || '18'];

  const neonColorMap: Record<string, string> = {
    'cyan': 'text-neon-cyan',
    'yellow': 'text-neon-yellow',
    'violet': 'text-neon-violet',
    'mint': 'text-neon-mint',
    'white': 'text-white',
  };

  const titleNeonClass = neonColorMap[settings?.eventosTitleColor || 'cyan'];

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      <div
        className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <Image
          src={heroSrc}
          alt=""
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <SectionHeader
              title="Eventos"
              titleTag="h1"
              titleClassName={titleNeonClass}
              description={settings?.eventosDesc || "Portfolio de proyectos realizados: eventos corporativos, festivales, conciertos y activaciones de marca."}
              descriptionClassName={descSizeClass}
            />
          </FadeIn>
        </div>
      </div>

      <div className="pt-16 px-6 max-w-7xl mx-auto pb-16 md:pb-24">
        <EventFilter categories={availableCats} active={active} onSelect={setActive} panelId="event-results-panel" />
        {loading ? (
          <div id="event-results-panel" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div id="event-results-panel" role="tabpanel">
            <EventGrid events={events} />
          </div>
        )}
      </div>
    </div>
  );
}
