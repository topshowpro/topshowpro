'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { EventFilter } from '@/components/events/EventFilter';
import { EventGrid } from '@/components/events/EventGrid';
import { EventSkeleton } from '@/components/events/EventSkeleton';
import { FadeIn } from '@/components/motion/FadeIn';
import { SectionHeader } from '@/components/ui/section-header';
import { BrandsMarquee } from '@/components/equipment/BrandsMarquee';
import { NeonBackdrop } from '@/components/ui/neon-backdrop';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';

interface EventosClientPageProps {
  settings?: any;
  brands?: any[];
}

const INITIAL_VISIBLE_COUNT = 8;

export function EventosClientPage({ settings, brands = [] }: EventosClientPageProps) {
  const [cats, setCats] = useState<{ label: string; slug: string; icon?: string }[]>([]);
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    Promise.all([
      fetch('/api/events?cats=1').then((r) => r.json()),
      fetch('/api/events').then((r) => r.json()),
    ]).then(([cats, events]) => {
      setCats(cats);
      setAllEvents(events);
      setLoading(false);
    });
  }, []);

  // Reset visible count when changing category
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [active]);

  const filteredEvents = useMemo(
    () => (active ? allEvents.filter((e) => e.categorySlug === active) : allEvents),
    [allEvents, active],
  );

  const visibleEvents = useMemo(
    () => filteredEvents.slice(0, visibleCount),
    [filteredEvents, visibleCount]
  );

  const availableCats = useMemo(() => {
    return cats.filter((cat) => allEvents.some((event) => event.categorySlug === cat.slug));
  }, [cats, allEvents]);

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
    'fuchsia': 'text-neon-fuchsia',
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
          <div id="event-results-panel" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div id="event-results-panel" role="tabpanel" className="space-y-12">
            <EventGrid events={visibleEvents} />
            
            {visibleCount < filteredEvents.length && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setVisibleCount(prev => prev + INITIAL_VISIBLE_COUNT)}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] px-8 py-4 border border-white/10 rounded-md hover:bg-white hover:text-black transition-all"
                >
                  Cargar más eventos
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Brands marquee */}
      <div className="py-12">
        <BrandsMarquee brands={brands} />
      </div>

      {/* Footer CTA Section */}
      <section className="relative isolate overflow-hidden px-6 py-24 text-center md:px-10 md:py-28">
        <NeonBackdrop variant="aurora-ribbon" />
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.09]" />

        <div className="relative mx-auto max-w-4xl">
          <div
            className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[13rem] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.54] blur-[82px] motion-reduce:opacity-[0.4]"
            style={{
              background:
                'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-cyan) 20%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 10%, transparent) 42%, transparent 76%)',
            }}
          />

          <FadeIn>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.3rem, 6vw, 5.5rem)', lineHeight: 0.95 }}>
              Armemos tu proximo evento
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base md:text-lg" style={{ color: 'var(--text-muted)' }}>
              Contanos objetivos, fechas y alcance. Te proponemos una solucion tecnica a medida con mirada de show.
            </p>
            <div className="mt-10">
              <CtaOutlineLink href="/contacto" className="min-h-11 px-7 text-xs">
                Ir a contacto
              </CtaOutlineLink>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
