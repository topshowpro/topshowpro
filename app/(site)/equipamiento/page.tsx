import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/client';
import { Q_EQUIPMENT_CATEGORIES, Q_BRANDS, Q_SITE_SETTINGS } from '@/sanity/lib/queries';
import { CategorySection } from '@/components/equipment/CategorySection';
import { BrandsMarquee } from '@/components/equipment/BrandsMarquee';
import { FadeIn } from '@/components/motion/FadeIn';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = buildMetadata({
  title: 'Equipamiento',
  description: 'Catálogo de equipamiento de audio, iluminación, stages y pantallas LED. Marcas de primer nivel mundial.',
  path: '/equipamiento',
});

export default async function EquipamientoPage() {
  const [categories, brands, settings] = await Promise.all([
    sanityFetch<any[]>(Q_EQUIPMENT_CATEGORIES, undefined, 'equipmentCategory'),
    sanityFetch<any[]>(Q_BRANDS, undefined, 'brand'),
    sanityFetch<any>(Q_SITE_SETTINGS, undefined, 'siteSettings'),
  ]);

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Header */}
      <div
        className="pt-20 md:pt-32 pb-16 md:pb-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {settings?.equipamientoHero && (
          <Image src={settings.equipamientoHero} alt="" fill className="object-cover opacity-25" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-focal-beam" />
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <span
              className="font-mono text-xs uppercase tracking-widest mb-4 block"
              style={{ color: 'var(--accent-cyan)' }}
            >
              — Tecnología de punta
            </span>
            <h1
              className="font-display text-white leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}
            >
              Equipamiento
            </h1>
            <p className="font-sans text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Trabajamos con las mejores marcas del mundo para garantizar calidad y confiabilidad en cada evento.
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
      <section className="px-6 py-32 text-center">
        <FadeIn>
          <h2
            className="font-display text-white mb-6 leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
          >
            ¿Necesitás cotizar?
          </h2>
          <p className="font-sans text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Pedinos un presupuesto personalizado para tu proyecto.
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 font-sans text-sm uppercase tracking-widest btn-neon btn-neon-outline"
          >
            Solicitar cotización
          </a>
        </FadeIn>
      </section>
    </div>
  );
}
