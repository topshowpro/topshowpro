import Image from 'next/image';
import Link from 'next/link';
import { TiltCard } from '@/components/ui/TiltCard';
import { formatDateRange } from '@/lib/utils';

export type EventCardProps = {
  title: string;
  subtitle?: string;
  slug: string;
  dateStart: string;
  dateEnd?: string;
  heroImage?: { url: string; metadata?: { lqip?: string } } | null;
  priority?: boolean;
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=60';

export function EventCard({ title, subtitle, slug, dateStart, dateEnd, heroImage, priority = false }: EventCardProps) {
  const imgSrc = heroImage?.url ?? FALLBACK_IMAGE;
  const lqip = heroImage?.metadata?.lqip;
  const start = new Date(dateStart + 'T12:00:00Z');
  const day = new Intl.DateTimeFormat('es-AR', { day: '2-digit', timeZone: 'America/Argentina/Buenos_Aires' }).format(start);
  const month = new Intl.DateTimeFormat('es-AR', { month: 'short', timeZone: 'America/Argentina/Buenos_Aires' }).format(start).replace('.', '').toUpperCase();

  return (
    <TiltCard className="group block w-full h-full">
      <Link
        href={`/eventos/${slug}`}
        className="event-card-surface-shadow group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'rgba(255,255,255,0.12)' }}
      >
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={75}
          placeholder={lqip ? 'blur' : 'empty'}
          blurDataURL={lqip ?? undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/20" />

        <div className="absolute left-4 top-4 z-10 leading-none">
          <p className="font-mono text-[2.2rem] md:text-[3.8rem] tracking-[-0.04em] text-[var(--text-primary)]">{day}</p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.26em]" style={{ color: 'var(--accent-led)' }}>{month}</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 md:p-5">
          <h3
            className="font-festival-heading text-[1.35rem] md:text-3xl leading-[0.9] uppercase text-[var(--text-primary)] break-words"
          >
            {title}
          </h3>
          {subtitle && (
            <p className="font-sans text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
          )}
          <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--text-faint)' }}>
            {formatDateRange(dateStart, dateEnd)}
          </p>
        </div>
      </Link>
    </TiltCard>
  );
}


