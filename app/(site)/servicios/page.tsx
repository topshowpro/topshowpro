import { sanityFetch } from '@/sanity/lib/client';
import { Q_SERVICES } from '@/sanity/lib/queries';
import { ServiceTabs } from '@/components/services/ServiceTabs';
import { FadeIn } from '@/components/motion/FadeIn';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Servicios',
  description: 'Técnica Teatral, Rental Discotecas, Eventos Corporativos, Venta de Equipamiento. Soluciones técnicas integrales para cada tipo de evento.',
  path: '/servicios',
});

export default async function ServiciosPage() {
  const services = await sanityFetch<any[]>(Q_SERVICES, undefined, 'service');

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Hero header */}
      <div
        className="pt-32 pb-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-focal-beam" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest mb-4 block" style={{ color: 'var(--accent-cyan)' }}>
              — Lo que hacemos
            </span>
            <h1
              className="font-display text-white leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              Servicios
            </h1>
            <p className="font-sans text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Soluciones técnicas integrales para cada tipo de evento. Desde la planificación hasta el encendido.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Tabs content */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <ServiceTabs services={services ?? []} />
      </div>

      {/* Stats row */}
      <div
        className="px-6 py-16"
        style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '15+', label: 'Años de experiencia' },
            { num: '500+', label: 'Eventos realizados' },
            { num: '50+', label: 'Marcas de primer nivel' },
            { num: '24/7', label: 'Soporte técnico' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-5xl text-white mb-2" style={{ color: 'var(--accent-cyan)' }}>
                {stat.num}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
          ¿Tenés un proyecto en mente?
        </h2>
        <a
          href="/contacto"
          className="inline-block px-8 py-4 font-sans text-sm uppercase tracking-widest transition hover:opacity-80"
          style={{ backgroundColor: 'var(--accent-cyan)', color: 'black' }}
        >
          Hablemos
        </a>
      </section>
    </div>
  );
}
