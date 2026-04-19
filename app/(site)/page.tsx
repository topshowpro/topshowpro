import { sanityFetch } from '@/sanity/lib/client';
import { Q_HERO, Q_HOMEPAGE, Q_BRANDS, Q_SERVICES } from '@/sanity/lib/queries';
import { HeroVideoCarousel } from '@/components/hero/HeroVideoCarousel';
import { EventGrid } from '@/components/events/EventGrid';
import { BrandsMarquee } from '@/components/equipment/BrandsMarquee';
import { FadeIn } from '@/components/motion/FadeIn';
import { ServiceCard } from '@/components/services/ServiceCard';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

export default async function HomePage() {
  const [hero, homepage, brands, services] = await Promise.all([
    sanityFetch<any>(Q_HERO, undefined, 'hero'),
    sanityFetch<any>(Q_HOMEPAGE, undefined, 'homepage'),
    sanityFetch<any[]>(Q_BRANDS, undefined, 'brand'),
    sanityFetch<any[]>(Q_SERVICES, undefined, 'service'),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <HeroVideoCarousel slides={hero?.slides ?? []} banner={hero?.bannerAzul} />

      {/* Intro section */}
      <section className="px-6 py-32 max-w-4xl mx-auto text-center">
        <FadeIn>
          <span className="font-mono text-xs uppercase tracking-widest mb-6 block" style={{ color: 'var(--accent-cyan)' }}>
            — Quiénes somos
          </span>
          <h2
            className="font-display text-white mb-8 leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
          >
            Hacemos que todo suceda
          </h2>
          <p className="font-sans text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Acá es donde los eventos cobran vida. Somos tu aliado integral en soluciones técnicas
            para espectáculos y eventos. Iluminación, sonido, pantallas LED, estructuras
            y todo lo que lo hace posible son nuestro campo de acción.
          </p>
        </FadeIn>
      </section>

      {/* Services section */}
      <section className="px-6 py-24" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <h2
                className="font-display text-white leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
              >
                Servicios
              </h2>
              <a
                href="/servicios"
                className="font-mono text-xs uppercase tracking-widest transition hidden md:block"
                style={{ color: 'var(--accent-cyan)' }}
              >
                Ver todos →
              </a>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(services ?? []).map((s: any, i: number) => (
              <FadeIn key={s.name} delay={i * 0.1}>
                <ServiceCard name={s.name} shortDesc={s.shortDesc} icon={s.icon} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <h2
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              Eventos destacados
            </h2>
            <a
              href="/eventos"
              className="font-mono text-xs uppercase tracking-widest transition hidden md:block"
              style={{ color: 'var(--accent-cyan)' }}
            >
              Ver todos →
            </a>
          </div>
        </FadeIn>
        <EventGrid events={homepage?.featuredEvents ?? []} />
      </section>

      {/* Brands marquee */}
      <BrandsMarquee brands={brands ?? []} />

      {/* CTA section */}
      <section className="px-6 py-32 text-center bg-focal-beam">
        <FadeIn>
          <span className="font-mono text-xs uppercase tracking-widest mb-6 block" style={{ color: 'var(--text-faint)' }}>
            — Siguiente paso
          </span>
          <h2
            className="font-display text-white mb-6 leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
          >
            ¿Tu próximo evento?
          </h2>
          <p className="font-sans text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Contanos qué tenés en mente y te armamos una propuesta a medida.
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 font-sans text-sm uppercase tracking-widest transition hover:opacity-80"
            style={{ backgroundColor: 'var(--accent-cyan)', color: 'black' }}
          >
            Contactanos
          </a>
        </FadeIn>
      </section>
    </>
  );
}
