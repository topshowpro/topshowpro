import { EventCard, type EventCardProps } from './EventCard';

export function EventGrid({ events }: { events: EventCardProps[] }) {
  if (!events.length) {
    return (
      <p className="text-center py-20 font-sans" style={{ color: 'var(--text-muted)' }}>
        No hay eventos aún.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((e, index) => (
        <EventCard key={e.slug} {...e} priority={index === 0} />
      ))}
    </div>
  );
}
