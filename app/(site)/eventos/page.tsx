'use client';
import { useEffect, useState } from 'react';
import { EventFilter } from '@/components/events/EventFilter';
import { EventGrid } from '@/components/events/EventGrid';
import { EventSkeleton } from '@/components/events/EventSkeleton';

export default function EventosPage() {
  const [cats, setCats] = useState<{ label: string; slug: string }[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events?cats=1')
      .then((r) => r.json())
      .then(setCats);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/events${active ? `?category=${active}` : ''}`)
      .then((r) => r.json())
      .then((data) => { setEvents(data); setLoading(false); });
  }, [active]);

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      <div
        className="pt-32 pb-16 px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest mb-4 block" style={{ color: 'var(--accent-cyan)' }}>
            — Portfolio
          </span>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
          >
            Eventos
          </h1>
        </div>
      </div>

      <div className="pt-16 px-6 max-w-7xl mx-auto pb-24">
        <EventFilter categories={cats} active={active} onSelect={setActive} />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <EventSkeleton key={i} />)}
          </div>
        ) : (
          <EventGrid events={events} />
        )}
      </div>
    </div>
  );
}
