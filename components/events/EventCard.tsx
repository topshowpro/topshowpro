import Image from 'next/image';
import Link from 'next/link';
import { formatDateRange } from '@/lib/utils';

export type EventCardProps = {
  title: string;
  subtitle?: string;
  slug: string;
  dateStart: string;
  dateEnd?: string;
  category: { label: string };
  heroImage: { url: string; metadata?: { lqip?: string } };
};

export function EventCard({ title, subtitle, slug, dateStart, dateEnd, category, heroImage }: EventCardProps) {
  return (
    <Link
      href={`/eventos/${slug}`}
      className="group relative block overflow-hidden aspect-[4/5]"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <Image
        src={heroImage.url}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
        placeholder={heroImage.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={heroImage.metadata?.lqip ?? undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* L-bracket detail top-right */}
      <div className="absolute top-3 right-3 w-5 h-5" style={{ borderColor: 'var(--accent-cyan)', borderStyle: 'solid', borderWidth: '1px 1px 0 0', opacity: 0.5 }} />

      <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
        <span
          className="inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
          style={{ color: 'var(--accent-cyan)', border: '1px solid rgba(0,191,255,0.4)' }}
        >
          {category.label}
        </span>
        <h3
          className="font-display text-3xl leading-none text-white"
        >
          {title}
        </h3>
        {subtitle && (
          <p className="font-sans text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
        )}
        <p className="font-mono text-xs uppercase" style={{ color: 'var(--text-faint)' }}>
          {formatDateRange(dateStart, dateEnd)}
        </p>
      </div>
    </Link>
  );
}
