import { sanityFetch } from '@/sanity/lib/client';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Q_HERO, Q_HOMEPAGE, Q_BRANDS, Q_SERVICES, Q_CLIENTS } from '@/sanity/lib/queries';
import { HeroVideoCarousel } from '@/components/hero/HeroVideoCarousel';
import { EventGrid } from '@/components/events/EventGrid';
import { BrandsMarquee } from '@/components/equipment/BrandsMarquee';
import { ClientsMarquee } from '@/components/clients/ClientsMarquee';
import { FadeIn } from '@/components/motion/FadeIn';
import { ServiceCard } from '@/components/services/ServiceCard';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import { PortableText } from '@portabletext/react';
import { NeonOrbs } from '@/components/ui/NeonOrbs';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { SectionHeader } from '@/components/ui/section-header';

export const metadata: Metadata = buildMetadata({
  title: 'Top Show Pro',
  description: 'Rental de tecnología para eventos y espectáculos en Argentina. Audio, iluminación, pantallas LED y stages de primer nivel. +15 años de experiencia y +500 eventos realizados.',
  path: '/',
});

export default async function HomePage() {
  const [hero, homepage, brands, services, clients] = await Promise.all([
    sanityFetch<any>(Q_HERO, { revalidate: 30 }, 'hero'),
    sanityFetch<any>(Q_HOMEPAGE, { revalidate: 30 }, 'homepage'),
    sanityFetch<any[]>(Q_BRANDS, { revalidate: 30 }, 'brand'),
    sanityFetch<any[]>(Q_SERVICES, { revalidate: 30 }, 'service'),
    sanityFetch<any[]>(Q_CLIENTS, { revalidate: 30 }, 'client'),
  ]);

  const featuredEvents = (homepage?.featuredEvents ?? []).filter(
    (event: any) => event?.slug && event?.title,
  );

  return (
    <>
      <OrganizationJsonLd />
      <HeroVideoCarousel slides={hero?.slides ?? []} banner={hero?.bannerAzul} />

      {/* Clients marquee — right below hero */}
      <ClientsMarquee clients={clients ?? []} />

      {/* Intro section */}
      <section className="relative overflow-hidden py-32">
        <NeonOrbs orbs={[
          { color: 'violet', drift: 'b', size: '600px', top: '-100px', right: '-200px', opacity: 0.5 },
          { color: 'cyan',   drift: 'c', size: '300px', bottom: '-80px', left: '-60px', opacity: 0.3 },
        ]} />
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <FadeIn>
            <SectionHeader
              eyebrow="Quiénes somos"
              title="Hacemos que todo suceda"
              className="mb-8 text-left"
              titleClassName="font-festival-heading text-neon-cyan text-[var(--text-primary)] text-center"
            />
            <div className="font-sans text-lg leading-relaxed text-center" style={{ color: 'var(--text-muted)' }}>
              {homepage?.intro ? <PortableText value={homepage.intro} /> : <p>Somos tu aliado integral en soluciones técnicas para espectáculos y eventos.</p>}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services section */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-24" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <NeonOrbs orbs={[
          { color: 'cyan', drift: 'c', size: '400px', top: '-80px', right: '-60px', opacity: 0.25 },
        ]} />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <SectionHeader
              eyebrow="Soluciones técnicas"
              title="Servicios"
              titleClassName="font-festival-heading text-neon-cyan text-[var(--text-primary)]"
              actionHref="/servicios"
              actionLabel="Ver todos →"
            />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {(services ?? []).map((s: any, i: number) => (
              <FadeIn key={s.name} delay={i * 0.08}>
                <ServiceCard name={s.name} shortDesc={s.shortDesc} coverImage={s.gallery?.[0]?.url ?? null} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events section */}
      <section className="px-4 sm:px-6 py-24 max-w-7xl mx-auto">
        <FadeIn>
          <SectionHeader
            eyebrow="Portfolio"
            title="Eventos destacados"
            titleClassName="font-festival-heading text-neon-cyan text-[var(--text-primary)]"
            actionHref="/eventos"
            actionLabel="Ver todos →"
          />
        </FadeIn>
        <EventGrid events={featuredEvents} />
      </section>

      {/* Brands marquee */}
      <BrandsMarquee brands={brands ?? []} />

      {/* CTA section */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-32 text-center bg-focal-beam">
        <NeonOrbs orbs={[
          { color: 'cyan',   drift: 'a', size: '700px', top: '-200px', left: '50%', opacity: 0.4 },
          { color: 'violet', drift: 'c', size: '400px', bottom: '-100px', right: '-80px', opacity: 0.5 },
        ]} />
<FadeIn>
           <span className="font-mono text-xs uppercase tracking-wider mb-6 block relative z-10" style={{ color: 'var(--text-faint)' }}>
             — Siguiente paso
           </span>
           <h2
             className="font-festival-heading text-[var(--text-primary)] mb-6 leading-none text-neon-yellow relative z-10"
             style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
           >
             ¿Tu próximo evento?
           </h2>
          <p className="font-sans text-lg mb-10 max-w-xl mx-auto relative z-10" style={{ color: 'var(--text-muted)' }}>
            Contanos qué tenés en mente y te armamos una propuesta a medida.
          </p>
          <CtaOutlineLink href="/contacto" className="relative z-10 h-10 px-6 text-xs">
            Contactanos
          </CtaOutlineLink>
        </FadeIn>
      </section>
    </>
  );
}
