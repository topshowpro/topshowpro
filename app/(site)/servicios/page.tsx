import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_SERVICES, Q_SITE_SETTINGS } from '@/sanity/lib/queries';
import { FadeIn } from '@/components/motion/FadeIn';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

type ServiceImage = {
  url: string;
  metadata?: { lqip?: string } | null;
};

type Service = {
  name: string;
  shortDesc?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  longDesc?: any;
  gallery?: ServiceImage[];
  techContact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  cta?: {
    label?: string;
    link?: string;
  };
};

export const metadata: Metadata = buildMetadata({
  title: 'Servicios',
  description: 'Técnica Teatral, Rental Discotecas, Eventos Corporativos, Venta de Equipamiento. Soluciones técnicas integrales para cada tipo de evento.',
  path: '/servicios',
});

export default async function ServiciosPage() {
  const [services, settings] = await Promise.all([
    sanityFetch<Service[]>(Q_SERVICES, undefined, 'service'),
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, 'siteSettings'),
  ]);

  const includes = [
    {
      title: 'Direccion tecnica y plan de show',
      description: 'Curaduria tecnica, rider, plan de montaje y secuencia operativa alineada a tus objetivos.',
    },
    {
      title: 'Operadores y crew en sitio',
      description: 'Equipo tecnico especializado para audio, iluminacion y video durante toda la ejecucion.',
    },
    {
      title: 'Integracion visual y escenica',
      description: 'Diseno de atmosfera, narrativa visual y puesta tecnica para sostener experiencia de marca.',
    },
    {
      title: 'Backups y respuesta en tiempo real',
      description: 'Redundancias, monitoreo y capacidad de reaccion para mantener continuidad en vivo.',
    },
  ];

  return (
    <div className="bg-[var(--bg-base)]">
      <section
        className="relative overflow-hidden px-6 pt-24 pb-20 md:px-10 md:pt-36 md:pb-28"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {settings?.serviciosHero && (
          <Image
            src={settings.serviciosHero}
            alt="Ambiente de servicios técnicos para eventos"
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-focal-beam" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeIn>
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent-cyan)' }}>
              - Lineup de servicios
            </span>
            <h1
              className="font-display leading-[0.9] text-white"
              style={{ fontSize: 'clamp(3rem, 9vw, 9rem)', letterSpacing: '-0.02em' }}
            >
              Servicios pensados como un evento en vivo
            </h1>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed md:text-xl" style={{ color: 'var(--text-muted)' }}>
              Sin tabs, sin friccion. Cada servicio baja en formato editorial con narrativa, visual y llamado a la accion
              para que encuentres rapido la solucion que necesita tu produccion.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="absolute inset-y-0 left-8 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:block" />
        <div className="space-y-14 md:space-y-20">
          {(services ?? []).map((service, index) => {
            const itemNumber = String(index + 1).padStart(2, '0');
            const cover = service.gallery?.[0];
            const sideImage = service.gallery?.[1];

            return (
              <FadeIn key={`${service.name}-${index}`} delay={index * 0.06}>
                <article data-service-block className="relative grid gap-5 md:grid-cols-[88px_minmax(0,1fr)] md:gap-8">
                  <div className="relative flex items-start md:pt-1">
                    <span
                      className="font-display text-[2.8rem] leading-none md:text-[4.75rem]"
                      style={{ color: 'rgba(0,191,255,0.45)' }}
                    >
                      {itemNumber}
                    </span>
                  </div>

                  <div
                    className="group relative overflow-hidden l-bracket px-5 py-6 md:px-8 md:py-8"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="l-bracket-bl" />
                    <span className="l-bracket-br" />

                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(130deg, rgba(0,191,255,0.12) 0%, transparent 50%, rgba(0,191,255,0.06) 100%)',
                      }}
                    />

                    <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
                      <div>
                        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-faint)' }}>
                          Acto {itemNumber}
                        </p>
                        <h2 className="font-display text-[2rem] leading-[0.95] text-white md:text-5xl">{service.name}</h2>

                        <div className="mt-5 space-y-4 font-sans text-base leading-relaxed md:text-lg" style={{ color: 'var(--text-muted)' }}>
                          {service.longDesc && service.longDesc.length > 0 ? (
                            <PortableText value={service.longDesc} />
                          ) : (
                            <p>{service.shortDesc}</p>
                          )}
                        </div>

                        {service.techContact && (service.techContact.name || service.techContact.phone || service.techContact.email) && (
                          <div
                            className="mt-7 p-4 font-mono text-xs md:text-sm"
                            style={{
                              border: '1px solid rgba(0,191,255,0.3)',
                              backgroundColor: 'rgba(0,191,255,0.08)',
                            }}
                          >
                            <p className="mb-2 uppercase tracking-[0.18em]" style={{ color: 'var(--accent-cyan)' }}>
                              Direccion tecnica
                            </p>
                            {service.techContact.name && <p className="text-white">{service.techContact.name}</p>}
                            {service.techContact.phone && <p style={{ color: 'var(--text-muted)' }}>{service.techContact.phone}</p>}
                            {service.techContact.email && <p style={{ color: 'var(--text-muted)' }}>{service.techContact.email}</p>}
                          </div>
                        )}

                        {service.cta?.label && service.cta?.link && (
                          <CtaOutlineLink href={service.cta.link} className="mt-8 h-10 px-6 text-[11px]">
                            {service.cta.label}
                          </CtaOutlineLink>
                        )}
                      </div>

                      <div className="grid gap-3">
                        {cover ? (
                          <div className="relative aspect-[4/3] overflow-hidden border border-white/10" style={{ backgroundColor: 'var(--bg-base)' }}>
                            <Image
                              src={cover.url}
                              alt={`Visual de ${service.name}`}
                              fill
                              loading="lazy"
                              className="object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                              sizes="(max-width: 1024px) 100vw, 44vw"
                              placeholder={cover.metadata?.lqip ? 'blur' : 'empty'}
                              blurDataURL={cover.metadata?.lqip ?? undefined}
                            />
                          </div>
                        ) : (
                          <div
                            className="flex aspect-[4/3] items-end p-4"
                            style={{
                              background: 'linear-gradient(160deg, rgba(0,191,255,0.18) 0%, rgba(0,191,255,0.05) 55%, rgba(10,10,10,1) 100%)',
                            }}
                          >
                            <p className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--text-faint)' }}>
                              Visual en produccion
                            </p>
                          </div>
                        )}

                        {sideImage && (
                          <div className="relative aspect-[16/7] overflow-hidden border border-white/10" style={{ backgroundColor: 'var(--bg-base)' }}>
                            <Image
                              src={sideImage.url}
                              alt={`Detalle de ${service.name}`}
                              fill
                              loading="lazy"
                              className="object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-95"
                              sizes="(max-width: 1024px) 100vw, 44vw"
                              placeholder={sideImage.metadata?.lqip ? 'blur' : 'empty'}
                              blurDataURL={sideImage.metadata?.lqip ?? undefined}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section
        className="px-6 py-16 md:px-10 md:py-24"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--accent-cyan)' }}>
              - Que incluye
            </p>
            <h2 className="max-w-4xl font-display text-4xl leading-[0.95] text-white md:text-6xl">Produccion integral, de punta a punta</h2>
            <p className="mt-5 max-w-2xl font-sans text-base md:text-lg" style={{ color: 'var(--text-muted)' }}>
              Un formato premium y claro: estrategia, ejecucion y control tecnico conectados como una sola experiencia.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {includes.map((item, index) => (
              <div
                key={item.title}
                className="l-bracket relative overflow-hidden px-5 py-6"
                style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(10,10,10,0.55)' }}
              >
                <span className="l-bracket-bl" />
                <span className="l-bracket-br" />
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--accent-cyan)' }}>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl leading-tight text-white">{item.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed md:text-base" style={{ color: 'var(--text-muted)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center md:px-10 md:py-28">
        <FadeIn>
          <span className="mb-5 block font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
            - Siguiente paso
          </span>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.3rem, 6vw, 5.5rem)', lineHeight: 0.95 }}>
            Armemos tu proximo evento
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base md:text-lg" style={{ color: 'var(--text-muted)' }}>
            Contanos objetivos, fechas y alcance. Te proponemos una solucion tecnica a medida con mirada de show.
          </p>
          <div className="mt-10">
            <CtaOutlineLink href="/contacto" className="h-10 px-7 text-xs">
              Ir a contacto
            </CtaOutlineLink>
          </div>
        </FadeIn>
      </section>

      {(services ?? []).length === 0 && (
        <section className="px-6 pb-20 md:px-10">
          <div
            className="mx-auto max-w-7xl p-6 font-mono text-xs uppercase tracking-[0.2em]"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-faint)' }}
          >
            No hay servicios disponibles en este momento.
          </div>
        </section>
      )}
    </div>
  );
}
