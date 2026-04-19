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
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await sanityFetch<any>(Q_EVENT_DETAIL, { slug }, `event:${slug}`);
  return buildMetadata({
    title: event?.title,
    description: event?.subtitle,
    ogImage: event?.heroImage?.url,
    path: `/eventos/${slug}`,
  });
}

export default async function EventoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await sanityFetch<any>(Q_EVENT_DETAIL, { slug }, `event:${slug}`);
  if (!event) notFound();

  return (
    <article style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="px-6 pt-24 pb-0 max-w-7xl mx-auto">
        <Link
          href="/eventos"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition nav-link"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Volver a eventos
        </Link>
      </div>
      {/* Hero */}
      <header className="relative h-[70svh] w-full overflow-hidden">
        {event.heroImage && (
          <Image
            src={event.heroImage.url}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <span
            className="font-mono text-xs uppercase tracking-widest mb-4 block"
            style={{ color: 'var(--accent-cyan)' }}
          >
            {event.category?.label}
          </span>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
          >
            {event.title}
          </h1>
          {event.subtitle && (
            <p className="font-sans text-xl md:text-2xl mt-2" style={{ color: 'var(--text-secondary)' }}>
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
        <div className="max-w-7xl mx-auto flex flex-wrap gap-8">
          {event.client && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Cliente</p>
              <p className="font-sans text-sm text-white">{event.client}</p>
            </div>
          )}
          {event.location && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Lugar</p>
              <p className="font-sans text-sm text-white">{event.location}</p>
            </div>
          )}
          {event.tagsTecnicos?.length > 0 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>Servicios</p>
              <div className="flex flex-wrap gap-2">
                {event.tagsTecnicos.map((tag: string) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5"
                    style={{ border: '1px solid rgba(0,191,255,0.3)', color: 'var(--accent-cyan)' }}
                  >
                    {tag}
                  </span>
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
      {event.gallery?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2
            className="font-display text-white mb-8 leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            Galería
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.gallery.map((g: any, i: number) => (
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
        <a
          href="/contacto"
          className="inline-block px-8 py-4 font-sans text-sm uppercase tracking-widest transition hover:opacity-80"
          style={{ backgroundColor: 'var(--accent-cyan)', color: 'black' }}
        >
          Contactanos
        </a>
      </section>
    </article>
  );
}
