import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EQUIPMENT_CATEGORIES, Q_BRANDS, Q_SITE_SETTINGS } from '@/sanity/lib/queries';
import { EquipmentTabs } from '@/components/equipment/EquipmentTabs';
import { BrandsMarquee } from '@/components/equipment/BrandsMarquee';
import { FadeIn } from '@/components/motion/FadeIn';
import { cn } from '@/lib/utils';
import { CtaOutlineLink } from '@/components/ui/cta-outline-link';
import { NeonBackdrop } from '@/components/ui/neon-backdrop';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Equipamiento',
  description: 'Catálogo de equipamiento de audio, iluminación, stages y pantallas LED. Marcas de primer nivel mundial.',
  path: '/equipamiento',
});

export default async function EquipamientoPage() {
  const [categories, brands, settings] = await Promise.all([
    sanityFetch<any[]>(Q_EQUIPMENT_CATEGORIES, undefined, { tag: 'equipmentCategory', revalidate: 30 }),
    sanityFetch<any[]>(Q_BRANDS, undefined, { tag: 'brand', revalidate: 30 }),
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, { tag: 'siteSettings', revalidate: 30 }),
  ]);

  const fontSizeMap: Record<string, string> = {
    '14': 'text-sm',
    '16': 'text-base',
    '18': 'text-lg',
    '24': 'text-xl md:text-2xl',
  };

  const descSizeClass = fontSizeMap[settings?.equipamientoFontSize || '18'];

  const neonColorMap: Record<string, string> = {
    'cyan': 'text-neon-cyan',
    'yellow': 'text-neon-yellow',
    'violet': 'text-neon-violet',
    'fuchsia': 'text-neon-fuchsia',
    'mint': 'text-neon-mint',
    'white': 'text-white',
  };

  const titleNeonClass = neonColorMap[settings?.equipamientoTitleColor || 'cyan'];

  return (
    <div className="bg-[var(--bg-base)]">
      {/* Header */}
      <section
        className="relative overflow-hidden px-6 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {settings?.equipamientoHero && (
          <Image src={settings.equipamientoHero} alt="" fill className="object-cover opacity-25" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-focal-beam" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeIn>
            <h1
              className={cn("font-display text-white leading-none mb-6", titleNeonClass)}
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              Equipamiento
            </h1>
            <p className={cn("font-sans max-w-2xl", descSizeClass)} style={{ color: 'var(--text-muted)' }}>
              {settings?.equipamientoDesc || "Trabajamos con las mejores marcas del mundo para garantizar calidad y confiabilidad en cada evento."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content: Categories & Items */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-6 md:py-20">
        <FadeIn>
          <EquipmentTabs categories={categories ?? []} />
        </FadeIn>
      </section>

      {/* Brands marquee */}
      <div className="py-12">
        <BrandsMarquee brands={brands ?? []} />
      </div>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden px-6 py-24 text-center md:px-10 md:py-28">
        <NeonBackdrop variant="laser-cathedral" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(112%_88%_at_50%_102%,rgba(10,10,10,0.96)_12%,rgba(10,10,10,0.58)_46%,transparent_72%)]" />
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.14]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[18rem] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-88 blur-[80px] motion-reduce:opacity-58" style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-cyan) 31%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 11%, transparent) 38%, transparent 74%)' }} />
          <div className="pointer-events-none absolute left-1/2 top-[calc(50%-8.5rem)] -z-10 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/28 to-transparent" />

          <FadeIn>
            <h2
              className="mx-auto mb-3 max-w-[15ch] font-display leading-[0.9] text-white md:mb-4"
              style={{ fontSize: 'clamp(2.3rem, 6vw, 5.5rem)' }}
            >
              ¿Necesitas cotizar equipamiento?
            </h2>
            <p className="mx-auto mb-7 max-w-2xl font-sans text-base md:mb-8 md:text-lg" style={{ color: 'var(--text-muted)' }}>
              Contanos objetivos, fechas y alcance. Te proponemos una solucion tecnica a medida con mirada de show.
            </p>
            <div className="mt-10">
              <CtaOutlineLink href="/contacto" className="min-h-11 px-7 text-xs">
                Solicitar cotización
              </CtaOutlineLink>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
