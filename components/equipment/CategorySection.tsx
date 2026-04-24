'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type PhotoMetadata = {
  lqip?: string | null;
};

type EquipmentItem = {
  name: string;
  photo?: { url: string; metadata?: PhotoMetadata | null } | null;
  brand?: { name: string } | null;
  datasheetUrl?: string | null;
  specs?: Array<{ _type?: string; children?: Array<{ _type?: string; text?: string }> }>;
};

type Category = {
  name: string;
  slug: string;
  description?: string;
  heroImage?: string | null;
  items?: (EquipmentItem | null)[] | null;
};

type CategorySectionProps = {
  categories?: (Category | null)[] | null;
};

const FALLBACK_CARD_DESCRIPTION = 'Catálogo premium con configuración adaptable al tipo de evento.';

function getCategoryItems(cat: Category | undefined): EquipmentItem[] {
  if (!cat || !Array.isArray(cat.items)) {
    return [];
  }

  return cat.items.filter(
    (item): item is EquipmentItem =>
      Boolean(
        item &&
          typeof item.name === 'string' &&
          item.name.trim().length > 0 &&
          (!item.photo || typeof item.photo.url === 'string') &&
          (!item.brand || typeof item.brand.name === 'string') &&
          (!item.datasheetUrl || typeof item.datasheetUrl === 'string'),
      ),
  );
}

function getRepresentativeImage(cat: Category): { url: string | null; lqip?: string } {
  if (cat.heroImage) {
    return { url: cat.heroImage, lqip: undefined };
  }

  const firstItemWithPhoto = getCategoryItems(cat).find((item) => item.photo?.url);
  return {
    url: firstItemWithPhoto?.photo?.url ?? null,
    lqip: firstItemWithPhoto?.photo?.metadata?.lqip ?? undefined,
  };
}

function getSpecsLines(item: EquipmentItem): string[] {
  if (!Array.isArray(item.specs)) {
    return [];
  }

  return item.specs
    .map((block) => {
      if (!Array.isArray(block?.children)) return '';
      return block.children
        .map((child) => child?.text?.trim() || '')
        .filter(Boolean)
        .join(' ')
        .trim();
    })
    .filter((line) => line.length > 0);
}

