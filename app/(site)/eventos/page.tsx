'use client';
import { useEffect, useState } from 'react';
import { EventFilter } from '@/components/events/EventFilter';
import { EventGrid } from '@/components/events/EventGrid';

export default function EventosPage() {
  const [cats, setCats] = useState<{ label: string; slug: string }[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/events?cats=1')
      .then((r) => r.json())
      .then(setCats);
  }, []);

  useEffect(() => {
    fetch(`/api/events${active ? `?category=${active}` : ''}`)
      .then((r) => r.json())
      .then(setEvents);
  }, [active]);

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
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

      {/* Content */}
      <div className="pt-16 px-6 max-w-7xl mx-auto pb-24">
        <EventFilter categories={cats} active={active} onSelect={setActive} />
        <EventGrid events={events} />
      </div>
    </div>
  );
}
