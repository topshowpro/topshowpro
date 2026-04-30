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
import { Q_EVENT_DETAIL } from '@/sanity/lib/queries';
import { formatDateRange } from '@/lib/utils';
import { PortableText } from '@portabletext/react';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { Tag } from '@/components/ui/tag';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

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

export default async function EventoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await sanityFetch<any>(Q_EVENT_DETAIL, { slug }, { tag: `event:${slug}`, revalidate: 30 });
  if (!event) notFound();

  const gallery = Array.isArray(event.gallery)
    ? event.gallery.filter((item: any): item is { url: string } => typeof item?.url === 'string' && item.url.length > 0)
    : [];

  return (
    <article style={{ backgroundColor: 'var(--bg-base)' }}>
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
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
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="font-sans text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {event.description && <PortableText value={event.description} />}
        </div>
      </section>

      {/* Equipment used */}
      {event.equipmentUsed?.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
        <section className="max-w-5xl mx-auto px-6 py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 className="font-display text-white mb-8 leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
            Video
          </h2>
          <div className="relative aspect-video w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <iframe
              src={toEmbedUrl(event.video)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2
            className="font-display text-white mb-8 leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            Galería
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {gallery.map((g: { url: string }, i: number) => (
              <div key={i} className="relative aspect-[4/3]" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <Image src={g.url} alt="" fill className="object-cover" sizes="(max-width: 1280px) 33vw, 400px" />
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
          Contactanos
        </CtaOutlineLink>
      </section>
    </article>
  );
}
