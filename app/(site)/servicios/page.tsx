import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_SERVICES, Q_SITE_SETTINGS } from '@/sanity/lib/queries';
import { FadeIn } from '@/components/motion/FadeIn';
import { ServiceTabs } from '@/components/services/ServiceTabs';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { NeonBackdrop } from '@/components/ui/neon-backdrop';
import { SectionHeader } from '@/components/ui/section-header';
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
    sanityFetch<Service[]>(Q_SERVICES, undefined, { tag: 'service', revalidate: 30 }),
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, { tag: 'siteSettings', revalidate: 30 }),
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

  const fontSizeMap: Record<string, string> = {
    '14': 'text-sm',
    '16': 'text-base',
    '18': 'text-lg',
    '24': 'text-xl md:text-2xl',
  };

  const descSizeClass = fontSizeMap[settings?.serviciosFontSize || '18'];

  return (
    <div className="bg-[var(--bg-base)]">
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40" style={{ backgroundColor: 'var(--bg-surface)' }}>
        {settings?.serviciosHero && (
          <Image
            src={settings.serviciosHero}
            alt=""
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeader
              title="Servicios"
              titleTag="h1"
              description={settings?.serviciosDesc || "Elegi un servicio y revisa su propuesta en un solo panel, con detalle expandible y contacto directo."}
              descriptionClassName={descSizeClass}
            />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-6 md:py-20">
        <FadeIn>
          <ServiceTabs services={services ?? []} includes={includes} />
        </FadeIn>
      </section>

      <section className="relative isolate overflow-hidden px-6 py-24 text-center md:px-10 md:py-28">
        <NeonBackdrop variant="aurora-ribbon" />
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.09]" />

        <div className="relative mx-auto max-w-4xl">
          <div
            className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[13rem] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.54] blur-[82px] motion-reduce:opacity-[0.4]"
            style={{
              background:
                'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-cyan) 20%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 10%, transparent) 42%, transparent 76%)',
            }}
          />

          <FadeIn>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.3rem, 6vw, 5.5rem)', lineHeight: 0.95 }}>
              Armemos tu proximo evento
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base md:text-lg" style={{ color: 'var(--text-muted)' }}>
              Contanos objetivos, fechas y alcance. Te proponemos una solucion tecnica a medida con mirada de show.
            </p>
            <div className="mt-10">
              <CtaOutlineLink href="/contacto" className="min-h-11 px-7 text-xs">
                Ir a contacto
              </CtaOutlineLink>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