export function CategorySection({ categories }: CategorySectionProps) {
  const safeCategories = useMemo(
    () =>
      (categories ?? []).filter(
        (cat): cat is Category =>
          Boolean(cat && typeof cat.name === 'string' && typeof cat.slug === 'string' && cat.slug.length > 0),
      ),
    [categories],
  );

  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(safeCategories[0]?.slug);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!safeCategories.length) {
      return;
    }

    if (!selectedSlug || !safeCategories.some((cat) => cat.slug === selectedSlug)) {
      setSelectedSlug(safeCategories[0].slug);
    }
  }, [safeCategories, selectedSlug]);

  const selectedCategory = useMemo(
    () => safeCategories.find((cat) => cat.slug === selectedSlug) ?? safeCategories[0],
    [safeCategories, selectedSlug],
  );

  const selectedItems = getCategoryItems(selectedCategory);

  if (!safeCategories.length) {
    return (
      <p className="font-sans text-sm" style={{ color: 'var(--text-faint)' }}>
        No hay categorías disponibles por el momento.
      </p>
    );
  }

  return (
    <section aria-label="Categorías de equipamiento" className="space-y-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
        {safeCategories.map((cat) => {
          const categoryItems = getCategoryItems(cat);
          const representative = getRepresentativeImage(cat);
          const isActive = selectedCategory?.slug === cat.slug;
          const cardDescription = cat.description || FALLBACK_CARD_DESCRIPTION;
          const categoryBrands = Array.from(
            new Set(categoryItems.map((item) => item.brand?.name).filter(Boolean) as string[]),
          );

          return (
            <div
              key={cat.slug}
              className="relative flex w-full items-stretch justify-start overflow-visible md:min-h-[24rem] md:items-start xl:min-h-[25rem]"
            >
              <motion.button
                type="button"
                aria-controls="equipment-category-detail"
                aria-pressed={isActive}
                data-expanded={isActive}
                onClick={() => setSelectedSlug(cat.slug)}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative z-0 h-[23.5rem] min-h-[23.5rem] w-full max-w-full origin-left overflow-hidden rounded-[var(--radius-card)] text-left will-change-[width] transition-[width,max-width,box-shadow,border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:h-[24rem] md:w-[17.25rem] md:max-w-[17.25rem] md:hover:z-20 md:hover:w-[31.5rem] md:hover:max-w-[31.5rem] md:focus-visible:z-20 md:focus-visible:w-[31.5rem] md:focus-visible:max-w-[31.5rem] md:active:z-20 md:active:w-[31.5rem] md:active:max-w-[31.5rem] md:aria-pressed:z-20 md:aria-pressed:w-[31.5rem] md:aria-pressed:max-w-[31.5rem] xl:h-[25rem] xl:w-[18rem] xl:max-w-[18rem] xl:hover:w-[35rem] xl:hover:max-w-[35rem] xl:focus-visible:w-[35rem] xl:focus-visible:max-w-[35rem] xl:active:w-[35rem] xl:active:max-w-[35rem] xl:aria-pressed:w-[35rem] xl:aria-pressed:max-w-[35rem]"
                style={{
                  backgroundColor: isActive
                    ? 'color-mix(in srgb, var(--bg-surface-hi) 85%, var(--accent-cyan) 15%)'
                    : 'var(--bg-surface)',
                  border: isActive
                    ? '1px solid color-mix(in srgb, var(--accent-cyan) 42%, transparent)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isActive
                    ? '0 16px 42px rgba(0, 191, 255, 0.2), inset 0 0 0 1px rgba(0, 191, 255, 0.16)'
                    : '0 10px 28px rgba(0,0,0,0.18)',
                }}
              >
                <div
                  className="relative h-[9.5rem] shrink-0 overflow-hidden md:h-[10rem] xl:h-[10.5rem]"
                  style={{ backgroundColor: 'var(--bg-elevated)' }}
                >
                  {representative.url ? (
                    <Image
                      src={representative.url}
                      alt={cat.name}
                      fill
                      className="object-cover opacity-70 transition-all duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-hover:opacity-90 group-focus-visible:scale-[1.02] group-focus-visible:opacity-90 group-active:scale-[1.02] group-active:opacity-90 group-aria-pressed:scale-[1.02] group-aria-pressed:opacity-90 motion-reduce:transition-none motion-reduce:transform-none"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      placeholder={representative.lqip ? 'blur' : 'empty'}
                      blurDataURL={representative.lqip}
                    />
                  ) : (
                    <div className="absolute inset-0 grid-overlay opacity-30" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-black/10 to-transparent" />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                    style={{
                      background:
                        'linear-gradient(115deg, transparent 0%, rgba(23,133,211,0.14) 44%, rgba(123,97,255,0.14) 100%)',
                    }}
                  />
                </div>

                <div className="grid h-[14rem] grid-rows-[1fr_auto] overflow-hidden p-5 md:h-[14rem] xl:h-[14.5rem]">
                  <div className="min-h-0">
                    <h3
                      className="mb-3 line-clamp-2 min-h-[3.75rem] font-display text-[1.85rem] leading-[1.05] transition-[opacity,transform] duration-400 delay-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px] group-active:translate-x-[2px] group-aria-pressed:translate-x-[2px] motion-reduce:transition-none"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed transition-[opacity,transform] duration-400 delay-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px] group-active:translate-x-[2px] group-aria-pressed:translate-x-[2px] motion-reduce:transition-none"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {cardDescription}
                    </p>
                  </div>

                  <div className="mt-4 h-[4.5rem] overflow-hidden">
                    <p
                      className="font-mono text-[11px] uppercase tracking-widest opacity-85 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5 group-hover:opacity-100 group-focus-visible:translate-y-0.5 group-focus-visible:opacity-100 group-active:translate-y-0.5 group-active:opacity-100 group-aria-pressed:translate-y-0.5 group-aria-pressed:opacity-100 motion-reduce:transition-none"
                      style={{ color: 'var(--text-faint)' }}
                    >
                      {isActive ? 'Mostrando detalle' : 'Ver detalle'}
                    </p>

                    <div className="mt-2">
                      {categoryBrands.length > 0 && (
                        <p
                          className="line-clamp-1 font-mono text-[11px] uppercase tracking-wider opacity-0 transition-[opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-active:translate-y-0 group-active:opacity-100 group-aria-pressed:translate-y-0 group-aria-pressed:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none"
                          style={{ color: 'var(--accent-cyan)' }}
                        >
                          {categoryBrands.slice(0, 3).join(' · ')}
                        </p>
                      )}
                      <p
                        className="line-clamp-1 font-sans text-xs leading-relaxed opacity-0 transition-[opacity,transform] duration-400 delay-[60ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-active:translate-y-0 group-active:opacity-100 group-aria-pressed:translate-y-0 group-aria-pressed:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {categoryItems.length > 0
                          ? `${categoryItems.length} equipos configurables en esta categoría.`
                          : 'Catálogo disponible bajo solicitud.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {selectedCategory && (
        <section
          id="equipment-category-detail"
          aria-live="polite"
          className="relative overflow-hidden rounded-[var(--radius-card)]"
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div className="grid lg:grid-cols-[minmax(280px,36%)_1fr]">
            <div className="relative min-h-[240px] overflow-hidden lg:min-h-[320px]">
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
              <p className="mb-3 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent-cyan)' }}>
                Detalle de categoría
              </p>
              <h3 className="mb-4 font-display text-4xl leading-none text-white md:text-5xl">{selectedCategory.name}</h3>
              {selectedCategory.description && (
                <p className="mb-6 max-w-3xl font-sans text-base" style={{ color: 'var(--text-muted)' }}>
                  {selectedCategory.description}
                </p>
              )}

              {selectedItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {selectedItems.map((item) => (
                    <article
                      key={item.name}
                      className="group relative overflow-hidden rounded-[var(--radius-card)] transition-all duration-300 hover:-translate-y-1"
                      style={{
                        backgroundColor: 'var(--bg-surface-hi)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.16)',
                      }}
                    >
                      {item.photo?.url && (
                        <div className="relative aspect-video w-full">
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
                        {(() => {
                          const specsLines = getSpecsLines(item);
                          return (
                            <>
                              <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                                {item.name}
                              </p>
                              {item.brand && (
                                <p className="mt-1 font-mono text-xs uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
                                  {item.brand.name}
                                </p>
                              )}
                              {specsLines.slice(0, 2).map((line, index) => (
                                <p key={`${item.name}-${index}`} className="mt-1 font-sans text-xs leading-relaxed" style={{ color: 'var(--text-faint)' }}>
                                  {line}
                                </p>
                              ))}
                              {item.datasheetUrl && (
                                <a
                                  href={item.datasheetUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-2 inline-block font-mono text-[11px] uppercase tracking-wide"
                                  style={{ color: 'var(--accent-cyan)' }}
                                >
                                  Ver ficha tecnica
                                </a>
                              )}
                            </>
                          );
                        })()}
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
