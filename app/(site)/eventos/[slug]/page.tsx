import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function toEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EVENT_DETAIL, Q_EVENT_SLUGS } from '@/sanity/lib/queries';
import { formatDateRange } from '@/lib/utils';
import { PortableText } from '@portabletext/react';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { Tag } from '@/components/ui/tag';
import { buildMetadata } from '@/lib/seo';
import { EventAmbientBg, getEventColors } from '@/components/events/EventAmbientBg';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const events = await sanityFetch<{ slug: string }[]>(
    Q_EVENT_SLUGS,
    undefined,
    { revalidate: 300 },
  );
  return (events ?? []).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await sanityFetch<any>(Q_EVENT_DETAIL, { slug }, { tag: `event:${slug}`, revalidate: 30 });
  return buildMetadata({
    title: event?.seo?.title || event?.title,
    description: event?.seo?.description || event?.subtitle,
    ogImage: event?.seo?.ogImage || event?.heroImage?.url,
    noIndex: Boolean(event?.seo?.noIndex),
    path: `/eventos/${slug}`,
  });
}

/** Applies Sanity CDN quality+format transforms to gallery images */
function sanityGalleryLoader({ src, width }: { src: string; width: number }): string {
  try {
    const url = new URL(src);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'max');
    url.searchParams.set('w', String(Math.min(width, 2400)));
    url.searchParams.set('q', '65');
    return url.toString();
  } catch {
    return src;
  }
}

export default async function EventoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await sanityFetch<any>(Q_EVENT_DETAIL, { slug }, { tag: `event:${slug}`, revalidate: 30 });
  if (!event) notFound();

  const gallery = Array.isArray(event.gallery)
    ? event.gallery.filter((item: any): item is { url: string } => typeof item?.url === 'string' && item.url.length > 0)
    : [];

  const eventColors = getEventColors(event.heroImage?.metadata?.palette);

  return (
    <>
      {/* Ambient color wash — Spotify-style background derived from hero image palette */}
      <EventAmbientBg palette={event.heroImage?.metadata?.palette} />

      <article style={{
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'transparent',
        // Inject palette as CSS custom properties — consumed by pill, borders, accents
        '--event-primary':   eventColors.primary,
        '--event-secondary': eventColors.secondary,
        '--event-tertiary':  eventColors.tertiary,
      } as React.CSSProperties}>
      {/* Hero */}
      <header className="relative h-[66svh] md:h-[76svh] lg:h-[84svh] w-full overflow-hidden">
        {event.heroImage && (
          <Image
            src={event.heroImage.url}
            alt={event.title}
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
            placeholder={event.heroImage.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={event.heroImage.metadata?.lqip ?? undefined}
          />
        )}
        {/* Bottom-up gradient: blends event's dominant color with black so the cover spills into the page */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, color-mix(in srgb, var(--event-primary) 28%, black) 0%, rgba(0,0,0,0.52) 42%, rgba(0,0,0,0.18) 100%)',
          }}
        />
        {/* Top-down dark vignette for nav readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-[calc(5.5rem+env(safe-area-inset-top,0px))] z-30 px-4 sm:px-6 md:top-[calc(6rem+env(safe-area-inset-top,0px))]">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white transition nav-link"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M10 12L6 8l4-4" />
              </svg>
              Volver a eventos
            </Link>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-10 sm:pb-12">
          <span className="event-category-pill mb-4">
            <span aria-hidden="true" className="event-category-pill__dot" />
            {event.category?.label}
          </span>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
          >
            {event.title}
          </h1>
          {event.subtitle && (
            <p className="mt-2 font-sans text-base md:text-2xl" style={{ color: 'var(--text-secondary)' }}>
              {event.subtitle}
            </p>
          )}
          <p className="font-mono text-sm mt-4" style={{ color: 'var(--text-muted)' }}>
            {formatDateRange(event.dateStart, event.dateEnd)}
          </p>
        </div>
      </header>

      {/* Meta info strip */}
      <div
        className="px-6 py-6"
        style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 md:gap-8">
          {event.client && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Cliente</p>
              <p className="font-sans text-sm text-white break-words">{event.client}</p>
            </div>
          )}
          {event.location && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Lugar</p>
              <p className="font-sans text-sm text-white break-words">{event.location}</p>
            </div>
          )}
          {event.tagsTecnicos?.length > 0 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Servicios</p>
              <div className="flex flex-wrap gap-2">
                {event.tagsTecnicos.map((tag: string) => (
                  <Tag key={tag} variant="accent">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <section className="defer-render max-w-3xl mx-auto px-6 py-24">
        <div className="font-sans text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {event.description && <PortableText value={event.description} />}
        </div>
      </section>

      {/* Equipment used */}
      {event.equipmentUsed?.length > 0 && (
        <section className="defer-render max-w-5xl mx-auto px-6 py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <h2
            className="font-display text-white mb-8 leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            Equipos utilizados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {event.equipmentUsed.map((e: string, i: number) => (
              <div
                key={i}
                className="px-5 py-4 font-mono text-sm list-active-accent"
                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}
              >
                {e}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Video */}
      {event.video && (
        <section className="defer-render max-w-5xl mx-auto px-6 py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 className="font-display text-white mb-8 leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
            Video
          </h2>
          <div className="relative aspect-video w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <iframe
              src={toEmbedUrl(event.video)}
              title={`Video del evento ${event.title}`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="defer-render max-w-7xl mx-auto px-6 py-16">
          <h2
            className="font-display text-white mb-8 leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            Galería
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {gallery.map((g: { url: string }, i: number) => (
              <div key={i} className="relative aspect-[4/3]" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <Image
                  src={g.url}
                  alt=""
                  fill
                  loader={sanityGalleryLoader}
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  quality={65}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2
          className="font-display text-white mb-6 leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
        >
          ¿Necesitás algo similar?
        </h2>
        <CtaOutlineLink href="/contacto" className="min-h-11 px-7 text-xs">
          Contáctanos
        </CtaOutlineLink>
      </section>
    </article>
    </>
  );
}
