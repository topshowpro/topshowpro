import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EQUIPMENT_CATEGORIES, Q_BRANDS, Q_SITE_SETTINGS } from '@/sanity/lib/queries';
import { CategorySection } from '@/components/equipment/CategorySection';
import { BrandsMarquee } from '@/components/equipment/BrandsMarquee';
import { FadeIn } from '@/components/motion/FadeIn';
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

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
      <div
        className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {settings?.equipamientoHero && (
          <Image src={settings.equipamientoHero} alt="" fill className="object-cover opacity-25" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-focal-beam" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <h1
              className="font-display text-white leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              Equipamiento
            </h1>
            <p className="font-sans text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              {settings?.equipamientoDesc || "Trabajamos con las mejores marcas del mundo para garantizar calidad y confiabilidad en cada evento."}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <CategorySection categories={categories ?? []} />
      </div>

      {/* Brands marquee */}
      <BrandsMarquee brands={brands ?? []} />

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <NeonBackdrop variant="laser-cathedral" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(112%_88%_at_50%_102%,rgba(10,10,10,0.96)_12%,rgba(10,10,10,0.58)_46%,transparent_72%)]" />
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.14]" />

        <div className="relative mx-auto flex min-h-[clamp(24.5rem,55vh,37.5rem)] max-w-[68rem] items-center justify-center px-6 py-[3.25rem] text-center md:min-h-[clamp(28rem,63vh,43rem)] md:px-10 md:py-[3.75rem]">
          <div className="relative w-full max-w-[42rem]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[18rem] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-88 blur-[80px] motion-reduce:opacity-58" style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-cyan) 31%, transparent) 0%, color-mix(in srgb, var(--accent-violet) 11%, transparent) 38%, transparent 74%)' }} />
            <div className="pointer-events-none absolute left-1/2 top-[calc(50%-8.5rem)] -z-10 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/28 to-transparent" />

            <FadeIn>
              <h2
                className="mx-auto mb-3 max-w-[11ch] font-display leading-none text-white md:mb-4"
                style={{ fontSize: 'clamp(2.06rem, 5vw, 4.7rem)' }}
              >
                ¿Necesitás cotizar?
              </h2>
              <p className="mx-auto mb-7 max-w-[28ch] font-sans text-[1.04rem] md:mb-8 md:text-[1.08rem]" style={{ color: 'var(--text-muted)' }}>
                Pedinos un presupuesto personalizado para tu proyecto.
              </p>
              <CtaOutlineLink href="/contacto" className="min-h-11 px-7 text-xs">
                Solicitar cotización
              </CtaOutlineLink>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
