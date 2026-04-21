'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type EquipmentItem = {
  name: string;
  photo?: { url: string; metadata?: any } | null;
  brand?: { name: string } | null;
};

type Category = {
  name: string;
  slug: string;
  description?: string;
  heroImage?: string | null;
  items: EquipmentItem[];
};

export function CategorySection({ categories }: { categories: Category[] }) {
  const firstCategorySlug = categories[0]?.slug;
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(firstCategorySlug);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!categories.length) {
      return;
    }

    if (!selectedSlug || !categories.some((cat) => cat.slug === selectedSlug)) {
      setSelectedSlug(categories[0].slug);
    }
  }, [categories, selectedSlug]);

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.slug === selectedSlug) ?? categories[0],
    [categories, selectedSlug],
  );

  const getRepresentativeImage = (cat: Category) => {
    if (cat.heroImage) {
      return { url: cat.heroImage, lqip: undefined as string | undefined };
    }

    const firstItemWithPhoto = cat.items.find((item) => item.photo?.url);
    return {
      url: firstItemWithPhoto?.photo?.url ?? null,
      lqip: firstItemWithPhoto?.photo?.metadata?.lqip,
    };
  };

  if (!categories.length) {
    return (
      <p className="font-sans text-sm" style={{ color: 'var(--text-faint)' }}>
        No hay categorías disponibles por el momento.
      </p>
    );
  }

  return (
    <section aria-label="Categorías de equipamiento" className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, index) => {
          const itemCount = (cat.items ?? []).length;
          const representative = getRepresentativeImage(cat);
          const isActive = selectedCategory?.slug === cat.slug;
          const cardDescription = cat.description || 'Catálogo premium con configuración adaptable al tipo de evento.';

          return (
            <motion.button
              key={cat.slug}
              type="button"
              aria-controls="equipment-category-detail"
              aria-pressed={isActive}
              onClick={() => setSelectedSlug(cat.slug)}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: isActive ? 1.012 : 1,
                      y: isActive ? -2 : 0,
                    }
              }
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[330px] overflow-hidden text-left l-bracket transition-all duration-300"
              style={{
                backgroundColor: isActive ? 'color-mix(in srgb, var(--bg-surface-hi) 85%, var(--accent-cyan) 15%)' : 'var(--bg-surface)',
                border: isActive
                  ? '1px solid color-mix(in srgb, var(--accent-cyan) 42%, transparent)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isActive
                  ? '0 16px 42px rgba(0, 191, 255, 0.2), inset 0 0 0 1px rgba(0, 191, 255, 0.16)'
                  : '0 10px 28px rgba(0,0,0,0.18)',
              }}
            >
              <span className="l-bracket-bl" />
              <span className="l-bracket-br" />

              <div className="relative aspect-[3/2] overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                {representative.url ? (
                  <Image
                    src={representative.url}
                    alt={cat.name}
                    fill
                    className="object-cover opacity-70 transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    placeholder={representative.lqip ? 'blur' : 'empty'}
                    blurDataURL={representative.lqip}
                  />
                ) : (
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'linear-gradient(115deg, transparent 0%, rgba(23,133,211,0.14) 44%, rgba(123,97,255,0.14) 100%)' }} />

                <span
                  className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest"
                  style={{
                    color: 'var(--accent-cyan)',
                    border: '1px solid color-mix(in srgb, var(--accent-cyan) 45%, transparent)',
                    backgroundColor: 'rgba(10,10,10,0.66)',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest"
                  style={{
                    color: 'var(--text-primary)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(10,10,10,0.66)',
                  }}
                >
                  {itemCount} ítems
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-3xl leading-none mb-3" style={{ color: 'var(--text-primary)' }}>
                  {cat.name}
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {cardDescription}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
                  {isActive ? 'Mostrando detalle' : 'Ver detalle'}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selectedCategory && (
        <section
          id="equipment-category-detail"
          aria-live="polite"
          className="relative overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div className="grid lg:grid-cols-[minmax(280px,36%)_1fr]">
            <div className="relative min-h-[240px] lg:min-h-[320px] overflow-hidden">
              {selectedCategory.heroImage ? (
                <Image
                  src={selectedCategory.heroImage}
                  alt={selectedCategory.name}
                  fill
                  loading="lazy"
                  className="object-cover opacity-70"
                  sizes="(max-width: 1024px) 100vw, 36vw"
                />
              ) : (
                <div className="absolute inset-0 grid-overlay opacity-30" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--accent-cyan)' }}>
                Detalle de categoría
              </p>
              <h3 className="font-display text-4xl md:text-5xl leading-none mb-4 text-white">
                {selectedCategory.name}
              </h3>
              {selectedCategory.description && (
                <p className="font-sans text-base mb-6 max-w-3xl" style={{ color: 'var(--text-muted)' }}>
                  {selectedCategory.description}
                </p>
              )}

              {(selectedCategory.items ?? []).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {selectedCategory.items.map((item) => (
                    <article
                      key={item.name}
                      className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                      style={{
                        backgroundColor: 'var(--bg-surface-hi)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.16)',
                      }}
                    >
                      {item.photo?.url && (
                        <div className="relative w-full aspect-video">
                          <Image
                            src={item.photo.url}
                            alt={item.name}
                            fill
                            loading="lazy"
                            className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 1280px) 50vw, 25vw"
                            placeholder={item.photo.metadata?.lqip ? 'blur' : 'empty'}
                            blurDataURL={item.photo.metadata?.lqip ?? undefined}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                          {item.name}
                        </p>
                        {item.brand && (
                          <p className="font-mono text-xs mt-1 uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
                            {item.brand.name}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="font-sans text-sm" style={{ color: 'var(--text-faint)' }}>
                  Catálogo disponible bajo solicitud.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
