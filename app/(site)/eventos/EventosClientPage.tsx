'use client';

import { useEffect, useMemo, useState } from 'react';
import { EventFilter } from '@/components/events/EventFilter';
import { EventGrid } from '@/components/events/EventGrid';
import { EventSkeleton } from '@/components/events/EventSkeleton';
import { SectionHeader } from '@/components/ui/section-header';

export function EventosClientPage() {
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

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      <div
        className="pt-20 md:pt-32 pb-16 px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader title="Eventos" titleTag="h1" className="mb-0" />
        </div>
      </div>

      <div className="pt-16 px-6 max-w-7xl mx-auto pb-16 md:pb-24">
        <EventFilter categories={cats} active={active} onSelect={setActive} panelId="event-results-panel" />
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
